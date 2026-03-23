// 鸿蒙 HarmonyOS - 深度优化版交互脚本

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initQuickActions();
    initTeamMembers();
    initSettings();
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
            
            // 轻触反馈
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// 快捷操作
function initQuickActions() {
    const actions = document.querySelectorAll('.quick-action');
    actions.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            showHMToast(`执行${action}操作`, 'success');
            
            // 点击动画
            const icon = this.querySelector('.action-icon');
            icon.style.transform = 'scale(0.9)';
            setTimeout(() => {
                icon.style.transform = '';
            }, 200);
        });
    });
}

// 团队成员
function initTeamMembers() {
    const members = document.querySelectorAll('.team-member');
    members.forEach(member => {
        member.addEventListener('click', function() {
            const name = this.querySelector('.member-name').textContent;
            showHMToast(`查看用户: ${name}`, 'info');
        });
    });
}

// 设置开关
function initSettings() {
    const toggles = document.querySelectorAll('.toggle input');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const settingName = this.closest('.setting-item').querySelector('span').textContent;
            const status = this.checked ? '已开启' : '已关闭';
            showHMToast(`${settingName}${status}`, 'success');
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
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // 快捷操作动画
    const quickActions = document.querySelectorAll('.quick-action');
    quickActions.forEach((action, index) => {
        action.style.opacity = '0';
        action.style.transform = 'scale(0.9)';
        setTimeout(() => {
            action.style.transition = 'all 0.4s ease';
            action.style.opacity = '1';
            action.style.transform = 'scale(1)';
        }, 400 + index * 80);
    });

    // 活动项动画
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 600 + index * 100);
    });
}

// 搜索功能
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    showHMToast(`搜索: ${query}`, 'info');
                    this.value = '';
                }
            }
        });
    }
}

// 通知按钮
const notificationBtn = document.querySelector('.notification-btn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', function() {
        showHMToast('你有3条未读消息', 'warning');
    });
}

// 鸿蒙风格Toast通知
function showHMToast(message, type = 'info') {
    const existing = document.querySelector('.hm-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'hm-toast';
    
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
        success: { bg: 'rgba(52, 199, 89, 0.1)', border: '#34C759', text: '#34C759' },
        warning: { bg: 'rgba(255, 149, 0, 0.1)', border: '#FF9500', text: '#FF9500' },
        info: { bg: 'rgba(0, 122, 255, 0.1)', border: '#007AFF', text: '#007AFF' }
    };

    toast.innerHTML = `
        <span class="hm-toast-icon" style="color: ${colors[type].text}">${icons[type]}</span>
        <span class="hm-toast-message">${message}</span>
    `;

    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #ffffff;
        border: 1px solid ${colors[type].border};
        border-left: 4px solid ${colors[type].border};
        border-radius: 12px;
        padding: 14px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        color: #1d1d1f;
        font-size: 14px;
        z-index: 1000;
        animation: hmToastIn 0.3s ease;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        max-width: 320px;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'hmToastOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes hmToastIn {
        from {
            transform: translateY(20px) scale(0.95);
            opacity: 0;
        }
        to {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes hmToastOut {
        from {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        to {
            transform: translateY(20px) scale(0.95);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
