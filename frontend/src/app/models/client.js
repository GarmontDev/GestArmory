"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
class Client {
    constructor(_id, dni, name, address, city, province, guide, guideexpeditiondate) {
        this._id = _id;
        this.dni = dni;
        this.name = name;
        this.address = address;
        this.city = city;
        this.province = province;
        this.guide = guide;
        this.guideexpeditiondate = guideexpeditiondate;
    }
}
exports.Client = Client;
