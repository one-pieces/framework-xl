/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='md5' />

import angular = require('angular');
import config = require('config');
import models = require('../../models');
'use strict';

export var moduleName = config.appName + '.components.services.user';
export var serviceName = 'user';

/**
 * User service
 */
export class UserService {
    static $inject = [ '$q',
                       'md5',
                       '$rootScope',
                       models.user.serviceName];

    currentUser: models.user.IUser;
    
    constructor( private $q: ng.IQService,
                private md5: any,
                private $rootScope: ng.IRootScopeService,
                private UserModel: models.user.IUserStatic) {

    }

    md5Hash(password: string): string {
        return this.md5.createHash(password);
    }

    /**
     *  
     */
    login(userInfo: any): ng.IPromise<string> {
        var deferred = this.$q.defer();
        userInfo.password = this.md5Hash(userInfo.password || '');
        this.UserModel.login(userInfo).then((token) => {
            (<any>window.sessionStorage).token = token;
            this.$rootScope.$broadcast('sign-action');
            deferred.resolve(token);
        }, (reason: any) => {
            deferred.reject(reason);
        });
        return deferred.promise;
    }

    signup(userInfo: models.user.IUser): ng.IPromise<models.user.IUser> {
        var deferred = this.$q.defer();
        userInfo.password = this.md5Hash(userInfo.password || '');
        userInfo.$save().$then((user: models.user.IUser) => {
            deferred.resolve(user);
        }, (reason: any) => {
            deferred.reject(reason);
        });
        return deferred.promise;
    }

    logout(): ng.IPromise<boolean> {
        var deferred = this.$q.defer();
        this.UserModel.logout().then((result) => {
            if (result) {
                delete (<any>window.sessionStorage).token;
                this.$rootScope.$broadcast('sign-action');
            }
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    me(): ng.IPromise<models.user.IUser> {
        var token = (<any>window.sessionStorage).token;
        if (token) {
            return this.UserModel.$find('me').$then((user) => {
                this.currentUser = user;
                return this.currentUser;
            }).$asPromise();
        } else {
            return this.$q.when(this.currentUser);
        }
    }
}

export class Service extends UserService {}

angular.module(moduleName, ['ngMd5'])
    .service(serviceName, UserService);

