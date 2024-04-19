window.c = {};

c.hasClass = function (el, cls) {
    if (el.className) return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    else return false;
}

c.addClass = function (el, cls) {
    if (!c.hasClass(cls)) el.className += ' ' + cls;
}

c.removeClass = function (el, cls) {
    el.className = el.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), ' ');
}

; (function () {
    function msg(obj) {
        obj = obj || {};
        this.config = {
            content: 'Default Notification',
            type: 'success'
        };
        this.timeout = null;
        this.config = Object.assign(this.config, obj);
        this.init();
    };

    msg.prototype.init = function () {
        let icon = '';
        switch (this.config.type) {
            case 'success':
                icon = 'fa-check-circle';
                break;
            case 'error':
                icon = 'fa-times-circle';
        };
        const msgBox = document.createElement('div');
        msgBox.className = `cdl-msg ${this.config.type} hide`;
        const msgIcon = document.createElement('i');
        msgIcon.className = `fa ${icon} cdl-msg-icon`;
        const msgText = document.createElement('p');
        msgText.className = `cdl-msg-content`;
        msgText.innerHTML = this.config.content;
        msgBox.appendChild(msgIcon);
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
    c.msg = function (obj) {
        new msg(obj || 'message');
    };
})();
