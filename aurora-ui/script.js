// Aurora UI DemoUI - 交互脚本

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

    // 标签页切换
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const parent = this.closest('.tabs');
            parent.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
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

    // 搜索框功能
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    showNotification(`搜索: ${query}`, 'info');
                }
            }
        });
    }

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
        toast.innerHTML = `
            <span class="toast-icon">${getToastIcon(type)}</span>
            <span class="toast-message">${message}</span>
        `;
        
        const colors = {
            success: 'linear-gradient(135deg, #34d399, #059669)',
            warning: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            error: 'linear-gradient(135deg, #f472b6, #ec4899)',
            info: 'linear-gradient(135deg, #00d4ff, #7c3aed)'
        };
        
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: ${colors[type]};
            border-radius: 16px;
            padding: 16px 24px;
            display: flex;
            align-items: center;
            gap: 12px;
            color: #000;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function getToastIcon(type) {
        const icons = {
            success: '✓',
            warning: '⚠',
            error: '✕',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // 卡片入场动画
    const cards = document.querySelectorAll('.stat-card, .card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
});
