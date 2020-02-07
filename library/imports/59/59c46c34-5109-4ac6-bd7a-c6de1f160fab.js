"use strict";
cc._RF.push(module, '59c46w0UQlKxr16xt4fFg+r', 'UIView');
// Script/FrameWork/UI/UIView.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ResLoader_1 = require("../res/ResLoader");
/**
 * UIView界面基础类
 *
 * 1. 快速关闭与屏蔽点击的选项配置
 * 2. 界面缓存设置（开启后界面关闭不会被释放，以便下次快速打开）
 * 3. 界面显示类型配置
 *
 * 4. 加载资源接口（随界面释放自动释放），this.loadRes(xxx)
 * 5. 由UIManager释放
 *
 * 5. 界面初始化回调（只调用一次）
 * 6. 界面打开回调（每次打开回调）
 * 7. 界面打开动画播放结束回调（动画播放完回调）
 * 8. 界面关闭回调
 * 9. 界面置顶回调
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/** 界面展示类型 */
var UIShowTypes;
(function (UIShowTypes) {
    UIShowTypes[UIShowTypes["UIFullScreen"] = 0] = "UIFullScreen";
    UIShowTypes[UIShowTypes["UIAddition"] = 1] = "UIAddition";
    UIShowTypes[UIShowTypes["UISingle"] = 2] = "UISingle";
})(UIShowTypes = exports.UIShowTypes || (exports.UIShowTypes = {}));
;
;
var UIView = /** @class */ (function (_super) {
    __extends(UIView, _super);
    function UIView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 快速关闭 */
        _this.quickClose = false;
        /** 屏蔽点击选项 在UIConf设置屏蔽点击*/
        // @property
        // preventTouch: boolean = true;
        /** 缓存选项 */
        _this.cache = false;
        /** 界面显示类型 */
        _this.showType = UIShowTypes.UISingle;
        /** 界面id */
        _this.UIid = 0;
        /** 该界面资源占用key */
        _this.useKey = null;
        /** 该界面关闭时自动释放的资源 */
        _this.autoRes = [];
        return _this;
    }
    UIView_1 = UIView;
    /********************** UI的回调 ***********************/
    /**
     * 当界面被创建时回调，生命周期内只调用
     * @param args 可变参数
     */
    UIView.prototype.init = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    /**
     * 当界面被打开时回调，每次调用Open时回调
     * @param fromUI 从哪个UI打开的
     * @param args 可变参数
     */
    UIView.prototype.onOpen = function (fromUI) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    };
    /**
     * 每次界面Open动画播放完毕时回调
     */
    UIView.prototype.onOpenAniOver = function () {
    };
    /**
     * 当界面被关闭时回调，每次调用Close时回调
     * 返回值会传递给下一个界面
     */
    UIView.prototype.onClose = function () {
    };
    /**
     * 当界面被置顶时回调，Open时并不会回调该函数
     * @param preID 前一个ui
     * @param args 可变参数，
     */
    UIView.prototype.onTop = function (preID) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    };
    /********************** 资源加载，卸载相关 ***********************/
    /**
     * 获取该界面的资源占用key
     */
    UIView.prototype.getUseKey = function () {
        if (!this.useKey) {
            this.useKey = ResLoader_1.resLoader.makeUseKey("UI_", this.UIid.toString(), "" + ++UIView_1.uiIndex);
        }
        return this.useKey;
    };
    /**
     * 加载资源，通过此接口加载的资源会在界面被销毁时自动释放
     * 如果同时有其他地方引用的资源，会解除当前界面对该资源的占用
     * @param url 要加载的url
     * @param type 类型，如cc.Prefab,cc.SpriteFrame,cc.Texture2D
     * @param onCompleted
     */
    UIView.prototype.loadRes = function (url, type, onCompleted) {
        var _this = this;
        var useStr = this.getUseKey();
        ResLoader_1.resLoader.loadRes(url, type, function (error, res) {
            if (!error) {
                _this.autoRes.push({ url: url, type: type });
            }
            onCompleted && onCompleted(error, res);
        }, useStr);
    };
    /**
     * 释放资源，界面销毁时在UIManager中调用
     */
    UIView.prototype.releaseAutoRes = function () {
        for (var index = 0; index < this.autoRes.length; index++) {
            var element = this.autoRes[index];
            ResLoader_1.resLoader.releaseRes(element.url, element.type, element.use || this.getUseKey());
        }
    };
    /**
     * 往一个界面加入一个自动释放的资源
     * @param resConf 资源url和类型
     */
    UIView.prototype.autoReleaseRes = function (resConf) {
        this.autoRes.push(resConf);
    };
    var UIView_1;
    /**  静态变量，用于区分相同界面的不同实例 */
    UIView.uiIndex = 0;
    __decorate([
        property
    ], UIView.prototype, "quickClose", void 0);
    __decorate([
        property
    ], UIView.prototype, "cache", void 0);
    __decorate([
        property({ type: cc.Enum(UIShowTypes) })
    ], UIView.prototype, "showType", void 0);
    UIView = UIView_1 = __decorate([
        ccclass
    ], UIView);
    return UIView;
}(cc.Component));
exports.UIView = UIView;

cc._RF.pop();