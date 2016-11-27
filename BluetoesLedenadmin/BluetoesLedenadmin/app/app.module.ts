import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms'; 
import { HttpModule }    from '@angular/http';
import {routing} from './app.routing';

// Import ledenadmin modules
import { DashboardModule } from './dashboard/dashboard.module';
import { MembersModule } from './members/members.module';

import { menu } from './menu/menu.component';
import { Ledenadmin } from './ledenadmin.component';
//import { Dashboard } from './dashboard/dashboard.component'

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, routing, DashboardModule, MembersModule],
    declarations: [Ledenadmin, menu],
    bootstrap: [Ledenadmin]
})

export class AppModule { }
