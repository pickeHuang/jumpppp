"use strict";
cc._RF.push(module, '2abe6tO3kZC2K45DkUfjJqX', 'ResKeeper');
// Script/FrameWork/res/ResKeeper.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ResLoader_1 = require("./ResLoader");
/**
 * 资源引用类
 * 1. 提供加载功能，并记录加载过的资源
 * 2. 在node释放时自动清理加载过的资源
 * 3. 支持手动添加记录
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
;
var ResKeeper = /** @class */ (function (_super) {
    __extends(ResKeeper, _super);
    function ResKeeper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.autoRes = [];
        return _this;
    }
    /**
     * 加载资源，通过此接口加载的资源会在界面被销毁时自动释放
     * 如果同时有其他地方引用的资源，会解除当前界面对该资源的占用
     * @param url 要加载的url
     * @param type 类型，如cc.Prefab,cc.SpriteFrame,cc.Texture2D
     * @param onCompleted
     */
    ResKeeper.prototype.loadRes = function (url, type, onCompleted) {
        var _this = this;
        var use = ResLoader_1.resLoader.nextUseKey();
        ResLoader_1.resLoader.loadRes(url, type, function (error, res) {
            if (!error) {
                _this.autoRes.push({ url: url, use: use, type: type });
            }
            onCompleted && onCompleted(error, res);
        }, use);
    };
    /**
     * 组件销毁时自动释放所有keep的资源
     */
    ResKeeper.prototype.onDestroy = function () {
        this.releaseAutoRes();
    };
    /**
     * 释放资源，组件销毁时自动调用
     */
    ResKeeper.prototype.releaseAutoRes = function () {
        for (var index = 0; index < this.autoRes.length; index++) {
            var element = this.autoRes[index];
            ResLoader_1.resLoader.releaseRes(element.url, element.type, element.use);
        }
        this.autoRes.length = 0;
    };
    /**
     * 加入一个自动释放的资源
     * @param resConf 资源url和类型 [ useKey ]
     */
    ResKeeper.prototype.autoReleaseRes = function (resConf) {
        if (ResLoader_1.resLoader.addUse(resConf.url, resConf.use)) {
            this.autoRes.push(resConf);
        }
    };
    ResKeeper = __decorate([
        ccclass
    ], ResKeeper);
    return ResKeeper;
}(cc.Component));
exports.default = ResKeeper;
var ResUtil = /** @class */ (function () {
    function ResUtil() {
    }
    /**
     * 从目标节点或其父节点递归查找一个资源挂载组件
     * @param attachNode 目标节点
     * @param autoCreate 当目标节点找不到ResKeeper时是否自动创建一个
     */
    ResUtil.getResKeeper = function (attachNode, autoCreate) {
        if (attachNode) {
            var ret = attachNode.getComponent(ResKeeper);
            if (!ret) {
                if (autoCreate) {
                    return attachNode.addComponent(ResKeeper);
                }
                else {
                    return ResUtil.getResKeeper(attachNode.parent, autoCreate);
                }
            }
            return ret;
        }
        return null;
    };
    return ResUtil;
}());
exports.ResUtil = ResUtil;

cc._RF.pop();