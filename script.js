class AutoInputApp {
    constructor() {
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.historyList = document.getElementById('historyList');
        this.toast = document.getElementById('toast');
        this.history = this.loadHistory();
        
        this.init();
    }
    
    init() {
        // 页面加载完成后自动聚焦
        this.autoFocus();
        
        // 绑定事件
        this.bindEvents();
        
        // 渲染历史记录
        this.renderHistory();
        
        // 监听页面可见性变化，重新聚焦
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                setTimeout(() => this.autoFocus(), 100);
            }
        });
    }
    
    autoFocus() {
        // 延迟聚焦，确保页面完全加载
        setTimeout(() => {
            this.messageInput.focus();
            // 移动端键盘弹出
            this.messageInput.click();
        }, 300);
    }
    
    bindEvents() {
        // 发送按钮点击事件
        this.sendBtn.addEventListener('click', () => {
            this.handleSend();
        });
        
        // 输入框回车事件
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });
        
        // 输入框获得焦点时滚动到顶部
        this.messageInput.addEventListener('focus', () => {
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 100);
        });
        
        // 防止iOS缩放
        this.messageInput.addEventListener('input', () => {
            // 自动调整高度
            this.adjustTextareaHeight();
        });
    }
    
    adjustTextareaHeight() {
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
    }
    
    async handleSend() {
        const content = this.messageInput.value.trim();
        
        if (!content) {
            this.showToast('请输入内容', 'warning');
            return;
        }
        
        try {
            // 复制到剪贴板
            await this.copyToClipboard(content);
            
            // 添加到历史记录
            this.addToHistory(content);
            
            // 清空输入框
            this.messageInput.value = '';
            this.adjustTextareaHeight();
            
            // 显示成功提示
            this.showToast('已复制到剪贴板');
            
            // 重新聚焦
            setTimeout(() => {
                this.autoFocus();
            }, 100);
            
        } catch (error) {
            console.error('复制失败:', error);
            this.showToast('复制失败，请重试', 'error');
        }
    }
    
    async copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            // 现代浏览器API
            await navigator.clipboard.writeText(text);
        } else {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            return new Promise((resolve, reject) => {
                try {
                    document.execCommand('copy');
                    textArea.remove();
                    resolve();
                } catch (err) {
                    textArea.remove();
                    reject(err);
                }
            });
        }
    }
    
    addToHistory(content) {
        const historyItem = {
            id: Date.now(),
            content: content,
            timestamp: new Date().toISOString(),
            time: new Date().toLocaleString('zh-CN')
        };
        
        this.history.unshift(historyItem);
        
        // 限制历史记录数量
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }
        
        this.saveHistory();
        this.renderHistory();
    }
    
    async copyHistoryItem(content) {
        try {
            await this.copyToClipboard(content);
            this.showToast('已复制到剪贴板');
        } catch (error) {
            console.error('复制失败:', error);
            this.showToast('复制失败，请重试', 'error');
        }
    }
    
    renderHistory() {
        if (this.history.length === 0) {
            this.historyList.innerHTML = `
                <div class="empty-state">
                    <p>暂无历史记录</p>
                    <p>输入内容并发送后，将在这里显示</p>
                </div>
            `;
            return;
        }
        
        this.historyList.innerHTML = this.history.map(item => `
            <div class="history-item" data-id="${item.id}">
                <div class="history-content">${this.escapeHtml(item.content)}</div>
                <div class="history-meta">
                    <span class="history-time">${item.time}</span>
                    <button class="copy-btn" onclick="app.copyHistoryItem('${this.escapeHtml(item.content)}')">
                        复制
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    showToast(message, type = 'success') {
        this.toast.textContent = message;
        this.toast.className = `toast ${type}`;
        this.toast.classList.add('show');
        
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 2000);
    }
    
    loadHistory() {
        try {
            const saved = localStorage.getItem('autoInputHistory');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('加载历史记录失败:', error);
            return [];
        }
    }
    
    saveHistory() {
        try {
            localStorage.setItem('autoInputHistory', JSON.stringify(this.history));
        } catch (error) {
            console.error('保存历史记录失败:', error);
        }
    }
    
    clearHistory() {
        this.history = [];
        this.saveHistory();
        this.renderHistory();
        this.showToast('历史记录已清空');
    }
}

// 添加清空历史记录功能
function addClearHistoryButton() {
    const historySection = document.querySelector('.history-section');
    const clearBtn = document.createElement('button');
    clearBtn.textContent = '清空历史';
    clearBtn.className = 'clear-history-btn';
    clearBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 6px 12px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 500;
    `;
    
    clearBtn.addEventListener('click', () => {
        if (confirm('确定要清空所有历史记录吗？')) {
            app.clearHistory();
        }
    });
    
    historySection.style.position = 'relative';
    historySection.appendChild(clearBtn);
}

// 添加CSS样式
const style = document.createElement('style');
style.textContent = `
    .empty-state {
        text-align: center;
        padding: 40px 20px;
        color: #6c757d;
    }
    
    .empty-state p:first-child {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 8px;
    }
    
    .empty-state p:last-child {
        font-size: 14px;
        opacity: 0.8;
    }
    
    .clear-history-btn:hover {
        background: #c82333 !important;
        transform: translateY(-1px);
    }
    
    .clear-history-btn:active {
        transform: translateY(0);
    }
    
    .toast.error {
        background: #dc3545;
        box-shadow: 0 4px 15px rgba(220, 53, 69, 0.4);
    }
    
    .toast.warning {
        background: #ffc107;
        color: #212529;
        box-shadow: 0 4px 15px rgba(255, 193, 7, 0.4);
    }
`;
document.head.appendChild(style);

// 初始化应用
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new AutoInputApp();
    addClearHistoryButton();
});

// 防止页面滚动时失去焦点
document.addEventListener('touchmove', (e) => {
    if (e.target === app.messageInput) {
        e.preventDefault();
    }
}, { passive: false }); 