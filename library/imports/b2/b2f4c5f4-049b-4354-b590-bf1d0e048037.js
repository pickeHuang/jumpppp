"use strict";
cc._RF.push(module, 'b2f4cX0BJtDVLWQvx0OBIA3', 'EventManager');
// Script/FrameWork/EventManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ClickEvent2CreatTool = /** @class */ (function () {
    function ClickEvent2CreatTool() {
    }
    Object.defineProperty(ClickEvent2CreatTool, "Instance", {
        get: function () {
            if (!ClickEvent2CreatTool._instance) {
                ClickEvent2CreatTool._instance = new ClickEvent2CreatTool();
            }
            return ClickEvent2CreatTool._instance;
        },
        enumerable: true,
        configurable: true
    });
    ClickEvent2CreatTool.prototype.create = function ($node, $component, $handler, $param) {
        var $event = new cc.Component.EventHandler();
        $event.target = $node;
        $event.component = $component;
        $event.handler = $handler;
        if ($param)
            $event.customEventData = $param;
        return $event;
    };
    ClickEvent2CreatTool._instance = null;
    return ClickEvent2CreatTool;
}());
exports.ClickEvent2CreatTool = ClickEvent2CreatTool;

cc._RF.pop();