import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { MovementsComponent } from './components/movements/movements.component';
import { CreatemovementComponent } from './components/createmovement/createmovement.component';
import { ClientsComponent } from './components/clients/clients.component';
import { CreateclientsComponent } from './components/createclients/createclients.component';
import { ProductsComponent } from './components/products/products.component';
import { PdfreportComponent } from './components/pdfreport/pdfreport.component';

const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'movements', component: MovementsComponent},
    {path: 'create-movements', component: CreatemovementComponent},
    {path: 'clients', component: ClientsComponent},
    {path: 'create-clients', component: CreateclientsComponent},
    {path: 'pdfreport', component: PdfreportComponent},
    {path: '**', component: MainComponent}
];

// export const appRoutingProviders: any[] = [];
// export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
