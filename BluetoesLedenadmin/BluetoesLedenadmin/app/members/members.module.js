"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var members_routing_1 = require('./members.routing');
var members_component_1 = require('./members.component');
var memberslist_component_1 = require('./Components/memberslist.component');
var memberdetails_component_1 = require('./Components/memberdetails.component');
var MembersModule = (function () {
    function MembersModule() {
    }
    MembersModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, members_routing_1.membersRouting, members_routing_1.membersRouting],
            declarations: [members_component_1.MembersComponent, memberslist_component_1.MembersListComponent, memberdetails_component_1.MemberDetailsComponent],
            exports: [members_component_1.MembersComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], MembersModule);
    return MembersModule;
}());
exports.MembersModule = MembersModule;
//# sourceMappingURL=members.module.js.map