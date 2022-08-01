"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserwindowComponent = void 0;
const core_1 = require("@angular/core");
let UserwindowComponent = class UserwindowComponent {
    constructor(_appComponent, oauthService) {
        this._appComponent = _appComponent;
        this.oauthService = oauthService;
        this.panelOpenState = false;
        this.panelOpenState = _appComponent.panelOpenState;
    }
    ngOnInit() {
    }
    get token() {
        let claims = this.oauthService.getIdentityClaims();
        return claims ? claims : null;
    }
    logout() {
        this.oauthService.revokeTokenAndLogout();
    }
};
UserwindowComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-userwindow',
        templateUrl: './userwindow.component.html',
        styleUrls: ['./userwindow.component.css']
    })
], UserwindowComponent);
exports.UserwindowComponent = UserwindowComponent;
