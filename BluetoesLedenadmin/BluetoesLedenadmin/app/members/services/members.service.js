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
    function MembersService(http) {
        this.http = http;
        this.url = "http://test.bluetoes.net/api/";
    }
    MembersService.prototype.getMembers = function () {
        var members;
        var userData;
        var personalData;
        var membersService = this;
        var membersPromise;
        // Deze observer wacht tot de data is samengesteld
        return Rx_1.Observable.create(function subscribe(observer) {
            // Deze obverver haalt de data op
            var source = Rx_1.Observable.forkJoin([
                membersService.getUsersData(),
                membersService.getUsersPersonalData()
            ]);
            source.subscribe(function (data) {
                userData = data[0];
                personalData = data[1];
            }, function (err) {
                console.log('Error: %s', err);
                observer.error(err);
            }, function () {
                members = membersService.combineData(userData, personalData);
                observer.next(members);
                observer.complete();
            });
            // Deze functie wordt gebruikt om een subscription te annuleren.
            return function unsubscribe() {
                userData = null;
                personalData = null;
            };
        });
    };
    /**
     * Deze functie wordt gebruikt om gebruikersinformatie uit meerdere arrays te fuseren, zodat er een enkele array ontstaat. Deze array bevat members objecten, die alle verschillende data bevatten.
     * @param usersData
     * @param personalData
     */
    MembersService.prototype.combineData = function (usersData, personalData) {
        var members = [];
        var personDataIterator = 0;
        for (var i = 0; i < usersData.length; i++) {
            if (personDataIterator < personalData.length) {
                while (true) {
                    if (personalData[personDataIterator].UserId == usersData[i].Id) {
                        var member = new member_1.Member;
                        member.Id = usersData[i].Id;
                        member.UserData = usersData[i];
                        member.PersonalData = personalData[personDataIterator];
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