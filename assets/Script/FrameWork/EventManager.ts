
export class ClickEvent2CreatTool{
    private static _instance : ClickEvent2CreatTool = null;
    public static get Instance() : ClickEvent2CreatTool{
        if( !ClickEvent2CreatTool._instance ){
            ClickEvent2CreatTool._instance = new ClickEvent2CreatTool();
        }
        return ClickEvent2CreatTool._instance;
    }

    public create( $node : cc.Node , $component : string , $handler : string , $param : any ) : cc.Component.EventHandler{
        let $event : cc.Component.EventHandler = new cc.Component.EventHandler();
        $event.target = $node;
        $event.component = $component;
        $event.handler = $handler;
        if( $param )
            $event.customEventData = $param;
        return $event;
    }
}