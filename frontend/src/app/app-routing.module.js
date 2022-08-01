"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutingModule = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const main_component_1 = require("./components/main/main.component");
const movements_component_1 = require("./components/movements/movements.component");
const createmovement_component_1 = require("./components/createmovement/createmovement.component");
const clients_component_1 = require("./components/clients/clients.component");
const createclients_component_1 = require("./components/createclients/createclients.component");
const products_component_1 = require("./components/products/products.component");
const pdfreport_component_1 = require("./components/pdfreport/pdfreport.component");
const routes = [
    { path: '', component: main_component_1.MainComponent },
    { path: 'products', component: products_component_1.ProductsComponent },
    { path: 'movements', component: movements_component_1.MovementsComponent },
    { path: 'create-movements', component: createmovement_component_1.CreatemovementComponent },
    { path: 'clients', component: clients_component_1.ClientsComponent },
    { path: 'create-clients', component: createclients_component_1.CreateclientsComponent },
    { path: 'pdfreport', component: pdfreport_component_1.PdfreportComponent },
    { path: '**', component: main_component_1.MainComponent }
];
// export const appRoutingProviders: any[] = [];
// export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    (0, core_1.NgModule)({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
