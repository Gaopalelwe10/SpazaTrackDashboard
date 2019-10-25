import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { UsertableComponent } from './components/usertable/usertable.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SpazatableComponent } from './components/spazatable/spazatable.component';
import { MapComponent } from './components/map/map.component';
import { LinechatComponent } from './components/linechat/linechat.component';

const routes: Routes = [
  {path: '', component : LoginComponent},
  {path: 'register', component :RegisterComponent},

  {path: 'menu', component : MenuComponent, children:[
    {path:'userTable' , component: UsertableComponent},
    {path: 'spazaTable', component: SpazatableComponent},
    {path: 'map', component: MapComponent},
    {path: 'linechart', component: LinechatComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
