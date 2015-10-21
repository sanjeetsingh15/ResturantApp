angular.module('starter.controllers', [])

.directive('scrollWatch', function($rootScope, ionicMaterialMotion, ionicMaterialInk, $timeout) { 
   // $rootScope.something = false; //console.log($rootScope);
  return function(scope, elem, attr) {
    var start = 0;
    var threshold = 2;
    var abc = document.getElementById("MyHead");
    
    elem.bind('scroll', function(e) { console.log(e ); console.log(e.detail.scrollTop);
    e.bubbles = true; //console.log($rootScope);
    console.log(e.detail.scrollTop); console.log(threshold); //console.log(threshold)
      if(e.detail.scrollTop - start > threshold) { console.log("e ");
      
      // Set Motion
    $timeout(function() {
        $rootScope.something = true;
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
    
        
        $rootScope.slideHeader = true;
        
      } else { console.log("f");
        $rootScope.slideHeader = false;
        $rootScope.something = false;
      }
      if ($rootScope.slideHeaderPrevious >= e.detail.scrollTop - start) {
        //$rootScope.slideHeader = false; console.log("ff ");
        //$rootScope.something = false;
      }
      $rootScope.slideHeaderPrevious = e.detail.scrollTop - start;
      $rootScope.$apply();
    });
  };
})

.controller('PaneCtrl', function($scope, $ionicScrollDelegate, $rootScope) {
  $rootScope.MyHead = false;
  $rootScope.something = false;
  $rootScope.slideHeaderPrevious = 0;
})

.controller('beaconCtrl', function($scope, $ionicScrollDelegate, $rootScope) {
  console.log("huck");
})

.controller('CartCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicHistory) {
    
    var myBeaAdd = angular.element( document.querySelector( '#beaconMsg' ) );
    myBeaNoti = 1;
    myBeaNoti2 = 2;
	var element = '';
	  
    myBeaAdd.html(element);
                
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('CategoryCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicHistory) {
    
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    
    $timeout(function() {
        ionicMaterialMotion.blinds({
            selector: '.animate-blinds .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
    
})

.controller('ListCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicHistory) {
    
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    
    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('DetailsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicHistory, $rootScope) {
    
    $rootScope.slideHeader = false;
    $rootScope.slideHeaderPrevious = 0;
  
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
        
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
    
    $scope.quantity = 1;
    $scope.myquantity = function(type){
       var quantity = 1;
        if(type == 1){
            quantity = $scope.quantity + 1;
        }
        
        if(type == 0){
            quantity = $scope.quantity - 1;
        }
        
        if(quantity < 1){
            quantity = 1;
        }
        return $scope.quantity = quantity;
    }
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
