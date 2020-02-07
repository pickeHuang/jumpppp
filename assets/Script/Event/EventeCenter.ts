
class ObjectBox{

    private callback:Function;
    private eventType:EventType;

    constructor(_type:EventType,_callback:Function) {
         this.eventType=_type;
         this.callback=_callback;
    }


    public Brocast(...args:any){
        this.callback(...args);
    }
}



/**事件中心 */
class EventCenter{

    public static readonly instance =new EventCenter();

    private listner={};

    public AddListner(eventType?:EventType,callback?:Function) {

        // let objectbox:ObjectBox[]=this.listner[eventType];
        // console.log(objectbox);
        // this.listner[eventType]=[];
        // this.listner[eventType]=(new ObjectBox(eventType,callback));
        // console.log(this.listner);
       

    }

    public RemoveListner(eventType:EventType,callback:Function) {
        
    }

    public BroCast(eventType:EventType,...args:any) {

    }
}

export default EventCenter.instance;
