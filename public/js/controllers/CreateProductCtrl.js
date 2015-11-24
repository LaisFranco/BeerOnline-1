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
			console.log(products);
			var length = products.length;
			console.log(length);
			return products[length][0];
			//console.log($scope.products);
		});
	};
	
	var setForm = function () {
		var form = document.getElementById('form');
		console.log(form);
		form.addEventListener('submit', function(event) {
			addGuest(form);
			//it is to avoid form submition
			event.preventDefault();
		});
		//GuestController.setFocus();
	};

	var addGuest = function(form) {
		var id = showList();
		console.log(id);
		var product = {
			id: id,
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
