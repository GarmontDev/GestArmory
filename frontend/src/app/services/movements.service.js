"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementsService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const global_1 = require("./global");
let MovementsService = class MovementsService {
    constructor(_http) {
        this._http = _http;
        this.url = global_1.Global.url;
    }
    testService() {
        return 'Probando el servicio de Angular';
    }
    addNewmovement(movement) {
        let params = JSON.stringify(movement);
        let headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'save-movement', params, { headers: headers });
    }
    getMovements() {
        let headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'movements', { headers: headers });
    }
    deleteMovement(id) {
        let headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + 'movement/' + id, { headers: headers });
    }
    updateMovement(movement) {
        let params = JSON.stringify(movement);
        let headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + 'movement/' + movement._id, params, { headers: headers });
    }
    FetchMovements() {
        return this._http.get('https://dummyjson.com/users');
    }
};
MovementsService = __decorate([
    (0, core_1.Injectable)()
], MovementsService);
exports.MovementsService = MovementsService;
