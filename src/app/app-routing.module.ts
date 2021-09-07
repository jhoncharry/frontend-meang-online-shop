import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutingModule } from './@admin/pages/admin-routing.module';

const routes: Routes = [
  // path: '/admin' AdminRouting configured
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: '**', redirectTo: 'admin', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
    }),
    AdminRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
