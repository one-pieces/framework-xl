/// <reference path='../../../app.d.ts' />

import config = require('config');
import models = require('../../../components/models');

'use strict';

export interface IScope extends ng.IScope {
    signup?: SignupController;
}

export var controllerName = config.appName + '.base.signup.controller';

/**
 * Controller for the signup page
 */
export class SignupController {
    static $inject = [ '$scope',
                       models.user.serviceName ];
    user: models.user.IUser;
    password2 = '';

    constructor(private $scope: IScope,
                private UserModel: models.user.IUserStatic) {
        $scope.signup = this;
        this.user = this.UserModel.$build({
            username: '',
            password: ''
        });
    }
}

export class Controller extends SignupController {}