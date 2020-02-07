"use strict";
cc._RF.push(module, 'd75daJCZ0FPqJTgOq70D5Vy', 'GameData');
// Script/Game/GameData.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameData = /** @class */ (function () {
    function GameData() {
        this.isFrirtGame = null;
        this.isMusicOn = null;
        this.bestScoreArr = null;
    }
    Object.defineProperty(GameData.prototype, "IsFirstGame", {
        get: function () { return this.isFrirtGame; },
        set: function (_isFirstGame) { this.isFrirtGame = _isFirstGame; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameData.prototype, "IsMusicOn", {
        get: function () { return this.isMusicOn; },
        set: function (_isMusicOn) { this.isMusicOn = _isMusicOn; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameData.prototype, "BestScoreArr", {
        get: function () { return this.bestScoreArr; },
        set: function (_bestScore) { this.bestScoreArr = _bestScore; },
        enumerable: true,
        configurable: true
    });
    //是否再来一次游戏
    GameData.IsAgainGame = false;
    return GameData;
}());
exports.GameData = GameData;

cc._RF.pop();