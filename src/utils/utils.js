window.c = {};
// 是否包含类
c.hasClass = function (el, cls) {
    if (el.className) return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    else return false;
}
// 增加类
c.addClass = function (el, cls) {
    if (!c.hasClass(cls)) el.className += ' ' + cls;
}
// 删除类
c.removeClass = function (el, cls) {
    el.className = el.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), ' ');
}
// 消息提示
; (function () {
    function msg(obj) {
        obj = obj || {};
        this.config = {
            content: '这是一段默认的消息提示文字',
            type: 'success'
        };
        // 当前定时器
        this.timeout = null;
        this.config = Object.assign(this.config, obj);
        // 调用初始化方法
        this.init();
    };
    // 提示框初始化
    msg.prototype.init = function () {
        let icon = '';
        switch (this.config.type) {
            case 'success':
                icon = 'fa-check-circle';
                break;
            case 'error':
                icon = 'fa-times-circle';
        };
        // 创建msgbox
        const msgBox = document.createElement('div');
        msgBox.className = `cdl-msg ${this.config.type} hide`;
        // 创建图标
        const msgIcon = document.createElement('i');
        msgIcon.className = `fa ${icon} cdl-msg-icon`;
        // 创建提示文字
        const msgText = document.createElement('p');
        msgText.className = `cdl-msg-content`;
        msgText.innerHTML = this.config.content;
        // 添加图标
        msgBox.appendChild(msgIcon);
        // 添加文字
        msgBox.appendChild(msgText);
        document.body.appendChild(msgBox);
        setTimeout(function () {
            c.addClass(msgBox, 'show');
            setTimeout(() => {
                c.removeClass(msgBox, 'show');
                setTimeout(() => {
                    document.body.removeChild(msgBox);
                }, 400);
            }, 2000);
        }, 50);
    };
    // 注册提示框组件
    c.msg = function (obj) {
        new msg(obj || 'message');
    };
})();
