﻿'use strict';

angular.module('hiperionApp')
    .controller('HomeCtrl', function ($scope, ngDialog) {
        $scope.title = 'HOME';
        $scope.activeSection = 'home';
        $scope.setActiveSection = function (section) {
            $scope.activeSection = section;
            $scope.title = section.toUpperCase();
        };
        $scope.name = "";
        $scope.comment = "";
        $scope.comments = [];
        $scope.isCommentsVisible = false;
        $scope.showStatistics = function () {
            $scope.isCommentsVisible = false;
            ngDialog.open({
                template: 'stadisticsTemplate',
                className: 'ngdialog-theme-default'
            });
        };
        $scope.showComments = function () {
            $scope.isCommentsVisible = true;
        };
        $scope.preCloseCallbackOnScope = function (value) {
            return true;
        };
        $scope.addComment = function () {
            ngDialog.openConfirm({
                template: 'commentTemplate',
                className: 'ngdialog-theme-default',
                preCloseCallback: 'preCloseCallbackOnScope',
                scope: $scope
            }).then(function (data) {
                $scope.comments.push(data);
            }, function (reason) {
            });
        };
    })
    .controller('UserCtrl', function ($scope, $filter, ngTableParams, $sce, ngDialog) {
        // TODO: Replace this with the data from the web Api.
        var data = [{ name: 'Nick', lastName: 'Rimando', age: 26 },
                        { name: 'William', lastName: 'Yarbrough', age: 26 },
                        { name: 'DeAndre', lastName: 'Yedlin', age: 60 },
                        { name: 'Omar', lastName: 'Gonzalez', age: 28 },
                        { name: 'Matt', lastName: 'Besler', age: 26 },
                        { name: 'Mix', lastName: 'Diskerud', age: 52 },
                        { name: 'Brad', lastName: 'Evans', age: 29 },
                        { name: 'Brek', lastName: 'Shea', age: 30 },
                        { name: 'Greg', lastName: 'Garza', age: 36 },
                        { name: 'Lee', lastName: 'Nguyen', age: 56 },
                        { name: 'Michael', lastName: 'Bradley', age: 40 },
                        { name: 'Gyasi', lastName: 'Zardes', age: 56 }];

        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 5,
            sorting: { name: 'asc' },
            filter: { name: '', lastName: '' }
        }, {
            total: data.length,
            getData: function ($defer, params) {
                var orderedData = params.filter() ?
                                   $filter('filter')(data, params.filter()) :
                                   data;

                orderedData = params.sorting() ?
                                    $filter('orderBy')(orderedData, params.orderBy()) :
                                    orderedData;

                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

        $scope.users = [];
        $scope.name = "";
        $scope.lastName = "";
        $scope.age = "";

        $scope.addNewUser = function () {
            ngDialog.openConfirm({
                template: 'newUserDialogTemplate',
                className: 'ngdialog-theme-default',
                preCloseCallback: 'preCloseCallbackOnScope',
                scope: $scope
            }).then(function (user) {                
                data.push(user);
            }, function (reason) {
            });
        };
    })
    .controller('AboutCtrl', function ($scope) {
        $scope.description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing sof";
    });
