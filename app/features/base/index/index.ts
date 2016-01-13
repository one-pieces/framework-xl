/// <reference path="../../../app.d.ts" />
/// <amd-dependency path="css!./index.css" />
/// <amd-dependency path="text!features/base/index/index.html" />

import angular = require('angular');
import config = require('config');
import indexController = require('./index-controller');
import slickDirective = require("../../../components/directives/slick/slick-directive");

'use strict';

export var moduleName = config.appName + '.base.index';
export var template = window.require('text!features/base/index/index.html');
export var controllerName = indexController.controllerName;

angular.module(moduleName, [
    slickDirective.moduleName])
    .controller(indexController.controllerName, indexController.Controller);
