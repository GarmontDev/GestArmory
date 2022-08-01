"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movement = void 0;
class Movement {
    constructor(_id, seatNumber, date, product, guide, client, stock) {
        this._id = _id;
        this.seatNumber = seatNumber;
        this.date = date;
        this.product = product;
        this.guide = guide;
        this.client = client;
        this.stock = stock;
    }
}
exports.Movement = Movement;
