var app = angular.module('myApp', []);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.controller('EnabledController', function($scope, $http) {

	var clipsalUrl = "http://localhost:8000/greenbook.json";
	var testUrl = "http://localhost:8000/test.json";

	$scope.clipsal = [];

    $http.get(clipsalUrl+"?callback=JSON_CALLBACK")
    .success(function(data) {
    	$scope.clipsal= data;
		//console.log(JSON.stringify(data));    	
    });

    function updateDisplayData1()
    {
    	alert("wah");
    }

	$scope.updateDisplayData = updateDisplayData1;

});