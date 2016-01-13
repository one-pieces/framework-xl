/// <reference path='./app.d.ts' />
/// <amd-dependency path='ui.router' />

import angular = require('angular');
import base = require('./features/base/base');
import baseRoutes = require('./features/base/base-routes');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.routes';

angular.module(moduleName, [
    'ui.router', 
    base.moduleName,
    baseRoutes.moduleName])
    .config(['$stateProvider', ($stateProvider: ng.ui.IStateProvider) => {
        $stateProvider
            .state('base', {
                abstract: true,
                url: config.basePath,
                template: base.template,
                controller: base.controllerName
            });
    }]);