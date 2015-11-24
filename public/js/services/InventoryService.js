angular.module('InventoryService', ['ngResource']).factory('Product', ['$http', function($http, $resource) {

	product: [];
	
	list: [],

	this.getProducts = function(callback) {
		$.ajax({
			type: 'GET',
			url: '/api/products',
			dataType: 'json',
			success: function(list) {
				callback(list);
			}
		});
	},

	this.add = function(product, callback) {
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: 'api/products',
			data: JSON.stringify(product),
			success: function(addedProduct) {
				console.log('Guest created!');
				callback(addedProduct);
				//window.open("/inventory","_self")
			},
			error: function() {
				console.log('Error to add product ' + product.name);
			}
		});
	},

	this.getProduct = function(id, callback) {
		$.ajax({
			type: 'GET',
			url: '/api/products/' + id,
			dataType: 'json',
			success: function(product) {
				//console.log("sucess updating");
				callback(product);
			}
		});
	},

	this.remove = function(id, callback) {
		$.ajax({
			type: 'DELETE',
			url: 'api/products/' + id,
			success: function(response) {
				console.log('Guest deleted!');
				callback(true);
			},
			error: function(jqXHR) {
				console.log('Error to delete guest with id ' + id);
				callback(false);
			}
		});
	}
	return this;
}]);