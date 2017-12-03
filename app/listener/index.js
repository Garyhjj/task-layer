"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Listener = /** @class */ (function () {
    function Listener(dealer, sender) {
        this.dealer = dealer;
        this.sender = sender;
    }
    Listener.prototype.deal = function (target, cb) {
        return this.dealer.subscribe(function (name) { return name === target && cb(); });
    };
    Listener.prototype.send = function (data) {
        this.sender.next(data);
    };
    return Listener;
}());
exports.Listener = Listener;
//# sourceMappingURL=index.js.map