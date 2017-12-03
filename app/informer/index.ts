import { Subject } from 'rxjs/Subject';
import { Layer } from '../../index';

export class Informer {
    dealer:Subject<any>;
    sender:Subject<any>;
    layer:Layer;
    constructor(dealer,sender,layer){
        this.dealer = dealer;
        this.sender = sender;
        this.layer = layer;
    }

    deal(cb:Function,emit:boolean=true){
        return this.dealer.subscribe((data) => {
            cb(data,(res:any) =>{
                emit && this.layer.responseToTopLayer(res);
            });
        });
    };

    send(target:any){
        this.sender.next(target);
    }
}