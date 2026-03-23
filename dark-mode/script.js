// Dark Mode Excellence - 深度优化版交互脚本

document.addEventListener('DOMContentLoaded', function() {
    // 初始化
    initNavigation();
    initTabs();
    initTable();
    initQuickActions();
    initAnimations();
    initSearch();
});

// 导航功能
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // 添加点击反馈
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // 折叠按钮
    const collapseBtn = document.querySelector('.collapse-btn');
    if (collapseBtn) {
        collapseBtn.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('collapsed');
        });
    }
}

// 标签页切换
function initTabs() {
    const tabs = document.querySelectorAll('.tabs');
    tabs.forEach(tabGroup => {
        const tabBtns = tabGroup.querySelectorAll('.tab');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // 触发图表更新动画
                animateChartBars();
            });
        });
    });
}

// 表格功能
function initTable() {
    // 全选复选框
    const selectAll = document.querySelector('thead .checkbox-wrapper input');
    const rowCheckboxes = document.querySelectorAll('tbody .checkbox-wrapper input');
    
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            rowCheckboxes.forEach(cb => {
                cb.checked = this.checked;
                updateRowHighlight(cb.closest('tr'));
            });
        });
    }

    rowCheckboxes.forEach(cb => {
        cb.addEventListener('change', function() {
            updateRowHighlight(this.closest('tr'));
            
            // 更新全选状态
            const allChecked = Array.from(rowCheckboxes).every(c => c.checked);
            const someChecked = Array.from(rowCheckboxes).some(c => c.checked);
            if (selectAll) {
                selectAll.checked = allChecked;
                selectAll.indeterminate = someChecked && !allChecked;
            }
        });
    });

    // 表格行悬停效果
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function(e) {
            if (e.target.type !== 'checkbox' && !e.target.closest('.action-btn')) {
                const orderId = this.querySelector('.order-id').textContent;
                showNotification(`查看订单: ${orderId}`, 'info');
            }
        });
    });

    // 操作按钮
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            const orderId = row.querySelector('.order-id').textContent;
            const action = this.title;
            showNotification(`${action}订单: ${orderId}`, 'success');
        });
    });
}

function updateRowHighlight(row) {
    const checkbox = row.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
        row.style.background = 'rgba(187, 134, 252, 0.08)';
    } else {
        row.style.background = '';
    }
}

// 快捷操作
function initQuickActions() {
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            showNotification(`执行操作: ${action}`, 'success');
        });
    });
}

// 动画初始化
function initAnimations() {
    // 统计卡片入场动画
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // 图表柱状图动画
    animateChartBars();

    // 团队成员动画
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            member.style.transition = 'all 0.4s ease';
            member.style.opacity = '1';
            member.style.transform = 'translateX(0)';
        }, 500 + index * 100);
    });
}

function animateChartBars() {
    const bars = document.querySelectorAll('.bar.current');
    bars.forEach((bar, index) => {
        const height = bar.style.height;
        bar.style.height = '0%';
        setTimeout(() => {
            bar.style.transition = 'height 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            bar.style.height = height;
        }, 100 + index * 80);
    });
}

// 搜索功能
function initSearch() {
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    showNotification(`搜索: ${query}`, 'info');
                    this.value = '';
                }
            }
        });

        // 快捷键支持
        document.addEventListener('keydown', function(e) {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }
}

// 通知系统
function showNotification(message, type = 'info') {
    // 移除现有通知
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    
    const icons = {
        success: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10L8 14L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        warning: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 6V10M10 14H10.01M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
        error: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 6L14 14M14 6L6 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
        info: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 9V13M10 17C14.4183 17 18 13.4183 18 9C18 4.58172 14.4183 1 10 1C5.58172 1 2 4.58172 2 9C2 13.4183 5.58172 17 10 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>`
    };

    const colors = {
        success: { bg: 'rgba(74, 222, 128, 0.15)', border: '#4ade80' },
        warning: { bg: 'rgba(251, 191, 36, 0.15)', border: '#fbbf24' },
        error: { bg: 'rgba(248, 113, 113, 0.15)', border: '#f87171' },
        info: { bg: 'rgba(187, 134, 252, 0.15)', border: '#bb86fc' }
    };

    toast.innerHTML = `
        <span class="toast-icon" style="color: ${colors[type].border}">${icons[type]}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        </button>
    `;

    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: var(--bg-elevated, #1e1e2a);
        border: 1px solid ${colors[type].border};
        border-radius: 12px;
        padding: 14px 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        color: rgba(255, 255, 255, 0.95);
        font-size: 14px;
        z-index: 1000;
        animation: toastSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        max-width: 360px;
    `;

    document.body.appendChild(toast);

    // 关闭按钮
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.style.cssText = `
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
    `;
    closeBtn.addEventListener('click', () => {
        toast.style.animation = 'toastSlideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    });

    // 自动消失
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'toastSlideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }
    }, 3000);
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes toastSlideIn {
        from {
            transform: translateX(100%) scale(0.9);
            opacity: 0;
        }
        to {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes toastSlideOut {
        from {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
        to {
            transform: translateX(100%) scale(0.9);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 通知按钮点击
const notificationBtn = document.querySelector('.notification-btn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', function() {
        showNotification('你有 5 条未读消息', 'warning');
    });
}

// 团队成员点击
const teamMembers = document.querySelectorAll('.team-member');
teamMembers.forEach(member => {
    member.addEventListener('click', function() {
        const name = this.querySelector('.member-name').textContent;
        showNotification(`查看用户: ${name}`, 'info');
    });
});

// 滚动视差效果
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const scrollY = window.scrollY;
            const orbs = document.querySelectorAll('.gradient-orb');
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.05;
                orb.style.transform = `translateY(${scrollY * speed}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
});
