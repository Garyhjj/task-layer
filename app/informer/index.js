"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Informer = /** @class */ (function () {
    function Informer(dealer, sender, layer) {
        this.dealer = dealer;
        this.sender = sender;
        this.layer = layer;
    }
    Informer.prototype.deal = function (cb, emit) {
        var _this = this;
        if (emit === void 0) { emit = true; }
        return this.dealer.subscribe(function (data) {
            cb(data, function (res) {
                emit && _this.layer.responseToTopLayer(res);
            });
        });
    };
    ;
    Informer.prototype.send = function (target) {
        this.sender.next(target);
    };
    return Informer;
}());
exports.Informer = Informer;
//# sourceMappingURL=index.js.map