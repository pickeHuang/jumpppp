(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/UI/GameOverPanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '638a8T5TwJBS5drwSPwv0vS', 'GameOverPanel', __filename);
// Script/UI/GameOverPanel.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameData_1 = require("../Game/GameData");
var GameManager_1 = require("../Game/GameManager");
/**
 * 游戏结束管理
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameOverPanel = /** @class */ (function (_super) {
    __extends(GameOverPanel, _super);
    function GameOverPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btn_Home = null;
        _this.btn_Restart = null;
        _this.txt_Score = null;
        _this.txt_BestScore = null;
        _this.img_New = null;
        return _this;
    }
    GameOverPanel.prototype.onLoad = function () {
        this.btn_Restart.on(cc.Node.EventType.TOUCH_END, this.OnRestartButtononClick, this);
        this.btn_Home.on(cc.Node.EventType.TOUCH_END, this.OnHomeButtononClick, this);
        //this.Show();
        this.node.active = false;
    };
    GameOverPanel.prototype.Show = function () {
        if (GameManager_1.GameManager.Instance.GetGameScore() > GameManager_1.GameManager.Instance.GetBestScore()) {
            this.img_New.active = true;
            this.txt_BestScore.string = "最高分" + GameManager_1.GameManager.Instance.GetBestScore();
        }
        else {
            this.img_New.active = false;
            this.txt_BestScore.string = "最高分" + GameManager_1.GameManager.Instance.GetGameScore();
        }
        GameManager_1.GameManager.Instance.SaveScore(GameManager_1.GameManager.Instance.GetGameScore());
        this.txt_Score.string = GameManager_1.GameManager.Instance.GetGameScore().toString();
        this.node.active = true;
    };
    //再来一局游戏按钮
    GameOverPanel.prototype.OnRestartButtononClick = function () {
        cc.director.loadScene("Game");
        GameData_1.GameData.IsAgainGame = true;
    };
    //主界面按钮点击
    GameOverPanel.prototype.OnHomeButtononClick = function () {
        cc.director.loadScene("Start");
        GameData_1.GameData.IsAgainGame = false;
    };
    __decorate([
        property({ type: cc.Node })
    ], GameOverPanel.prototype, "btn_Home", void 0);
    __decorate([
        property({ type: cc.Node })
    ], GameOverPanel.prototype, "btn_Restart", void 0);
    __decorate([
        property({ type: cc.Label })
    ], GameOverPanel.prototype, "txt_Score", void 0);
    __decorate([
        property({ type: cc.Label })
    ], GameOverPanel.prototype, "txt_BestScore", void 0);
    __decorate([
        property({ type: cc.Node })
    ], GameOverPanel.prototype, "img_New", void 0);
    GameOverPanel = __decorate([
        ccclass
    ], GameOverPanel);
    return GameOverPanel;
}(cc.Component));
exports.GameOverPanel = GameOverPanel;

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
        //# sourceMappingURL=GameOverPanel.js.map
        