/**
 * 层级对象
 * 可广播,可接受下一层回复,可产生下一层对象,接受回复时可在回调函数中,调用第二个形参方法,继续向所有上层回复
 * version: '0.01'
 * name: 'layer.ts'
 * author: 'gary.h'
 * 2017-11-17
 */

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

export class Layer {
    private informer:Subject<any>;
    private listener:Subject<any>;
    private topLayers:Set<Layer>;
    constructor() {
        this.informer = new Subject();
        this.listener = new Subject();
    }

    inform(target:any) {
        this.informer.next(target);
    }
    dealWithInform(target:any,cb:Function) {
        return this.informer.asObservable().filter((name) => name === target)
        .subscribe(() => cb())
    }
    reponse(data:any) {
        this.listener.next(data);
    }
    dealWithResponse(cb:Function,emit:boolean=true) {
        return this.listener.asObservable().subscribe((data) => {
            cb(data,(res:any) =>{
                emit && this.responseToTopLayer(res);
            });
        });
    }
    responseToTopLayer(res:any) {
        if(!res) return;
        let topLayers = this.topLayers;
        if(topLayers && topLayers.size>0) {
            topLayers.forEach((layer) => layer.reponse(res))
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