import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAgreementComponent } from './views/create-agreement/create-agreement.component';

const routes: Routes = [
  {
    path: '',
    component: CreateAgreementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
