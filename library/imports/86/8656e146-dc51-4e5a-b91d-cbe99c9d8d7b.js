"use strict";
cc._RF.push(module, '8656eFG3FFOWrkdy+mcnY17', 'PlatformScript');
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