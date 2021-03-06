'use strict';

angular.module('hiperionApp')
    .controller('UserCtrl', function($scope, $http, $filter, ngTableParams, $sce, ngDialog, roleService, userService, countryService) {
        var data = [];
        $scope.user = { id: '', name: '', lastName: '', age: '', country: ''};
        $scope.userRoles = [];
        $scope.roles = [];
        $scope.fullRoles = [];
        $scope.countries = [];        
        $scope.userToDeleteId = 0;

        loadUsers();
        loadRoles();
        loadCountries();

        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 5,
            sorting: { name: 'asc' },
            filter: { name: '', lastName: '' }
        }, {
            total: data.length,
            getData: function($defer, params) {
                var orderedData = params.filter() ?
                    $filter('filter')(data, params.filter()) :
                    data;

                orderedData = params.sorting() ?
                    $filter('orderBy')(orderedData, params.orderBy()) :
                    orderedData;

                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

        $scope.addNewUser = function() {
            clearData();
            openUserDialog();
        };

        $scope.editUser = function(user) {
            setUser(user);
            openUserDialog();
        };

        $scope.saveUser = function() {
            var userdto = {
                id: $scope.user.id,
                name: $scope.user.name,
                lastName: $scope.user.lastName,
                age: $scope.user.age,
                country: $scope.user.country,
                roles: $scope.userRoles
            };

            userService.addUser(userdto).success(function (result) {
                if (result) {
                    loadUsers();
                } else {
                    alert("couldn't be add the user.");
                }
            });
        };

        $scope.removeUser = function(user) {
            $scope.userToDeleteId = user.id;
            openConfirmDeleteDialog();
        };

        $scope.getCurrentTime = function() {
            return userService.getTime();
        };

        function loadUsers() {
            userService.getUsers().
                success(function (result, status, headers, config) {
                    data = result;
                    $scope.tableParams.reload();
                });
        }

        function loadRoles() {
            roleService.getRoles().
                success(function (result, status, headers, config) {
                    $scope.roles = [];
                    result.forEach(function (role) {
                        $scope.roles.push({ id: role.id, label: role.name });
                    });                
                })                
        }

        function loadCountries() {
            $scope.countries = [{ id: 1, name: "Argentina" }, { id: 2, name: "Brasil" }, { id: 3, name: "Chile" }];
        }

        function setUser(user) {
            $scope.user.id = user.id;
            $scope.user.name = user.name;
            $scope.user.lastName = user.lastName;
            $scope.user.age = user.age;
            $scope.user.country = user.country;
            
            if (user.roles) {
                $scope.userRoles = [];
                user.roles.forEach(function(role) {
                    $scope.userRoles.push({ id: role.id, label: role.name });
                });
            }
        }

        function openUserDialog() {
            ngDialog.openConfirm({
                template: 'App/views/templates/userDialog.html',
                className: 'ngdialog-theme-default',
                preCloseCallback: 'preCloseCallbackOnScope',
                scope: $scope
            }).then(function(user) {
                setUser(user);
                $scope.saveUser();
                clearData();
            });
        }

        function openConfirmDeleteDialog() {
            ngDialog.openConfirm({
                template: 'App/views/templates/deleteUserDialog.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            }).then(function(value) {
                deleteUser();
            });
        }

        function clearData() {
            $scope.user = { id: '', name: '', lastName: '', age: '', country: '' };
            $scope.userRoles = [];
            $scope.userToDeleteId = 0;
        }

        function deleteUser() {
            $http.delete('/api/User?id=' + $scope.userToDeleteId)
                .success(function() {
                    loadUsers();
                    clearData();
                });
        }

        $scope._loadRoles = loadRoles;
        $scope._loadUsers = loadUsers;
    })
    .filter('userRange', function() {
        return function(input, min, max) {
            min = parseInt(min);
            max = parseInt(max);
            for (var i = min; i < max; i++)
                input.push(i);
            return input;
        };
    });