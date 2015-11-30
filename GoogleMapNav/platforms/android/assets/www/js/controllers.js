angular.module('starter.controllers', [])

.controller('SignUpCtrl', function($scope, $ionicLoading) { console.log("in map ctrl signup");
    $scope.submit = function(){
        var point_of_interest = $scope.point_of_interest;
        localStorage.setItem("point_of_interest", point_of_interest);
    }

})

.controller('MapCtrl', function($scope, $ionicHistory, $ionicLoading, $filter , $ionicNavBarDelegate, $timeout, $state) {
    
    
    $ionicHistory.nextViewOptions({
          disableBack: false
        });

    var map = null;
    var boxpolys = null;
    var directions = null;
    var routeBoxer = null;
    var distance = null; // km
    var service = null;
    var gmarkers = [];
    var lmarkers = [];
    var infowindow = new google.maps.InfoWindow();

    var RouteString;
    var marker1, marker2;
    
    var route; var rroute;
    
    var ddd1 = 0; var ddl = 0; var troute;                    
   
    var MyCurrentLocation;
    var myLatlng;
    var myLatlng12;
    var myLatlng2;
    var poly, geodesicPoly;
    var markerArray = [];
    
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    
    var marker = new google.maps.Marker();  
    
     var stepDisplay = new google.maps.InfoWindow; 
    
    var TextOfDirectionSting = 0;  
    

                        
                        
                        
      function initialize() {
        
        loading();
        
        

        var start; var destination; var route;
        document.getElementById("footerTabsOne").style.display = 'inline-flex';
        document.getElementById("footerTabsTwo").style.display = 'none';
        
        
        
        $ionicNavBarDelegate.title("ROUTE MAP");
        
        myLatlng12 = new google.maps.LatLng(30.731212, 76.830220);

        var mapOptions = {
            center: myLatlng12,
            zoom: 12,
            heading: 90,
            tilt: 45,
            disableDefaultUI: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
              mapTypeControl: true,
              mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
              },
              scaleControl: true,
              streetViewControl: true,
              rotateControl: true,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.LARGE
                }
        };
 
        map = new google.maps.Map(document.getElementById("map"), mapOptions);  
        
        navigator.geolocation.getCurrentPosition(function(pos) { console.log("get location");
        
        var mylat = pos.coords.latitude; 
        var mylng = pos.coords.longitude;

        myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        
        map.setCenter(myLatlng);
        
        var heading = map.getHeading() || 0; //alert(heading);
            map.setHeading(heading + 180);
        
        /// Add a circle in Chandigarh Lake
        
        var ShoeIsland = new google.maps.LatLng(30.728835, 76.845290);
  
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
            
            
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(45.518, -122.672),
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
            
        });
        
        
        
         var rightpanel = angular.element( document.querySelector( '#right-panel' ) );
        rightpanel.html(' '); 
        
        var directiontt = angular.element( document.querySelector( '#directiontt' ) );
        directiontt.html(' '); 
                           
        var directiontttt = angular.element( document.querySelector( '#directiontttt' ) );
        directiontttt.html('  '); 
                               
        var directionthen = angular.element( document.querySelector( '#directionthen' ) );
        directionthen.html(' ');
        
      function drawRoute(start, destination){ //alert("1");
      
        loading();
        
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

            
        
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                
                // First, remove any existing markers from the map.
                  for (var i = 0; i < markerArray.length; i++) {
                    markerArray[i].setMap(null);
                  }
                                                    
                directionsDisplay.setDirections(response);
                //showSteps(response, markerArray, stepDisplay, map);
                RouteString = response;
                
                //Routes//
                
                    route = RouteString.routes[0];
            }
        });
        
        
        
        function showSteps(directionResult, markerArray, stepDisplay, map) {
          // For each step, place a marker, and add the text to the marker's infowindow.
          // Also attach the marker to an array so we can keep track of it and remove it
          // when calculating new routes.
          var myRoute = directionResult.routes[0].legs[0];
          for (var i = 0; i < myRoute.steps.length; i++) {
            var img = 'img/'+myRoute.steps[i].maneuver+'.png'; //alert(img);
            var marker = new google.maps.Marker({
                icon: img
            });
            marker.setMap(map);
            marker.setPosition(myRoute.steps[i].start_location);
            attachInstructionText(
                stepDisplay, marker, myRoute.steps[i].instructions, map);
          }        
                                                                            
        }
        
        function attachInstructionText(stepDisplay, marker, text, map) {
          google.maps.event.addListener(marker, 'click', function() {
            // Open an info window when the marker is clicked on, containing the text
            // of the step.
            stepDisplay.setContent(text);
            stepDisplay.open(map, marker);
          });
        }
        
        directionsDisplay.setPanel(null);
        directionsDisplay.setPanel(document.getElementById('right-panel'));
        directionsDisplay.setMap(map); 
        
        $scope.searchNewsTextbtn = false;
        $scope.searchNewsText = true;
        
        
        
          //  $timeout(abc, 3000);
      
      $scope.GoNavigation = function() {
        loading();
        
        startNavigation(start, destination, route);

      
      }; 
        
       
        
       // $ionicLoading.hide();
        
      }
      
      // Removes the markers from the map, but keeps them in the array.

      
      function ShowRoutes(start, destination){ console.log("show my route");  console.log(start); console.log(destination);
              
              directionsDisplay.setMap(map);
              directionsDisplay.setPanel(document.getElementById('right-panel'));
              
              var request = {
                origin : start,
                mapTypeId: google.maps.MapTypeId.SATELLITE,
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
       
       
       function startNavigation(start, destination, route){  console.log(route);
            
             if(watchID){
                navigator.geolocation.clearWatch(watchID);
               }
           
            var navPref = localStorage.getItem('navigationPreference');
            
            if(navPref == 'gmap'){
                    var sevt = start;
                    var devt = destination;
                    
                    var slat = sevt.lat();
                    var slng = sevt.lng();
                    var dlat = devt.lat();
                    var dlng = devt.lng();
                if(slat && slng && dlat && dlng){
                    launchnavigator.navigate(
                  
                  [dlat, dlng],
                  [slat, slng],
                  function(success){ console.log(success);
                     // alert("Plugin success");
                  },
                  function(error){
                  }); 
                } else {
                    alert("Please select a route to navigate.");
                }
                
            }else if(start && destination && route){
            document.getElementById("footerTabsOne").style.display = 'none';
            document.getElementById("footerTabsTwo").style.display = 'inline-flex';
            
            var footerTabsThree = angular.element( document.querySelector( '#footerTabsThree' ) );
            footerTabsThree.html('<div style="">'+route.legs[0].duration.text+' - '+route.legs[0].distance.text+'</div>');
       
          
       
          var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { maximumAge: 3000000, timeout: 5000000, enableHighAccuracy: true });
           //navigator.geolocation.clearWatch(watchID);
           function onError(){
            alert("error");
           } 

          function onSuccess(pos){
            var mylat = pos.coords.latitude;  console.log(mylat);
            var mylng = pos.coords.longitude; console.log(mylng); 
        
    
            myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            
            map.setCenter(myLatlng);
            
            var heading = map.getHeading() || 0; //alert(heading);
            map.setHeading(heading + 90);
                      
            map.setZoom(18);
            
            marker.setMap(null);
            
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                title: "My Current Location",
                icon: 'img/nav3.png',
            });
                
            marker.setMap(map);
                
            troute = route.legs[0].steps[ddd1];
            
            var distance212 = google.maps.geometry.spherical.computeDistanceBetween(myLatlng, troute.start_point);

                   var mmn = route.legs[0].steps[ddd1].distance.value;

                    if(distance212 <= 15){
                        if(ddl == 1){
                            ddd1 = ddd1 + 1;
                            ddl = 0;    
                        } else {
                            ddl = 1;
                        }

                      $ionicNavBarDelegate.title(route.legs[0].steps[ddd1].instructions);
                      
                      directiontt = angular.element( document.querySelector( '#directiontt' ) );
                      directiontt.html(troute.distance.text); 
                   
                       directiontttt = angular.element( document.querySelector( '#directiontttt' ) );
                       directiontttt.html(troute.duration.text); 
                    }

                   $ionicNavBarDelegate.title(troute.instructions );
                   
                   directiontt = angular.element( document.querySelector( '#directiontt' ) );
                   directiontt.html(troute.distance.text + '<br/>'+troute.duration.text);
                   
                   directionthen = angular.element( document.querySelector( '#directionthen' ) );
                   directionthen.html('<div class="kumar-maneuver kumar-'+route.legs[0].steps[ddd1+1].maneuver+'" style="position: absolute; z-index: 999; top: 0px; right: 0px; padding: 10px 24px 14px 8px; border: 1px solid #C72424;  color: #fff;">'+$filter('number')(distance212, 0)+'m Then </div>');
                  
                  // directionthen.html('<div class="kumar-maneuver kumar-'+route.legs[0].steps[ddd1+1].maneuver+'" style="position: absolute; z-index: 999; top: 0px; right: 0px; padding: 5px 25px 5px 5px; border: 1px solid #C72424; background: #EF473A; color: #fff;">'+$filter('number')(distance212, 0)+'m Then </div>');
            }
            
            } else {
                alert("Please select a route first.");
            }
            
            
            $scope.closeRoute = function(){
                navigator.geolocation.clearWatch(watchID);
                initialize(); 
            }
        
            $scope.$on('$ionicView.beforeLeave', function(){ //alert("b");
                  navigator.geolocation.clearWatch(watchID);
             });
       }

      // Adds a marker to the map.
        function addMarker(location, map) { console.log("92"); console.log(location); console.log(map); 
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
        
        $scope.travelMode = function(mode) {
            
            localStorage.setItem("travelMode", mode);
            
            var myLatlng2 = localStorage.getItem("myLatlng2");
            var startlatlng = localStorage.getItem("startlatlng");
            var destlatlng = localStorage.getItem("destlatlng");
            
            drawRoute(startlatlng, destlatlng);
        }
        
        
      }
      
      
     
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
      
      
      function loading(){
        /* ionic Loading show */
            $ionicLoading.show({
                    content: 'Please Wait..',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 600,
                    showDelay: 100
            });


        /* ionic Loading hide with Timeout */
            window.setTimeout(function(){
                    $ionicLoading.hide();
            },1000);
      }
})

