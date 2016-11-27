import {Component} from '@angular/core';
import {OnInit} from '@angular/core';

import { MembersService } from '../services/members.service';
import { Member } from '../objects/member';

@Component({
    selector: 'dashboard',
    //templateUrl: './app/members/views/membersList.html'
    //template: `<h1>Members list</h1>`,
    templateUrl: './app/members/views/membersList.html',
    providers: [MembersService]
})

export class MembersListComponent implements OnInit{
    title: 'Memberslist';
    members: Member[];

    // Deze service haalt de leden op
    constructor(private membersService: MembersService) { }

    ngOnInit(): void {
        var promise = this.membersService.getMembers();
        promise.then(members => this.members = members);
        //this.members = this.membersService.getMembers();
        //this.membersService.getMembers().resolve(this.members)
    }
}