(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/UI/MainPanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e0e306w4ntPna2U5cTu9PfD', 'MainPanel', __filename);
// Script/UI/MainPanel.ts

/*
    2020.2.6 @Youxiaobai
    主面板的点击事件
*/
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MainPanel = /** @class */ (function (_super) {
    __extends(MainPanel, _super);
    function MainPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btn_Start = null;
        return _this;
    }
    MainPanel.prototype.onLoad = function () {
        this.btn_Start = this.node.getChildByName("btn_Start").getComponent(cc.Button);
        this.btn_Start.node.on(cc.Node.EventType.TOUCH_END, this.OnStartButtonClick, this);
    };
    MainPanel.prototype.onDestroy = function () {
    };
    MainPanel.prototype.OnStartButtonClick = function () {
        cc.director.loadScene("Game");
    };
    MainPanel = __decorate([
        ccclass
    ], MainPanel);
    return MainPanel;
}(cc.Component));
exports.MainPanel = MainPanel;

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
        //# sourceMappingURL=MainPanel.js.map
        