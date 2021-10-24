import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './@admin/auth/auth.routing';
import { NopagefoundComponent } from './@admin/nopagefound/nopagefound.component';
import { PagesRoutingModule } from './@admin/pages/pages.routing';

const routes: Routes = [
  // path: '/admin' AdminRouting
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
    }),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
