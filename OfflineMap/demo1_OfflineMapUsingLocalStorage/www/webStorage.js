function LocalStorageWebStorageImpl() { console.log("21");
    this.webStorageType = 'localStorage';

    this.getItem = function(name) {
        return localStorage.getItem(name);
    };

    this.setItem = function(name, value) {
        localStorage.setItem(name, value);
    };

    this.clear = function() {
        localStorage.clear();
    };
}

function WebStorageFactory() {  console.log("22");
    var webStorage = null;

    if (window.localStorage) {
        webStorage = new LocalStorageWebStorageImpl();
    } else {
        alert("Your browser don't support localStorage");
    }

    this.getWebStorage = function() {
        return webStorage;
    }
}