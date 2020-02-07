"use strict";
cc._RF.push(module, '5df79CSOl9IUJfNxaz1ogLy', 'ResLeakChecker');
// Script/FrameWork/res/ResLeakChecker.ts

/**
 * 资源泄露检查类，可以用于跟踪
 *
 * 1. 实例化ResLeakChecker之后，需要先绑定到resLoader中
 * 2. 设置resFilter过滤器可以过滤不需要检测的资源，可用于专门跟踪某资源的使用情况
 * 3. 设置startCheck和stopCheck可动态开启、关闭检测，可用于跟踪某时间段内分配了未释放的资源
 * 4. dump方法可以将收集到的未释放资源打印到控制台
 * 5. getLog可以获取收集到的泄露日志，自己进行打印、上传或存档
 * 6. resetLog方法可以清空泄露日志
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ResLeakChecker = /** @class */ (function () {
    function ResLeakChecker() {
        this.resFilter = null;
        this._checking = false;
        this._log = new Map();
    }
    ResLeakChecker.findCharPos = function (str, cha, num) {
        var x = str.indexOf(cha);
        var ret = x;
        for (var i = 0; i < num; i++) {
            x = str.indexOf(cha, x + 1);
            if (x != -1) {
                ret = x;
            }
            else {
                return ret;
            }
        }
        return ret;
    };
    ResLeakChecker.getCallStack = function (popCount) {
        /*let caller = arguments.callee.caller;
        let count = Math.min(arguments.callee.caller.length - popCount, 10);
        let ret = "";
        do {
            ret = `${ret}${caller.toString()}`;
            caller = caller && caller.caller;
            --count;
        } while (caller && count > 0)*/
        var ret = (new Error()).stack;
        var pos = ResLeakChecker.findCharPos(ret, '\n', popCount);
        if (pos > 0) {
            ret = ret.slice(pos);
        }
        return ret;
    };
    ResLeakChecker.prototype.checkFilter = function (url) {
        if (!this._checking) {
            return false;
        }
        if (this.resFilter) {
            return this.resFilter(url);
        }
        return true;
    };
    ResLeakChecker.prototype.logLoad = function (url, use, stack) {
        if (!this.checkFilter(url)) {
            return;
        }
        if (!this._log.has(url)) {
            this._log.set(url, new Map());
        }
        var urlInfos = this._log.get(url);
        if (urlInfos.has(use)) {
            console.warn("ResLeakChecker doubel same use " + url + " : " + use + ", stack " + urlInfos[use]);
        }
        urlInfos.set(use, stack ? stack : ResLeakChecker.getCallStack(2));
    };
    ResLeakChecker.prototype.logRelease = function (url, use) {
        if (!this.checkFilter(url)) {
            return;
        }
        if (!this._log.has(url)) {
            console.warn("ResLeakChecker url nofound " + url + " : " + use);
            return;
        }
        var urlInfos = this._log.get(url);
        if (!urlInfos.has(use)) {
            console.warn("ResLeakChecker use nofound " + url + " : " + use);
        }
        else {
            urlInfos.delete(use);
        }
    };
    ResLeakChecker.prototype.startCheck = function () { this._checking = true; };
    ResLeakChecker.prototype.stopCheck = function () { this._checking = false; };
    ResLeakChecker.prototype.getLog = function () { return this._log; };
    ResLeakChecker.prototype.resetLog = function () {
        this._log = new Map();
    };
    ResLeakChecker.prototype.dump = function () {
        this._log.forEach(function (log, url) {
            console.log(url);
            log.forEach(function (stack, use) {
                console.log(use + " : " + stack);
            });
        });
    };
    return ResLeakChecker;
}());
exports.ResLeakChecker = ResLeakChecker;

cc._RF.pop();