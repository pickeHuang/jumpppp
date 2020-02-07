

/*
    主场景面板
    实例所有场景中需要用的数据
*/
import { GameManager } from "../Game/GameManager";


const { ccclass, property } = cc._decorator;

@ccclass
export class GamePanel extends cc.Component {

    private btn_Play: cc.Node = null;
    private btn_Pause: cc.Node = null;
    private txt_Score: cc.Label = null;

    onLoad() {

        this.btn_Play = this.node.getChildByName("btn_Play");
        this.btn_Pause = this.node.getChildByName("btn_Pause");
        this.txt_Score = this.node.getChildByName("txt_Score").getComponent(cc.Label);
        this.onInit();

    }

    onDestroy() {

    }

    private onInit(): void {

        this.btn_Play.active = false;
        this.btn_Pause.active = true;

        this.btn_Play.on(cc.Node.EventType.TOUCH_END, this.onPlayButtonClick, this);
        this.btn_Pause.on(cc.Node.EventType.TOUCH_END, this.onPauseButtonClick, this);
        //this.updateScoreText();
    }

    
    private onPlayButtonClick(): void {


        this.btn_Play.active = !this.btn_Play.active;
        this.btn_Pause.active = !this.btn_Pause.active;
        cc.director.pause();
        GameManager.Instance.IsPause = true;
    }


    private onPauseButtonClick(): void {

        this.btn_Play.active = !this.btn_Play.active;
        this.btn_Pause.active = !this.btn_Pause.active;
        cc.director.resume();
        GameManager.Instance.IsPause = false;
    }

    //更新成绩
    private updateScoreText(score: number): void {

        this.txt_Score.string = score.toString();
    }

}