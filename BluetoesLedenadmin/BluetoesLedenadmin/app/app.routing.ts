import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardModule} from './dashboard/dashboard.module';
import {MembersModule} from './members/members.module';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);