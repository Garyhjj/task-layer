import { Subject } from 'rxjs/Subject';
import { Layer } from '../../index';

export class Listener {
    dealer:Subject<any>;
    sender:Subject<any>;
    layer:Layer;
    constructor(dealer,sender){
        this.dealer = dealer;
        this.sender = sender;
    }

    deal(target:any,cb:Function) {
        return this.dealer.subscribe((name) => name === target && cb())
    }

    send(data:any){
        this.sender.next(data);
    }
}