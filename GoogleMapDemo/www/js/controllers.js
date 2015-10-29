angular.module('starter.controllers', [])

.controller('Map2Ctrl', function($scope, $ionicLoading, $compile, $stateParams, $ionicActionSheet, $timeout) {
    console.log("map2");
    var map;
    
    var marker1, marker2;
    
    navigator.geolocation.watchPosition(showPosition);
    
    function showPosition(){
            
            navigator.geolocation.getCurrentPosition(function(pos) { console.log("get location");
        
            var mylat = pos.coords.latitude;  console.log(mylat);
            var mylng = pos.coords.longitude; console.log(mylng); 
        

            myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            
            map.setCenter(myLatlng);
                marker.setMap(null);
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                    //map: map,
                    draggable: true,
                    animation: google.maps.Animation.DROP,                
                    title: "My Current Location"
                });
                marker.setMap(map);
                marker.addListener('click', toggleBounce);
            });
        }
        
        var travelMode = localStorage.getItem("travelMode");
        var startlatlng = localStorage.getItem("startlatlng");
        var destlatlng = localStorage.getItem("destlatlng");
        
        marker1 = startlatlng;
        marker2 = destlatlng;
    
        google.maps.event.addListener(marker1, 'position_changed', update);
        google.maps.event.addListener(marker2, 'position_changed', update);
        
        function update() { console.log("in update funciton");
          var path = [marker_point_one.getPosition(), marker_point_two.getPosition()]; console.log("your path info is ="); console.log(path);
          //poly.setPath(path);
          //geodesicPoly.setPath(path);
          var heading = google.maps.geometry.spherical.computeHeading(path[0], path[1]);
          document.getElementById('heading').value = heading;
          document.getElementById('origin').value = path[0].toString();
          document.getElementById('destination').value = path[1].toString();
        }
        
        
})


