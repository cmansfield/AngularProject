
var myApp = angular.module('myApp', []);

myApp.controller('myCtrl', function($scope, $http) {

    $scope.paging = 10;
    $scope.page = 0;
    $scope.students = [];
    $scope.textEnum = Object.freeze([
        "Name",
        "Start Date",
        "Street",
        "City",
        "State",
        "Zip",
        "Phone",
        "Year",
        "ID"
    ]);
    $scope.isLoading = false;
    $scope.showAddModal = false;


    $scope.loadPage = function(page) {

        $scope.isLoading = true;
        $scope.students = [];

        $http({

            method : "GET",
            url : "https://cs3660-christopherm.c9users.io/api/v1/students.json"
        }).then(function(res) {

            let studentIDs = res.data;

            for (let i = $scope.paging * $scope.page; i < (($scope.paging * ($scope.page + 1) < studentIDs.length) ? $scope.paging * ($scope.page + 1) : studentIDs.length); ++i) {

                let id = studentIDs[i].slice(0,4);      // Remove the '.json' from the id
                //stepProgressBar($scope.paging);

                $http({

                    method : "GET",
                    url : `https://cs3660-christopherm.c9users.io/api/v1/students/${id}.json`
                }).then(function(result) {

                    let value = JSON.parse(result.data);
                    value.id = id;
                    $scope.students.push(value);
                }, function(err) {

                    console.log(`Failed to get student with ID: ${id}`);
                    console.log(err);
                });
            }
        }, function errFunc(err) {

            console.log('Failed to get list from the server');
            console.log(err);
        });

        $scope.pageChange = function(page) {

            $scope.page += page;

            if($scope.page < 0) $scope.page = 0;
            if($scope.students.length < $scope.paging && page > 0) $scope.page -= page;

            $scope.loadPage($scope.page);
        }

        $scope.isLoading = false;
    }


    $scope.loadPage(0);
});