/**
 * 层级对象
 * 可广播,每层内有一个任务发布方，和一个接收方，可接受下一层回复,可产生下一层对象,接受回复时可在回调函数中,调用第二个形参方法,继续向所有上层回复
 * version: '0.0.2'
 * name: 'layer.ts'
 * author: 'Garyhjj'
 * 2017-12-03
 */

import { Subject } from 'rxjs/Subject';
import { Listener } from './listener/index';
import { Informer } from './informer/index';

export class Layer {
    private informer:Informer;
    private first:Subject<any>;
    private secend:Subject<any>;
    private listener:Listener;
    
    private topLayers:Set<Layer>;
    constructor() {
        this.first = new Subject();
        this.secend = new Subject();
    }

    getInformer() {
        return this.informer?this.informer:new Informer(this.secend,this.first,this);
    }
    getListener() {
        return this.listener?this.listener:new Listener(this.first,this.secend);
    }

    responseToTopLayer(res:any) {
        if(!res) return;
        let topLayers = this.topLayers;
        if(topLayers && topLayers.size>0) {
            topLayers.forEach((layer) => layer.getListener().send(res))
        }
    }
    addTopLayer(layer:Layer) {
        this.topLayers = this.topLayers || new Set();
        this.topLayers.add(layer);
    }
    removeTopLayer(layer:Layer) {
        let topLayers = this.topLayers;
        if(topLayers && topLayers.size>0) {
            this.topLayers.delete(layer);
        }
    }

    clearToplayers() {
        this.topLayers && this.topLayers.clear();
    }

    createSubLayer() {
        let layer = new Layer();
        layer.addTopLayer(this);
        return layer;
    }
}