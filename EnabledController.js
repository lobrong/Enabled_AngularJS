var app = angular.module('myApp', []);


app.factory('myService', function($http,$q) {

	var clipsalUrl = "http://localhost:8000/greenbook.json";
	var testUrl = "http://localhost:8000/test.json";

	var myService = {}; 
  	var clipsal = $q.defer();
	var history = [];
	var current = [];

	myService.async = function() {
		if(!clipsal)
		{
		    $http.get('test.json')
		    .success(function (d) {
		      data = d;
		      console.log(d);
		      deffered.resolve();
		    });
		    return deffered.promise;
		}
		else
		{
			return current;
		}
  };

	  	myService.loadData = function() 
	  	{
	        $http.get(clipsalUrl+"?callback=JSON_CALLBACK")
			.success(function(data) 
			{
				//console.log(JSON.stringify(data));
	          // The then function here is an opportunity to modify the response
	          //console.log(data);
	          clipsal.resolve();
	          current = data;
	       	});

		
			return clipsal.promise;
	  	}
    

	    myService.updateData = function(msg) 
	    {
	    	console.log(msg);
	    	var newdata = [];
	    	//console.log(JSON.stringify($scope.clipsal));
	    	//data = displaydata.sections;

	    	for( i in current.sections)
	    	{
	    		//console.log(JSON.stringify(i));
	    		var test = current.sections[i];
	    		if(test.hasOwnProperty("name"))
	    		{
	    			//console.log("has a name");
	    			if(test["name"] == msg)
	    			{
	    				history.push(i);
	    				newdata.push(test);
	    			}
	    		}
	    	}
	    	console.log("NEW DATA");
	    	console.log(JSON.stringify(newdata));
	    	console.log(history);
	    	// Remove all old elements
	    	// Replace with new ones?
	    	current = newdata;
	    	return current;
	    };

	    myService.getCurrentData = function()
	    {
	    	return current;
	    };

	
	return myService;
});

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);



app.controller('EnabledController', function($scope, myService) {

	$scope.history = [];

	myService.loadData().then(function() {
    	$scope.displaydata = myService.getCurrentData();
		$scope.history.push($scope.displaydata);
	});

	$scope.displaydata = myService.getCurrentData();


    function changeSection(section)
    {
    	if(typeof section === 'undefined')
    	{
    		var length = $scope.history.length;
    		if(length == 1)
    		{
    			$scope.displaydata = $scope.history[0];
    		}
    		else
    		{
    			$scope.history.splice(length-1,1);
    			$scope.displaydata = $scope.history[length-2];
    		}
    	}
    	else
    	{
    		$scope.history.push(section);
	    	$scope.displaydata = section;
	    	console.log($scope.displaydata);
    	}
    }
	$scope.changeSection = changeSection;

});



