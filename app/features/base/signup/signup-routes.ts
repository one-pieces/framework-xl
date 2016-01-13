/// <reference path='../../../app.d.ts' />
/// <amd-dependency path="text!features/base/signup/forms/upload-avatar.html" />
/// <amd-dependency path="text!features/base/signup/forms/user-info.html" />

import angular = require('angular');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.base.signup.routes';
var uploadAvatarTemplate = window.require('text!features/base/signup/forms/upload-avatar.html');
var userInfoTemplate = window.require('text!features/base/signup/forms/user-info.html');

angular.module(moduleName, [])
    .config(['$stateProvider', ($stateProvider: ng.ui.IStateProvider) => {
        $stateProvider
            .state('base.signup.userInfo', {
                url: '/1',
                template: userInfoTemplate
            })
            .state('base.signup.uploadAvatar', {
                url: '/2',
                template: uploadAvatarTemplate
            });
    }]);
