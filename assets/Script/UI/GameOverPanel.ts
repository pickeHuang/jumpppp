import { GameData } from "../Game/GameData";
import { GameManager } from "../Game/GameManager";

/**
 * 游戏结束管理
 */

const { ccclass, property } = cc._decorator;

@ccclass
export class GameOverPanel extends cc.Component {

    @property({ type: cc.Node })
    private btn_Home: cc.Node = null;

    @property({ type: cc.Node })
    private btn_Restart: cc.Node = null;

    @property({ type: cc.Label })
    private txt_Score: cc.Label = null;

    @property({ type: cc.Label })
    private txt_BestScore: cc.Label = null;

    @property({ type: cc.Node })
    private img_New: cc.Node = null;


    onLoad() {

        this.btn_Restart.on(cc.Node.EventType.TOUCH_END, this.OnRestartButtononClick, this);
        this.btn_Home.on(cc.Node.EventType.TOUCH_END, this.OnHomeButtononClick, this);

        //this.Show();

        this.node.active = false;
    }

    private Show(): void {

        if (GameManager.Instance.GetGameScore() > GameManager.Instance.GetBestScore()) {

            this.img_New.active = true;
            this.txt_BestScore.string = "最高分" + GameManager.Instance.GetBestScore();
        } else {
            this.img_New.active = false;
            this.txt_BestScore.string = "最高分" + GameManager.Instance.GetGameScore();
        }
        GameManager.Instance.SaveScore(GameManager.Instance.GetGameScore());
        this.txt_Score.string = GameManager.Instance.GetGameScore().toString();
        this.node.active = true;
    }

    //再来一局游戏按钮
    private OnRestartButtononClick(): void {

        cc.director.loadScene("Game");
        GameData.IsAgainGame = true;
    }

    //主界面按钮点击
    private OnHomeButtononClick(): void {

        cc.director.loadScene("Start");
        GameData.IsAgainGame = false;
    }
}