(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('ProjectController', ProjectController);

    /** @ngInject */
    function ProjectController($scope, $rootScope, $document, $timeout, $mdDialog, $mdMedia, $mdSidenav, projectService) {
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
            // vm.projectData = [{
            //     "ProjectID": "3",
            //     "ProjectCode": "Project COA",
            //     "ProjectName": "Corporate Online Approve System",
            //     "ProjectStatus": "Play",
            //     "ProjectDuration": 90,
            //     "ScopeInfo": [{
            //         "ScopeID": 1,
            //         "ProjectID": "3",
            //         "Topic": "Ranking Search",
            //         "Detail": "สามารถแสดงข้อมูล ranking"
            //     }, {
            //         "ScopeID": 2,
            //         "ProjectID": "3",
            //         "Topic": "Ranking Management",
            //         "Detail": "สามารถแก้ไขชื่อลำดับและวันที่ข้ามอย่างเดียวในลำดับแรกและลำดับสุดท้าย"
            //     }],
            //     "CustomerInfo": {
            //         "ProjectID": "3",
            //         "CompanyID": "3",
            //         "CompanyName": "บริษัท อ๊อปติมัส ซอฟต์ จำกัด (สำนักงานใหญ่)",
            //         "CompanyAddress": "127/31 อาคารปัญจธานี ทาวเวอร์ ชั้น 26 ถนนนนทรี แขวงช่องนนทรี เขตยานนาวา กรุงเทพมหานคร 10120",
            //         "CustomerDetailInfo": [{
            //             "CustomerID": 1,
            //             "CompanyID": "3",
            //             "CustomerName": "คุณสมชาย ใจดี",
            //             "CustomerTel": "0956601234",
            //             "CustomerPosition": "Project Manager",
            //             "StateInfo": {
            //                 "CustomerID": 1,
            //                 "StateID": "3",
            //                 "StateName": "Project Manager",
            //                 "StateValue": "3"
            //             }
            //         }, {
            //             "CustomerID": 2,
            //             "CompanyID": "3",
            //             "CustomerName": "คุณสมร",
            //             "CustomerTel": "0892349999",
            //             "CustomerPosition": "ฝ่ายบัญชี",
            //             "StateInfo": {
            //                 "CustomerID": 1,
            //                 "StateID": "4",
            //                 "StateName": "Accounting",
            //                 "StateValue": "4"
            //             }
            //         }]
            //     },
            //     "BudgetInfo": {
            //         "ProjectID": "3",
            //         "Price": 210000,
            //         "Budget": 60000,
            //         "IsIncludeVat": false
            //     },
            //     "PeriodInfo": [{
            //         "PeriodID": 1,
            //         "ProjectID": "3",
            //         "PeriodOrder": 1,
            //         "PeriodDesc": "SIT",
            //         "PeriodPercent": 100,
            //         "PeriodAmout": 224700,
            //         "PeriodStatus": "wait",
            //         "InvoiceNo": "",
            //         "InvoiceDate": "",
            //         "InvoiceFile": "",
            //         "AppNo": "",
            //         "AppDate": "",
            //         "AppFile": "",
            //         "ReceiptNo": "",
            //         "ReceiptDate": "",
            //         "ReceiptFile": ""
            //     }],
            //     "QuotationInfo": {
            //         "ProjectID": "3",
            //         "QuotationNo": "",
            //         "QuotationDate": "",
            //         "QuotationFile": ""
            //     },
            //     "PurchaseInfo": {
            //         "ProjectID": "3",
            //         "PurchaseNo": "",
            //         "PurchaseDate": "",
            //         "PurchaseFile": "",
            //         "DrillDate": ""
            //     },
            //     "CostInfo": [{
            //         "CostID": 1,
            //         "ProjectID": "3",
            //         "EmpID": "11",
            //         "CostEmp": "ณัฐกฤษตรา พุ่มไสว",
            //         "CostDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "CostDesc": "ค่าน้ำมัน",
            //         "CostAmount": 500,
            //         "CostFile": "",
            //         "IsTax": false,
            //         "CostName": "",
            //         "CostNoTax": "",
            //         "CostAdd": ""
            //     }, {
            //         "CostID": 1,
            //         "ProjectID": "3",
            //         "EmpID": "11",
            //         "CostEmp": "ณัฐกฤษตรา พุ่มไสว",
            //         "CostDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "CostDesc": "ค่าทางด่วน",
            //         "CostAmount": 220,
            //         "CostFile": "",
            //         "IsTax": false,
            //         "CostName": "",
            //         "CostNoTax": "",
            //         "CostAdd": ""
            //     }],
            //     "TaskInfo": [{
            //         "TaskID": 1,
            //         "ProjectID": "3",
            //         "EmpID": "11",
            //         "TaskEmp": "ณัฐกฤษตรา พุ่มไสว",
            //         "Duration": 5,
            //         "StartDate": "2016-08-29T10:27:20.6797001+07:00",
            //         "FinishDate": "2016-09-29T10:27:20.6797001+07:00",
            //         "IsStatus": false,
            //         "Row": "",
            //         "InPeriod": "",
            //         "Ratio": 20,
            //         "Issue": ""
            //     }],
            //     "DocumentInfo": [{
            //         "DocID": 1,
            //         "ProjectID": "sample string 2",
            //         "DocName": "sample string 3",
            //         "DocFile": "sample string 4",
            //         "ObjectState": 0,
            //         "Created": "2016-08-29T10:27:20.680701+07:00",
            //         "CreatedBy": "sample string 5",
            //         "Updated": "2016-08-29T10:27:20.680701+07:00",
            //         "UpdatedBy": "sample string 6"
            //     }, {
            //         "DocID": 1,
            //         "ProjectID": "sample string 2",
            //         "DocName": "sample string 3",
            //         "DocFile": "sample string 4",
            //         "ObjectState": 0,
            //         "Created": "2016-08-29T10:27:20.680701+07:00",
            //         "CreatedBy": "sample string 5",
            //         "Updated": "2016-08-29T10:27:20.680701+07:00",
            //         "UpdatedBy": "sample string 6"
            //     }]
            // }, {
            //     "ProjectID": "4",
            //     "ProjectCode": "Project TTSM",
            //     "ProjectName": "Trouble Ticket System Mobility",
            //     "ProjectStatus": "Pass",
            //     "ProjectDuration": 60,
            //     "ScopeInfo": [{
            //         "ScopeID": 1,
            //         "ProjectID": "4",
            //         "Topic": "เพิ่ม Field แสดง Product, Dealer ที่หน้า Monitoring",
            //         "Detail": "เพิ่ม Field ใน db แล้วแสดงบนหน้าจอ"
            //     }, {
            //         "ScopeID": 2,
            //         "ProjectID": "4",
            //         "Topic": "Upload Lead Management",
            //         "Detail": "สามารถ Upload และนำเข้าข้อมูลผ่าน excel ได้"
            //     }],
            //     "CustomerInfo": {
            //         "ProjectID": "4",
            //         "CompanyID": "3",
            //         "CompanyName": "บริษัท อ๊อปติมัส ซอฟต์ จำกัด (สำนักงานใหญ่)",
            //         "CompanyAddress": "127/31 อาคารปัญจธานี ทาวเวอร์ ชั้น 26 ถนนนนทรี แขวงช่องนนทรี เขตยานนาวา กรุงเทพมหานคร 10120",
            //         "CustomerDetailInfo": [{
            //             "CustomerID": 1,
            //             "CompanyID": "3",
            //             "CustomerName": "คุณศรราม เทพพิทักษ์",
            //             "CustomerTel": "0956601234",
            //             "CustomerPosition": "Project Manager",
            //             "StateInfo": {
            //                 "CustomerID": 1,
            //                 "StateID": "3",
            //                 "StateName": "Project Manager",
            //                 "StateValue": "3"
            //             }
            //         }, {
            //             "CustomerID": 2,
            //             "CompanyID": "3",
            //             "CustomerName": "คุณสมร",
            //             "CustomerTel": "0892349999",
            //             "CustomerPosition": "ฝ่ายบัญชี",
            //             "StateInfo": {
            //                 "CustomerID": 1,
            //                 "StateID": "4",
            //                 "StateName": "Accounting",
            //                 "StateValue": "4"
            //             }
            //         }]
            //     },
            //     "BudgetInfo": {
            //         "ProjectID": "4",
            //         "Price": 280000,
            //         "Budget": 90000,
            //         "IsIncludeVat": false
            //     },
            //     "PeriodInfo": [{
            //         "PeriodID": 1,
            //         "ProjectID": "4",
            //         "PeriodOrder": 1,
            //         "PeriodDesc": "SRS",
            //         "PeriodPercent": 50,
            //         "PeriodAmout": 149800,
            //         "PeriodStatus": "success",
            //         "InvoiceNo": "",
            //         "InvoiceDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "InvoiceFile": "",
            //         "AppNo": "",
            //         "AppDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "AppFile": "",
            //         "ReceiptNo": "",
            //         "ReceiptDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "ReceiptFile": ""
            //     }, {
            //         "PeriodID": 2,
            //         "ProjectID": "4",
            //         "PeriodOrder": 2,
            //         "PeriodDesc": "SIT",
            //         "PeriodPercent": 50,
            //         "PeriodAmout": 149800,
            //         "PeriodStatus": "ready",
            //         "InvoiceNo": "",
            //         "InvoiceDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "InvoiceFile": "",
            //         "AppNo": "",
            //         "AppDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "AppFile": "",
            //         "ReceiptNo": "",
            //         "ReceiptDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "ReceiptFile": ""
            //     }],
            //     "QuotationInfo": {
            //         "ProjectID": "4",
            //         "QuotationNo": "",
            //         "QuotationDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "QuotationFile": ""
            //     },
            //     "PurchaseInfo": {
            //         "ProjectID": "4",
            //         "PurchaseNo": "",
            //         "PurchaseDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "PurchaseFile": "",
            //         "DrillDate": "2016-08-29T10:27:20.6786992+07:00"
            //     },
            //     "CostInfo": [{
            //         "CostID": 1,
            //         "ProjectID": "4",
            //         "EmpID": "12",
            //         "CostEmp": "สรายุทธ กังสรานุวัตถ์",
            //         "CostDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "CostDesc": "ค่าน้ำมัน",
            //         "CostAmount": 700,
            //         "CostFile": "",
            //         "IsTax": false,
            //         "CostName": "",
            //         "CostNoTax": "",
            //         "CostAdd": ""
            //     }],
            //     "TaskInfo": [{
            //         "TaskID": 1,
            //         "ProjectID": "4",
            //         "EmpID": "12",
            //         "TaskEmp": "สรายุทธ กังสรานุวัตถ์",
            //         "Duration": 3,
            //         "StartDate": "2016-08-29T10:27:20.6797001+07:00",
            //         "FinishDate": "2016-09-29T10:27:20.6797001+07:00",
            //         "IsStatus": true,
            //         "Row": "",
            //         "InPeriod": "",
            //         "Ratio": 35,
            //         "Issue": ""
            //     }],
            //     "DocumentInfo": [{
            //         "DocID": 1,
            //         "ProjectID": "4",
            //         "DocName": "PPS1",
            //         "DocFile": ""
            //     }, {
            //         "DocID": 2,
            //         "ProjectID": "4",
            //         "DocName": "PPS2",
            //         "DocFile": ""
            //     }]
            // }, {
            //     "ProjectID": "5",
            //     "ProjectCode": "Project TTSM2",
            //     "ProjectName": "Trouble Ticket System Mobility",
            //     "ProjectStatus": "Pass",
            //     "ProjectDuration": 60,
            //     "ScopeInfo": [{
            //         "ScopeID": 1,
            //         "ProjectID": "4",
            //         "Topic": "เพิ่ม Field แสดง Product, Dealer ที่หน้า Monitoring",
            //         "Detail": "เพิ่ม Field ใน db แล้วแสดงบนหน้าจอ"
            //     }, {
            //         "ScopeID": 2,
            //         "ProjectID": "4",
            //         "Topic": "Upload Lead Management",
            //         "Detail": "สามารถ Upload และนำเข้าข้มูลผ่าน excel ได้"
            //     }],
            //     "CustomerInfo": {
            //         "ProjectID": "4",
            //         "CompanyID": "3",
            //         "CompanyName": "บริษัท อ๊อปติมัส ซอฟต์ จำกัด (สำนักงานใหญ่)",
            //         "CompanyAddress": "127/31 อาคารปัญจธานี ทาวเวอร์ ชั้น 26 ถนนนนทรี แขวงช่องนนทรี เขตยานนาวา กรุงเทพมหานคร 10120",
            //         "CustomerDetailInfo": [{
            //             "CustomerID": 1,
            //             "CompanyID": "3",
            //             "CustomerName": "คุณศรราม เทพพิทักษ์",
            //             "CustomerTel": "0956601234",
            //             "CustomerPosition": "Project Manager",
            //             "StateInfo": {
            //                 "CustomerID": 1,
            //                 "StateID": "3",
            //                 "StateName": "Project Manager",
            //                 "StateValue": "3"
            //             }
            //         }, {
            //             "CustomerID": 2,
            //             "CompanyID": "3",
            //             "CustomerName": "คุณสมร",
            //             "CustomerTel": "0892349999",
            //             "CustomerPosition": "ฝ่ายบัญชี",
            //             "StateInfo": {
            //                 "CustomerID": 1,
            //                 "StateID": "4",
            //                 "StateName": "Accounting",
            //                 "StateValue": "4"
            //             }
            //         }]
            //     },
            //     "BudgetInfo": {
            //         "ProjectID": "4",
            //         "Price": 280000,
            //         "Budget": 90000,
            //         "IsIncludeVat": false
            //     },
            //     "PeriodInfo": [{
            //         "PeriodID": 1,
            //         "ProjectID": "4",
            //         "PeriodOrder": 1,
            //         "PeriodDesc": "SIT",
            //         "PeriodPercent": 50,
            //         "PeriodAmout": 149800,
            //         "PeriodStatus": "success",
            //         "InvoiceNo": "",
            //         "InvoiceDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "InvoiceFile": "",
            //         "AppNo": "",
            //         "AppDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "AppFile": "",
            //         "ReceiptNo": "",
            //         "ReceiptDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "ReceiptFile": ""
            //     }, {
            //         "PeriodID": 2,
            //         "ProjectID": "4",
            //         "PeriodOrder": 2,
            //         "PeriodDesc": "SIT",
            //         "PeriodPercent": 50,
            //         "PeriodAmout": 149800,
            //         "PeriodStatus": "ready",
            //         "InvoiceNo": "",
            //         "InvoiceDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "InvoiceFile": "",
            //         "AppNo": "",
            //         "AppDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "AppFile": "",
            //         "ReceiptNo": "",
            //         "ReceiptDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "ReceiptFile": ""
            //     }],
            //     "QuotationInfo": {
            //         "ProjectID": "4",
            //         "QuotationNo": "",
            //         "QuotationDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "QuotationFile": ""
            //     },
            //     "PurchaseInfo": {
            //         "ProjectID": "4",
            //         "PurchaseNo": "",
            //         "PurchaseDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "PurchaseFile": "",
            //         "DrillDate": "2016-08-29T10:27:20.6786992+07:00"
            //     },
            //     "CostInfo": [{
            //         "CostID": 1,
            //         "ProjectID": "4",
            //         "EmpID": "12",
            //         "CostEmp": "สรายุทธ กังสรานุวัตถ์",
            //         "CostDate": "2016-08-29T10:27:20.6786992+07:00",
            //         "CostDesc": "ค่าน้ำมัน",
            //         "CostAmount": 700,
            //         "CostFile": "",
            //         "IsTax": false,
            //         "CostName": "",
            //         "CostNoTax": "",
            //         "CostAdd": ""
            //     }],
            //     "TaskInfo": [{
            //         "TaskID": 1,
            //         "ProjectID": "4",
            //         "EmpID": "12",
            //         "TaskEmp": "สรายุทธ กังสรานุวัตถ์",
            //         "Duration": 3,
            //         "StartDate": "2016-08-29T10:27:20.6797001+07:00",
            //         "FinishDate": "2016-09-29T10:27:20.6797001+07:00",
            //         "IsStatus": true,
            //         "Row": "",
            //         "InPeriod": "",
            //         "Ratio": 35,
            //         "Issue": ""
            //     }],
            //     "DocumentInfo": [{
            //         "DocID": 1,
            //         "ProjectID": "4",
            //         "DocName": "PPS1",
            //         "DocFile": ""
            //     }, {
            //         "DocID": 2,
            //         "ProjectID": "4",
            //         "DocName": "PPS2",
            //         "DocFile": ""
            //     }]
            // }]

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
            // console.log(o + ":" + n);
        }, true);
        // call Service
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
            var periodPercentAmount = 0;
            var periodPercentleft = 100;
            $scope.costPercent = 0;
            $scope.useDays = 0;
            $scope.lefts = 0;
            $scope.colorxCart;
            $scope.statusCart;
            projectService.getProject().then(function(data) {
                console.log('Call Service Success ');
                vm.projectData = data;
                vm.selectedProject = vm.projectData[0];
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
                            periodPercentAmount += period.PeriodPercent;
                        }
                    })
                    periodPercentleft = periodPercentleft - periodPercentAmount;
                    $scope.receiptChartBySelectProject = {
                        labels: ['', ''],
                        data: [periodPercentAmount, periodPercentleft],
                        color: $scope.colorx.coloursBad
                    }
                    $scope.progressChartBySelectProject = {
                        labels: ['', ''],
                        data: [periodPercentAmount, periodPercentleft],
                        color: $scope.colorx.coloursDefault
                    }
                }

                $rootScope.chart_progress();

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
                var periodPercentAmount = 0;
                var periodPercentleft = 100;

                if (project.PeriodInfo.length > 0) {

                    angular.forEach(project.PeriodInfo, function(period) {

                        if (period.PeriodStatus == 'PERIOD_RECEIPTED') {
                            periodPercentAmount += period.PeriodPercent;
                        }

                    })
                    periodPercentleft = periodPercentleft - periodPercentAmount;
                    $scope.doughnutChartProcess.push({
                        name: project.ProjectCode,
                        labels: ['', ''],
                        data: [periodPercentAmount, periodPercentleft],
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
                        if(period.PeriodStatus == "PERIOD_RECEIPTED"){
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

        // call Service end

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
        vm.composeDialog = composeDialog;
        vm.EstimateDialog = EstimateDialog;
        vm.UploadpoDialog = UploadpoDialog;
        vm.AddCostDialog = AddCostDialog;
        vm.UploadAppointment = UploadAppointment;
        vm.UploadFiledialog = UploadFiledialog;

        vm.receiptmore = receiptmore;
        vm.costmore = vm.costmore



        vm.isChecked = isChecked;
        vm.replyDialog = replyDialog;
        vm.selectProject = selectProject;
        vm.toggleStarred = toggleStarred;
        vm.toggleCheck = toggleCheck;
        vm.EditDialog = EditDialog;

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

        // $scope.filterStatus = function(status) {
        //     $scope.filterStatus = status;

        // }

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

        };
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
<<<<<<< HEAD

                });

            }

        }

        $scope.taxInvoice = function(period) {

            var periodPercentAmount = 0;
            var periodPercentleft = 100;

            angular.forEach(vm.selectedProject.PeriodInfo, function(periodInfo) {
                if (periodInfo.PeriodOrder == period.PeriodOrder) {

                    periodInfo.PeriodStatus = "PERIOD_RECEIPTED";

                }
            })

            projectService.putProject(vm.selectedProject).then(function() {
                console.log('update period success');
                $rootScope.chart_progress();

                if (vm.selectedProject.PeriodInfo.length > 0) {
                    angular.forEach(vm.selectedProject.PeriodInfo, function(period) {
                        if (period.PeriodStatus == 'PERIOD_RECEIPTED') {
                            periodPercentAmount += period.PeriodPercent;
                            $scope.receiptTotal += period.PeriodAmout;
                        }
                    })
                    periodPercentleft = periodPercentleft - periodPercentAmount;
                    $scope.receiptChartBySelectProject = {
                        labels: ['Price(%)', 'Receipt(%)'],
                        data: [periodPercentAmount, periodPercentleft],
                        color: $scope.colorx.coloursBad
                    }
                    $scope.progressChartBySelectProject = {
                        labels: ['', ''],
                        data: [periodPercentAmount, periodPercentleft],
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
                        data: [periodPercentAmount, periodPercentleft],
                        color: $scope.colorx.coloursDefault
                    }
                }
                // $rootScope.chart_progress();
            }, function(err) {
                console.log('update period fail' + err);
            })

=======

                });

            }

        }

        $scope.taxInvoice = function(period) {

            var periodPercentAmount = 0;
            var periodPercentleft = 100;

            angular.forEach(vm.selectedProject.PeriodInfo, function(periodInfo) {
                if (periodInfo.PeriodOrder == period.PeriodOrder) {

                    periodInfo.PeriodStatus = "PERIOD_RECEIPTED";

                }
            })

            projectService.putProject(vm.selectedProject).then(function() {
                console.log('update period success');
                $rootScope.chart_progress();

                if (vm.selectedProject.PeriodInfo.length > 0) {
                    angular.forEach(vm.selectedProject.PeriodInfo, function(period) {
                        if (period.PeriodStatus == 'PERIOD_RECEIPTED') {
                            periodPercentAmount += period.PeriodPercent;
                            $scope.receiptTotal += period.PeriodAmout;
                        }
                    })
                    periodPercentleft = periodPercentleft - periodPercentAmount;
                    $scope.receiptChartBySelectProject = {
                        labels: ['Price(%)', 'Receipt(%)'],
                        data: [periodPercentAmount, periodPercentleft],
                        color: $scope.colorx.coloursBad
                    }
                    $scope.progressChartBySelectProject = {
                        labels: ['', ''],
                        data: [periodPercentAmount, periodPercentleft],
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
                        data: [periodPercentAmount, periodPercentleft],
                        color: $scope.colorx.coloursDefault
                    }
                }
                // $rootScope.chart_progress();
            }, function(err) {
                console.log('update period fail' + err);
            })

>>>>>>> 84ed52606052533a2226c25ebe521fd309513def
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

            var periodPercentAmount = 0;
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
                        periodPercentAmount += period.PeriodPercent;
                        $scope.receiptTotal += period.PeriodAmout;
                    }
                })
                periodPercentleft = periodPercentleft - periodPercentAmount;
                $scope.receiptChartBySelectProject = {
                    labels: ['Price(%)', 'Receipt(%)'],
                    data: [periodPercentAmount, periodPercentleft],
                    color: $scope.colorx.coloursBad
                }
                $scope.progressChartBySelectProject = {
                    labels: ['', ''],
                    data: [periodPercentAmount, periodPercentleft],
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
                    data: [periodPercentAmount, periodPercentleft],
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
                    projectData: vm.projectData
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
                    selectedProject: vm.selectedProject
                },
                templateUrl: 'app/main/project/dialogs/estimate/estimate.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }



        function UploadFiledialog(ev) {
            $mdDialog.show({
                controller: 'UploadFileController',
                controllerAs: 'vm',
                locals: {
                    selectedProject: undefined
                },
                templateUrl: 'app/main/project/dialogs/UploadFile/uploadFile.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }


function receiptmore(ev,receipt) {
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




function costmore(ev,cost) {
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


$scope.costsMore = function(ev,cost){
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





        function UploadpoDialog(ev) {
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


        function AddCostDialog(ev) {
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















        function EditDialog(ev) {
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



        function UploadAppointment(ev, period) {
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

        // function EditProjectDialog(ev) {
        //     $mdDialog.show({
        //         controller: 'EditProjectController',
        //         controllerAs: 'vm',
        //         locals: {
        //             selectedProject:  vm.projectData
        //         },
        //         templateUrl: 'app/main/project/dialogs/EditProject/EditProject.html',
        //         parent: angular.element($document.body),
        //         targetEvent: ev,
        //         clickOutsideToClose: true
        //     });
        // }

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




    }
})();
