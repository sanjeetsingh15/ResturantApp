angular.module('starter.controllers', [])

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

.controller('MapCtrl', function($scope, $stateParams) {
  console.log("mapgoogle");
  
  document.addEventListener('deviceready', onDeviceReady, true);
      
	
	function onDeviceReady(){
	  var div = document.getElementById("map_canvas");
      map = plugin.google.maps.Map.getMap(div); console.log(map);
      map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
    }
    
    function onMapReady() {
      var button = document.getElementById("button");
      button.addEventListener("click", onBtnClicked, false);
      
      
      function onBtnClicked() {
          map.showDialog();
        }
      
      // Location my location.. /////////////////////////////////////////////////
      
      var onSuccess = function(location) { //alert(location); 
      console.log("2");
          var msg = ["Current your location:\n",
            "latitude:" + location.latLng.lat,
            "longitude:" + location.latLng.lng,
            "speed:" + location.speed,
            "time:" + location.time,
            "bearing:" + location.bearing].join("\n");
        
        var MyLocation = location.latLng;
        window.localStorage.setItem("MyLocation", MyLocation);
          
        map.setOptions({
          'backgroundColor': 'white',
          //'mapType': plugin.google.maps.MapTypeId.HYBRID,
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true // Only for Android
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': MyLocation,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });
        

          map.addMarker({
            'position': MyLocation,
            'title': "My Location"//msg
          }, function(marker) { console.log(marker);
            marker.showInfoWindow();
          }); 
          
          map.animateCamera({
              'target': MyLocation,
              'tilt': 60,
              'zoom': 16,
              'bearing': 140
            });
            
        }; console.log("7");
        
        var onError = function(msg) { console.log("4");
          alert("error: " + msg); 
        }; console.log("5");
        map.getMyLocation(onSuccess, onError);
        
      ////////////////////////////////////////////////////////////////////////////
        console.log("11");
      // dtmal
      var  dtmal = new plugin.google.maps.LatLng(30.729036, 76.844671); console.log("12");
      
      console.log("dtmal location"); console.log(dtmal);
        map.addMarker({ 
          'position': dtmal,
          'myMsg': 'DT Mall IT Park Chandigarh',
          'markerClick': function(marker) {
            marker.showInfoWindow();
          }
        }, function(marker) { console.log("13"); console.log(marker);
         // alert(marker.get("myMsg"));
         marker.showInfoWindow();
        }); console.log("14");
       
       //infosys 
        var  infosys = new plugin.google.maps.LatLng(30.727348, 76.844832); console.log("12");
      
      console.log("dtmal location"); console.log(dtmal);
        map.addMarker({ 
          'position': infosys,
          'myMsg': 'Infosys IT Park Chandigarh',
          'markerClick': function(marker) {
            marker.showInfoWindow();
          }
        }, function(marker) { console.log("13"); console.log(marker);
         // alert(marker.get("myMsg"));
         marker.showInfoWindow();
        }); console.log("14");
        
        //bebo - technology
        
        var  bebo = new plugin.google.maps.LatLng(30.725310, 76.847515); console.log("12");
      
      console.log("dtmal location"); console.log(dtmal);
        map.addMarker({ 
          'position': bebo,
          'myMsg': 'Bebo Technology IT Park Chandigarh',
          'markerClick': function(marker) {
            marker.showInfoWindow();
          }
        }, function(marker) { console.log("13"); console.log(marker);
        //  alert(marker.get("myMsg"));
        marker.showInfoWindow();
        }); console.log("14");
        
        //netsmartz
        
        var  netsmartz = new plugin.google.maps.LatLng(30.723843, 76.846957); console.log("12");
      
      console.log("dtmal location"); console.log(dtmal);
        map.addMarker({
          'position': netsmartz,
          'myMsg': 'Net Smartz IT Park Chandigarh'
        }, function(marker) { console.log("13"); console.log(marker);
        //  alert(marker.get("myMsg"));
        marker.showInfoWindow();
        }); console.log("14");
        
        
        
        map.on(plugin.google.maps.event.MAP_LONG_CLICK, function(latLng) {
        map.addMarker({
            "position": latLng,
            "title": "Destination"
          },  function(marker) {
            marker.showInfoWindow();
        });
            setTimeout(function() {
        
              if (confirm("Do you want to go?")) {
               /* plugin.google.maps.external.launchNavigation({
                  "from": MyLocation,
                  "to": latLng
                }); */
                
               // var div = document.getElementById("map_canvas");
                //map = plugin.google.maps.Map.getMap(div); console.log(map);
                
                var My123Location123 = window.localStorage.getItem("MyLocation"); console.log(window.localStorage);
                console.log("here my location"); console.log(My123Location123);
                
                var mylatlng = My123Location123.split(','); console.log(mylatlng); console.log(mylatlng[0]); console.log(mylatlng[1]);
                
                var  start = new plugin.google.maps.LatLng(mylatlng[0], mylatlng[1]); console.log(start);console.log("41");
                var  destination = new plugin.google.maps.LatLng(latLng.lat, latLng.lng);  console.log(destination);console.log("42");
                
                var mapOptions = {
                    center: destination,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
         console.log("51"); console.log(mapOptions);
                map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
         console.log("52"); console.log(map);
                var directionsService = new google.maps.DirectionsService(); console.log('31');console.log(directionsService);
                var directionsDisplay = new google.maps.DirectionsRenderer(); console.log("32"); console.log(directionsDisplay);
               
                
                
                
                
                var request = {
                    origin : start,
                    destination : destination,
                    travelMode : google.maps.TravelMode.DRIVING
                }; console.log("33");
                directionsService.route(request, function(response, status) { console.log("34"); console.log(response); console.log(status);
                    if (status == google.maps.DirectionsStatus.OK) { console.log('35');
                        directionsDisplay.setDirections(response);
                    } console.log('36');
                });
                
                
              }
            }, 200);      
         
    });
    }

})

.controller('AccountCtrl', function($scope) {
  
});
