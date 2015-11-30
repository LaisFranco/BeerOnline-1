angular.module('CreateProductCtrl', []).controller('CreateProductController', function($scope) {

});

angular.module('CreateProductCtrl', []).controller('CreateProductController', ['$scope', '$http', 'Product', function($scope, $http, Product) {
    //console.log("Inside InventoryController");
    var init = function () {
		setForm();
	};

	var showList = function () {
		//console.log("Showing list");

		Product.getProducts(function(list) {
			var products = list;
			//console.log(products);
			var length = products.length;
			console.log(length);
			$scope.length = length;
			//console.log($scope.products);
		});
	};
	
	var setForm = function () {
		var form = document.getElementById('form');
		form.addEventListener('submit', function(event) {
			addGuest(form);
			event.preventDefault();
		});
	};

	var addGuest = function(form) {
		console.log("My id is gonna be: " + $scope.length);
		var product = {
			id: $scope.length,
			name: form.name.value,
			brand: form.brand.value,
			weight: form.weight.value,
			qty: form.qty.value
		};
		Product.add(product, function(addedProduct) {
		});
	};
    init();
}]);
