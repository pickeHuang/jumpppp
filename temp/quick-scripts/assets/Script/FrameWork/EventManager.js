(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/FrameWork/EventManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b2f4cX0BJtDVLWQvx0OBIA3', 'EventManager', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=EventManager.js.map
        