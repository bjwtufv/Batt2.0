"use strict";
angular.module("farasisApp", ['ui.router', 'ngResource', 'ui.bootstrap', 'dialogs.main', 'pascalprecht.translate'])
    .config(function (dialogsProvider, $translateProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
        dialogsProvider.useBackdrop('static');
        dialogsProvider.useEscClose(true);
        dialogsProvider.useCopy(false);
        dialogsProvider.setSize('md');
        $translateProvider.translations('es', {
            DIALOGS_ERROR: "Error",
            DIALOGS_ERROR_MSG: "Se ha producido un error desconocido.",
            DIALOGS_CLOSE: "Cerca",
            DIALOGS_PLEASE_WAIT: "Espere por favor",
            DIALOGS_PLEASE_WAIT_ELIPS: "Espere por favor...",
            DIALOGS_PLEASE_WAIT_MSG: "Esperando en la operacion para completar.",
            DIALOGS_PERCENT_COMPLETE: "% Completado",
            DIALOGS_NOTIFICATION: "Notificacion",
            DIALOGS_NOTIFICATION_MSG: "Notificacion de aplicacion Desconocido.",
            DIALOGS_CONFIRMATION: "Confirmacion",
            DIALOGS_CONFIRMATION_MSG: "Se requiere confirmacion.",
            DIALOGS_OK: "Ok",
            DIALOGS_YES: "Yes",
            DIALOGS_NO: "No"
        });
        $translateProvider.preferredLanguage('es');
        $httpProvider.defaults.headers.delete = { 'Content-Type': 'application/json' }; //default to application/json for deletes

        //set up robust, extendable routing that supports 1-to-lots of different pages
        $urlRouterProvider
            .otherwise("/login");
        $stateProvider
             .state('login', {
                 url: "/login",
                 templateUrl: "login.html",
                 controller: 'userCtrl'
             })
            .state('user', {
                url: "/user",
                templateUrl: "userLists.html",
                controller: 'userCtrl'
            })
             .state('detail', {
                 url: "/user/:id",
                 templateUrl: "userLists.detail.html",
                 controller: 'userDetailCtrl'
             })
            .state('myaccount', {
                url: "/myaccount",
                templateUrl: "userLists.detail.html",
                controller: 'myAccountCtrl'
            })
            .state('user.detail', {
                url: "/:id",
                templateUrl: "userLists.detail.html",
                controller: 'userDetailCtrl'
            })
            .state('usergroup', {
                url: "/usergroup",
                templateUrl: "usergroup.html",
                controller: 'userGroupCtrl'
            })
             .state('permission', {
                 url: "/permission",
                 templateUrl: "permission.html",
                 controller: 'permissionCtrl'
             })
            .state('permissionset', {
                url: "/permissionset",
                templateUrl: "permissionset.html",
                controller: 'permissionSetCtrl'
            })
            .state('group', {
                url: "/group",
                templateUrl: "group.html",
                controller: 'groupCtrl'
            })
            .state('order', {
                url: "/order",
                templateUrl: "order.html",
                controller: 'orderCtrl'
            })
            .state('orderdetail', {
                url: "/order/:id",
                templateUrl: "order.detail.html",
                controller: 'orderDetailCtrl'
            })
            .state('orderedit', {
                url: "/orderedit/:id",
                templateUrl: "order.edit.html",
                controller: 'orderEditCtrl'
            })
            .state('ordernew', {
                url: "/ordernew",
                templateUrl: "order.new.html",
                controller: 'orderCtrl'
            })
             .state('product', {
                 url: "/product",
                 templateUrl: "product.html",
                 controller: 'productCtrl'
             })
            .state('vender', {
                url: "/vender",
                templateUrl: "vender.html",
                controller: 'venderCtrl'
            });
    })
    //---Filter---//
    .filter('nameUpper', function () {
        var fiterFun = function (input) {
            var words = input.split(' ');
            for (var i = 0; i < words.length; i++) {
                words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
            } return words.join(' ');
        }
        return fiterFun;
    })
    .filter('fpo', function () {
        var filterFun = function (input) {
            var str = input >= 100 ? input : input >= 10 ? '0' + input : '00' + input;
            str = "FPO-" + str;
            return str;
        }
        return filterFun;
    })
    .filter('fullname', function () {
        var filterFun = function (user, sep) {
            sep = sep || ' ';
            user = user || {};
            user.FirstName = user.FirstName.charAt(0).toUpperCase() + user.FirstName.slice(1) || "";
            user.LastName = user.LastName.charAt(0).toUpperCase() + user.LastName.slice(1) || "";
            return user.FirstName + sep + user.LastName;
        }
        return filterFun;
    })
    .directive('ngInitial', function () {
        return {
            restrict: 'A',
            controller:
                 function ($scope, $element, $attrs, $parse) {
                     var getter, setter, val;
                     val = $attrs.ngInitial || $attrs.value;
                     getter = $parse($attrs.ngModel);
                     setter = getter.assign;
                     setter($scope, val);
                 }

        };
    })
    .directive('fileDropzone', function () {
        return {
            restrict: 'A',
            scope: {
                file: '=',
                fileName: '='
            },
            link: function (scope, element, attrs) {
                var checkSize, isTypeValid, processDragOverOrEnter, validMimeTypes;
                processDragOverOrEnter = function ($event) {
                    if ($event != null) {
                        $event.preventDefault();
                    }
                    $event.dataTransfer.effectAllowed ="copy";
                   
                    return false;
                };
                validMimeTypes = attrs.fileDropzone;
                checkSize = function (size) {
                    var _ref;
                    if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
                        return true;
                    } else {
                        alert("File must be smaller than " + attrs.maxFileSize + " MB");
                        return false;
                    }
                };
                isTypeValid = function (type) {
                    if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
                        return true;
                    } else {
                        alert("Invalid file type.  File must be one of following types " + validMimeTypes);
                        return false;
                    }
                };
                element.bind('dragover', processDragOverOrEnter);
                element.bind('dragenter', processDragOverOrEnter);
                return element.bind('drop', function ($event) {
                    var file, name, reader, size, type;
                    if ($event != null) {
                        $event.preventDefault();
                        console.log($event);
                    }
                    reader = new FileReader();
                    reader.onload = function (evt) {
                        if (checkSize(size) && isTypeValid(type)) {
                            return scope.$apply(function () {
                                scope.file = evt.target.result;
                                if (angular.isString(scope.fileName)) {
                                    return scope.fileName = name;
                                }
                            });
                        }
                    };
                    file = $event.dataTransfer.files[0];
                    name = file.name;
                    type = file.type;
                    size = file.size;
                    reader.readAsDataURL(file);
                    return false;
                });
            }
        };
    })

    //---Alert Service ---//
    .service('alertService', function ($rootScope, $timeout) {
        $rootScope.alerts = [];
        $rootScope.MessageBox = "";
        function closeAlert(alert) {
            $rootScope.alerts.splice(alert, 1);
        };
        function AlertTimeout(timeout) {
            if (timeout) { $timeout(function () { closeAlert(this) }, timeout); }
        };
        this.RenderErrorMessage = function (message, timeout) {
            var messageBox = formatMessage(message);
            $rootScope.alerts = [];
            $rootScope.MessageBox = messageBox;
            $rootScope.alerts.push({ 'type': 'danger', 'msg': messageBox });
            AlertTimeout(timeout);
        };
        this.RenderSuccessMessage = function (message, timeout) {
            var messageBox = formatMessage(message);
            $rootScope.alerts = [];
            $rootScope.MessageBox = messageBox;
            $rootScope.alerts.push({ 'type': 'success', 'msg': messageBox });
            AlertTimeout(timeout);
        };
        this.RenderWarningMessage = function (message, timeout) {
            var messageBox = formatMessage(message);
            $rootScope.alerts = [];
            $rootScope.MessageBox = messageBox;
            $rootScope.alerts.push({ 'type': 'warning', 'msg': messageBox });
            AlertTimeout(timeout);
        };
        this.RenderInformationalMessage = function (message, timeout) {
            var messageBox = formatMessage(message);
            $rootScope.alerts = [];
            $rootScope.MessageBox = messageBox;
            $rootScope.alerts.push({ 'type': 'info', 'msg': messageBox });
            AlertTimeout(timeout);
        };
        function formatMessage(message) {
            var messageBox = "";
            if (angular.isArray(message) == true) {
                for (var i = 0; i < message.length; i++) {
                    messageBox = messageBox + message[i] + "<br/>";
                }
            }
            else {
                messageBox = message;
            }
            return messageBox;
        }
    })

    //--Sort Service--//
    .service('sortService', function () {
        this.sort = function (name) {
            if (this.selectName == name) {
                this.flag = !this.flag;
            } else {
                this.flag = false;
                this.selectName = name;
                this.order = name;
            }
        }
    })

     //--page Service--//
    //.service('pageService', function () {
    //    this.pageSet = function () {
    //        this.currentPage = 1;
    //        this.perPage = 5;
    //        this.startItem = 0;
    //        this.endItem = this.perPage;
    //        this.setPage = function (pageNo) {
    //            this.currentPage = pageNo;
    //        };
    //        this.pageChanged = function () {
    //            this.startItem = parseInt(this.currentPage - 1, 10) * this.perPage;
    //            this.endItem = parseInt(this.currentPage, 10) * this.perPage;
    //        };
    //    }       
    //})

    //---BattDatabase---//
    .factory('Batt', function ($rootScope, $resource) {
        var Batt = {};
        Batt.UserList            = new $resource('/api/User/:id');
        Batt.GroupList           = new $resource('/api/Group/:id');
        Batt.UserGroupList       = new $resource('/api/UserGroup/:id');
        Batt.PermisssionList     = new $resource('/api/Permission/:id');
        Batt.VenderList          = new $resource('/api/Vender/:id');
        Batt.ProductList         = new $resource('/api/Product/:id');
        Batt.OrderList           = new $resource('/api/Order/:id');
        Batt.OrderItemList       = new $resource('/api/OrderItem/:id');
        Batt.GroupPermissionList = new $resource('/api/GroupPermission/:id');
        return Batt;
    })
    /*--Login State--*/
    .service('loginState', function () {
        var loginState = {};
        loginState.state = false;
        loginState.PermissionName = false;
        loginState.user = {};
        //loginState.Permission = {
        //            "VenderView": true, "VenderAdd": true, "VenderEdit": true, "VenderDele": false,
        //            "ProductView": true, "ProductAdd": true, "ProductEdit": true, "ProductDele": false,
        //            "OrderView": true, "OrderAdd": true, "OrderEdit": true,
        //            "GroupView": false, "GroupAdd": false, "GroupEdit": false, "GroupDele": false,
        //            "UserView": false, "UserEdit": false, "UserDele": false,
        //            "PermissionView": false, "PermissionEdit": false, "Approval": false
        //};
        loginState.Permission = {
            "VenderView": true, "VenderAdd": true, "VenderEdit": true, "VenderDele": true,
            "ProductView": true, "ProductAdd": true, "ProductEdit": true, "ProductDele": true,
            "OrderView": true, "OrderAdd": true, "OrderEdit": true,
            "GroupView": true, "GroupAdd": true, "GroupEdit": true, "GroupDele": true,
            "UserView": true, "UserEdit": true, "UserDele": true,
            "PermissionView": true, "PermissionEdit": true, "Approval": true
        };
        return loginState;
    })

    //---userCtrl---//
    .controller('userCtrl', function ($scope, Batt, $state, loginState, dialogs, alertService) {
        //---login---//
        $scope.menuTitle = "User List";
        $scope.loginState = loginState;
        $scope.groupPermissionList = [];
        $scope.userLists = Batt.UserList.query();
        
        //--page config--//
        $scope.currentPage = 1;
        $scope.perPage = 11;
        $scope.startItem = 0;
        $scope.endItem = $scope.perPage;
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function () {
            $scope.startItem = parseInt($scope.currentPage - 1, 10) * $scope.perPage;
            $scope.endItem = parseInt($scope.currentPage, 10) * $scope.perPage;
        };//--page end--//

        ///---Method---///
        $scope.delete = function (list, index) {
            var dlg = null;
            dlg = dialogs.confirm('Please Confirm', 'Are you sure you want to delete this?');
            dlg.result.then(function (btn) {
                if (list != null) {
                    Batt.UserList.delete({ id: list.UserId }, function () {
                        alertService.RenderSuccessMessage("deleted success", 1000);
                        $scope.userLists.splice(index, 1);
                    }, function () {
                        alertService.RenderErrorMessage("deleted faild", 5000);
                    });
                }
            });
        };

        //verify login email pwd active
        $scope.login = function (UserEmail, UserPassword) {
            Batt.UserList.get({ email: UserEmail, password: UserPassword }, function (data) {
                if (data.Email != null) {
                    loginState.state = true;
                    loginState.user = data;
                    Batt.UserGroupList.get({ userId: data.UserId }, function (userGroupList) {
                        if (userGroupList.Group !== null) {
                            Batt.GroupPermissionList.query({ groupId: userGroupList.Group.GroupId }, function (permission) {
                                for (var i = 0, len = permission.length; i < len; i++) {
                                    $scope.groupPermissionList[permission[i].Permission.PermissionName] = permission[i].Context;
                                }
                                angular.extend(loginState.Permission, $scope.groupPermissionList);
                            });
                        }
                    })
                    $state.go('order');
                }
                else {
                    loginState.state = false;
                    alertService.RenderErrorMessage("Invaild mail or password error", 5000)
                }
            }, function (err) {
                loginState.state = false;
            });
        }
        $scope.logout = function () {
            loginState.state = false;
            loginState.user = {};
            loginState.Permission = {
                "VenderView": true, "VenderAdd": true, "VenderEdit": true, "VenderDele": false,
                "ProductView": true, "ProductAdd": true, "ProductEdit": true, "ProductDele": false,
                "OrderView": true, "OrderAdd": true, "OrderEdit": true,
                "GroupView": false, "GroupAdd": false, "GroupEdit": false, "GroupDele": false,
                "UserView": false, "UserEdit": false, "UserDele": false,
                "PermissionView": false, "PermissionEdit": false, "Approval": false,
            };
            $state.go('login');
        }
        $scope.$on('userChanged', function () { //could get crazy here and ONLY replace the item that changed, but not doing for brevity
            $scope.userLists = Batt.UserList.query();
        });
    })

    //---userDetailCtrl---//
    .controller('userDetailCtrl', function ($scope, Batt, $stateParams, $state, loginState, alertService) {
        $scope.useraction = $stateParams.id === 'new' ? "new" : "edit";
        $scope.userList = $stateParams.id === 'new' ? new Batt.UserList({ Items: [] }) : Batt.UserList.get({ id: $stateParams.id });
        //---Method---//
        if ($scope.useraction == "new") {
            $scope.menuTitle = "Register";
            $scope.ShowCreateButton = false;
            $scope.ShowEditButton = false;
            $scope.ShowSaveButton = true;
            $scope.ShowCancelButton = true;
            $scope.ShowDeleteButton = false;
        }
        if ($scope.useraction == "edit") {
            $scope.menuTitle = "My Account";
            $scope.ShowCreateButton = false;
            $scope.ShowEditButton = false;
            $scope.ShowSaveButton = true;
            $scope.ShowCancelButton = true;
            $scope.ShowDeleteButton = false;        
        }

        $scope.EditUser = function () {
            $scope.ShowEditButton = false;
            $scope.ShowSaveButton = true;
            $scope.ShowCancelButton = true;
            $scope.ShowDeleteButton = false;
        };

        $scope.CancelChange = function () {
            $state.go('order');
        };

        $scope.SaveUser = function () {
            $scope.userList.$save($scope.SaveSuccess, $scope.SaveFail);
        };

        $scope.SaveSuccess = function (data) {
            $scope.groupPermissionList = [];
            loginState.state = true;
            loginState.user = data;
            $scope.$emit('userChanged');
            alertService.RenderSuccessMessage("Create success",5000)
            $state.go('order');
        };

        $scope.SaveFail = function (err) {
            loginState.state = false;
            alertService.RenderErrorMessage(err.data,5000);
        };
    })

    //---permissionCtrl---//
    .controller('permissionCtrl', function ($scope, Batt, $state, dialogs, alertService, sortService) {
        $scope.menuTitle = "Permission List";
        $scope.permissionLists = Batt.PermisssionList.query();
        $scope.sort = sortService.sort;
        $scope.order = "PermissionId";
        
        $scope.$on('permissionChanged', function () {
            $scope.permissionLists = Batt.PermisssionList.query();
        });

        $scope.$on('permissionSave', function (event, permissionList) {
            permissionList.$save($scope.SaveSuccess, $scope.SaveFail);
        });

        $scope.SaveSuccess = function () {
            $scope.$emit('permissionChanged');
            $state.go('permission');
            alertService.RenderSuccessMessage("Permission save success", 5000);
        };
        $scope.SaveFail = function () {
            alertService.RenderErrorMessage("Permission failed to save", 5000);
        };
        //delete permission
        $scope.delete = function (permissionId, index) {
            var dlg = null;
            dlg = dialogs.confirm('Please Confirm', 'Are you sure you want to delete this?');
            dlg.result.then(function (btn) {
                if (permissionId != null) {
                    Batt.PermisssionList.delete({ id: permissionId }, function () {
                        $scope.permissionLists.splice(index, 1);
                        alertService.RenderSuccessMessage("deleted success", 5000);
                    }, function (err) {
                        alertService.RenderErrorMessage("deleted faild " + err.data.Message, 5000);
                    });
                }
            });
        }

        $scope.save = function (id) {
            $scope.permissionList = id === 'undefined' ? new Batt.PermisssionList({ Items: [] }) : Batt.PermisssionList.get({ id: id });
            var dlg = dialogs.create('/Group/permission.edit.html', 'dialogCtrl', $scope.permissionList, 'md');
            dlg.result.then(function (data) {
                $scope.$emit('permissionSave', data);
            });
        };
    })

     //---permissionSetCtrl---//
    .controller('permissionSetCtrl', function ($scope, Batt, $state, dialogs, alertService, sortService,loginState) {
        var init = function () {
            $scope.menuTitle = "Permission Assign";
            $scope.groupLists = Batt.GroupList.query();
            $scope.sort = sortService.sort;
            $scope.order = "PermissionId";
            $scope.loginState = loginState;
        }
        init();
        $scope.groupChange = function (GroupId) {
            $scope.groupPermissionLists = Batt.GroupPermissionList.query({ groupId: GroupId });
        };

        $scope.contextChange=function(list){
            $scope.groupPermissionList = Batt.GroupPermissionList.get({ id: parseInt(list.GroupPermissionId) });
            $scope.groupPermissionList.GroupPermissionId = list.GroupPermissionId;
            $scope.groupPermissionList.GroupId = list.Group.GroupId;
            $scope.groupPermissionList.permissionId = list.Permission.PermissionId;
            $scope.groupPermissionList.Context = list.Context;
            $scope.groupPermissionList.$save();
        }       
    })

     //---venderCtrl---//
    .controller('venderCtrl', function ($scope, Batt, $state, dialogs, alertService, sortService, loginState) {
        $scope.loginState = loginState;
        $scope.menuTitle = "Vender List";
        $scope.sort = sortService.sort;
        $scope.venderLists = Batt.VenderList.query();

        $scope.$on('venderChanged', function () {
            $scope.venderLists = Batt.VenderList.query();
        });

        $scope.$on('venderSave', function (event, venderList) {
            venderList.$save($scope.SaveSuccess, $scope.SaveFail);
        });

        $scope.SaveSuccess = function () {
            $scope.$emit('venderChanged');
            $state.go('vender');
            alertService.RenderSuccessMessage("Vender save success", 5000);
        };

        $scope.SaveFail = function (err) {
            alertService.RenderErrorMessage("Vender failed to save " + err.data.Message, 5000);
        };

        $scope.delete = function (venderId, index) {
            var dlg = null;
            dlg = dialogs.confirm('Please Confirm', 'Are you sure you want to delete this?');
            dlg.result.then(function (btn) {
                if (venderId != null) {
                    Batt.VenderList.delete({ id: venderId }, function () {
                        $scope.venderLists.splice(index, 1);
                        alertService.RenderSuccessMessage("vender deleted success", 5000);
                    }, function (err) {
                        alertService.RenderErrorMessage("vender deleted faild  "+ err.data.Message, 5000);
                    });
                }
            });
        }

        $scope.save = function (id) {
            $scope.venderList = id === 'undefined' ? new Batt.VenderList({ Items: [] }) : Batt.VenderList.get({ id: id });
            var dlg = dialogs.create('/Group/vender.edit.html', 'dialogCtrl', $scope.venderList, 'md');
            dlg.result.then(function (data) {
                $scope.$emit('venderSave', data);
            });
        };
    })

    //---groupCtrl---//
    .controller('groupCtrl', function ($scope, Batt, $state, $filter, dialogs, alertService, sortService, loginState) {
        $scope.loginState = loginState;
        $scope.menuTitle = "Group List";
        //grouplist
        $scope.groupLists = Batt.GroupList.query();
       

        $scope.sort = sortService.sort;

        $scope.$on('groupChanged', function () {
            $scope.groupLists = Batt.GroupList.query();
        });

        $scope.$on('groupSave', function (event, groupList) {
            groupList.$save($scope.SaveSuccess, $scope.SaveFail);
        });

        $scope.SaveSuccess = function (group) {
            $scope.$emit('groupChanged');
            $state.go('group');
            alertService.RenderSuccessMessage("Group save success", 5000);
        };
        $scope.SaveFail = function () {
            alertService.RenderErrorMessage("Failed to save", 5000);
        };
        //-- Methods --//
        //delete group
        $scope.delete = function (groupId, index) {
            var dlg = null;
            dlg = dialogs.confirm('Please Confirm', 'Are you sure you want to delete this?');
            dlg.result.then(function (btn) {
                if (groupId != null) {
                    Batt.GroupList.delete({ id: groupId }, function () {
                        alertService.RenderSuccessMessage("deleted success", 5000);
                        $scope.groupLists.splice(index, 1);
                    }, function (err) {
                        console.log(err)
                        alertService.RenderErrorMessage("deleted faild " + err.data.Message, 5000);
                    });
                }
            });
        }
        $scope.save = function (id) {
            $scope.groupList = id === 'undefined' ? new Batt.GroupList({ Items: [] }) : Batt.GroupList.get({ id: id });
            console.log($scope.groupList)
            var dlg = dialogs.create('/Group/group.detail.html', 'dialogCtrl', $scope.groupList, 'md');
            dlg.result.then(function (data) {
                $scope.$emit('groupSave', data);
            });
        };
    })

     //---myAccountCtrl---//
    .controller('myAccountCtrl', function ($scope, Batt, $state, dialogs, alertService, sortService, loginState) {
        $scope.userList = Batt.UserList.get({ id: loginState.user.UserId });
        $scope.menuTitle = "My Account";
        $scope.ShowCreateButton = false;
        $scope.ShowEditButton = false;
        $scope.ShowSaveButton = true;
        $scope.ShowCancelButton = true;
        $scope.ShowDeleteButton = false;

        $scope.EditUser = function () {
            $scope.ShowEditButton = false;
            $scope.ShowSaveButton = true;
            $scope.ShowCancelButton = true;
            $scope.ShowDeleteButton = false;
        };

        $scope.CancelChange = function () {
            $state.go('order');
        };

        $scope.SaveUser = function () {
            $scope.userList.$save($scope.SaveSuccess, $scope.SaveFail);
        };

        $scope.SaveSuccess = function (data) {
            loginState.state = true;
            loginState.user = data;
            $scope.$emit('userChanged');
            $state.go('order');
        };

        $scope.SaveFail = function () {
            loginState.state = false;
            alertService.RenderErrorMessage('Update user failed')
        };
    })

    //---userGroupCtrl---//   
    .controller('userGroupCtrl', function ($scope, Batt, dialogs, $state, alertService, sortService, loginState) {
        $scope.loginState = loginState;
        $scope.menuTitle = "Group & User"
        $scope.userGroupLists = Batt.UserGroupList.query();
        $scope.groupLists = Batt.GroupList.query();

        $scope.$on('userGroupChanged', function () {
            $scope.userGroupLists = Batt.UserGroupList.query();
        });

        //--sort method--//
        $scope.sort = sortService.sort;
        $scope.edit = function (id) {
            $scope.userGroupList = Batt.UserGroupList.get({ id: id });
            //--dialog show--//
            var dlg = dialogs.create('/Group/usergroupedit.html', 'dialogCtrl', $scope.userGroupList, 'lg');
            dlg.result.then(function (data) {
                data.$save(function () {  //--change success--//
                    $scope.$emit('userGroupChanged');
                    alertService.RenderSuccessMessage('Update success',5000);
                    $state.go('usergroup');
                }, function (resp) {  //--change fail--//
                    alertService.RenderSuccessMessage(resp.data,5000);
                });
            });
        }
        //--set user not active--//
        $scope.delete = function (list, index) {
            console.log(index);
            var dlg = null;
            dlg = dialogs.confirm('Please Confirm', 'Are you sure you want to delete this?');
            dlg.result.then(function (btn) {
                if (list != null) {
                    Batt.UserList.delete({ id: list.UserId }, function () {
                        alertService.RenderSuccessMessage("deleted success", 5000);
                        var idx = $scope.userGroupLists.indexOf(list);
                        $scope.userGroupLists.splice(idx, 1);
                        $scope.$emit('userGroupChanged');
                    }, function () {
                        alertService.RenderErrorMessage("deleted faild", 5000);
                    });                    
                }
            });
        };
    })

    //---productCtrl---// 
    .controller('productCtrl', function ($scope, Batt, $state, dialogs, alertService, sortService, loginState) {
        $scope.loginState = loginState;
        $scope.menuTitle = "Product List";
        $scope.venderLists = Batt.VenderList.query();
        $scope.productLists = Batt.ProductList.query();
        $scope.sort = sortService.sort;
        //$scope.pageService = pageService;

        $scope.$on('productChanged', function () {
            $scope.productLists = Batt.ProductList.query();
        });

        $scope.$on('productSave', function (event, productList) {
            productList.$save($scope.SaveSuccess, $scope.SaveFail);
        });

        $scope.SaveSuccess = function () {
            $scope.$emit('productChanged');
            $state.go('product');
            alertService.RenderSuccessMessage("Product save success", 5000);
        };
        $scope.SaveFail = function () {
            alertService.RenderErrorMessage("Product failed to save", 5000);
        };

        $scope.delete = function (productId, index) {
            var dlg = null;
            dlg = dialogs.confirm('Please Confirm', 'Are you sure you want to delete this?');
            dlg.result.then(function (btn) {
                if (productId != null) {
                    Batt.ProductList.delete({ id: productId }, function () {
                        $scope.productLists.splice(index, 1);
                        alertService.RenderSuccessMessage("Product deleted success", 5000);
                    }, function (err) {
                        alertService.RenderErrorMessage("Product deleted faild " + err.data.Message, 5000);
                    });
                }
            });
        }

        $scope.save = function (id) {
            $scope.productList = id === 'undefined' ? new Batt.ProductList({ Items: [] }) : Batt.ProductList.get({ id: id });
            var dlg = dialogs.create('/Group/product.edit.html', 'dialogCtrl', $scope.productList, 'md');
            dlg.result.then(function (data) {
                $scope.$emit('productSave', data);
            });
        };
    })

    //---orderCtrl---//
    .controller('orderCtrl', function ($scope, Batt, loginState, $state, sortService, alertService) {
        $scope.loginState = loginState;
        $scope.menuTitle = "PO List";
        $scope.sort = sortService.sort;
        $scope.order = "OrderId";

        //---go page for create order---//
        $scope.add = function () {
            $state.go('ordernew');
        }

        //---page---//
        $scope.currentPage = 1;
        $scope.perPage = 25;
        $scope.startItem = 0;
        $scope.endItem = $scope.perPage;
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function () {
            $scope.startItem = parseInt($scope.currentPage - 1, 10) * $scope.perPage;
            $scope.endItem = parseInt($scope.currentPage, 10) * $scope.perPage;
        };
    
        //---get vender---//
        $scope.venderLists = Batt.VenderList.query();
        //--get product list---//
        $scope.productLists = Batt.ProductList.query();
        //---init orderItems---//
        $scope.orderItems = [];
        $scope.ShowCreateButton = false;
        $scope.ShowEditButton = false;
        $scope.ShowSaveButton = true;
        $scope.ShowCancelButton = true;
        $scope.ShowDeleteButton = false;
        //---add new fpo id---//
        $scope.$on('orderChanged', function () {
            $scope.orderLists = Batt.OrderList.query(function (data) {
                if (data.length == 0) {
                    $scope.poNo = 1;
                }
                else {
                    $scope.poNo = data[data.length - 1].OrderId + 1;
                }
            });
        });
        $scope.$emit('orderChanged');

        //---default set issured date is today--// 
        var today = function () {
            $scope.dt = new Date().toLocaleDateString();
        }
        today();

        //---datepicker method---//
        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
            console.log($event)
        }

        $scope.openApprovalDate = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedApprovalDate = true;
        }

        //---init a new Order---//
        $scope.orderList = new Batt.OrderList({ Items: [] });

      
        //---calculate the order total money---//
        var calculateTotals = function () {
            var total = 0;
            for (var i = 0, len = $scope.orderItems.length; i < len; i++) {
                total = total + $scope.orderItems[i].Qty * $scope.orderItems[i].Price;
            }
            $scope.moneyTotal = total;
        }

        //---get the veder item  when vender change---//
        $scope.venderChange = function (verderId) {
            $scope.venderList = Batt.VenderList.get({ id: verderId });
            $scope.orderList.VenderId = verderId;
        }

        //---add new order item---//
        $scope.addOrderItem = function (productId) {
            calculateTotals();
            if (productId == null || productId == "") {
                var dst = new Batt.ProductList({ Items: [] });
                $scope.orderItems.push(dst);
            } else {
                Batt.ProductList.get({ id: productId }, function (data) {
                    $scope.orderItems.push(data);
                }, function () {
                    var dst = new Batt.ProductList({ Items: [] });
                    $scope.orderItems.push(dst);
                })
            }
        }

        //---remove order item from orderItems Array---//
        $scope.removeOrderItem = function (index) {
            $scope.orderItems.splice(index, 1);
            calculateTotals();
        }

        //---save order---//
        $scope.SaveOrder = function () {
            $scope.orderList.OrderDate = $scope.dt;
            $scope.orderList.UserId = $scope.loginState.user.UserId;
            $scope.orderList.Approval = $scope.image;
            calculateTotals();
            $scope.orderList.OrderTotal = $scope.moneyTotal;
            $scope.orderList.$save(function () {
                //--order save success--//
                alertService.RenderSuccessMessage("Order save success", 4000);
                $scope.$emit('orderChanged');
                //---save order items--//
                SaveItem();
                $state.go('order');
                //--order save failed--//
            }, function (err) {
                alertService.RenderErrorMessage(err.data,5000);
            });        
        }

        //---cancel the order then go page order--//
        $scope.CancelChange = function () {
            $state.go('order');
        }

        //---save order items method---//
        var SaveItem = function () {
            var orderId = $scope.poNo;
            for (var i = 0, len = $scope.orderItems.length; i < len; i++) {
                var orderList = new Batt.OrderItemList({ Items: [] });
                orderList.OrderId = orderId;
                orderList.Qty = $scope.orderItems[i].Qty;
                orderList.Dist = $scope.orderItems[i].Dist;
                orderList.Farasis = $scope.orderItems[i].Farasis;
                orderList.Description = $scope.orderItems[i].Description;
                orderList.AcctNo = $scope.orderItems[i].AcctNo;
                orderList.Unit = $scope.orderItems[i].Unit;
                orderList.Price = $scope.orderItems[i].Price;
                orderList.$save();
            }
        }       
    })

    //---orderDetailCtrl---//
    .controller('orderDetailCtrl', function ($scope, $stateParams, Batt, dialogs, loginState, $state, sortService, alertService) {
        $scope.loginState = loginState;
        $scope.orderList = Batt.OrderList.get({ id: $stateParams.id });
        $scope.orderItemLists = [];
        Batt.OrderItemList.query(function (data) {
            for (var i = 0, len = data.length; i < len; i++) {
                if (data[i].OrderId == $stateParams.id) {
                    $scope.orderItemLists.push(data[i]);
                }
            }     
        });
    })

    //---orderEditCtrl---//
    .controller('orderEditCtrl', function ($scope, $stateParams, Batt, dialogs, loginState, $state, sortService, alertService) {
        $scope.loginState = loginState;
        $scope.poNo = 0;
        $scope.query = "";
        $scope.orderList = Batt.OrderList.get({ id: $stateParams.id }, function (data) {
            $scope.poNo = data.OrderId;
            $scope.venderList = data.Vender;
            $scope.query = data.Vender.VenderId;
            $scope.image = data.Approval;
        });
        $scope.orderItems = [];
       
        var calculateTotals = function () {
            var total = 0;
            for (var i = 0, len = $scope.orderItems.length; i < len; i++) {
                total = total + $scope.orderItems[i].Qty * $scope.orderItems[i].Price;
            }            
            $scope.moneyTotal = total;
        }
        Batt.OrderItemList.query(function (data) {
            var list = [];
            for (var i = 0, len = data.length; i < len; i++) {
                if (data[i].OrderId == $stateParams.id) {
                    $scope.orderItems.push(data[i]);
                }
            }
            calculateTotals();
        });
        
        //---get vender---//
        $scope.venderLists = Batt.VenderList.query();
        //--get product list---//
        $scope.productLists = Batt.ProductList.query();
        //---init orderItems---//
        $scope.ShowCreateButton = false;
        $scope.ShowEditButton = false;
        $scope.ShowSaveButton = true;
        $scope.ShowCancelButton = true;
        $scope.ShowDeleteButton = false;

        //---datepicker method---//
        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        }
        //---datepicker method---//
        $scope.openApprovalDate = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedApprovalDate = true;
        }

        //---get the veder item when vender change---//
        $scope.venderChange = function (verderId) {
            $scope.venderList = Batt.VenderList.get({ id: verderId });
            $scope.orderList.VenderId = verderId;
        }

        //---add new order item---//
        $scope.addOrderItem = function (productId) {
            calculateTotals();
            if (productId == null || productId == "") {
                var dst = new Batt.ProductList({ Items: [] });
                $scope.orderItems.push(dst);
            } else {
                Batt.ProductList.get({ id: productId }, function (data) {
                    $scope.orderItems.push(data);
                }, function () {
                    var dst = new Batt.ProductList({ Items: [] });
                    $scope.orderItems.push(dst);
                })
            }
        }

        //---remove order item from orderItems Array---//
        $scope.removeOrderItem = function (index) {
            $scope.orderItems.splice(index, 1);
            calculateTotals();
        }

        //---save order---//
        $scope.SaveOrder = function () {
            calculateTotals();
            $scope.orderList.OrderTotal = $scope.moneyTotal;
            $scope.orderList.Approval = $scope.image;
            $scope.orderList.$save(function () {
                //--order save success--//
                alertService.RenderSuccessMessage("Order save success", 4000);
                $scope.$emit('orderChanged');
                //---save order items--//
                SaveItem();
                $state.go('order');
                //--order save failed--//
            }, function (err) {
                alertService.RenderErrorMessage(err.data,4000);
            });           
        }

        //---cancel the order then go page order--//
        $scope.CancelChange = function () {
            $state.go('order');
        }

        //---save order items method---//
        var SaveItem = function () {
            Batt.OrderItemList.delete({ orderId: $scope.poNo }, function () {
                for (var i = 0, len = $scope.orderItems.length; i < len; i++) {
                    var orderListItem = new Batt.OrderItemList({ Items: [] });
                    orderListItem.OrderId = $scope.poNo;
                    orderListItem.Qty = $scope.orderItems[i].Qty;
                    orderListItem.Dist = $scope.orderItems[i].Dist;
                    orderListItem.Farasis = $scope.orderItems[i].Farasis;
                    orderListItem.Description = $scope.orderItems[i].Description;
                    orderListItem.AcctNo = $scope.orderItems[i].AcctNo;
                    orderListItem.Unit = $scope.orderItems[i].Unit;
                    orderListItem.Price = $scope.orderItems[i].Price;
                    orderListItem.$save();
                }
            }, function (err) {
                alertService.RenderErrorMessage(err.data.Message, 5000)
            });           
        }
    })

     //---dialogCtrl---// 
    .controller('dialogCtrl', function ($scope, $modalInstance, dialogs, data, Batt) {
        $scope.groupLists = Batt.GroupList.query();
        $scope.venderLists = Batt.VenderList.query();
        $scope.data = data;

        $scope.cancel = function () {
            $modalInstance.dismiss('Canceled');
        }; // end cancel

        $scope.done = function () {
            $modalInstance.close($scope.data);
        }; // end done

    })