.controller('SettingCtrl', function($scope) {
    
    var pointOI = localStorage.getItem('pointOfInterest');
    var pointON = localStorage.getItem('navigationPreference');
    
    if(!pointOI){
        pointOI = 'resturant';
        localStorage.setItem('pointOfInterest', pointOI);
    }
    
    if(!pointON){
        pointON = 'gmap';
        localStorage.setItem('navigationPreference', pointON);
    }
    
    $scope.poi = {
        group: pointOI
      };
      
      $scope.np = {
        nav: pointON
      };
    
    //$scope.poi = {};
    
   // $scope.np = {};
    
    $scope.pointOfInterest = function(){ //alert($scope.poi['group']); alert($scope.np['nav']);
        localStorage.setItem('pointOfInterest', $scope.poi['group']);
        localStorage.setItem('navigationPreference', $scope.np['nav']);
        var mesg = document.getElementById('msg');
        mesg.innerHTML = "Your preferences are saved successfully.";
       setTimeout(function() {
            mesg.innerHTML = ''
        }, 3000);
    }
    
    
    
    
     $scope.pointOIP = [
        { text: "All", value: "resturant, hospital, atm" },
        { text: "Resturant", value: "resturant" },
        { text: "Hospital", value: "hospital" },
        { text: "Atm", value: "atm" }
      ];

})


