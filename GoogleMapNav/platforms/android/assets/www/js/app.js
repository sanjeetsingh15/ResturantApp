// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
    
  .state('app.category', {
    url: '/category',
    views: {
      'menuContent': {
        templateUrl: 'templates/category.html',
        controller: 'CategoryCtrl'
      }
    }
  })
  
  .state('app.map', {
    url: '/map',
    views: {
      'menuContent': {
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl'
      }
    }
  })
  
  .state('app.setting', {
    url: '/setting',
    views: {
      'menuContent': {
        templateUrl: 'templates/setting.html',
        controller: 'SettingCtrl'
      }
    }
  })

  .state('app.map2', {
    url: '/map2',
    views: {
      'menuContent': {
        templateUrl: 'templates/map2.html',
        controller: 'Map2Ctrl'
      }
    }
  })
  
  .state('app.enterofferone', {
    url: '/enterofferone',
    views: {
      'menuContent': {
        templateUrl: 'templates/enter_offer1.html',
        controller: 'EnterOfferOneCtrl'
      }
    }
  })
  
  .state('app.lists', {
    url: '/category/:categoryId',
    views: {
      'menuContent': {
        templateUrl: 'templates/lists.html',
        controller: 'ListCtrl'
      }
    }
  })
  
  .state('app.details', {
    url: '/category/:listId',
    views: {
      'menuContent': {
        templateUrl: 'templates/details.html',
        controller: 'DetailsCtrl'
      }
    }
  })
  
  .state('app.pane', {
    url: '/pane',
    views: {
      'menuContent': {
        templateUrl: 'templates/pane.html',
        controller: 'PaneCtrl'
      }
    }
  })
  
  .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/signup.html',
        controller: 'SignUpCtrl'
      }
    }
  })
  
  .state('app.cart', {
    url: '/cart',
    views: {
      'menuContent': {
        templateUrl: 'templates/cart.html',
        controller: 'CartCtrl'
      }
    }
  })
  
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/category');
});
