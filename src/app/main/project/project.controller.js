(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('ProjectController', ProjectController);

    /** @ngInject */
    function ProjectController($scope, $rootScope, $location, $document, $timeout, $mdDialog, $mdMedia, $mdSidenav, projectService) {

        var vm = this;

        // Data
        vm.accounts = {
            'creapond': 'johndoe@creapond.com',
            'withinpixels': 'johndoe@withinpixels.com'
        };
        vm.typeFillter = {
            'project': 'Filter By Project',
            'person': 'Filter By Person'
        };

        vm.person = [{
            'id': 1,
            'name': 'Sarayut Kungsaranuwat',
            'nickname': 'Moo'
        }, {
            'id': 2,
            'name': 'Nuttakrittra Phumsawai',
            'nickname': 'TingTang'
        }]
        vm.checked = [];
        vm.colors = ['blue-bg', 'blue-grey-bg', 'orange-bg', 'pink-bg', 'purple-bg'];
        vm.selectedAccount = 'project';
        vm.selectedselectedProject = {};
        vm.toggleSidenav = toggleSidenav;



        vm.responsiveReadPane = undefined;
        vm.activeMailPaneIndex = 0;
        vm.dynamicHeight = false;

        vm.scrollPos = 0;
        vm.scrollEl = angular.element('#content');

        // vm.inbox = Inbox.data;

        vm.selectedMailShowDetails = false;

        // Methods
        vm.checkAll = checkAll;
        vm.closeReadPane = closeReadPane;
        vm.isChecked = isChecked;
        vm.selectProject = selectProject;
        vm.toggleStarred = toggleStarred;
        vm.toggleCheck = toggleCheck;




        $scope.financeStatus = true;
        $scope.documentStatus = false;
        $scope.scopeOfWorkStatus = false;

        $scope.colorx = {
            coloursGood: ['#53e63f', '#b3fda9'],
            coloursNormal: ['#FFC107', '#f7ffa8'],
            coloursBad: ['#FF5722', '#fbbfbb'],
            coloursDefault: ['#039be5', '#8cd9ff']

        }
        $scope.IsSuccess = false;

        $scope.durationValue = 100;

        vm.doughnutChartReceipted = {};
        // Chart.js Options
        $scope.options = {

            // Sets the chart to be responsive
            responsive: true,

            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke: false,

            //String - The colour of each segment stroke
            segmentStrokeColor: '#FFFFFF',

            //Number - The width of each segment stroke
            segmentStrokeWidth: 0,

            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout: 50, // This is 0 for Pie charts

            //Number - Amount of animation steps
            animationSteps: 100,

            //String - Animation easing effect
            animationEasing: 'easeOutBounce',

            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate: true,

            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale: true,

            //String - A legend template
            legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
        }

        $scope.searchProject = {};
        $scope.filterStatus = {};
        $scope.$watch('searchProject', function(n, o) {
            // console.log(o + ":" + n);
        }, true);
        $scope.$watch('filterStatus', function(n, o) {

        }, true);

        $scope.costTotal = 0;
        $scope.doughnutChartBySelectProject = {
            labels: ['', ''],
            data: [0, 100],
            color: $scope.colorx.coloursDefault
        }
        $scope.receiptChartBySelectProject = {
            labels: ['', ''],
            data: [0, 100],
            color: $scope.colorx.coloursBad
        }
        $scope.progressChartBySelectProject = {
            labels: ['', ''],
            data: [0, 100],
            color: $scope.colorx.coloursBad
        }

        $rootScope.getProjectData = function() {
            $scope.periodPercentAmount = 0;
            var periodPercentleft = 100;
            $scope.costPercent = 0;
            $scope.useDays = 0;
            $scope.lefts = 0;
            $scope.receiptTotal = 0;
            $scope.colorxCart;
            $scope.statusCart;
            $scope.colorxReceipt;
            projectService.getProject().then(function(data) {
                console.log('Call Service Success ');
                vm.projectData = data;
                vm.selectedProject = vm.projectData[0];
                if (vm.projectData.length > 0) {
                    if (vm.selectedProject.CostInfo.length > 0) {
                        angular.forEach(vm.selectedProject.CostInfo, function(cost) {
                            $scope.costTotal += cost.CostAmount;
                        })
                        $scope.costPercent = ($scope.costTotal / vm.selectedProject.BudgetInfo.Budget) * 100;
                        $scope.leftCostPercent = 100 - parseInt($scope.costPercent);

                        if ($scope.costPercent < 30) {
                            $scope.colorxCart = $scope.colorx.coloursGood;
                        } else if ($scope.costPercent < 70) {
                            $scope.colorxCart = $scope.colorx.coloursNormal;
                        } else {
                            $scope.colorxCart = $scope.colorx.coloursBad;
                        }
                        $scope.doughnutChartBySelectProject = {
                            labels: ['Cost(%)', 'Budget(%)'],
                            data: [parseInt($scope.costPercent), $scope.leftCostPercent],
                            color: $scope.colorxCart
                        }
                    }
                    if (vm.selectedProject.PeriodInfo.length > 0) {
                        angular.forEach(vm.selectedProject.PeriodInfo, function(period) {
                            if (period.PeriodStatus == 'PERIOD_RECEIPTED') {
                                $scope.periodPercentAmount += period.PeriodPercent;
                                $scope.receiptTotal += period.PeriodAmout;
                            }
                        })
                        if ($scope.periodPercentAmount < 30) {
                            $scope.colorxReceipt = $scope.colorx.coloursBad;
                        } else if ($scope.periodPercentAmount < 70) {
                            $scope.colorxReceipt = $scope.colorx.coloursNormal;
                        } else {
                            $scope.colorxReceipt = $scope.colorx.coloursGood;
                        }
                        periodPercentleft = periodPercentleft - $scope.periodPercentAmount;
                        $scope.receiptChartBySelectProject = {
                            labels: ['', ''],
                            data: [$scope.periodPercentAmount, periodPercentleft],
                            color: $scope.colorxReceipt
                        }
                        $scope.progressChartBySelectProject = {
                            labels: ['', ''],
                            data: [$scope.periodPercentAmount, periodPercentleft],
                            color: $scope.colorx.coloursDefault
                        }
                    }
                    $rootScope.chart_progress();
                    $rootScope.getFileList();
                }

            }, function(err) {
                console.log('Call Service Fail');
            })
        };

        $rootScope.getProjectData();

        $rootScope.chart_progress = function() {
            vm.doughnutChartTime = [];
            $scope.doughnutChartProcess = [];
            $scope.costProgress = [];
            $scope.receiptProgress = [];
            angular.forEach(vm.projectData, function(project) {
                $scope.useDays = 0;
                $scope.lefts = 0;
                if (project.ProjectDuration > 0) {
                    $scope.useDays = parseInt((new Date() - new Date(project.Created)) / 86400000);
                    $scope.lefts = project.ProjectDuration - $scope.useDays;
                    $scope.persenDays = ($scope.useDays / project.ProjectDuration) * 100;
                    if ($scope.persenDays < 30) {
                        $scope.colorxCart = $scope.colorx.coloursGood;
                        $scope.statusCart = 'Good';
                    } else if ($scope.persenDays < 70) {
                        $scope.colorxCart = $scope.colorx.coloursNormal;
                        $scope.statusCart = 'Normal';
                    } else {
                        $scope.colorxCart = $scope.colorx.coloursBad;
                        $scope.statusCart = 'Bad';
                    }
                } else {
                    $scope.useDays = 0;
                    $scope.lefts = 0;
                    $scope.colorxCart = $scope.colorx.coloursBad;
                    $scope.statusCart = 'Bad';
                }

                var costTotal = 0;
                $scope.costPercent = 0;
                if (project.CostInfo.length > 0) {
                    angular.forEach(project.CostInfo, function(cost) {
                        costTotal += cost.CostAmount;
                    })
                    $scope.costPercent = (costTotal / project.BudgetInfo.Budget) * 100;
                }
                $scope.costProgress.push({
                    name: project.ProjectCode,
                    progress: $scope.costPercent
                })

                vm.doughnutChartTime.push({
                    name: project.ProjectCode,
                    labels: ['', ''],
                    data: [$scope.useDays, $scope.lefts],
                    color: $scope.colorxCart,
                    status: $scope.statusCart
                })

                // Progress Chart

                // vm.doughnutChartProcess.push({
                //         name: project.ProjectCode,
                //         labels: ['', ''],
                //         data: [50, 50],
                //         color: $scope.colorx.coloursDefault

                //     })
                $scope.periodPercentAmount = 0;
                var periodPercentleft = 100;

                if (project.PeriodInfo.length > 0) {

                    angular.forEach(project.PeriodInfo, function(period) {

                        if (period.PeriodStatus == 'PERIOD_RECEIPTED') {
                            $scope.periodPercentAmount += period.PeriodPercent;
                        }

                    })
                    periodPercentleft = periodPercentleft - $scope.periodPercentAmount;
                    $scope.doughnutChartProcess.push({
                        name: project.ProjectCode,
                        labels: ['', ''],
                        data: [$scope.periodPercentAmount, periodPercentleft],
                        color: $scope.colorx.coloursDefault
                    })

                } else {
                    $scope.doughnutChartProcess.push({
                        name: project.ProjectCode,
                        labels: ['', ''],
                        data: [0, 100],
                        color: $scope.colorx.coloursDefault
                    })
                }
                // Progress Chart end

                // receipt bar listview
                var periodTotal = 0;
                if (project.PeriodInfo.length > 0) {
                    angular.forEach(project.PeriodInfo, function(period) {
                        if (period.PeriodStatus == "PERIOD_RECEIPTED") {
                            periodTotal += period.PeriodPercent;
                        }

                    })
                }
                $scope.receiptProgress.push({
                        name: project.ProjectCode,
                        progress: periodTotal
                    })
                    // receipt bar listview end
            });
        }

        $scope.finance = function() {
            $scope.financeStatus = true;
            $scope.documentStatus = false;
            $scope.scopeOfWorkStatus = false;

        }
        $scope.documents = function() {
            $scope.financeStatus = false;
            $scope.documentStatus = true;
            $scope.scopeOfWorkStatus = false;
        }
        $scope.scopeOfWork = function() {
            $scope.financeStatus = false;
            $scope.documentStatus = false;
            $scope.scopeOfWorkStatus = true;
        }

        $scope.showConfirm = function(ev, status) {
            var projectCode = "";
            if (vm.checked.length > 0) {
                // Appending dialog to document.body to cover sidenav in docs app
                for (var i = vm.checked.length - 1; i >= 0; i--) {
                    if (projectCode == "") {
                        projectCode = vm.checked[i].ProjectCode + projectCode;
                    } else if (i == vm.checked.length - 2) {
                        projectCode = vm.checked[i].ProjectCode + " and " + projectCode;
                    } else {
                        projectCode = vm.checked[i].ProjectCode + " , " + projectCode;
                    }
                };

                var confirm = $mdDialog.confirm()
                    .title('Are you sure for change status?')
                    .textContent(projectCode + ' change status to be "' + status + '"')
                    .ariaLabel('confirm change status project')
                    .targetEvent(ev)
                    .ok('OK')
                    .cancel('Cancel');

                $mdDialog.show(confirm).then(function() {
                    console.log('You are sure :)');
                    angular.forEach(vm.checked, function(project) {

                            project.ProjectStatus = status;

                            projectService.putProject(project).then(function() {
                                console.log('update status success');

                                vm.checked = [];
                            }, function(err) {
                                console.log('update status fail' + err);
                            })
                        })
                        // $rootScope.getProjectData();
                }, function() {
                    console.log('You are  not sure :(');
                });

            } else {
                // Appending dialog to document.body to cover sidenav in docs app
                // Modal dialogs should fully cover application
                // to prevent interaction outside of dialog
                $mdDialog.show(
                    $mdDialog.alert()
                    // .parent(angular.element(document.querySelector('')))
                    .clickOutsideToClose(true)
                    .title('Warning!')
                    .textContent('Please select project.')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                    .targetEvent(ev)
                );
            }

        }
        $scope.changeStatusByProject = function(ev, status) {

            var confirm = $mdDialog.confirm()
                .title('Are you sure for change status?')
                .textContent(vm.selectedProject.ProjectCode + ' change status to be "' + status + '"')
                .ariaLabel('confirm change status project')
                .targetEvent(ev)
                .ok('OK')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                console.log('You are sure :)');


                vm.selectedProject.ProjectStatus = status;

                projectService.putProject(vm.selectedProject).then(function() {
                    console.log('update status by project success');

                    vm.checked = [];
                }, function(err) {
                    console.log('update status by project fail' + err);
                })

                // $rootScope.getProjectData();
            }, function() {
                console.log('You are  not sure :(');
            });
        }
        $scope.updatePeriod = function(period, e) {

            if (period.PeriodStatus == "" || period.PeriodStatus == "PERIOD_SUCCESS") {

                var confirm = $mdDialog.confirm()
                    .title('Confirm?')
                    .textContent('Are you sure for update period.')
                    .ariaLabel('update period.')
                    .targetEvent()
                    .ok('OK')
                    .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    console.log('You are sure :)');

                    angular.forEach(vm.selectedProject.PeriodInfo, function(periodInfo) {
                        if (periodInfo.PeriodOrder == period.PeriodOrder) {
                            if (periodInfo.PeriodStatus) {
                                periodInfo.PeriodStatus = "";
                            } else {
                                periodInfo.PeriodStatus = "PERIOD_SUCCESS";
                            }

                        }
                    })


                    projectService.putProject(vm.selectedProject).then(function() {

                        console.log('update period success');
                        // $rootScope.chart_progress();
                    }, function(err) {
                        console.log('update period fail' + err);
                    })

                    if ($scope.IsSuccess == true) {
                        $scope.IsSuccess = false;
                    } else {
                        $scope.IsSuccess = true;
                    }

                }, function() {
                    console.log('You are  not sure :(');

                    if ($scope.IsSuccess == true) {
                        $scope.IsSuccess = true;
                    } else {
                        $scope.IsSuccess = false;
                    }

                    console.log($scope.IsSuccess);

                });

            }

        }

        $scope.taxInvoice = function(period) {

            $scope.periodPercentAmount = 0;
            var periodPercentleft = 100;

            angular.forEach(vm.selectedProject.PeriodInfo, function(periodInfo) {
                if (periodInfo.PeriodOrder == period.PeriodOrder) {
                    periodInfo.ReceiptDate = new Date();
                    periodInfo.PeriodStatus = "PERIOD_RECEIPTED";

                }
            })

            projectService.putProject(vm.selectedProject).then(function() {
                console.log('update period success');
                $rootScope.chart_progress();

                if (vm.selectedProject.PeriodInfo.length > 0) {
                    $scope.periodPercentAmount = 0;
                    angular.forEach(vm.selectedProject.PeriodInfo, function(period) {
                        if (period.PeriodStatus == 'PERIOD_RECEIPTED') {
                            $scope.periodPercentAmount += period.PeriodPercent;
                            $scope.receiptTotal += period.PeriodAmout;
                        }
                    })
                    if ($scope.periodPercentAmount < 30) {
                        $scope.colorxReceipt = $scope.colorx.coloursBad;
                    } else if ($scope.periodPercentAmount < 70) {
                        $scope.colorxReceipt = $scope.colorx.coloursNormal;
                    } else {
                        $scope.colorxReceipt = $scope.colorx.coloursGood;
                    }
                    periodPercentleft = periodPercentleft - $scope.periodPercentAmount;
                    $scope.receiptChartBySelectProject = {
                        labels: ['Price(%)', 'Receipt(%)'],
                        data: [$scope.periodPercentAmount, periodPercentleft],
                        color: $scope.colorxReceipt
                    }
                    $scope.progressChartBySelectProject = {
                        labels: ['', ''],
                        data: [$scope.periodPercentAmount, periodPercentleft],
                        color: $scope.colorx.coloursDefault
                    }
                } else {
                    $scope.receiptChartBySelectProject = {
                        labels: ['Price(%)', 'Receipt(%)'],
                        data: [0, 100],
                        color: $scope.colorx.coloursBad
                    }
                    $scope.progressChartBySelectProject = {
                        labels: ['', ''],
                        data: [$scope.periodPercentAmount, periodPercentleft],
                        color: $scope.colorx.coloursDefault
                    }
                }
                // $rootScope.chart_progress();
            }, function(err) {
                console.log('update period fail' + err);
            })
        }

        // Watch screen size to activate responsive read pane
        $scope.$watch(function() {
            return $mdMedia('gt-md');
        }, function(current) {
            vm.responsiveReadPane = !current;
        });

        // Watch screen size to activate dynamic height on tabs
        $scope.$watch(function() {
            return $mdMedia('xs');
        }, function(current) {
            vm.dynamicHeight = current;
        });

        /**
         * Select mail
         *
         * @param mail
         */

        $rootScope.reloadCost = function() {
            $scope.costTotal = 0;
            $scope.costPercent = 0;
            $scope.colorxCart;
            $scope.receiptTotal = 0;
            if (vm.selectedProject.CostInfo.length > 0) {
                angular.forEach(vm.selectedProject.CostInfo, function(cost) {
                    $scope.costTotal += cost.CostAmount;
                })
                $scope.costPercent = ($scope.costTotal / vm.selectedProject.BudgetInfo.Budget) * 100;
                $scope.leftCostPercent = 100 - parseInt($scope.costPercent);

                if ($scope.costPercent < 30) {
                    $scope.colorxCart = $scope.colorx.coloursGood;
                } else if ($scope.costPercent < 70) {
                    $scope.colorxCart = $scope.colorx.coloursNormal;
                } else {
                    $scope.colorxCart = $scope.colorx.coloursBad;
                }

                $scope.doughnutChartBySelectProject = {
                    labels: ['', ''],
                    data: [parseInt($scope.costPercent), $scope.leftCostPercent],
                    color: $scope.colorxCart
                }
            } else {
                $scope.doughnutChartBySelectProject = {
                    labels: ['', ''],
                    data: [0, 100],
                    color: $scope.colorx.coloursDefault
                }
            }
        }

        function selectProject(project) {


            vm.selectedProject = project;

            $scope.periodPercentAmount = 0;
            var periodPercentleft = 100;
            $scope.costTotal = 0;
            $scope.costPercent = 0;
            $scope.colorxCart;
            $scope.receiptTotal = 0;
            if (project.CostInfo.length > 0) {
                angular.forEach(project.CostInfo, function(cost) {
                    $scope.costTotal += cost.CostAmount;
                })
                $scope.costPercent = ($scope.costTotal / project.BudgetInfo.Budget) * 100;
                $scope.leftCostPercent = 100 - parseInt($scope.costPercent);

                if ($scope.costPercent < 30) {
                    $scope.colorxCart = $scope.colorx.coloursGood;
                } else if ($scope.costPercent < 70) {
                    $scope.colorxCart = $scope.colorx.coloursNormal;
                } else {
                    $scope.colorxCart = $scope.colorx.coloursBad;
                }

                $scope.doughnutChartBySelectProject = {
                    labels: ['', ''],
                    data: [parseInt($scope.costPercent), $scope.leftCostPercent],
                    color: $scope.colorxCart
                }
            } else {
                $scope.doughnutChartBySelectProject = {
                    labels: ['', ''],
                    data: [0, 100],
                    color: $scope.colorx.coloursDefault
                }
            }
            if (vm.selectedProject.PeriodInfo.length > 0) {
                angular.forEach(vm.selectedProject.PeriodInfo, function(period) {
                    if (period.PeriodStatus == 'PERIOD_RECEIPTED') {
                        $scope.periodPercentAmount += period.PeriodPercent;
                        $scope.receiptTotal += period.PeriodAmout;
                    }
                })
                if ($scope.periodPercentAmount < 30) {
                    $scope.colorxReceipt = $scope.colorx.coloursBad;
                } else if ($scope.periodPercentAmount < 70) {
                    $scope.colorxReceipt = $scope.colorx.coloursNormal;
                } else {
                    $scope.colorxReceipt = $scope.colorx.coloursGood;
                }
                periodPercentleft = periodPercentleft - $scope.periodPercentAmount;
                $scope.receiptChartBySelectProject = {
                    labels: ['Price(%)', 'Receipt(%)'],
                    data: [$scope.periodPercentAmount, periodPercentleft],
                    color: $scope.colorxReceipt
                }
                $scope.progressChartBySelectProject = {
                    labels: ['', ''],
                    data: [$scope.periodPercentAmount, periodPercentleft],
                    color: $scope.colorx.coloursDefault
                }
            } else {
                $scope.receiptChartBySelectProject = {
                    labels: ['Price(%)', 'Receipt(%)'],
                    data: [0, 100],
                    color: $scope.colorx.coloursBad
                }
                $scope.progressChartBySelectProject = {
                    labels: ['', ''],
                    data: [$scope.periodPercentAmount, periodPercentleft],
                    color: $scope.colorx.coloursDefault
                }
            }

            $timeout(function() {
                // If responsive read pane is
                // active, navigate to it
                if (angular.isDefined(vm.responsiveReadPane) && vm.responsiveReadPane) {
                    vm.activeMailPaneIndex = 1;
                }

                // Store the current scrollPos
                vm.scrollPos = vm.scrollEl.scrollTop();

                // Scroll to the top
                vm.scrollEl.scrollTop(0);
            });
            $rootScope.getFileList();
        }

        /**
         * Close read pane
         */
        function closeReadPane() {
            if (angular.isDefined(vm.responsiveReadPane) && vm.responsiveReadPane) {
                vm.activeMailPaneIndex = 0;

                $timeout(function() {
                    vm.scrollEl.scrollTop(vm.scrollPos);
                }, 650);
            }
        }

        /**
         * Toggle starred
         *
         * @param mail
         * @param event
         */
        function toggleStarred(mail, event) {
            event.stopPropagation();
            mail.starred = !mail.starred;
        }

        /**
         * Toggle checked status of the mail
         *
         * @param mail
         * @param event
         */
        function toggleCheck(project, event) {
            if (event) {
                event.stopPropagation();
            }

            var idx = vm.checked.indexOf(project);

            if (idx > -1) {
                vm.checked.splice(idx, 1);
            } else {
                vm.checked.push(project);
            }
        }

        /**
         * Return checked status of the mail
         *
         * @param mail
         * @returns {boolean}
         */
        function isChecked(project) {
            return vm.checked.indexOf(project) > -1;
        }

        /**
         * Check all
         */
        function checkAll() {
            if (vm.allChecked) {
                vm.checked = [];
                vm.allChecked = false;
            } else {
                angular.forEach(vm.projectData, function(project) {
                    if (!isChecked(project)) {
                        toggleCheck(project);
                    }
                });

                vm.allChecked = true;
            }
        }

        $rootScope.getFileList = function() {
            $scope.fileList = [];
            $scope.fileListPD = [];
            projectService.getFileList(vm.selectedProject.ProjectCode).then(function(response) {
                angular.forEach(response.data, function(data) {
                    var dontCost = data.split("_");
                    if (dontCost[dontCost.length - 1].substr(0, 4) != "Cost" && dontCost[1] != "PD") {
                        $scope.fileList.push(data);
                    } else if (dontCost[1] == "PD") {
                        $scope.fileListPD.push(data);
                    } else {

                    }
                })

            }, function(err) {

            })
        }
        $scope.downloadFile = function(file) {
            projectService.downloadFile(file).then(function(response) {
                window.location.assign(response.config.url);
            }, function(err) {

            })
        }

        $scope.serviceInvoice = function(period) {
                period.PeriodStatus = "PERIOD_WAITING";
                projectService.putProject(vm.selectedProject).then(function() {
                    console.log('Update statue success.');

                }, function(err) {
                    console.log('Update statue fail.');
                })
            }
            /**
             * Open compose dialog
             *
             * @param ev
             */
        $scope.composeDialog = function(ev) {
            $mdDialog.show({
                controller: 'NewProjectController',
                controllerAs: 'vm',
                locals: {
                    projectData: vm.projectData
                },
                templateUrl: 'app/main/project/dialogs/new_project/new_project.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }

        $scope.EstimateDialog = function(ev) {
            $mdDialog.show({
                controller: 'EstimateController',
                controllerAs: 'vm',
                locals: {
                    selectedProject: vm.selectedProject
                },
                templateUrl: 'app/main/project/dialogs/estimate/estimate.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }

        $scope.UploadFiledialog = function(ev) {
            $mdDialog.show({
                controller: 'UploadFileController',
                controllerAs: 'vm',
                locals: {
                    selectedProject: vm.selectedProject
                },
                templateUrl: 'app/main/project/dialogs/UploadFile/uploadFile.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }

        $scope.receiptmore = function(ev, receipt) {
            $mdDialog.show({
                controller: 'receiptmoreController',
                controllerAs: 'vm',
                locals: {
                    receipt: receipt
                },
                templateUrl: 'app/main/project/dialogs/receipt-more/receipt-more.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }

        $scope.costsMore = function(ev, cost) {
            $mdDialog.show({
                controller: 'costmoreController',
                controllerAs: 'vm',
                locals: {
                    cost: cost
                },
                templateUrl: 'app/main/project/dialogs/cost-more/cost-more.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }

        $scope.UploadpoDialog = function(ev) {
            $mdDialog.show({
                controller: 'Upload_PO_Controller',
                controllerAs: 'vm',
                locals: {
                    selectedProject: vm.selectedProject
                },
                templateUrl: 'app/main/project/dialogs/upload_po/upload_po.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }

        $scope.AddCostDialog = function(ev) {
            $mdDialog.show({
                controller: 'AddcostController',
                controllerAs: 'vm',
                locals: {
                    selectedProject: vm.selectedProject
                },
                templateUrl: 'app/main/project/dialogs/addcost/addcost.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }

        $scope.EditDialog = function(ev) {
            $mdDialog.show({
                controller: 'EditController',
                controllerAs: 'vm',
                locals: {
                    selectedProject: vm.selectedProject
                },
                templateUrl: 'app/main/project/dialogs/Edit/Edit.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }

        $scope.UploadAppointment = function(ev, period) {
            $mdDialog.show({
                controller: 'AppointmentController',
                controllerAs: 'vm',
                locals: {
                    selectedProject: vm.selectedProject,
                    period: period
                },
                templateUrl: 'app/main/project/dialogs/appointment/appointment.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }


        $scope.customerdialog = function(ev) {
            $mdDialog.show({
                controller: 'customerController',
                controllerAs: 'vm',
                locals: {
                    selectedProject: vm.selectedProject,
                    // period: period
                },
                templateUrl: 'app/main/project/dialogs/customer/customer.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }

        // $scope.replyDialog = function(ev) {
        //     $mdDialog.show({
        //         controller: 'NewProjectController',
        //         controllerAs: 'vm',
        //         locals: {
        //             selectedProject: vm.selectedselectedProject
        //         },
        //         templateUrl: 'app/main/project/dialogs/new_project/new_project.html',
        //         parent: angular.element($document.body),
        //         targetEvent: ev,
        //         clickOutsideToClose: true
        //     });
        // }

        function toggleSidenav(sidenavId) {
            $mdSidenav(sidenavId).toggle();
        }

    }
})();
