

let app = angular.module('app', [])


app.directive('studentModal', function() {
    return {
        restrict: 'E',
        templateUrl: 'studentModal.html'
    };
});

app.controller('ctrl', function($scope, $http) {

    $scope.paging = 10;
    $scope.page = 0;
    $scope.students = [];
    $scope.templateStudent = {
        "fname": "",
        "lname": "",
        "startDate": "",
        "street": "",
        "city": "",
        "state": "",
        "zip": "",
        "phone": "",
        "year": 1
    };
    $scope.crntStudent = JSON.parse(JSON.stringify($scope.templateStudent));
    $scope.delStudent = {};
    $scope.fieldEnum = Object.freeze({
        name: 0,
        startDate: 1,
        street: 2,
        city: 3,
        state: 4,
        zip: 5,
        phone: 6,
        year: 7,
        id: 8
    });
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
    $scope.studentYearEnum = Object.freeze([
        "Freshman",
        "Sophomore",
        "Junior",
        "Senior"
    ]);
    $scope.ascending = false;
    $scope.isLoading = false;
    $scope.showEditModal = false;
    $scope.showAddModal = false;
    $scope.showTable = true;


    $scope.loadPage = function(page) {

        $scope.isLoading = true;
        $scope.students = [];

        $http({
            //https://cs3660-christopherm.c9users.io
            method : "GET",
            url : "http://localhost:3000/api/v1/students.json"
        }).then(function(res) {

            let studentIDs = res.data;

            for (let i = $scope.paging * $scope.page; i < (($scope.paging * ($scope.page + 1) < studentIDs.length) ? $scope.paging * ($scope.page + 1) : studentIDs.length); ++i) {

                let id = studentIDs[i].slice(0,4);      // Remove the '.json' from the id
                //stepProgressBar($scope.paging);

                $http({

                    method : "GET",
                    url : `http://localhost:3000/api/v1/students/${id}.json`
                }).then(function(result) {

                    let value = JSON.parse(result.data);
                    value.id = id;
                    $scope.students.push(value);
                }, function(err) {

                    console.log(`Failed to get student with ID: ${id}`);
                });
            }
        }, function errFunc(err) {

            console.log('Failed to get list from the server');
        });

        $scope.pageChange = function(page) {

            $scope.page += page;

            if($scope.page < 0) $scope.page = 0;
            if($scope.students.length < $scope.paging && page > 0) $scope.page -= page;

            $scope.loadPage($scope.page);
        };

        $scope.editStudent = function(id) {

            $scope.students.forEach((student) =>  {
                if(student.id === id) { $scope.crntStudent = JSON.parse(JSON.stringify(student)); }
            });

            $scope.showEditModal = true;
        };

        $scope.confirmChanges = function() {

            $http({

                method : "PUT",
                url : `http://localhost:3000/api/v1/students/${$scope.crntStudent.id}.json`,
                data: JSON.stringify($scope.crntStudent),
                contentType: 'application/json'
            }).then(function() { alert('Successfully updated');
            }, function(err) {

                console.log(`Failed to update student with ID: ${$scope.crntStudent.id}`);
            });

            $scope.showEditModal = false;

            $scope.loadPage($scope.page);
        };

        $scope.newStudent = function() {

            $scope.crntStudent = JSON.parse(JSON.stringify($scope.templateStudent))

            $scope.showAddModal = true;
        };

        $scope.confirmAdd = function() {

            $http({

                method : "POST",
                url : `http://localhost:3000/api/v1/students`,
                data: JSON.stringify($scope.crntStudent),
                contentType: 'application/json'
            }).then(function() { alert(`Successfully created student ${$scope.crntStudent.fname} ${$scope.crntStudent.lname}`);
            }, function(err) {

                console.log(`Failed to create new student ${$scope.crntStudent.fname} ${$scope.crntStudent.lname}`);
            });

            $scope.showAddModal = false;

            $scope.loadPage($scope.page);
        };

        $scope.isLoading = false;
    };

    $scope.deleteStudent = function(id) {

        $scope.students.forEach((student) =>  {
            if(student.id === id) { $scope.delStudent = JSON.parse(JSON.stringify(student)); }
        });

        $http({

            method : "DELETE",
            url : `http://localhost:3000/api/v1/students/${$scope.delStudent.id}.json`
        }).then(function() {

            $scope.loadPage($scope.page);
        }, function(err) {

            console.log(`Failed to delete student with ID: ${id}`);
        });
    };

    $scope.restoreStudent = function() {

        if(angular.equals($scope.delStudent, {})) return;

        console.log($scope.delStudent);

        $http({

            method : "POST",
            url : `http://localhost:3000/api/v1/students`,
            data: JSON.stringify($scope.delStudent),
            contentType: 'application/json'
        }).then(function() {

            $scope.delStudent = {};
            $scope.loadPage($scope.page);
        }, function(err) {

            console.log(`Failed to restore student with ID: ${$scope.delStudent.id}`);
        });
    };

    $scope.sort = function(headerName) {

        let prop = '';
        let sortFunc = function(a, b) {

            if(a[prop].toLowerCase() < b[prop].toLowerCase()) return -1;
            if(a[prop].toLowerCase() > b[prop].toLowerCase()) return 1;
            return 0;
        };

        if($scope.ascending) {

            sortFunc = function(a, b) {

                if(a[prop].toLowerCase() > b[prop].toLowerCase()) return -1;
                if(a[prop].toLowerCase() < b[prop].toLowerCase()) return 1;
                return 0;
            };

            $scope.ascending = false;
        }
        else { $scope.ascending = true; }

        switch(headerName) {
            case $scope.textEnum[$scope.fieldEnum.name]:
                prop = 'lname';
                break;
            case $scope.textEnum[$scope.fieldEnum.startDate]:
                prop = 'startDate';
                break;
            case $scope.textEnum[$scope.fieldEnum.city]:
                prop = 'city';
                break;
            case $scope.textEnum[$scope.fieldEnum.state]:
                prop = 'state';
                break;
            case $scope.textEnum[$scope.fieldEnum.zip]:
                prop = 'zip';
                sortFunc = (a,b) => b[prop] - a[prop];
                break;
            case $scope.textEnum[$scope.fieldEnum.year]:
                prop = 'year';
                sortFunc = (a,b) => b[prop] - a[prop];
                break;
            case $scope.textEnum[$scope.fieldEnum.id]:
                prop = 'id';
                break;
            default:
                prop = 'id';
        }

        $scope.students.sort(sortFunc);
    };


    $scope.loadPage(0);
});
