"use strict";
cc._RF.push(module, 'ea651656HxCwKHal0p0h8zH', 'GamePanel');
// Script/UI/GamePanel.ts

Object.defineProperty(exports, "__esModule", { value: true });
/*
    主场景面板
    实例所有场景中需要用的数据
*/
var GameManager_1 = require("../Game/GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GamePanel = /** @class */ (function (_super) {
    __extends(GamePanel, _super);
    function GamePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btn_Play = null;
        _this.btn_Pause = null;
        _this.txt_Score = null;
        return _this;
    }
    GamePanel.prototype.onLoad = function () {
        this.btn_Play = this.node.getChildByName("btn_Play");
        this.btn_Pause = this.node.getChildByName("btn_Pause");
        this.txt_Score = this.node.getChildByName("txt_Score").getComponent(cc.Label);
        this.onInit();
    };
    GamePanel.prototype.onDestroy = function () {
    };
    GamePanel.prototype.onInit = function () {
        this.btn_Play.active = false;
        this.btn_Pause.active = true;
        this.btn_Play.on(cc.Node.EventType.TOUCH_END, this.onPlayButtonClick, this);
        this.btn_Pause.on(cc.Node.EventType.TOUCH_END, this.onPauseButtonClick, this);
        //this.updateScoreText();
    };
    GamePanel.prototype.onPlayButtonClick = function () {
        this.btn_Play.active = !this.btn_Play.active;
        this.btn_Pause.active = !this.btn_Pause.active;
        cc.director.pause();
        GameManager_1.GameManager.Instance.IsPause = true;
    };
    GamePanel.prototype.onPauseButtonClick = function () {
        this.btn_Play.active = !this.btn_Play.active;
        this.btn_Pause.active = !this.btn_Pause.active;
        cc.director.resume();
        GameManager_1.GameManager.Instance.IsPause = false;
    };
    //更新成绩
    GamePanel.prototype.updateScoreText = function (score) {
        this.txt_Score.string = score.toString();
    };
    GamePanel = __decorate([
        ccclass
    ], GamePanel);
    return GamePanel;
}(cc.Component));
exports.GamePanel = GamePanel;

cc._RF.pop();