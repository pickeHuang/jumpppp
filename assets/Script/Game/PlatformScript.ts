

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlatformScript extends cc.Component {

    private floornewPos: cc.Vec2;


    public setPostion(pos: cc.Vec2) {

        this.floornewPos = this.node.position.sub(pos);

    }

    public getNewPos(): cc.Vec2 {

        return this.floornewPos;
    }
}
