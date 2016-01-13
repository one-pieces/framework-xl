/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='css!./upload-img-page.css' />
/// <amd-dependency path='text!components/directives/upload-img-page/upload-img-page.html' />
/// <amd-dependency path="ng-file-upload" />
/// <amd-dependency path="ngImgCrop" />
/// <amd-dependency path="css!/vendor/ngImgCrop/ng-img-crop.css" />

import angular = require('angular');
import config = require('config');
import models = require('../../../components/models');
import userService = require('../../../components/services/user/user-service');

'use strict';

export var moduleName = config.appName + '.components.diretcives.uploadImgPage';
export var directiveName = 'opUploadImgPage';
export var templateText = window.require('text!components/directives/upload-img-page/upload-img-page.html');

export interface IScope extends ng.IScope {
    uploadImgPage: UploadImgPage;
    user: models.user.IUser;
    method: string;
}

/**
 * UploadImgPage class for the directive
 */
export class UploadImgPage {
    static $inject = [ 'scope',
                       '$state', 
                       'Upload', 
                       userService.serviceName ];

    radius: number;
    constructor(private scope: IScope,
                private $state: ng.ui.IStateService, 
                private $upload: ng.angularFileUpload.IUploadService,
                private userService: userService.Service) {
        
    }

    submit(avatarUrl: string) {
        var fileName: string;
        fileName = fileName + '_' + this.scope.user.username;
        this.$upload.upload({
            url: config.apiBasePath + '/v1/user/uploadAvatar',
            method: 'POST',
            file: (<any>this.$upload).dataUrltoBlob(avatarUrl, fileName)
        }).success((response: any) => {
            this.scope.user.avatarUrl = response.data;
            if (this.scope.method === 'post') {
                this.userService.signup(this.scope.user).then((user) => {
                    this.$state.go('base.login');
                }, (reason: any) => {
                    console.log(reason);
                });
            } else if (this.scope.method === 'patch') {
                alert('保存成功');
            }
        });
    }
}

/**
 * UploadImgPage-Directive
 * 
 *
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-upload-img-page user="User" actor="Actor" creator="Creator">
 *     </op-upload-img-page>
 * </div>
 *
 * ```
 */
export class UploadImgPageDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        user: '=',
        method: '@'
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.uploadImgPage = <UploadImgPage>
        this.$injector.instantiate(UploadImgPage, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [
    'ngFileUpload',
    'ngImgCrop'])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(UploadImgPageDirective);
    }]);