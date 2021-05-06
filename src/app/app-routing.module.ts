import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SinglePageComponent } from './single-page/single-page.component';


const routes: Routes = [ 
  
{ path: 'home', component: SinglePageComponent},

{ path: '**', redirectTo: 'home'}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
