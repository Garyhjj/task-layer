"use strict";
/**
 * 层级对象
 * 可广播,可接受下一层回复,可产生下一层对象,接受回复时可在回调函数中,调用第二个形参方法,继续向所有上层回复
 * version: '0.01'
 * name: 'layer.ts'
 * author: 'gary.h'
 * 2017-11-17
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
var Layer = /** @class */ (function () {
    function Layer() {
        this.informer = new Subject_1.Subject();
        this.listener = new Subject_1.Subject();
    }
    Layer.prototype.inform = function (target) {
        this.informer.next(target);
    };
    Layer.prototype.dealWithInform = function (target, cb) {
        return this.informer.asObservable().filter(function (name) { return name === target; })
            .subscribe(function () { return cb(); });
    };
    Layer.prototype.reponse = function (data) {
        this.listener.next(data);
    };
    Layer.prototype.dealWithResponse = function (cb, emit) {
        var _this = this;
        if (emit === void 0) { emit = true; }
        return this.listener.asObservable().subscribe(function (data) {
            cb(data, function (res) {
                emit && _this.responseToTopLayer(res);
            });
        });
    };
    Layer.prototype.responseToTopLayer = function (res) {
        if (!res)
            return;
        var topLayers = this.topLayers;
        if (topLayers && topLayers.size > 0) {
            topLayers.forEach(function (layer) { return layer.reponse(res); });
        }
    };
    Layer.prototype.addTopLayer = function (layer) {
        this.topLayers = this.topLayers || new Set();
        this.topLayers.add(layer);
    };
    Layer.prototype.removeTopLayer = function (layer) {
        var topLayers = this.topLayers;
        if (topLayers && topLayers.size > 0) {
            this.topLayers.delete(layer);
        }
    };
    Layer.prototype.clearToplayers = function () {
        this.topLayers && this.topLayers.clear();
    };
    Layer.prototype.createSubLayer = function () {
        var layer = new Layer();
        layer.addTopLayer(this);
        return layer;
    };
    return Layer;
}());
exports.Layer = Layer;
//# sourceMappingURL=layer.js.map