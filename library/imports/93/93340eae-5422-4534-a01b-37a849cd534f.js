"use strict";
cc._RF.push(module, '933406uVCJFNKAbN6hJzVNP', 'GameManager');
// Script/Game/GameManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameData_1 = require("./GameData");
/*
    游戏管理类  单例类
*/
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManager = /** @class */ (function (_super) {
    __extends(GameManager, _super);
    function GameManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = null;
        //游戏是否开始
        _this.isGameStarted = null;
        //游戏是否结束
        _this.isGameOver = null;
        //玩家是否开始移动
        _this.playerIsMove = null;
        //玩家是否暂停游戏
        _this.isPause = null;
        //游戏成绩
        _this.gameScore = null;
        _this.isFirstGame = null;
        _this.isMusicOn = null;
        _this.bestScoreArr = [];
        return _this;
    }
    GameManager_1 = GameManager;
    Object.defineProperty(GameManager, "Instance", {
        get: function () {
            if (!GameManager_1.instance) {
                GameManager_1.instance = new GameManager_1();
            }
            return GameManager_1.instance;
        },
        enumerable: true,
        configurable: true
    });
    //初始化
    GameManager.prototype.onLoad = function () {
        cc.game.addPersistRootNode(this.node);
        if (GameData_1.GameData.IsAgainGame) {
            this.IsGameStarted = true;
        }
        this.initGameData();
    };
    GameManager.prototype.onDestroy = function () {
    };
    //保存成绩
    GameManager.prototype.SaveScore = function (score) {
        //let list: Array<number> = this.bestScoreArr;
        this.bestScoreArr.sort(function (a, b) {
            return b - a;
        });
        var index = -1;
        for (var i = 0; i < this.bestScoreArr.length; i++) {
            if (score > this.bestScoreArr[i]) {
                index = i;
            }
        }
        if (index == -1)
            return;
        for (var i = this.bestScoreArr.length - 1; i > index; i--) {
            this.bestScoreArr[i] - this.bestScoreArr[i - 1];
        }
        this.bestScoreArr[index] = score;
        //this.Save();
    };
    //获取成绩最高分
    GameManager.prototype.GetBestScore = function () {
        var bestScore = Math.max.call(this.bestScoreArr);
        return bestScore;
    };
    //获取成绩最高分数组
    GameManager.prototype.GetScoreArr = function () {
        this.bestScoreArr.sort(function (a, b) {
            return b - a;
        });
        return this, this.bestScoreArr;
    };
    //玩家移动会调用此方法
    GameManager.prototype.PlayerMove = function () {
        this.playerIsMove = true;
    };
    //增加游戏成绩
    GameManager.prototype.AddGameScore = function () {
        if (this.isGameStarted == false || this.isGameOver || this.isPause)
            return;
        this.gameScore++;
    };
    //获取游戏成绩
    GameManager.prototype.GetGameScore = function () {
        return this.gameScore;
    };
    GameManager.prototype.initGameData = function () {
        if (this.data != null) {
            this.isFirstGame = this.data.IsFirstGame;
        }
        else {
            this.isFirstGame = true;
        }
        //如果是第一次玩游戏
        if (this.isFirstGame) {
            this.isFirstGame = false;
            this.isMusicOn = true;
            this.bestScoreArr = [1, 2, 3];
            this.data = new GameData_1.GameData();
            //保存数据
            //this.Save();
        }
        else {
        }
    };
    //存储数据
    GameManager.prototype.Save = function () {
        try {
            cc.sys.localStorage.setItem("bestscoreArr", this.bestScoreArr);
            cc.sys.localStorage.setItem("isFirstGame", this.isFirstGame);
            cc.sys.localStorage.setItem("isMusic", this.isMusicOn);
        }
        catch (err) {
            console.log("消息异常", err);
        }
    };
    //读取数据
    GameManager.prototype.Read = function () {
        try {
            this.bestScoreArr = cc.sys.localStorage.getItem("bestscoreArr");
            this.isFirstGame = cc.sys.localStorage.getItem("isFirstGame");
            this.isMusicOn = cc.sys.localStorage.getItem("isMusic");
        }
        catch (error) {
            console.log("读取失败", error);
        }
    };
    //重置数据
    GameManager.prototype.ResetData = function () {
        this.isFirstGame = false;
        this.isMusicOn = true;
        this.bestScoreArr = new Number[3];
        //this.Save();
    };
    Object.defineProperty(GameManager.prototype, "IsMusicOn", {
        get: function () { return this.isMusicOn; },
        //set get
        set: function (value) { this.isMusicOn = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "IsGameOver", {
        get: function () { return this.IsGameOver; },
        set: function (value) { this.IsGameOver = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "PlayerIsMove", {
        get: function () { return this.PlayerIsMove; },
        set: function (value) { this.PlayerIsMove = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "IsGameStarted", {
        get: function () { return this.IsGameStarted; },
        set: function (value) { this.IsGameStarted = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "IsPause", {
        get: function () { return this.isPause; },
        set: function (value) { this.isPause = value; },
        enumerable: true,
        configurable: true
    });
    var GameManager_1;
    GameManager.instance = null;
    GameManager = GameManager_1 = __decorate([
        ccclass
    ], GameManager);
    return GameManager;
}(cc.Component));
exports.GameManager = GameManager;

cc._RF.pop();