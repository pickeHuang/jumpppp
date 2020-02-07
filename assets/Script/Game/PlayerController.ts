import { GameManager } from "./GameManager";
/**
 * 
 * 玩家控制类
 * 
 * Author  YouxiXiaobai
 * 
 * 2020-02-07  
 */

const { ccclass, property } = cc._decorator;

@ccclass
export class PlayerController extends cc.Component {

    /**移动速度 */
    @property()
    private movespeed: number = 0;
    /** 移动的高度*/
    @property()
    private moveheight: number = 0;
    /** 移动的宽度*/
    @property()
    private movewidth: number = 0;

    //跳跃高度
    @property(cc.Integer)
    public jumpHeight: number = 180;

    @property(cc.Integer)
    public jumpDuration: number = 0.3;

    /**接收点击的节点 */
    private touchnode: cc.Node;

    /**点击的位置 X坐标*/
    private pointX: number;
    /**接收点击事件节点的宽 */
    private touchnodewidth: number;

    private tween: any;

    //是否向左移动，反之向右移动
    private isMoveLeft: boolean = false;

    //是否在正跳跃
    private isJumping: boolean = false;

    private nextPlatformLeft: cc.Vec3 = null;
    private nextPlatformRight: cc.Vec3 = null;
    private my_Body: cc.RigidBody = null;
    private isMove: boolean = false;


    onLoad() {

        //this.my_Body=this.node.getComponent(cc.RigidBody);
        this.touchnode = cc.find("Canvas/TouchNode");
        this.touchnode.on(cc.Node.EventType.TOUCH_START, this.setLeft, this)
    }

    /** 设置isleft*/
    private setLeft(event: cc.Event.EventTouch): void {

        console.log("aaa")
        this.pointX = event.getLocationX();
        this.touchnodewidth = this.touchnode.width;
        let centerwidth = this.touchnodewidth / 2;

        if (this.pointX <= centerwidth) {
            this.isMoveLeft = true;
            this.node.setScale(new cc.Vec2(-1, 1))
        }
        else {
            this.isMoveLeft = false;
            this.node.setScale(new cc.Vec2(1, 1))
        }
        this.setMoveDir();
    }

    /**设置移动的方向 */
    private setMoveDir() {

        this.MovePosition(this.isMoveLeft);
        GameManager.Instance.AddGameScore();
    }

    onDestroy() {

        this.touchnode.off(cc.Node.EventType.TOUCH_START, this.setLeft, this);
    }

    /**移动位置 */
    public MovePosition(isleft: boolean) {

        if (isleft) {

            console.log("往左边动");
            let waciton = cc.moveBy(this.movespeed, new cc.Vec2(-this.movewidth, 0));
            let haction = cc.moveBy(this.movespeed, new cc.Vec2(0, this.moveheight));
            this.node.runAction(cc.spawn(waciton, haction));

        }
        else {
            console.log("往右边动");
            let waciton = cc.moveBy(this.movespeed, new cc.Vec2(this.movewidth, 0));
            let haction = cc.moveBy(this.movespeed, new cc.Vec2(0, this.moveheight));
            this.node.runAction(cc.spawn(waciton, haction));

        }
        this.Jump();
    }


    private Jump(): void {
        if (this.isJumping) {

            this.setJumoAction();

        } else {
            return;
        }
    }

    public setJumoAction(): cc.ActionInterval {
        let jumpUp: cc.ActionInterval = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        let jumpDonw: cc.ActionInterval = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // 添加一个回调函数，用于在动作结束时调用我们定义的其他方法
        return cc.repeatForever(cc.sequence(jumpUp, jumpDonw));
    }

}