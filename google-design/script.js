// Google Design - Material Design 3 深度优化版交互脚本

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initTabs();
    initFilterChips();
    initTable();
    initQuickActions();
    initForm();
    initAnimations();
    initSnackbar();
    initThemeToggle();
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

    // 菜单按钮
    const menuBtn = document.querySelector('.menu-btn');
    const navDrawer = document.querySelector('.nav-drawer');
    if (menuBtn && navDrawer) {
        menuBtn.addEventListener('click', function() {
            navDrawer.classList.toggle('collapsed');
            document.querySelector('.main-content').classList.toggle('expanded');
        });
    }
}

// 分段按钮切换
function initTabs() {
    const segmentedBtns = document.querySelectorAll('.segmented-button');
    segmentedBtns.forEach(group => {
        const btns = group.querySelectorAll('.segment');
        btns.forEach(btn => {
            btn.addEventListener('click', function() {
                btns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                animateChartBars();
            });
        });
    });
}

// 筛选芯片
function initFilterChips() {
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            this.classList.toggle('active');
            const filterName = this.textContent;
            showSnackbar(`筛选: ${filterName}`);
        });
    });
}

// 表格功能
function initTable() {
    const selectAll = document.getElementById('select-all');
    const rowCheckboxes = document.querySelectorAll('tbody .md-checkbox input');
    
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
            const allChecked = Array.from(rowCheckboxes).every(c => c.checked);
            const someChecked = Array.from(rowCheckboxes).some(c => c.checked);
            if (selectAll) {
                selectAll.checked = allChecked;
                selectAll.indeterminate = someChecked && !allChecked;
            }
        });
    });

    // 操作按钮
    const actionBtns = document.querySelectorAll('.action-btns .icon-btn-small');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            const orderId = row.querySelector('.order-id').textContent;
            const action = this.title;
            showSnackbar(`${action}: ${orderId}`);
        });
    });

    // 表格行点击
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function(e) {
            if (e.target.type !== 'checkbox' && !e.target.closest('.icon-btn-small')) {
                const orderId = this.querySelector('.order-id').textContent;
                showSnackbar(`查看订单: ${orderId}`);
            }
        });
    });
}

function updateRowHighlight(row) {
    const checkbox = row.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
        row.style.background = 'var(--md-primary-container)';
    } else {
        row.style.background = '';
    }
}

// 快捷操作
function initQuickActions() {
    const quickActionBtns = document.querySelectorAll('.quick-action-item');
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('.action-label').textContent;
            showSnackbar(`执行操作: ${action}`);
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // FAB按钮
    const fabBtns = document.querySelectorAll('.md-fab');
    fabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showSnackbar('新建订单');
        });
    });
}

// 表单功能
function initForm() {
    const form = document.querySelector('.md-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showSnackbar('设置已保存！', 'success');
        });
    }

    // 开关变化
    const switches = document.querySelectorAll('.md-switch input');
    switches.forEach(sw => {
        sw.addEventListener('change', function() {
            const label = this.closest('.md-switch').querySelector('.switch-label').textContent;
            const status = this.checked ? '已开启' : '已关闭';
            showSnackbar(`${label}${status}`);
        });
    });

    // 单选按钮变化
    const radios = document.querySelectorAll('.md-radio input');
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            const label = this.closest('.md-radio').querySelector('.radio-label').textContent;
            showSnackbar(`主题已切换为: ${label}`);
        });
    });
}

// 动画初始化
function initAnimations() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.2, 0, 0, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    animateChartBars();

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
            bar.style.transition = 'height 0.6s cubic-bezier(0.2, 0, 0, 1)';
            bar.style.height = height;
        }, 100 + index * 80);
    });
}

// Snackbar功能
function initSnackbar() {
    const snackbarClose = document.querySelector('.snackbar-action');
    if (snackbarClose) {
        snackbarClose.addEventListener('click', function() {
            hideSnackbar();
        });
    }
}

function showSnackbar(message, type = 'info') {
    const snackbar = document.getElementById('snackbar');
    const textEl = snackbar.querySelector('.snackbar-text');
    const iconEl = snackbar.querySelector('.snackbar-icon');
    
    textEl.textContent = message;
    
    const icons = {
        info: 'info',
        success: 'check_circle',
        warning: 'warning',
        error: 'error'
    };
    iconEl.textContent = icons[type] || icons.info;
    
    snackbar.classList.add('show');
    
    clearTimeout(window.snackbarTimeout);
    window.snackbarTimeout = setTimeout(() => {
        hideSnackbar();
    }, 3000);
}

function hideSnackbar() {
    const snackbar = document.getElementById('snackbar');
    snackbar.classList.remove('show');
}

// 主题切换
function initThemeToggle() {
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const icon = this.querySelector('.material-symbols-outlined');
            icon.textContent = document.body.classList.contains('dark-theme') ? 'light_mode' : 'dark_mode';
            showSnackbar('主题已切换');
        });
    }
}

// 通知按钮
const notificationBtn = document.querySelector('.notification-btn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', function() {
        showSnackbar('你有5条未读消息', 'warning');
    });
}

// 团队成员点击
const teamMembers = document.querySelectorAll('.team-member');
teamMembers.forEach(member => {
    member.addEventListener('click', function() {
        const name = this.querySelector('.member-name').textContent;
        showSnackbar(`查看用户: ${name}`);
    });
});

// 搜索框快捷键
document.addEventListener('keydown', function(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('.search-bar input').focus();
    }
});

// 搜索框功能
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                showSnackbar(`搜索: ${query}`);
                this.value = '';
            }
        }
    });
}

// 按钮涟漪效果
const mdBtns = document.querySelectorAll('.md-btn:not(:disabled)');
mdBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// 添加涟漪动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .dark-theme {
        --md-surface: #1C1B1F;
        --md-surface-container: #211F26;
        --md-surface-container-high: #2B2930;
        --md-surface-container-highest: #36343B;
        --md-on-surface: #E6E1E5;
        --md-on-surface-variant: #CAC4D0;
        --md-outline: #938F99;
        --md-outline-variant: #49454F;
    }
`;
document.head.appendChild(style);
