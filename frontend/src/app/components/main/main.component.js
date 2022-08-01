"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainComponent = void 0;
const core_1 = require("@angular/core");
const main_service_1 = require("../../services/main.service");
let MainComponent = class MainComponent {
    constructor(_mainService) {
        this._mainService = _mainService;
        this.title = 'Welcome to GestArmory';
        this.slogan = 'GestArmory is a unique tool to register the ammunition and create the legal documents like waybill, auxiliar books, and many more for your armory store with just a few clicks, saving a lot of time in the process.';
        this.info = "";
    }
};
MainComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-main',
        templateUrl: './main.component.html',
        styleUrls: ['./main.component.css'],
        providers: [main_service_1.MainService]
    })
], MainComponent);
exports.MainComponent = MainComponent;
