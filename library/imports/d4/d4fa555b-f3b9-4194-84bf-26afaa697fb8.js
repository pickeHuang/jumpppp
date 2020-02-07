"use strict";
cc._RF.push(module, 'd4fa5Vb87lBlIS/Jq+qaX+4', 'PlatformSpawner');
// Script/Game/PlatformSpawner.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var path;
(function (path) {
    path["floor"] = "Prefabs/Platform/floor";
    path["character"] = "Prefabs/Character/characters_3";
})(path || (path = {}));
var PlatformSpawn = /** @class */ (function (_super) {
    __extends(PlatformSpawn, _super);
    function PlatformSpawn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**生成个数 */
        _this.spawnCount = 4;
        return _this;
    }
    PlatformSpawn.prototype.onLoad = function () {
        this.touchnode = cc.find("Canvas/TouchNode");
        this.touchnode.on(cc.Node.EventType.TOUCH_START, this.DecidePath, this);
        this.isleftspawn = false;
        this.spawnPos = new cc.Vec2(0, -200);
    };
    PlatformSpawn.prototype.start = function () {
        this.startInit();
        // cc.loader.loadRes('Prefabs/Platform/floor', (err, prefab) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         this.floorPre = cc.instantiate(prefab);
        //         this.node.addChild(this.floorPre);
        //         this.SpwanFloor();
        //     }
        //     for (let i = 0; i < this.spawnCount; i++) {
        //         this.spawnCount = 4;
        //         this.DecidePath();
        //     }
        // });
        // cc.loader.loadRes('Prefabs/Character/characters_3', (err, prefab) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         this.character = cc.instantiate(prefab);
        //         this.node.addChild(this.character);
        //         this.character.setPosition(this.floorPre.getPosition().x,this.floorPre.getPosition().y+60);
        //     }
        // });
    };
    PlatformSpawn.prototype.startInit = function () {
        this.createFloor();
        this.createCharacter();
    };
    PlatformSpawn.prototype.createFloor = function () {
        return __awaiter(this, void 0, Promise, function () {
            var floorp, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadPrefab(path.floor)];
                    case 1:
                        floorp = _a.sent();
                        this.floorPre = cc.instantiate(floorp.prefab);
                        this.node.addChild(this.floorPre);
                        this.SpwanFloor();
                        for (i = 0; i < this.spawnCount; i++) {
                            this.spawnCount = 4;
                            this.DecidePath();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PlatformSpawn.prototype.createCharacter = function () {
        return __awaiter(this, void 0, Promise, function () {
            var charcterp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadPrefab(path.character)];
                    case 1:
                        charcterp = _a.sent();
                        this.character = cc.instantiate(charcterp.prefab);
                        this.node.addChild(this.character);
                        this.character.setPosition(this.floorPre.getPosition().x, this.floorPre.getPosition().y + 60);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**确定生成路径 */
    PlatformSpawn.prototype.DecidePath = function (event) {
        if (this.spawnCount > 0) {
            this.spawnCount--;
            //生成方法
            this.SpwanFloor();
        }
        else {
            this.isleftspawn = !this.isleftspawn;
            this.spawnCount = 3;
            this.SpwanFloor();
        }
    };
    /**实例化地板并且计算下一块的位置 */
    PlatformSpawn.prototype.SpwanFloor = function () {
        var floorobj = cc.instantiate(this.floorPre);
        this.node.addChild(floorobj);
        floorobj.setPosition(this.spawnPos);
        if (this.isleftspawn) {
            this.spawnPos = new cc.Vec2(this.spawnPos.x - 65, this.spawnPos.y + 70);
        }
        else {
            this.spawnPos = new cc.Vec2(this.spawnPos.x + 65, this.spawnPos.y + 70);
        }
    };
    /**
     * 动态加载预制体
     * @param _file 路径
     */
    PlatformSpawn.prototype.loadPrefab = function (_file) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (reslove) {
                        cc.loader.loadRes(_file, function (error, resource) {
                            if (error) {
                                console.error("资源加载错误：", error);
                                reslove({ prefab: null });
                            }
                            else {
                                reslove({ prefab: resource });
                            }
                        });
                    })];
            });
        });
    };
    PlatformSpawn.prototype.onDestroy = function () {
        this.touchnode.on(cc.Node.EventType.TOUCH_START, this.DecidePath, this);
    };
    PlatformSpawn = __decorate([
        ccclass
    ], PlatformSpawn);
    return PlatformSpawn;
}(cc.Component));
exports.default = PlatformSpawn;

cc._RF.pop();