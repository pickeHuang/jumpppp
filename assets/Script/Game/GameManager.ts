import { GameData } from "./GameData";

/*
    游戏管理类  单例类
*/

const { ccclass, property } = cc._decorator;

@ccclass
export class GameManager extends cc.Component {

    private static instance: GameManager = null;

    public static get Instance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    private data: GameData = null;
    //游戏是否开始
    public isGameStarted: boolean = null;

    //游戏是否结束
    public isGameOver: boolean = null;

    //玩家是否开始移动
    public playerIsMove: boolean = null;

    //玩家是否暂停游戏
    public isPause: boolean = null;

    //游戏成绩
    private gameScore: number = null;

    private isFirstGame: boolean = null;
    private isMusicOn: boolean = null;
    private bestScoreArr: number[] = [];


    //初始化
    onLoad() {

        cc.game.addPersistRootNode(this.node);

        if (GameData.IsAgainGame) {
            this.IsGameStarted = true;
        }
        this.initGameData();

    }
    onDestroy() {

    }
    //保存成绩
    public SaveScore(score: number) {

        //let list: Array<number> = this.bestScoreArr;
        this.bestScoreArr.sort((a, b) => {
            return b - a;
        });

        let index: number = -1;
        for (let i = 0; i < this.bestScoreArr.length; i++) {
            if (score > this.bestScoreArr[i]) {
                index = i;
            }
        }
        if (index == -1) return;
        for (let i = this.bestScoreArr.length - 1; i > index; i--) {
            this.bestScoreArr[i] - this.bestScoreArr[i - 1];
        }
        this.bestScoreArr[index] = score;

        //this.Save();
    }

    //获取成绩最高分
    public GetBestScore(): number {
        let bestScore = Math.max.call(this.bestScoreArr);
        return bestScore;
    }

    //获取成绩最高分数组
    public GetScoreArr(): number[] {

        this.bestScoreArr.sort((a, b) => {
            return b - a;
        });
        return this, this.bestScoreArr;
    }

    //玩家移动会调用此方法
    private PlayerMove(): void {

        this.playerIsMove = true;
    }

    //增加游戏成绩
    public AddGameScore(): void {
        if (this.isGameStarted == false || this.isGameOver || this.isPause) return;
        this.gameScore++;

    }

    //获取游戏成绩
    public GetGameScore(): number {
        return this.gameScore;
    }

    private initGameData(): void {

        if (this.data != null) {
            this.isFirstGame = this.data.IsFirstGame;
        } else {
            this.isFirstGame = true;
        }
        //如果是第一次玩游戏
        if (this.isFirstGame) {
            this.isFirstGame = false;
            this.isMusicOn = true;
            this.bestScoreArr = [1,2,3];

            this.data = new GameData();
            //保存数据
            //this.Save();
        } else {

        }
    }

    //存储数据
    private Save(): void {
        try {

            cc.sys.localStorage.setItem("bestscoreArr", this.bestScoreArr);
            cc.sys.localStorage.setItem("isFirstGame", this.isFirstGame);
            cc.sys.localStorage.setItem("isMusic", this.isMusicOn);
        }
        catch (err) {
            console.log("消息异常", err);
        }
    }

    //读取数据
    private Read(): void {

        try {

          this.bestScoreArr =  cc.sys.localStorage.getItem("bestscoreArr");
          this.isFirstGame =  cc.sys.localStorage.getItem("isFirstGame");
          this.isMusicOn =  cc.sys.localStorage.getItem("isMusic");

        } catch (error) {

            console.log("读取失败", error);
        }
    }

    //重置数据
    public ResetData(): void {

        this.isFirstGame = false;
        this.isMusicOn = true;
        this.bestScoreArr = new Number[3];

        //this.Save();
    }

    //set get
    set IsMusicOn(value: boolean) { this.isMusicOn = value; }
    get IsMusicOn() { return this.isMusicOn; }

    set IsGameOver(value: boolean) { this.IsGameOver = value; }
    get IsGameOver() { return this.IsGameOver; }

    set PlayerIsMove(value: boolean) { this.PlayerIsMove = value; }
    get PlayerIsMove() { return this.PlayerIsMove; }

    set IsGameStarted(value: boolean) { this.IsGameStarted = value; }
    get IsGameStarted() { return this.IsGameStarted; }

    set IsPause(value: boolean) { this.isPause = value; }
    get IsPause() { return this.isPause; }

}