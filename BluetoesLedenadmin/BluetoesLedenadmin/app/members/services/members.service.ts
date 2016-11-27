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

    constructor(private http: Http) { }

    getMembers(): Observable<Member[]> {
        var members: Member[];
        var userData: DataUser[];
        var personalData: DataPersonal[];
        var membersService: MembersService = this;
        var membersPromise: Promise<Member[]>;

        // Deze observer wacht tot de data is samengesteld
        return Observable.create(function subscribe(observer) {

            // Deze obverver haalt de data op
            var source = Observable.forkJoin([
                membersService.getUsersData(),
                membersService.getUsersPersonalData()
            ]);

            source.subscribe(
                function (data) {
                    userData = data[0];
                    personalData = data[1];
                },
                function (err) {
                    console.log('Error: %s', err);
                    observer.error(err);
                }, function () {
                    members = membersService.combineData(userData, personalData);
                    observer.next(members);
                    observer.complete();
                }
            );

            // Deze functie wordt gebruikt om een subscription te annuleren.
            return function unsubscribe() {
                userData = null;
                personalData = null;
            };
        });
    }


    /**
     * Deze functie wordt gebruikt om gebruikersinformatie uit meerdere arrays te fuseren, zodat er een enkele array ontstaat. Deze array bevat members objecten, die alle verschillende data bevatten.
     * @param usersData
     * @param personalData
     */
    combineData(usersData: DataUser[], personalData: DataPersonal[]): Member[] {
        var members: Member[] = [];
        var personDataIterator: number = 0;

        for (var i = 0; i < usersData.length; i++) {

            if (personDataIterator < personalData.length) {

                while (true)
                {
                    if (personalData[personDataIterator].UserId == usersData[i].Id) {
                        var member: Member = new Member;
                        member.Id = usersData[i].Id;
                        member.UserData = usersData[i];
                        member.PersonalData = personalData[personDataIterator];
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