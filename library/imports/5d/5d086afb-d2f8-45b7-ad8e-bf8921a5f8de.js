"use strict";
cc._RF.push(module, '5d086r70vhFt62Ov4khpfje', 'ResLoader');
// Script/FrameWork/res/ResLoader.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ResLeakChecker_1 = require("./ResLeakChecker");
// 兼容性处理
var isChildClassOf = cc.js["isChildClassOf"];
if (!isChildClassOf) {
    isChildClassOf = cc["isChildClassOf"];
}
var ccloader = cc.loader;
var ResLoader = /** @class */ (function () {
    function ResLoader() {
        var _this = this;
        this._resMap = new Map();
        this._globalUseId = 0;
        this._lastScene = null;
        this._sceneDepends = null;
        this.resLeakChecker = null;
        // 1. 构造当前场景依赖
        var scene = cc.director.getScene();
        if (scene) {
            this._cacheScene(scene);
        }
        // 2. 监听场景切换
        cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, function (scene) {
            _this._cacheScene(scene);
        });
    }
    /**
     * 从cc.loader中获取一个资源的item
     * @param url 查询的url
     * @param type 查询的资源类型
     */
    ResLoader.prototype._getResItem = function (url, type) {
        var item = ccloader._cache[url];
        if (!item) {
            var uuid = ccloader._getResUuid(url, type, false);
            if (uuid) {
                var ref = ccloader._getReferenceKey(uuid);
                item = ccloader._cache[ref];
            }
        }
        return item;
    };
    /**
     * loadRes方法的参数预处理
     */
    ResLoader.makeLoadResArgs = function () {
        if (arguments.length < 1) {
            console.error("_makeLoadResArgs error " + arguments);
            return null;
        }
        var ret = {};
        if (typeof arguments[0] == "string") {
            ret.url = arguments[0];
        }
        else if (arguments[0] instanceof Array) {
            ret.urls = arguments[0];
        }
        else {
            console.error("_makeLoadResArgs error " + arguments);
            return null;
        }
        for (var i = 1; i < arguments.length; ++i) {
            if (i == 1 && isChildClassOf(arguments[i], cc.RawAsset)) {
                // 判断是不是第一个参数type
                ret.type = arguments[i];
            }
            else if (i == arguments.length - 1 && typeof arguments[i] == "string") {
                // 判断是不是最后一个参数use
                ret.use = arguments[i];
            }
            else if (typeof arguments[i] == "function") {
                // 其他情况为函数
                if (arguments.length > i + 1 && typeof arguments[i + 1] == "function") {
                    ret.onProgess = arguments[i];
                }
                else {
                    ret.onCompleted = arguments[i];
                }
            }
        }
        return ret;
    };
    /**
     * releaseRes方法的参数预处理
     */
    ResLoader.makeReleaseResArgs = function () {
        if (arguments.length < 1) {
            console.error("_makeReleaseResArgs error " + arguments);
            return null;
        }
        var ret = {};
        if (typeof arguments[0] == "string") {
            ret.url = arguments[0];
        }
        else if (arguments[0] instanceof Array) {
            ret.urls = arguments[0];
        }
        else {
            console.error("_makeReleaseResArgs error " + arguments);
            return null;
        }
        for (var i = 1; i < arguments.length; ++i) {
            if (typeof arguments[i] == "string") {
                ret.use = arguments[i];
            }
            else {
                ret.type = arguments[i];
            }
        }
        return ret;
    };
    /**
     * 生成一个资源使用Key
     * @param where 在哪里使用，如Scene、UI、Pool
     * @param who 使用者，如Login、UIHelp...
     * @param why 使用原因，自定义...
     */
    ResLoader.prototype.makeUseKey = function (where, who, why) {
        if (who === void 0) { who = "none"; }
        if (why === void 0) { why = ""; }
        return "use_" + where + "_by_" + who + "_for_" + why;
    };
    /**
     * 自动生成一个唯一的资源id
     */
    ResLoader.prototype.nextUseKey = function () {
        return "@" + ++this._globalUseId;
    };
    /**
     * 获取资源缓存信息
     * @param key 要获取的资源url
     */
    ResLoader.prototype.getCacheInfo = function (key) {
        if (!this._resMap.has(key)) {
            this._resMap.set(key, {
                refs: new Set(),
                uses: new Set()
            });
        }
        return this._resMap.get(key);
    };
    /**
     * 获取资源的url
     * @param asset
     */
    ResLoader.prototype.getUrlByAsset = function (asset) {
        var checkAsset = asset;
        if (checkAsset && checkAsset._uuid) {
            return ccloader._getReferenceKey(checkAsset._uuid);
            ;
        }
        console.error("getUrlByAssets error " + asset);
        return null;
    };
    /**
     * 为某资源增加一个新的use
     * @param key 资源的url
     * @param use 新的use字符串
     */
    ResLoader.prototype.addUse = function (key, use) {
        if (this._resMap.has(key)) {
            var uses = this._resMap.get(key).uses;
            if (!uses.has(use)) {
                uses.add(use);
                if (this.resLeakChecker) {
                    this.resLeakChecker.logLoad(key, use);
                }
                return true;
            }
            else {
                console.warn("addUse " + key + " by " + use + " faile, repeating use key");
                return false;
            }
        }
        console.warn("addUse " + key + " faile, key nofound, make sure you load with resloader");
        return false;
    };
    ResLoader.prototype._buildDepend = function (item, refKey) {
        // 反向关联引用（为所有引用到的资源打上本资源引用到的标记）
        if (item && item.dependKeys && Array.isArray(item.dependKeys)) {
            for (var _i = 0, _a = item.dependKeys; _i < _a.length; _i++) {
                var depKey = _a[_i];
                // 记录该资源被我引用
                var cacheInfo = this.getCacheInfo(depKey);
                if (!cacheInfo.refs.has(refKey)) {
                    this.getCacheInfo(depKey).refs.add(refKey);
                    // cc.log(`${depKey} ref by ${refKey}`);
                    var ccloader_1 = cc.loader;
                    var depItem = ccloader_1._cache[depKey];
                    if (depItem) {
                        this._buildDepend(depItem, depItem.id);
                    }
                }
            }
        }
    };
    /**
     * 缓存一个Item
     * @param item
     * @param use
     */
    ResLoader.prototype._cacheItem = function (item, use, stack) {
        if (item && item.id) {
            var info = this.getCacheInfo(item.id);
            if (use) {
                info.uses.add(use);
                if (this.resLeakChecker) {
                    this.resLeakChecker.logLoad(item.id, use, stack);
                }
            }
            if (!info.refs.has(item.id)) {
                info.refs.add(item.id);
                this._buildDepend(item, item.id);
            }
            return true;
        }
        return false;
    };
    /**
     * 完成一个Item的加载
     * @param url
     * @param assetType
     * @param use
     */
    ResLoader.prototype._finishItem = function (url, assetType, use, stack) {
        var item = this._getResItem(url, assetType);
        if (!this._cacheItem(item, use, stack)) {
            cc.warn("addDependKey item error! for " + url);
        }
    };
    ResLoader.prototype._releaseSceneDepend = function () {
        if (this._sceneDepends) {
            for (var i = 0; i < this._sceneDepends.length; ++i) {
                this.releaseRes(this._sceneDepends[i], ResLoader._sceneUseKey);
            }
            this._sceneDepends = null;
        }
    };
    ResLoader.prototype._cacheSceneDepend = function (depends, useKey) {
        for (var i = 0; i < depends.length; ++i) {
            var item = ccloader._cache[depends[i]];
            this._cacheItem(item, useKey);
        }
        return depends;
    };
    /**
     * 缓存场景
     * @param scene
     */
    ResLoader.prototype._cacheScene = function (scene) {
        // 切换的场景名相同，无需清理资源
        if (scene.name == this._lastScene) {
            return;
        }
        var refKey = ccloader._getReferenceKey(scene.uuid);
        var item = ccloader._cache[refKey];
        var newUseKey = "@Scene" + this.nextUseKey();
        var depends = null;
        if (item) {
            depends = this._cacheSceneDepend(item.dependKeys, newUseKey);
        }
        else if (scene["dependAssets"]) {
            depends = this._cacheSceneDepend(scene["dependAssets"], newUseKey);
        }
        else {
            console.error("cache scene faile " + scene);
            return;
        }
        this._releaseSceneDepend();
        this._lastScene = scene.name;
        ResLoader._sceneUseKey = newUseKey;
        this._sceneDepends = depends;
    };
    ResLoader.prototype.loadRes = function () {
        var _this = this;
        var resArgs = ResLoader.makeLoadResArgs.apply(this, arguments);
        var stack;
        if (this.resLeakChecker && this.resLeakChecker.checkFilter(resArgs.url)) {
            stack = ResLeakChecker_1.ResLeakChecker.getCallStack(1);
        }
        console.time("loadRes|" + resArgs.url);
        var finishCallback = function (error, resource) {
            if (!error) {
                _this._finishItem(resArgs.url, resArgs.type, resArgs.use, stack);
            }
            if (resArgs.onCompleted) {
                resArgs.onCompleted(error, resource);
            }
            console.timeEnd("loadRes|" + resArgs.url);
        };
        // 预判是否资源已加载
        var res = cc.loader.getRes(resArgs.url, resArgs.type);
        if (res) {
            finishCallback(null, res);
        }
        else {
            var ccloader_2 = cc.loader;
            var uuid = ccloader_2._getResUuid(resArgs.url, resArgs.type, false);
            if (uuid) {
                cc.loader.loadRes(resArgs.url, resArgs.type, resArgs.onProgess, finishCallback);
            }
            else {
                cc.loader.load(resArgs.url, resArgs.onProgess, finishCallback);
            }
        }
    };
    ResLoader.prototype.loadArray = function () {
        var _this = this;
        var resArgs = ResLoader.makeLoadResArgs.apply(this, arguments);
        var stack;
        if (this.resLeakChecker && this.resLeakChecker.checkFilter(resArgs.url)) {
            stack = ResLeakChecker_1.ResLeakChecker.getCallStack(1);
        }
        var finishCallback = function (error, resource, urls) {
            if (!error) {
                for (var i = 0; i < resArgs.urls.length; ++i) {
                    _this._finishItem(resArgs.urls[i], resArgs.type, resArgs.use, stack);
                }
            }
            if (resArgs.onCompleted) {
                resArgs.onCompleted(error, resource);
            }
        };
        cc.loader.loadResArray(resArgs.urls, resArgs.type, resArgs.onProgess, finishCallback);
    };
    ResLoader.prototype.loadResDir = function () {
        var _this = this;
        var resArgs = ResLoader.makeLoadResArgs.apply(this, arguments);
        var stack;
        if (this.resLeakChecker && this.resLeakChecker.checkFilter(resArgs.url)) {
            stack = ResLeakChecker_1.ResLeakChecker.getCallStack(1);
        }
        var finishCallback = function (error, resource, urls) {
            if (!error && urls) {
                for (var i = 0; i < urls.length; ++i) {
                    _this._finishItem(urls[i], resArgs.type, resArgs.use, stack);
                }
            }
            if (resArgs.onCompleted) {
                resArgs.onCompleted(error, resource);
            }
        };
        cc.loader.loadResDir(resArgs.url, resArgs.type, resArgs.onProgess, finishCallback);
    };
    ResLoader.prototype.releaseArray = function () {
        var resArgs = ResLoader.makeReleaseResArgs.apply(this, arguments);
        for (var i = 0; i < resArgs.urls.length; ++i) {
            this.releaseRes(resArgs.urls[i], resArgs.type, resArgs.use);
        }
    };
    ResLoader.prototype.releaseResDir = function () {
        var resArgs = ResLoader.makeReleaseResArgs.apply(this, arguments);
        var ccloader = cc.loader;
        var urls = [];
        ccloader._assetTables.assets.getUuidArray(resArgs.url, resArgs.type, urls);
        for (var i = 0; i < urls.length; ++i) {
            this.releaseRes(urls[i], resArgs.type, resArgs.use);
        }
    };
    /**
     * 直接通过asset释放资源（如cc.Prefab、cc.SpriteFrame）
     * @param asset 要释放的asset
     */
    ResLoader.prototype.releaseAsset = function (asset, use) {
        if (asset && asset._uuid) {
            var id = ccloader._getReferenceKey(asset._uuid);
            if (id) {
                var item = ccloader._cache[id];
                if (item) {
                    var cacheInfo = this.getCacheInfo(id);
                    if (use) {
                        cacheInfo.uses.delete(use);
                        if (this.resLeakChecker) {
                            this.resLeakChecker.logRelease(id, use);
                        }
                    }
                    if (cacheInfo.uses.size == 0) {
                        this._release(item, id);
                    }
                }
            }
        }
    };
    ResLoader.prototype.releaseRes = function () {
        var resArgs = ResLoader.makeReleaseResArgs.apply(this, arguments);
        var item = this._getResItem(resArgs.url, resArgs.type);
        if (!item) {
            console.warn("releaseRes item is null " + resArgs.url + " " + resArgs.type);
            return;
        }
        // cc.log(arguments);
        var cacheInfo = this.getCacheInfo(item.id);
        if (resArgs.use) {
            cacheInfo.uses.delete(resArgs.use);
            if (this.resLeakChecker) {
                this.resLeakChecker.logRelease(item.id, resArgs.use);
            }
        }
        if (cacheInfo.uses.size == 0) {
            this._release(item, item.id);
        }
    };
    // 释放一个资源
    ResLoader.prototype._release = function (item, itemUrl) {
        var cacheInfo = this.getCacheInfo(item.id);
        if (!item || !cacheInfo.refs.has(itemUrl)) {
            return;
        }
        // 解除自身对自己的引用
        cacheInfo.refs.delete(itemUrl);
        var ccloader = cc.loader;
        if (cacheInfo.uses.size == 0 && cacheInfo.refs.size == 0) {
            if (item.dependKeys && Array.isArray(item.dependKeys)) {
                for (var _i = 0, _a = item.dependKeys; _i < _a.length; _i++) {
                    var depKey = _a[_i];
                    var depItem = ccloader._cache[depKey];
                    if (depItem) {
                        this._release(depItem, item.id);
                    }
                }
            }
            //如果没有uuid,就直接释放url
            if (item.uuid) {
                cc.loader.release(item.uuid);
                cc.log("resloader release item by uuid :" + item.id);
            }
            else {
                cc.loader.release(item.id);
                cc.log("resloader release item by url:" + item.id);
            }
            this._resMap.delete(item.id);
        }
    };
    ResLoader.prototype._isSceneDepend = function (itemUrl) {
        var scene = cc.director.getScene();
        if (!scene) {
            return false;
        }
        var len = scene.dependAssets.length;
        for (var i = 0; i < len; ++i) {
            if (scene.dependAssets[i] == itemUrl)
                return true;
        }
        return false;
    };
    /**
     * 是否可以释放某资源
     * @param url
     * @param use
     */
    ResLoader.prototype.canRelease = function (url, use) {
        var cacheInfo = this.getCacheInfo(url);
        // 有其它Res引用它
        if (cacheInfo.refs.size > 1 || !cacheInfo.refs.has(url))
            return false;
        // 有其它的Use使用
        if (cacheInfo.uses.size > 1 || !cacheInfo.uses.has(use))
            return false;
        return true;
    };
    ResLoader.prototype.checkReleaseUse = function () {
        var resArgs = ResLoader.makeReleaseResArgs.apply(this, arguments);
        var item = this._getResItem(resArgs.url, resArgs.type);
        if (!item) {
            console.log("cant release,item is null " + resArgs.url + " " + resArgs.type);
            return true;
        }
        var cacheInfo = this.getCacheInfo(item.id);
        var checkUse = false;
        var checkRef = false;
        if (resArgs.use && cacheInfo.uses.size > 0) {
            if (cacheInfo.uses.size == 1 && cacheInfo.uses.has(resArgs.use)) {
                checkUse = true;
            }
            else {
                checkUse = false;
            }
        }
        else {
            checkUse = true;
        }
        if ((cacheInfo.refs.size == 1 && cacheInfo.refs.has(item.id)) || cacheInfo.refs.size == 0) {
            checkRef = true;
        }
        else {
            checkRef = false;
        }
        return checkUse && checkRef;
    };
    return ResLoader;
}());
exports.default = ResLoader;
exports.resLoader = new ResLoader();

cc._RF.pop();