.controller('Map2Ctrl', function($scope, $ionicLoading) {
    
    
    var mapp = null;
    
    var gmarkersp = [];
    
    var infowindowp = new google.maps.InfoWindow();

    var myLatlng12p;  
    
  
      function initialize() {
        
        myLatlng12p = new google.maps.LatLng(30.731212, 76.830220);
                        
        var mapOptions = {
            center: myLatlng12p,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            streetViewControl: false,
            navigationControlOptions: {
                style: google.maps.NavigationControlStyle.SMALL
            }
        };
 
        mapp = new google.maps.Map(document.getElementById("mapp"), mapOptions);  
        
        navigator.geolocation.getCurrentPosition(function(pos) { 
        
        var mylat = pos.coords.latitude; 
        var mylng = pos.coords.longitude;
        

        myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        
        mapp.setCenter(myLatlng);        
        });
        
        var pointOfInterest = 'resturant';
        
        pointOfInterest = localStorage.getItem('pointOfInterest'); //alert(pointOfInterest);
        
        
        if(!pointOfInterest){
            pointOfInterest = 'resturant';
            localStorage.setItem('pointOfInterest', pointOfInterest);
        }
        
        id = '#'+pointOfInterest;
        
        var myEl = angular.element( document.querySelector( '#all' ) );
        myEl.removeClass('active'); 
        var myEl = angular.element( document.querySelector( '#resturant' ) );
        myEl.removeClass('active'); 
        var myEl = angular.element( document.querySelector( '#atm' ) );
        myEl.removeClass('active'); 
        var myEl = angular.element( document.querySelector( '#hospital' ) );
        myEl.removeClass('active'); 

        if(pointOfInterest == 'resturant, hospital, atm'){
            id = '#all';
        }
      var myE2 = angular.element( document.querySelector( id ) );
        myE2.addClass('active'); 
        
            if(pointOfInterest){
                
                if(pointOfInterest == 'resturant, hospital, atm'){ //alert("hello");
                  /*  var abc = pointOfInterest.split(',');
                    var kkk = '';
                    for(i = 0; i< abc.length; i++){
                        kkk = kkk + abc[i] + ' | ';
                    }

                    var mmm = kkk;
                    */
                     var request = { 
                    location: myLatlng12p,
                    radius: '20000',
                    types: ['atm' , 'hospital',  'resturant', 'accounting', 'airport', 'food', 'bank', 'park']
                  };  
                    
                    
                } else {
                   // var mmm = pointOfInterest; 
                   
                   var request = { 
                    location: myLatlng12p,
                    radius: '20000',
                    types: [pointOfInterest]
                  };                   
                }
             /*
                var request = { 
                    location: myLatlng12p,
                    radius: '20000',
                    types: [mmm]
                  };
               */ 
                  service = new google.maps.places.PlacesService(mapp);
                  service.nearbySearch(request, callback);
                  
                  
            }
        
        }
        
        $scope.pointOfInterest = function(interest){
            localStorage.setItem('pointOfInterest', interest);
            initialize();
        }
        
        function callback(results, status) {// alert("Hi");
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            
            var poi  = localStorage.getItem('pointOfInterest'); //alert(poi);
            //alert(results.length);
            for (var i = 0; i < results.length; i++) {
              var place = results[i];
              createMarker(place, poi);
            }
          }
        }
       
       
       function createMarker(place, poi){ //console.log("create marker "); console.log(poi);
       
      // marker.setMap(null);
     // var abc = poi.split(',');
      
      //console.log(abc);
      
      //console.log(abc.length);
      /*
      for(i=0; i < abc.length; i++){
        var placeLoc=place.geometry.location;
            
            if(poi[i] == 'resturant'){
                var image = "img/restaurant-32x32.png";
                var photos = place.photos;
                
                if (!photos) {
                    var image = "img/restaurant-32x32.png";
                  } else {
                    var image = photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35});
                  }
                
            } else if(poi[i] == 'all'){
                var image = "img/store_32x32.png";
            } else if(poi[i] == 'atm'){
                var image = "img/atm_32x32.png";
            } else if(poi[i] == 'hospital'){
                var image = "img/hospital_32x32.png";
            } else {
                var image = new google.maps.MarkerImage(
                        place.icon, new google.maps.Size(71, 71),
                        new google.maps.Point(0, 0), new google.maps.Point(17, 34),
                        new google.maps.Size(25, 25)); 
            }
      } 
        */
            var placeLoc=place.geometry.location;
            console.log("poi = "+poi); //alert(place.types);
            
             console.log(place.types[0]);
            
            var abc = place.types;
            
            
            if(poi == 'resturant'){
                var image = "img/restaurant-32x32.png";
                var photos = place.photos;
                
                if (!photos) {
                    var image = "img/restaurant-32x32.png";
                  } else {
                    var image = photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35});
                  }
                
            } else if(poi == 'resturant, hospital, atm'){ //alert(poi);
                if(abc[0] == 'resturant' || abc[0] == 'food' || abc[0] == 'bar' || abc[1] == 'resturant' || abc[1] == 'food' || abc[1] == 'bar' || abc[2] == 'resturant' || abc[2] == 'food' || abc[2] == 'bar'){ //alert("1"); alert(place.types);
                    var image = "img/restaurant-32x32.png";
                    var photos = place.photos;
                    
                    if (!photos) {
                        var image = "img/restaurant-32x32.png";
                      } else {
                        var image = photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35});
                      }
                } else if(abc[0] == 'bank' || abc[0] == 'atm' || abc[1] == 'bank' || abc[1] == 'atm' || abc[2] == 'bank' || abc[2] == 'atm'){ // alert("2"); alert(place.types);
                    var image = "img/atm_32x32.png";
                } else if(abc[0] == 'hospital' || abc[0] == 'health' || abc[1] == 'hospital' || abc[1] == 'health' || abc[2] == 'hospital' || abc[2] == 'health'){ //alert("3"); alert(place.types);
                    var image = "img/hospital_32x32.png";
                } else { //alert("d");
                    var image = new google.maps.MarkerImage(
                        place.icon, new google.maps.Size(71, 71),
                        new google.maps.Point(0, 0), new google.maps.Point(17, 34),
                        new google.maps.Size(25, 25));
                }
            } else if(poi == 'atm'){
                var image = "img/atm_32x32.png";
            } else if(poi == 'hospital'){
                var image = "img/hospital_32x32.png";
            } else {
                var image = new google.maps.MarkerImage(
                        place.icon, new google.maps.Size(71, 71),
                        new google.maps.Point(0, 0), new google.maps.Point(17, 34),
                        new google.maps.Size(25, 25)); 
            }
            
            var marker=new google.maps.Marker({
                map:mapp,
                icon: image,
                position:place.geometry.location
            });
             
             console.log("image = "+image);       
                    
            /*
            if (place.icon) {
              var image = new google.maps.MarkerImage(
                        place.icon, new google.maps.Size(71, 71),
                        new google.maps.Point(0, 0), new google.maps.Point(17, 34),
                        new google.maps.Size(25, 25)); 
                      //  var image = "img/restaurant.png";
             } else {
                var image = "img/restaurant.png";//null;
             }
            
            var photos = place.photos; console.log("photos"); console.log(photos);
            
            if(poi == 'resturant'){
                if (!photos) {
                    var marker=new google.maps.Marker({
                        map:map,
                        icon: image,
                        position:place.geometry.location
                    });
                  } else {
                    var marker = new google.maps.Marker({
                        map: map,
                        position: place.geometry.location,
                        title: place.name,
                        icon: photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35})
                      });
                  }
            }else { 
                var marker=new google.maps.Marker({
                        map:map,
                        icon: image,
                        position:place.geometry.location
                    });
            }
      */
            
              console.log("photos 2");
            var request =  {
                  reference: place.reference
            };
            google.maps.event.addListener(marker,'click',function(){
                service.getDetails(request, function(place, status) { console.log("getdetails"); console.log(place); //console.log(place.photos);  //console.log(place.photos[0].getUrl());
                  if (status == google.maps.places.PlacesServiceStatus.OK) {
                    
                    var contentStr = '<h5>'+place.name+'</h5><p>'+place.formatted_address+'</p>';
                    
                    if (!!place.photos){ console.log("duck cccccc"); console.log(place.photos.length);
                        contentStr +='<div style="float:left;width:100%;';
                        for(var i = 0; i < place.photos.length; i++){
                            contentStr += '<img style = "float:left; padding:5px;height:50px;" src="'+place.photos[i].getUrl({'maxWidth': 50, 'maxHeight': 40})+'" />';
                        }
                        contentStr +='</div>';
                    }
                    if (!!place.formatted_phone_number) contentStr += '<br>'+place.formatted_phone_number;
                    if (!!place.website) contentStr += '<br><a target="_blank" href="'+place.website+'">'+place.website+'</a>';
                    contentStr += '<br>'+place.types+'</p>';
                    infowindowp.setContent(contentStr);
                    infowindowp.open(mapp,marker);
                  } else { 
                    var contentStr = "<h5>No Result, status="+status+"</h5>";
                    infowindowp.setContent(contentStr);
                    infowindowp.open(mapp,marker);
                  }
                });
        
            });
            gmarkersp.push(marker);
            var side_bar_html = "<a href='javascript:google.maps.event.trigger(gmarkersp["+parseInt(gmarkersp.length-1)+"],\"click\");'>"+place.name+"</a><br>";
            document.getElementById('side_bar').innerHTML += side_bar_html;
        }
      

     $scope.$on('$ionicView.afterEnter', function(){
          initialize(); 
     });        
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
      disableBack: false
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
