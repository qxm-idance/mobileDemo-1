String.prototype.hasString = function(source){
    if(typeof source == 'object'){
        for(var i= 0,j=source.length;i<j;i++)
            if(!this.hasString(source[i])) return !1;
        return !0;
    }
    if(this.indexOf(source) != -1) return !0;
};

String.prototype.len = function () {
    var a = (this || "").match(/[^\x00-\x80]/g);
    return this.length + (a ? a.length : 0)
};

function Noop() {}

function URLParser(a, b) {
    var c = a ? a: document.location.href;
    a = {};
    b = b || "?";
    if (!c.hasString(b)) return a;
    b = c.split(b).slice(1);
    b.forEach(it => {
       var _b = it.split('&');
       for (c = 0; c < _b.length; c++) {
           var e = _b[c].replace(/#.*$/g, "").split("=");
           e[1] || (e[1] = "");
           a[e[0]] = e[1];
       }
    });
    console.log(a);
    //特殊修正统一
    if (a.user_id || a.userid) {
        a.userId = a.user_id || a.userid;
    }
    return a
}

function ToParams(a){
    if (Object.prototype.toString.call(a).slice(8, -1) === 'Object') {
        var b = [];
        for (var c in a)
            a.hasOwnProperty(c) && b.push(c + '=' + a[c]);
        return b.join('&');
    }
    return a;
}

function GetParams() {
    return ToParams(Object.assign(URLParser(), ...arguments));
}

let Transition = function() {

    return {
        /**
         * 判断浏览器是否支持 sessionStorage，支持返回 true，否则返回 false
         * @returns {Boolean}
         */
        supportStorage: () => {
            let mod = 'router.ability';
            try {
                sessionStorage.setItem(mod, mod);
                sessionStorage.removeItem(mod);
                return true;
            } catch(e) {
                return false;
            }
        },
        from: function(from, to) {
            //保持一致
            if (this.supportStorage() && from.name && to.name) {
                if (from.name === to.name) {
                    return ''
                }
                if (from.name.hasString(to.name)) {
                    return 'l1'
                } else if (to.name.hasString(from.name)) {
                    return 'l0'
                }
            } else {
                return ''
            }
        },
        to: function() {
            if (this.supportStorage()) {
                return sessionStorage.getItem('to') || '';
            }
            return ''
        }
    }
}();

let Detect = function() {
    let ua = navigator.userAgent;
    return {
        getApp() {
            let app = {};
            let match = ua.match(/Enniu\((\d+)\/(\d+)\/(\d+)\/((\d+)\.(\d+)\.(\d+))\)/i);
            if (!match) {
                warning('detect: `getApp` match failed');
                return {};
            }
            return {
                platform:   match[1],
                appId:      match[2],
                bigAppId:   match[3],
                appVersion: match[4]
            };

            return app;
        },

        isApp() {
            return /Enniu/i.test(ua);
        },

        isGJ() {
            return this.isApp() && this.getApp().bigAppId == '1';
        },

        isRP() {
            return !!(this.isApp() && (this.getApp().bigAppId == '8' || /Enniu_51RP/i.test(ua)));
        }
    }
}();

export {URLParser, ToParams, GetParams, Detect, Noop, Transition}
