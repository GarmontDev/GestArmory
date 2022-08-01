"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const global_1 = require("./global");
let ProductsService = class ProductsService {
    constructor(_http) {
        this._http = _http;
        this.url = global_1.Global.url;
    }
    addProduct(product) {
        let params = JSON.stringify(product);
        let headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'save-product', params, { headers: headers });
    }
    getProducts() {
        let headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'products', { headers: headers });
    }
    deleteProduct(id) {
        let headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + 'product/' + id, { headers: headers });
    }
    updateProduct(product) {
        let params = JSON.stringify(product);
        let headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + 'product/' + product._id, params, { headers: headers });
    }
};
ProductsService = __decorate([
    (0, core_1.Injectable)()
], ProductsService);
exports.ProductsService = ProductsService;
