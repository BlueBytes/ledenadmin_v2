"use strict";
var router_1 = require('@angular/router');
var members_component_1 = require('./members.component');
var memberslist_component_1 = require('./Components/memberslist.component');
var memberdetails_component_1 = require('./Components/memberdetails.component');
var membersRoutes = [
    {
        path: 'members',
        component: members_component_1.MembersComponent,
        children: [
            { path: 'memberslist', component: memberslist_component_1.MembersListComponent },
            { path: 'member', component: memberdetails_component_1.MemberDetailsComponent },
            { path: '', component: memberslist_component_1.MembersListComponent }
        ]
    }
];
exports.membersRouting = router_1.RouterModule.forChild(membersRoutes);
//# sourceMappingURL=members.routing.js.map