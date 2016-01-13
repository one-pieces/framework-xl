/// <reference path='../../../app.d.ts' />

import config = require('config');
import models = require('../../../components/models');
import userService = require('../../../components/services/user/user-service');

'use strict';

export interface IScope extends ng.IScope {
    profile?: ProfileController;
}

export var controllerName = config.appName + '.base.profile.controller';

/**
 * Controller for the profile page
 */
export class ProfileController {
    static $inject = [ '$scope',
                       userService.serviceName ];
    newPassword: string;
    newPassword2: string;
    oldPassword: string;
    user: models.user.IUser;

    constructor(private $scope: IScope,
                private userService: userService.Service) {
        $scope.profile = this;
        this.userService.me().then((user) => {
            this.user = user;
        }, (reason: any) => {
            console.log(reason);
        });
    }

    save() {
        var hashPassword = this.userService.md5Hash(this.oldPassword);
        this.user.comparePassword(hashPassword).then((result) => {
            if (result) {
                if (this.newPassword2 === this.newPassword) {
                    this.user.password = this.userService.md5Hash(this.newPassword);
                    this.user.$patch().$then((user) => {
                        this.user = user;
                    });
                } else {
                    alert('两次新密码不对');
                }
            } else {
                alert('密码错误');
            }
        });
    }
}

export class Controller extends ProfileController {}