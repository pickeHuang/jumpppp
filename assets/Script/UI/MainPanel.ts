/*
    2020.2.6 @Youxiaobai
    主面板的点击事件
*/


const { ccclass, property } = cc._decorator;

@ccclass
export  class MainPanel extends cc.Component {


    private btn_Start: cc.Button = null;


    onLoad() {

        this.btn_Start = this.node.getChildByName("btn_Start").getComponent(cc.Button);
        this.btn_Start.node.on(cc.Node.EventType.TOUCH_END,this.OnStartButtonClick,this);
    }
    onDestroy(): void {
    }

    private OnStartButtonClick(): void {
        cc.director.loadScene("Game");
    }
}
