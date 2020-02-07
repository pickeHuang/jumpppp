(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Game/PlatformScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8656eFG3FFOWrkdy+mcnY17', 'PlatformScript', __filename);
// Script/Game/PlatformScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PlatformScript = /** @class */ (function (_super) {
    __extends(PlatformScript, _super);
    function PlatformScript() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlatformScript.prototype.setPostion = function (pos) {
        this.floornewPos = this.node.position.sub(pos);
    };
    PlatformScript.prototype.getNewPos = function () {
        return this.floornewPos;
    };
    PlatformScript = __decorate([
        ccclass
    ], PlatformScript);
    return PlatformScript;
}(cc.Component));
exports.default = PlatformScript;

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
        //# sourceMappingURL=PlatformScript.js.map
        