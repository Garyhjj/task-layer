"use strict";
/**
 * 层级对象
 * 可广播,每层内有一个任务发布方，和一个接收方，可接受下一层回复,可产生下一层对象,接受回复时可在回调函数中,调用第二个形参方法,继续向所有上层回复
 * version: '0.0.2'
 * name: 'layer.ts'
 * author: 'Garyhjj'
 * 2017-12-03
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
var index_1 = require("./listener/index");
var index_2 = require("./informer/index");
var Layer = /** @class */ (function () {
    function Layer() {
        this.first = new Subject_1.Subject();
        this.secend = new Subject_1.Subject();
    }
    Layer.prototype.getInformer = function () {
        return this.informer ? this.informer : new index_2.Informer(this.secend, this.first, this);
    };
    Layer.prototype.getListener = function () {
        return this.listener ? this.listener : new index_1.Listener(this.first, this.secend);
    };
    Layer.prototype.responseToTopLayer = function (res) {
        if (!res)
            return;
        var topLayers = this.topLayers;
        if (topLayers && topLayers.size > 0) {
            topLayers.forEach(function (layer) { return layer.getListener().send(res); });
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