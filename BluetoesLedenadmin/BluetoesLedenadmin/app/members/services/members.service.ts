import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/toPromise';

import { Member, DataUser, DataPersonal } from '../objects/member';

@Injectable()
export class MembersService
{
    url: string = "http://test.bluetoes.net/api/";
    /**MEMBERS: Member[] = [
        { Id: 1, Email: 'asd@as.nl', Type: 'member'},
        { Id: 2, Email: 'test@as.nl', Type: 'member'},
        { Id: 3, Email: 'HelloWorld@as.nl', Type: 'member'}
    ];*/

    constructor(private http: Http) { }

    getMembers(): Promise<Member[]> {
        var members: Member[];
        var userData: DataUser[];
        var personalData: DataPersonal[];

        var source = Observable.forkJoin([
            this.getUsersData(),
            this.getUsersPersonalData()
        ]);

        source.subscribe(
            function (data) {
                userData = data[0];
                personalData = data[1];
                console.log('Next: %s', data);
            },
            function (err) {
                console.log('Error: %s', err);
            }, () => members = this.combineData(userData, personalData)); 


        // Er moet een promise komen voor de members array
        var membersSource = Observable
        return source.toPromise();

        //return members;
        /*
        return this.http.get(this.url + 'user')
            .toPromise() // visual studio snapt niet dat de toPromise toegevoegd is
            .then(response => response.json().Users as Member[])
            .catch(this.handleError);
        */

        //return Promise.resolve(this.MEMBERS);
    }


    /**
     * Deze functie wordt gebruikt om gebruikersinformatie uit meerdere arrays te fuseren, zodat er een enkele array ontstaat. Deze array bevat members objecten, die alle verschillende data bevatten.
     * @param usersData
     * @param personalData
     */
    combineData(usersData: DataUser[], personalData: DataPersonal[]): Member[] {
        var members: Member[] = [];
        var personDataIterator: number = 0;

        console.log(usersData);
        console.log(personalData);
        console.log("userID: " + usersData[0].Id)

        console.log("Dit is de lengte: " + usersData.length);
        for (var i = 0; i < usersData.length; i++) {
            console.log("Dit is de for lus")
            console.log(i)
            console.log("userdata: " + usersData[i].Id);
            console.log("person: " + personalData[personDataIterator].UserId)

            if (personDataIterator < personalData.length) {
                console.log("")
                while (true)
                {
                    if (personalData[personDataIterator].UserId == usersData[i].Id) {
                        var member: Member = new Member;
                        member.Id = usersData[i].Id;
                        member.UserData = usersData[i];
                        member.UserDataPersonal = personalData[personDataIterator];
                        members.push(member);
                        personDataIterator++;
                        break;
                    } else if (personalData[personDataIterator].UserId < usersData[i].Id) {
                        personDataIterator++;
                    } else {
                        break;
                    }
                }
            }
        }
        //console.log("Members: " + members[0].UserData.Id);
        return members;
    }

    getUsersData(): Observable<DataUser[]> {
        return this.http.get(this.url + 'user').map(res => res.json().Users);
    }

    getUsersPersonalData(): Observable<DataPersonal[]> {
        return this.http.get(this.url + 'userdatapersonal').map(res => res.json().UserDataPersonals);
    }

    getSingleMember(): Promise<Member> {
        return null;
    }

    updateMember(): Promise<Member> {
        return null;
    }

    deleteMember(): Promise<Member> {
        return null;
    }

    // TODO kijken wat de beste manier van foutafhandeling is
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}