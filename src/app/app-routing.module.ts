import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { AddAgentComponent } from './components/add-agent/add-agent.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',component:HomeComponent},
  {path:'addClient',component:AddClientComponent},
  {path:'addAgent',component:AddAgentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
