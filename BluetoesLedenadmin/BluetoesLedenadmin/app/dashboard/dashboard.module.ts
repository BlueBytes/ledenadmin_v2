import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { dashboardRouting } from './dashboard.routing';
import { DashboardComponent} from './dashboard.component';
import { OverviewComponent } from './Components/overview.component';

@NgModule({
    imports: [BrowserModule, FormsModule, dashboardRouting],
    declarations: [DashboardComponent, OverviewComponent],
    exports: [DashboardComponent]
})

export class DashboardModule { }