.controller('MapCtrl', function($scope, $ionicLoading, $compile, $ionicActionSheet, $timeout) {
    var map;
    
    var marker1, marker2;
   
    var myLatlng;
    var myLatlng12;
    var myLatlng2;
    var poly, geodesicPoly;
    
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var marker = new google.maps.Marker();        
    
            
      function initialize() {
        
        myLatlng12 = new google.maps.LatLng(30.731212, 76.830220);
                        
        var mapOptions = {
            center: myLatlng12,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        map = new google.maps.Map(document.getElementById("map"), mapOptions);  
        
        navigator.geolocation.getCurrentPosition(function(pos) { console.log("get location");
        
        var mylat = pos.coords.latitude; 
        var mylng = pos.coords.longitude;
        
        
        setLatLong(mylat, mylng);
        

        myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        
        map.setCenter(myLatlng);
        
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP,                
                title: "My Current Location"
            });
            marker.addListener('click', toggleBounce);
        });
        
        
        
        $scope.map = map;
        
        
        
        
        google.maps.event.addListener(map, 'click', function(event) { console.log("90");
        
        
        
        
        navigator.geolocation.watchPosition(showPosition);
        
        
        
        var llat = localStorage.getItem("mylat"); console.log("mylat======="+llat); 
        var llng = localStorage.getItem("mylng"); console.log("llng======"+llng); 
        
        myLatlng2 = new google.maps.LatLng(llat,llng);
        
        var marker_point_one = myLatlng2; console.log("marker one"); console.log(marker_point_one);
        var marker_point_two = event.latLng;
        console.log("going to update");
        google.maps.event.addListener(marker_point_one, 'position_changed', update);
        google.maps.event.addListener(marker_point_two, 'position_changed', update);
        
        
        localStorage.setItem("myLatlng2", myLatlng2);
        localStorage.setItem("eventlatLng", event.latLng);
                                
        addMarker(event.latLng, map); console.log("9");
        
        drawRoute(myLatlng2, event.latLng);
        //ShowRoutes(myLatlng, event.latLng);
        
        
        
      });
      
      
      function showPosition(){
            
            navigator.geolocation.getCurrentPosition(function(pos) { console.log("get location");
        
            var mylat = pos.coords.latitude;  console.log(mylat);
            var mylng = pos.coords.longitude; console.log(mylng); 
            
            /////////////////////////// 
            var marker_point_one = mylat;
            var marker_point_two = mylng;
           // google.maps.event.addListener(marker_point_one, 'position_changed', update);
           // google.maps.event.addListener(marker_point_two, 'position_changed', update);
          
          
          ///////////////////////////////////
            setLatLong(mylat, mylng);
            
    
            myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            
            map.setCenter(myLatlng);
            
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                    map: map,
                    draggable: true,
                    animation: google.maps.Animation.DROP,                
                    title: "My Current Location"
                });
                marker.addListener('click', toggleBounce);
            });
        }
      
      function update() { console.log("in update funciton");
          var path = [marker_point_one.getPosition(), marker_point_two.getPosition()]; console.log("your path info is ="); console.log(path);
          //poly.setPath(path);
          //geodesicPoly.setPath(path);
          var heading = google.maps.geometry.spherical.computeHeading(path[0], path[1]);
          document.getElementById('heading').value = heading;
          document.getElementById('origin').value = path[0].toString();
          document.getElementById('destination').value = path[1].toString();
        }
      
      
      function setLatLong(mylat, mylng){
            localStorage.setItem("mylat", mylat);
            localStorage.setItem("mylng", mylng);
      }
      
      function drawRoute(start, destination){
        
        localStorage.setItem("startlatlng", mylat);
        localStorage.setItem("destlatlng", mylng);
            
       // marker.setMap(null);
        if(localStorage.getItem("travelMode")){
            var travelMode = localStorage.getItem("travelMode");
        } else {
            var travelMode = 'DRIVING';
        } console.log("travelMode="+travelMode);
        var request = {
            origin : start,
            destination : destination,
            travelMode : google.maps.DirectionsTravelMode[travelMode]
        };  console.log("98"); console.log(request);
        
        
        
       // directionsDisplay.setDirections(null);
       
        
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                
                directionsDisplay.setDirections(response);
            }
        });

        directionsDisplay.setMap(map); 
        directionsDisplay.setPanel(document.getElementById('right-panel'));
        $scope.searchNewsTextbtn = false;
        $scope.searchNewsText = true;
      }
      
      // Removes the markers from the map, but keeps them in the array.

      
      function ShowRoutes(start, destination){ console.log("show my route");  console.log(start); console.log(destination);
              
              directionsDisplay.setMap(map);
              directionsDisplay.setPanel(document.getElementById('right-panel'));
              
              var request = {
                origin : start,
                destination : destination,
                travelMode : google.maps.TravelMode.DRIVING
            };  console.log("98"); console.log(request);
            
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                  window.alert('Directions request failed due to ' + status);
                }
            });
            
       }
            
      
      // Adds a marker to the map.
        function addMarker(location, map) { console.log("92"); console.log(location); console.log(map); 
          // Add the marker at the clicked location, and add the next-available label
          // from the array of alphabetical characters.
           
          marker.setMap(null);          
          marker = new google.maps.Marker({
            position: location,
            draggable: true,
            animation: google.maps.Animation.DROP
          }); console.log("93");
          marker.setMap(map);    
          marker.addListener('click', toggleBounce);            
        }
        
        function toggleBounce() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        }
        
        $scope.travelMode = function(mode) { console.log("mymode="+mode);
            localStorage.setItem("travelMode", mode);
            
            var myLatlng2 = localStorage.getItem("myLatlng2");
            var eventlatLng = localStorage.getItem("eventlatLng");
            
            drawRoute(myLatlng2, eventlatLng);
        }
       
      }
  
      google.maps.event.addDomListener(window, 'load', initialize);

// Get My Location
      $scope.centerOnMe = function() {
        if(!map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });
        navigator.geolocation.getCurrentPosition(function(pos) {
          map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $ionicLoading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };
      
      
      
        $scope.ShowMeRoutesLive = function() {
            $state.go("app.map2", { "startlatlng": startlatlng, "destlatlng": destlatlng}); 
          };
      
        
       
        // Search Box show hide
		$scope.searchMe = function() {
		  //$scope.obj.searchText = '';
          //Keyboard.close();
		  if($scope.searchNewsText == true){
		    $scope.searchNewsText = false;  
		  } else {
		      $scope.searchNewsText = true;
		  }
			
		};
      
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('PaneCtrl', function($scope, $rootScope) {
  
})


.controller('CartCtrl', function($scope, $stateParams, $timeout, $ionicHistory) {
    
    var myBeaAdd = angular.element( document.querySelector( '#beaconMsg' ) );
    myBeaNoti = 1;
    myBeaNoti2 = 2;
	var element = '';
	  
    myBeaAdd.html(element);
                
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
})

.controller('CategoryCtrl', function($scope, $stateParams, $timeout, $ionicHistory) {
    
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    
})

.controller('ListCtrl', function($scope, $stateParams, $timeout, $ionicHistory) {
    
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
})

.controller('DetailsCtrl', function($scope, $stateParams, $timeout, $ionicHistory, $rootScope) {
    
    $rootScope.slideHeader = false;
    $rootScope.slideHeaderPrevious = 0;
  
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
        

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
