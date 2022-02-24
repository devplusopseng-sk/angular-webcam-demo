import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebcamDemoComponent } from './pages/webcam-demo/webcam-demo.component';

const routes: Routes = [
  { path: '', redirectTo: 'webcam-demo', pathMatch: 'full' },
  { path: 'webcam-demo', component: WebcamDemoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled'})],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule { }
