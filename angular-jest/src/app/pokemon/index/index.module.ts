import { NgModule } from '@angular/core';

import { MainComponent } from './main/main.component';
import { DetailComponent } from '../components/card/details/detail.component';
import { HeaderComponent } from '../components/card/header/header.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        CommonModule
    ],
    exports: [MainComponent],
    declarations: [
        MainComponent,
        DetailComponent,
        HeaderComponent,
    ],
})
export class IndexModule { }
