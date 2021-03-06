'use strict';

angular.module('csenseFlaskServices', ['ngResource'])
    .factory('Post', function($resource) {
        return $resource('/api/post/:postId', {}, {
            query: {
                method: 'GET',
                params: { postId: '' },
                isArray: true
            }
        });
    })
;
