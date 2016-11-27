"use strict";
var router_1 = require('@angular/router');
var dashboard_component_1 = require('./dashboard.component');
var overview_component_1 = require('./Components/overview.component');
var dashboardRoutes = [
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent,
        children: [
            { path: 'overview', component: overview_component_1.OverviewComponent },
            { path: '', component: overview_component_1.OverviewComponent }
        ]
    }
];
exports.dashboardRouting = router_1.RouterModule.forChild(dashboardRoutes);
//# sourceMappingURL=dashboard.routing.js.map