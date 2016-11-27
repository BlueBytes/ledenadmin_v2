import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { membersRouting } from './members.routing';
import { MembersComponent} from './members.component';
import { MembersListComponent } from './Components/memberslist.component';
import { MemberDetailsComponent } from './Components/memberdetails.component';

@NgModule({
    imports: [BrowserModule, membersRouting, membersRouting],
    declarations: [MembersComponent, MembersListComponent, MemberDetailsComponent],
    exports: [MembersComponent]
})

export class MembersModule { }