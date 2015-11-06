angular.module('starter.controllers', [])

.controller('MyLocationCtrl', function($scope, $ionicLoading) { console.log("MyLocationCtrl");
    var map = null;
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var marker = new google.maps.Marker();
    
    function initialize() {
        
        my_static_latlng = new google.maps.LatLng(30.731212, 76.830220);
                        
        var mapOptions = {
            center: my_static_latlng,
            zoom: 12,
            zoomControl: true,
              mapTypeControl: true,
              scaleControl: true,
              streetViewControl: true,
              rotateControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        map = new google.maps.Map(document.getElementById("map"), mapOptions);  
        
        navigator.geolocation.getCurrentPosition(function(pos) { console.log("get location");
        
            var my_current_lat = pos.coords.latitude; 
            var my_current_lng = pos.coords.longitude;
            
            
            var location = new google.maps.LatLng(my_current_lat, my_current_lng);
            
            map.setCenter(location);
            
            addMarker(location, map);
        });
    
    }
    
    $scope.$on('$ionicView.afterEnter', function(){
          initialize(); 
     });
     
     // Get My Location
      $scope.centerOnMe = function() { console.log("Center On Me");
        //if(!map) {
        //  return;
        //}

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });
        navigator.geolocation.getCurrentPosition(function(pos) {
          var location = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          
          map.setCenter(location);
          
          addMarker(location, map);
            
          $ionicLoading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      // Adds a marker to the map.
        function addMarker(location, map) { console.log("92"); console.log(location); console.log(map); 
          marker.setMap(null);          
          marker = new google.maps.Marker({
            position: location,
            draggable: true,
            zoom: 18,
            animation: google.maps.Animation.DROP
          }); console.log("93");
          marker.setMap(map);    
          marker.addListener('click', toggleBounce);            
        }
        
     //Toggle Bounce   
        function toggleBounce() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        }
        
})

.controller('MapCtrl', function($scope, $ionicLoading, $compile, $ionicActionSheet, $timeout) { console.log("in map ctrl");
    
    var map = null;
    var boxpolys = null;
    var directions = null;
    var routeBoxer = null;
    var distance = null; // km
    var service = null;
    var gmarkers = [];
    var infowindow = new google.maps.InfoWindow();

    
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
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        map = new google.maps.Map(document.getElementById("map"), mapOptions);  
        
        navigator.geolocation.getCurrentPosition(function(pos) { console.log("get location");
        
        var mylat = pos.coords.latitude; 
        var mylng = pos.coords.longitude;
        
        
        setLatLong(mylat, mylng);
        

        myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        
        map.setCenter(myLatlng);
        
        
        /// Add a circle in Chandigarh Lake
        
        var ShoeIsland = new google.maps.LatLng(30.728835, 76.845290);
        
         var cityCircle = new google.maps.Circle({
          strokeColor: 'rgba(236, 62, 78, 0.56)',
          strokeOpacity: 0.6,
          strokeWeight: 1,
          fillColor: 'rgba(234, 37, 218, 0.34)',
          fillOpacity: 0.30,
          map: map,
          center: ShoeIsland,
          radius: 2000
        });
     
        
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
               // draggable: true,
                icon: 'img/mapmarker.png',
                animation: google.maps.Animation.DROP,                
                title: "My Current Location",
                fences: [cityCircle],
                  inside: function(marker, fence){
                    alert('This marker has been moved outside of its fence');
                  }
            });
            
            //DT Mall
            marker.setAnimation(google.maps.Animation.BOUNCE);
            
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(30.723687, 76.843904),
                map: map,
                icon: 'img/restaurant.png',
                title: "TPT IT Park Chandigarh"
            });
            
            marker.addListener('click', function (event) {
                drawRoute(myLatlng, this.position);
            });
            
            //DT Mall
            
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(30.730493, 76.847788),
                map: map,
                icon: 'img/restaurant.png',
                title: "Dolphin IT Park Chandigarh"
            });
            
            marker.addListener('click', function (event) {
                drawRoute(myLatlng, this.position);
            });
            
            
            //DT Mall
            
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(30.722801, 76.807051),
                map: map,
                icon: 'img/restaurant.png',
                title: "DT Mall IT Park Chandigarh"
            });
            
            marker.addListener('click', function (event) {
                drawRoute(myLatlng, this.position);
            });
            
            
            //DT Mall
            
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(30.749507, 76.806192),
                map: map,
                icon: 'img/restaurant.png',
                title: "DT Mall IT Park Chandigarh"
            });
            
            marker.addListener('click', function (event) {
                drawRoute(myLatlng, this.position);
            });
            
            // Lalit Resort
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(30.729589, 76.852198),
                map: map,
                icon: 'img/restaurant.png',
                title: "DT Mall IT Park Chandigarh"
            });
            
            marker.addListener('click', function (event) {
                drawRoute(myLatlng, this.position);
            });
            
            // Airtel
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(30.725605, 76.768942),
                map: map,
                icon: 'img/restaurant.png',
                title: "Airtel IT Park Chandigarh"
            });
            
            marker.addListener('click', function (event) {
                drawRoute(myLatlng, this.position);
            });
            
            //Park Plaza
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(30.657997, 76.822157),
                map: map,
                icon: 'img/restaurant.png',
                title: "Park Plaza IT Park Chandigarh"
            });
                                   
            marker.addListener('click', function (event) {
                drawRoute(myLatlng, this.position);
            });
            
                            //Add listener
          //  google.maps.event.addListener(marker, "click", function (event) {
          //                      alert(this.position); console.log(this.position);
          //  });
            
        });
        
        
        
        $scope.map = map;
        
        

        /*
        google.maps.event.addListener(map, 'click', function(event) { console.log("90"); console.log(event);
        
        
         var evt = event.latLng;
  console.log('latitude:'+evt.lat()+'; longitude:'+evt.lng()+';');
        // Watch to show position regular basis...
       // navigator.geolocation.watchPosition(showPosition);
        
        
        
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
                                
        //addMarker(event.latLng, map); console.log("9");
        
        var slat = llat;
        var slng = llng;
        var dlat = evt.lat();
        var dlng = evt.lng();
        console.log("duck"); console.log(event.latLng);
        drawRoute(myLatlng2, event.latLng, slat, slng, dlat, dlng);
        //ShowRoutes(myLatlng, event.latLng);
        
        
        
      });
      */
      
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
      
      function drawRoute(start, destination){ console.log("draw route"); console.log(start); console.log(start.lat);
        
        localStorage.setItem("startlatlng", start);
        localStorage.setItem("destlatlng", destination);
            
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
       
       
       // Other offers... 
            service = new google.maps.places.PlacesService(map);

            routeBoxer = new RouteBoxer();

            distance = 0.2; // km
        
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                
                directionsDisplay.setDirections(response);
                
                // Box the overview path of the first route
                    console.log("Boxes");
                    // Box around the overview path of the first route
                      var path = response.routes[0].overview_path;
                      var boxes = routeBoxer.box(path, distance);
                      // alert(boxes.length);
                      //drawBoxes(boxes);
                     // findPlaces(boxes,0);

                    
                    
            }
        });
        directionsDisplay.setPanel(document.getElementById('right-panel'));
        directionsDisplay.setMap(map);  console.log("Right Panel ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        
        $scope.searchNewsTextbtn = false;
        $scope.searchNewsText = true;
        
        var sevt = start;
        var devt = destination;
        
        var slat = sevt.lat();
        var slng = sevt.lng();
        var dlat = devt.lat();
        var dlng = devt.lng();
        
            $timeout(abc, 3000);
      
        
        
        function abc(){
            launchnavigator.navigate(
              [slat, slng],
              [dlat, dlng],
              function(success){ console.log(success);
                 // alert("Plugin success");
              },
              function(error){
                 // alert("Plugin error: "+ error);
              });  //alert("Hello");
        }
        
        
        
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
       
       
       

       
       // Draw the array of boxes as polylines on the map
        function drawBoxes(boxes) {
          boxpolys = new Array(boxes.length);
          for (var i = 0; i < boxes.length; i++) {
            boxpolys[i] = new google.maps.Rectangle({
              bounds: boxes[i],
              fillOpacity: 0,
              strokeOpacity: 1.0,
              strokeColor: '#000000',
              strokeWeight: 1,
              map: map
            });
          }
        }
       
       
       function findPlaces(boxes,searchIndex) { console.log("boxes fff"); console.log(boxes[searchIndex]);
       console.log(boxes[searchIndex].O);
       console.log(boxes[searchIndex].j);
       
       console.log(boxes[searchIndex].O.O);
       console.log(boxes[searchIndex].j.j);
       
       var abcdef = new google.maps.LatLng(boxes[searchIndex].O.O, boxes[searchIndex].j.j);
          /* var request = {
               bounds: boxes[searchIndex],
               //types: ["gas_station"]
               types: ["pizza, bar, resturant, lunch, dinner, breakfast"], 
               query
           };*/
           var stltng = localStorage.getItem("startlatlng");
           var request = {
                bounds: boxes[searchIndex],
                location: abcdef,
                radius: '0.10',
                query: 'restaurant'
              };
           
           // alert(request.bounds);
           
           //radarSearch
           //textSearch
           //nearbySearch
           service.textSearch(request, function (results, status) { console.log("Radar Search"); console.log(results);
           if (status != google.maps.places.PlacesServiceStatus.OK) {
             alert("Request["+searchIndex+"] failed: "+status);
             return;
           }
           // alert(results.length);
           document.getElementById('side_bar').innerHTML += "bounds["+searchIndex+"] returns "+results.length+" results<br>"
           for (var i = 0, result; result = results[i]; i++) {
             var marker = createMarker(result);
           }
           searchIndex++;
           if (searchIndex < boxes.length) 
             findPlaces(boxes,searchIndex);
           });
        }

       
       // Clear boxes currently on the map
        function clearBoxes() {
          if (boxpolys != null) {
            for (var i = 0; i < boxpolys.length; i++) {
              boxpolys[i].setMap(null);
            }
          }
          boxpolys = null;
        }


       
       
       function createMarker(place){
            var placeLoc=place.geometry.location;
            if (place.icon) {
              var image = new google.maps.MarkerImage(
                        place.icon, new google.maps.Size(71, 71),
                        new google.maps.Point(0, 0), new google.maps.Point(17, 34),
                        new google.maps.Size(25, 25)); 
                      //  var image = "img/restaurant.png";
             } else var image = "img/restaurant.png";//null;
            
            map.setZoom(14);
            
            var marker=new google.maps.Marker({
                map:map,
                icon: image,
                position:place.geometry.location
            });
            var request =  {
                  reference: place.reference
            };
            google.maps.event.addListener(marker,'click',function(){
                service.getDetails(request, function(place, status) {
                  if (status == google.maps.places.PlacesServiceStatus.OK) {
                    var contentStr = '<h5>'+place.name+'</h5><p>'+place.formatted_address;
                    if (!!place.formatted_phone_number) contentStr += '<br>'+place.formatted_phone_number;
                    if (!!place.website) contentStr += '<br><a target="_blank" href="'+place.website+'">'+place.website+'</a>';
                    contentStr += '<br>'+place.types+'</p>';
                    infowindow.setContent(contentStr);
                    infowindow.open(map,marker);
                  } else { 
                    var contentStr = "<h5>No Result, status="+status+"</h5>";
                    infowindow.setContent(contentStr);
                    infowindow.open(map,marker);
                  }
                });
        
            });
            gmarkers.push(marker);
            var side_bar_html = "<a href='javascript:google.maps.event.trigger(gmarkers["+parseInt(gmarkers.length-1)+"],\"click\");'>"+place.name+"</a><br>";
            document.getElementById('side_bar').innerHTML += side_bar_html;
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
            var startlatlng = localStorage.getItem("startlatlng");
            var destlatlng = localStorage.getItem("destlatlng");
            
            drawRoute(startlatlng, destlatlng);
        }
       
      }
  
     // google.maps.event.addDomListener(window, 'load', initialize);
     
     $scope.$on('$ionicView.afterEnter', function(){
          initialize(); 
     });        

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



.controller('EnterOfferOneCtrl', function($scope, $rootScope) {
  
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

.controller('CategoryCtrl', function($scope, $stateParams, $timeout, $ionicHistory, GeoFencing) {
    
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
