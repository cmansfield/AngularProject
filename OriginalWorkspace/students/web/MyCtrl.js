/**
 * Created by Chris on 4/3/2017.
 */

var myApp = angular.module('myApp', []);

myApp.controller('myCtrl', function($scope) {
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
});