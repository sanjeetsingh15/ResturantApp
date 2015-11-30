var app = (function()
{
    
    var fencing = {};
    var myalert = true;
    document.addEventListener('deviceready', onDeviceReady, true);
      
	 var mylat = 30.726615; 
    var mylong = 76.841199; 

	function onDeviceReady()
	{
	  
    
    var onSuccess = function(position) {
       /* alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + new Date(position.timestamp)      + '\n'); */
              mylat = position.coords.latitude; console.log("mylat"+mylat);
              mylong = position.coords.longitude; console.log("mylong"+mylong);
    };
    
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
    
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
        getOffence();
    }
    
    function getOffence(){
        console.log("mylat"+mylat);
        console.log("mylong"+mylong);
        
/* ---------- Get Current Lat Long ---------------------*/

// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//



/* ----------- Close ------------------------- */
        
        window.geofence.addOrUpdate({
            id:             "69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb",
            latitude:       30.728835,
            longitude:      76.845290,
            radius:         3000, // 3km
            transitionType: TransitionType.ENTER,
            notification: {
                id:             1,
                title:          "Welcome in Net Solution",
                text:           "You just arrived to It Park Chandigarh.",
                vibrate: [1000, 500, 2000],
                openAppOnClick: true
            }
        }).then(function () { // alert('2');
            console.log('Geofence successfully added');
        }, function (reason) { // alert('3');
            console.log('Adding geofence failed', reason);
        })
        
        
        window.geofence.addOrUpdate({
            id:             "69ca1b88-6fbe-4e80-a4d4-ff4d3748acas",
            latitude:       30.728835,
            longitude:      76.845290,
            radius:         3000, // 3km
            transitionType: TransitionType.EXIT,
            notification: {
                id:             1,
                title:          "Thanks to visit in Net Solution",
                text:           "You just leave to It Park Chandigarh.",
                vibrate: [1000, 500, 2000],
                openAppOnClick: true
            }
        }).then(function () { //alert('1');
            console.log('Geofence successfully added');
        }, function (reason) {  //alert('4');
            console.log('Adding geofence failed', reason);
        });
        
        
        
        //////////////
        
        window.geofence.getWatched().then(function (geofencesJson) {
            var geofences = JSON.parse(geofencesJson);
        });
        
        //////////////
        
        
        window.geofence.onTransitionReceived = function (geofences) {
            geofences.forEach(function (geo) {  //alert('5');  alert('geo'+transitionType);
                console.log('Geofence transition detected', geo);
                
                //LocalNotificaiton(22, "Geofence transition detected "+geo.latitude);
                var lat = geo.latitude; console.log(lat);
                var longi = geo.longitude; console.log(longi);
              /*  launchnavigator.navigate(
                  [mylat, mylong],
                  [lat, longi],
                  function(success){ console.log(success);
                     // alert("Plugin success");
                  },
                  function(error){
                     // alert("Plugin error: "+ error);
                  }); */
                $state.go("app.enterofferone");
            });
        };
        
        ////////
        
        window.geofence.onNotificationClicked = function (notificationData) { alert("hi");
            console.log('App opened from Geo Notification!', notificationData);
            LocalNotificaiton(21, "notification+"+notificationData.latitude);
            /*
            launchnavigator.navigate(
              [30.715976, 76.745006],
              [lat, longi],
              function(){
                  alert("Plugin success");
              },
              function(error){
                  alert("Plugin error: "+ error);
              }
            );     */ alert("Hi");
            $state.go("app.map");
        };
        
        /////////
      
      
      function LocalNotificaiton(id, title){ console.log("In Notification duck .");
       // cordova.plugins.notification.local.clearAll(function() { }, this);
        cordova.plugins.notification.local.schedule({
            id: id,
            title: title,
            text: title//,
            //data: { beaconid:mNearestBeacon.uuid }
        });
        
        cordova.plugins.notification.local.on("click", function (notification) {
            if (notification.id == 10) {
                displayNearestBeacon();
            }
        });
    }
      
   }
    
    
    return fencing;
    
})();
app.initialize();