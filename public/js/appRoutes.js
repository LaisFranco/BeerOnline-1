var app = angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		// home page
		.when('/inventory', {
			templateUrl: 'views/inventory.html',
			controller: 'InventoryController'
		})

		.when('/inventory/new-product/', {
			templateUrl: 'views/create-product.html',
			controller: 'CreateProductController'
		})

		.when('/clients', {
			templateUrl: 'views/clients.html',
			controller: 'ClientController'
		})

		.when('/history', {
			templateUrl: 'views/history.html',
			controller: 'HistoryController'	
		});

	$locationProvider.html5Mode(true);

}]);