"use strict";
cc._RF.push(module, '6fffe8TzSRPCKTgMDmrYVAX', 'EventeCenter');
// Script/Event/EventeCenter.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ObjectBox = /** @class */ (function () {
    function ObjectBox(_type, _callback) {
        this.eventType = _type;
        this.callback = _callback;
    }
    ObjectBox.prototype.Brocast = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.callback.apply(this, args);
    };
    return ObjectBox;
}());
/**事件中心 */
var EventCenter = /** @class */ (function () {
    function EventCenter() {
        this.listner = {};
    }
    EventCenter.prototype.AddListner = function (eventType, callback) {
        // let objectbox:ObjectBox[]=this.listner[eventType];
        // console.log(objectbox);
        // this.listner[eventType]=[];
        // this.listner[eventType]=(new ObjectBox(eventType,callback));
        // console.log(this.listner);
    };
    EventCenter.prototype.RemoveListner = function (eventType, callback) {
    };
    EventCenter.prototype.BroCast = function (eventType) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    };
    EventCenter.instance = new EventCenter();
    return EventCenter;
}());
exports.default = EventCenter.instance;

cc._RF.pop();