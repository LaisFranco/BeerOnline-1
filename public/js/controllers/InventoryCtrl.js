angular.module('InventoryCtrl', []).controller('InventoryController', function($scope) {

});

angular.module('InventoryCtrl', []).controller('InventoryController', ['$scope', '$http', 'Product', function($scope, $http, Product) {
    //console.log("Inside InventoryController");
    var init = function () {
		showList();
	};
	
	var showList = function () {
		//console.log("Showing list");

		Product.getProducts(function(list) {
			$scope.products = list;
			//console.log($scope.products);
		});
	};
	
	$scope.update = function (product) {
		//console.log("Showing Product");

		Product.getProduct(product._id, function(product) {
			$scope.d = product;
			console.log($scope.d);
		});
	};

	$scope.remove = function(id, name) {
		if(confirm('Are you sure to delete ' + name + '?')) {
			Product.remove(id, function(isDeleted) {
				if(isDeleted) {
					console.log("deleting " + id)
					// $(imgDelete).parents('dl').remove();
				}
			})
		}
	}
    init();
}]);
