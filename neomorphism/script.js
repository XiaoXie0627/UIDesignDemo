// Neomorphism DemoUI - 交互脚本

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

    // 按钮点击效果
    const buttons = document.querySelectorAll('.btn:not(.btn-disabled)');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.classList.contains('btn-pressed')) return;
            
            // 短暂的按下效果
            this.style.boxShadow = 'inset 4px 4px 8px var(--shadow-dark), inset -4px -4px 8px var(--shadow-light)';
            setTimeout(() => {
                this.style.boxShadow = '';
            }, 150);
        });
    });

    // 表格行悬停效果
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
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

    // 滑块交互
    const sliders = document.querySelectorAll('.neo-slider input[type="range"]');
    sliders.forEach(slider => {
        const fill = slider.nextElementSibling.querySelector('.slider-fill');
        const valueDisplay = slider.closest('.slider-item').querySelector('.slider-value');
        
        slider.addEventListener('input', function() {
            const value = this.value;
            fill.style.width = value + '%';
            valueDisplay.textContent = value + '%';
        });
    });

    // 搜索框功能
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                showNotification(`搜索: ${query}`, 'info');
            }
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
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
        // 移除现有通知
        const existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${getToastIcon(type)}</span>
            <span class="toast-message">${message}</span>
        `;
        
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #e0e5ec;
            border-radius: 16px;
            padding: 16px 24px;
            display: flex;
            align-items: center;
            gap: 12px;
            color: #2d3436;
            font-size: 14px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 6px 6px 12px #a3b1c6,
                        -6px -6px 12px #ffffff;
        `;

        // 根据类型添加边框颜色
        const colors = {
            success: '#00b894',
            warning: '#fdcb6e',
            error: '#e74c3c',
            info: '#6d5dfc'
        };
        toast.style.borderLeft = `4px solid ${colors[type]}`;

        document.body.appendChild(toast);

        // 3秒后自动消失
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
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // 统计卡片动画
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
