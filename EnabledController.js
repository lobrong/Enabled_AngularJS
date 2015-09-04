var app = angular.module('myApp', []);


app.factory('myService', function($http,$q) 
{

	var clipsalUrl = "http://localhost:8000/greenbook.json";

	var myService = {}; 
  	var clipsal = $q.defer();
	var history = [];
	var current = [];

  	myService.loadData = function() 
  	{
        $http.get(clipsalUrl+"?callback=JSON_CALLBACK")
		.success(function(data) 
		{
          	clipsal.resolve();
          	current = data;
       	});

		return clipsal.promise;
  	}

    myService.getCurrentData = function()
    {
    	return current;
    };

	
	return myService;
});



app.controller('EnabledController', function($scope, myService) 
{
	$scope.history = [];

	myService.loadData().then(function() 
	{
    	$scope.displaydata = myService.getCurrentData();
		$scope.history.push($scope.displaydata);
	});

	$scope.displaydata = myService.getCurrentData();


    function changeSection(section)
    {
    	/* if section undefined, back button press
    	 History keeps a record of currently displayed data at that time
    	 */

    	if(typeof section === 'undefined')
    	{
    		var length = $scope.history.length;
    		if(length == 1)
    		{
    			$scope.displaydata = $scope.history[0];
    		}
    		else
    		{
    			$scope.history.splice(length-1,1);				//Remove current displayed data
    			$scope.displaydata = $scope.history[length-2];
    		}
    	}
    	else
    	{
    		$scope.history.push(section);
	    	$scope.displaydata = section;
    	}
    }
	$scope.changeSection = changeSection;

});



