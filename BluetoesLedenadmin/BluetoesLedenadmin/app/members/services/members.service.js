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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
require('rxjs/add/observable/forkJoin');
require('rxjs/add/operator/toPromise');
var member_1 = require('../objects/member');
var MembersService = (function () {
    /**MEMBERS: Member[] = [
        { Id: 1, Email: 'asd@as.nl', Type: 'member'},
        { Id: 2, Email: 'test@as.nl', Type: 'member'},
        { Id: 3, Email: 'HelloWorld@as.nl', Type: 'member'}
    ];*/
    function MembersService(http) {
        this.http = http;
        this.url = "http://test.bluetoes.net/api/";
    }
    MembersService.prototype.getMembers = function () {
        var _this = this;
        var members;
        var userData;
        var personalData;
        var source = Rx_1.Observable.forkJoin([
            this.getUsersData(),
            this.getUsersPersonalData()
        ]);
        source.subscribe(function (data) {
            userData = data[0];
            personalData = data[1];
            console.log('Next: %s', data);
        }, function (err) {
            console.log('Error: %s', err);
        }, function () { return members = _this.combineData(userData, personalData); });
        return source.toPromise();
        //return members;
        /*
        return this.http.get(this.url + 'user')
            .toPromise() // visual studio snapt niet dat de toPromise toegevoegd is
            .then(response => response.json().Users as Member[])
            .catch(this.handleError);
        */
        //return Promise.resolve(this.MEMBERS);
    };
    /**
     * Deze functie wordt gebruikt om gebruikersinformatie uit meerdere arrays te fuseren, zodat er een enkele array ontstaat. Deze array bevat members objecten, die alle verschillende data bevatten.
     * @param usersData
     * @param personalData
     */
    MembersService.prototype.combineData = function (usersData, personalData) {
        var members = [];
        var personDataIterator = 0;
        console.log(usersData);
        console.log(personalData);
        console.log("userID: " + usersData[0].Id);
        console.log("Dit is de lengte: " + usersData.length);
        for (var i = 0; i < usersData.length; i++) {
            console.log("Dit is de for lus");
            console.log(i);
            console.log("userdata: " + usersData[i].Id);
            console.log("person: " + personalData[personDataIterator].UserId);
            if (personDataIterator < personalData.length) {
                console.log("");
                while (true) {
                    if (personalData[personDataIterator].UserId == usersData[i].Id) {
                        var member = new member_1.Member;
                        member.Id = usersData[i].Id;
                        member.UserData = usersData[i];
                        member.UserDataPersonal = personalData[personDataIterator];
                        members.push(member);
                        personDataIterator++;
                        break;
                    }
                    else if (personalData[personDataIterator].UserId < usersData[i].Id) {
                        personDataIterator++;
                    }
                    else {
                        break;
                    }
                }
            }
        }
        //console.log("Members: " + members[0].UserData.Id);
        return members;
    };
    MembersService.prototype.getUsersData = function () {
        return this.http.get(this.url + 'user').map(function (res) { return res.json().Users; });
    };
    MembersService.prototype.getUsersPersonalData = function () {
        return this.http.get(this.url + 'userdatapersonal').map(function (res) { return res.json().UserDataPersonals; });
    };
    MembersService.prototype.getSingleMember = function () {
        return null;
    };
    MembersService.prototype.updateMember = function () {
        return null;
    };
    MembersService.prototype.deleteMember = function () {
        return null;
    };
    // TODO kijken wat de beste manier van foutafhandeling is
    MembersService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    MembersService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MembersService);
    return MembersService;
}());
exports.MembersService = MembersService;
//# sourceMappingURL=members.service.js.map