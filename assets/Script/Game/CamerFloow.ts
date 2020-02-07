import PlatformSpawn from "./PlatformSpawner";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CamraFollow extends cc.Component {

    private followtarget: cc.Node = null;

    start() {


    }
    update() {
        if (this.followtarget != null) {

            this.node.setPosition(this.followtarget.getPosition());
        } else {

            this.followtarget = cc.find("Canvas/PlatformSpawn/characters_3");
        }

    }

}