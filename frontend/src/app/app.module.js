"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const http_1 = require("@angular/common/http");
const forms_1 = require("@angular/forms");
const ng2_search_filter_1 = require("ng2-search-filter");
const app_routing_module_1 = require("./app-routing.module");
const app_component_1 = require("./app.component");
const main_component_1 = require("./components/main/main.component");
const movements_component_1 = require("./components/movements/movements.component");
const clients_component_1 = require("./components/clients/clients.component");
const createclients_component_1 = require("./components/createclients/createclients.component");
const createmovement_component_1 = require("./components/createmovement/createmovement.component");
const userwindow_component_1 = require("./components/userwindow/userwindow.component");
const products_component_1 = require("./components/products/products.component");
const login_component_1 = require("./components/login/login.component");
const ngx_cookie_service_1 = require("ngx-cookie-service");
const animations_1 = require("@angular/platform-browser/animations");
const form_field_1 = require("@angular/material/form-field");
const input_1 = require("@angular/material/input");
const expansion_1 = require("@angular/material/expansion");
const snack_bar_1 = require("@angular/material/snack-bar");
const card_1 = require("@angular/material/card");
const tooltip_1 = require("@angular/material/tooltip");
const dialog_1 = require("@angular/material/dialog");
const table_1 = require("@angular/material/table");
const paginator_1 = require("@angular/material/paginator");
const datepicker_1 = require("@angular/material/datepicker");
const sort_1 = require("@angular/material/sort");
const core_2 = require("@angular/material/core");
const select_1 = require("@angular/material/select");
const grid_list_1 = require("@angular/material/grid-list");
const checkbox_1 = require("@angular/material/checkbox");
const radio_1 = require("@angular/material/radio");
const angular_oauth2_oidc_1 = require("angular-oauth2-oidc");
const pdfreport_component_1 = require("./components/pdfreport/pdfreport.component");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, core_1.NgModule)({
        declarations: [
            app_component_1.AppComponent,
            main_component_1.MainComponent,
            movements_component_1.MovementsComponent,
            createmovement_component_1.CreatemovementComponent,
            clients_component_1.ClientsComponent,
            createclients_component_1.CreateclientsComponent,
            login_component_1.LoginComponent,
            userwindow_component_1.UserwindowComponent,
            products_component_1.ProductsComponent,
            pdfreport_component_1.PdfreportComponent,
        ],
        imports: [
            platform_browser_1.BrowserModule,
            app_routing_module_1.AppRoutingModule,
            http_1.HttpClientModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            ng2_search_filter_1.Ng2SearchPipeModule,
            animations_1.NoopAnimationsModule,
            form_field_1.MatFormFieldModule,
            input_1.MatInputModule,
            expansion_1.MatExpansionModule,
            snack_bar_1.MatSnackBarModule,
            card_1.MatCardModule,
            tooltip_1.MatTooltipModule,
            dialog_1.MatDialogModule,
            table_1.MatTableModule,
            paginator_1.MatPaginatorModule,
            datepicker_1.MatDatepickerModule,
            sort_1.MatSortModule,
            core_2.MatNativeDateModule,
            select_1.MatSelectModule,
            grid_list_1.MatGridListModule,
            checkbox_1.MatCheckboxModule,
            radio_1.MatRadioModule,
            angular_oauth2_oidc_1.OAuthModule.forRoot()
        ],
        providers: [ngx_cookie_service_1.CookieService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
