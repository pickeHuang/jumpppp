export class GameData {


    //是否再来一次游戏
    public static IsAgainGame: boolean = false;

    private isFrirtGame: boolean = null;
    private isMusicOn: boolean = null;
    private bestScoreArr: number[] = null;

    get IsFirstGame() { return this.isFrirtGame; }
    set IsFirstGame(_isFirstGame: boolean) { this.isFrirtGame = _isFirstGame; }
   
    get IsMusicOn() { return this.isMusicOn; }
    set IsMusicOn(_isMusicOn: boolean) { this.isMusicOn = _isMusicOn; }
    
    get BestScoreArr() { return this.bestScoreArr; }
    set BestScoreArr(_bestScore: number[]) { this.bestScoreArr = _bestScore; }

  
   
    

}