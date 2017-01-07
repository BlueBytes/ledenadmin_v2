import {Component} from '@angular/core';

@Component({
    selector: 'member',
    templateUrl: '/app/members/views/member.html'
    // template: `
    //     <h1>Member details</h1>
    // `
})

export class MemberDetailsComponent {
    title: 'Member';
    master: string = 'Master';
}