// 小米澎湃OS - 深度优化版交互脚本

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initControlCenter();
    initQuickActions();
    initTeamMembers();
    initSettings();
    initAnimations();
    initSearch();
    initWaveEffects();
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

// 控制中心
function initControlCenter() {
    const controlBtns = document.querySelectorAll('.control-btn');
    controlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const name = this.querySelector('span:last-child').textContent;
            const isActive = this.classList.contains('active');
            showMIToast(`${name} ${isActive ? '已开启' : '已关闭'}`, isActive ? 'success' : 'info');
        });
    });
}

// 快捷操作
function initQuickActions() {
    const actions = document.querySelectorAll('.quick-action');
    actions.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            showMIToast(`执行${action}操作`, 'success');
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// 团队成员
function initTeamMembers() {
    const members = document.querySelectorAll('.team-member');
    members.forEach(member => {
        member.addEventListener('click', function() {
            const name = this.querySelector('.member-name').textContent;
            showMIToast(`查看用户: ${name}`, 'info');
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
            showMIToast(`${settingName}${status}`, 'success');
        });
    });
}

// 动画初始化
function initAnimations() {
    // 控制中心按钮动画
    const controlBtns = document.querySelectorAll('.control-btn');
    controlBtns.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transition = 'all 0.4s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1)';
        }, index * 60);
    });

    // 统计卡片入场
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + index * 100);
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
        }, 600 + index * 80);
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
                    showMIToast(`搜索: ${query}`, 'info');
                    this.value = '';
                }
            }
        });
    }
}

// 波浪效果
function initWaveEffects() {
    const waves = document.querySelectorAll('.wave');
    
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        waves.forEach((wave, index) => {
            const speed = (index + 1) * 12;
            const moveX = (x - 0.5) * speed;
            const moveY = (y - 0.5) * speed;
            wave.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// 通知按钮
const notificationBtn = document.querySelector('.notification-btn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', function() {
        showMIToast('你有3条未读消息', 'warning');
    });
}

// 小米风格Toast通知
function showMIToast(message, type = 'info') {
    const existing = document.querySelector('.mi-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'mi-toast';
    
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
        success: '#4ade80',
        warning: '#fbbf24',
        info: '#ff6a00'
    };

    toast.innerHTML = `
        <span class="mi-toast-icon" style="color: ${colors[type]}">${icons[type]}</span>
        <span class="mi-toast-message">${message}</span>
    `;

    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-left: 4px solid ${colors[type]};
        border-radius: 14px;
        padding: 14px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        color: white;
        font-size: 14px;
        z-index: 1000;
        animation: miToastIn 0.3s ease;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        max-width: 320px;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'miToastOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes miToastIn {
        from {
            transform: translateX(100%) scale(0.9);
            opacity: 0;
        }
        to {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes miToastOut {
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
