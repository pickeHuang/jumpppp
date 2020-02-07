(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Game/PlayerController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '56af9dQjLBMGZoIuIkZxICv', 'PlayerController', __filename);
// Script/Game/PlayerController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameManager_1 = require("./GameManager");
/**
 *
 * 玩家控制类
 *
 * Author  YouxiXiaobai
 *
 * 2020-02-07
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PlayerController = /** @class */ (function (_super) {
    __extends(PlayerController, _super);
    function PlayerController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**移动速度 */
        _this.movespeed = 0;
        /** 移动的高度*/
        _this.moveheight = 0;
        /** 移动的宽度*/
        _this.movewidth = 0;
        //跳跃高度
        _this.jumpHeight = 180;
        _this.jumpDuration = 0.3;
        //是否向左移动，反之向右移动
        _this.isMoveLeft = false;
        //是否在正跳跃
        _this.isJumping = false;
        _this.nextPlatformLeft = null;
        _this.nextPlatformRight = null;
        _this.my_Body = null;
        _this.isMove = false;
        return _this;
    }
    PlayerController.prototype.onLoad = function () {
        //this.my_Body=this.node.getComponent(cc.RigidBody);
        this.touchnode = cc.find("Canvas/TouchNode");
        this.touchnode.on(cc.Node.EventType.TOUCH_START, this.setLeft, this);
    };
    /** 设置isleft*/
    PlayerController.prototype.setLeft = function (event) {
        console.log("aaa");
        this.pointX = event.getLocationX();
        this.touchnodewidth = this.touchnode.width;
        var centerwidth = this.touchnodewidth / 2;
        if (this.pointX <= centerwidth) {
            this.isMoveLeft = true;
            this.node.setScale(new cc.Vec2(-1, 1));
        }
        else {
            this.isMoveLeft = false;
            this.node.setScale(new cc.Vec2(1, 1));
        }
        this.setMoveDir();
    };
    /**设置移动的方向 */
    PlayerController.prototype.setMoveDir = function () {
        this.MovePosition(this.isMoveLeft);
        GameManager_1.GameManager.Instance.AddGameScore();
    };
    PlayerController.prototype.onDestroy = function () {
        this.touchnode.off(cc.Node.EventType.TOUCH_START, this.setLeft, this);
    };
    /**移动位置 */
    PlayerController.prototype.MovePosition = function (isleft) {
        if (isleft) {
            console.log("往左边动");
            var waciton = cc.moveBy(this.movespeed, new cc.Vec2(-this.movewidth, 0));
            var haction = cc.moveBy(this.movespeed, new cc.Vec2(0, this.moveheight));
            this.node.runAction(cc.spawn(waciton, haction));
        }
        else {
            console.log("往右边动");
            var waciton = cc.moveBy(this.movespeed, new cc.Vec2(this.movewidth, 0));
            var haction = cc.moveBy(this.movespeed, new cc.Vec2(0, this.moveheight));
            this.node.runAction(cc.spawn(waciton, haction));
        }
        this.Jump();
    };
    PlayerController.prototype.Jump = function () {
        if (this.isJumping) {
            this.setJumoAction();
        }
        else {
            return;
        }
    };
    PlayerController.prototype.setJumoAction = function () {
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDonw = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // 添加一个回调函数，用于在动作结束时调用我们定义的其他方法
        return cc.repeatForever(cc.sequence(jumpUp, jumpDonw));
    };
    __decorate([
        property()
    ], PlayerController.prototype, "movespeed", void 0);
    __decorate([
        property()
    ], PlayerController.prototype, "moveheight", void 0);
    __decorate([
        property()
    ], PlayerController.prototype, "movewidth", void 0);
    __decorate([
        property(cc.Integer)
    ], PlayerController.prototype, "jumpHeight", void 0);
    __decorate([
        property(cc.Integer)
    ], PlayerController.prototype, "jumpDuration", void 0);
    PlayerController = __decorate([
        ccclass
    ], PlayerController);
    return PlayerController;
}(cc.Component));
exports.PlayerController = PlayerController;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=PlayerController.js.map
        