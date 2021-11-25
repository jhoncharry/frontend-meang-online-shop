import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from 'src/app/@core/guards/logged.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', canActivate: [LoggedGuard], component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
