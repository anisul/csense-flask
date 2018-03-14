'use strict';

/* Filters */

angular.module('csenseFlaskFilters', []).filter('uppercase', function() {
    return function(input) {
        return input.toUpperCase();
    }
});