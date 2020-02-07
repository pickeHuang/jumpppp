"use strict";
cc._RF.push(module, 'dba6fAaqtlMUIpyk31GJDYl', 'CamerFloow');
// Script/Game/CamerFloow.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CamraFollow = /** @class */ (function (_super) {
    __extends(CamraFollow, _super);
    function CamraFollow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.followtarget = null;
        return _this;
    }
    CamraFollow.prototype.start = function () {
    };
    CamraFollow.prototype.update = function () {
        if (this.followtarget != null) {
            this.node.setPosition(this.followtarget.getPosition());
        }
        else {
            this.followtarget = cc.find("Canvas/PlatformSpawn/characters_3");
        }
    };
    CamraFollow = __decorate([
        ccclass
    ], CamraFollow);
    return CamraFollow;
}(cc.Component));
exports.default = CamraFollow;

cc._RF.pop();