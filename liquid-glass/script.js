// Liquid Glass - 深度优化版交互脚本

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initTabs();
    initTeamMembers();
    initQuickActions();
    initAnimations();
    initSearch();
    initLightEffects();
});

// 导航功能
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// 标签页切换
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const parent = this.closest('.tabs');
            parent.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            animateChartBars();
        });
    });
}

// 团队成员
function initTeamMembers() {
    const members = document.querySelectorAll('.team-member');
    members.forEach(member => {
        member.addEventListener('click', function() {
            const name = this.querySelector('.member-name').textContent;
            showLiquidToast(`查看用户: ${name}`, 'info');
        });
    });
}

// 快捷操作
function initQuickActions() {
    const actions = document.querySelectorAll('.quick-action');
    actions.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            showLiquidToast(`执行${action}操作`, 'success');
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// 动画初始化
function initAnimations() {
    // 统计卡片入场
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
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
        }, 500 + index * 80);
    });
}

function animateChartBars() {
    const bars = document.querySelectorAll('.bar.current');
    bars.forEach((bar, index) => {
        const height = bar.style.height;
        bar.style.height = '0%';
        setTimeout(() => {
            bar.style.transition = 'height 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
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
                    showLiquidToast(`搜索: ${query}`, 'info');
                    this.value = '';
                }
            }
        });

        document.addEventListener('keydown', function(e) {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }
}

// 光效跟踪
function initLightEffects() {
    const orbs = document.querySelectorAll('.light-orb');
    
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 15;
            const moveX = (x - 0.5) * speed;
            const moveY = (y - 0.5) * speed;
            orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// 通知按钮
const notificationBtn = document.querySelector('.icon-btn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', function() {
        showLiquidToast('你有3条未读消息', 'warning');
    });
}

// Liquid风格Toast通知
function showLiquidToast(message, type = 'info') {
    const existing = document.querySelector('.liquid-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'liquid-toast';
    
    const icons = {
        success: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9L7 13L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        warning: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 6V10M9 13H9.01M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`,
        info: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="1.5"/>
            <path d="M9 8V12M9 6H9.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`
    };

    const colors = {
        success: '#34C759',
        warning: '#FF9500',
        info: '#007AFF'
    };

    toast.innerHTML = `
        <span class="liquid-toast-icon" style="color: ${colors[type]}">${icons[type]}</span>
        <span class="liquid-toast-message">${message}</span>
    `;

    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: rgba(255, 255, 255, 0.72);
        backdrop-filter: blur(40px) saturate(180%);
        -webkit-backdrop-filter: blur(40px) saturate(180%);
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-left: 4px solid ${colors[type]};
        border-radius: 14px;
        padding: 14px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        color: #1d1d1f;
        font-size: 14px;
        z-index: 1000;
        animation: liquidToastIn 0.3s ease;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        max-width: 320px;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'liquidToastOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes liquidToastIn {
        from {
            transform: translateX(100%) scale(0.9);
            opacity: 0;
        }
        to {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes liquidToastOut {
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
