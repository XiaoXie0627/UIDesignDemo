// OPPO ColorOS DemoUI - 交互脚本

document.addEventListener('DOMContentLoaded', function() {
    // 导航项点击
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 快捷操作按钮
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span:last-child').textContent;
            showNotification(`${action}操作已执行`, 'success');
        });
    });

    // 团队成员点击
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            const name = this.querySelector('.member-name').textContent;
            showNotification(`查看用户: ${name}`, 'info');
        });
    });

    // 通知按钮
    const notificationBtn = document.querySelector('.notification');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotification('你有3条未读消息', 'warning');
        });
    }

    // 通知函数
    function showNotification(message, type = 'info') {
        const existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.innerHTML = `<span>${message}</span>`;
        
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #ffffff;
            border-radius: 14px;
            padding: 14px 20px;
            color: #0f172a;
            font-size: 13px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            border-left: 3px solid ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#0ea5e9'};
        `;

        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slideOut { from { transform: translateX(0); } to { transform: translateX(100%); } }
    `;
    document.head.appendChild(style);
});
