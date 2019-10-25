import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { UsertableComponent } from './components/usertable/usertable.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: '', component : LoginComponent},
  {path: 'register', component :RegisterComponent},

  {path: 'menu', component : MenuComponent, children:[
    {path:'userTable' , component: UsertableComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
