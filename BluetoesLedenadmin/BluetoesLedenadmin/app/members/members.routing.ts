import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MembersComponent} from './members.component';
import {MembersListComponent} from './Components/memberslist.component';
import {MemberDetailsComponent}  from './Components/memberdetails.component';

const membersRoutes: Routes = [
    {
        path: 'members',
        component: MembersComponent,
        children: [
            {path: 'memberslist', component: MembersListComponent},
            {path: 'member/:id', component: MemberDetailsComponent},
            {path: '', component: MembersListComponent}
        ]
    }
];

export const membersRouting: ModuleWithProviders = RouterModule.forChild(membersRoutes);
