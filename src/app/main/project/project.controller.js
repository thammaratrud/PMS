(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('ProjectController', ProjectController);

    /** @ngInject */
    function ProjectController($scope, $document, $timeout, $mdDialog, $mdMedia, $mdSidenav,projectService) {
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

        vm.projectData = [{
            "ProjectID": "3",
            "ProjectCode": "Project COA",
            "ProjectName": "Corporate Online Approve System",
            "ProjectStatus": "Play",
            "ProjectDuration": 90,
            "ScopeInfo": [{
                "ScopeID": 1,
                "ProjectID": "3",
                "Topic": "Ranking Search",
                "Detail": "สามารถแสดงข้อมูล ranking"
            }, {
                "ScopeID": 2,
                "ProjectID": "3",
                "Topic": "Ranking Management",
                "Detail": "สามารถแก้ไขชื่อลำดับและวันที่ข้ามอย่างเดียวในลำดับแรกและลำดับสุดท้าย"
            }],
            "CustomerInfo": {
                "ProjectID": "3",
                "CompanyID": "3",
                "CompanyName": "บริษัท อ๊อปติมัส ซอฟต์ จำกัด (สำนักงานใหญ่)",
                "CompanyAddress": "127/31 อาคารปัญจธานี ทาวเวอร์ ชั้น 26 ถนนนนทรี แขวงช่องนนทรี เขตยานนาวา กรุงเทพมหานคร 10120",
                "CustomerDetailInfo": [{
                    "CustomerID": 1,
                    "CompanyID": "3",
                    "CustomerName": "คุณสมชาย ใจดี",
                    "CustomerTel": "0956601234",
                    "CustomerPosition": "Project Manager",
                    "StateInfo": {
                        "CustomerID": 1,
                        "StateID": "3",
                        "StateName": "Project Manager",
                        "StateValue": "3"
                    }
                }, {
                    "CustomerID": 2,
                    "CompanyID": "3",
                    "CustomerName": "คุณสมร",
                    "CustomerTel": "0892349999",
                    "CustomerPosition": "ฝ่ายบัญชี",
                    "StateInfo": {
                        "CustomerID": 1,
                        "StateID": "4",
                        "StateName": "Accounting",
                        "StateValue": "4"
                    }
                }]
            },
            "BudgetInfo": {
                "ProjectID": "3",
                "Price": 210000,
                "Budget": 60000,
                "IsIncludeVat": false
            },
            "PeriodInfo": [{
                "PeriodID": 1,
                "ProjectID": "3",
                "PeriodOrder": 1,
                "PeriodDesc": "SIT",
                "PeriodPercent": 100,
                "PeriodAmout": 224700,
                "PeriodStatus": "wait",
                "InvoiceNo": "",
                "InvoiceDate": "",
                "InvoiceFile": "",
                "AppNo": "",
                "AppDate": "",
                "AppFile": "",
                "ReceiptNo": "",
                "ReceiptDate": "",
                "ReceiptFile": ""
            }],
            "QuotationInfo": {
                "ProjectID": "3",
                "QuotationNo": "",
                "QuotationDate": "",
                "QuotationFile": ""
            },
            "PurchaseInfo": {
                "ProjectID": "3",
                "PurchaseNo": "",
                "PurchaseDate": "",
                "PurchaseFile": "",
                "DrillDate": ""
            },
            "CostInfo": [{
                "CostID": 1,
                "ProjectID": "3",
                "EmpID": "11",
                "CostEmp": "ณัฐกฤษตรา พุ่มไสว",
                "CostDate": "2016-08-29T10:27:20.6786992+07:00",
                "CostDesc": "ค่าน้ำมัน",
                "CostAmount": 500,
                "CostFile": "",
                "IsTax": false,
                "CostName": "",
                "CostNoTax": "",
                "CostAdd": ""
            }, {
                "CostID": 1,
                "ProjectID": "3",
                "EmpID": "11",
                "CostEmp": "ณัฐกฤษตรา พุ่มไสว",
                "CostDate": "2016-08-29T10:27:20.6786992+07:00",
                "CostDesc": "ค่าทางด่วน",
                "CostAmount": 220,
                "CostFile": "",
                "IsTax": false,
                "CostName": "",
                "CostNoTax": "",
                "CostAdd": ""
            }],
            "TaskInfo": [{
                "TaskID": 1,
                "ProjectID": "3",
                "EmpID": "11",
                "TaskEmp": "ณัฐกฤษตรา พุ่มไสว",
                "Duration": 5,
                "StartDate": "2016-08-29T10:27:20.6797001+07:00",
                "FinishDate": "2016-09-29T10:27:20.6797001+07:00",
                "IsStatus": false,
                "Row": "",
                "InPeriod": "",
                "Ratio": 20,
                "Issue": ""
            }],
            "DocumentInfo": [{
                "DocID": 1,
                "ProjectID": "sample string 2",
                "DocName": "sample string 3",
                "DocFile": "sample string 4",
                "ObjectState": 0,
                "Created": "2016-08-29T10:27:20.680701+07:00",
                "CreatedBy": "sample string 5",
                "Updated": "2016-08-29T10:27:20.680701+07:00",
                "UpdatedBy": "sample string 6"
            }, {
                "DocID": 1,
                "ProjectID": "sample string 2",
                "DocName": "sample string 3",
                "DocFile": "sample string 4",
                "ObjectState": 0,
                "Created": "2016-08-29T10:27:20.680701+07:00",
                "CreatedBy": "sample string 5",
                "Updated": "2016-08-29T10:27:20.680701+07:00",
                "UpdatedBy": "sample string 6"
            }]
        }, {
            "ProjectID": "4",
            "ProjectCode": "Project TTSM",
            "ProjectName": "Trouble Ticket System Mobility",
            "ProjectStatus": "Pass",
            "ProjectDuration": 60,
            "ScopeInfo": [{
                "ScopeID": 1,
                "ProjectID": "4",
                "Topic": "เพิ่ม Field แสดง Product, Dealer ที่หน้า Monitoring",
                "Detail": "เพิ่ม Field ใน db แล้วแสดงบนหน้าจอ"
            }, {
                "ScopeID": 2,
                "ProjectID": "4",
                "Topic": "Upload Lead Management",
                "Detail": "สามารถ Upload และนำเข้าข้อมูลผ่าน excel ได้"
            }],
            "CustomerInfo": {
                "ProjectID": "4",
                "CompanyID": "3",
                "CompanyName": "บริษัท อ๊อปติมัส ซอฟต์ จำกัด (สำนักงานใหญ่)",
                "CompanyAddress": "127/31 อาคารปัญจธานี ทาวเวอร์ ชั้น 26 ถนนนนทรี แขวงช่องนนทรี เขตยานนาวา กรุงเทพมหานคร 10120",
                "CustomerDetailInfo": [{
                    "CustomerID": 1,
                    "CompanyID": "3",
                    "CustomerName": "คุณศรราม เทพพิทักษ์",
                    "CustomerTel": "0956601234",
                    "CustomerPosition": "Project Manager",
                    "StateInfo": {
                        "CustomerID": 1,
                        "StateID": "3",
                        "StateName": "Project Manager",
                        "StateValue": "3"
                    }
                }, {
                    "CustomerID": 2,
                    "CompanyID": "3",
                    "CustomerName": "คุณสมร",
                    "CustomerTel": "0892349999",
                    "CustomerPosition": "ฝ่ายบัญชี",
                    "StateInfo": {
                        "CustomerID": 1,
                        "StateID": "4",
                        "StateName": "Accounting",
                        "StateValue": "4"
                    }
                }]
            },
            "BudgetInfo": {
                "ProjectID": "4",
                "Price": 280000,
                "Budget": 90000,
                "IsIncludeVat": false
            },
            "PeriodInfo": [{
                "PeriodID": 1,
                "ProjectID": "4",
                "PeriodOrder": 1,
                "PeriodDesc": "SRS",
                "PeriodPercent": 50,
                "PeriodAmout": 149800,
                "PeriodStatus": "success",
                "InvoiceNo": "",
                "InvoiceDate": "2016-08-29T10:27:20.6786992+07:00",
                "InvoiceFile": "",
                "AppNo": "",
                "AppDate": "2016-08-29T10:27:20.6786992+07:00",
                "AppFile": "",
                "ReceiptNo": "",
                "ReceiptDate": "2016-08-29T10:27:20.6786992+07:00",
                "ReceiptFile": ""
            }, {
                "PeriodID": 2,
                "ProjectID": "4",
                "PeriodOrder": 2,
                "PeriodDesc": "SIT",
                "PeriodPercent": 50,
                "PeriodAmout": 149800,
                "PeriodStatus": "ready",
                "InvoiceNo": "",
                "InvoiceDate": "2016-08-29T10:27:20.6786992+07:00",
                "InvoiceFile": "",
                "AppNo": "",
                "AppDate": "2016-08-29T10:27:20.6786992+07:00",
                "AppFile": "",
                "ReceiptNo": "",
                "ReceiptDate": "2016-08-29T10:27:20.6786992+07:00",
                "ReceiptFile": ""
            }],
            "QuotationInfo": {
                "ProjectID": "4",
                "QuotationNo": "",
                "QuotationDate": "2016-08-29T10:27:20.6786992+07:00",
                "QuotationFile": ""
            },
            "PurchaseInfo": {
                "ProjectID": "4",
                "PurchaseNo": "",
                "PurchaseDate": "2016-08-29T10:27:20.6786992+07:00",
                "PurchaseFile": "",
                "DrillDate": "2016-08-29T10:27:20.6786992+07:00"
            },
            "CostInfo": [{
                "CostID": 1,
                "ProjectID": "4",
                "EmpID": "12",
                "CostEmp": "สรายุทธ กังสรานุวัตถ์",
                "CostDate": "2016-08-29T10:27:20.6786992+07:00",
                "CostDesc": "ค่าน้ำมัน",
                "CostAmount": 700,
                "CostFile": "",
                "IsTax": false,
                "CostName": "",
                "CostNoTax": "",
                "CostAdd": ""
            }],
            "TaskInfo": [{
                "TaskID": 1,
                "ProjectID": "4",
                "EmpID": "12",
                "TaskEmp": "สรายุทธ กังสรานุวัตถ์",
                "Duration": 3,
                "StartDate": "2016-08-29T10:27:20.6797001+07:00",
                "FinishDate": "2016-09-29T10:27:20.6797001+07:00",
                "IsStatus": true,
                "Row": "",
                "InPeriod": "",
                "Ratio": 35,
                "Issue": ""
            }],
            "DocumentInfo": [{
                "DocID": 1,
                "ProjectID": "4",
                "DocName": "PPS1",
                "DocFile": ""
            }, {
                "DocID": 2,
                "ProjectID": "4",
                "DocName": "PPS2",
                "DocFile": ""
            }]
        }, {
            "ProjectID": "5",
            "ProjectCode": "Project TTSM",
            "ProjectName": "Trouble Ticket System Mobility",
            "ProjectStatus": "Pass",
            "ProjectDuration": 60,
            "ScopeInfo": [{
                "ScopeID": 1,
                "ProjectID": "4",
                "Topic": "เพิ่ม Field แสดง Product, Dealer ที่หน้า Monitoring",
                "Detail": "เพิ่ม Field ใน db แล้วแสดงบนหน้าจอ"
            }, {
                "ScopeID": 2,
                "ProjectID": "4",
                "Topic": "Upload Lead Management",
                "Detail": "สามารถ Upload และนำเข้าข้มูลผ่าน excel ได้"
            }],
            "CustomerInfo": {
                "ProjectID": "4",
                "CompanyID": "3",
                "CompanyName": "บริษัท อ๊อปติมัส ซอฟต์ จำกัด (สำนักงานใหญ่)",
                "CompanyAddress": "127/31 อาคารปัญจธานี ทาวเวอร์ ชั้น 26 ถนนนนทรี แขวงช่องนนทรี เขตยานนาวา กรุงเทพมหานคร 10120",
                "CustomerDetailInfo": [{
                    "CustomerID": 1,
                    "CompanyID": "3",
                    "CustomerName": "คุณศรราม เทพพิทักษ์",
                    "CustomerTel": "0956601234",
                    "CustomerPosition": "Project Manager",
                    "StateInfo": {
                        "CustomerID": 1,
                        "StateID": "3",
                        "StateName": "Project Manager",
                        "StateValue": "3"
                    }
                }, {
                    "CustomerID": 2,
                    "CompanyID": "3",
                    "CustomerName": "คุณสมร",
                    "CustomerTel": "0892349999",
                    "CustomerPosition": "ฝ่ายบัญชี",
                    "StateInfo": {
                        "CustomerID": 1,
                        "StateID": "4",
                        "StateName": "Accounting",
                        "StateValue": "4"
                    }
                }]
            },
            "BudgetInfo": {
                "ProjectID": "4",
                "Price": 280000,
                "Budget": 90000,
                "IsIncludeVat": false
            },
            "PeriodInfo": [{
                "PeriodID": 1,
                "ProjectID": "4",
                "PeriodOrder": 1,
                "PeriodDesc": "SIT",
                "PeriodPercent": 50,
                "PeriodAmout": 149800,
                "PeriodStatus": "success",
                "InvoiceNo": "",
                "InvoiceDate": "2016-08-29T10:27:20.6786992+07:00",
                "InvoiceFile": "",
                "AppNo": "",
                "AppDate": "2016-08-29T10:27:20.6786992+07:00",
                "AppFile": "",
                "ReceiptNo": "",
                "ReceiptDate": "2016-08-29T10:27:20.6786992+07:00",
                "ReceiptFile": ""
            }, {
                "PeriodID": 2,
                "ProjectID": "4",
                "PeriodOrder": 2,
                "PeriodDesc": "SIT",
                "PeriodPercent": 50,
                "PeriodAmout": 149800,
                "PeriodStatus": "ready",
                "InvoiceNo": "",
                "InvoiceDate": "2016-08-29T10:27:20.6786992+07:00",
                "InvoiceFile": "",
                "AppNo": "",
                "AppDate": "2016-08-29T10:27:20.6786992+07:00",
                "AppFile": "",
                "ReceiptNo": "",
                "ReceiptDate": "2016-08-29T10:27:20.6786992+07:00",
                "ReceiptFile": ""
            }],
            "QuotationInfo": {
                "ProjectID": "4",
                "QuotationNo": "",
                "QuotationDate": "2016-08-29T10:27:20.6786992+07:00",
                "QuotationFile": ""
            },
            "PurchaseInfo": {
                "ProjectID": "4",
                "PurchaseNo": "",
                "PurchaseDate": "2016-08-29T10:27:20.6786992+07:00",
                "PurchaseFile": "",
                "DrillDate": "2016-08-29T10:27:20.6786992+07:00"
            },
            "CostInfo": [{
                "CostID": 1,
                "ProjectID": "4",
                "EmpID": "12",
                "CostEmp": "สรายุทธ กังสรานุวัตถ์",
                "CostDate": "2016-08-29T10:27:20.6786992+07:00",
                "CostDesc": "ค่าน้ำมัน",
                "CostAmount": 700,
                "CostFile": "",
                "IsTax": false,
                "CostName": "",
                "CostNoTax": "",
                "CostAdd": ""
            }],
            "TaskInfo": [{
                "TaskID": 1,
                "ProjectID": "4",
                "EmpID": "12",
                "TaskEmp": "สรายุทธ กังสรานุวัตถ์",
                "Duration": 3,
                "StartDate": "2016-08-29T10:27:20.6797001+07:00",
                "FinishDate": "2016-09-29T10:27:20.6797001+07:00",
                "IsStatus": true,
                "Row": "",
                "InPeriod": "",
                "Ratio": 35,
                "Issue": ""
            }],
            "DocumentInfo": [{
                "DocID": 1,
                "ProjectID": "4",
                "DocName": "PPS1",
                "DocFile": ""
            }, {
                "DocID": 2,
                "ProjectID": "4",
                "DocName": "PPS2",
                "DocFile": ""
            }]
        }]

        vm.doughnutChartTime = {
            labels: ['UTime', 'Time'],
            data: [40, 100],
            colors: ['#DCDCDC']
        };
        vm.doughnutChart = {
            labels: ['UTime', 'Time'],
            data: [40, 100],
            colors: ['#DCDCDC']
        };

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
        vm.selectedProject = vm.projectData[0];
        vm.selectedMailShowDetails = false;

        // Methods
        vm.checkAll = checkAll;
        vm.closeReadPane = closeReadPane;
        vm.composeDialog = composeDialog;
        vm.EstimateDialog = EstimateDialog;
        vm.UploadpoDialog = UploadpoDialog
        vm.AddCostDialog = AddCostDialog
        vm.UploadAppointment = UploadAppointment
        vm.isChecked = isChecked;
        vm.replyDialog = replyDialog;
        vm.selectProject = selectProject;
        vm.toggleStarred = toggleStarred;
        vm.toggleCheck = toggleCheck;

        $scope.financeStatus = true;
        $scope.documentStatus = false;
        $scope.scopeOfWorkStatus = false;
        //////////


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
        function selectProject(project) {
            vm.selectedProject = project;

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
        function toggleCheck(mail, event) {
            if (event) {
                event.stopPropagation();
            }

            var idx = vm.checked.indexOf(mail);

            if (idx > -1) {
                vm.checked.splice(idx, 1);
            } else {
                vm.checked.push(mail);
            }
        }

        /**
         * Return checked status of the mail
         *
         * @param mail
         * @returns {boolean}
         */
        function isChecked(mail) {
            return vm.checked.indexOf(mail) > -1;
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

        /**
         * Open compose dialog
         *
         * @param ev
         */
        function composeDialog(ev) {
            $mdDialog.show({
                controller: 'NewProjectController',
                controllerAs: 'vm',
                locals: {
                    selectedProject: undefined
                },
                templateUrl: 'app/main/project/dialogs/new_project/new_project.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }


        function EstimateDialog(ev) {
            $mdDialog.show({
                controller: 'EstimateController',
                controllerAs: 'vm',
                locals: {
                    selectedProject: undefined
                },
                templateUrl: 'app/main/project/dialogs/estimate/estimate.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }


        function UploadpoDialog(ev) {
            $mdDialog.show({
                controller: 'Upload_PO_Controller',
                controllerAs: 'vm',
                locals: {
                    selectedProject: undefined
                },
                templateUrl: 'app/main/project/dialogs/upload_po/upload_po.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }


        function AddCostDialog(ev) {
            $mdDialog.show({
                controller: 'AddcostController',
                controllerAs: 'vm',
                locals: {
                    selectedProject: undefined
                },
                templateUrl: 'app/main/project/dialogs/addcost/addcost.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }



        function UploadAppointment(ev) {
            $mdDialog.show({
                controller: 'AppointmentController',
                controllerAs: 'vm',
                locals: {
                    selectedProject: undefined
                },
                templateUrl: 'app/main/project/dialogs/appointment/appointment.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }

        /**
         * Open reply dialog
         *
         * @param ev
         */
        function replyDialog(ev) {
            $mdDialog.show({
                controller: 'NewProjectController',
                controllerAs: 'vm',
                locals: {
                    selectedProject: vm.selectedselectedProject
                },
                templateUrl: 'app/main/project/dialogs/new_project/new_project.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId) {
            $mdSidenav(sidenavId).toggle();
        }


        // call Service

        projectService.getProject().then(function(data) {
            console.log('Call Service Success ' + JSON.stringify(data.records))
        }, function(err) {
            console.log('Call Service Fail');
        })


        // call Service end

        // call service me
        projectService.getMe().then(function(data) {
                console.log('Call Service Success ' + JSON.stringify(data))
            }, function(err) {
                console.log('Call Service Fail');
            })
            // end call service me


    }
})();
