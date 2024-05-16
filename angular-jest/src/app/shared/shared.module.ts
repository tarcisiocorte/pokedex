import { NgModule } from '@angular/core';

import { ArrowBackComponent } from './components/svg-icons/go-back/go-back.component';

import { GoToRightComponent } from './components/svg-icons/go-right/go-right.component';
import { GoToLeftComponent } from './components/svg-icons/go-left/go-left.component';

@NgModule({
  exports: [ArrowBackComponent, GoToRightComponent, GoToLeftComponent],
  declarations: [ArrowBackComponent, GoToRightComponent, GoToLeftComponent],
})
export class SharedModule {}
