import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { UsertableComponent } from './components/usertable/usertable.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SpazatableComponent } from './components/spazatable/spazatable.component';
import { MapComponent } from './components/map/map.component';
import { LinechatComponent } from './components/linechat/linechat.component';
import { HomeComponent } from './components/home/home.component';
import { SpazalinechartComponent } from './components/spazalinechart/spazalinechart.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: '', component : LoginComponent},
  {path: 'login', component : LoginComponent},
  {path: 'register', component :RegisterComponent},

  {path: 'menu', component : MenuComponent, canActivate: [AuthGuard], children:[
  
    {path: 'home', component: HomeComponent},
    {path:'userTable' , component: UsertableComponent},
    {path: 'spazaTable', component: SpazatableComponent},
    {path: 'map', component: MapComponent},
    {path: 'linechart', component: LinechatComponent},
    {path: 'spazalinechart', component: SpazalinechartComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
