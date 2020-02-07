
const { ccclass, property } = cc._decorator;

const enum path {
    floor = "Prefabs/Platform/floor",
    character = "Prefabs/Character/characters_3"
}

@ccclass
export default class PlatformSpawn extends cc.Component {


    /**地板的prefab */
    private floorPre: cc.Node;
    /** 初始位置*/
    private spawnPos: cc.Vec2;
    /**生成个数 */
    private spawnCount: number = 4;
    /**是否生成在左边 */
    private isleftspawn: boolean;
    private touchnode: cc.Node;
    private character: cc.Node;



    onLoad() {

        this.touchnode = cc.find("Canvas/TouchNode");
        this.touchnode.on(cc.Node.EventType.TOUCH_START, this.DecidePath, this);
        this.isleftspawn = false;
        this.spawnPos = new cc.Vec2(0, -200);

    }

    start() {
        this.startInit();
        // cc.loader.loadRes('Prefabs/Platform/floor', (err, prefab) => {
        //     if (err) {

        //         console.log(err);

        //     } else {

        //         this.floorPre = cc.instantiate(prefab);
        //         this.node.addChild(this.floorPre);
        //         this.SpwanFloor();
        //     }
        //     for (let i = 0; i < this.spawnCount; i++) {
        //         this.spawnCount = 4;
        //         this.DecidePath();
        //     }
        // });

        // cc.loader.loadRes('Prefabs/Character/characters_3', (err, prefab) => {
        //     if (err) {

        //         console.log(err);

        //     } else {

        //         this.character = cc.instantiate(prefab);
        //         this.node.addChild(this.character);
        //         this.character.setPosition(this.floorPre.getPosition().x,this.floorPre.getPosition().y+60);

        //     }
        // });
    }

    private  startInit() {

        this.createFloor();
        this.createCharacter();
       
    }

    private async createFloor(): Promise<void> {
        let floorp = await this.loadPrefab(path.floor);
        this.floorPre = cc.instantiate(floorp.prefab);
        this.node.addChild(this.floorPre);
        this.SpwanFloor();
        for (let i = 0; i < this.spawnCount; i++) {
            this.spawnCount = 4;
            this.DecidePath();
        }
    }

    private async createCharacter(): Promise<void> {
        let charcterp = await this.loadPrefab(path.character);
        this.character = cc.instantiate(charcterp.prefab);
        this.node.addChild(this.character);
        this.character.setPosition(this.floorPre.getPosition().x, this.floorPre.getPosition().y + 60);
    }

    /**确定生成路径 */
    public DecidePath(event?: any): void {

        if (this.spawnCount > 0) {
            this.spawnCount--;
            //生成方法
            this.SpwanFloor();
        } else {
            this.isleftspawn = !this.isleftspawn;
            this.spawnCount = 3;
            this.SpwanFloor();

        }
    }

    /**实例化地板并且计算下一块的位置 */
    private SpwanFloor(): void {

        let floorobj = cc.instantiate(this.floorPre);
        this.node.addChild(floorobj);
        floorobj.setPosition(this.spawnPos);

        if (this.isleftspawn) {

            this.spawnPos = new cc.Vec2(this.spawnPos.x - 65, this.spawnPos.y + 70);
        }
        else {
            this.spawnPos = new cc.Vec2(this.spawnPos.x + 65, this.spawnPos.y + 70);
        }
    }

    /**
     * 动态加载预制体
     * @param _file 路径
     */
    public async loadPrefab(_file: string): Promise<{ prefab: cc.Prefab }> {
        return new Promise((reslove) => {
            cc.loader.loadRes(_file, (error: Error, resource: any) => {
                if (error) {
                    console.error("资源加载错误：", error);
                    reslove({ prefab: null })
                } else {
                    reslove({ prefab: resource });
                }
            })
        })

    }

    onDestroy() {

        this.touchnode.on(cc.Node.EventType.TOUCH_START, this.DecidePath, this);

    }



}
