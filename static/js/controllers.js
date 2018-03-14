'use strict';

/* Controllers */

function IndexController($scope) {
    $scope.priceSlider = {
        value: 20,
        options: {
            floor: 0,
            ceil: 100,
            step: 10,
            showTicks: true
        }
    }
}

function AboutController($scope) {

}


/*
function PostListController($scope, Post) {
    var postsQuery = Post.get({}, function(posts) {
        $scope.posts = posts.objects;
    });
}

function PostDetailController($scope, $routeParams, Post) {
    var postQuery = Post.get({ postId: $routeParams.postId }, function(post) {
        $scope.post = post;
    });
}*/
