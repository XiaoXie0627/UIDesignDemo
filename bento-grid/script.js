// Bento Grid DemoUI - 交互脚本

document.addEventListener('DOMContentLoaded', function() {
    // 导航链接点击
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
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

    // 表单提交
    const form = document.querySelector('.settings-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('设置已保存！', 'success');
        });
    }

    // 表格行点击
    const tableRows = document.querySelectorAll('.table-row:not(.header)');
    tableRows.forEach(row => {
        row.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn-small')) return;
            const orderId = this.querySelector('span:first-child').textContent;
            showNotification(`查看订单: ${orderId}`, 'info');
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

    // 快捷操作按钮
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span:last-child').textContent;
            showNotification(`执行操作: ${action}`, 'info');
        });
    });

    // 日程项点击
    const scheduleItems = document.querySelectorAll('.schedule-item');
    scheduleItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.schedule-title').textContent;
            showNotification(`查看日程: ${title}`, 'info');
        });
    });

    // 搜索功能
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
    const notificationBtn = document.querySelector('.icon-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotification('你有新的通知', 'warning');
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
            success: '#34c759',
            warning: '#ff9500',
            error: '#ff3b30',
            info: '#007aff'
        };
        
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #ffffff;
            border-radius: 16px;
            padding: 16px 24px;
            display: flex;
            align-items: center;
            gap: 12px;
            color: #1d1d1f;
            font-size: 14px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            border-left: 4px solid ${colors[type]};
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
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });

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

    // 存储圆环动画
    const storageFill = document.querySelector('.storage-fill');
    if (storageFill) {
        const circumference = 2 * Math.PI * 45;
        storageFill.style.strokeDasharray = circumference;
        storageFill.style.strokeDashoffset = circumference;
        setTimeout(() => {
            storageFill.style.transition = 'stroke-dashoffset 1s ease';
            storageFill.style.strokeDashoffset = 94.2; // 68% used
        }, 300);
    }
});
