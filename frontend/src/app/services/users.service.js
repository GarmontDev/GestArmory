"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const global_1 = require("./global");
let UsersService = class UsersService {
    constructor(_http, cookies) {
        this._http = _http;
        this.cookies = cookies;
        this.url = global_1.Global.url;
        this.expireDate = new Date();
    }
    login(user) {
        let headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + '/login', user, { headers: headers });
    }
    getUser() {
        let headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + '/login', { headers: headers });
    }
    addNewUser(user) {
        let params = JSON.stringify(user);
        let headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'signup', params, { headers: headers });
    }
    setToken(token, role) {
        this.expireDate.setDate(this.expireDate.getDate() + 7);
        this.cookies.set('token', token, this.expireDate);
        this.cookies.set('role', role, this.expireDate);
    }
    getToken() {
        return this.cookies.get('token');
    }
    deleteToken() {
        this.cookies.delete('token');
    }
};
UsersService = __decorate([
    (0, core_1.Injectable)({
        providedIn: "root"
    })
], UsersService);
exports.UsersService = UsersService;
