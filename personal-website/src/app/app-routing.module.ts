import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APPUrisPaths } from 'src/constants/APP/AppUrisPaths';
import { DemoComponent } from './components/demo/demo.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PageComponent } from './components/page/page.component';

const routes: Routes = [
  {
    path: APPUrisPaths.DEMO,
    component: DemoComponent,
    data: { breadcrumb: APPUrisPaths.DEMO_BREADCRUMB },
  },
  { path: '', redirectTo: APPUrisPaths.HOME, pathMatch: 'full' },
  {
    path: APPUrisPaths.HOME,
    data: { breadcrumb: null },
    children: [
      {
        path: '',
        component: PageComponent,
        data: { breadcrumb: null },
      },
    ],
  },
  {
    path: APPUrisPaths.NOTFOUND,
    component: NotFoundComponent,
    data: { breadcrumb: APPUrisPaths.NOTFOUND_BREADCRUMB },
  },
  { path: '**', redirectTo: APPUrisPaths.NOTFOUND },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}