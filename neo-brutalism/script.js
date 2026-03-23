// Neo-Brutalism DemoUI - 交互脚本

document.addEventListener('DOMContentLoaded', function() {
    // 导航项点击事件
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 表单提交处理
    const form = document.querySelector('.demo-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('表单已保存！', 'success');
        });
    }

    // 表格行点击
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn-small')) return;
            const orderId = this.querySelector('td:first-child').textContent;
            showNotification(`查看订单: ${orderId}`, 'info');
        });
    });

    // 用户项点击
    const userItems = document.querySelectorAll('.user-item');
    userItems.forEach(item => {
        item.addEventListener('click', function() {
            const name = this.querySelector('.name').textContent;
            showNotification(`查看用户: ${name}`, 'info');
        });
    });

    // 通知函数
    function showNotification(message, type = 'info') {
        const existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.innerHTML = `<span>${message}</span>`;
        
        const colors = {
            success: '#3a86ff',
            warning: '#ffd23f',
            error: '#ef233c',
            info: '#ff6b35'
        };
        
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: ${colors[type]};
            border: 4px solid #000;
            padding: 16px 24px;
            color: #000;
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            z-index: 1000;
            animation: slideIn 0.2s ease;
            box-shadow: 8px 8px 0 #000;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.2s ease';
            setTimeout(() => toast.remove(), 200);
        }, 3000);
    }

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        @keyframes slideOut {
            from { transform: translateX(0); }
            to { transform: translateX(100%); }
        }
    `;
    document.head.appendChild(style);

    // 进度条动画
    const progressFills = document.querySelectorAll('.progress-fill');
    setTimeout(() => {
        progressFills.forEach(fill => {
            const width = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
        });
    }, 500);
});
