import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './pages/base/base.component';
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path:'', component:BaseComponent},
    {path:'tasks/task', component:TaskPageComponent},
    {path:'**', redirectTo:'', component: BaseComponent}
];