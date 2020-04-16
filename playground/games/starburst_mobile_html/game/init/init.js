/* global Sys */



/**
 * The Sys-namespace contains critical framework methods and classes which extend/complement the Javascript language.
 *
 * @class Sys
 * @singleton
 */
window.Sys = {};

// Detects the user agent/device type and updates the Sys object upon load.

// ( means that we self-execute the function once it has been defined
// why do we do this? because we do not need it to be called anywhere, we want it to run immediately
(function() {
    // For use within iPad developer UIWebView
    // Thanks to Andrew Hedges!
    var userAgent = navigator.userAgent,
        model,
        displayZoom;

    /**
     * Flag specifies if OpenBet mode should be switched on
     */
    Sys.openBetMode = false;
    if (/callbackurl/i.test(window.location.search) && (/integration=openbet/i.test(window.location.search) || /openbet\.user_id/i.test(window.location.search))) {
        Sys.openBetMode = true;
    }

    Sys.openBetPlayForFunMode = false;
    if (/integration=openbet/i.test(window.location.search) && !Sys.openBetMode) {
        Sys.openBetPlayForFunMode = true;
    }

    /**
     * Flag specifies if GCM mode should be switched on
     */
    Sys.isGcmEnabled = false;
    if (/openbet.gcmMode=true/i.test(window.location.search)) {
        Sys.isGcmEnabled = true;
    }

    /**
     * Flag which indicates if the used device is an iPad
     * @deprecated
     */
    Sys.isiPad = false;

    /**
     * Flag which indicates if the used device is an iPhone
     * @deprecated
     */
    Sys.isiPhone = false;

    /**
     * Flag which indicates if the used device is an iPhone using iOS 7
     * @deprecated
     */
    Sys.isiPhoneIOS7 = false;

    /**
     * Flag which indicates if the used device is an iPhone using iOS 8
     * @deprecated
     */
    Sys.isiPhoneIOS8 = false;

    /**
     * Flag which indicates if the used device is an iPhone using iOS 9
     * @deprecated
     */
    Sys.isiPhoneIOS9 = false;

    /**
     * Flag which indicates if the used device is an iPod
     * @deprecated
     */
    Sys.isiPod = false;

    /**
     * Flag which indicates if the used device is an Android device
     * @deprecated
     */
    Sys.isAndroidDevice = false;

    /**
     * Flag/object which indicates if the used device is a Samsung S-series device or not (S2, S3)
     * @deprecated
     */
    Sys.isSamsungS = false;

    /**
     * Flag which indicates if the used device is a HTC One X or not
     * @deprecated
     */
    Sys.isOneX = false;

    /**
     * Flag which indicates if the used device is a HTC One or not
     * @deprecated
     */
    Sys.isHTCOne = false;

    /**
     * Flag which indicates if the used device is running android 2.3
     * @deprecated
     */
    Sys.isAndroid23Device = false;

    /**
     * Flag which indicates if the used device is running android 4.0
     * @deprecated
     */
    Sys.isAndroid400 = false;

    /**
     * Flag which indicates if the used device is running android 4.1
     * @deprecated
     */
    Sys.isAndroid410 = false;

    /**
     * Flag which indicates if the used device is an Android tablet
     * @deprecated
     */
    Sys.isAndroidTablet = false;

    /**
     * Flag which indicates if the used device is an Android 3 tablet
     * @deprecated
     */
    Sys.isAndroid3Tablet = false;

    /**
     * Flag which indicates if the used device is a desktop
     * @deprecated
     */
    Sys.isDesktop = false;

    // The flag is set by the self-executing anonfunc below it.
    /**
     * Does the device support Webkit's 3D transforms? Inspired by Modernizr.
     * @deprecated
     */
    Sys.has3DTransforms = false;

    /**
     * Flag which indicates if the browser is Chrome
     * @deprecated
     */
    Sys.isChrome = false;

    /**
     * Flag which indicates if the browser is Chrome 28
     * @deprecated
     */
    Sys.isChrome280 = false;

    /**
     * Flag which indicates if the browser is Safari
     * @deprecated
     */
    Sys.isSafari = false;

    /**
     * Flag which indicates if the browser is Chrome for IOS
     * @deprecated
     */
    Sys.isChromeForIOS = false;

    /**
     * @deprecated
     */
    (function() {
        var doc = document,
            div = doc.createElement("div"),
            ret = false,
            st;

        if (div.style.webkitPerspective !== undefined) {
            st = doc.createElement("style");
            st.textContent = "@media (-webkit-transform-3d){#test3d{height:3px}}";
            doc.getElementsByTagName("head")[0].appendChild(st);

            // not needed?
            div.id = "test3d";

            // body does not always exist, that is why we do a check for it. If Sys is run
            // in a test environment, or where body "load" has not finished, body will not exist.
            // If we have no body, we will not have any 3d transforms.
            if (doc.body) {
                doc.body.appendChild(div);

                ret = div.offsetHeight === 3;

                st.parentNode.removeChild(st);
                div.parentNode.removeChild(div);
            }
        }
        Sys.has3DTransforms = ret;
    }());

    // Check for Chrome Browser
    // @deprecated
    if (userAgent.match(/Chrome/i)) {
        Sys.isChrome = true;

        if (userAgent.match(/Chrome\/28[\.\d]/i)) {
            Sys.isChrome280 = true;
        }
    }

    // Check for Chrome of iOS browser
    // @deprecated
    if (userAgent.match(/CriOS/i)) {
        Sys.isChromeForIOS = true;
    }

    // @deprecated
    if (userAgent.match(/Safari/i) && !Sys.isChromeForIOS) {
        Sys.isSafari = true;
    }

    // For use within normal web clients
    // @deprecated
    if (userAgent.match(/iPad/i) !== null) {
        Sys.isiPad = true;
    }
    // @deprecated
    else if ((userAgent.match(/iPod/i))) {
        Sys.isiPod = true;
    }
    // @deprecated
    else if ((userAgent.match(/iPhone/i))) {
        // Default to 3GS, 4 or 4S devices
        model = "3gs,4,4s";
        displayZoom = "standard";

        // iPhone 5, 5s & 5c
        model = (window.screen.height === 568) ? "5" : model;

        // iPhone 6, if in zoomed mode it will be detected as a iPhone 5
        model = (window.screen.height === 667) ? "6" : model;

        // iPhone 6+
        displayZoom = window.matchMedia("(-webkit-min-device-pixel-ratio: 3)").matches && model === "6" ? "zoomed" : displayZoom;
        model = window.matchMedia("(-webkit-min-device-pixel-ratio: 3)").matches ? "6+" : model;

        Sys.isiPhone = {
            series: "iPhone",
            model: model,
            displayZoom: displayZoom
        };
    }
    // @deprecated
    else if ((userAgent.match(/Android/i)) || userAgent.match(/HTC_Sensation/i)) {
        Sys.isAndroidDevice = true;

        if (userAgent.match(/Android 3[\.\d]+/i)) {
            Sys.isAndroid3Tablet = true;
            Sys.isAndroidTablet = true;
        }
        else if (!userAgent.match(/mobile/i)) {
            Sys.isAndroidTablet = true;
        }
        else if (userAgent.match(/Android 2\.3/i)) {
            Sys.isAndroid23Device = true;
        }
        else if (userAgent.match(/Android 4\.0/i)) {
            Sys.isAndroid400 = true;
        }
        else if (userAgent.match(/Android 4\.1/i)) {
            Sys.isAndroid410 = true;
        }
        else if (userAgent.match(/Android 4\.2/i)) {
            Sys.isAndroid420 = true;
        }
        else if (userAgent.match(/Android 4\.3/i)) {
            Sys.isAndroid430 = true;
        }
    }
    else {
        Sys.isDesktop = true;
    }

    // Only use ios7 scaling solution if we have an iPhone or iPod with iOS 7 and we are not in standalone(webapp mode) and we're running a safari browser
    /**
     * Flag which indicates if the device is iPhone with iOS 7
     * @deprecated
     * @ignore
     */
    Sys.isiPhoneIOS7 = (userAgent.indexOf("IEMobile") < 0) && (/(?:OS\s*[7]+_0(?:_\d+)?\s*)/i.test(userAgent) && !window.navigator.standalone) && (Sys.isiPhone || Sys.isiPod) && Sys.isSafari;

    // Only use iOS8 scaling solution if we have an iPhone or iPod with iOS 8 and we are not in standalone(webapp mode) and we're running a safari browser
    /**
     * Flag which indicates if the device is iPhone with iOS 8
     * @deprecated
     * @ignore
     */
    Sys.isiPhoneIOS8 = (/OS\s*8_/i.test(userAgent) && !window.navigator.standalone) && Sys.isiPhone && Sys.isSafari;

    // Only use iOS9 scaling solution if we have an iPhone or iPod with iOS 9 and we are not in standalone(webapp mode) and we're running a safari browser
    /**
     * Flag which indicates if the device is iPhone with iOS 9
     * @deprecated
     * @ignore
     */
    Sys.isiPhoneIOS9 = (/OS\s*9_/i.test(userAgent) && !window.navigator.standalone) && Sys.isiPhone && Sys.isSafari;

    Sys.isiOS9 = (/OS\s*9_/i.test(userAgent));

    /**
     * A flag determining of the device is an iPhone 4/4s
     * @deprecated
     */
    Sys.isIphone4Or4s = Sys.isiPhone && window.matchMedia("(-webkit-min-device-pixel-ratio: 2)").matches && window.screen.width === 320 && window.screen.height === 480;
    Sys.isIphone5Or5sOr5c = Sys.isiPhone && window.screen.width === 320 && window.screen.height === 568;

    // Check if Samsung Galaxy S2
    // @deprecated
    if ((userAgent.match(/GT-I9100/))) {
        Sys.isSamsungS = {
            series: "samsungS",
            model: "s2"
        };
    }
    // Check if Samsung Galaxy S3
    // @deprecated
    else if ((userAgent.match(/GT-I9300/))) {
        Sys.isSamsungS = {
            series: "samsungS",
            model: "s3"
        };
    }
    // Check if Samsung Galaxy S (regular, mini, active)
    // @deprecated
    else if ((userAgent.match(/GT-I9505/)) || (userAgent.match(/GT-I9506/)) || (userAgent.match(/GT-I9521/)) || (userAgent.match(/GT-I9525/))) {
        Sys.isSamsungS = {
            series: "samsungS",
            model: "s4"
        };
    }

    /**
     * Flag which indicates if the device is an iOS device
     * @deprecated
     */
    Sys.isiOSDevice = Sys.isiPad || Sys.isiPhone || Sys.isiPod;

    /**
     * Determines, and returns boolean, if device is a Iphone 3GS by screen resolution and pixel-ratio
     * @deprecated
     */
    Sys.isIphone3GS = (Sys.isiOSDevice && !window.matchMedia("(-webkit-min-device-pixel-ratio: 2)").matches && window.screen.width === 320 && window.screen.height === 480);

    /**
     * Tells if we are using a touch device or not. (http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript/4819886#4819886)
     * @deprecated Use Utils.Platform.isTouchSupported.
     */
    Sys.isTouchDevice = Boolean("ontouchstart" in window);

    /**
     * @property {String}
     * If using desktop client "click" otherwise "touchend" since it is faster than click
     * @deprecated Should be handled within user input module.
     */
    Sys.clickEvent = Sys.isTouchDevice ? "touchend" : "click";

    /**
     * @property {String}
     * If using desktop client "mousedown" otherwise "touchstart"
     * @deprecated Should be handled within user input module.
     */
    Sys.touchstartEvent = Sys.isTouchDevice ? "touchstart" : "mousedown";

    /**
     * @property {String}
     * If using desktop client "mouseup" otherwise "touchend"
     * @deprecated Should be handled within user input module.
     */
    Sys.touchendEvent = Sys.isTouchDevice ? "touchend" : "mouseup";

    /**
     * Works as expected on the desktop but on the iOS it is triggered when touching other touchable element.
     * @deprecated Should be handled within user input module.
     */
    Sys.touchoutEvent = "mouseout";

    /**
     * @property {String}
     * Event name for touch/mouse movement
     * possible values are:
     *
     * - touchmove
     * - mousemove
     * @deprecated Should be handled within user input module.
     */
    Sys.touchmoveEvent = Sys.isTouchDevice ? "touchmove" : "mousemove";

    /**
     * @property {Boolean}
     * Flag to indicate if game is loaded in iFrame
     * @deprecated Use Utils.Platform.inIframe() instead.
     */
    Sys.isInIFrame = (window !== window.parent);
}());

/**
 * Copies all properties from an object to another, overwriting properties if already existing.
 *
 * @example
 *     // declare "input" object
 *     var obj1 = {
 *         p1 : "banana",
 *         p2 : "apple"
 *     };
 *
 *     // create obj2 where we overwrite fields in obj1 with a newly defined object
 *     var obj2 = Sys.apply(obj1, {
 *         p2 : "cookie",
 *         p3 : "icecream"
 *     };
 *
 *     // output:
 *     
 *     >> obj2 = {
 *         p1 : "banana",
 *         p2 : "cookie",
 *         p3 : "icecream"
 *     };
 *
 * @param {Object} existingObject The object to copy properties to.
 * @param {Object} newProperties The new properties in an object form.
 * @returns {Object} Returns the existing object with new properties added.
 */
Sys.apply = function(existingObject, newProperties) {
    var prop;

    /*
     should use object spread instead.
     var newObj = {
        ...oldObj,
        foo: "foo"
     };
     */

    existingObject = existingObject || {};
    if (newProperties === null || !Sys.isDefined(newProperties)) {
        return existingObject;
    }

    // if both input parameters are defined and newProperties is an object
    if (existingObject && newProperties && Sys.isObj(newProperties)) {
        // copy each of the properties to existingObject
        for (prop in newProperties) {
            if (newProperties.hasOwnProperty(prop)) {
                existingObject[prop] = newProperties[prop];
            }
        }
    }
    return existingObject;
};

/**
 * Copies all properties !== undefined from one object to another, overwriting properties if already existing.
 *
 * @example
 *     // declare "input" object
 *     var obj1 = {
 *         p1 : "banana",
 *         p2 : "apple"
 *     };
 *
 *     // create obj2 where we overwrite fields in obj1 with a newly defined object
 *     var obj2 = Sys.apply(obj1, {
 *         p2 : "cookie",
 *         p3 : "icecream"
 *     };
 *
 *     // output:
 *     
 *     >> obj2 = {
 *         p1 : "banana",
 *         p2 : "cookie",
 *         p3 : "icecream"
 *     };
 *
 * @deprecated 8.0.0. Use Sys.apply. This function is similar to object spread but does not add undefined values.
 * @param {Object} receiver The object to copy properties to.
 * @param {Object} giver The new properties in an object form.
 * @returns {Object} The receiver with the new properties added.
 */
Sys.applyProperties = function(receiver, giver) {
    var keys = Object.keys(giver),
        keyCount = keys.length,
        i, key;

    for (i = -1; ++i < keyCount;) {
        key = keys[i];
        if (Sys.isDefined(giver[key])) {
            receiver[key] = giver[key];
        }
    }

    return receiver;
};

/**
 * Copies all properties from an object to another only if they do not exist in existing object.
 * Useful when setting default values in methods.
 *
 * @example
 *     // declare "input" object
 *     var obj1 = {
 *         p1 : "banana",
 *         p2 : "apple"
 *     };
 *
 *     var obj2 = Sys.applyIf(obj1, {
 *         p2 : "cookie",
 *         p3 : "icecream"
 *     };
 *
 *     // output
 *     
 *     >> obj2 = {
 *         p1 : "banana",
 *         p2 : "apple", // note: apple is still here, since "p2" was previously declared
 *         p3 : "icecream" // since "p3" did not exist, it was added here
 *     };
 *
 * @param {Object} existingObject The object to copy properties to.
 * @param {Object} newProperties The new properties in an object form.
 * @throws {Error}
 * @returns {Object} Returns the existing object with new properties added.
 */
Sys.applyIf = function(existingObject, newProperties) {
    var prop;

    /*
     should use object spread instead.
     var newObj = {
        foo: "foo",
        ...oldObj
     };
     */

    // if both input parameters are defined and newProperties is an object
    if (existingObject && newProperties && Sys.isObj(newProperties)) {
        // copy each of the properties to existingObject
        for (prop in newProperties) {
            if (newProperties.hasOwnProperty(prop) && !existingObject.hasOwnProperty(prop)) {
                existingObject[prop] = newProperties[prop];
            }
        }
    }
    else {
        throw new Error("Error in Sys.applyIf");
    }
    return existingObject;
};

/**
 * Copies all properties !== undefined from one object to another, does not overwrite existing properties.
 *
 * @example
 *     // declare "input" object
 *     var obj1 = {
 *         p1 : "banana",
 *         p2 : "apple"
 *     };
 *
 *     // create obj2 where we overwrite fields in obj1 with a newly defined object
 *     var obj2 = Sys.apply(obj1, {
 *         p2 : "cookie",
 *         p3 : "icecream"
 *     };
 *
 *     // output:
 *     
 *     >> obj2 = {
 *         p1 : "banana",
 *         p2 : "apple",
 *         p3 : "icecream"
 *     };
 *
 * @deprecated 8.0.0. Use Sys.applyIf. This function is similar to object spread but does not add undefined values.
 * @param {Object} receiver The object to copy properties to.
 * @param {Object} giver The new properties in an object form.
 * @returns {Object} The receiver with the new properties added.
 */
Sys.applyPropertiesIf = function(receiver, giver) {
    var keys = Object.keys(giver),
        keyCount = keys.length,
        i, key;

    for (i = -1; ++i < keyCount;) {
        key = keys[i];
        if (!Sys.isDefined(receiver[key]) && Sys.isDefined(giver[key])) {
            receiver[key] = giver[key];
        }
    }

    return receiver;
};

/**
 * Handy function to iterate through an object.
 *
 * @example
 *     var o1 = {"k1" : 123, "k2": "456"};
 *     this.o1Keys = [];
 *     this.o1Values = [];
 *
 *     // provide Sys.iterate with scope (else it will be executed in global scope)
 *     Sys.iterate(o1, function(key, value) {
 *          this.o1Keys.push(key);
 *          this.o1Values.push(value);
 *     }, this);
 *
 *     var o2 = {"k1" : 123, "k2": "456"};
 *     var o2Keys = [];
 *     // don't care about scope, we're only using a local variable anyway
 *     Sys.iterate(o1, function(k) {
 *          o2Keys.push(k);
 *     });
 *
 * @deprecated 8.0.0. Use native equivalent instead of Object.keys().forEach().
 * @param {Object} dict The object to iterate through.
 * @param {Function} fun The function to execute for each key/value-pair.
 * @param {Object} [scope] The scope to execute parameter "fun" in. If not specified, it will be the global scope.
 * @returns {Object} The dictionary that has been looped through.
 */
Sys.iterate = function(dict, fun, scope) {
    var i;

    // Make sure that parameters are correct
    if (!Sys.isObj(dict) || typeof fun !== "function") {
        return dict;
    }

    // loop through the object, make sure that each property exists, and execute
    // function with correct scope
    for (i in dict) {
        if (dict.hasOwnProperty(i)) {
            fun.call(scope || dict, i, dict[i]);
        }
    }

    // return input dictionary
    return dict;
};

/**
 * Handy function to iterate through an array.
 *
 * @example
 * using the second parameter: array index
 *
 *     var arr = [1,2,3];
 *     Sys.each(arr, function(value, index) {
 *          
 *     });
 *
 *     // will output:
 *     // >> array item 0 = 1
 *     // >> array item 1 = 2
 *     // >> array item 2 = 3
 *
 * providing scope to use correct variables
 *
 *     sum1 = 0; // global sum1, actually resides in window.sum1
 *
 *     // Inside class method:
 *     var arr = [1,2,3];
 *     this.sum1 = 0; // set sum1 of class
 *
 *     // provide Sys.each with scope, else it will be executed in global scope
 *     // and the global window.sum1 will be updated as Sys.each default to window
 *     // scope
 *     Sys.each(arr, function(value) {
 *          this.sum1 += value;
 *     }, this);
 *
 * Abort the loop when we encouter a certain value
 * In this case I want to have the first city which is active
 *
 *     var cities = [
 *          {
 *              name : "stockholm",
 *              active : false
 *          },{
 *              name : "rome",
 *              active : true
 *          },{
 *              name : "london"
 *              active : true
 *          }
 *     ],
 *     destination;
 *
 *     // returning false inside a Sys.each will break the loop
 *     Sys.each(cities, function(city) {
 *          if(city.active) {
 *              destination = city;
 *              return false;
 *          }
 *          // alternative version, a bit more non-readable
 *          destination = city;
 *          return !city.active;
 *     });
 *     // destination will be {city: "rome", active: true}
 *
 * @deprecated 8.0.0. Use [Array.prototype.forEach](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) where applicable.
 * @param {Array} arr The array to iterate through.
 * @param {Function} fun The function to execute for each array item. If function returns false, execution is stopped and the index is returned.
 * @param {Object} [scope] The scope to execute fun in. If not specified, it will be the global scope.
 * @returns {Array|boolean|void} The index if returns false, otherwise the array.
 */
Sys.each = function(arr, fun, scope) {
    var i,
        len;

    // Make sure that parameters are correct
    if (!Sys.isArray(arr) || typeof fun !== "function") {
        return arr;
    }

    // loop through the object and execute the function with correct scope
    for (i = 0, len = arr.length; i < len; i += 1) {
        if (fun.call(scope || arr[i], arr[i], i) === false) {
            return i;
        }
    }

    // return input array
    return arr;
};

/**
 * Checks whether an item is present inside an array.
 *
 * @example
 * Sys.contains(["foo", "bar", "baz"], "bar");  //=> true
 * Sys.contains(["foo", "bar", "baz"], "quux"); //=> false
 *
 * @deprecated 8.0.0. Use native equivalent.
 * @param {Array} xs The array to search in.
 * @param {string|number} x The value to search for.
 * @returns {boolean} If item is present.
 */
Sys.contains = function(xs, x) {
    if (Array.prototype.includes) {
        return xs.includes(x);
    }

    return xs.indexOf(x) > -1;
};

/**
 * Combinator for creating variadic functions.
 *
 * @example
 * Sys.variadic(function (x, xs)       { return [x, xs]       })(1,2,3);  //=> [1, [2, 3]]
 * Sys.variadic(function (x, y, xs)    { return [x, y, xs]    })(1,2,3);  //=> [1, 2, [3]]
 * Sys.variadic(function (x, y, z, xs) { return [x, y, z, xs] })(1,2,3);  //=> [1, 2, 3, []]
 *
 * @param {Function} f The function to make variadic.
 * @returns {Function} Variadic function.
 */
Sys.variadic = function(f) {
    var arity = f.length - 1;

    return function() {
        var args = [].slice.call(arguments, 0, arity),
            rest = [].slice.call(arguments, arity);

        return f.apply(this, args.concat([rest]));
    };
};

/**
 * Set namespace.
 *
 * @example
 * Create shallow namespace
 *
 *     Sys.ns("Tools");
 *     Tools.ai = new SomeClass();
 *
 * Create nested namespace.
 * Note that Sys.ns("Tools") is not needed when creating "Tools.Input", it will be created automatically.
 *
 *     Sys.ns("Tools.Input");
 *     Tools.Input.parser = new SomeClass();
 *
 * @param {string} ns The name of the namespace.
 * @returns {void}
 */
Sys.ns = function(ns) {
    var nsArr,
        scope,

        // always use empty string if nothing is provided
        namespace = ns || "";

    // split by dots: "Tools.Input" => ["Tools", "Input"]
    nsArr = namespace.split(".") || [];

    // Set window as scope (global)
    scope = window;

    // While the array of namespaces is not empty
    while (nsArr.length > 0) {
        // Get the first element
        namespace = nsArr.shift();

        // Create it in the current scope
        if (Sys.isEmpty(scope[namespace])) {
            scope[namespace] = {};
        }

        // If iterating, set new scope
        scope = scope[namespace];
    }
};

/**
 * Utility function that fetches a value from each object in an array of objects, and returns them in an array.
 *
 * @example
 *     var items = [
 *         {
 *             "foo" : 1,
 *             "bar" : "a"
 *         },
 *         {
 *             "foo" : 2,
 *             "bar" : "b"
 *         },
 *         {
 *             "foo" : 3,
 *             "bar" : "c"
 *         },
 *     ];
 *
 *     Sys.pluck(items, "foo"); // => [1, 2, 3]
 *     Sys.pluck(items, "bar"); // => ["a", "b", "c"]
 *
 * @param {Object[]} arr The array of objects from which to grab values. Each object in the array MUST have a field named the same as param f.
 * @param {string} f The field from which to grab values in each object.
 * @returns {Array} The array of plucked values.
 */
Sys.pluck = function(arr, f) {
    var r = [];

    // loop through the array, fetching the value from each object
    Sys.each(arr, function(item) {
        r.push(item[f]);
    });

    return r;
};

/**
 * Utility function that determines if the input parameter is empty or not.
 *
 * @example
 *     Sys.isEmpty()          === true
 *     Sys.isEmpty(null)      === true
 *     Sys.isEmpty(undefined) === true
 *     Sys.isEmpty([])        === true
 *     Sys.isEmpty({})        === false
 *     Sys.isEmpty([1])       === false
 *     Sys.isEmpty("")        === false
 *
 * @deprecated 8.0.0. Use native truthy checks instead.
 * @param {*} o The parameter to check.
 * @returns {boolean} True if parameter is empty, false otherwise.
 */
Sys.isEmpty = function(o) {
    return (o === null) || !Sys.isDefined(o) || (Sys.isArray(o) && !o.length);
};

/**
 * Utility function that determines if the input parameter is defined or not.
 *
 * @example
 *     Sys.isDefined()          === false
 *     Sys.isDefined(undefined) === false
 *     Sys.isDefined(null)      === true
 *     Sys.isDefined("")        === true
 *     Sys.isDefined(false)     === true
 *
 * Sys.isDefined is useful when checking input parameters
 *
 *     var foo = function(p1) {
 *          if(!Sys.isDefined(p1)) {
 *              return;
 *          }
 *          // ....
 *     };
 *
 * @deprecated 8.0.0. Use native typeof instead.
 * @param {*} o The parameter to check.
 * @returns {boolean} True if parameter is defined, false otherwise.
 */
Sys.isDefined = function(o) {
    // checking typeof is more secure than just comparing type, since this also handles
    // situations where o is not declared
    return typeof o !== "undefined";
};

/**
 * Utility function that returns a default value if input parameter is empty.
 *
 * @example
 *     Sys.defaultValue(null, "foo");   // => "foo"
 *     Sys.defaultValue([1, 2, 3], []); // => [1, 2, 3]
 *     Sys.defaultValue(undefined, []); // => []
 *     Sys.defaultValue(null, []);      // => []
 *
 * @deprecated 8.0.0. Use OR (||) operator instead.
 * @param {*} v The parameter to test.
 * @param {*} defaultValue The default value to return if input parameter is empty.
 * @returns {*} The input parameter if defined, else default value.
 */
Sys.defaultValue = function(v, defaultValue) {
    return Sys.isEmpty(v) ? defaultValue : v;
};

/**
 * Adds functions to the prototype of a class, overwriting existing functions if they exist.
 *
 * @deprecated 8.0.0. Use Sys.extend instead. Override is bad. Stahp.
 * @param {Object} cls The class to add/override functions to.
 * @param {Object} newProps The object of new properties/functions to add the cls.
 * @returns {void}
 */
Sys.override = function(cls, newProps) {
    if (newProps) {
        Sys.apply(cls.prototype, newProps);
    }
};

/**
 * Overrides the entire class including the constructor.
 *
 * @deprecated 8.0.0. DON'T OVERRIDE. PRETTY PLEASE. WITH SUGAR ON TOP.
 * @param {Object} originalClass The class to override.
 * @param {Object} newProperties The new class properties.
 * @returns {Object} The updated class.
 */
Sys.overrideClass = function(originalClass, newProperties) {
    var prototype,
        superclass;

    if (Sys.isObj(newProperties)) {
        Sys.apply(originalClass.prototype, newProperties);

        prototype = originalClass.prototype;
        superclass = originalClass.superclass;

        if (typeof newProperties.constructor === "function") {
            originalClass = newProperties.constructor;
        }

        originalClass.prototype = prototype;
        originalClass.superclass = superclass;
    }

    return originalClass;
};

/**
 * Utility function that tells if input parameter is an array or not.
 *
 * @deprecated 8.0.0. Use Array.isArray when checking against arrays. This falsely accepts array objects.
 * @param {*} arr Input parameter to examine.
 * @returns {boolean} Returns true if input parameter is array, false otherwise.
 */
Sys.isArray = function(arr) {
    var type = Object.prototype.toString.call(arr);

    return (type === "[object Array]" || type === "[object NodeList]" || type === "[object TouchList]" || type === "[object HTMLCollection]");
};

/**
 * Utility function that tells if input parameter is a string or not.
 *
 * @example
 *     Sys.isString()   === false
 *     Sys.isString({}) === false
 *     Sys.isString([]) === false
 *
 *     Sys.isString("") === true
 *
 * @deprecated 8.0.0. Use native typeof instead.
 * @param {*} str Parameter.
 * @returns {boolean} Returns true if the input parameter is a string, false otherwise.
 */
Sys.isString = function(str) {
    return typeof str === "string";
};

/**
 * Utility function that tells if input parameter is a number or not.
 *
 * @example
 * Sys.isNumber()     === false
 * Sys.isNumber([])   === false
 * Sys.isNumber(null) === false
 * Sys.isNumber(NaN)  === false
 *
 * Sys.isNumber(1)    === true
 * Sys.isNumber(0)    === true
 *
 * @param {*} number Parameter.
 * @returns {boolean} Returns true if the input parameter is a number, false otherwise.
 */
Sys.isNumber = function(number) {
    return !isNaN(number) && typeof number === "number";
};

/**
 * Utility function that tells if input parameter is an object or not.
 *
 * @example
 * Sys.isObj()     === false
 * Sys.isObj([])   === false
 * Sys.isObj("")   === false
 * Sys.isObj(null) === false
 * Sys.isObj({})   === true
 *
 * @param {*} obj Parameter.
 * @returns {boolean} Returns true if the input parameter is object, false otherwise.
 */
Sys.isObj = function(obj) {
    return !Sys.isArray(obj) && typeof obj === "object";
};

/**
 * Utility function that tells if input parameter is an function or not.
 *
 * @example
 * Sys.isFunc()               === false
 * Sys.isFunc({})             === false
 * Sys.isFunc("")             === false
 *
 * Sys.isFunc(function () {}) === true
 * Sys.isFunc(Sys.isFunc)     === true
 *
 * @deprecated 8.0.0. Use native typeof instead.
 * @param {*} obj Parameter.
 * @returns {boolean} Returns true if the input parameter is function, false otherwise.
 */
Sys.isFunc = function(obj) {
    return typeof obj === "function";
};

/**
 * Utility function that tells if the input parameter is an AudioBuffer or not.
 *
 * @param {*} obj Parameter.
 * @returns {boolean} Returns true if the input parameter is function, false otherwise.
 */
Sys.isAudioBuffer = function(obj) {
    return Object.prototype.toString.call(obj) === "[object AudioBuffer]";
};

/**
 * Check if obj is an instance of the provided class reference.
 *
 * @example
 * var a = new Sys.Observable();
 * Sys.isInstanceOf(a, Sys.Observable) === true
 * Sys.isInstanceOf(a, Sys.Element)    === false
 *
 * @deprecated 8.0.0. Use native instanceof instead.
 * @param {Object} obj The object to compare.
 * @param {Object} classReference The class to compare with.
 * @returns {boolean} True if obj is an instance of the class.
 */
Sys.isInstanceOf = function(obj, classReference) {
    var ret = false;

    try {
        ret = (obj instanceof classReference);
    }
    catch (e) {
        // error
    }

    return ret;
};

/**
 * Copies all properties from one object to another and returns it.
 * Unlike Sys.apply, this is an actual copy that returns a new object, not just copies properties to an existing object.
 *
 * @example
 *     var testObj = {
 *          a : "hello",
 *          b : "world!"
 *     };
 *
 *     var copy = Sys.copyObject(testObj);
 *
 *     testObj.c = "again!";
 *
 *     // testObj = {a : "hello", b : "world!", c : "again!"}
 *     // copy    = {a : "hello", b : "world!"}
 *
 * @param {Object} inputObj The object from which to copy properties.
 * @returns {Object} A new object with properties and values from the input object.
 */
Sys.copyObject = function(inputObj) {
    return Sys.apply({}, inputObj);
};

/**
 * @inheritdoc
 */
Sys.copyObj = Sys.copyObject;

/**
 * Recursively deep copies the specified object and returns the clone.
 *
 * @param {*} objToClone Object to clone.
 * @returns {*} A deep-copy of the objToClone.
 */
Sys.clone = function(objToClone) {
    // Create clone
    var clone, len;

    if (Sys.isArray(objToClone)) {
        len = objToClone.length;
        clone = [];

        // Loop through all elements in array and add clones
        for (;--len > -1;) {
            clone[len] = Sys.clone(objToClone[len]);
        }

        return clone;
    }
    else if (Sys.isObj(objToClone)) {
        clone = {};
        // Iterate through the key-value pairs in the object and add clones
        Object.keys(objToClone).forEach(function(key) {
            var value = objToClone[key];

            clone[key] = Sys.clone(value);
        });

        return clone;
    }

    return objToClone;
};

/**
 * Extends a superclass with new functionality.
 *
 * @example
 * Extending from Sys.Observable:
 *
 *     var ClassA = Sys.extend(Sys.Observable, {
 *          foo : function() {
 *              
 *          }
 *     });
 *
 * Extending from ClassA:
 *
 *     var ClassB = Sys.extend(ClassA, {
 *          foo : function() {
 *              
 *              // if we want to call to superclass, this is how to do it
 *              ClassB.superclass.foo.apply(this, arguments);
 *          }
 *     });
 *
 *     var b = new ClassB();
 *     b.foo(); // will output: "foo in ClassB", "foo in ClassA"
 *
 *
 * Adding a custom constructor: extending from Sys.Observable:
 *
 *     var ClassA = Sys.extend(Sys.Observable, {
 *          constructor : function() {
 *              
 *              ClassA.superclass.constructor.apply(this, arguments);
 *          }
 *          ,
 *          foo : function() {
 *              
 *          }
 *     });
 *
 * Adding a custom constructor: extending from ClassA:
 *
 *     var ClassB = Sys.extend(ClassA, {
 *          constructor : function() {
 *              
 *              ClassB.superclass.constructor.apply(this, arguments);
 *          }
 *          ,
 *          foo : function() {
 *              
 *              // if we want to call to superclass, this is how to do it
 *              ClassB.superclass.foo.apply(this, arguments);
 *          }
 *     });
 *
 *     var b = new ClassB(); // will output "constructor in ClassB", "constructor in ClassA"
 *     b.foo(); // will output: "foo in ClassB", "foo in ClassA"
 *
 * @param {Function} superClass The superclass to extend from.
 * @param {Object} subClass The new properties and functions that we wish to extend the superclass with. NOTE: If adding a custom constructor, you MUST call the superclass's constructor.
 * @param {string} className The name of the sub class.
 * @returns {Function} The class extended from the superClass. Note that it is a class, not an object. It needs to be instantiated with "new".
 */
Sys.extend = function(superClass, subClass, className) {
    // the object prototype constructor constructor, used later for comparison
    var standardObjectConstructor = Object.prototype.constructor,
        // copy subclass's new properties to a "overrides" variable
        overrides = subClass,
        // create a new empty function (Class)
        PrototypeClass = function() {
            // stub
        };

        // If there is a constructor specified in the subClass object, use it as the constructor function for "subClass". Else, use the constructor of superclass.
    if (overrides.constructor !== standardObjectConstructor) {
        subClass = overrides.constructor;
    }
    else {
        subClass = function() {
            superClass.apply(this, arguments);
        };
    }

    /*
     * Set the prototype of PrototypeClass to the superclass prototype to have it inherit all the methods of the superclass
     * NOTE: If error found here in debugger, make sure that you have spelled the class that you are extending correctly,
     * for example Sys.Observable is spelled with a capital "O"
     * You can also uncomment the following lines to get more helpful output
     *
     *      if(!Sys.isDefined(superClass)){
     *          throw("\nError in inheritance: subClass = " + subClass + ", superclass = " + superClass + ", class name = " + className + "\n");
     *      }
    */
    PrototypeClass.prototype = superClass.prototype;

    // Set the subClass prototype to a new instance of PrototypeClass to give this subclass a unique parent instance of the superclass
    subClass.prototype = new PrototypeClass();

    // assign the (new) subclass constructor the prototype constructor so that we don't get that of superclass due to assigning the prototype above
    subClass.prototype.constructor = subClass;

    // if superClass's prototype's constructor is just the Object constructor, set it to be the superclass constructor instead (this is true for Observable for example)
    if (superClass.prototype.constructor === standardObjectConstructor) {
        superClass.prototype.constructor = superClass;
    }

    // add a reference to subclasses superclass, to be able to get the superClass's init-function for example
    subClass.superclass = superClass.prototype;

    // copy all properties from overrides to subClass class
    Sys.override(subClass, overrides);

    

    return subClass;
};

/**
 * Clamps the value so that the value is kept within: min <= value <= max.
 *
 * @example
 *     Sys.clamp({value : -10, min: 0, max: 100}); // =>   0
 *     Sys.clamp({value :  50, min: 0, max: 100}); // =>  50
 *     Sys.clamp({value : 100, min: 0, max: 100}); // => 100
 *
 * @param {Object} cfg The configuration object.
 * @param {number} cfg.value The value.
 * @param {number} cfg.min The minimum acceptable value.
 * @param {number} cfg.max The maximum acceptable value.
 * @returns {number} Number.
 */
Sys.clamp = function(cfg) {
    

    if (cfg.value < cfg.min) {
        return cfg.min;
    }
    else if (cfg.value > cfg.max) {
        return cfg.max;
    }

    return cfg.value;
};

/**
 * Constructs a range between the start and stop values, and with the given step.
 * It also works for building decreasing ranges.
 *
 * @example
 *     Sys.range(0, 100, 10); // => [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
 *     Sys.range(100, 0, 10); // => [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]
 *     Sys.range(0, 10);      // => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 *
 * @param {number} start Start.
 * @param {number} stop Stop.
 * @param {number} [step=1] Step.
 * @returns {Array} Array.
 */
Sys.range = function(start, stop, step) {
    var result = [start],
        reverse = start > stop,
        newStep,
        nextValue;

    newStep = reverse ? -1 * Math.abs(step) || -1 : Math.abs(step) || 1;
    nextValue = start + newStep;

    while (reverse ? nextValue >= stop : nextValue <= stop) {
        result.push(nextValue);
        nextValue = nextValue + newStep;
    }

    return result;
};

/**
 * Reduces a collection down to a single value.
 *
 * @example
 * Calculate the sum of all the values in an array
 *    Sys.reduce([1,2,3], function (a, b) {return a + b;}); // => 6
 *
 * @deprecated 8.0.0. Use native Array.reduce instead.
 * @param {Array} xs Array to reduce.
 * @param {Function} f Iterator.
 * @param {*} [acc=xs[0]] Accumulator.
 * @returns {*} Value.
 */
Sys.reduce = function(xs, f, acc) {
    var i,
        len;

    if (Array.prototype.reduce) {
        return xs.reduce(f, acc);
    }

    if (!Sys.isDefined(acc)) {
        acc = xs[0];
        xs = xs.slice(1);
    }

    for (i = 0, len = xs.length; i < len; i++) {
        acc = f(acc, xs[i], i, xs);
    }
    return acc;
};

/**
 * Produces a new array of values by mapping each value in list (xs) through a transformation function (f).
 *
 * @example
 * Calculate the square root of all the values in an array
 *     Sys.map([1, 4, 9], Math.sqrt); // => [1, 2, 3]
 *
 * @deprecated 8.0.0. Use native Array.map instead.
 * @param {Array} xs Array to map.
 * @param {Function} f Iterator.
 * @returns {Array} Mapped array.
 */
Sys.map = function(xs, f) {
    if (Array.prototype.map) {
        return xs.map(f);
    }

    return xs.reduce(function(acc, x, i) {
        return acc.concat(f(x, i, xs));
    }, []);
};

/**
 * Looks through each value in the list (xs), returning a list of all the values that pass a truth test (f).
 *
 * @example
 * Filter out all negative values
 *     Sys.filter([-1, 5, -10, 7, 0, 8, 1], function (a) { return a >= 0; }); // => [5, 7, 0, 8, 1]
 *
 * @deprecated 8.0.0. Use native Array.filter instead.
 * @param {Array} xs Array to filter.
 * @param {Function} f Iterator.
 * @returns {Array} Filtered array.
 */
Sys.filter = function(xs, f) {
    if (Array.prototype.filter) {
        return xs.filter(f);
    }

    return xs.reduce(function(acc, x, i) {
        if (f(x, i, xs)) {
            return acc.concat(x);
        }
        return acc;
    }, []);
};

/**
 * Returns the first element of the array that passes the predicate function.
 *
 * Note: This is needed as Internet Exploder still does not support it...
 *
 * @example
 * Find a positive number in an array
 *     Sys.find([-1, -6, -10, 0, 10, -4, 9], function (a) { return a > 0; }); // => 10
 *
 * @param {Array} array Array.
 * @param {Function} predicate Predicate.
 * @returns {*} Retrieved value.
 */
Sys.find = function(array, predicate) {
    var i,
        len;

    if (Array.prototype.find) {
        return array.find(predicate);
    }

    for (i = 0, len = array.length; i < len; i++) {
        if (predicate(array[i])) {
            return array[i];
        }
    }

    return undefined;
};
/* global Sys */

/**
 * The Event Handler stores listeners and dispatches events to all the listeners for a given event.
 *
 * @class Sys.EventHandler
 */
Sys.EventHandler = function() {
    this.EVENTS = {};
};

Sys.EventHandler.prototype = {

    /**
     * Enables history.
     * @type {boolean}
     */
    DEBUG: false,

    /**
     * Enables add and remove function log.
     * @type {boolean}
     */
    LOG_FUNC: false,

    /**
     * Enables dispatch event log.
     * @type {boolean}
     */
    LOG: false,

    /**
     * Enable warning logs. Available only in debug mode.
     * @type {boolean}
     */
    LOG_WARN: false,

    /**
     * Filters log. Defaults to: /(?:)/
     * @type {RegExp}
     */
    LOG_FILTER: /(?:)/,

    /**
     * Storing event history.
     * @type {Array}
     */
    history: [],

    /**
     * Shows history of all events sent through EventHandler. Only for debug purposes.
     *
     * @example
     * EventHandler.toString();            // returns all events
     * EventHandler.toString(/request:/);  // returns all requests
     *
     * @param {RegExp} [pattern] Regular expression for filtering history.
     * @returns {string} String.
     */
    toStringHistory: function(pattern) {
        var me = this,
            h = "",
            p,
            regexp = pattern || new RegExp();

        Sys.each(me.history, function(item) {
            try {
                p = JSON.stringify(item.params);
            }
            catch (e) {
                p = item.params;
            }

            if (regexp.test(item.event)) {
                h += item.event + " (" + item.listeners + ")" + " -> " + p + "\r\n";
            }
        });

        return h;
    },

    /**
     * Adds the listener for a given event.
     *
     * @param {Function} listener Event listener.
     * @param {string} event Event name.
     * @returns {void}
     */
    addListener: function(listener, event) {
        var me = this;

        

        if (!Sys.isDefined(me.EVENTS[event])) {
            me.EVENTS[event] = [];
        }

        if (!Sys.contains(me.EVENTS[event], listener)) {
            me.EVENTS[event].push(listener);
        }
    },

    /**
     * Removes the listener for a given event.
     *
     * @param {Object} listener The class instance that listens to the event.
     * @param {string} event The name of the event.
     * @returns {void}
     */
    removeListener: function(listener, event) {
        var listeners = this.EVENTS[event] || [],
            index = listeners.indexOf(listener);

        

        if (index >= 0) {
            listeners[index] = "removed";
        }
    },

    /**
     * Dispatches the event with the optional arguments to all listeners.
     */
    dispatchEvent: Sys.variadic(function(event, parameters) {
        var listeners = this.EVENTS[event] || [],
            listenerCount = listeners.length - 1,
            i,
            listener,
            handler;

        

        for (i = listenerCount; i >= 0; i--) {
            listener = listeners[i];
            handler = Sys.isObj(listener) ? listener.handlers[event] : null;

            if (handler) {
                handler.apply(listener, parameters);
            }

            
        }

        

        for (i = listenerCount; i >= 0; i--) {
            if (listeners[i] === "removed") {
                listeners.splice(i, 1);
                ++i;
            }
        }
    }),

    /**
     * Moves the listener to the first place in the array for each event it listens to.
     *
     * @param {Object} listener The listener.
     * @returns {void}
     */
    sortEventListeners: function(listener) {
        var events = this.EVENTS,
            eventKeys = Object.keys(events),
            numEvents = eventKeys.length,
            event,
            index,
            i;

        // Process each event
        for (i = -1; ++i < numEvents;) {
            event = events[eventKeys[i]];
            index = event.indexOf(listener);

            // If the listener is active for this event or is already the first element
            if (index > 0) {
                // Remove the listener from the array
                event.splice(index, 1);

                // Add the listener in the beginning of the array
                event.unshift(listener);
            }
        }
    }
};

window.EventHandler = new Sys.EventHandler();
/* global Sys, EventHandler */
Sys.ns("Sys");

/**
 * The Observable class adds functionality for listening to and firing events.
 *
 * @class Sys.Observable
 * @param {Object} config Config object.
 */
Sys.Observable = function(config) {
    /**
     * @cfg [eventHandler=EventHandler]
     */
    this.eventHandler = Sys.isDefined(config) && Sys.isDefined(config.eventHandler) ? config.eventHandler : EventHandler;
    this.handlers = {};
};

Sys.Observable.prototype = {

    /**
     * Fire the event with the optional arguments.
     *
     * @protected
     * @returns {void}
     */
    fireEvent: function() {
        if (arguments.length === 0) {
            return;
        }

        this.eventHandler.dispatchEvent.apply(this.eventHandler, arguments);
    },

    /**
     * Add listeners for multiple events at the same time.
     *
     * @example
     * this.on({
     *     eventA: this.eventHandlerA,
     *     eventB: this.eventHandlerB
     * });
     *
     * @protected
     * @param {Object} config The configuration containing event names as keys and execute functions as values.
     * @returns {void}
     */
    on: function(config) {
        var me = this,
            events = Object.keys(config),
            numEvents = events.length,
            event,
            i = 0;

        while (i < numEvents) {
            event = events[i];
            me.addListener(event, config[event]);
            ++i;
        }
    },

    /**
     * Removes all listeners.
     *
     * @returns {void}
     */
    off: function() {
        var me = this,
            events = Object.keys(me.handlers),
            numEvents = events.length,
            event,
            i = 0;

        while (i < numEvents) {
            event = events[i];
            me.removeListener(event);
            ++i;
        }
    },

    /**
     * Start listening to the provided event.
     *
     * @protected
     * @param {string} event The event to listen to.
     * @param {Function} func The function executed when the event is dispatched.
     * @returns {void}
     */
    addListener: function(event, func) {
        this.handlers[event] = func;
        this.eventHandler.addListener(this, event);
    },

    /**
     * Remove the listener for the provided event.
     *
     * @protected
     * @param {string} event The event to stop listening to.
     * @returns {void}
     */
    removeListener: function(event) {
        this.eventHandler.removeListener(this, event);
        this.handlers[event] = undefined;
    },

    /**
     * Returns whether or not the event is being listened to or not.
     *
     * @protected
     * @param {string} event The event.
     * @returns {boolean} If event is listened to.
     */
    hasListener: function(event) {
        return Sys.isDefined(this.handlers[event]);
    }
};
/* global Sys */
Sys.ns("Sys");

/**
 * Wraps a DOM Element in a JS Object.
 *
 * @class Sys.Element
 * @extends Sys.Observable
 */
Sys.Element = {

    /**
     * Creates a Sys.Element that contains a DOM element.
     * All other properties (not listed below) on the object will be stored as an attribute on the element.
     *
     * @param {string|Object|HTMLElement} config The string, existing DOM element or object that defines the DOM element.
     * @param {string} [config.tag] The element tag type.
     * @param {string} [config.cls] The element class(es).
     * @param {string} [config.innerHTML] The elements inner html.
     * @param {string} [config.textContent] The elements inner text.
     * @param {string} [config.renderTo] An element id to render this element to.
     * @throws {Error}
     * @returns {void}
     */
    constructor: function(config) {
        var me = this;

        Sys.Element.superclass.constructor.apply(this, arguments);

        this.DOMEvents = {};
        this.el = this.setupElement(config);

        if (!this.el) {
            throw new Error("Invalid instantiation of Sys.Element, invalid input, needs element string or object");
        }

        // Adding default behaviour for webkitTransitionEnd event - if stopPropagation is not enabled by default
        // all webkitTransitions will bubble up to the document object by default and potentially trigger
        // webkitTransitionEnd listeners on higher levels of the application. For example - the settingsWindowEndToggling
        // event is fired using a listener on the uicard DOM object and would also fire on all reel transitions if this
        // default handler would not be present.
        this.el.addEventListener("transitionend", function(e) {
            if (me.transitionEnd) {
                me.transitionEnd.apply(me, arguments);
            }
            e.stopPropagation();
        }, false);

        if (document.getElementById(config.renderTo)) {
            document.getElementById(config.renderTo).appendChild(this.el);
        }
    },

    /**
     * @private
     * @param {string|Object|HTMLElement} config Configuration parameter.
     * @returns {?HTMLElement} DOM element.
     */
    setupElement: function(config) {
        this.el = null;

        if (!config) {
            return null;
        }
        else if (typeof config === "string") {
            this.el = document.createElement(config);
        }
        else if (config instanceof Element) {
            this.el = config;
        }
        else if (Sys.isObj(config)) {
            this.el = document.createElement(config.tag);

            Object
                .keys(config)
                .forEach(function(key) {
                    var value = config[key];

                    if (key === "cls") {
                        this.el.setAttribute("class", value);
                    }
                    else if (key === "innerHTML") {
                        this.el.innerHTML = value;
                    }
                    else if (key === "textContent") {
                        this.el.textContent = value;
                    }
                    else if (key === "onClick") {
                        this.el.addEventListener("click", value);
                    }
                    else if (key === "items") {
                        value.forEach(function(item) {
                            this.add(item);
                        }, this);
                    }
                    else if (key === "transitionend" && typeof value === "function") {
                        this.transitionEnd = value;
                    }
                    else if (key !== "renderTo" && key !== "tag") {
                        this.el.setAttribute(key, value);
                    }
                }, this);
        }

        return this.el;
    },

    /**
     * Returns the Sys.Element DOM element.
     *
     * @public
     * @returns {HTMLElement} The DOM element.
     */
    getEl: function() {
        return this.el;
    },

    /**
     * Returns the Sys.Element's DOM children.
     *
     * @protected
     * @returns {HTMLElement[]} The DOM elements as an array.
     */
    getChildren: function() {
        // returns a node list, we need to make a copy to not use a reference
        // since this can change later on when the children are modified
        return Array.prototype.slice.call(this.getEl().childNodes, 0);
    },

    /**
     * Appends a Sys.Element to another (this) Sys.Element.
     *
     * @protected
     * @param {Sys.Element} el The Sys.Element to add to this Sys.Element.
     * @returns {Sys.Element} The Sys.Element that was added.
     */
    add: function(el) {
        this.el.appendChild(el.getEl());
        el.parent = this;
        return el;
    },

    /**
     * Appends a Sys.Element to this Sys.Element before another Sys.Element.
     *
     * @protected
     * @param {Sys.Element} newEl The new Sys.Element to add.
     * @param {Sys.Element} beforeEl The Sys.Element to add before.
     * @returns {Sys.Element} The Sys.Element that was added.
     */
    addBefore: function(newEl, beforeEl) {
        this.el.insertBefore(newEl.getEl(), beforeEl.getEl());
        newEl.parent = this;
        return newEl;
    },

    /**
     * Appends an array of nodes to another (this) Sys.Element.
     *
     * @protected
     * @param {HTMLElement[]} children The DOM elements to add to this Sys.Element's HTMLElement.
     * @returns {void}
     */
    addChildren: function(children) {
        children.forEach(function(child) {
            this.el.appendChild(child);
        }, this);
    },

    /**
     * Removes a Sys.Element from another (this) Sys.Element.
     *
     * @protected
     * @param {Sys.Element} el The Sys.Element to remove from this Sys.Element.
     * @returns {Sys.Element} The Sys.Element that was removed.
     */
    remove: function(el) {
        var child = el.getEl();

        if (this.el === child.parentNode) {
            this.el.removeChild(child);
        }

        return el;
    },

    /**
     * Removes all DOM elements from this object.
     *
     * @protected
     * @returns {void}
     */
    removeAll: function() {
        while (this.el.firstChild) {
            this.el.removeChild(this.el.firstChild);
        }
    },

    /**
     * Adds a listener to an event of this object. Also adds event to DOM element.
     *
     * @protected
     * @param {string} event The event to listen to.
     * @param {Function} func The function executed when the event is dispatched.
     * @param {Object} [thisArg] The scope in which the event will be executed. If omitted, it defaults to the object that fired the event.
     * @param {Object} [options] Options object.
     * @param {boolean} [options.single=false] True if only execute listener once.
     * @returns {void}
     */
    addListener: function(event, func, thisArg, options) {
        var me = this,
            scope = thisArg || this.el,
            config = options || {},
            wrappedFn = function() {
                func.apply(scope);
            };

        Sys.Element.superclass.addListener.apply(this, arguments);

        if (config.single) {
            wrappedFn = function() {
                me.removeListener(event, func, scope);
                func.call(scope);
            };
        }

        this.DOMEvents[event] = this.DOMEvents[event] || [];

        this.DOMEvents[event].push({
            event: event,
            func: func,
            scope: scope,
            wrappedFn: wrappedFn
        });

        this.el.addEventListener(event, wrappedFn, false);
    },

    /**
     * Removes a listener from an event on this object.
     *
     * @protected
     * @param {string} event The event to listen to.
     * @param {Function} func The bound function executed when the event is dispatched.
     * @param {Object} [thisArg] The scope in which the event will be executed. If omitted, it defaults to the object that fired the event.
     * @returns {void}
     */
    removeListener: function(event, func, thisArg) {
        var scope = thisArg || this.el;

        Sys.Element.superclass.removeListener.apply(this, arguments);

        this.DOMEvents[event].forEach(function(evt, index) {
            if (evt.event === event && evt.func === func && evt.scope === scope) {
                this.DOMEvents[event].splice(index, 1);
                this.el.removeEventListener(event, evt.wrappedFn, false);
                return true;
            }
            return false;
        }, this);
    },

    /**
     * Returns the offset of the Sys element relative to the entire document.
     * Uses Sys.utils.getElOffset.
     *
     * @protected
     * @returns {Object} An object with properties "left" and "top" to indicate the offset in pixels.
     */
    getOffset: function() {
        return Sys.utils.getElOffset(this.el);
    },

    /**
     * Appends a Sys.Element as the first child onto the parent container (as opposed to Sys.Element.add() which always adds the element as the last child of the parent).
     *
     * @protected
     * @param {Sys.Element} newEl The Sys.Element to add to this Sys.Element.
     * @returns {Sys.Element} The Sys.Element that was added.
     */
    addAsFirst: function(newEl) {
        this.el.insertBefore(newEl.el, this.el.firstChild);
        return newEl;
    },

    /**
     * Calls Sys.utils.hasCSSClass with this.el and the given CSS class as arguments.
     *
     * @protected
     * @param {string} className The class to look for.
     * @returns {boolean} If element has class.
     */
    hasClass: function(className) {
        return Sys.utils.hasCSSClass(this.el, className);
    },

    /**
     * Calls Sys.utils.addCSSClass with this.el and the given CSS class as arguments.
     *
     * @protected
     * @param {string} className The class to add.
     * @returns {void}
     */
    addClass: function(className) {
        Sys.utils.addCSSClass(this.el, className);
    },

    /**
     * Calls Sys.utils.removeCSSClass with this.el and the given CSS class as arguments.
     *
     * @protected
     * @param {string} className The class to remove.
     * @returns {void}
     */
    removeClass: function(className) {
        Sys.utils.removeCSSClass(this.el, className);
    },

    /**
     * Calls Sys.utils.replaceCSSClass with this.el and the given CSS classes as arguments.
     *
     * @protected
     * @param {string} oldClass The class to remove.
     * @param {string} newClass The class to add.
     * @param {boolean} [force=false] Flag indicating if the new class should be added even if the old one was not found.
     * @returns {void}
     */
    replaceClass: function(oldClass, newClass, force) {
        Sys.utils.replaceCSSClass(this.el, oldClass, newClass, force);
    },

    /**
     * Sets the CSS class string for the element.
     *
     * @protected
     * @param {string} classNames The CSS class string.
     * @returns {void}
     */
    setClass: function(classNames) {
        this.el.className = classNames;
    },

    /**
     * Add or remove one class from the element.
     *
     * @example
     *      var e = new Sys.Element("div");
     *      e.toggleClass("element--open");
     *
     * @protected
     * @param {string} className The CSS class string.
     * @param {boolean} [state] A boolean value to determine whether the class should be added or removed.
     * @returns {void}
     */
    toggleClass: function(className, state) {
        if (typeof state === "boolean") {
            if (state) {
                this.addClass(className);
            }
            else {
                this.removeClass(className);
            }
        }
        else if (this.hasClass(className)) {
            this.removeClass(className);
        }
        else {
            this.addClass(className);
        }
    }
};

Sys.Element.hasCls = Sys.Element.hasCSSClass = Sys.Element.hasClass;
Sys.Element.addCls = Sys.Element.addCSSClass = Sys.Element.addClass;
Sys.Element.removeCls = Sys.Element.removeCSSClass = Sys.Element.removeClass;
Sys.Element.replaceCls = Sys.Element.replaceCSSClass = Sys.Element.replaceClass;
Sys.Element.setCSSClassString = Sys.Element.setClass;
Sys.Element.toggleCls = Sys.Element.toggleClass;

Sys.Element = Sys.extend(Sys.Observable, Sys.Element, "Sys.Element");
/* global Sys */
Sys.ns("Sys.Math");

/**
 * Contains wrapper functions for standard math functions.
 *
 * @class Sys.Math
 * @static
 */
Sys.apply(Sys.Math, {

    /**
     * Calculates the hypotenuse.
     *
     * @static
     * @memberof Sys.Math
     * @param {number} x Length of side 1.
     * @param {number} y Length of side 2.
     * @returns {number} Hypotenuse.
     */
    hypotenuse: function(x, y) {
        return Math.sqrt(x * x + y * y);
    },

    /**
     * Converts radians to degrees.
     *
     * @static
     * @memberof Sys.Math
     * @param {number} rad Radians.
     * @returns {number} Degrees.
     */
    radToDeg: function(rad) {
        return rad * (180 / Math.PI);
    },

    /**
     * Converts degrees to radians.
     *
     * @static
     * @memberof Sys.Math
     * @param {number} deg Degrees.
     * @returns {number} Radians.
     */
    degToRad: function(deg) {
        return Animation.utils.degToRad(deg, 10);
    },

    /**
     * Cosine for degrees.
     *
     * @static
     * @memberof Sys.Math
     * @param {number} deg Degrees.
     * @returns {number} Cosine for deg.
     */
    cos: function(deg) {
        return Math.cos(this.degToRad(deg));
    },

    /**
     * Arc Cosine for degrees.
     *
     * @static
     * @memberof Sys.Math
     * @param {number} x The x-position.
     * @returns {number} Degrees.
     */
    acos: function(x) {
        return this.radToDeg(Math.acos(x));
    },

    /**
     * Sine for degrees.
     *
     * @static
     * @memberof Sys.Math
     * @param {number} deg Degrees.
     * @returns {number} Sine for deg.
     */
    sin: function(deg) {
        return Math.sin(this.degToRad(deg));
    },

    /**
     * Returns the arctangent of the quotient of its arguments in degrees.
     *
     * @static
     * @memberof Sys.Math
     * @param {number} y Y-coordinate.
     * @param {number} x X-coordinate.
     * @returns {number} Arctangent in degrees.
     */
    atan2: function(y, x) {
        return this.radToDeg(Math.atan2(y, x));
    },

    /**
     * Get a random number between min (inclusive) and max (exclusive).
     *
     * @static
     * @memberof Sys.Math
     * @param {number} min The lower bounds.
     * @param {number} max The upper bounds.
     * @returns {number} The random number.
     */
    randomBetween: function(min, max) {
        return min + (max - min) * Math.random();
    },

    /**
     * Get a random integer between and inclusive min and max.
     *
     * @static
     * @memberof Sys.Math
     * @param {number} min The lower bounds.
     * @param {number} max The upper bounds.
     * @returns {number} The random number.
     */
    randomIntBetween: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Returns a random number between the given ranges.
     * The random number can be including the min and exclusive the max in each range.
     *
     * @example
     * // will return a number between 1 and 2 OR between 4 and 5
     * Sys.Math.randomBetweenRanges([1, 2], [4, 5]);
     *
     * @example
     * param {number[]} arguments You can specify as many ranges as you'd like.
     *
     * @static
     * @memberof Sys.Math
     * @returns {number} Random number.
     */
    randomBetweenRanges: function() {
        var me = this,
            ranges = Array.prototype.slice.call(arguments),
            range = ranges[me.randomIntBetween(0, ranges.length - 1)];

        return me.randomBetween(range[0], range[1]);
    },

    /**
     * Returns a random integer between and including the given ranges.
     *
     * @example
     * // will return 1, 2, 4 or 5.
     * Sys.Math.randomIntBetweenRanges([1, 2], [4, 5]);
     *
     * @example
     * param {number[]...} arguments You can specify as many ranges as you'd like.
     *
     * @static
     * @memberof Sys.Math
     * @returns {number} Random number.
     */
    randomIntBetweenRanges: function() {
        var me = this;

        return Math.round(me.randomBetweenRanges.apply(me, arguments));
    },

    /**
     * Calculates the absolute difference (i.e. the distance on the real line) between two numbers.
     *
     * @static
     * @memberof Sys.Math
     * @param {number} number1 Starting number.
     * @param {number} number2 Finishing number.
     * @returns {number} Absolute number.
     */
    absoluteDifference: function(number1, number2) {
        return Math.abs(number1 - number2);
    }
});
/* global Sys*/
/**
 * An implementation of JavaScript Deferred/Promise design pattern.
 *
 * Allows for an easier way to chain asynchronous callbacks. You can attach multiple handlers for when a Deferred
 * is resolved or rejected. After creating a Deferred object you can set up which object that you want to wait for
 * and attach handlers for what happens when the object(s) that you listen to resolve or reject.
 *
 * @example
 *     // Example
 *     //
 *     // A simple example where we wait for a JavaScript file to be loaded
 *     //
 *     var deferred = new Sys.Deferred();
 *     var jsLoad = Sys.utils.loadJs({
 *          url : "src/javascript/file.js"
 *     });
 *     deferred.when(jsLoad).then(function() {
 *          initJsFile();
 *     });
 *
 *     // Example
 *     //
 *     // Then method can also be chained and several then methods can be added.
 *     //
 *     var deferred = new Sys.Deferred();
 *     deferred.when(Sys.utils.loadJs({
 *          url : "src/javascript/file.js"
 *     })).then(function() {
 *          initJsFile();
 *     }).then(function() {
 *         doSomethingElse();
 *     });
 *
 *     // Example
 *     //
 *     // There is also the possibility to add error handling to the function handlers.
 *     // We assume that searchForNode has implemented the Deferred interface
 *     //
 *     var deferred = new Sys.Deferred();
 *     deferred.when(searchForNode()).then(function() {
 *          // only called when load is successful
 *          modifyNode();
 *     }).fail(function() {
 *          // only called when load is unsuccessful
 *         handleError();
 *     }).always(function() {
 *          // always executed
 *         proceed();
 *     });
 *
 * @class Sys.Deferred
 */
Sys.Deferred = function() {
    this.whenList = [];
    this.thenList = [];
    this.failList = [];
    this.alwaysList = [];
    this.states = {
        pending: 0,
        resolved: 1,
        rejected: 2
    };
    this.resolved = 0;
    this.rejected = 0;
    this.args = [];
    this.state = this.states.pending;
};

Sys.Deferred.prototype = {

    /**
     * Takes in a single deferred object and registers.
     *
     * @param {...Sys.Deferred|Sys.Deferred[]} deferred Either several Deferred objects as comma-separated parameters or Deferred objects in an array.
     * @returns {Sys.Deferred} This Deferred.
     */
    when: function(deferred) {
        // start by determining if (a) that it is a comma-separated list of Deferreds or (b) the input argument is an array of Deferreds
        // case a:
        // new Sys.Deferred().when(ajaxCall1, ajaxCall2, ajaxCall3);
        // case b:
        // new Sys.Deferred().when([ajaxCall1, ajaxCall2, ajaxCall3]);
        var deferreds;

        if (Sys.isArray(deferred)) {
            deferreds = deferred;
        }
        else {
            deferreds = Array.prototype.slice.call(arguments, 0);
        }

        // for each deferred, register a handler to whenever an update is made to the state of it
        // we handle if the deferred has been rejected or resolved in onDeferredUpdated
        Sys.each(deferreds, function(d) {
            this.whenList.push(d);

            d.always(function() {
                this.onDeferredUpdated();
            }, this);
        }, this);

        // update status when all deferreds have been added. When doing this we make sure if for some reason
        // all deferreds that have been added are resolved or rejected we can set the correct state on this Deferred
        // immediately since d.always above will not ever be called on.
        this.onDeferredUpdated();

        return this;
    },

    /**
     * Add a function that will execute when the method returns as finished successfully.
     *
     * @param {Function} f The function to execute.
     * @param {Object} [scope=window] The scope to execute the function in.
     * @returns {Sys.Deferred} This Deferred.
     */
    then: function(f, scope) {
        scope = scope || window;
        if (this.isWaiting()) {
            this.thenList.push({
                fn: f,
                scope: scope
            });
        }
        else if (this.isResolved()) {
            f.call(scope);
        }
        return this;
    },

    /**
     * Add a function that will execute when the method returns as failed.
     *
     * @param {Function} f The function to execute.
     * @param {Object} [scope=window] The scope to execute the function in.
     * @returns {Sys.Deferred} This Deferred.
     */
    fail: function(f, scope) {
        scope = scope || window;
        if (this.isWaiting()) {
            this.failList.push({
                fn: f,
                scope: scope
            });
        }
        else if (this.isRejected()) {
            f.call(scope);
        }
        return this;
    },

    /**
     * Add a function that will execute no matter if method fails or succeeds.
     *
     * @param {Function} f The function to execute.
     * @param {Object} [scope=window] The scope to execute the function in.
     * @returns {Sys.Deferred} This Deferred.
     */
    always: function(f, scope) {
        scope = scope || window;
        if (this.isWaiting()) {
            this.alwaysList.push({
                fn: f,
                scope: scope
            });
        }
        else {
            f.call(scope);
        }
        return this;
    },

    /**
     * Resolve the deferred, setting state resolved on it.
     *
     * @returns {void}
     */
    resolve: function() {
        this.state = this.states.resolved;
        this.onStateUpdated();
    },

    /**
     * Resolves the deferred and passes along a parameter that will be forwarded to any "then" and "always" handelers.
     *
     * @param {Array} args Arguments as an array.
     * @returns {void}
     */
    resolveWith: function(args) {
        this.args = args;
        this.resolve();
    },

    /**
     * Reject the deferred, setting state rejected on it.
     *
     * @returns {void}
     */
    reject: function() {
        if (typeof this.fallbackFilter === "function") {
            this.onFallback();
        }
        else {
            this.state = this.states.rejected;
            this.onStateUpdated();
        }
    },

    /**
     * Rejects the deferred and passes along a parameter that will be forwarded to any "fail" and "always" handelers.
     *
     * @param {Array} args Arguments as an array.
     * @returns {void}
     */
    rejectWith: function(args) {
        this.args = args;
        this.reject();
    },

    /**
     * Answers if Deferred is rejected or not.
     *
     * @returns {boolean} Returns true if Deferred is rejected, false otherwise.
     */
    isRejected: function() {
        return (this.state === this.states.rejected);
    },

    /**
     * Answers if Deferred is resolved or not.
     *
     * @returns {boolean} Returns true if Deferred is resolved, false otherwise.
     */
    isResolved: function() {
        return (this.state === this.states.resolved);
    },

    /**
     * Setup a fallback option (a new deferred) if the deferred is about to be rejected. The status of the
     * fallback determines the status of the original deferred.
     *
     * @example
     *     var A = new Sys.Deferred();
     *
     *     A.fallback(function() {
     *       return new Sys.Deferred();
     *     });
     *
     *     A.reject();
     *     
     *     > false
     *
     *     B.resolve();
     *     
     *     > true
     *     
     *     > true
     *
     * @param {Function} fallback The function to run when the deferred is rejected.
     * @returns {Sys.Deferred} This Deferred.
     */
    fallback: function(fallback) {
        this.fallbackFilter = fallback;

        return this;
    },

    /**
     * Determines the status of the original deferred based on the status of the new one.
     *
     * @private
     * @returns {void}
     */
    onFallback: function() {
        var me = this,
            deferred = me.fallbackFilter.call(this, this.args);

        if (Sys.isObj(deferred)) {
            deferred
                .done(function() {
                    me.resolveWith(deferred.args);
                })
                .fail(function() {
                    me.rejectWith(deferred.args);
                });
        }
    },

    /**
     * Called when a Deferred registered in when() is either resolved or rejected. If all Deferreds have been resolved or rejected this method will reject or resolve this Deferred.
     *
     * @private
     * @returns {void}
     */
    onDeferredUpdated: function() {
        var rejected = 0,
            resolved = 0,
            args;

        Sys.each(this.whenList, function(deferred) {
            if (deferred.isRejected()) {
                rejected += 1;
            }
            else if (deferred.isResolved()) {
                resolved += 1;
            }
        }, this);

        this.resolved = resolved;
        this.rejected = rejected;

        if (!this.isWaiting()) {
            args = [];
            Sys.each(this.whenList, function(deferred) {
                args = args.concat(deferred.args);
            });

            if (rejected > 0) {
                this.rejectWith(args);
            }
            else if (resolved > 0) {
                this.resolveWith(args);
            }
        }
    },

    /**
     * Answers the question if we are still waiting for deferreds to be resolved or not.
     *
     * @private
     * @returns {boolean} True if there are still unresolved deferreds we are waiting for, false if all are either resolved or rejected.
     */
    isWaiting: function() {
        // true if we do not have any whens
        // true if there are less (resolved and rejected) than whens we are waiting for
        return !this.whenList.length || ((this.resolved + this.rejected) < this.whenList.length);
    },

    /**
     * Executed when a state has been updated internally. Runs either the "fail" or "then" methods, plus the "always" methods.
     *
     * @private
     * @returns {void}
     */
    onStateUpdated: function() {
        var list = [],
            def,
            i,
            numItems;

        if (this.state === this.states.resolved) {
            list = this.thenList.concat(this.alwaysList);
        }
        else if (this.state === this.states.rejected) {
            list = this.failList.concat(this.alwaysList);
        }

        numItems = list.length;

        for (i = -1; ++i < numItems;) {
            def = list[i].fn.apply(list[i].scope, this.args);

            if (Sys.isObj(def) && (i + 1 < numItems)) {
                def.thenList.push.apply(def.thenList, list.slice(i + 1));
                break;
            }
        }

        // clear all lists
        this.thenList = [];
        this.alwaysList = [];
        this.failList = [];
    }
};

Sys.Deferred.prototype.done = Sys.Deferred.prototype.then;
/* global Sys, WebKitCSSMatrix, Resources, Utils, EventHandler */
/**
 * A collection of utility functions.
 *
 * @class Sys.utils
 * @singleton
 */
Sys.ns("Sys.utils");

// extend Sys.utils in anonymous function in order to be able to get all
// methods in the Navigator bar to the right (does not work with Sys.extend(Sys.utils, {})
(function() {
    var utils = {

        /**
         * Converts a query string to an object with key value pairs.
         *
         * @example
         *     Sys.utils.queryStringToObject("?foo=bar&baz=w%20u%20t");       // => {foo: "bar", baz: "w u t"}
         *     Sys.utils.queryStringToObject("?foo=bar&baz=w%20u%20t", true); // => {foo: "bar", baz: "w u t"}
         *
         *     Sys.utils.queryStringToObject("?foo=bar&baz=w%20u%20t", false); // => {foo: "bar", baz: "w%20u%20t"}
         *
         * @param {string} qs The query string.
         * @param {boolean} [shouldUnescape=true] If values should be unescaped.
         * @returns {Object} The string parsed into key-value pairs.
         */
        queryStringToObject: function(qs, shouldUnescape) {
            // The return is a collection of key/value pairs
            var qsd = {},
                keyValuePair,
                value,
                decode = Sys.isDefined(shouldUnescape) ? shouldUnescape : true,
                pairs;

            // document.location.search is empty if no query string
            if (!qs) {
                return qsd;
            }

            // remove first questionmark and split by ampersand
            pairs = qs.replace("?", "").split(/&/);

            // Load the key/values of the return collection
            Sys.each(pairs, function(pair) {
                keyValuePair = pair.split("=");

                value = keyValuePair[1];
                if (decode) {
                    value = decodeURIComponent(value);
                }

                if (value === "false") {
                    value = false;
                }
                else if (value === "true") {
                    value = true;
                }

                qsd[keyValuePair[0]] = value;
            });

            // Return the key/value dictionary
            return qsd;
        },

        /**
         * Converts a query string to an object with key value pairs.
         *
         * @example
         *     Sys.utils.qsToObj("?foo=bar&baz=w%20u%20t");       // => {foo: "bar", baz: "w u t", toStr: function}
         *     Sys.utils.qsToObj("?foo=bar&baz=w%20u%20t", true); // => {foo: "bar", baz: "w u t", toStr: function}
         *
         *     Sys.utils.qsToObj("?foo=bar&baz=w%20u%20t", false); // => {foo: "bar", baz: "w%20u%20t", toStr: function}
         *
         * @deprecated Use Sys.utils.queryStringToObject().
         * @param {string} qs The query string.
         * @param {boolean} [shouldUnescape=true] If values should be unescaped.
         * @returns {Object} The string parsed into key-value pairs.
         */
        qsToObj: function(qs, shouldUnescape) {
            // The return is a collection of key/value pairs
            var qsd = this.queryStringToObject(qs, shouldUnescape);

            // attach util method
            qsd.toStr = this.qsToStr;

            // Return the key/value dictionary
            return qsd;
        },

        /**
         * Utils method added on the qs object created in the qsToObj method.
         *
         * @deprecated Should not be bound method but instead a pure util function.
         * @returns {string} The key/value pairs concatenated.
         */
        qsToStr: function() {
            var toString = "";

            // iterate through the key-value pairs
            Sys.iterate(this, function(key, value) {
                // the value cannot be a function
                if (typeof value !== "function") {
                    // start with a questionmark, continue with ampersands
                    toString += toString.length ? "&" : "?";
                    toString += key + "=" + value;
                }
            });
            return toString;
        },

        /**
         * Appends a query string to a query string.
         *
         * @example
         *     Sys.utils.appendParameterToQuery("", "foo=bar")         // => "?foo=bar
         *     Sys.utils.appendParameterToQuery("?baz=wut", "foo=bar") // => "?baz=wut&foo=bar"
         *
         * @param {string} query A url with zero or more existing parameters.
         * @param {string} parameter A query string parameter on the form "&lt;key&gt;=&lt;value&gt;".
         * @returns {string} The query with the new parameter appended.
         */
        appendParameterToQuery: function(query, parameter) {
            var lastChar = query[query.length - 1];

            if (lastChar === "?" || lastChar === "&") {
                query += parameter;
            }
            else if (!query.contains("?")) {
                query += "?" + parameter;
            }
            else {
                query += "&" + parameter;
            }

            return query;
        },

        /**
         * Makes a http get request to the specified uri based on the configuration parameters.
         *
         * @param {Object} config The configuration object.
         * @param {string} config.url The resource URL.
         * @param {string} [config.responseType] Response type.
         * @param {Function} [config.onProgressCallback] A function on the form function(String event, String resourceName) that will be used as the requests onprogress listener.
         * @param {string} [config.name] Will be sent as the second parameter to any onProgressCallback function.
         * @param {boolean} [config.useCredentials] Use credentials or not.
         * @returns {Sys.Deferred} A Sys.Deferred object.
         */
        httpGet: function(config) {
            var request = new XMLHttpRequest(),
                deferred = new Sys.Deferred(),
                url = config.url;

            if (!url) {
                deferred.resolveWith([null]);
                return deferred;
            }

            request.onreadystatechange = function() {
                // If the request finished and response is ready (readyState 4)
                if (this.readyState === 4) {
                    request.onreadystatechange = function() {
                        /*
                         * Remove the change listener so that it does not get fired again (sometimes the ready state
                         * change event ios fired more than once).
                         */
                    };

                    if (Sys.utils.httpRequestIsOK(request)) {
                        // If we are getting an array buffer (audio file), don't parse it
                        if (config.responseType !== "arraybuffer" && Sys.isDefined(Sys.utils.getErrorCode(request))) {
                            deferred.rejectWith([request]);
                        }
                        else {
                            deferred.resolveWith([request]);
                        }
                    }
                    else {
                        deferred.rejectWith([request]);
                    }
                }
            };

            // If a onprogress callback is defined,
            // run it on the onprogress event and send back event object and the resource name
            if (Sys.isDefined(config.onProgressCallback)) {
                request.onprogress = function(event) {
                    config.onProgressCallback(event, config.name);
                };
            }

            request.open("GET", url);

            if (Sys.isDefined(config.responseType)) {
                request.responseType = config.responseType;
            }

            // NOTE: Important! this statement must be after the request.open method
            if (!Sys.isEmpty(config.useCredentials)) {
                request.withCredentials = config.useCredentials;
            }

            request.send();
            return deferred;
        },

        /**
         * Determines if a completed XMLHttpRequest is OK or not.
         *
         * @param {XMLHttpRequest} request The request to check.
         * @returns {boolean} Status.
         */
        httpRequestIsOK: function(request) {
            /*
             * status == 200 is the standard http OK status.
             * status == 0 indicates an application cache hit in some browsers (others use 200).
             * Cache hits should only be accepted if we actually get any data
             */
            return request.status === 200 || (request.status === 0 && request.responseText.length > 0);
        },

        /**
         * Retrieves any game server error code supplied in the request response text.
         *
         * @param {XMLHttpRequest} request The request to check.
         * @returns {number|undefined} The error code or undefined if no error code is found.
         */
        getErrorCode: function(request) {
            var errorCode = Sys.utils.toInt(Sys.utils.getResponseParameter("errorcode", request));

            return !isNaN(errorCode) ? errorCode : undefined;
        },

        /**
         * Parses the given request's response for the error data.
         *
         * @deprecated 8.0.0. Use Sys.utils.getResponseParameter instead.
         * @param {XMLHttpRequest} request The request for which the response should be searched.
         * @returns {string|undefined} Error data.
         */
        getErrorData: function(request) {
            
            return this.getResponseParameter("errordata", request);
        },

        /**
         * Parses the given request's response for the given parameter.
         *
         * @param {string} parameter The wanted response parameter.
         * @param {XMLHttpRequest} request The request for which the response should be searched.
         * @returns {string|undefined} The requested response parameter or undefined if it was not found.
         */
        getResponseParameter: function(parameter, request) {
            var searchQuery = new RegExp(parameter + "=([^&]+)"),
                searchResult = Sys.isDefined(request.responseText) ? request.responseText.match(searchQuery) : null;

            return searchResult !== null ? searchResult[1] : undefined;
        },

        /**
         * Creates a script tag and appends it to &lt;head&gt; element. Executes callback when onload event is fired.
         * NOTE that this function implements "fail" with a setTimeout since there is no "actual" way of knowing when a JavaScript file load fails.
         *
         * @deprecated 7.5.2. Should not inject JavaScript directly.
         * @param {Object} config Config object.
         * @param {string} config.url The URL of the script.
         * @returns {Sys.Deferred} A Deferred object.
         */
        loadJS: function(config) {
            var deferred = new Sys.Deferred(),
                element = document.createElement("script");

            element.addEventListener("load", function() {
                deferred.resolve();
            });
            element.type = "text/javascript";
            element.src = config.url;

            // handle fails by setTimeout, assuming that the file load failed after a while
            // not very nice but at the time of writing the only way to know if the script has not loaded
            setTimeout(function() {
                if (!deferred.isResolved()) {
                    
                    deferred.reject();
                }
            }, 5000);

            document.getElementsByTagName("head")[0].appendChild(element);
            return deferred;
        },

        /**
         * Checks weather the string is true or false.
         *
         * @param {string} boolStr The string containing a boolean value.
         * @returns {boolean} True if string is "true", false otherwise.
         */
        strIsTrue: function(boolStr) {
            if (Sys.isEmpty(boolStr)) {
                return false;
            }

            return boolStr.toString().toLowerCase() === "true";
        },

        /**
         * Helper function that generates almost unique IDs.
         *
         * @returns {string} Pseudo-GUID, as described here: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript.
         */
        pseudoGUID: function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);

                return v.toString(16);
            });
        },

        /**
         * Replaces all {x} in string with object[x].
         *
         * @example
         *     Sys.utils.getNodesByFormat("{1} {2}",["Hello", "World"]) // => [textNode("Hello"), textNode(" "), textNode("World")]
         *
         * @param {string} text The text string that may contain {}.
         * @param {Object[]} values The array containing the objects to be used for building up the resulting array.
         * @returns {HTMLElement[]} The resulting array with DOM nodes.
         */
        getNodesByFormat: function(text, values) {
            var me = this,
                res = [],

                // Keep track on offset if there are multiple "{ }" matches
                prevOffset = 0,
                f;

            // Regexp text to find all "{}" matches
            text.replace(/\{([^\{\}]*)\}/g, function(match, group_match, offset, t) {
                // Create a text node for the first (string) part
                res.push(document.createTextNode(t.slice(prevOffset, offset)));

                // Set new offset
                prevOffset = offset + match.length;

                f = function() {
                    var obj = values[Sys.utils.toInt(group_match)];

                    // Evaluate type of object that was sent in the values array
                    // and add to resulting html node array

                    // If it is a string then create a text node for the it
                    if (typeof obj === "string" || Sys.isNumber(obj)) {
                        res.push(document.createTextNode(obj.toString()));

                        return obj;
                    }
                    // If it is a object then add the DOM element
                    // (which is a html element)
                    else if (Sys.isObj(obj)) {
                        res.push(obj.getEl());
                    }
                    return "";
                };

                f.apply(me, arguments);
            });

            // Add last text (if there is any)
            if (prevOffset < text.length) {
                res.push(document.createTextNode(text.slice(prevOffset, text.length)));
            }

            return res;
        },

        /**
         * Sorts an array of object by numeric object field defined by parameter.
         *
         * @param {Object[]} arr The array of objects which is to be sorted.
         * @param {string} prop The name of the field that the array is to be sorted upon. Must exist in every object in the array.
         * @param {boolean} [desc=false] Flag to set descending sort.
         * @returns {Object[]} The sorted array of objects.
         */
        objSort: function(arr, prop, desc) {
            // create sorter function
            var sortFn = function(a, b) {
                // if descending, reverse sort
                return desc ? b[prop] - a[prop] : a[prop] - b[prop];
            };

            // sort array
            arr.sort(sortFn);

            return arr;
        },

        /**
         * A wrapper for the standard Javascript parseInt to omit the specification of the radix value.
         *
         * @example
         *     Sys.utils.toInt("015");   // => 15
         *     Sys.utils.toInt("15.99"); // => 15
         *     Sys.utils.toInt("15*3");  // => 15
         *     Sys.utils.toInt("15px");  // => 15
         *     Sys.utils.toInt(15.99);   // => 15
         *
         * @param {string} value The string to be parsed.
         * @returns {number} The parsed integer number.
         */
        toInt: function(value) {
            return parseInt(value, 10);
        },

        /**
         * A wrapper for the standard Javascript parseFloat.
         *
         * @example
         *     Sys.utils.toFloat("3.14");                          // => 3.14
         *     Sys.utils.toFloat("314e-2");                        // => 3.14
         *     Sys.utils.toFloat("0.0314E+2");                     // => 3.14
         *     Sys.utils.toFloat("3.14more non-digit characters"); // => 3.14
         *
         * @param {string} value The string containing the value to be parsed.
         * @returns {number} The parsed float number.
         */
        toFloat: function(value) {
            return parseFloat(value);
        },

        /**
         * Rounds down to nearest even integer.
         *
         * @example
         *     Sys.utils.floorToEven(2); // => 2
         *     Sys.utils.floorToEven(3); // => 2
         *     Sys.utils.floorToEven(4); // => 4
         *
         * @param {number} value The number to floor.
         * @returns {number} The floored number.
         */
        floorToEven: function(value) {
            var rest = value % 2;

            return value - rest;
        },

        /**
         * Rounds up to nearest even integer.
         *
         * @example
         *     Sys.utils.ceilToEven(2); // => 4
         *     Sys.utils.ceilToEven(3); // => 4
         *     Sys.utils.ceilToEven(4); // => 6
         *
         * @param {number} value The number to ceil.
         * @returns {number} The ceiled number.
         */
        ceilToEven: function(value) {
            var rest = value % 2;

            return value + (2 - rest);
        },

        /**
         * Returns a string of the number with **digits** digits.
         *
         * @example
         *     Sys.utils.numberToFixedDigits(0.1, 3); // => 0.10
         *     Sys.utils.numberToFixedDigits(1, 3);   // => 1.00
         *
         * @param {number} number The number that shall be returned in fixed number of digits.
         * @param {number} digits Number of digits that the return value shall have. Has to be between 1 and 21.
         * @returns {string} Fixed digits.
         */
        numberToFixedDigits: function(number, digits) {
            if (Math.abs(number) < 1) {
                return number.toFixed(digits - 1);
            }

            return number.toPrecision(digits);
        },

        /**
         * @param {string} url The url string to test.
         * @returns {boolean} True/False depending on if the specified string is an url or not.
         */
        isUrl: function(url) {
            var regexp = new RegExp("(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?");

            return regexp.test(url);
        },

        /**
         * Returns the offset of a DOM element relative to the entire document.
         * Also used by Sys.Element.getOffset.
         *
         * @param {HTMLElement} el A reference to a DOM element.
         * @returns {{left: number, top: number, x: number, y: number}} An object with properties "left" and "top" to indicate the offset in pixels.
         */
        getElOffset: function(el) {
            var currLeft = 0,
                currTop = 0;

            // offsetParent returns a reference to the object which is the closest (nearest in the containment
            // hierarchy) positioned containing element. If the element is non-positioned, the nearest table
            // cell or root element (html in standards compliant mode; body in quirks rendering mode) is the
            // offsetParent. offsetParent returns null when the element has style.display set to "none".
            // The offsetParent is useful because offsetTop and offsetLeft are relative to its padding edge.
            if (el.offsetParent) {
                do {
                    currLeft += el.offsetLeft;
                    currTop += el.offsetTop;
                } while ((el = el.offsetParent));
            }

            return {
                left: currLeft,
                top: currTop,
                x: currLeft,
                y: currTop
            };
        },

        /**
         * Returns the accumulated offset of -webkit-transformations.
         *
         * @param {HTMLElement} el A reference to a DOM element.
         * @returns {{left: number, top: number, x: number, y: number}} An object with properties "left" and "top" to indicate the offset in pixels.
         */
        getTransformationOffset: function(el) {
            var x = 0,
                y = 0,
                transform;

            if (el.parentElement) {
                do {
                    transform = new WebKitCSSMatrix(window.getComputedStyle(el).webkitTransform);
                    x += transform.e;
                    y += transform.f;
                } while ((el = el.parentElement));
            }
            return {
                left: x,
                top: y,
                x: x,
                y: y
            };
        },

        /**
         * Returns the coordinates where the user is pointing at.
         *
         * @private
         * @param {Object} event The javascript event object.
         * @returns {{x: number, y: number}} The coordinates of the event.
         */
        getPointCoordinates: function(event) {
            var coords = {
                    x: 0,
                    y: 0
                },
                type = event.type;

            // mouse events will have their coordinates directly in the event object
            // touch events have the coordinates in a "touches" array
            // I use changedTouches array as the touches array is empty for touchEnd
            if (/touch/.test(type)) {
                coords.x = event.changedTouches[0].pageX;
                coords.y = event.changedTouches[0].pageY;
            }
            else if (/mouse/.test(type)) {
                coords.x = event.x;
                coords.y = event.y;
            }

            return coords;
        },

        /**
         * Determines if the given element has the given CSS class in its class name.
         *
         * @deprecated 7.4.4. Use element.classList.contains() instead.
         * @param {HTMLElement} element The element.
         * @param {string} CSSClass The CSS class to look for.
         * @returns {boolean} True if the class was found.
         */
        hasCSSClass: function(element, CSSClass) {
            var regExp = new RegExp("(^|\\s)" + CSSClass + "($|\\s)");

            return element.className.search(regExp) >= 0;
        },

        /**
         * Adds the given CSS class to the given element's class name.
         *
         * @deprecated 7.4.4. Use element.classList.add() instead.
         * @param {HTMLElement} element The element.
         * @param {string} CSSClass The CSS class to add.
         * @returns {void}
         */
        addCSSClass: function(element, CSSClass) {
            if (!Sys.utils.hasCSSClass(element, CSSClass)) {
                element.className = Sys.utils.trimClassName(element.className + " " + CSSClass);
            }
        },

        /**
         * Removes the given CSS class from the given element's class name.
         *
         * @deprecated 7.4.4. Use element.classList.remove() instead.
         * @param {HTMLElement} element The element.
         * @param {string} CSSClass The CSS class to remove.
         * @returns {void}
         */
        removeCSSClass: function(element, CSSClass) {
            Sys.utils.replaceCSSClass(element, CSSClass, "", false);
        },

        /**
         * Replaces the given css class with the given substitute.
         *
         * @param {HTMLElement} element The DOM element.
         * @param {string} oldClass The CSS class name to add.
         * @param {string} newClass The CSS class name to add.
         * @param {boolean} [addAnyway=false] Flag indicating if you want to add the new class even if the old one was not found.
         * @returns {void}
         */
        replaceCSSClass: function(element, oldClass, newClass, addAnyway) {
            var className = element.className,
                regExp;

            if (Sys.utils.hasCSSClass(element, oldClass)) {
                regExp = new RegExp("(^|\\s)(" + oldClass + ")($|\\s)");
                className = className.replace(regExp, "$1" + newClass + "$3");

                element.className = Sys.utils.trimClassName(className);
            }
            else if (addAnyway) {
                Sys.utils.addCSSClass(element, newClass);
            }
        },

        /**
         * Removes leading and trailing white space and replaces any multiple white spaces with a single space.
         *
         * @param {string} className The class name to trim.
         * @returns {string} The trimmed string.
         */
        trimClassName: function(className) {
            return className.replace(/\s+/g, " ").trim();
        },

        /**
         * Calls {@link Sys.utils#addCSSClass} with document.body and the given CSS class as argument.
         *
         * @deprecated 7.5.2. Use Sys.utils.addCSSClass() with document.body as first parameter.
         * @param {string} CSSClass The class to add.
         * @returns {void}
         */
        addCSSClassToBody: function(CSSClass) {
            Sys.utils.addCSSClass(document.body, CSSClass);
        },

        /**
         * Calls {@link Sys.utils#replaceCSSClass} with document.body and the given CSS classes as arguments.
         *
         * @deprecated 7.5.2. Use Sys.utils.addCSSClass() with document.body as first parameter.
         * @param {string} oldClass The class to remove.
         * @param {string} newClass The class to add.
         * @param {boolean} [addAnyway=false] Flag indicating if the new class should be added even if the old one was not found.
         * @returns {void}
         */
        replaceCSSClassOnBody: function(oldClass, newClass, addAnyway) {
            Sys.utils.replaceCSSClass(document.body, oldClass, newClass, addAnyway);
        },

        /**
         * Points to browser to a new location through window.location.
         * This is useful because we can override it during testing.
         *
         * @deprecated 7.5.2. Use Sys.utils.setWindowLocation().
         * @param {string} url The URL to point the browser to.
         * @returns {void}
         */
        goTo: function(url) {
            window.location = this.sanitizeURL(url);
        },

        /**
         * Creates a query string from an object.
         *
         * @param {Object} obj Object.
         * @returns {string} String.
         */
        objectToQueryString: function(obj) {
            var string = "",
                prop;

            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    string += "&" + prop + "=" + obj[prop];
                }
            }
            return string;
        },

        /**
         * Reloads the window.
         * This is useful because we can override it for iFrame specific code.
         *
         * @returns {void}
         */
        reload: function() {
            window.location.reload();
        },

        /**
         * Checks if a specified object exist in an array.
         *
         * @param {Object} obj The object we want to check.
         * @param {Array} list The array to test if it contains the object.
         * @returns {{found: boolean, index: number}} The result, if it found it and at what index.
         */
        containsObject: function(obj, list) {
            var i;

            if (Sys.isObj(obj) && Sys.isArray(list)) {
                for (i = 0; i < list.length; i++) {
                    if (list[i] === obj) {
                        return { found: true, index: i };
                    }
                }
            }
            else {
                
            }

            return { found: false, index: NaN };
        },

        /**
         * Get the properties owned by the object it fetches the properties from the Obj.keys in case od ES5 otherwise collect the properties through iterations.
         *
         * @param {Object} obj Object.
         * @returns {string[]} Array of strings representing the keys of the object.
         */
        getKeys: function(obj) {
            /* this method was defined in sys.extensions and added as prototype with Object class */
            var keys = [],
                i,

                // this is the predefined method in ES5 refer https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
                getObjectProperties = obj.keys;

            // do a polyfill if ES5 Object.keys does not exist
            if (typeof getObjectProperties !== "function") {
                for (i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        keys.push(i);
                    }
                }
            }
            else {
                keys = getObjectProperties(obj);
            }
            return keys;
        },

        /**
         * Utility function to initialize a two dimensional matrix with the given value on all indices.
         *
         * @param {number} outerDimension Length of the outer array.
         * @param {number} innerDimension Length of all the inner arrays.
         * @param {*} [initValue=undefined] The value every index should be initialized to.
         * @returns {Array} An initValue[outerDimension][innerDimension] matrix.
         */
        init2dMatrix: function(outerDimension, innerDimension, initValue) {
            var i,
                matrix = [];

            for (i = -1; ++i < outerDimension;) {
                matrix.push(Sys.utils.initArray(innerDimension, initValue));
            }

            return matrix;
        },

        /**
         * Utility function to initialize an array with the given value on all indices.
         *
         * @param {number} length Length of the array.
         * @param {*} [initValue=undefined] The value every index should be initialized to.
         * @returns {Array} Array.
         */
        initArray: function(length, initValue) {
            var i,
                array = [];

            

            for (i = -1; ++i < length;) {
                array.push(initValue);
            }

            return array;
        },

        /**
         * Gets the scaling prefix available in the current browser.
         *
         * @param {string} prop The property to test.
         * @returns {string|undefined} Prefix.
         */
        getPrefixedCSSProperty: function(prop) {
            var prefixed = this.tryPrefixPropery(prop, document.body.style);

            return prefixed;
        },

        /**
         * Check if browser need to prefix property and return it.
         *
         * @deprecated 7.5.2. Prefixed styling should be handled by adding classes and using CSS.
         * @param {string} property The property to test.
         * @param {Object} style Element style object.
         * @returns {string|undefined} Key.
         */
        tryPrefixPropery: function(property, style) {
            var prefixedProperty,
                prefixes = ["webkit", "moz", "ms", "o"],
                suffix,
                i;

            if (!Sys.isDefined(property)) {
                return undefined;
            }

            if (property in style) {
                return property;
            }

            suffix = property.charAt(0).toUpperCase() + property.substr(1);

            for (i = 0; i < prefixes.length; i++) {
                prefixedProperty = prefixes[i] + suffix;
                if (prefixedProperty in style) {
                    return prefixedProperty;
                }
            }

            return undefined;
        },

        /**
         * Tries a DOM element for variations of the feature and returns the working one or undefined if no match was found.
         *
         * @deprecated 7.5.2. Use Sys.utils.getPrefixedCSSProperty instead.
         * @param {string} feature The feature you want to pollyFill (to use with el.style.feature = xxx).
         * @returns {string|undefined} Polyfill.
         */
        pollyFill: function(feature) {
            return this.getPrefixedCSSProperty(feature);
        },

        /**
         * Parses a query string into a JavaScript object.
         *
         * @private
         * @deprecated 7.5.2. Use Sys.utils.parseQueryString().
         * @param {string} queryString A query string (for instance the server request response text).
         * @returns {Object} The response parsed into an object.
         */
        parseQueryStringToNestedObject: function(queryString) {
            return this.parseQueryString(queryString, true);
        },

        /**
         * Parses query string to json object.
         *
         * NOTE: This only works for the NetEnt custom formatted server query string. If you wish to parse a standard
         * query string then Sys.utils.queryStringToObject might be a better option.
         *
         * @example
         * Sys.utils.parseQueryString("pluginURL=http%3A%2F%2Fservername%2Fgame-inclusion%2Fbranches%2Ftest%2Fexample%2Fplugin%2FtestPlugin.html")
         *
         * -> Object {pluginURL: "http://10.99.12.80/game-inclusion/branches/test/example/plugin/testPlugin.html"}
         *
         * Sys.utils.parseQueryString("queryStringObject=a%3Atest%20value", true)
         *
         * -> Object {
         *     queryStringObject: {
         *         a: "test value"
         *     }
         * }
         *
         * @param {string} queryString Query string.
         * @param {boolean} [nested=false] If the parsing should be a nested.
         * @returns {Object} Query object.
         */
        parseQueryString: function(queryString, nested) {
            var queryObject = {},
                stringParts = queryString.split("&"),
                part,
                keyValuePair,
                path,
                step,
                object,
                key,
                value;

            for (part = 0; part < stringParts.length; part++) {
                keyValuePair = stringParts[part].split("=");
                path = keyValuePair[0].split(".");
                object = queryObject;

                for (step = 0; step < path.length - 1; step++) {
                    if (!object[path[step]]) {
                        object[path[step]] = {};
                    }
                    object = object[path[step]];
                }

                key = path[path.length - 1];
                value = nested === true ? this.parseValue(decodeURIComponent(keyValuePair[1])) : decodeURIComponent(keyValuePair[1]);
                if (key !== "") {
                    object[key] = value;
                }
            }

            return queryObject;
        },

        /**
         * Recursively parses a value string into a suitable JavaScript type.
         *
         * @private
         * @param {string} rawValue The value as a string.
         * @returns {boolean|number|Array|Object|string} The raw value parsed into a suitable JavaScript type or the raw data itself if no improvement could be made.
         */
        parseValue: function(rawValue) {
            var value,
                i,
                keyValuePair = {};

            // Parse boolean values
            if (rawValue.toLowerCase() === "true") {
                return true;
            }
            if (rawValue.toLowerCase() === "false") {
                return false;
            }

            // Parse null
            if (rawValue.toLowerCase() === "null") {
                return null;
            }

            // Parse undefined
            if (rawValue.toLowerCase() === "undefined") {
                return undefined;
            }

            // Parse numbers
            if (!isNaN(Number(rawValue))) {
                // Javascript can't handle numbers bigger than 2^53 (16 digits) so casting numbers larger than that will
                // cause all digits after the 16th to be replaced with zeroes.
                // One example of this is the rgi token used for Open Bet (example: "231420150611172418471").
                if (rawValue.length > 16) {
                    return rawValue;
                }

                return Number(rawValue);
            }

            // Parse arrays
            if (rawValue.split(",").length > 1) {
                value = rawValue.split(",");
                for (i = 0; i < value.length; i++) {
                    value[i] = this.parseValue(value[i]);
                }
                return value;
            }

            // Parse key/value pairs. Note that this must be done after parsing arrays or arrays of key/value pairs would not be parsed properly
            if (rawValue.split(":").length > 1) {
                value = rawValue.split(":");
                keyValuePair[value[0]] = this.parseValue(value[1]);
                return keyValuePair;
            }

            // In case we cannot parse the value we return it as it is as it is probably just some string
            return rawValue;
        },

        /**
         * Parses the reel info into an object containing symbol, overlay and hold (used in re-spins) information.
         *
         * @example
         *     reelInfo[i]
         *     {
         *         hold : false,
         *         symbols : ["SYM2","SYM3","SYM2"],
         *         overlaySymbols : [undefined,"SYM33",undefined]
         *     }
         *
         * @param {Object} parsedServerResponse Server response as parsed by Core.ResponseParserController.parseServerResponse.
         * @param {string} [reelSetID] The ID of the reel set that should be parsed. Default reel set is i0.
         * @returns {Object[]} Reel info.
         */
        parseReelInfo: function(parsedServerResponse, reelSetID) {
            var rawReelInfo,
                reelInfo = [],
                reel,
                info;

            // First we try to find a reel set with the given id
            if (Sys.isDefined(reelSetID)) {
                Sys.iterate(parsedServerResponse.rs, function(reelSetIndex, reelSetInformation) {
                    if (Sys.isObj(reelSetInformation) && reelSetInformation.id === reelSetID) {
                        rawReelInfo = reelSetInformation.r;
                    }
                });
            }

            // Then we fallback if needed
            if (!Sys.isDefined(rawReelInfo)) {
                // rs.i0 should always be present
                rawReelInfo = parsedServerResponse.rs.i0.r;
            }

            for (reel = 0; Sys.isDefined(rawReelInfo["i" + reel]); reel++) {
                info = {
                    hold: rawReelInfo["i" + reel].hold,
                    symbols: rawReelInfo["i" + reel].syms,
                    overlaySymbols: []
                };

                if (rawReelInfo["i" + reel].overlay) {
                    info.overlaySymbols = this.getOverlaySymbols(rawReelInfo["i" + reel].overlay);
                }

                reelInfo.push(info);
            }

            return reelInfo;
        },

        /**
         * Get the overlay symbol information from the given overlay info.
         *
         * @private
         * @param {Object} overlay Overlay information for a reel.
         * @param {Object} overlay.iY Overlay information for overlay Y on the reel.
         * @param {string} overlay.iY.row The row where overlay Y appears on the reel.
         * @param {string} overlay.iY.with The symbol overlay Y overlays with on the reel.
         * @returns {string[]} Overlay info.
         */
        getOverlaySymbols: function(overlay) {
            var overlayInfo = [],
                i;

            // Example:
            // reelInfo.overlay.i0.row : 1
            // reelInfo.overlay.i0.with : "SYM10"
            for (i = 0; overlay["i" + i]; i++) {
                overlayInfo[overlay["i" + i].row] = overlay["i" + i]["with"];
            }

            return overlayInfo;
        },

        /**
         * Get the class reference based on the string.
         *
         * @param {string} className The class name (including scope).
         * @returns {*} The reference to the class or undefined if the class does not exist.
         */
        getClassFromString: function(className) {
            var parts,
                classReference = window,
                i,
                numParts;

            if (typeof className === "string") {
                parts = className.split(".");
                numParts = parts.length;

                for (i = 0; i < numParts; i++) {
                    classReference = classReference[parts[i]];
                    if (!Sys.isDefined(classReference)) {
                        return undefined;
                    }
                }

                return classReference;
            }

            return undefined;
        },

        /**
         * Open the url in a new tab if possible, else open in the current window.
         *
         * @param {string} url The URL to open.
         * @param {string} name An id for the new tab, will prevent opening of several tabs if one is already open.
         * @returns {void}
         */
        openURL: function(url, name) {
            var sanitizedUrl = this.sanitizeURL(url);

            // It is not possible to open new tabs in Internet Explorer on some Windows Phones.
            // It throws an exception on window.open, therefore we use window.location instead.
            try {
                this.openNewBrowserTab(sanitizedUrl, name);
            }
            catch (e) {
                this.setWindowLocation(sanitizedUrl);
            }
        },

        /**
         * Sanitizes url by first checking for valid http protocol. Then replaces any greater-than or lesser-than characters to prevent XSS.
         *
         * @example
         * http://www.example.com => valid
         * https://www.example.com => valid
         * //www.example.com => valid
         *
         * ftp://www.example.com => invalid
         *
         * http://www.example.com/<script>alert('hello');</script> => http://www.example.com/&lt;script&gt;alert('hello');&lt;script&gt;
         *
         * @param {string} url Url to sanitize.
         * @returns {?string} Sanitized url or null.
         */
        sanitizeURL: function(url) {
            var checkForProtocolRegexp = /^(https?:)?\/\//,
                arrowRegexp = /<|>/g,
                arrowMap = {
                    "<": "&lt;",
                    ">": "&gt;"
                };

            if (!checkForProtocolRegexp.test(url)) {
                return null;
            }

            return url
                .replace(arrowRegexp, function(matched) {
                    return arrowMap[matched];
                });
        },

        /**
         * Checks if criteria is met consistently over frames so callback can correctly be fired.
         *
         * @deprecated 7.5.2. Not in use.
         * @param {Function} criteria Exit criteria.
         * @param {Function} callback Exit callback.
         * @returns {void}
         */
        onTransitionCheck: function(criteria, callback) {
            Sys.utils.checkTransition(criteria, callback, false);
        },

        /**
         * Checks transition.
         *
         * @deprecated 7.5.2. Not in use.
         * @param {Function} criteria Exit criteria.
         * @param {Function} callback Exit callback.
         * @param {boolean} allowTransition Weather or not to allow transition.
         * @returns {void}
         */
        checkTransition: function(criteria, callback, allowTransition) {
            if (criteria()) {
                if (allowTransition) {
                    callback();
                }
                else {
                    window.requestAnimationFrame(function() {
                        Sys.utils.checkTransition(criteria, callback, true);
                    });
                }
            }
            else {
                window.requestAnimationFrame(function() {
                    Sys.utils.checkTransition(criteria, callback, false);
                });
            }
        },

        /**
         * Sends the user to the lobby with the given reason using window.location.
         *
         * @param {string|number} [reason] The reason (an integer) given for going to lobby.
         * @returns {void}
         */
        goToLobby: function(reason) {
            var lobbyUrl = Resources.readData("lobbyUrl");

            if (lobbyUrl) {
                if (Utils.Platform.inIframe() && lobbyUrl === "#") {
                    EventHandler.dispatchEvent("notify:action.goToLobby", reason);
                }
                else {
                    this.setWindowLocation(this.processLobbyUrl(lobbyUrl, reason));
                }
            }
            else {
                
            }
        },

        /**
         * Process lobby url in the way it moves query string fragment (i.e. hash value and everything behind it), to the end of query string.
         * If some query parameters have been passed on launch - it still move just fragment to the end, forming proper query string.
         * If no fragment provided - just add required query parameters to lobby url.
         * NOTE: if operator malformed lobby url, i.e. put REQUIRED query parameter after hash value - it have to be handled on operator side, as it violates "standard" way of handling URL's.
         *
         * @param {string} rawLobbyUrl Represents raw lobby url passed by operator via game inclusion
         * @param {number} reason Represents reason why player have left the game.
         *
         * @returns {string} lobbyUrl Properly formed lobby url query string, i.e. hash value (fragment) moved to the end of query string.
         * */
        processLobbyUrl: function(rawLobbyUrl, reason) {
            var queryData = Resources.readData("queryData"),
                sessionID = Resources.readData("sessionID"),
                hashValueRE = /#.*/,
                hashValue = "",
                lobbyUrl;

            // extract and replace URI fragment
            if (hashValueRE.test(rawLobbyUrl)) {
                hashValue = hashValueRE.exec(rawLobbyUrl)[0];
                lobbyUrl = rawLobbyUrl.replace(hashValueRE, "");
            }
            else {
                lobbyUrl = rawLobbyUrl;
            }

            if (typeof reason !== "undefined") {
                lobbyUrl = Sys.utils.appendParameterToQuery(lobbyUrl, "reason=" + reason);
            }

            if (queryData) {
                if (queryData.gameId) {
                    lobbyUrl = Sys.utils.appendParameterToQuery(lobbyUrl, "gameId=" + queryData.gameId);
                }

                if (sessionID) {
                    lobbyUrl = Sys.utils.appendParameterToQuery(lobbyUrl, "sessId=" + sessionID);
                }
            }
            // add URI fragment back to the query string
            lobbyUrl += hashValue;

            return lobbyUrl;
        },

        /**
         * Calls the goToLobby function with the cashier specific reason (5).
         *
         * @returns {void}
         */
        goToCashier: function() {
            this.goToLobby(5);
        },

        /**
         * Changes the window location.
         *
         * @param {string} url The Url to the new location.
         * @returns {void}
         */
        setWindowLocation: function(url) {
            window.location.href = this.sanitizeURL(url);
        },

        /**
         * Points to browser to a new location through window.location.
         *
         * @param {string} url The URL to point the browser to.
         * @param {string} name An id for the new tab, will prevent opening of several tabs if one is already open.
         * @returns {void}
         */
        openNewBrowserTab: function(url, name) {
            window.open(url, name).focus();
        },

        /**
         * Creates an element with class names.
         *
         * @param {string} tagName Tag name of the element. Must be lowercase.
         * @param {Array} [classNames] Class names for the element.
         * @returns {HTMLElement} The element representing the background.
         */
        createElement: function(tagName, classNames) {
            var el = document.createElement(tagName);

            (classNames || []).forEach(function(className) {
                el.classList.add(className);
            });

            return el;
        }
    };

    Sys.utils = Sys.apply(Sys.utils, utils);
}());
/* global Sys, Core */
Sys.ns("Core");

/**
 * @typedef {(string|Object)} Mixin
 */

/**
 * The base Module class.
 *
 * This class should be used as a base when creating new modules.
 *
 * Read the guides for information on how to set up a new module.
 *
 * @class Core.Module
 * @extends Sys.Observable
 * @aside guide modules__modules
 * @aside guide state_handler__intro
 * @aside guide state_handler__module
 */
Core.Module = {

    /**
     * @cfg {String} name
     * The name of the Module
     */

    /**
     * @cfg {*} [controller] (optional)
     * The controller class the module uses.
     */

    /**
     * @cfg {*} [model] (optional)
     * The model class the module uses.
     */

    /**
     * @cfg {*} [view] (optional)
     * The view class the module uses.
     */

    /**
     * @override
     * @constructs
     * @param {Object} config The configuration object.
     */
    constructor: function(config) {
        Core.Module.superclass.constructor.apply(this, arguments);

        this.init(config);
    },

    /**
     * This method defines how the module affects the rest of the actual game flow.
     *
     * Returns the module state changes.
     *
     * @example
     * **Modify an existing state**
     *
     * To modify a state the returning object shall have a key named the same as the existing state.
     * The value of that key shall be an object that must contain the key `queue` and can optionally contain the key `waitEvents`.
     *
     * * `queue` defines an array of functions that will run when the states execute function has been performed
     * * `waitEvents` defines an array of events fired by the module that the state needs to have received before
     * the state is considered to be finished.
     *
     * An example that will modify the state named `existingStateName`:
     *
     *     {
     *         "existingStateName" : {
     *             "queue" : [
     *                 function (env) {}
     *              ],
     *              "waitEvents" : [
     *                  "firstEventName",
     *                  "secondEventName"
     *              ]
     *         }
     *     }
     *
     * This example will add two new waitEvents to `existingStateName` and the state handler will now wait for the
     * two more events before leaving the state.
     *
     * **Creating a new state**
     *
     * To create a new state the returning object shall have a key that is named as the new state.
     * The value of the key shall be an object that must contain the key `state`.
     * The value of state shall be an object with the keys `name`, `execute` amd `waitEvents`.
     *
     * * `name` defines the name of the state with with first letter capitalized
     * * `execute` defines the function that is executed when the state is executed.
     * * `waitEvents` defines an object where the key is the name of the event and the value shall be false.
     *
     * An example that will create the new state `mywState`:
     *
     *     {
     *         "myState" : {
     *             "state" : {
     *                 "name" : "MyState",
     *                 "execute" : function (env) {
     *                     
     *                 },
     *                 "waitEvents" : {
     *                     "notify:myModule:done" : false
     *                 }
     *             }
     *         }
     *     }
     *
     * Then add the module to the state order.
     *
     * When the state gets executed it will log to the console and the state handler will leave the state when the `notify:myModule:done` event is fired.
     *
     * @protected
     * @returns {Object} State changes.
     */
    getStateChanges: function() {
        return {};
    },

    /**
     * Gets the mixin dependencies for the module.
     *
     * This method should be overridden if a module uses any mixins.
     * The default behavior is to not implement any mixins.
     *
     * The array contains the mixins used, either on the form of strings or objects.
     * The object contains the name of the mixin as a key and the configuration as an object.
     * The configuration is passed as an argument to all methods that are executed on instantiation.
     *
     * @example
     * For example you could make the module handle animations and listen to user input,
     * by making this function return the following array:
     *
     *     [
     *         "animation",
     *         {
     *             "userInput" : {
     *                 "listenToUserInput" : true
     *             }
     *         }
     *     ]
     *
     * @protected
     * @returns {Mixin[]} The array containing the mixins that shall be implemented.
     */
    getMixinDependencies: function() {
        return [];
    },

    /**
     * Gets the default MVC classes that the module uses.
     *
     * This method is called by the init method when the Module Loader instantiates all the modules.
     * It returns an object containing three properties; model, view and controller, which defines the classes to be
     * used for each MVC component.
     *
     * This method should be overridden when creating a new module and return the controller, view and model that
     * shall be used. A module only has to contain a controller, but in many cases it will also include a model and a
     * view.
     *
     * @example
     *     {
     *         "controller" : MyNameSpace.MyModuleController,
     *         "view"       : MyNameSpace.MyModuleView,
     *         "model"      : MyNameSpace.MyModuleModel
     *     }
     *
     * @protected
     * @returns {{model: *, view: *, controller: *}} The default MVC classes.
     */
    getDefaultMVCClasses: function() {
        return {
            controller: Core.Controller
        };
    },

    /**
     * Initializes the module.
     *
     * @private
     * @param {Object} config The configuration object.
     * @returns {void}
     */
    init: function(config) {
        var classTypes = ["model", "view", "controller"],
            defaultMVCClasses = this.getDefaultMVCClasses(),
            MVCClassTypes = Object.keys(defaultMVCClasses),
            eventHandler = new Sys.EventHandler(),
            Model,
            View,
            Controller;

        // Get classes from config if there are any
        Sys.each(classTypes, function(classType) {
            if (config[classType]) {
                defaultMVCClasses[classType] = config[classType];
            }
            else if (MVCClassTypes.contains(classType) && !defaultMVCClasses[classType]) {
                throw new Error("Module :: The " + config.name + " module has a " + classType + " class defined that is not included");
            }
        });

        // Only create a model if it is needed
        if (defaultMVCClasses.model) {
            Model = defaultMVCClasses.model;
            this.model = new Model({
                name: config.name,
                eventHandler: eventHandler
            });
        }

        // Only create a view if it is needed
        if (defaultMVCClasses.view) {
            // Create a model if one does not exist,
            // since the view depends on it for communication.
            if (!this.model) {
                this.model = new Core.Model({
                    name: config.name,
                    eventHandler: eventHandler
                });
            }

            View = defaultMVCClasses.view;
            this.view = new View({
                name: config.name,
                model: this.model,
                controller: this.controller,
                eventHandler: eventHandler
            });
        }

        Controller = defaultMVCClasses.controller;
        this.controller = new Controller({
            name: config.name,
            view: this.view,
            model: this.model,
            eventHandler: eventHandler
        });

        this.MODULE_NAME = config.name;
    }
};

Core.Module = Sys.extend(Sys.Observable, Core.Module, "Core.Module");
/* global Sys, Core, EventHandler */
Sys.ns("Core");

/**
 * The base Controller class.
 *
 * This class should be used as base when creating a new controller.
 *
 * The purpose of the controller is to be the backbone of the module by both performing the majority of the logic as
 * well as running the communication with the outside world.
 *
 * @class Core.Controller
 * @extends Sys.Observable
 * @aside guide events__events
 */
Core.Controller = {

    /**
     * @cfg {String} name The name of the Module this controller belongs to
     */

    /**
     * @cfg model The model
     */

    /**
     * @cfg view The view
     */

    /**
     * @cfg eventHandler The event handler
     */

    /**
     * @constructs
     * @param {Object} config The configuration object.
     * @returns {void}
     */
    constructor: function(config) {
        // Local event handler used for events communicated within the module
        this.localEventHandler = config.eventHandler;

        // Global event handler used for events communicated outside the module
        this.eventHandler = EventHandler;

        this.handlers = {};
        this.init(config);
    },

    /**
     * Initializes the controller by storing references to the model and view as well as setting up the events.
     *
     * @protected
     * @param {Object} config The configuration object.
     * @returns {void}
     */
    init: function(config) {
        this.model = config.model;
        this.view = config.view;
        this.MODULE_NAME = config.name;

        this.setupEvents();
    },

    /**
     * This method sets up all the event listeners for the controller and should be overridden in all subclasses.
     *
     * If the controller wants to be able to be controlled by other modules, it should listen to one or more
     * request events. The naming convention for a request event is `request:myModuleName.action`.
     *
     * If the controller should react on events from other modules, it should listen to one or more notify events.
     * For example, the event name for when the game is entering idle state is `notify:stateHandler.enteringIdleState`.
     *
     * If the view should be able to communicate with the controller, the controller should listen to one or more
     * view events. It should be named `view:event`.
     *
     * @example
     *     var me = this;
     *     me.on({
     *         "request:myModuleName.animate"          : me.onRequestAnimate,
     *
     *         "notify:stateHandler.enteringIdleState" : me.onEnteringIdleState,
     *
     *         "view:runningAnimation"                 : me.onRunningAnimation,
     *         "view:animationComplete"                : me.onAnimationComplete
     *     });
     *
     * In this example the controller can be controlled by another module if it fires the
     * `request:myModuleName.animate` event.
     *
     * The controller gets notified when the game enters the idle state.
     *
     * The view can communicate with the controller through the `view:runningAnimation` and
     * `view:animationComplete` events.
     *
     * @protected
     * @returns {void}
     */
    setupEvents: function() {
        // Intentionally left empty
    },

    /**
     * @protected
     * @returns {void}
     */
    onModulesFinishedLoading: function() {
        this.model.setState("loaded");
    },

    /**
     * Perform action when all wait events have been received.
     *
     * @protected
     * @param {string} event The event name.
     * @param {Function} func The function to use when the event is dispatched.
     * @returns {void}
     */
    addListener: function(event, func) {
        this.handlers[event] = func;

        // If the event name starts with "view:" use the local event handler
        // since it is a module event
        if (event.indexOf("view:") === 0) {
            this.localEventHandler.addListener(this, event);
        }
        else {
            this.eventHandler.addListener(this, event);
        }
    },

    /**
     * Remove the listener for the provided event.
     *
     * @protected
     * @param {string} event The event to stop listening to.
     * @returns {void}
     */
    removeListener: function(event) {
        // If the event name starts with "view:" use the local event handler
        // since it is a module event
        if (event.indexOf("view:") === 0) {
            this.localEventHandler.removeListener(this, event);
        }
        else {
            this.eventHandler.removeListener(this, event);
        }

        this.handlers[event] = undefined;
    }
};

Core.Controller = Sys.extend(Sys.Observable, Core.Controller, "Core.Controller");
/* global Sys, Core */
Sys.ns("Core");

/**
 * The base Model class.
 *
 * This class should be used when creating a new model.
 *
 * The purpose of the model is to hold information needed by the entire module and also keep track of the
 * internal state of the module.
 *
 * @class Core.Model
 * @extends Sys.Observable
 * @aside guide events__events
 */
Core.Model = {

    /**
     * @cfg name The name of the module
     */

    /**
     * @constructs
     * @param {Object} config The configuration object.
     * @returns {void}
     */
    constructor: function(config) {
        Core.Model.superclass.constructor.apply(this, arguments);

        this.init(config);
    },

    /**
     * Initializes the model by creating the data storage.
     *
     * @deprecated 8.0.0. Override Core.Model#setupData instead as this method will be removed and moved to the constructor.
     * @protected
     * @param {Object} config The configuration object.
     * @returns {void}
     */
    init: function(config) {
        this.data = {};
        this.state = undefined;
        this.MODULE_NAME = config.name;

        this.setupData();
    },

    /**
     * This method should setup the initial data for the module.
     *
     * E.g. hard coded values, initial server response information or
     * values read from the config file.
     *
     * @example
     * An example that stores some reel information from the config:
     *
     *     var me = this,
     *         reelConfig = Game.stage.model.getCurrentReelGroupConfiguration();
     *
     *     me.storeData("numReels", reelConfig.symbolCols);
     *     me.storeData("numSymbols", reelConfig.symbolRows);
     *
     * @protected
     * @returns {void}
     */
    setupData: function() {
        // Intentionally left empty
    },

    /**
     * Returns the data associated with the given key.
     *
     * @example
     *     this.readData("foo"); // => undefined
     *
     *     this.storeData("foo", "bar");
     *     this.readData("foo"); // => "bar"
     *
     * @param {string} key The data storage key.
     * @returns {Mixed} The data read from storage.
     */
    readData: function(key) {
        return this.data[key];
    },

    /**
     * Store the given data under the given key.
     *
     * @example
     *     this.storeData("foo", "bar"); // => "bar"
     *     this.readData("foo");         // => "bar"
     *
     * @param {string} key The name of the key under which to store the data.
     * @param {*} dataToStore The data to store.
     * @returns {*} The data that was stored.
     */
    storeData: function(key, dataToStore) {
        this.data[key] = dataToStore;
        return this.data[key];
    },

    /**
     * Removes the data associated with the given key.
     *
     * Returns `undefined` on next read.
     *
     * @example
     *     this.storeData("foo", "bar");
     *     this.readData("foo");   // => "bar"
     *     this.removeData("foo"); // => undefined
     *     this.readData("foo");   // => undefined
     *
     * @param {string} key The data storage key.
     * @returns {void}
     */
    removeData: function(key) {
        delete this.data[key];
    },

    /**
     * Sets the given state and signals that the model now is in that state.
     *
     * @deprecated 8.0.0. Store data in model instead.
     * @param {string} newState The new state.
     * @param {Object} [param=undefined] Optional parameters to be passed to the event.
     * @returns {void}
     */
    setState: function(newState, param) {
        this.state = newState;
        this.fireEvent("model:" + this.state, param);
    },

    /**
     * Returns the current state.
     *
     * @deprecated 8.0.0. Retrieve data from model instead.
     * @returns {string} The current state.
     */
    getState: function() {
        return this.state;
    },

    /**
     * Checks if the models current state is the same as the given state.
     *
     * @deprecated 8.0.0. Retrieve data from model instead.
     * @param {*} state State.
     * @returns {boolean} If state matches provided.
     */
    isState: function(state) {
        return state === this.state;
    }
};

Core.Model = Sys.extend(Sys.Observable, Core.Model, "Core.Model");
/* global Sys, Core */
Sys.ns("Core");

/**
 * The base View class.
 *
 * This class should be used as base when creating a new view.
 *
 * @class Core.View
 * @extends Sys.Observable
 * @aside guide events__events
 */
Core.View = {

    /**
     * @cfg name The name of the module
     */

    /**
     * @cfg model The model
     */

    /**
     * @constructs
     * @param {Object} config The configuration object.
     * @returns {void}
     */
    constructor: function(config) {
        Core.View.superclass.constructor.apply(this, arguments);

        this.init(config);
    },

    /**
     * Initialize the View.
     *
     * @protected
     * @param {Object} config The configuration object.
     * @returns {void}
     */
    init: function(config) {
        this.model = config.model;
        this.MODULE_NAME = config.name;

        this.setupEvents();
    },

    /**
     * Setup the event listeners.
     *
     * @protected
     * @returns {void}
     */
    setupEvents: function() {
        // Intentionally left empty
    }

};

Core.View = Sys.extend(Sys.Observable, Core.View, "Core.View");
/**
 * Audio Context Polyfill
 *
 * Since Chrome 55 and the removal of the webkitAudioContext, this is a polyfill to support the new
 * Web Audio API through multiple browsers. What it does is if a browser does not have access to the
 * new API, it creates methods with the new names and any additional functionality for the framework
 * to work.
 *
 * The old API will in this case still work, but the new API as well, so any products using the
 * framework with old API will still work.
 *
 * Because of all this, the recommended usage is to only use the new API.
 *
 * See MDN for more information:
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Porting_webkitAudioContext_code_to_standards_based_AudioContext
 *
 * Link to AudioContext API:
 * https://developer.mozilla.org/en/docs/Web/API/AudioContext
 */

/* eslint-disable wrap-iife */
(function(globals) {
    "use strict";

    var WebkitAudioContext = globals.webkitAudioContext,
        fixSetTarget = function(param) {
            if (!param) {
                return;
            }
            if (!param.setTargetAtTime) {
                param.setTargetAtTime = param.setTargetValueAtTime;
            }
        };

    // If new context does not exist, but this is a webkit browser, start the polyfill process
    if (!globals.AudioContext && WebkitAudioContext) {
        window.AudioContext = WebkitAudioContext;

        // These checks are for Safari, since in some versions the new API is used, but still within
        // the old context. Therefor we have to explicitly check whether the new API is supported or not
        // per requested function.
        if (!WebkitAudioContext.prototype.createGain) {
            AudioContext.prototype._createGain = WebkitAudioContext.prototype.createGainNode;
            AudioContext.prototype.createGain = function() {
                var node = this._createGain();

                fixSetTarget(node.gain);
                return node;
            };
        }

        if (!WebkitAudioContext.prototype.createDelay) {
            AudioContext.prototype._createDelay = WebkitAudioContext.prototype.createDelayNode;
            AudioContext.prototype.createDelay = function() {
                var node = this._createDelay();

                fixSetTarget(node.delayTime);
                return node;
            };
        }

        AudioContext.prototype.createScriptProcessor = WebkitAudioContext.prototype.createScriptProcessor || WebkitAudioContext.prototype.createJavascriptNode;

        AudioContext.prototype._createOscillator = WebkitAudioContext.prototype.createOscillator;
        AudioContext.prototype.createOscillator = function() {
            var osc = this._createOscillator();

            if (!osc.start) {
                osc.start = osc.noteOn;
            }
            if (!osc.stop) {
                osc.stop = osc.noteOff;
            }

            return osc;
        };

        AudioContext.prototype._createBufferSource = WebkitAudioContext.prototype.createBufferSource;
        AudioContext.prototype.createBufferSource = function() {
            var src = this._createBufferSource();

            if (!src.start) {
                src.start = src.noteGrainOn || src.noteOn;
            }
            if (!src.stop) {
                src.stop = src.noteOff;
            }
            fixSetTarget(src.playbackRate);
            return src;
        };
    }
})(window);
/* global Sys, Platform */
Sys.ns("Platform");

/**
 * The Platform Manager.
 *
 * @deprecated Will be replaced by Utils.Platform.
 * @class Platform.PlatformManager
 */
Platform.PlatformManager = {

    /**
     * Array containing (in order) all available resource bundles used.
     * This will be populated by the resource bundle files. Include the files in the order you want the platforms to be tested.
     * @deprecated Use feature detection.
     * @type {String[]}
     */
    AVAILABLE_RESOURCE_BUNDLES: [],

    /**
     * Queries the user agent string for various things and sets flags in the Platform scope that can then
     * be used by the various bundles to determine if their requirements are met.
     *
     * @private
     * @deprecated Don't do things based on user agent! Use feature detection.
     * @returns {void}
     */
    gatherUserAgentInformation: function() {
        var userAgent = navigator.userAgent.toLowerCase(),
            details;

        // Windows handhelds
        if (/Windows Phone/i.test(userAgent)) {
            Platform.isWindowsMobileDevice = true;
            Platform.isWindowsHandHeldDevice = true;
            Platform.isMobileDevice = true;
        }
        else if (/\sarm;/.test(userAgent) && (/trident/).test(userAgent)) {
            Platform.isWindowsTabletDevice = true;
            Platform.isWindowsHandHeldDevice = true;

            // Checks if both touch and mouse-support for cross-hybrids or if phone in desktop-mode
            if ((navigator.msMaxTouchPoints > 0 && window.MouseEvent) || (/touch; wpdesktop/).test(userAgent)) {
                Platform.isTabletDevice = false;
            }
            else {
                Platform.isTabletDevice = true;
            }
        }

        // Apple devices
        if (/ipod|ipad|iphone/i.test(userAgent) && !(Platform.isWindowsHandHeldDevice === true)) {
            Platform.isIOSDevice = true;

            if (/ipad/i.test(userAgent)) {
                Platform.isTabletDevice = true;
            }
            else {
                Platform.isMobileDevice = true;
            }
            Platform.iPhoneX = (function() {
                // Get the device pixel ratio and
                // define the users device screen dimensions.
                var ratio = window.devicePixelRatio || 1,
                    screen = {
                        width: window.screen.width * ratio,
                        height: window.screen.height * ratio
                    };

                // iPhone X Detection
                return ((screen.width === 1125 && screen.height === 2436) || (screen.width === 2436 && screen.height === 1125));
            }());
        }

        // Android devices
        if (/Android/i.test(userAgent) && !(Platform.isWindowsHandHeldDevice === true)) {
            Platform.isAndroidDevice = true;

            details = userAgent.match(/Android (\d+)(\.\d*)*/i);
            Platform.isAndroidMajorVersion = Number(details[1]);
            Platform.isAndroidMinorVersion = Number(details[2]);

            if (/mobile/i.test(userAgent)) {
                Platform.isMobileDevice = true;
            }
            else {
                Platform.isTabletDevice = true;
            }

            if (/Chrome/i.test(userAgent)) {
                Platform.isChromeBrowser = true;

                details = userAgent.match(/Chrome\/(\d+)\.(\d+)/i);
                Platform.isChromeMajorVersion = Number(details[1]);
                Platform.isChromeMinorVersion = Number(details[2]);
            }
            else {
                Platform.isAndroidStockBrowser = true;
            }

            if (/GT-I9100/i.test(userAgent)) {
                Platform.isSamsungS2Device = true;
            }
            if (/GT-I9300/i.test(userAgent)) {
                Platform.isSamsungS3Device = true;
            }
            if (/GT-I9505|GT-I9521|GT-I9525/i.test(userAgent)) {
                Platform.isSamsungS4Device = true;
            }
        }

        // Desktop devices
        // We check for not mobile/tablet to make emulation work properly
        if (!Sys.isDefined(window.orientation) && !Platform.isMobileDevice && !Platform.isTabletDevice) {
            Platform.isDesktopDevice = true;
        }

        Platform.isIEBrowser = /trident/i.test(userAgent);
        Platform.isEdgeBrowser = /edge/i.test(userAgent);
        Platform.isSafariBrowser = /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent);

        if (!Platform.isDesktopDevice) {
            Platform.isLowEndDevice = this.checkIfLowEndDevice(userAgent);
            Platform.isVibrationAPISupported = this.isVibrationAPISupported(navigator);
        }
    },

    /**
     * @deprecated Use feature detection.
     * @param {string} userAgent User agent string.
     * @returns {boolean} If low end device or not.
     */
    checkIfLowEndDevice: function(userAgent) {
        var lowEnd = false;

        if (
            // Android
            Platform.isAndroidStockBrowser || ((Platform.isAndroidMajorVersion === 4 && Platform.isAndroidMinorVersion <= 3) && Platform.isAndroidMajorVersion < 5) ||
            // iPhone & iPad
            Sys.isIphone3GS || (Sys.isiPad && !window.matchMedia("(-webkit-min-device-pixel-ratio: 2)").matches) ||
            // Windows phone
            (Platform.isWindowsHandHeldDevice && this.isLowMemoryWinPhone(userAgent)) ||
            // WebGL support
            !this.isWebGLSupported()
        ) {
            lowEnd = true;

            
        }

        return lowEnd;
    },

    /**
     * @deprecated Use feature detection.
     * @param {string} userAgent User agent string.
     * @returns {boolean} If low memory Windows phone.
     */
    isLowMemoryWinPhone: function(userAgent) {
        var details,

            // add phone models to check against
            models = [];

        if (/Lumia/i.test(userAgent)) {
            // Nokia phones
            details = userAgent.match(/[L|l]umia (\d+)/i);

            if (models.indexOf(details[1]) > -1) {
                return true;
            }
        }
        return false;
    },

    /**
     * @deprecated Use Utils.Platform.isWebGLSupported.
     * @returns {boolean} True or false.
     */
    isWebGLSupported: function() {
        var contextOptions = { stencil: true },
            canvas,
            gl;

        try {
            if (!window.WebGLRenderingContext) {
                return false;
            }

            canvas = document.createElement("canvas");
            gl = canvas.getContext("webgl", contextOptions) || canvas.getContext("experimental-webgl", contextOptions);

            return Boolean(gl && gl.getContextAttributes().stencil);
        }
        catch (e) {
            return false;
        }
    },

    /**
     * Checks if the platform supports vibration API.
     *
     * @private
     * @deprecated Use Utils.Platform.isVibrationAPISupported.
     * @param {Navigator} navigator The navigator in a browser.
     * @returns {boolean} Whether or not vibration API is supported.
     */
    isVibrationAPISupported: function(navigator) {
        return Sys.isDefined(navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate);
    },

    /**
     * Gathers other information on the device and sets flags in the Platform scope that can then
     * be used by the various bundles to determine if their requirements are met.
     *
     * @private
     * @deprecated Use Utils.Platform.
     * @returns {void}
     */
    detectPlatformFeatures: function() {
        var fn,
            i;

        // Even if the stock browser says that it has web audio it tends not to work
        Platform.hasWebAudioContext = this.isWebAudioContextAvailable() &&
            !Platform.isAndroidStockBrowser;

        Platform.hasFullscreenAPI = false;

        fn = ["exitFullscreen", "webkitExitFullscreen", "webkitCancelFullScreen", "mozCancelFullScreen", "msExitFullscreen"];

        for (i = 0; i < fn.length; i++) {
            if (fn[i] in document) {
                Platform.hasFullscreenAPI = true;
                break;
            }
        }
    },

    /**
     * Helper function for detectPlatformFeatures that determines if there is any web audio context available.
     *
     * @private
     * @deprecated Use Utils.Platform.isWebAudioAPISupported.
     * @returns {boolean} If web audio context is available.
     */
    isWebAudioContextAvailable: function() {
        return Sys.isDefined(window.AudioContext);
    },

    /**
     * Uses the flags set by gatherUserAgentInformation and detectPlatformFeatures to set some additional
     * ones that depend on a mix of user agent info and device features.
     *
     * @private
     * @deprecated Should not have device detection. Use feature detection instead from Utils.Platform.
     * @returns {void}
     */
    consolidatePlatformKnowledge: function() {
        var platformIsAndroid4_3 = Platform.isAndroidMajorVersion === 4 && Platform.isAndroidMinorVersion === 3,
            platformIsSamsungS3orS4 = Platform.isSamsungS3Device || Platform.isSamsungS4Device,
            deviceIsWebAudioDisabled = Platform.isAndroidStockBrowser;

        deviceIsWebAudioDisabled = deviceIsWebAudioDisabled || Platform.isIphone3GSDevice;
        deviceIsWebAudioDisabled = deviceIsWebAudioDisabled || (platformIsAndroid4_3 && platformIsSamsungS3orS4 && Platform.isChromeMajorVersion === 28);

        Platform.isWebAudioEnabled = Platform.hasWebAudioContext && !deviceIsWebAudioDisabled;
    },

    /**
     * Function called just before the resource bundle is determined to apply any overrides to
     * the flags that might be needed for various reasons.
     * Override this function if you have any game specific cases or override the specific bundles.
     *
     * @private
     * @deprecated No overrides. Sorry.
     * @returns {void}
     */
    applyOverrides: function() {
        // Intentionally left empty
    },

    /**
     * If the bundle is not yet determine this function will gather the necessary information to the Platform
     * scope and then go through the list of available bundles to determine which bundle to use.
     * The used bundle is then set as Platform.resourceBundle.
     *
     * @deprecated Use Utils.Platform instead or should be handled by module specific configuration.
     * @returns {void}
     */
    determineResourceBundle: function() {
        var me = this,
            i,
            bundle;

        if (Sys.isDefined(Platform.resourceBundle)) {
            return;
        }

        me.detectPlatformFeatures();
        me.consolidatePlatformKnowledge();
        me.applyOverrides();

        for (i = 0; i < me.AVAILABLE_RESOURCE_BUNDLES.length; i++) {
            bundle = Platform["_" + me.AVAILABLE_RESOURCE_BUNDLES[i]];
            if (bundle.requirementsAreMet()) {
                Platform.resourceBundle = bundle;
                Platform.resourceBundle.preloadAudio = bundle.preloadAudio();
                try {
                    Platform.hasWebGLContext = bundle.preloadOptionalWebGLLibrary();
                }
                catch (e) {
                    break;
                }
            }
        }

        me.applyFeatureDetectedProperties();
    },

    /**
     * Applies properties to the resource bundle depending on feature detection.
     *
     * @deprecated Use Utils.Platform instead.
     * @returns {void}
     */
    applyFeatureDetectedProperties: function() {
        Platform.resourceBundle.loaderResourceKeys.audio = this.determineAudioConfiguration(Platform.resourceBundle.loaderResourceKeys.audio);
    },

    /**
     * Determines what audio configuration should be used from the platform properties and the given format.
     *
     * @deprecated Should be handled in ECAS.
     * @param {string} fileFormat The file format of the audio files to use (ogg or mp3).
     * @returns {string} The name of the audio configuration to use.
     */
    determineAudioConfiguration: function(fileFormat) {
        var audioType = Platform.hasWebAudioContext ? "webAudio" : "legacyAudio",
            sprite = "",
            postFix,
            suffix;

        if (audioType === "webAudio" && !Platform.isDesktopDevice) {
            // Option for a type/platform specific audio config
            postFix = (Platform.resourceBundle.audioType && Platform.resourceBundle.audioType.postFix) ? Platform.resourceBundle.audioType.postFix : "_mobile";

            audioType += postFix || "_mobile";
            sprite = "_sprite";
        }

        suffix = "_" + fileFormat + sprite;

        

        return audioType + suffix;
    }
};
/* global Sys, Platform */
Sys.ns("Platform");

/**
 * Android resource bundle.
 *
 * @class Platform._android
 */
Platform._android = {

    /**
     * The platform identifier, used mainly for debugging.
     */
    IDENTIFIER: "Android",

    /**
     * An object describing all platform specific resources this bundle should
     * contain and that should be fetched during the load process.
     *
     */
    loaderResourceKeys: {
        GFX: "960x540",
        audio: "ogg"
    },

    /**
     * Function that will determine if the requirements to use this bundle are met.
     *
     * @returns {boolean} If requirements are met.
     */
    requirementsAreMet: function() {
        return Platform.isAndroidDevice;
    },

    /**
     * If sound should be loaded and decoded during load (only do it if web audio is supported).
     *
     * @returns {boolean} Default returns to false.
     */
    preloadAudio: function() {
        return false;
    },

    /**
     * If the high-end view should trigger a WebGL-library
     * default is set to false, currently the only supported adapter is PIXI.
     *
     * @returns {boolean} Default returns to false.
     */
    preloadOptionalWebGLLibrary: function() {
        return false;
    }
};

Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("android");
/* global Sys, Platform */
Sys.ns("Platform");

/**
 * Resource bundle for generic mobile devices (and tablets).
 *
 * @class Platform._mobile
 */
Platform._mobile = {

    /**
     * The platform identifier, used mainly for debugging.
     */
    IDENTIFIER: "mobile",

    /**
     * An object describing all platform specific resources this bundle should
     * contain and that should be fetched during the load process.
     */
    loaderResourceKeys: {
        GFX: "960x540",
        audio: "mp3"
    },

    /**
     * Function that will determine if the requirements to use this bundle are met.
     *
     * @returns {boolean} If requirements are met.
     */
    requirementsAreMet: function() {
        return !Platform.isDesktopDevice && !Platform.isLowEndDevice;
    },

    /**
     * If sound should be loaded and decoded during load.
     *
     * @returns {boolean} Default set to false.
     */
    preloadAudio: function() {
        return false;
    },

    /**
     * If the high-end view should trigger a WebGL-library
     * default is set to false, currently the only supported adapter is PIXI.
     *
     * @returns {boolean} Default set to false.
     */
    preloadOptionalWebGLLibrary: function() {
        return false;
    }
};

Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("mobile");
/* global Sys, Platform */
Sys.ns("Platform");

/**
 * Resource bundle for low end mobile devices (and tablets).
 *
 * @class Platform._mobile_low
 */
Platform._mobile_low = {

    /**
     * The platform identifier, used mainly for debugging
     */
    IDENTIFIER: "mobileLow",

    /**
     * An object describing all platform specific resources this bundle should
     * contain and that should be fetched during the load process.
     */
    loaderResourceKeys: {
        GFX: "960x540",
        audio: "mp3"
    },

    /**
     * Function that will determine if the requirements to use this bundle are met.
     *
     * @returns {boolean} If requirements are met.
     */
    requirementsAreMet: function() {
        return !Platform.isDesktopDevice && Platform.isLowEndDevice;
    },

    /**
     * If sound should be loaded and decoded during load.
     *
     * @returns {boolean} Default returns to false.
     */
    preloadAudio: function() {
        return false;
    },

    /**
     * If the high-end view should trigger a WebGL-library
     * default is set to false, currently the only supported adapter is PIXI.
     *
     * @returns {boolean} Default returns to false.
     */
    preloadOptionalWebGLLibrary: function() {
        return false;
    }

};

Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("mobile_low");
/* global Sys, Platform */
Sys.ns("Platform");

/**
 * Resource bundle for low end Android devices (and tablets).
 *
 * @class Platform._android_low
 */
Platform._android_low = {

    /**
     * The platform identifier, used mainly for debugging.
     */
    IDENTIFIER: "androidLow",

    /**
     * An object describing all platform specific resources this bundle should
     * contain and that should be fetched during the load process.
     *
     */
    loaderResourceKeys: {
        GFX: "960x540",
        audio: "ogg"
    },

    /**
     * Function that will determine if the requirements to use this bundle are met.
     *
     * @returns {boolean} If requirements are met.
     */
    requirementsAreMet: function() {
        return Platform.isAndroidDevice && Platform.isLowEndDevice;
    },

    /**
     * If sound should be loaded and decoded during load (only do it if web audio is supported).
     *
     * @returns {boolean} Default returns to false.
     */
    preloadAudio: function() {
        return false;
    },

    /**
     * If the high-end view should trigger a WebGL-library
     * default is set to false, currently the only supported adapter is PIXI.
     *
     * @returns {boolean} Default returns to false.
     */
    preloadOptionalWebGLLibrary: function() {
        return false;
    }
};

Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("android_low");
/* global Sys, Platform */
Sys.ns("Platform");

/**
 * Default resource bundle for desktop devices.
 *
 * @class Platform._desktop
 */
Platform._desktop = {

    /**
     * The platform identifier, used mainly for debugging.
     */
    IDENTIFIER: "Desktop",

    /**
     * An object describing all platform specific resources this bundle should
     * contain and that should be fetched during the load process.
     *
     */
    loaderResourceKeys: {
        GFX: "1280x720",
        audio: "ogg"
    },

    /**
     * Function that will determine if the requirements to use this bundle are met.
     *
     * @returns {boolean} If requirements are met.
     */
    requirementsAreMet: function() {
        return Platform.isDesktopDevice;
    },

    /**
     * If sound should be loaded and decoded during load (only do it if web audio is supported).
     *
     * @returns {boolean} If platform has web audio context.
     */
    preloadAudio: function() {
        return Platform.hasWebAudioContext;
    },

    /**
     * If the high-end view should trigger a WebGL-library
     * default is set to false, currently the only supported adapter is PIXI.
     *
     * @returns {boolean} Default returns to false.
     */
    preloadOptionalWebGLLibrary: function() {
        return false;
    }
};

Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("desktop");
/* global Sys, Platform */
Sys.ns("Platform");

/**
 * Resource bundle for desktop devices running Edge.
 *
 * @class Platform._desktop_edge
 */
Platform._desktop_edge = {

    /**
     * The platform identifier, used mainly for debugging.
     */
    IDENTIFIER: "Desktop Edge",

    /**
     * An object describing all platform specific resources this bundle should
     * contain and that should be fetched during the load process.
     *
     */
    loaderResourceKeys: {
        GFX: "1280x720",
        audio: "mp3"
    },

    /**
     * Function that will determine if the requirements to use this bundle are met.
     *
     * @returns {boolean} If requirements are met.
     */
    requirementsAreMet: function() {
        return Platform.isDesktopDevice && Platform.isEdgeBrowser;
    },

    /**
     * If sound should be loaded and decoded during load (only do it if web audio is supported).
     *
     * @returns {boolean} If platform has web audio context.
     */
    preloadAudio: function() {
        return Platform.hasWebAudioContext;
    },

    /**
     * If the high-end view should trigger a WebGL-library
     * default is set to false, currently the only supported adapter is PIXI.
     *
     * @returns {boolean} Default returns to false.
     */
    preloadOptionalWebGLLibrary: function() {
        return false;
    }
};

Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("desktop_edge");
/* global Sys, Platform */
Sys.ns("Platform");

/**
 * Resource bundle for desktop devices running Internet Explorer.
 *
 * @class Platform._desktop_IE
 */
Platform._desktop_IE = {

    /**
     * The platform identifier, used mainly for debugging.
     */
    IDENTIFIER: "Desktop IE",

    /**
     * An object describing all platform specific resources this bundle should
     * contain and that should be fetched during the load process.
     *
     */
    loaderResourceKeys: {
        GFX: "1280x720",
        audio: "mp3"
    },

    /**
     * Function that will determine if the requirements to use this bundle are met.
     *
     * @returns {boolean} If requirements are met.
     */
    requirementsAreMet: function() {
        return Platform.isDesktopDevice && Platform.isIEBrowser;
    },

    /**
     * If sound should be loaded and decoded during load (only do it if web audio is supported).
     *
     * @returns {boolean} If platform has web audio context.
     */
    preloadAudio: function() {
        return Platform.hasWebAudioContext;
    },

    /**
     * If the high-end view should trigger a WebGL-library
     * default is set to false, currently the only supported adapter is PIXI.
     *
     * @returns {boolean} Default returns to false.
     */
    preloadOptionalWebGLLibrary: function() {
        return false;
    }
};

Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("desktop_IE");
/* global Sys, Platform */
Sys.ns("Platform");

/**
 * Resource bundle for desktop devices running Safari.
 *
 * @class Platform._desktop_safari
 */
Platform._desktop_safari = {

    /**
     * The platform identifier, used mainly for debugging.
     */
    IDENTIFIER: "Desktop Safari",

    /**
     * An object describing all platform specific resources this bundle should
     * contain and that should be fetched during the load process.
     *
     */
    loaderResourceKeys: {
        GFX: "1280x720",
        audio: "mp3"
    },

    /**
     * Function that will determine if the requirements to use this bundle are met.
     *
     * @returns {boolean} If requirements are met.
     */
    requirementsAreMet: function() {
        return Platform.isDesktopDevice && Platform.isSafariBrowser;
    },

    /**
     * If sound should be loaded and decoded during load (only do it if web audio is supported).
     *
     * @returns {boolean} If platform has web audio context.
     */
    preloadAudio: function() {
        return Platform.hasWebAudioContext;
    },

    /**
     * If the high-end view should trigger a WebGL-library
     * default is set to false, currently the only supported adapter is PIXI.
     *
     * @returns {boolean} Default returns to false.
     */
    preloadOptionalWebGLLibrary: function() {
        return false;
    }
};

Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("desktop_safari");
/* global Sys, Platform */
Sys.ns("Platform");

/**
 * Default resource bundle that uses the lowest quality of all resources.
 *
 * @class Platform._default
 */
Platform._default = {

    /**
     * The platform identifier, used mainly for debugging.
     */
    IDENTIFIER: "Default",

    /**
     * An object describing all platform specific resources this bundle should
     * contain and that should be fetched during the load process.
     *
     */
    loaderResourceKeys: {
        GFX: "960x540",
        audio: "mp3"
    },

    /**
     * Function that will determine if the requirements to use this bundle are met.
     *
     * @returns {boolean} If requirements are met.
     */
    requirementsAreMet: function() {
        return false;
    },

    /**
     * If sound should be loaded and decoded during load.
     *
     * @returns {boolean} Default returns to false.
     */
    preloadAudio: function() {
        return false;
    },

    /**
     * If the high-end view should trigger a WebGL-library
     * default is set to false, currently the only supported adapter is PIXI.
     *
     * @returns {boolean} Default returns to false.
     */
    preloadOptionalWebGLLibrary: function() {
        return false;
    }
};

Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("default");
/* global Sys, Utils, EventHandler, Platform, verge */
Sys.ns("Utils");

/**
 * Platform utilities. This detects features in the browser and returns values based on said features.
 *
 * Supported devices:
 *
 * | Device            | OS                              | Browser                              |
 * | ----------------- | ------------------------------- | ------------------------------------ |
 * | Smartphone/tablet | iOS 9.3+                        | Safari (zoomed and standard view)    |
 * |                   |                                 | WebApp (saved to home screen)        |
 * |                   |                                 | Chrome for iOS (latest version)      |
 * |                   | Android 4.4+                    | Chrome (56+)                         |
 * |                   |                                 | Stock browser (Samsung Browser 4.0+) |
 * | Desktop           | Windows 7+                      | Chrome (56+) (flash 25+)             |
 * |                   |                                 | IE 11+ (flash 25+)                   |
 * |                   |                                 | Firefox (latest version) (flash 25+) |
 * |                   | Windows 10+                     | Chrome (56+) (flash 25+)             |
 * |                   |                                 | Edge (latest version) (flash 25+)    |
 * |                   |                                 | Firefox (latest version) (flash 25+) |
 * |                   | OS X 10.9+                      | Safari 9+ (flash 25+)                |
 * |                   |                                 | Chrome (56+) (flash 25+)             |
 */
Utils.Platform = {

    DEBUG: false,
    LANDSCAPE: "LANDSCAPE",
    PORTRAIT: "PORTRAIT",

    /**
     * Binds event listeners on window for detecting various window event changes such as
     * orientation, page visibility and resizing.
     *
     * @returns {void}
     */
    init: function() {
        var me = this,
            pageVisibility;

        window.addEventListener("orientationchange", function() {
            var orientation = me.getOrientation();

            if (me.DEBUG) {
                
            }

            EventHandler.dispatchEvent("notify:platform.orientationChanged", orientation);
        }, false);

        window.addEventListener("resize", function() {
            if (me.DEBUG) {
                
            }

            EventHandler.dispatchEvent("notify:platform.resized");
        }, false);

        pageVisibility = this.getPageVisibilityAPI();
        if (pageVisibility) {
            document.addEventListener(pageVisibility.event, function() {
                var hidden = document[pageVisibility.type];

                if (me.DEBUG) {
                    
                }

                EventHandler.dispatchEvent("notify:platform.visibilityChanged", hidden);

                // @deprecated this event is only fired for legacy reasons
                EventHandler.dispatchEvent("pageVisibilityChanged_event", hidden);
            }, false);
        }
    },

    /**
     * Retrieves browser orientation in a cross-browser compatible way.
     * Still needs some logic to handle orientation specifics when executed in an iframe.
     *
     * @returns {string} Orientation string (LANDSCAPE|PORTRAIT).
     */
    getOrientation: function() {
        if (Platform.isDesktopDevice || Platform.isTabletDevice) {
            return this.LANDSCAPE;
        }

        if (!this.inIframe() && window.screen && window.screen.orientation) {
            return window.screen.orientation.type.indexOf("portrait") > -1 ? this.PORTRAIT : this.LANDSCAPE;
        }

        if (document.documentElement.clientWidth >= document.documentElement.clientHeight) {
            return this.LANDSCAPE;
        }

        return this.PORTRAIT;
    },

    /**
     * Checks if given orientation is landscape. If orientation is undefined, will retrieve orientation from the browser
     * and check that one instead.
     *
     * @param {string} [orientation] Orientation value.
     * @returns {boolean} Whether or not passed value or browser is in landscape.
     */
    isLandscape: function(orientation) {
        return typeof orientation !== "undefined" ? orientation === this.LANDSCAPE : this.getOrientation() === this.LANDSCAPE;
    },

    /**
     * Checks if given orientation is portrait. If orientation is undefined, will retrieve orientation from the browser
     * and check that one instead.
     *
     * @param {string} [orientation] Orientation value.
     * @returns {boolean} Whether or not passed value or browser is in portrait.
     */
    isPortrait: function(orientation) {
        return typeof orientation !== "undefined" ? orientation === this.PORTRAIT : this.getOrientation() === this.PORTRAIT;
    },

    /**
     * Checks if browser is currently in an iframe. Try and catch exists because browsers can block window.top due to
     * same origin policy. IE bugs may also be present.
     *
     * @returns {boolean} Whether or not in an iframe.
     */
    inIframe: function() {
        try {
            return window.self !== window.top;
        }
        catch (e) {
            return true;
        }
    },

    /**
     * Checks if current device is touch supported or not.
     *
     * @returns {boolean} Whether or not this is a touch device.
     *
     * Vendor prefix 'msMaxTouchPoints' should be removed in upcoming releases since support was removed in IE11.
     */
    isTouchSupported: function() {
        return (("ontouchstart" in window) ||
            ("ontouchstart" in document.documentElement) ||
            (navigator.MaxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    },

    /**
     * Retrieves input events related to the device being used, i.e. touch or not.
     *
     * @returns {Object} Object containing input events: down for pressing down and up for releasing.
     */
    getInputEvents: function() {
        var touchSupport = this.isTouchSupported();

        return {
            down: touchSupport ? "touchstart" : "mousedown",
            up: touchSupport ? "touchend" : "mouseup"
        };
    },

    /**
     * Checks if browser supports 3d transforms.
     *
     * @returns {boolean} Whether or not 3d transforms is supported.
     */
    is3DTransformSupported: function() {
        var el = document.createElement("p"),
            transforms = [
                "-webkit-transform",
                "-o-transform",
                "-ms-transform",
                "-moz-transform",
                "transform"
            ],
            has3d = false;

        if (!window.getComputedStyle) {
            return false;
        }

        // Add it to the body to get the computed style
        document.body.insertBefore(el, null);

        transforms.forEach(function(t) {
            if (el.style[t]) {
                el.style[t] = "translate3d(1px,1px,1px)";
                has3d = window.getComputedStyle(el).getPropertyValue(t);
            }
        });

        document.body.removeChild(el);

        return has3d && has3d.length > 0 && has3d !== "none";
    },

    /**
     * @deprecated Will later be replaced by fscreen.
     * @see {@link https://github.com/rafrex/fscreen}
     * @returns {boolean} Whether or not full screen API is supported.
     */
    isFullScreenAPISupported: function() {
        var fn = ["exitFullscreen", "webkitExitFullscreen", "mozCancelFullScreen", "msExitFullscreen"];

        return fn.some(function(method) {
            return method in document;
        });
    },

    /**
     * Helper function for detectPlatformFeatures that determines if there is any web audio context available.
     *
     * @returns {?Object} If web audio context is available.
     */
    isWebAudioAPISupported: function() {
        return window.AudioContext || null;
    },

    /**
     * Checks if the platform supports vibration API.
     *
     * @returns {?Object} Whether or not vibration API is supported.
     */
    isVibrationAPISupported: function() {
        return window.navigator.vibrate || window.navigator.webkitVibrate || window.navigator.mozVibrate || null;
    },

    /**
     * Checks whether WebGL is supported in the browser or not.
     *
     * @see {@link http://www.studyjs.com/webgl/webglcontext.html}
     * @returns {boolean} True if WebGl is supported, false if not.
     */
    isWebGLSupported: function() {
        var canvas = document.createElement("canvas"),
            webglContextParams = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"],
            webglContext = null,
            index;

        for (index = 0; index < webglContextParams.length; index++) {
            try {
                webglContext = canvas.getContext(webglContextParams[index]);
                if (webglContext) {
                    return true;
                }
            }
            catch (e) {
                return false;
            }
        }

        return false;
    },

    /**
     * Checks if page visibility API is supported in the browser.
     *
     * @returns {?Object} Object containing document property and event for detecting. Null if not supported.
     */
    getPageVisibilityAPI: function() {
        if (!document.hidden) {
            return {
                type: "hidden",
                event: "visibilitychange"
            };
        }
        else if (document.webkitHidden) {
            return {
                type: "webkitHidden",
                event: "webkitvisibilitychange"
            };
        }

        return null;
    },

    /**
     * Viewport is what the user can see in the browser and thus does not include scrollbars and such. This method
     * returns the value for the document element's client width and height and is regarded as cross-browser compatible.
     *
     * @returns {{width: number, height: number}} Document element client width and height.
     */
    getViewportSize: function() {
        var viewport = verge.viewport();

        return {
            width: viewport.width,
            height: viewport.height
        };
    },

    /**
     * Gets the size (in pixels) of the browser window viewport including, if rendered, the vertical scrollbar.
     *
     * @deprecated Replace this with verge.
     * @see {@link https://github.com/ryanve/verge}
     * @returns {{width: number, height: number}} Returns the inner dimensions of the viewport.
     */
    getViewportInnerSize: function() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    },

    /**
     * Gets the size of the outside of the browser window. It represents the size of the whole browser window including
     * sidebar (if expanded), window chrome and window resizing borders/handles.
     *
     * @deprecated Replace this with verge.
     * @see {@link https://github.com/ryanve/verge}
     * @returns {{width: number, height: number}} Returns the outer dimensions of the viewport.
     */
    getViewportOuterSize: function() {
        return {
            width: window.outerWidth,
            height: window.outerHeight
        };
    },

    /**
     * Gets the device size through the Screen interface. Note that device size is static and does not change when the
     * page is resized or rotated.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen}
     * @returns {?Object} Screen interface.
     */
    getDeviceSize: function() {
        return window.screen || null;
    },

    /**
     * Gets the device pixel ratio. This is used to determine how the resolution is interpreted by CSS.
     * The formula for calculating a device logical (or interpreted) resolution is:
     * logical resolution = physical resolution / device pixel ratio.
     *
     * @example
     * iPhone 6
     * Actual resolution: 750 x 1334
     * CSS pixel ratio: 2
     * Logical resolution: (750 / 2) x (1334 / 2) = 375 x 667
     *
     * @returns {?number} Device pixel ratio.
     */
    getDevicePixelRatio: function() {
        return window.devicePixelRatio || null;
    },

    /**
     * Checks if browser is in "standalone" mode or not. This is an iOS specific property for detecting whether the app
     * is saved to home screen or not.
     *
     * @returns {boolean} If stand alone or not.
     */
    isStandAlone: function() {
        return window.navigator.standalone;
    }
};
/* global Sys, Platform, Game, Utils, Resources, Services */
Sys.ns("Sys");

/**
 * The static Environment class is responsible for keeping track of
 * all environmental properties and changes (like orientation and viewport size).
 *
 * Instantiates itself.
 *
 * @class Sys.Environment
 * @extends Sys.Observable
 * @static
 */
Sys.Environment = {

    constructor: function(config) {
        Sys.Environment.superclass.constructor.apply(this, arguments);

        this.defaultResolutions = {
            mobile: {
                "default": {
                    width: 960,
                    height: 540,
                    pixelFactor: 1,
                    portraitTopOffset: 0.3
                }
            },
            tablet: {
                "default": {
                    width: 960,
                    height: 540,
                    pixelFactor: 1
                }
            },
            desktop: {
                "default": {
                    width: 1280,
                    height: 720,
                    pixelFactor: 1.33
                }
            }
        };

        this.defaultVirtualResolutions = {
            "default": {
                "default": {
                    width: 1280,
                    height: 720
                }
            }
        };

        this.onResized();
        this.setupEvents();
    },

    /**
     * @listens notify:platform.resized
     * @returns {void}
     */
    setupEvents: function() {
        this.on({
            "notify:platform.resized": this.onResized
        });
    },

    /**
     * Is called when an resize change is in effect, prompted either by the device or the system.
     *
     * @private
     * @returns {void}
     */
    onResized: function() {
        document.documentElement.style.fontSize = parseInt(this.determineResolution().resolution.pixelFactor * 100, 10) + "px";
    },

    /**
     * Get the platform specific screen resolution used.
     *
     * @deprecated 8.0.0. Use Environment.determineResolution().resolution instead.
     * @returns {{width: number, height: number}} The resolution.
     */
    getResolution: function() {
        return this.determineResolution().resolution;
    },

    /**
     * Get the virtual stage resolution.
     *
     * @deprecated 8.0.0. Use Environment.determineResolution().virtualResolution instead.
     * @returns {{width: number, height: number}} The dimensions of the stage.
     */
    getStageResolution: function() {
        return this.determineResolution().virtualResolution;
    },

    /**
     * Getter for checking if custom canvas size is allowed.
     *
     * @returns {boolean} Returns true if custom canvas size is allowed.
     */
    allowsCustomCanvasSize: function() {
        return Boolean(window.RESOLUTIONS_CONFIG && window.VIRTUAL_RESOLUTIONS_CONFIG);
    },

    /**
     * Get the current viewport orientation. Note: this might differ from the actual device's orientation.
     *
     * @deprecated 8.0.0. Use Utils.Platform.getOrientation() instead.
     * @param {boolean} [useScreenOrientation] Whether or not to use the screen orientation instead of the viewport orientation.
     * @returns {string} Returns PORTRAIT or LANDSCAPE.
     */
    getViewportOrientation: function(useScreenOrientation) {
        if (this.allowsCustomCanvasSize() && !useScreenOrientation) {
            return this.viewportOrientation;
        }

        return this.orientation();
    },

    /**
     * Get the current resolutions pixel factor .
     *
     * @deprecated 8.0.0. Use Environment.determineResolution().resolution.pixelFactor instead.
     * @returns {number} Returns the current pixel factor.
     */
    getCurrentResolutionPixelFactor: function() {
        return this.determineResolution().resolution.pixelFactor;
    },

    /**
     * Convert the value from virtual scale to window scale.
     *
     * @deprecated 8.0.0. Use toFixed and parseFloat.
     * @param {number} value The virtual number to scale.
     * @param {number} [dec= 0] The optional number of decimals to use (defaults to zero).
     * @returns {number} The scaled value.
     */
    scaleValue: function(value, dec) {
        var decimals = Sys.isNumber(dec) ? dec : 0;

        return parseFloat(value.toFixed(decimals));
    },

    /**
     * Calculate the window x-coordinate from the virtual coordinate.
     *
     * @deprecated 8.0.0. Use toFixed and parseFloat.
     * @param {number} x The virtual x-coordinate.
     * @param {number} [decimals= 0] The optional number of decimals to use (defaults to zero).
     * @returns {number} The scaled value.
     */
    scaleX: function(x, decimals) {
        return this.scaleValue(x, decimals);
    },

    /**
     * Calculate the window y-coordinate from the virtual coordinate.
     *
     * @deprecated 8.0.0. Use toFixed and parseFloat.
     * @param {number} y The virtual y-coordinate.
     * @param {number} [decimals= 0] The optional number of decimals to use (defaults to zero).
     * @returns {number} The scaled value.
     */
    scaleY: function(y, decimals) {
        return this.scaleValue(y, decimals);
    },

    /**
     * Convert the value from virtual scale to window scale.
     *
     * @deprecated 8.0.0. Use Environment.determineResolution().virtualToWindowScale instead.
     * @returns {number} The scaled value.
     */
    getVirtualToWindowScale: function() {
        return this.determineResolution().virtualToWindowScale;
    },

    /**
     * Convert the value from window scale to virtual scale.
     *
     * @deprecated 8.0.0. Use Environment.determineResolution().windowToVirtualScale instead
     * @param {number} [decimals= 0] The optional number of decimals to use (defaults to zero).
     * @returns {number} The scaled value.
     */
    getWindowToVirtualScale: function(decimals) {
        return parseFloat((1 / this.determineResolution().virtualToWindowScale).toFixed(decimals));
    },

    /**
     * Update the resolution properties, for example on orientation change.
     *
     * @deprecated 8.0.0. Not in use.
     * @returns {void}
     */
    updateResolutionProperties: function() {
        this.resolutionProperties = this.determineResolution();
        document.documentElement.style.fontSize = this.resolutionProperties.resolution.pixelFactor * 100 + "px";
    },

    /**
     * We save the initial screen size so we can check if the orientation has changed before all modules are loaded.
     *
     * @deprecated 8.0.0. Use Utils.Platform methods to determine size changes instead.
     * @returns {Object} The screen size when the enviroment is loaded.
     */
    getInitialScreenSize: function() {
        return this.initialScreenSize;
    },

    /**
     * @deprecated 8.0.0. Check if portrait with Utils.Platform.isPortrait() instead.
     * @returns {void}
     */
    setPortraitSupport: function() {
        this.portraitSupport = false;
    },

    /**
     * @deprecated 8.0.0. Check if portrait with Utils.Platform.isPortrait() instead.
     * @returns {boolean} True or false.
     */
    isPortraitSupported: function() {
        return this.portraitSupport;
    },

    /**
     * Identify the OS.
     *
     * @private
     * @deprecated 8.0.0. Use feature detection or OS detection in PlatformManager instead.
     * @returns {void}
     */
    identifyOS: function() {
        var userAgent = navigator.userAgent,
            os = "";

        if (userAgent.match(/Windows/i)) {
            os = "windows";
        }
        else if (userAgent.match(/Android/i)) {
            os = "android";
        }
        else if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
            os = "ios";
        }

        this.os = os;
    },

    /**
     * Identify the browser.
     *
     * @private
     * @deprecated 8.0.0. Use feature detection or browser detection in PlatformManager instead.
     * @returns {void}
     */
    identifyBrowser: function() {
        var userAgent = navigator.userAgent,
            os = this.os,
            browser = "";

        if (userAgent.match(/CriOS/i) || userAgent.match(/Chrome/i)) {
            browser = "chrome";
        }
        else if (userAgent.match(/MSIE [0-9]*\.[0-9]*;/i)) {
            browser = "ie";
        }
        else if (userAgent.match(/Safari/i)) {
            if (os === "ios") {
                browser = "safari";
            }
            else if (os === "android") {
                browser = "stock";
            }
        }
        else if (userAgent.match(/Firefox/i)) {
            browser = "firefox";
        }

        this.browser = browser;
    },

    /**
     * Identify the platform.
     *
     * @private
     * @deprecated 8.0.0. Use Environment.getCurrentPlatform() instead.
     * @returns {void}
     */
    identifyPlatform: function() {
        var platform = "mobile";

        if (Platform.isTabletDevice) {
            platform = "tablet";
        }
        else if (Platform.isDesktopDevice) {
            platform = "desktop";
        }

        this.platformCSS = platform;
        if (platform !== "desktop" && Platform.isLowEndDevice) {
            platform += "Low";
        }

        this.platform = platform;
    },

    /**
     * Returns the current orientation in capital letters.
     *
     * @deprecated 8.0.0. Use Utils.Platform.getOrientation() instead.
     * @returns {string} The string "LANDSCAPE" or "PORTRAIT".
     */
    getOrientation: function() {
        // If we have a specified orientation (set by the postman)
        if (Sys.isDefined(this.deviceOrientation)) {
            return this.deviceOrientation;
        }

        if (Platform.isDesktopDevice || (!this.allowsCustomCanvasSize() && Platform.isTabletDevice)) {
            return "LANDSCAPE";
        }

        if (Platform.isAndroidStockBrowser) {
            if (Math.abs(window.orientation) === 90) {
                return "LANDSCAPE";
            }

            return "PORTRAIT";
        }

        if (window.innerWidth >= window.innerHeight) {
            return "LANDSCAPE";
        }

        return "PORTRAIT";
    },

    /**
     * Returns the actual orientation for a device, in capital letters.
     *
     * @deprecated 8.0.0. Use Utils.Platform.getOrientation() instead.
     * @returns {string} The string "LANDSCAPE" or "PORTRAIT".
     */
    getDeviceOrientation: function() {
        if (window.innerWidth >= window.innerHeight) {
            return "LANDSCAPE";
        }

        return "PORTRAIT";
    },

    /**
     * Determines the resolution.
     *
     * @private
     * @returns {{virtualResolution: {width: number, height: number, aspect: number}, resolution: *, virtualToWindowScale: number}} The resolution properties.
     */
    determineResolution: function() {
        var resolutions = {
                standard: window.RESOLUTIONS_CONFIG || this.defaultResolutions,
                virtual: window.VIRTUAL_RESOLUTIONS_CONFIG || this.defaultVirtualResolutions
            },
            virtualResolution = this.getConfigForCurrentDeviceState(resolutions.virtual, false, true),
            resolution = this.getClosestResolution(resolutions.standard, virtualResolution),
            virtualToWindowScale = resolution.height / virtualResolution.height;

        return {
            virtualResolution: virtualResolution,
            resolution: resolution,
            virtualToWindowScale: virtualToWindowScale,
            windowToVirtualScale: 1 / virtualToWindowScale,
            portraitTopOffset: resolution.portraitTopOffset || 0
        };
    },

    /**
     * Return the key for the closest number in an array.
     *
     * @deprecated 8.0.0. Not in use.
     * @param {number} number The number to match against.
     * @param {Array} array The array containing key/value pair where value is a number to compare with.
     * @returns {*} Returns the key for the matching value.
     */
    getKeyOfClosestResolution: function(number, array) {
        var current = array[0].value,
            currentKey = array[0].key,
            difference = Math.abs(number - current),
            index = array.length,
            newDifference;

        while (index--) {
            newDifference = Math.abs(number - array[index].value);

            if (newDifference < difference) {
                difference = newDifference;
                currentKey = array[index].key;
            }
        }
        return currentKey;
    },

    /**
     * Find the best matching resolution based on the aspect ratio of the resolution and the virtual resolution used for the current platform.
     *
     * @param {Object} resolutions All resolutions for the current platform.
     * @param {Object} virtualResolution A virtual resolution to compare with.
     * @returns {Object} Returns the best matching resolution.
     */
    getClosestResolution: function(resolutions, virtualResolution) {
        var platformResolutions = this.getPlatformSpecificConfig(resolutions),
            examinedResolution = {};

        if (platformResolutions === null || Object.keys(platformResolutions).length === 0) {
            
            return null;
        }

        Sys.iterate(platformResolutions, function(key, resolution) {
            examinedResolution[key] = {
                source: resolution,
                width: resolution.width,
                height: resolution.height,
                ratio: resolution.width / resolution.height
            };
        });

        return this.findClosestResolution(virtualResolution, examinedResolution);
    },

    /**
     * Find the closest matching resolution based on the viewport size.
     * We use the different in size and ratio to calculate the best match.
     * Basically we take the difference in pixels for the X and Y axis and multiply it with the
     * difference for the ratio from a base of 1.
     *
     * @param {Object} target The current virtual resolution.
     * @param {Object} sourceResolutions All resolutions to match against.
     * @returns {Object} Returns the best matching resolution.
     */
    findClosestResolution: function(target, sourceResolutions) {
        var targetResolution = {
                source: target,
                width: target.width,
                height: target.height,
                ratio: target.width / target.height
            },
            resolutions = [],
            sortByDiffAsc = function(curr, next) {
                if (Math.abs(curr.diff) < Math.abs(next.diff)) {
                    return -1;
                }
                else if (Math.abs(curr.diff) > Math.abs(next.diff)) {
                    return 1;
                }

                return 0;
            };

        // Calculate
        Sys.iterate(sourceResolutions, function(key, sourceResolution) {
            var resolution = sourceResolution,
                xDiff,
                yDiff,
                resolutionDiff,
                ratioDiff;

            xDiff = Math.abs(resolution.width - targetResolution.width);
            yDiff = Math.abs(resolution.height - targetResolution.height);
            resolutionDiff = xDiff + yDiff;
            ratioDiff = Math.abs(resolution.ratio - targetResolution.ratio);

            resolution.diff = resolutionDiff * (1 + ratioDiff);

            resolutions.push(resolution);
        });

        // Sort by the calculated diff. Smallest diff is the best match.
        resolutions.sort(sortByDiffAsc);

        return resolutions[0].source;
    },

    /**
     * Examines the resolution and and ratio so we can use it in out calculations.
     *
     * @deprecated 8.0.0. Retrieve the values you want directly instead.
     * @param {Object} resolution The resolution you want to examine.
     * @returns {Object} Returns the examined resolution.
     */
    examineResolution: function(resolution) {
        return {
            source: resolution,
            width: resolution.width,
            height: resolution.height,
            ratio: resolution.width / resolution.height
        };
    },

    /**
     * Gets the config for the specific platform. It will default to device specific config if the current doesn't exists.
     * E.g. if current platform is mobileLow and config only exists for mobile. It will default to mobile.
     * If no specific config is added at all for any platform it will use the default config for all platforms.
     *
     * @param {Object} sourceConfig The source config.
     * @param {Object} sourceConfig.default The default platform configuration.
     * @param {Object} [sourceConfig.mobile] The mobile specific platform configuration.
     * @param {Object} [sourceConfig.mobileLow] The mobile low specific platform configuration.
     * @param {Object} [sourceConfig.tablet] The tablet specific platform configuration.
     * @param {Object} [sourceConfig.desktop] The desktop specific platform configuration.
     * @param {boolean} [useUpperCase] Whether or not to use upper case keys for identifying the platform.
     * @returns {Object|null}  The platform specific config.
     */
    getPlatformSpecificConfig: function(sourceConfig, useUpperCase) {
        var platform = this.getCurrentPlatform(),
            platformSuffix = "Low",
            fallback = "default";

        if (useUpperCase) {
            platform = platform.toUpperCase();
            platformSuffix = platformSuffix.toUpperCase();
            fallback = fallback.toUpperCase();
        }

        return sourceConfig[platform] || sourceConfig[platform.replace(platformSuffix, "")] || sourceConfig[fallback] || null;
    },

    /**
     * Gets the config for the current orientation from the platform specific config.
     * If no platform specific config is provided it will use the default config for all platforms.
     *
     * @param {Object} platformConfig The source config.
     * @param {Object} platformConfig.default The default orientation configuration.
     * @param {Object} [platformConfig.landscape] The landscape specific orientation configuration.
     * @param {Object} [platformConfig.portrait] The portrait specific orientation configuration.
     * @param {boolean} [useUpperCase] Whether or not to use upper case keys for identifying the orientation.
     * @returns {Object|null} The orientation specific config.
     */
    getOrientationSpecificConfig: function(platformConfig, useUpperCase) {
        var orientation = Utils.Platform.getOrientation(),
            fallbackKey = "default",
            baseKey = "base",
            configWithBase = {};

        if (!Sys.isDefined(platformConfig) || platformConfig === null) {
            return null;
        }

        if (!useUpperCase) {
            orientation = orientation.toLowerCase();
            baseKey = baseKey.toLowerCase();
        }
        else {
            fallbackKey = fallbackKey.toUpperCase();
            baseKey = baseKey.toUpperCase();
        }

        // If a base orientation is used we apply it here.
        if (Sys.isDefined(platformConfig[baseKey])) {
            configWithBase = Sys.applyProperties(configWithBase, platformConfig[baseKey]);
            configWithBase = Sys.applyProperties(configWithBase, platformConfig[orientation] || {});
            return configWithBase;
        }
        return platformConfig[orientation] || platformConfig[fallbackKey] || null;
    },

    /**
     * Get the config for the current platform and orientation or default to the config for all platforms and orientations.
     *
     * @param {Object} sourceConfig The source config.
     * @param {Object} sourceConfig.default The default platform configuration.
     * @param {Object} sourceConfig.default.default The default orientation configuration.
     * @param {Object} [sourceConfig.mobile] The mobile specific platform configuration.
     * @param {Object} [sourceConfig.mobile.portrait] The portrait specific orientation configuration.
     * @param {boolean} [useUpperCase] Whether or not to use upper case keys for identifying the device state.
     * @returns {Object|null} The config for the current device and state.
     */
    getConfigForCurrentDeviceState: function(sourceConfig, useUpperCase) {
        var platformConfig = this.getPlatformSpecificConfig(sourceConfig, useUpperCase);

        return this.getOrientationSpecificConfig(platformConfig, useUpperCase);
    },

    /**
     * Returns the matching virtual resolution based on current platform and orientation.
     *
     * @deprecated 8.0.0. Use Environment.getConfigForCurrentDeviceState() instead.
     * @param {Object} resolutions A list of all virtual resolutions.
     * @param {Object} resolutions.default The default platform configuration.
     * @param {Object} resolutions.default.default The default orientation configuration.
     * @param {Object} [resolutions.mobile] The mobile specific platform configuration.
     * @param {Object} [resolutions.mobile.portrait] The portrait specific orientation configuration.
     * @returns {Object|null} The resolution object for the matching resolution.
     */
    getVirtualResolution: function(resolutions) {
        var virtualResolution = this.getConfigForCurrentDeviceState(resolutions, false, true);

        if (virtualResolution !== null) {
            return virtualResolution;
        }

        // Default resolution
        
        return null;
    },

    /**
     * Returns the top value to set if you want your element to be placed the given percentage down within
     * the space above the game (provided that your element resides within the gameWrapper div).
     *
     * @param {number} percentage The percentage of the top area height as a decimal value.
     * @returns {number} The pixel value you should set.
     */
    getTopAboveGame: function(percentage) {
        var spaceAboveGame = this.getSpaceAboveGame();

        return Math.round(spaceAboveGame * percentage - spaceAboveGame);
    },

    /**
     * Returns the top value to set if you want your element to be placed the given percentage down within
     * the game area (provided that your element resides within the gameWrapper div).
     *
     * @param {number} percentage The percentage of the game height as a decimal value.
     * @returns {number} The pixel value you should set.
     */
    getTopInGame: function(percentage) {
        return Math.round(this.determineResolution().resolution.height * percentage);
    },

    /**
     * Returns the top value to set if you want your element to be placed the given percentage down within
     * the space below the game (provided that your element resides within the gameWrapper div).
     *
     * @param {number} percentage The percentage of the bottom area height as a decimal value.
     * @returns {number} The pixel value you should set.
     */
    getTopBelowGame: function(percentage) {
        return Math.round(this.determineResolution().resolution.height + percentage * this.getSpaceBelowGame());
    },

    /**
     * Returns the bottom value to set if you want your element to be placed the given percentage up within
     * the space above the game (provided that your element resides within the gameWrapper div).
     *
     * @param {number} percentage The percentage of the top area height as a decimal value.
     * @returns {number} The pixel value you should set.
     */
    getBottomAboveGame: function(percentage) {
        return Math.round(-1 * this.getSpaceAboveGame() * percentage);
    },

    /**
     * Returns the bottom value to set if you want your element to be placed the given percentage up within
     * the game area (provided that your element resides within the gameWrapper div).
     *
     * @param {number} percentage The percentage of the game height as a decimal value.
     * @returns {number} The pixel value you should set.
     */
    getBottomInGame: function(percentage) {
        return Math.round(this.determineResolution().resolution.height * percentage);
    },

    /**
     * Returns the bottom value to set if you want your element to be placed the given percentage up within
     * the space below the game (provided that your element resides within the gameWrapper div).
     *
     * @param {number} percentage The percentage of the bottom area height as a decimal value.
     * @returns {number} The pixel value you should set.
     */
    getBottomBelowGame: function(percentage) {
        var spaceBelowGame = this.getSpaceBelowGame();

        return Math.round(percentage * spaceBelowGame - spaceBelowGame);
    },

    /**
     * Returns the height of the area above the game as seen from within the gameWrapper div.
     *
     * @returns {number} The top area height in pixels.
     */
    getSpaceAboveGame: function() {
        var gameMetrics = Game.stage.getGameContainer().getBoundingClientRect(),
            inverseScale = 1 / Services.scaling.getScale();

        return gameMetrics.top * inverseScale;
    },

    /**
     * Returns the height of the area below the game as seen from within the gameWrapper div.
     *
     * @returns {number} The bottom area height in pixels.
     */
    getSpaceBelowGame: function() {
        var gameMetrics = Game.stage.getGameContainer().getBoundingClientRect(),
            inverseScale = 1 / Services.scaling.getScale(),
            screenSize = Utils.Platform.isStandAlone() ? Utils.Platform.getViewportSize() : Utils.Platform.getViewportInnerSize(),
            bottomPartTop = gameMetrics.top + gameMetrics.height;

        return (screenSize.height - bottomPartTop) * inverseScale;
    },

    /**
     * Returns the height of the game area as seen from within the gameWrapper div.
     *
     * @deprecated 8.0.0. Use Environment.determineResolution().resolution.height instead.
     * @returns {number} The game area height in pixels.
     */
    getGameHeight: function() {
        return this.determineResolution().resolution.height;
    },

    /**
     * Returns the offset from top to the bottom of the screen.
     *
     * @deprecated 8.0.0. Use Environment.determineResolution().resolution.height instead.
     * @returns {number} The bottom area height in pixels.
     */
    getCroppedCanvasTopOffsetToBottom: function() {
        return this.determineResolution().resolution.height;
    },

    /**
     * Returns the height of the area below the game as seen from within the gameWrapper div.
     *
     * @deprecated 8.0.0. Calculate (Environment.determineResolution().resolution - Utils.Platform.getViewportInnerSize().height) instead.
     * @returns {number} The bottom area height in pixels.
     */
    getCroppedViewportBottomOffset: function() {
        var resolution = this.determineResolution().resolution;

        return Math.abs(resolution.height - Utils.Platform.getViewportInnerSize().height);
    },

    /**
     * @deprecated 8.0.0. Not in use.
     * @returns {Array} Supported platforms.
     */
    getSupportedPlatforms: function() {
        return [
            "mobile",
            "mobileLow",
            "tablet",
            "tabletLow",
            "desktop"
        ];
    },

    /**
     * Retrieves a string of the current platform.
     *
     * @returns {string|*} Current platform.
     */
    getCurrentPlatform: function() {
        var platform = "mobile";

        if (Platform.isTabletDevice) {
            platform = "tablet";
        }
        else if (Platform.isDesktopDevice) {
            platform = "desktop";
        }

        if (platform !== "desktop" && Platform.isLowEndDevice) {
            platform += "Low";
        }

        return platform;
    },

    /**
     * Retrieves a string of the current platform without taking adherence to
     * low quality or not.
     *
     * @returns {string|*} Current platform CSS.
     */
    getCurrentPlatformCSS: function() {
        var platform = "mobile";

        if (Platform.isTabletDevice) {
            platform = "tablet";
        }
        else if (Platform.isDesktopDevice) {
            platform = "desktop";
        }

        return platform;
    },

    /**
     * Determines the device orientation.
     *
     * NOTE: Has an iframe override.
     *
     * @deprecated 8.0.0. Use Utils.Platform.getOrientation() instead.
     * @returns {string} The string containing device orientation "landscape" or "portrait".
     */
    orientation: function() {
        return this.getOrientation();
    },

    /**
     * Returns the size of the screen.
     *
     * NOTE: Has an iframe override.
     *
     * @deprecated 8.0.0. Use Utils.Platform.getViewportOuterSize() instead.
     * @returns {Object} The object containing the screen properties (w, h).
     */
    getScreenSize: function() {
        return { width: window.outerWidth, height: window.outerHeight };
    },

    /**
     * Returns the real screen size for the device.
     *
     * @deprecated 8.0.0. Use Utils.Platform methods instead to get the proper viewport size.
     * @returns {Object} The object containing the screen properties (w, h).
     */
    getRealScreenSize: function() {
        var screenWidth,
            screenHeight;

        // Browser doesn't have to be the full screen size on desktop
        if (Platform.isDesktopDevice) {
            return Utils.Platform.getViewportInnerSize();
        }

        if (this.getDeviceOrientation() === "PORTRAIT") {
            screenWidth = Math.min(window.screen.width, window.screen.height);
            screenHeight = Math.max(window.screen.width, window.screen.height);
        }
        else if (this.getDeviceOrientation() === "LANDSCAPE") {
            screenWidth = Math.max(window.screen.width, window.screen.height);
            screenHeight = Math.min(window.screen.width, window.screen.height);
        }

        return { width: screenWidth, height: screenHeight };
    },

    /**
     * Returns the inner size of the screen.
     *
     * NOTE: Has an iframe override.
     *
     * @deprecated 8.0.0. Use Utils.Platform.getViewportInnerSize() instead.
     * @returns {Object} The object containing the inner screen properties (w, h, top).
     */
    getInnerScreenSize: function() {
        return { width: window.innerWidth, height: window.innerHeight };
    },

    /**
     * Get the scale.
     *
     * @deprecated 8.0.0. Moved to Scaling. Use Services.scaling.getScale() instead.
     * @returns {number} The scale as a float.
     */
    getScale: function() {
        return this.scale;
    },

    /**
     * Get the scale.
     *
     * @deprecated 8.0.0. Moved to Scaling. Use Services.scaling.setScale() instead.
     * @param {number} scale The scale as a float.
     * @returns {void}
     */
    setScale: function(scale) {
        this.scale = scale;
    },

    /**
     * Points to browser to a new location through window.location.
     *
     * This is useful because we can override it during testing.
     *
     * @deprecated 8.0.0. Use Sys.utils.setWindowLocation() instead.
     * @param {string} url The URL to point the browser to.
     * @returns {void}
     */
    goTo: function(url) {
        this.fireEvent("request:fullscreen.exit");

        this.setWindowLocation(url);
    },

    /**
     * Changes the window location.
     *
     * @deprecated 8.0.0. Use Sys.utils.setWindowLocation() instead.
     * @param {string} url The Url to the new location.
     * @returns {*} The window location to the specified url.
     */
    setWindowLocation: function(url) {
        // Now we can actually mock redirects in our unit tests
        setTimeout(function() {
            window.location = Sys.utils.sanitizeURL(url);
        }, 300);
    },

    /**
     * Points to browser to a new location through window.location.
     *
     * @deprecated 8.0.0. Use Sys.utils.openNewBrowserTab() instead.
     * @param {string} url The URL to point the browser to.
     * @param {string} name An id for the new tab, will prevent opening of several tabs if one is already open.
     * @returns {void}
     */
    openNewBrowserTab: function(url, name) {
        window.open(url, name).focus();
    },

    /**
     * Sends the user to the lobby with the given reason using window.location.
     *
     * @deprecated 8.0.0. Use Sys.utils.goToLobby() instead.
     * @param {string|number} [reason] The reason (a decimal integer) given for going to lobby.
     * @returns {void}
     */
    goToLobby: function(reason) {
        var originalUrl = Resources.readData("lobbyUrl"),
            location = Resources.readData("lobbyUrl"),
            queryData = Resources.readData("queryData"),
            sessionID = Resources.readData("sessionID");

        if (Sys.isDefined(location) && Sys.isDefined(reason)) {
            location = Sys.utils.appendParameterToQuery(location, "reason=" + reason);
        }

        if (Sys.isDefined(queryData)) {
            if (Sys.isDefined(location) && Sys.isDefined(queryData.gameId)) {
                location = Sys.utils.appendParameterToQuery(location, "gameId=" + queryData.gameId);
            }

            if (Sys.isDefined(location) && Sys.isDefined(sessionID)) {
                location = Sys.utils.appendParameterToQuery(location, "sessId=" + sessionID);
            }
        }

        // If the lobby url was defined and not empty to start with
        if (Sys.isDefined(originalUrl) && originalUrl !== "") {
            this.goTo(location);
        }
        else {
            
        }
    },

    /**
     * Calls the goToLobby function with the cashier specific reason (5).
     *
     * @deprecated 8.0.0. Use Sys.utils.goToCashier() instead.
     * @returns {void}
     */
    goToCashier: function() {
        this.goToLobby(5);
    },

    /**
     * Reloads the window.
     *
     * This is useful because we can override it for iFrame specific code.
     *
     * NOTE: Has an iframe override.
     *
     * @deprecated 8.0.0. Use Sys.utils.reload() instead.
     * @returns {void}
     */
    reload: function() {
        window.location.reload();
    },

    /**
     * Returns the event names for a specific type of event or the whole event names objects.
     *
     * @deprecated 8.0.0. Moved to UserInput. Not in use.
     * @param {string} [eventKey] The key for the event name.
     * @returns {string[]|Object} The event names or full event object.
     */
    getInteractionEvents: function(eventKey) {
        if (eventKey) {
            return this.interactionEvents[eventKey] || [];
        }

        return this.interactionEvents;
    },

    /**
     * Returns the event types used for user input.
     *
     * @deprecated 8.0.0. Not in use.
     * @returns {string[]} The event types.
     */
    getEventType: function() {
        return this.eventType;
    },

    /**
     * Checks if event is a start event.
     *
     * @deprecated 8.0.0. Moved to UserInput. Not in use.
     * @param {Object} event The event object.
     * @returns {boolean} Returns true if the condition is met.
     */
    isStartEvent: function(event) {
        var me = this,
            isValidStartEvent = Sys.contains(me.interactionEvents.start, event.type);

        // If we use mouse down, make sure user pressed the left button
        if (event.type === "mousedown" && !me.leftButtonClicked(event)) {
            isValidStartEvent = false;
        }

        return isValidStartEvent;
    },

    /**
     * Checks if event is an end event.
     *
     * @deprecated 8.0.0. Moved to UserInput. Not in use.
     * @param {Object} event The event object.
     * @returns {boolean} Returns true if the condition is met.
     */
    isEndEvent: function(event) {
        var me = this,
            isValidEndEvent = Sys.contains(me.interactionEvents.end, event.type);

        // If we use mouse up, check if user pressed the left button
        if (event.type === "mouseup" && !me.leftButtonClicked(event)) {
            isValidEndEvent = false;
        }

        return isValidEndEvent;
    },

    /**
     * Checks if event is a move event.
     *
     * @deprecated 8.0.0. Moved to UserInput. Not in use.
     * @param {Object} event The event object.
     * @returns {boolean} Returns true if the condition is met.
     */
    isMoveEvent: function(event) {
        return Sys.contains(this.interactionEvents.move, event.type);
    },

    /**
     * Checks if event is a cancel event.
     *
     * @deprecated 8.0.0. Moved to UserInput. Not in use.
     * @param {Object} event The event object.
     * @returns {boolean} Returns true if the condition is met.
     */
    isCancelEvent: function(event) {
        return Sys.contains(this.interactionEvents.cancel, event.type);
    },

    /**
     * Checks if event is a scroll event.
     *
     * @deprecated 8.0.0. Moved to UserInput. Not in use.
     * @param {Object} event The event object.
     * @returns {boolean} Returns true if the condition is met.
     */
    isScrollEvent: function(event) {
        return Sys.contains(this.interactionEvents.scroll, event.type);
    },

    /**
     * Checks if the event is a key up event.
     *
     * @deprecated 8.0.0. Moved to UserInput. Not in use.
     * @param {Object} event The event object.
     * @returns {boolean} Returns true if the condition is met.
     */
    isKeyUpEvent: function(event) {
        return Sys.contains(this.interactionEvents.keyUp, event.type);
    },

    /**
     * Checks if the event is a key down event.
     *
     * @deprecated 8.0.0. Moved to UserInput. Not in use.
     * @param {Object} event The event object.
     * @returns {boolean} Returns true if the condition is met.
     */
    isKeyDownEvent: function(event) {
        return Sys.contains(this.interactionEvents.keyDown, event.type);
    },

    /**
     * Checks if the event is a key press event.
     *
     * @deprecated 8.0.0. Moved to UserInput. Not in use.
     * @param {Object} event The event object.
     * @returns {boolean} Returns true if the condition is met.
     */
    isKeyPressEvent: function(event) {
        return Sys.contains(this.interactionEvents.keyPress, event.type);
    },

    /**
     * Check if browser is touch capable. NOTE: Does not means it has touch.
     *
     * @deprecated 8.0.0. Use Utils.Platform.isTouchSupported() instead.
     * @returns {boolean} True if browser is touch capable.
     */
    isTouchCapable: function() {
        return "ontouchstart" in window ||
                window.DocumentTouch && document instanceof window.DocumentTouch ||
                window.navigator.maxTouchPoints > 0 ||
                window.navigator.msMaxTouchPoints > 0;
    },

    /**
     * Define which type of events to use.
     *
     * @deprecated 8.0.0. Moved to UserInput. Not in use.
     * @returns {void}
     */
    defineInputEvents: function() {
        var me = this,
            start = [],
            move = [],
            end = [],
            cancel = [],
            scroll = [],
            keyUp = [],
            keyDown = [],
            type = [];

        // Check if microsoft prefix pointer events is supported
        // NOTE: prefixed events are now deprecated. Keeping for backwards compatibility
        if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
            start.push(window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown");
            move.push(window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove");
            end.push(window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp");
            cancel.push(window.navigator.pointerEnabled ? "pointerout" : "MSPointerOut");

            // If it's not a touchscreen we add support for mouse wheel event
            if (!Utils.Platform.isTouchSupported()) {
                scroll.push(me.getMouseWheelEventName());
            }

            type.push("pointerEvent");
        }
        else {
            // check if touch events is supported
            if (Utils.Platform.isTouchSupported()) {
                start.push("touchstart");
                move.push("touchmove");
                end.push("touchend");
                cancel.push("touchcancel");

                type.push("touchEvent");
            }

            // We no longer listen to mouse events for the stock browser since it fires both mouse and touch events on every touch.
            // This resulted in double events being fired, which caused the toggle buttons to break.
            if (!Platform.isAndroidStockBrowser) {
                start.push("mousedown");
                move.push("mousemove");
                end.push("mouseup");
                cancel.push("mouseout");
                scroll.push(me.getMouseWheelEventName());

                type.push("mouseEvent");
            }
        }

        if (me.platform === "desktop") {
            keyUp.push("keyup");
            keyDown.push("keydown");
        }

        me.interactionEvents = {
            start: start,
            move: move,
            end: end,
            cancel: cancel,
            keyUp: keyUp,
            keyDown: keyDown,
            scroll: scroll
        };

        me.eventType = type;
    },

    /**
     * Checks if the left button on the mouse is clicked.
     *
     * @deprecated 8.0.0. Moved to UserInput. Not in use.
     * @param {Event} event The mouse event to test.
     * @returns {boolean} Returns true if left mouse button is clicked.
     */
    leftButtonClicked: function(event) {
        if ("buttons" in event && event.buttons !== 0) {
            return event.buttons === 1;
        }
        else if ("which" in event) {
            return event.which === 1;
        }

        return event.button === 0;
    }
};

Sys.Environment = Sys.extend(Sys.Observable, Sys.Environment, "Sys.Environment");
/* global Sys */
Sys.ns("Sys");

/**
 * The data model for global resources.
 *
 * Instantiates itself.
 *
 * @deprecated 8.0.0. Will be replaced by an instance of Core.Model.
 * @class Sys.Resources
 * @extends Sys.Observable
 * @static
 */
Sys.Resources = {

    constructor: function() {
        var me = this;

        Sys.Resources.superclass.constructor.apply(me, arguments);

        me.init();
    },

    init: function() {
        this.data = {};
    },

    /**
     * Returns the data linked to the given key.
     *
     * @param {string} key The data storage key.
     * @returns {*} The data read from storage.
     */
    readData: function(key) {
        return this.data[key];
    },

    /**
     * Store the given data under the given key.
     *
     * @param {string} key The name of the key under which to store the data.
     * @param {*} dataToStore The data to store.
     * @returns {*} The data that was stored.
     */
    storeData: function(key, dataToStore) {
        this.data[key] = dataToStore;

        this.fireEvent("notify:resources.dataStored", key);

        return this.data[key];
    },

    /**
     * @deprecated
     * @param {string} key Audio key.
     * @returns {void}
     */
    processAudio: function(key) {
        var me = this,
            audio = me.readData(key),
            AudioContext = window.AudioContext,
            context = new AudioContext(),
            audioBuffer;

        context.decodeAudioData(
            audio,
            // On success:
            function(buffer) {
                audioBuffer = buffer;

                me.storeData("decoded:" + key, {
                    context: context,
                    buffer: audioBuffer
                });

                me.fireEvent("notify:resources.soundDecoded");
            },
            function() {
                // On error:
            }
        );
    },

    /**
     * Remove the object property.
     *
     * @param {string} key The data storage key.
     * @returns {void}
     */
    removeData: function(key) {
        delete this.data[key];
    }

};

Sys.Resources = Sys.extend(Sys.Observable, Sys.Resources, "Sys.Resources");
/* global Sys */
Sys.ns("Sys");
Sys.ns("Services");

/**
 * The data model for global parameters.
 *
 * Instantiates itself.
 *
 * @deprecated 8.0.0. Will be replaced by an instance of Core.Model.
 * @class Sys.Storage
 * @extends Sys.Observable
 */
Sys.Storage = {

    constructor: function() {
        Sys.Storage.superclass.constructor.apply(this, arguments);
        this.init();
    },

    /**
     * Initializes the storage.
     *
     * @private
     * @returns {void}
     */
    init: function() {
        this.data = {};
    },

    /**
     * Read the data associated with the provided key.
     *
     * @param {string} key The key.
     * @returns {*} The data associated with the key.
     */
    readData: function(key) {
        return this.data[key];
    },

    /**
     * Store the provided data under the provided key.
     *
     * @param {string} key The key.
     * @param {*} dataToStore The data to store.
     * @returns {*} The data stored.
     */
    storeData: function(key, dataToStore) {
        this.data[key] = dataToStore;

        return this.data[key];
    },

    /**
     * Remove the data associated with the key.
     *
     * @param {string} key The key.
     * @returns {void}
     */
    removeData: function(key) {
        delete this.data[key];
    }
};

Sys.Storage = Sys.extend(Sys.Observable, Sys.Storage, "Sys.Storage");

/* eslint-disable no-extend-native */



/**
 * Returns the sum of all array elements.
 *
 * @returns {number} The sum of all array elements.
 */
Array.prototype.sum = function() {
    var sum = 0, i, n;

    for (i = 0, n = this.length; i < n; i++) {
        sum += this[i];
    }

    return sum;
};

/**
 * Min function for Array prototypes.
 *
 * @returns {number|undefined} Returns the smallest number from an Array of numbers (or "undefined" if array is empty).
 */
Array.prototype.min = function() {
    return this.length === 0 ? undefined : Math.min.apply(Math, this);
};

/**
 * Max function for Array prototype.
 *
 * @returns {number|undefined} Returns the largest number from an Array of numbers (or "undefined" if array is empty).
 */
Array.prototype.max = function() {
    return this.length === 0 ? undefined : Math.max.apply(Math, this);
};

/**
 * Average function for Array prototype.
 *
 * @returns {number} Returns the average number from an Array of numbers (or "undefined" if array is empty).
 */
Array.prototype.average = function() {
    // if no elements, return null
    if (this.length === 0) {
        return undefined;
    }

    return this.sum() / this.length;
};

/**
 * Returns the first index for which the input === array item.
 *
 * @param {*} searchFor Item to search the array for.
 * @returns {number} The index of the found match or -1 if no match is found.
 */
Array.prototype.indexOf = function(searchFor) {
    var length = this.length,
        i;

    for (i = -1; ++i < length;) {
        if (this[i] === searchFor) {
            return i;
        }
    }

    return -1;
};

/**
 * Contains function for Array prototype.
 *
 * @param {*} searchFor The object which we want search for in the array.
 * @returns {boolean} Returns true/false depending on if the object was found in the array or not.
 */
Array.prototype.contains = function(searchFor) {
    return this.indexOf(searchFor) !== -1;
};

/**
 * Returns the last element of the array.
 *
 * @returns {*} Last item.
 */
Array.prototype.last = function() {
    return this[this.length - 1];
};

/**
 * Remove item from array.
 *
 * @param {*} item Item to remove.
 * @returns {void}
 */
Array.prototype.remove = Array.prototype.remove || function(item) {
    var index = this.indexOf(item);

    if (index === -1) {
        return;
    }

    this.splice(index, 1);
};

/**
 * Trimming function for String prototype.
 * Removes leading and/or trailing whitespaces.
 *
 * @returns {string} The string with trimmed whitespaces.
 */
(function() {
    var f = String.prototype.trim;

    if (typeof f !== "function") {
        String.prototype.trim = function() {
            return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
        };
    }
}());

/**
 * Checks if the specified substring matches any part of this string.
 *
 * @param {string} substring The string to search for.
 * @returns {boolean} Returns true if this string contains the specified substring, false otherwise.
 */
String.prototype.contains = function(substring) {
    if (substring === "") {
        return false;
    }

    return (this.indexOf(substring) !== -1);
};

if (typeof Function.prototype.bind !== "function") {
    /**
     * Adds the bind function (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
     *
     * @param {Object} scope The scope to execute the function in.
     * @returns {Function} Function with new context.
     */
    Function.prototype.bind = function(scope) {
        var me = this,
            args = Array.prototype.slice.call(arguments, 1);

        return function() {
            me.apply(scope, args.concat(Array.prototype.slice.call(arguments)));
        };
    };
}
/* global Sys, Environment */

/**
 * @typedef {{x: number, y: number, width: number, height: number}} inputSegment
 */

/**
 * User input utils for global use.
 *
 * @class Sys.UserInputUtils
 * @singleton
 */
Sys.UserInputUtils = {

    /**
     * Returns the DOM element which the user is pointing at by reading the coordinates in the event object.
     *
     * @param {Object} coordinates An XY coordinate pair.
     * @returns {?HTMLElement} The element at the coordinates.
     */
    getDOMElementFromCoordinates: function(coordinates) {
        var DOMElement;

        if (Sys.isObj(coordinates) && (!Sys.isDefined(coordinates.x) || !Sys.isDefined(coordinates.y))) {
            return null;
        }

        DOMElement = document.elementFromPoint(coordinates.x, coordinates.y);

        // if the current node in the document is a text node (not an "actual"
        // HTML element, use its parent node (Node.TEXT_NODE === 3, see
        // https://developer.mozilla.org/en/nodeType)
        if (!Sys.isEmpty(DOMElement) && DOMElement.nodeType === 3) {
            DOMElement.target = DOMElement.parentNode;
        }

        return DOMElement;
    },

    /**
     * Returns the coordinates of a user interaction event.
     *
     * @param {Object} event The javascript event object.
     * @returns {{ x: number, y: number }} The coordinates of the user interaction.
     */
    getUserInputCoordinates: function(event) {
        // If it is not a touch device, the event object of a mousedown will have its
        // coordinates directly in the event object, whereas if it is a touch device
        // the coordinates will reside in a "touches" array
        // I use changedTouches array instead, because "touches" is empty for touchEnd
        var coordinates = {
            x: event.changedTouches ? event.changedTouches[0].clientX : event.clientX,
            y: event.changedTouches ? event.changedTouches[0].clientY : event.clientY
        };

        return coordinates;
    },

    /**
     * Utility function to get the DOM element from a user interaction event directly.
     *
     * @param {Object} event Event object.
     * @returns {HTMLElement} The DOM element that is at the events position.
     */
    getDOMElementFromEvent: function(event) {
        return Sys.UserInputUtils.getDOMElementFromCoordinates(Sys.UserInputUtils.getUserInputCoordinates(event));
    },

    /**
     * Calculates the metrics for the specified DOM element.
     *
     * @private
     * @param {HTMLElement} DOMElement The element for which you want metrics.
     * @returns {{top: number, left: number, width: number, height: number, scale: number}} An object with the elements metrics.
     */
    calculateMetrics: function(DOMElement) {
        var boundingRect = DOMElement.getBoundingClientRect();

        return {
            top: boundingRect.top,
            left: boundingRect.left,
            width: boundingRect.width,
            height: boundingRect.height,
            scale: DOMElement.offsetWidth / boundingRect.width
        };
    },

    /**
     * Converts window coordinates to coordinates relative to the given element.
     *
     * @param {{x: number, y: number}} windowCoordinates The window coordinates to transform.
     * @param {HTMLElement} DOMElement The element you want to use as the base.
     * @returns {{x: number, y: number}} The coordinates relative to the element.
     */
    getCoordinatesRelativeToElement: function(windowCoordinates, DOMElement) {
        var metrics = Sys.UserInputUtils.calculateMetrics(DOMElement);

        return {
            x: (windowCoordinates.x - metrics.left) * metrics.scale,
            y: (windowCoordinates.y - metrics.top) * metrics.scale
        };
    },

    /**
     * Checks recursively if the HTMLElement provided is a child of the given parent.
     *
     * @param {HTMLElement} parentElement The parent we're checking against.
     * @param {HTMLElement} childElement The possible child child element.
     * @returns {boolean} If parent and child elements are the same.
     */
    isParentAndChildElements: function(parentElement, childElement) {
        if (parentElement === childElement) {
            return true;
        }
        // do not search above the document body
        else if (childElement && childElement !== document.body && childElement.parentElement) {
            return this.isParentAndChildElements(parentElement, childElement.parentElement);
        }

        return false;
    },

    /**
     * Utility function to test if an element is the target of an input event at the given coordinates.
     *
     * @param {HTMLElement} element A DOM element.
     * @param {{x: number, y: number}} coordinates Window coordinates.
     * @returns {boolean} If element is the target of coordinates.
     */
    isCoordinateTarget: function(element, coordinates) {
        return Sys.UserInputUtils.isParentAndChildElements(element, Sys.UserInputUtils.getDOMElementFromCoordinates(coordinates));
    },

    /**
     * Utility function to test if an element is the target of a given input event.
     *
     * @param {HTMLElement} element A DOM element.
     * @param {Event} event A user input event.
     * @returns {boolean} If element is target of event.
     */
    isEventTarget: function(element, event) {
        return Sys.UserInputUtils.isParentAndChildElements(element, Sys.UserInputUtils.getDOMElementFromEvent(event));
    },

    /**
     * Checks if the coordinates are within the provided segment.
     *
     * @param {Object} coordinates The coordinates of the user input event.
     * @param {number} coordinates.x The x coordinate.
     * @param {number} coordinates.y The y coordinate.
     * @param {inputSegment|inputSegment[]} inputSegments The segment(s) to match against.
     * @param {boolean} [segmentsAreVirtual=true] Flag indicating if the segments are given in virtual coordinates.
     * @returns {boolean} Whether or not the user input matched a segment.
     */
    isUserInputInSegment: function(coordinates, inputSegments, segmentsAreVirtual) {
        var newInputSegments = inputSegments,
            newSegmentsAreVirtual = segmentsAreVirtual,
            numInputSegments,
            scale,
            x,
            y,
            currentSegment,
            i;

        if (!Sys.isDefined(coordinates) || !Sys.isDefined(newInputSegments)) {
            return false;
        }

        if (!Sys.isArray(newInputSegments)) {
            newInputSegments = [newInputSegments];
        }

        newSegmentsAreVirtual = Sys.isDefined(newSegmentsAreVirtual) ? newSegmentsAreVirtual : true;

        scale = newSegmentsAreVirtual ? Environment.determineResolution().windowToVirtualScale : 1;
        x = coordinates.x * scale;
        y = coordinates.y * scale;

        for (i = -1, numInputSegments = newInputSegments.length; ++i < numInputSegments;) {
            currentSegment = newInputSegments[i];

            if (x >= currentSegment.x && x <= currentSegment.x + currentSegment.width &&
                y >= currentSegment.y && y <= currentSegment.y + currentSegment.height) {
                return true;
            }
        }

        return false;
    }
};
/* global Core, Sys, Resources, Language */
Sys.ns("Core");

/**
 * Parses keys + texts (including error texts) from the language.xml file,
 * stores them and provides interface for other components to fetch them.
 *
 * @class Core.LanguageManager
 * @extends Sys.Observable
 */
Core.LanguageManager = {

    /**
     * @inheritdoc
     */
    constructor: function() {
        Core.LanguageManager.superclass.constructor.apply(this, arguments);

        this.texts = {};

        this.setupEvents();
    },

    /**
     * @inheritdoc
     * @listens notify:resources.dataStored
     */
    setupEvents: function() {
        this.on({
            "notify:resources.dataStored": this.preload
        });
    },

    /**
     * Parses the language file (XML or JSON) and stores all keys + texts.
     *
     * @private
     * @param {string} key Resource key for identifying language format (languageXML|languageJSON).
     * @fires languageLoaded_event
     * @returns {void}
     */
    preload: function(key) {
        var data;

        if (key === "languageJSON" || key === "languageXML") {
            data = Resources.readData(key);

            if (key === "languageJSON") {
                this.texts = this.loadLanguage(data);
            }
            else if (key === "languageXML") {
                this.texts = this.loadLanguageXML(data);
            }
            this.fireEvent("languageLoaded_event");
        }
    },

    /**
     * Retrieve language data from an array containing language values.
     *
     * @private
     * @param {Array<{id: string, text: string}>} data Language array containing objects.
     * @returns {Object<{id: string, text: string}>} Object containing text id's and values.
     */
    loadLanguage: function(data) {
        return data.reduce(function(acc, value) {
            var obj = {};

            obj[value.id] = value.text;

            return Sys.applyProperties(acc, obj);
        }, {});
    },

    /**
     * Store language xml into the language manager.
     *
     * @private
     * @param {Object} xml XML data.
     * @returns {Object<{id: string, text: string}>} Object containing text id's and values.
     */
    loadLanguageXML: function(xml) {
        var rootNode = Sys.utils.XMLHelper.findAll("ds", xml.documentElement);

        return Object.keys(rootNode).reduce(function(acc, key) {
            var node = rootNode[key],
                textId = Sys.utils.XMLHelper.getAttributeValue("name", node),
                obj = {};

            obj[textId] = node.textContent;

            return Sys.applyProperties(acc, obj);
        }, {});
    },

    /**
     * Returns the text for the specified error code.
     *
     * @deprecated 8.0.0. Not in use.
     * @param {number} errorCode The error code.
     * @returns {string} The error text.
     */
    getErrorText: function(errorCode) {
        if (this.hasText(errorCode)) {
            return this.getText(errorCode);
        }

        return "[Error ID not found]";
    },

    /**
     * Tells if LanguageManager has the text string or not.
     *
     * @param {string|number} textId The text id.
     * @returns {boolean} True if found, false otherwise.
     */
    hasText: function(textId) {
        return Sys.isDefined(this.texts[textId]);
    },

    /**
     * Returns the text for the specified text id.
     *
     * @param {string|number} textId The text id.
     * @param {Array} [values] The array containing the values to be used in the text.
     * @returns {string} The text or "[<textId]> not defined]" if not found.
     */
    getText: function(textId, values) {
        var nodes,
            rawText;

        if (!this.hasText(textId)) {
            return "[" + textId + " not defined]";
        }
        else if (this.texts[textId] === "") {
            return "[" + textId + " not translated]";
        }

        rawText = this.texts[textId].replace("%2B", "+");

        if (values) {
            nodes = Sys.utils.getNodesByFormat(rawText, values);

            return nodes.reduce(function(acc, value) {
                var text = acc;

                text += value.data.toString();

                return text;
            }, "");
        }

        return rawText;
    }
};

Core.LanguageManager = Sys.extend(Sys.Observable, Core.LanguageManager, "Core.LanguageManager");

Sys.ns("Language");

Language.Keys = {
    "accountUnavailable": "OCTaccountUnavailable",
    "additonalFreeSpinsWon": "OCTadditonalFreeSpinsWon",
    "autoplay": "OCTautoplayPanelLabel",
    "autoplay_advancedSettings": "OCTadvancedSettings",
    "autoplay_numberSpins": "OCTnumberSpins",
    "autoplay_panelStartText": "OCTautoplayPanelStartText",
    "autoplay_setting_stopAutoPlay": "OCTstopAutoPlayColon",
    "autoplay_setting_ifCashDecreasesBy": "OCTifCashDecreasesBy",
    "autoplay_setting_ifCashIncreasesBy": "OCTifCashIncreasesBy",
    "autoplay_setting_ifFBonusIsStarted": "OCTifFBonusIsStarted",
    "autoplay_setting_ifFreeSpinsIsStarted": "OCTifFreeSpinsIsStarted",
    "autoplay_setting_ifWinExeeds": "OCTifWinExeeds",
    "autoplay_setting_onAnyWin": "OCTonAnyWin",
    "autoplay_setting_ifCashDecreasesByInfoTouch": "OCTlossLimitInfoTouch",
    "autoplay_setting_ifCashDecreasesByInfo": "OCTlossLimitInfo",
    "autoplay_setting_ifCashDecreasesByWarning": "OCTlossLimitWarning",
    "autoplay_setting_ifCashDecreasesByWarningTouch": "betExceedCDB",
    "autoplay_stopAutoPlay": "OCTstopAutoPlay",
    "autoplay_stopText": "OCTautoplayStopText",
    "autoSpins": "OCTautoSpins",
    "betColonVar": "OCTbetColonVar",
    "betInCash": "OCTbetInCash",
    "betInCoins": "OCTbetInCoins",
    "betLevel": "OCTbetlevel",
    "betSettings_uc": "OCTbetSettingsCaps",
    "bigWin": "OCTbigWin",
    "bonusAwardedTitle": "bonusAwardedTitle",
    "bonusAwardedCongrats": "bonusAwardedCongrats",
    "btn_autoplay": "OCTautoplayButton",
    "btn_casino": "OCTcasino_btn",
    "btn_checkEnd": "OCTCheckEndButton",
    "btn_close": "OCTclose_btn",
    "btn_continue": "OCTContinue",
    "btn_deposit": "OCTdeposit_btn",
    "btn_login": "OCTlogin_btn",
    "btn_maxbet": "OCTmaxbetbutton",
    "btn_no": "OCTbtnNo",
    "btn_ok": "OCTbtnOK",
    "btn_reduceBet": "OCTreduceBet_btn",
    "btn_reload": "OCTreload_btn",
    "btn_sessionTimeOut": "OCTreload_btnRev",
    "btn_yes": "OCTbtnYes",
    "btn_addValue": "addValue",
    "cash": "OCTcash",
    "cashColon": "OCTcashColon",
    "cashColonVar": "OCTcashColonVar",
    "coinsColonVar": "OCTcoinsColonVar",
    "coinsWonColon": "OCTcoinsWonColon",
    "coinValue": "OCTcoinValue",
    "congratulations": "OCTcongratsLC",
    "congratulations_uc": "OCTcongratsUC",
    "connectionLost": "OCTconnectionLost",
    "connectionQualityPoor": "OCTconnectionQualityPoor",
    "continue": "OCTContinue",
    "continue_uc": "OCTbutton_CONTINUE",
    "continuePlaying": "OCTcontinuePlaying",
    "deposit": "OCTdeposit",
    "depositPlay": "OCTdepositPlay",
    "error": "OCTerror",
    "freeRounds_expired": "OCTfreerounds",
    "freeRoundsFinished": "OCTfreeRoundsFinished",
    "freeRoundsLeftColon": "OCTFreeRoundsLeftwithColon",
    "freeRoundsOfferUsed": "16",
    "freeRoundsVar": "OCTfreeRoundsVar",
    "freeRoundsExtraTitle": "OCTfreeRoundsExtraTitle",
    "freeRoundsExtraWon": "OCTfreeRoundsExtraWon",
    "freeRoundWidgetFirstNoWin": "freeRoundWidgetFirstNoWin",
    "freeRoundWidgetIntro": "freeRoundWidgetIntro",
    "freeRoundWidgetPlurCongratulations": "freeRoundWidgetPlurCongratulations",
    "freeRoundWidgetSingCongratulations": "freeRoundWidgetSingCongratulations",
    "freeRoundWidgetSecondNoWin": "freeRoundWidgetSecondNoWin",
    "freeSpins": "OCTfreeSpinsUC",
    "freeSpinsLeftColonVar": "OCTfreeSpinsLeftColonVar",
    "gameHistory": "OCTgameHistory",
    "gameHistory_uc": "OCTgameHistoryHeadingUC",
    "gameHistoryHeading": "OCTgameHistoryHeadingUC",
    "gameRules_uc": "OCTgameRulesUC",
    "gameSettingsPanelLabel": "OCTslidePanelLabel",
    "gameUnavailable": "OCTgameUnavailable",
    "haveFreeRounds": "OCThaveFreeRounds",
    "historyNotAvailable": "OCThistoryNotAvailable",
    "landscapeMode": "OCTlandscapeMode",
    "level": "OCTlevel",
    "loading": "OCTloadingText",
    "loadingDots": "OCTloading",
    "loadingTakesLonger": "OCTloadingTakesLonger",
    "lostConnectInactivity": "OCTlostConnectInactivity",
    "machinetext_bet": "OCTmachinetext_bet",
    "machinetext_coins": "OCTmachinetext_coins",
    "machinetext_coinvalue": "OCTmachinetext_coinvalue",
    "machinetext_win": "OCTmachinetext_win",
    "megaWin": "OCTmegaWin",
    "messageCaption": "OCTmessagecaption",
    "newHistoryWindow": "OCTnewHistoryWindow",
    "outOfMoney": "OCToutOfMoney",
    "paytable_betLineWinsLeftToRightOnly": "OCTbetLineWinsLeftToRightOnly",
    "paytable_extraInfo": "OCTextraInfo",
    "paytable_highest": "OCTpaytableHighest",
    "paytable_symbolPayout": "OCTsymbolPayout",
    "paytable_uc": "OCTbutton_paytableUC",
    "paytable_voidAllPays": "OCTvoidAllPays",
    "paytable_winningBetLinesHeading": "OCTwinningBetLinesHeading",
    "playingForFun": "OCTplayingForFun",
    "youPlayingForFun": "OCTyouPlayingFun",
    "playLimit": "OCTplayLimit",
    "quickSpin": "OCTquickSpin",
    "rc_checkPlayingLost": "OCTRCheckPlayingLost",
    "rc_checkPlayingWon": "OCTRCheckPlayingWon",
    "rc_checkReminder": "OCTRCcheckReminder",
    "reduce": "OCTreduce",
    "reload": "OCTreload",
    "reset": "OCTreset",
    "restoredGameHeader": "OCTrestoredGameHeader",
    "returnToLobby": "OCTreturnToLobby",
    "roundsLeft": "OCTroundsLeft",
    "roundsUseAcctMoney": "OCTroundsUseAcctMoney",
    "sessionTimeOut": "OCTsessionTimeOut",
    "setting_gameSound": "OCTgameSound",
    "setting_gameVibration": "OCTgameVibration",
    "setting_introGame": "OCTintroGameSetting",
    "setting_introScreeGame": "OCTintroScreeGameSetting",
    "setting_leftHandMode": "OCTleftHandMode",
    "setting_quickSpinGame": "OCTquickSpinGameSetting",
    "setting_spaceSpin": "OCTspaceSpin",
    "skipIntro": "OCTskipIntro",
    "slowConnection": "OCTslowConnection",
    "soundSettings_uc": "OCTsoundSettingsCaps",
    "spinSettings_uc": "OCTspinSettingsCaps",
    "spinsLeftText": "OCTspinsLeftText",
    "startFreespins": "OCTstartFreeSpins",
    "stopIfFreeSpins": "OCTstopIfFreeSpins",
    "superMegaWin": "OCTsuperMegaWin",
    "totalbet": "OCTtotalbet",
    "totalWin": "OCTTotalWinwithColonVar",
    "totalWinColon": "OCTtotalWinWithColon",
    "totalWinColon_uc": "OCTtotalWinUCnoVar",
    "totalWinColonVar": "OCTtotalWinColonVar",
    "totalWinColonVar_uc": "OCTTotalWinwithColonUC",
    "varRetriggerFSNoSpan": "OCTvarRetriggerFSNoSpan",
    "win": "OCTWin",
    "winColon_uc": "OCTwinColonUC",
    "winColonVar": "OCTwinColonVar",
    "winUpTo": "OCTwinUpTo",
    "youWin": "OCTyouWinUCNoExclamation",
    "youWonCoins": "OCTyouWonCoins",
    "cookiePolicy": "cookiePolicy",
    "cookiePolicyPart2": "cookiePolicyPart2",

    // device detection strings
    "deviceBestGameExperience": "deviceBestGameExperience",
    "deviceBrowserUpdateMust": "deviceBrowserUpdateMust",
    "deviceOptimizedFor": "deviceOptimizedFor",
    "deviceUpdateBrowser": "deviceUpdateBrowser",
    "deviceUpdateOS": "deviceUpdateOS",
    "deviceUseBrowser": "deviceUseBrowser",
    "gameOptimisedFor": "gameOptimisedFor",
    "MGcontinueYesNo": "MGcontinueYesNo",
    "MGdeviceNoSupport": "MGdeviceNoSupport",
    "MGnoOSSupport": "MGnoOSSupport",
    "optimisedForVersion": "optimisedForVersion",
    "upgradeIn": "upgradeIn"
};
/* global Sys, Utils, Platform */
/**
 * User Input.
 *
 * @class Sys.UserInput
 * @extends Sys.Observable
 */
Sys.UserInput = {

    constructor: function() {
        Sys.UserInput.superclass.constructor.apply(this, arguments);

        this.setupData();

        this.setupEvents();

        this.interactionEventHandlers = {
            start: this.handleInteractionStart.bind(this),
            end: this.handleInteractionEnd.bind(this),
            cancel: this.handleInteractionEnd.bind(this),
            move: this.handleInteractionMove.bind(this),
            keyUp: this.handleInteractionKeyUp.bind(this),
            keyDown: this.handleInteractionKeyDown.bind(this),
            scroll: this.handleInteractionScroll.bind(this)
        };

        this.interactionEvents = this.defineInputEvents();

        this.addEventListeners();
    },

    /**
     * Sets up initial data.
     *
     * @protected
     * @returns {void}
     */
    setupData: function() {
        this.data = {};
        this.storeData("standardEvents", {
            start: "notify:userInputManager.userInputStarted",
            end: "notify:userInputManager.userInputEnded",
            move: "notify:userInputManager.userInputMove",
            hover: "notify:userInputManager.userInputHover",
            cancel: "notify:userInputManager.userInputCanceled",
            keyUp: "notify:userInputManager.userInputKeyUp",
            keyDown: "notify:userInputManager.userInputKeyDown",
            scroll: "notify:userInputManager.userInputScroll"
        });
        this.storeData("exclusiveEvents", {});
        this.storeData("exclusiveQueue", []);
        this.storeData("allowPropagation", false);
    },

    /**
     * Sets up event listeners.
     *
     * @protected
     * @listens request:userInputManager.activateExclusivity
     * @listens request:userInputManager.deactivateExclusivity
     * @listens request:userInputManager.allowInteractions
     * @listens request:userInputManager.ignoreAllInteractions
     * @listens request:userInputManager.allowPropagation
     * @listens request:userInputManager.disAllowPropagation
     * @returns {void}
     */
    setupEvents: function() {
        this.on({
            // Used by other modules to activate / deactivate exclusivity
            "request:userInputManager.activateExclusivity": this.activateExclusivity,
            "request:userInputManager.deactivateExclusivity": this.deactivateExclusivity,

            // User by other modules to activate / deactivate interaction handling
            "request:userInputManager.allowInteractions": this.setState.bind(this, "active"),
            "request:userInputManager.ignoreAllInteractions": this.setState.bind(this, "deactivated"),

            // Used by other modules to allow / disallow propagation and default behaviour. Currently only for move event
            "request:userInputManager.allowPropagation": this.storeData.bind(this, "allowPropagation", true),
            "request:userInputManager.disAllowPropagation": this.storeData.bind(this, "allowPropagation", false)
        });
    },

    /**
     * Define which type of events to use.
     *
     * @private
     * @returns {void}
     */
    defineInputEvents: function() {
        var start = [],
            move = [],
            end = [],
            cancel = [],
            scroll = [],
            keyUp = [],
            keyDown = [];

        if (Utils.Platform.isTouchSupported() && Platform.isDesktopDevice) {
            start.push("mousedown");
            move.push("mousemove");
            end.push("mouseup");
            cancel.push("mouseout");
            start.push("touchstart");
            move.push("touchmove");
            end.push("touchend");
            cancel.push("touchcancel");
            scroll.push(this.getMouseWheelEventName());
        }
        else if (Utils.Platform.isTouchSupported()) {
            start.push("touchstart");
            move.push("touchmove");
            end.push("touchend");
            cancel.push("touchcancel");
        }
        else {
            start.push("mousedown");
            move.push("mousemove");
            end.push("mouseup");
            cancel.push("mouseout");
            scroll.push(this.getMouseWheelEventName());
        }

        if (Platform.isDesktopDevice) {
            keyUp.push("keyup");
            keyDown.push("keydown");
        }

        return {
            start: start,
            move: move,
            end: end,
            cancel: cancel,
            keyUp: keyUp,
            keyDown: keyDown,
            scroll: scroll
        };
    },

    /**
     * Get browser mouse wheel event.
     *
     * @private
     * @returns {string} The mouse wheel event name for current browser.
     */
    getMouseWheelEventName: function() {
        // IE 11 only supports onwheel, but in this feature test return false for it. Instead it's returning true for onmousewheel, which does not work.
        var isIE11 = Boolean(window.MSInputMethodContext) && Boolean(document.documentMode),
            supportsOnWheel = "onwheel" in document.createElement("div") && !navigator.userAgent.match(/Firefox/i);

        if (isIE11 || supportsOnWheel) {
            return "wheel";
        }
        else if (typeof document.onmousewheel !== "undefined") {
            return "mousewheel";
        }

        return "DOMMouseScroll";
    },

    /**
     * Checks if event is a start event.
     *
     * @param {Object} event The event object.
     * @returns {boolean} Returns true if the condition is met.
     */
    isStartEvent: function(event) {
        // If we use mouse down, make sure user pressed the left button
        if (event.type === "mousedown" && !this.leftButtonClicked(event)) {
            return false;
        }

        return Sys.contains(this.interactionEvents.start, event.type);
    },

    /**
     * Checks if event is an end event.
     *
     * @deprecated Should be handled solely by UserInput module.
     * @param {Object} event The event object.
     * @returns {boolean} Returns true if the condition is met.
     */
    isEndEvent: function(event) {
        // If we use mouse up, check if user pressed the left button
        if (event.type === "mouseup" && !this.leftButtonClicked(event)) {
            return false;
        }

        return Sys.contains(this.interactionEvents.end, event.type);
    },

    /**
     * Checks if event is a move event.
     *
     * @private
     * @param {Object} event The event object.
     * @returns {boolean} Returns true if the condition is met.
     */
    isMoveEvent: function(event) {
        return Sys.contains(this.interactionEvents.move, event.type);
    },

    /**
     * Checks if event is a cancel event.
     *
     * @private
     * @param {Object} event The event object.
     * @returns {boolean} Returns true if the condition is met.
     */
    isCancelEvent: function(event) {
        return Sys.contains(this.interactionEvents.cancel, event.type);
    },

    /**
     * Checks if event is a scroll event.
     *
     * @deprecated Should be handled solely by UserInput module.
     * @param {Object} event The event object.
     * @returns {boolean} Returns true if the condition is met.
     */
    isScrollEvent: function(event) {
        return Sys.contains(this.interactionEvents.scroll, event.type);
    },

    /**
     * Checks if the event is a key up event.
     *
     * @private
     * @param {Object} event The event object.
     * @returns {boolean} Returns true if the condition is met.
     */
    isKeyUpEvent: function(event) {
        return Sys.contains(this.interactionEvents.keyUp, event.type);
    },

    /**
     * Checks if the event is a key down event.
     *
     * @private
     * @param {Object} event The event object.
     * @returns {boolean} Returns true if the condition is met.
     */
    isKeyDownEvent: function(event) {
        return Sys.contains(this.interactionEvents.keyDown, event.type);
    },

    /**
     * Checks if the event is a key press event.
     *
     * @private
     * @param {Object} event The event object.
     * @returns {boolean} Returns true if the condition is met.
     */
    isKeyPressEvent: function(event) {
        return Sys.contains(this.interactionEvents.keyPress, event.type);
    },

    /**
     * Checks if the left button on the mouse is clicked.
     *
     * @private
     * @param {Event} event The mouse event to test.
     * @returns {boolean} Returns true if left mouse button is clicked.
     */
    leftButtonClicked: function(event) {
        if ("buttons" in event && event.buttons !== 0) {
            return event.buttons === 1;
        }
        else if ("which" in event) {
            return event.which === 1;
        }

        return event.button === 0;
    },

    /**
     * Adds event listeners to the DOM.
     *
     * @private
     * @returns {void}
     */
    addEventListeners: function() {
        var me = this,
            events = this.interactionEvents;

        events.start.forEach(function(event) {
            document.body.addEventListener(event, me.interactionEventHandlers.start, true);
        });
        events.move.forEach(function(event) {
            document.body.addEventListener(event, me.interactionEventHandlers.move, { passive: false });
        });
        events.end.forEach(function(event) {
            document.body.addEventListener(event, me.interactionEventHandlers.end, true);
        });
        events.scroll.forEach(function(event) {
            document.body.addEventListener(event, me.interactionEventHandlers.scroll, true);
        });

        events.keyUp.forEach(function(event) {
            document.addEventListener(event, me.interactionEventHandlers.keyUp, false);
        });
        events.keyDown.forEach(function(event) {
            document.addEventListener(event, me.interactionEventHandlers.keyDown, false);
        });

        document.body.addEventListener("gesturestart", this.preventPropagation);
        document.body.addEventListener("gesturechange", this.preventPropagation);
        document.body.addEventListener("gestureend", this.preventPropagation);
    },

    /**
     * Remove event listeners from the DOM.
     *
     * @private
     * @returns {void}
     */
    removeListeners: function() {
        var me = this,
            events = this.interactionEvents;

        events.start.forEach(function(event) {
            document.body.removeEventListener(event, me.interactionEventHandlers.start, true);
        });
        events.move.forEach(function(event) {
            document.body.removeEventListener(event, me.interactionEventHandlers.move, false);
        });
        events.end.forEach(function(event) {
            document.body.removeEventListener(event, me.interactionEventHandlers.end, true);
        });
        events.scroll.forEach(function(event) {
            document.body.removeEventListener(event, me.interactionEventHandlers.scroll, true);
        });

        events.keyUp.forEach(function(event) {
            document.removeEventListener(event, me.interactionEventHandlers.keyUp, false);
        });
        events.keyDown.forEach(function(event) {
            document.removeEventListener(event, me.interactionEventHandlers.keyDown, false);
        });

        document.body.removeEventListener("gesturestart", this.preventPropagation);
        document.body.removeEventListener("gesturechange", this.preventPropagation);
        document.body.removeEventListener("gestureend", this.preventPropagation);
    },

    /**
     * Returns the event names for a specific type of event or the whole event names objects.
     *
     * @private
     * @param {string} [eventKey] The key for the event name.
     * @returns {string[]|Object} The event names or full event object.
     */
    getInteractionEvents: function(eventKey) {
        if (eventKey) {
            return this.interactionEvents[eventKey] || [];
        }

        return this.interactionEvents;
    },

    /**
     * Modifies the event names of interaction events to allow modules to gain exclusive access to user interaction events.
     *
     * @param {string} module The module requesting the exclusivity.
     * @returns {void}
     */
    activateExclusivity: function(module) {
        var queue;

        if (this.readData("exclusivityRequested")) {
            queue = this.readData("exclusiveQueue");
            queue.push(module);
            this.storeData("exclusiveQueue", queue);
        }
        else {
            // Cancel the current interaction if we already have an active one.
            if (this.readData("activeInteraction")) {
                this.sendInputEvent("end", {
                    clientX: -1,
                    clientY: -1
                });
            }

            this.storeData("exclusivityRequested", true);
            this.setExclusiveEvents(module);
        }
    },

    /**
     * Removes exclusivity for the provided module.
     *
     * @param {string} module The name of the module that requests exclusivity deactivation.
     * @returns {void}
     */
    deactivateExclusivity: function(module) {
        var moduleIsRequester,
            exclusiveEvents = this.readData("exclusiveEvents"),
            queue = this.readData("exclusiveQueue"),
            index;

        if (typeof module === "string" && exclusiveEvents.requester === module) {
            moduleIsRequester = true;
        }
        else if (Sys.isObj(module)) {
            moduleIsRequester = true;
            Sys.iterate(module, function(key, value) {
                if (exclusiveEvents[key] !== value) {
                    moduleIsRequester = false;
                }
            });
        }

        if (moduleIsRequester) {
            if (queue.length > 0) {
                this.setExclusiveEvents(queue.shift());
            }
            else {
                this.storeData("exclusivityRequested", false);
            }
        }
        else {
            index = queue.indexOf(module);
            if (index >= 0) {
                queue.splice(index, 1);
            }
        }
    },

    /**
     * Set the exclusive events.
     *
     * @private
     * @param {string} module The name of the module that requested the exclusivity.
     * @returns {void}
     */
    setExclusiveEvents: function(module) {
        var exclusiveEvents;

        if (typeof module === "string") {
            exclusiveEvents = {
                requester: module,
                start: "notify:userInputManager." + module + "ExclusiveStart",
                end: "notify:userInputManager." + module + "ExclusiveEnd",
                keyUp: "notify:userInputManager." + module + "ExclusiveKeyUp",
                keyDown: "notify:userInputManager." + module + "ExclusiveKeyDown",
                move: "notify:userInputManager." + module + "ExclusiveMove",
                hover: "notify:userInputManager." + module + "ExclusiveHover",
                cancel: "notify:userInputManager." + module + "ExclusiveCancel",
                scroll: "notify:userInputManager." + module + "ExclusiveScroll"
            };
        }
        else {
            // Only for backwards compatibility
            exclusiveEvents = module;
        }

        this.storeData("exclusiveEvents", exclusiveEvents);
    },

    /**
     * Check if default behaviour and propagation should be stopped. Will only work for touch move event.
     *
     * @param {Event} event The DOM event.
     * @returns {void}
     */
    checkPropagation: function(event) {
        var numberOfTouches = (event.touches) ? event.touches.length : 1;

        if (this.readData("allowPropagation") && numberOfTouches < 2) {
            return;
        }

        this.preventPropagation(event);
    },

    /**
     * Prevents the provided event from propagating.
     *
     * @private
     * @param {Event} event The DOM event.
     * @returns {void}
     */
    preventPropagation: function(event) {
        event.preventDefault();
        event.stopPropagation();
    },

    /**
     * Handler for user interaction start events.
     *
     * Enforces single touch and handles various types of user interaction (touch, mouse, pointer).
     *
     * @param {Event} event The interaction start event.
     * @returns {void}
     */
    handleInteractionStart: function(event) {
        var activeInteraction = this.readData("activeInteraction");

        // prevent default is to prevent for instance phones trying to save game graphics as images on clicks.
        // stop propagation is to only trigger interaction start at the actual element clicked and not bubble up through any wrapping elements.
        this.checkPropagation(event);

        if (this.isState("deactivated") || !this.isStartEvent(event) || Sys.isDefined(activeInteraction)) {
            return;
        }

        activeInteraction = {
            target: event.target
        };

        if (event.type === "touchstart") {
            // for touches we need to keep track of the actual active touch and
            // we use the first touch registered on the target component that
            // triggered the event (https://developer.mozilla.org/en-US/docs/DOM/TouchEvent.targetTouches)
            activeInteraction.identifier = event.targetTouches[0].identifier;
        }

        this.storeData("activeInteraction", activeInteraction);

        if (Utils.Platform.inIframe()) {
            // Gives focus to the iFrame element to prevent elements in the parent document from retaining focus.
            window.focus();
        }

        this.sendInputEvent("start", event);
    },

    /**
     * Handler for user interaction move events.
     *
     * Enforces single touch and handles various types of user interaction (touch, mouse, pointer).
     * Also determines if it is the active user interaction that is moving.
     *
     * @param {Event} event The user interaction event.
     * @returns {void}
     */
    handleInteractionMove: function(event) {
        var correctInteraction = true,
            activeInteraction = this.readData("activeInteraction");

        this.checkPropagation(event);

        if (this.isState("deactivated") || !this.isMoveEvent(event)) {
            return;
        }

        // with touch events we only want to trigger touchmove if the active touch is the one moving
        if (event.type === "touchmove" && Sys.isObj(activeInteraction)) {
            correctInteraction = this.isTouchInList(event.changedTouches, activeInteraction.identifier);
        }

        if (correctInteraction) {
            this.sendInputEvent(Sys.isDefined(activeInteraction) ? "move" : "hover", event);
        }
    },

    /**
     * Handler for user interaction end events.
     *
     * Enforces single touch and handles various types of user interaction (touch, mouse, pointer).
     *
     * @param {Event} event The event that was triggered.
     * @returns {void}
     */
    handleInteractionEnd: function(event) {
        var interactionStillActive = false,
            activeInteraction = this.readData("activeInteraction");

        this.checkPropagation(event);

        if (this.isState("deactivated") || !Sys.isDefined(activeInteraction) || (!this.isEndEvent(event) && !this.isCancelEvent(event))) {
            return;
        }

        if (this.isEndEvent(event)) {
            // with touch events we make sure that the active touch is no longer on the screen
            if (event.type === "touchend" || event.type === "touchcancel") {
                interactionStillActive = this.isTouchInList(event.touches, activeInteraction.identifier);
            }

            if (!interactionStillActive) {
                this.removeData("activeInteraction");
                this.sendInputEvent("end", event);
            }
        }
    },

    /**
     * Handler for user interaction scroll events.
     *
     * Enforces single touch and handles various types of user interaction (touch, mouse, pointer).
     *
     * @param {Event} event The event that was triggered.
     * @returns {void}
     */
    handleInteractionScroll: function(event) {
        var me = this,
            activeInteraction = me.readData("activeInteraction");

        me.checkPropagation(event);

        if (me.isState("deactivated") || Sys.isDefined(activeInteraction) || !this.isScrollEvent(event)) {
            return;
        }

        me.sendInputEvent("scroll", event);
    },

    /**
     * Handler for the user interaction key down events.
     *
     * @param {Event} event The event that was triggered.
     * @returns {void}
     */
    handleInteractionKeyDown: function(event) {
        var activeInteraction = this.readData("activeInteraction");

        if (this.isState("deactivated") || activeInteraction || !this.isKeyDownEvent(event)) {
            return;
        }

        this.storeData("activeInteraction", event.keyCode);
        this.sendInputEvent("keyDown", event);
    },

    /**
     * Handler for the user interaction key up events.
     *
     * @param {Event} event The event that was triggered.
     * @returns {void}
     */
    handleInteractionKeyUp: function(event) {
        var activeInteraction = this.readData("activeInteraction");

        if (this.isState("deactivated") || activeInteraction !== event.keyCode || !this.isKeyUpEvent(event)) {
            return;
        }

        this.removeData("activeInteraction");
        this.sendInputEvent("keyUp", event);
    },

    /**
     * Determines if the indicated touch is active in the indicated event.
     *
     * @private
     * @param {Object[]} touchList A list of touches from a touch event.
     * @param {number} identifier The touch identifier.
     * @returns {boolean} If touch event is active.
     */
    isTouchInList: function(touchList, identifier) {
        return Object.keys(touchList)
            .some(function(index) {
                return touchList[index].identifier === identifier;
            });
    },

    /**
     * Gets the appropriate event and sends it with the coordinates and original input event.
     *
     * @param {string} type The event type to send.
     * @param {Event} inputEvent The original DOM input event.
     * @returns {void}
     */
    sendInputEvent: function(type, inputEvent) {
        var event = this.getEvent(type);

        if (event) {
            this.fireEvent(event, Sys.UserInputUtils.getUserInputCoordinates(inputEvent), inputEvent);
        }
    },

    /**
     * Gets the event that should be fired for the specified event key.
     *
     * @param {string} eventKey Start, end, cancel or move.
     * @returns {string|undefined} The event to fire or undefined if exclusivity is active but no event is specified for this key.
     */
    getEvent: function(eventKey) {
        return this.readData("exclusivityRequested") ?
            this.readData("exclusiveEvents")[eventKey] :
            this.readData("standardEvents")[eventKey];
    },

    storeData: function(key, data) {
        this.data[key] = data;
    },

    readData: function(key) {
        return this.data[key];
    },

    removeData: function(key) {
        delete this.data[key];
    },

    setState: function(newState) {
        this.state = newState;
    },

    readState: function() {
        return this.state;
    },

    isState: function(state) {
        return state === this.state;
    }
};

Sys.UserInput = Sys.extend(Sys.Observable, Sys.UserInput, "Sys.UserInput");
/* global Sys, Interface */
Sys.ns("Interface.utils");

/**
 * User Input base.
 *
 * Base class for interface controllers (such as buttons and sliders) that require user input.
 *
 * @class Interface.utils.UserInputBase
 * @extends Sys.Observable
 */
Interface.utils.UserInputBase = {

    CSS: {},

    constructor: function(config) {
        Interface.utils.UserInputBase.superclass.constructor.apply(this, arguments);

        this.init(config);
    },

    /**
     * Enable the switch.
     *
     * @returns {void}
     */
    enable: function() {
        var me = this;

        me.enabled = true;
        me.startListeningToUserInput();
        me.container.removeCls(me.CSS.disabled);
    },

    /**
     * Disable the switch.
     *
     * @returns {void}
     */
    disable: function() {
        var me = this;

        me.enabled = false;
        me.stopListeningToUserInput();
        me.container.addCls(me.CSS.disabled);
    },

    /**
     * Returns whether or not it is enabled.
     *
     * @returns {boolean} Whether or not it is enabled.
     */
    isEnabled: function() {
        return this.enabled;
    },

    /**
     * Lock your interface. This also will disable the component.
     *
     * @param {string} id String id.
     * @returns {void}
     */
    lock: function(id) {
        var me = this;

        if (!me.locker.contains(id)) {
            me.locker.push(id);
        }

        me.disable();
    },

    /**
     * Unlock interface.
     *
     * @param {string} id String id.
     * @returns {void}
     */
    unlock: function(id) {
        var me = this,
            pos = me.locker.indexOf(id);

        if (pos >= 0) {
            me.locker.splice(pos, 1);
        }

        if (!me.isLocked()) {
            me.enable();
        }
    },

    /**
     * Returns if there is any lock on the interface.
     *
     * @returns {boolean} If interface is locked.
     */
    isLocked: function() {
        return this.locker.length !== 0;
    },

    /**
     * Get the switch container.
     *
     * @returns {Sys.Element} The container.
     */
    getContainer: function() {
        return this.container;
    },

    /**
     * Initialize the toggle switch.
     *
     * @private
     * @param {Object} config Config object.
     * @returns {void}
     */
    init: function(config) {
        var me = this;

        config = config || {};
        config.cls = typeof config.cls === "string" ? config.cls : "";

        me.id = config.id;

        me.locker = [];

        if (Sys.isDefined(config.CSS)) {
            me.CSS = Sys.applyIf(config.CSS, me.CSS);
        }

        me.setupContainer(config);

        if (config.enabled) {
            me.enable();
        }
        else {
            me.disable();
        }
    },

    onUserInputStart: function() {
        // stub
    },
    onUserInputEnd: function() {
        // stub
    },
    onUserInputMove: function() {
        // stub
    },
    onUserInputCanceled: function() {
        // stub
    },

    /**
     * Setup DOM Elements.
     *
     * @private
     * @returns {void}
     */
    setupContainer: function() {
        var me = this;

        me.container = new Sys.Element({
            id: me.id,
            tag: "div",
            cls: me.CSS.base
        });
    },

    /**
     * Start listening to user input events.
     *
     * @private
     * @returns {void}
     */
    startListeningToUserInput: function() {
        var me = this;

        me.on({
            "notify:userInputManager.userInputStarted": me.onUserInputStart,
            "notify:userInputManager.userInputEnded": me.onUserInputEnd,
            "notify:userInputManager.userInputMove": me.onUserInputMove,
            "notify:userInputManager.userInputCanceled": me.onUserInputCanceled
        });
    },

    /**
     * Remove listening to user input events.
     *
     * @private
     * @returns {void}
     */
    stopListeningToUserInput: function() {
        var me = this;

        me.removeListener("notify:userInputManager.userInputStarted");
        me.removeListener("notify:userInputManager.userInputEnded");
        me.removeListener("notify:userInputManager.userInputMove");
        me.removeListener("notify:userInputManager.userInputCanceled");
    },

    /**
     * Stub function that should be used to set the controls state without triggering events.
     *
     * @returns {void}
     */
    setValue: function() {
        // stub
    }
};

Interface.utils.UserInputBase = Sys.extend(Sys.Observable, Interface.utils.UserInputBase, "Interface.utils.UserInputBase");
/* global Sys, Interface */
Sys.ns("Interface.utils");

/**
 * Button.
 *
 * @class Interface.utils.Button
 * @extends Interface.utils.UserInputBase
 */
Interface.utils.Button = {

    CSS: {
        base: "button",
        pressed: "button_pressed",
        disabled: "button_disabled"
    },

    /**
     * Default user input events
     */
    DEFAULT_USER_INPUT_EVENTS: {
        started: "notify:userInputManager.userInputStarted",
        ended: "notify:userInputManager.userInputEnded",
        move: "notify:userInputManager.userInputMove",
        canceled: "notify:userInputManager.userInputCanceled"
    },

    constructor: function(config) {
        Interface.utils.Button.superclass.constructor.apply(this, arguments);
    },

    /**
     * Enable the button.
     *
     * @returns {void}
     */
    enable: function() {
        var me = this;

        me.enabled = true;
        me.container.removeCls(me.CSS.disabled);

        if (me.enableInteraction) {
            me.startListeningToUserInput();
        }
    },

    /**
     * Disable the button.
     *
     * @returns {void}
     */
    disable: function() {
        var me = this;

        me.enabled = false;
        me.container.addCls(me.CSS.disabled);

        if (me.enableInteraction) {
            me.stopListeningToUserInput();
        }
    },

    /**
     * Set the label text.
     *
     * @param {string} text The text to use as a label.
     * @returns {void}
     */
    setText: function(text) {
        this.label = text;
        this.container.el.textContent = text;
    },

    /**
     * Get the current label text.
     *
     * @returns {string} The label text.
     */
    getText: function() {
        return this.label;
    },

    /**
     * Shows the button by setting the display type (defaults to block).
     *
     * @param {string} [displayType="block"] The display type to use.
     * @returns {void}
     */
    show: function(displayType) {
        this.container.el.style.display = Sys.isDefined(displayType) ? displayType : "block";
    },

    /**
     * Hides the button by setting display to none.
     *
     * @returns {void}
     */
    hide: function() {
        this.container.el.style.display = "none";
    },

    /**
     * Initial setup of the button and its components.
     *
     * @param {Object} config Config object.
     * @param {string} [config.label] The optional button label.
     * @param {Object} [config.CSS] Object containing styles for the buttons different states.
     * @param {string} [config.CSS.base] CSS base.
     * @param {string} [config.CSS.pressed] CSS pressed.
     * @param {string} [config.CSS.enabled] CSS enabled.
     * @param {string} [config.CSS.disabled] CSS disabled.
     * @param {Object} [config.userInputEvents] Which user input events the button should listen to, defaults to DEFAULT_USER_INPUT.
     * @param {Function} config.clickCallback Self-contained function that will be called on this button if a click is registered.
     * @returns {void}
     */
    init: function(config) {
        var me = this;

        // Setup which user input events the module shall use.
        if (Sys.isDefined(config.userInputEvents)) {
            me.userInputEvents = config.userInputEvents;
        }
        else {
            me.userInputEvents = me.DEFAULT_USER_INPUT_EVENTS;
        }

        me.clickCallback = config.clickCallback;
        me.enableInteraction = Sys.isDefined(me.clickCallback);

        Interface.utils.Button.superclass.init.call(me, config);

        if (config.hidden === true) {
            me.hide();
        }

        if (typeof config.label === "string") {
            me.setText(config.label);
        }
    },

    /**
     * Start listening to user input events.
     *
     * @private
     * @returns {void}
     */
    startListeningToUserInput: function() {
        var me = this;

        if (Sys.isDefined(me.userInputEvents.started)) {
            me.addListener(me.userInputEvents.started, me.onUserInputStart);
        }

        if (Sys.isDefined(me.userInputEvents.started)) {
            me.addListener(me.userInputEvents.ended, me.onUserInputEnd);
        }

        if (Sys.isDefined(me.userInputEvents.move)) {
            me.addListener(me.userInputEvents.move, me.onUserInputMove);
        }

        if (Sys.isDefined(me.userInputEvents.canceled)) {
            me.addListener(me.userInputEvents.canceled, me.onUserInputCanceled);
        }
    },

    /**
     * Remove listening to user input events.
     *
     * @private
     * @returns {void}
     */
    stopListeningToUserInput: function() {
        var me = this;

        if (Sys.isDefined(me.userInputEvents.started)) {
            me.removeListener(me.userInputEvents.started);
        }

        if (Sys.isDefined(me.userInputEvents.ended)) {
            me.removeListener(me.userInputEvents.ended);
        }

        if (Sys.isDefined(me.userInputEvents.move)) {
            me.removeListener(me.userInputEvents.move);
        }

        if (Sys.isDefined(me.userInputEvents.canceled)) {
            me.removeListener(me.userInputEvents.canceled);
        }
    },

    /**
     * Makes the button look pressed if it is enabled and the press started on the button.
     *
     * @param {{x: number, y: number}} coordinate The user input coordinate.
     * @returns {void}
     */
    onUserInputStart: function(coordinate) {
        var me = this;

        if (me.enabled && Sys.UserInputUtils.isCoordinateTarget(me.container.el, coordinate)) {
            me.isActiveInputTarget = true;
            me.container.addCls(me.CSS.pressed);
        }
    },

    /**
     * Clicks the button if appropriate and stops it from looking pressed.
     *
     * @param {{x: number, y: number}} coordinate The user input coordinate.
     * @returns {void}
     */
    onUserInputEnd: function(coordinate) {
        var me = this;

        if (me.isActiveInputTarget && Sys.UserInputUtils.isCoordinateTarget(me.container.el, coordinate)) {
            me.clickCallback();
        }

        me.onUserInputCanceled();
    },

    /**
     * Stops the button from looking pressed.
     *
     * @returns {void}
     */
    onUserInputCanceled: function() {
        this.isActiveInputTarget = false;
        this.container.removeCls(this.CSS.pressed);
    }
};

Interface.utils.Button = Sys.extend(Interface.utils.UserInputBase, Interface.utils.Button, "Interface.utils.Button");
/* global Sys, Interface, Services */
Sys.ns("Interface.utils");

/**
 * DOM button.
 *
 * Supports down, hover and disabled.
 *
 * @class Interface.utils.DOMButton
 * @extends Interface.AbstractButton
 */

Interface.utils.InteractiveContainer = {

    DEFAULT_BUTTON_TEXT: "Add Value",

    CSS: {
        base: "interface-interactiveContainer_base",
        disabled: "interface-interactiveContainer_disabled",
        label: "interface-interactiveContainer_label",
        button_wrapper: "interface-interactiveContainer_buttonWrapper",
        button: "interface-interactiveContainer_button"
    },

    constructor: function(config) {
        Interface.utils.InteractiveContainer.superclass.constructor.apply(this, arguments);
    },

    /**
     * @param {Object} config Config object.
     * @param {string} [config.title] Title text.
     * @param {string} [config.info] Info text.
     * @param {string} [config.buttonText] Button text.
     * @param {number} [config.minValue] Minimum allowed value.
     * @param {Function} [config.callback] Callback returning with the set values.
     * @returns {void}
     */
    init: function(config) {
        var me = this;

        config = config || {};

        me.title = config.title;
        me.callback = config.callback;
        me.minValue = config.minValue;

        me.info = config.info || "";

        me.buttonText = config.buttonText || me.DEFAULT_BUTTON_TEXT;

        me.callback = config.callback || function() {
            // stub
        };
        me.keyboardResult = {};

        Interface.utils.InteractiveContainer.superclass.init.apply(me, arguments);
    },

    /**
     * Set minimum value.
     *
     * @param {number} minValue Minimum value.
     * @returns {void}
     */
    setMinValue: function(minValue) {
        this.minValue = minValue;
    },

    /**
     * @private
     * @param {Object} config Config object.
     * @param {string} [config.id] The id of the button.
     * @param {string} [config.cls] The class of the button.
     * @param {string} [config.info] The Keyboard info config.
     * @param {string} [config.label] The Keyboard label config.
     * @returns {void}
     */
    setupContainer: function(config) {
        var me = this;

        me.container = new Sys.Element({
            id: me.id,
            tag: "div",
            cls: config.cls + " " + me.CSS.base
        });

        if (me.title) {
            me.label = me.container.add(new Sys.Element({
                id: me.id + "_title",
                tag: "div",
                cls: me.CSS.label,
                textContent: me.title
            }));
        }

        me.buttonWrapper = me.container.add(new Sys.Element({
            id: me.id + "_button_wrapper",
            tag: "div",
            cls: me.CSS.button_wrapper
        }));

        me.addButton = me.buttonWrapper.add(new Sys.Element({
            id: me.id + "_button",
            tag: "div",
            cls: String(me.CSS.button),
            textContent: me.buttonText
        }));
    },

    /**
     * Set value without triggering events.
     *
     * @param {number} cents The container value in cents.
     * @param {boolean} [silent=false] Tells if callback should be called or not.
     * @returns {void}
     */
    setValue: function(cents, silent) {
        var me = this,
            keyboardResult;

        if (Sys.isNumber(cents)) {
            keyboardResult = {
                formattedInputField: Services.moneyManager.formatMoneyCurrencySign(Sys.utils.toInt(cents), undefined, 0),
                input: String(Sys.utils.toInt(cents / 100)),
                value: Sys.utils.toInt(cents / 100),
                cents: cents
            };

            if (silent !== true) {
                me.keyboardCallback(keyboardResult);
            }
            else {
                me.keyboardResult = keyboardResult;
                me.updateButtonText();
            }
        }
    },

    /**
     * Identify which element was touched.
     *
     * @private
     * @param {Object} windowCoordinates The window coordinates of the user input.
     * @returns {void}
     */
    onUserInputStart: function(windowCoordinates) {
        this.wasInitialInputTarget = Sys.UserInputUtils.isCoordinateTarget(this.buttonWrapper.el, windowCoordinates) && this.enabled;
    },

    /**
     * Toggle the switch if this element was touched and was the start element.
     *
     * @private
     * @param {Object} windowCoordinates The window coordinates of the user input.
     * @returns {void}
     */
    onUserInputEnd: function(windowCoordinates) {
        var me = this,
            isInputTarget = Sys.UserInputUtils.isCoordinateTarget(me.buttonWrapper.el, windowCoordinates);

        if (isInputTarget && me.wasInitialInputTarget) {
            me.requestKeyboard();
        }

        me.wasInitialInputTarget = false;
    },

    /**
     * Simulate click to the add button.
     *
     * @returns {void}
     */
    click: function() {
        this.requestKeyboard();
    },

    /**
     * Request the keyboard to be opened.
     *
     * @returns {void}
     */
    requestKeyboard: function() {
        var me = this;

        me.fireEvent("request:keyboard.open", {
            info: me.info,
            label: me.title,
            okCallback: me.keyboardCallback.bind(me),
            cancelCallback: me.keyboardCallback.bind(me),
            minValue: me.minValue

        });
    },

    /**
     * Called on keyboard cancel and ok callback.
     *
     * @private
     * @param {Object} [keyboardResult] Keyboard result.
     * @param {string} [keyboardResult.formattedInput] Formatted input.
     * @param {number} [keyboardResult.value] Value in integer.
     * @param {string} [keyboardResult.input] Input value in string.
     * @returns {void}
     */
    keyboardCallback: function(keyboardResult) {
        var me = this;

        if (Sys.isDefined(keyboardResult)) {
            me.keyboardResult = keyboardResult;
        }

        me.updateButtonText();

        me.callback(me.keyboardResult.cents || 0);
    },

    /**
     * Update button text.
     *
     * @returns {void}
     */
    updateButtonText: function() {
        var me = this,
            btn = me.addButton;

        if (me.keyboardResult.value > 0) {
            btn.el.textContent = me.keyboardResult.formattedInput;
            btn.addCSSClass("interactive_pushed");
        }
        else {
            btn.el.textContent = me.buttonText;
            btn.removeCSSClass("interactive_pushed");
        }
    }

};

Interface.utils.InteractiveContainer = Sys.extend(Interface.utils.UserInputBase, Interface.utils.InteractiveContainer, "Interface.utils.InteractiveContainer");
/*
 * Scroller
 * http://github.com/zynga/scroller
 *
 * Copyright 2011, Zynga Inc.
 * Licensed under the MIT License.
 * https://raw.github.com/zynga/scroller/master/MIT-LICENSE.txt
 *
 * Based on the work of: Unify Project (unify-project.org)
 * http://unify-project.org
 * Copyright 2011, Deutsche Telekom AG
 * License: MIT + Apache (V2)
 */

/**
 * Generic animation class with support for dropped frames both optional easing and duration.
 *
 * Optional duration is useful when the lifetime is defined by another condition than time
 * e.g. speed of an animating object, etc.
 *
 * Dropped frame logic allows to keep using the same updater logic independent from the actual
 * rendering. This eases a lot of cases where it might be pretty complex to break down a state
 * based on the pure time difference.
 */
(function(global) {
    var time = Date.now || function() {
        return +new Date();
    };
    var desiredFrames = 60;
    var millisecondsPerSecond = 1000;
    var running = {};
    var counter = 1;

    // Create namespaces
    if (!global.core) {
        global.core = { effect : {} };

    } else if (!core.effect) {
        core.effect = {};
    }

    core.effect.Animate = {

        /**
         * A requestAnimationFrame wrapper / polyfill.
         *
         * @param callback {Function} The callback to be invoked before the next repaint.
         * @param root {HTMLElement} The root element for the repaint
         */
        requestAnimationFrame: (function() {

            // Check for request animation Frame support
            var requestFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame;
            var isNative = !!requestFrame;

            if (requestFrame && !/requestAnimationFrame\(\)\s*\{\s*\[native code\]\s*\}/i.test(requestFrame.toString())) {
                isNative = false;
            }

            if (isNative) {
                return function(callback, root) {
                    requestFrame(callback, root)
                };
            }

            var TARGET_FPS = 60;
            var requests = {};
            var requestCount = 0;
            var rafHandle = 1;
            var intervalHandle = null;
            var lastActive = +new Date();

            return function(callback, root) {
                var callbackHandle = rafHandle++;

                // Store callback
                requests[callbackHandle] = callback;
                requestCount++;

                // Create timeout at first request
                if (intervalHandle === null) {

                    intervalHandle = setInterval(function() {

                        var time = +new Date();
                        var currentRequests = requests;

                        // Reset data structure before executing callbacks
                        requests = {};
                        requestCount = 0;

                        for(var key in currentRequests) {
                            if (currentRequests.hasOwnProperty(key)) {
                                currentRequests[key](time);
                                lastActive = time;
                            }
                        }

                        // Disable the timeout when nothing happens for a certain
                        // period of time
                        if (time - lastActive > 2500) {
                            clearInterval(intervalHandle);
                            intervalHandle = null;
                        }

                    }, 1000 / TARGET_FPS);
                }

                return callbackHandle;
            };

        })(),


        /**
         * Stops the given animation.
         *
         * @param id {Integer} Unique animation ID
         * @return {Boolean} Whether the animation was stopped (aka, was running before)
         */
        stop: function(id) {
            var cleared = running[id] != null;
            if (cleared) {
                running[id] = null;
            }

            return cleared;
        },


        /**
         * Whether the given animation is still running.
         *
         * @param id {Integer} Unique animation ID
         * @return {Boolean} Whether the animation is still running
         */
        isRunning: function(id) {
            return running[id] != null;
        },


        /**
         * Start the animation.
         *
         * @param stepCallback {Function} Pointer to function which is executed on every step.
         *   Signature of the method should be `function(percent, now, virtual) { return continueWithAnimation; }`
         * @param verifyCallback {Function} Executed before every animation step.
         *   Signature of the method should be `function() { return continueWithAnimation; }`
         * @param completedCallback {Function}
         *   Signature of the method should be `function(droppedFrames, finishedAnimation) {}`
         * @param duration {Integer} Milliseconds to run the animation
         * @param easingMethod {Function} Pointer to easing function
         *   Signature of the method should be `function(percent) { return modifiedValue; }`
         * @param root {Element ? document.body} Render root, when available. Used for internal
         *   usage of requestAnimationFrame.
         * @return {Integer} Identifier of animation. Can be used to stop it any time.
         */
        start: function(stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {

            var start = time();
            var lastFrame = start;
            var percent = 0;
            var dropCounter = 0;
            var id = counter++;

            if (!root) {
                root = document.body;
            }

            // Compacting running db automatically every few new animations
            if (id % 20 === 0) {
                var newRunning = {};
                for (var usedId in running) {
                    newRunning[usedId] = true;
                }
                running = newRunning;
            }

            // This is the internal step method which is called every few milliseconds
            var step = function(virtual) {

                // Normalize virtual value
                var render = virtual !== true;

                // Get current time
                var now = time();

                // Verification is executed before next animation step
                if (!running[id] || (verifyCallback && !verifyCallback(id))) {

                    running[id] = null;
                    completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, false);
                    return;

                }

                // For the current rendering to apply let's update omitted steps in memory.
                // This is important to bring internal state variables up-to-date with progress in time.
                if (render) {

                    var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1;
                    for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
                        step(true);
                        dropCounter++;
                    }

                }

                // Compute percent value
                if (duration) {
                    percent = (now - start) / duration;
                    if (percent > 1) {
                        percent = 1;
                    }
                }

                // Execute step callback, then...
                var value = easingMethod ? easingMethod(percent) : percent;
                if ((stepCallback(value, now, render) === false || percent === 1) && render) {
                    running[id] = null;
                    completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, percent === 1 || duration == null);
                } else if (render) {
                    lastFrame = now;
                    core.effect.Animate.requestAnimationFrame(step, root);
                }
            };

            // Mark as running
            running[id] = true;

            // Init first step
            core.effect.Animate.requestAnimationFrame(step, root);

            // Return unique animation ID
            return id;
        }
    };
})(this);
/*
 * Scroller
 * http://github.com/zynga/scroller
 *
 * Copyright 2011, Zynga Inc.
 * Licensed under the MIT License.
 * https://raw.github.com/zynga/scroller/master/MIT-LICENSE.txt
 *
 * Based on the work of: Unify Project (unify-project.org)
 * http://unify-project.org
 * Copyright 2011, Deutsche Telekom AG
 * License: MIT + Apache (V2)
 */

var Scroller;

(function() {
    var NOOP = function(){};

    /**
     * A pure logic 'component' for 'virtual' scrolling/zooming.
     */
    Scroller = function(callback, options) {

        this.__callback = callback;

        this.options = {

            /** Enable scrolling on x-axis */
            scrollingX: true,

            /** Enable scrolling on y-axis */
            scrollingY: true,

            /** Enable animations for deceleration, snap back, zooming and scrolling */
            animating: true,

            /** duration for animations triggered by scrollTo/zoomTo */
            animationDuration: 250,

            /** Enable bouncing (content can be slowly moved outside and jumps back after releasing) */
            bouncing: true,

            /** Enable locking to the main axis if user moves only slightly on one of them at start */
            locking: true,

            /** Enable pagination mode (switching between full page content panes) */
            paging: false,

            /** Enable snapping of content to a configured pixel grid */
            snapping: false,

            /** Enable zooming of content via API, fingers and mouse wheel */
            zooming: false,

            /** Minimum zoom level */
            minZoom: 0.5,

            /** Maximum zoom level */
            maxZoom: 3,

            /** Multiply or decrease scrolling speed **/
            speedMultiplier: 1,

            /** Callback that is fired on the later of touch end or deceleration end,
             provided that another scrolling action has not begun. Used to know
             when to fade out a scrollbar. */
            scrollingComplete: NOOP,

            /** This configures the amount of change applied to deceleration when reaching boundaries  **/
            penetrationDeceleration : 0.03,

            /** This configures the amount of change applied to acceleration when reaching boundaries  **/
            penetrationAcceleration : 0.08

        };

        for (var key in options) {
            this.options[key] = options[key];
        }

    };


    // Easing Equations (c) 2003 Robert Penner, all rights reserved.
    // Open source under the BSD License.

    /**
     * @param pos {Number} position between 0 (start of effect) and 1 (end of effect)
     **/
    var easeOutCubic = function(pos) {
        return (Math.pow((pos - 1), 3) + 1);
    };

    /**
     * @param pos {Number} position between 0 (start of effect) and 1 (end of effect)
     **/
    var easeInOutCubic = function(pos) {
        if ((pos /= 0.5) < 1) {
            return 0.5 * Math.pow(pos, 3);
        }

        return 0.5 * (Math.pow((pos - 2), 3) + 2);
    };


    var members = {

        /*
         ---------------------------------------------------------------------------
         INTERNAL FIELDS :: STATUS
         ---------------------------------------------------------------------------
         */

        /** {Boolean} Whether only a single finger is used in touch handling */
        __isSingleTouch: false,

        /** {Boolean} Whether a touch event sequence is in progress */
        __isTracking: false,

        /** {Boolean} Whether a deceleration animation went to completion. */
        __didDecelerationComplete: false,

        /**
         * {Boolean} Whether a gesture zoom/rotate event is in progress. Activates when
         * a gesturestart event happens. This has higher priority than dragging.
         */
        __isGesturing: false,

        /**
         * {Boolean} Whether the user has moved by such a distance that we have enabled
         * dragging mode. Hint: It's only enabled after some pixels of movement to
         * not interrupt with clicks etc.
         */
        __isDragging: false,

        /**
         * {Boolean} Not touching and dragging anymore, and smoothly animating the
         * touch sequence using deceleration.
         */
        __isDecelerating: false,

        /**
         * {Boolean} Smoothly animating the currently configured change
         */
        __isAnimating: false,



        /*
         ---------------------------------------------------------------------------
         INTERNAL FIELDS :: DIMENSIONS
         ---------------------------------------------------------------------------
         */

        /** {Integer} Available outer left position (from document perspective) */
        __clientLeft: 0,

        /** {Integer} Available outer top position (from document perspective) */
        __clientTop: 0,

        /** {Integer} Available outer width */
        __clientWidth: 0,

        /** {Integer} Available outer height */
        __clientHeight: 0,

        /** {Integer} Outer width of content */
        __contentWidth: 0,

        /** {Integer} Outer height of content */
        __contentHeight: 0,

        /** {Integer} Snapping width for content */
        __snapWidth: 100,

        /** {Integer} Snapping height for content */
        __snapHeight: 100,

        /** {Integer} Height to assign to refresh area */
        __refreshHeight: null,

        /** {Boolean} Whether the refresh process is enabled when the event is released now */
        __refreshActive: false,

        /** {Function} Callback to execute on activation. This is for signalling the user about a refresh is about to happen when he release */
        __refreshActivate: null,

        /** {Function} Callback to execute on deactivation. This is for signalling the user about the refresh being cancelled */
        __refreshDeactivate: null,

        /** {Function} Callback to execute to start the actual refresh. Call {@link #refreshFinish} when done */
        __refreshStart: null,

        /** {Number} Zoom level */
        __zoomLevel: 1,

        /** {Number} Scroll position on x-axis */
        __scrollLeft: 0,

        /** {Number} Scroll position on y-axis */
        __scrollTop: 0,

        /** {Integer} Maximum allowed scroll position on x-axis */
        __maxScrollLeft: 0,

        /** {Integer} Maximum allowed scroll position on y-axis */
        __maxScrollTop: 0,

        /* {Number} Scheduled left position (final position when animating) */
        __scheduledLeft: 0,

        /* {Number} Scheduled top position (final position when animating) */
        __scheduledTop: 0,

        /* {Number} Scheduled zoom level (final scale when animating) */
        __scheduledZoom: 0,



        /*
         ---------------------------------------------------------------------------
         INTERNAL FIELDS :: LAST POSITIONS
         ---------------------------------------------------------------------------
         */

        /** {Number} Left position of finger at start */
        __lastTouchLeft: null,

        /** {Number} Top position of finger at start */
        __lastTouchTop: null,

        /** {Date} Timestamp of last move of finger. Used to limit tracking range for deceleration speed. */
        __lastTouchMove: null,

        /** {Array} List of positions, uses three indexes for each state: left, top, timestamp */
        __positions: null,



        /*
         ---------------------------------------------------------------------------
         INTERNAL FIELDS :: DECELERATION SUPPORT
         ---------------------------------------------------------------------------
         */

        /** {Integer} Minimum left scroll position during deceleration */
        __minDecelerationScrollLeft: null,

        /** {Integer} Minimum top scroll position during deceleration */
        __minDecelerationScrollTop: null,

        /** {Integer} Maximum left scroll position during deceleration */
        __maxDecelerationScrollLeft: null,

        /** {Integer} Maximum top scroll position during deceleration */
        __maxDecelerationScrollTop: null,

        /** {Number} Current factor to modify horizontal scroll position with on every step */
        __decelerationVelocityX: null,

        /** {Number} Current factor to modify vertical scroll position with on every step */
        __decelerationVelocityY: null,



        /*
         ---------------------------------------------------------------------------
         PUBLIC API
         ---------------------------------------------------------------------------
         */

        /**
         * Configures the dimensions of the client (outer) and content (inner) elements.
         * Requires the available space for the outer element and the outer size of the inner element.
         * All values which are falsy (null or zero etc.) are ignored and the old value is kept.
         *
         * @param clientWidth {Integer ? null} Inner width of outer element
         * @param clientHeight {Integer ? null} Inner height of outer element
         * @param contentWidth {Integer ? null} Outer width of inner element
         * @param contentHeight {Integer ? null} Outer height of inner element
         */
        setDimensions: function(clientWidth, clientHeight, contentWidth, contentHeight) {

            var self = this;

            // Only update values which are defined
            if (clientWidth === +clientWidth) {
                self.__clientWidth = clientWidth;
            }

            if (clientHeight === +clientHeight) {
                self.__clientHeight = clientHeight;
            }

            if (contentWidth === +contentWidth) {
                self.__contentWidth = contentWidth;
            }

            if (contentHeight === +contentHeight) {
                self.__contentHeight = contentHeight;
            }

            // Refresh maximums
            self.__computeScrollMax();

            // Refresh scroll position
            self.scrollTo(self.__scrollLeft, self.__scrollTop, true);

        },


        /**
         * Sets the client coordinates in relation to the document.
         *
         * @param left {Integer ? 0} Left position of outer element
         * @param top {Integer ? 0} Top position of outer element
         */
        setPosition: function(left, top) {

            var self = this;

            self.__clientLeft = left || 0;
            self.__clientTop = top || 0;

        },


        /**
         * Configures the snapping (when snapping is active)
         *
         * @param width {Integer} Snapping width
         * @param height {Integer} Snapping height
         */
        setSnapSize: function(width, height) {

            var self = this;

            self.__snapWidth = width;
            self.__snapHeight = height;

        },


        /**
         * Activates pull-to-refresh. A special zone on the top of the list to start a list refresh whenever
         * the user event is released during visibility of this zone. This was introduced by some apps on iOS like
         * the official Twitter client.
         *
         * @param height {Integer} Height of pull-to-refresh zone on top of rendered list
         * @param activateCallback {Function} Callback to execute on activation. This is for signalling the user about a refresh is about to happen when he release.
         * @param deactivateCallback {Function} Callback to execute on deactivation. This is for signalling the user about the refresh being cancelled.
         * @param startCallback {Function} Callback to execute to start the real async refresh action. Call {@link #finishPullToRefresh} after finish of refresh.
         */
        activatePullToRefresh: function(height, activateCallback, deactivateCallback, startCallback) {

            var self = this;

            self.__refreshHeight = height;
            self.__refreshActivate = activateCallback;
            self.__refreshDeactivate = deactivateCallback;
            self.__refreshStart = startCallback;

        },


        /**
         * Starts pull-to-refresh manually.
         */
        triggerPullToRefresh: function() {
            // Use publish instead of scrollTo to allow scrolling to out of boundary position
            // We don't need to normalize scrollLeft, zoomLevel, etc. here because we only y-scrolling when pull-to-refresh is enabled
            this.__publish(this.__scrollLeft, -this.__refreshHeight, this.__zoomLevel, true);

            if (this.__refreshStart) {
                this.__refreshStart();
            }
        },


        /**
         * Signalizes that pull-to-refresh is finished.
         */
        finishPullToRefresh: function() {

            var self = this;

            self.__refreshActive = false;
            if (self.__refreshDeactivate) {
                self.__refreshDeactivate();
            }

            self.scrollTo(self.__scrollLeft, self.__scrollTop, true);

        },


        /**
         * Returns the scroll position and zooming values
         *
         * @return {Map} `left` and `top` scroll position and `zoom` level
         */
        getValues: function() {

            var self = this;

            return {
                left: self.__scrollLeft,
                top: self.__scrollTop,
                zoom: self.__zoomLevel
            };

        },


        /**
         * Returns the maximum scroll values
         *
         * @return {Map} `left` and `top` maximum scroll values
         */
        getScrollMax: function() {

            var self = this;

            return {
                left: self.__maxScrollLeft,
                top: self.__maxScrollTop
            };

        },


        /**
         * Zooms to the given level. Supports optional animation. Zooms
         * the center when no coordinates are given.
         *
         * @param level {Number} Level to zoom to
         * @param animate {Boolean ? false} Whether to use animation
         * @param originLeft {Number ? null} Zoom in at given left coordinate
         * @param originTop {Number ? null} Zoom in at given top coordinate
         * @param callback {Function ? null} A callback that gets fired when the zoom is complete.
         */
        zoomTo: function(level, animate, originLeft, originTop, callback) {

            var self = this;

            if (!self.options.zooming) {
                throw new Error("Zooming is not enabled!");
            }

            // Add callback if exists
            if(callback) {
                self.__zoomComplete = callback;
            }

            // Stop deceleration
            if (self.__isDecelerating) {
                core.effect.Animate.stop(self.__isDecelerating);
                self.__isDecelerating = false;
            }

            var oldLevel = self.__zoomLevel;

            // Normalize input origin to center of viewport if not defined
            if (originLeft == null) {
                originLeft = self.__clientWidth / 2;
            }

            if (originTop == null) {
                originTop = self.__clientHeight / 2;
            }

            // Limit level according to configuration
            level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom);

            // Recompute maximum values while temporary tweaking maximum scroll ranges
            self.__computeScrollMax(level);

            // Recompute left and top coordinates based on new zoom level
            var left = ((originLeft + self.__scrollLeft) * level / oldLevel) - originLeft;
            var top = ((originTop + self.__scrollTop) * level / oldLevel) - originTop;

            // Limit x-axis
            if (left > self.__maxScrollLeft) {
                left = self.__maxScrollLeft;
            } else if (left < 0) {
                left = 0;
            }

            // Limit y-axis
            if (top > self.__maxScrollTop) {
                top = self.__maxScrollTop;
            } else if (top < 0) {
                top = 0;
            }

            // Push values out
            self.__publish(left, top, level, animate);

        },


        /**
         * Zooms the content by the given factor.
         *
         * @param factor {Number} Zoom by given factor
         * @param animate {Boolean ? false} Whether to use animation
         * @param originLeft {Number ? 0} Zoom in at given left coordinate
         * @param originTop {Number ? 0} Zoom in at given top coordinate
         * @param callback {Function ? null} A callback that gets fired when the zoom is complete.
         */
        zoomBy: function(factor, animate, originLeft, originTop, callback) {

            var self = this;

            self.zoomTo(self.__zoomLevel * factor, animate, originLeft, originTop, callback);

        },


        /**
         * Scrolls to the given position. Respect limitations and snapping automatically.
         *
         * @param left {Number?null} Horizontal scroll position, keeps current if value is <code>null</code>
         * @param top {Number?null} Vertical scroll position, keeps current if value is <code>null</code>
         * @param animate {Boolean?false} Whether the scrolling should happen using an animation
         * @param zoom {Number?null} Zoom level to go to
         */
        scrollTo: function(left, top, animate, zoom) {

            var self = this;

            // Stop deceleration
            if (self.__isDecelerating) {
                core.effect.Animate.stop(self.__isDecelerating);
                self.__isDecelerating = false;
            }

            // Correct coordinates based on new zoom level
            if (zoom != null && zoom !== self.__zoomLevel) {

                if (!self.options.zooming) {
                    throw new Error("Zooming is not enabled!");
                }

                left *= zoom;
                top *= zoom;

                // Recompute maximum values while temporary tweaking maximum scroll ranges
                self.__computeScrollMax(zoom);

            } else {

                // Keep zoom when not defined
                zoom = self.__zoomLevel;

            }

            if (!self.options.scrollingX) {

                left = self.__scrollLeft;

            } else {

                if (self.options.paging) {
                    left = Math.round(left / self.__clientWidth) * self.__clientWidth;
                } else if (self.options.snapping) {
                    left = Math.round(left / self.__snapWidth) * self.__snapWidth;
                }

            }

            if (!self.options.scrollingY) {

                top = self.__scrollTop;

            } else {

                if (self.options.paging) {
                    top = Math.round(top / self.__clientHeight) * self.__clientHeight;
                } else if (self.options.snapping) {
                    top = Math.round(top / self.__snapHeight) * self.__snapHeight;
                }

            }

            // Limit for allowed ranges
            left = Math.max(Math.min(self.__maxScrollLeft, left), 0);
            top = Math.max(Math.min(self.__maxScrollTop, top), 0);

            // Don't animate when no change detected, still call publish to make sure
            // that rendered position is really in-sync with internal data
            if (left === self.__scrollLeft && top === self.__scrollTop) {
                animate = false;
            }

            // Publish new values
            if (!self.__isTracking) {
                self.__publish(left, top, zoom, animate);
            }

        },


        /**
         * Scroll by the given offset
         *
         * @param left {Number ? 0} Scroll x-axis by given offset
         * @param top {Number ? 0} Scroll x-axis by given offset
         * @param animate {Boolean ? false} Whether to animate the given change
         */
        scrollBy: function(left, top, animate) {

            var self = this;

            var startLeft = self.__isAnimating ? self.__scheduledLeft : self.__scrollLeft;
            var startTop = self.__isAnimating ? self.__scheduledTop : self.__scrollTop;

            self.scrollTo(startLeft + (left || 0), startTop + (top || 0), animate);

        },



        /*
         ---------------------------------------------------------------------------
         EVENT CALLBACKS
         ---------------------------------------------------------------------------
         */

        /**
         * Mouse wheel handler for zooming support
         */
        doMouseZoom: function(wheelDelta, timeStamp, pageX, pageY) {

            var self = this;
            var change = wheelDelta > 0 ? 0.97 : 1.03;

            return self.zoomTo(self.__zoomLevel * change, false, pageX - self.__clientLeft, pageY - self.__clientTop);

        },


        /**
         * Touch start handler for scrolling support
         */
        doTouchStart: function(touches, timeStamp) {

            // Array-like check is enough here
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }

            if (timeStamp instanceof Date) {
                timeStamp = timeStamp.valueOf();
            }
            if (typeof timeStamp !== "number") {
                throw new Error("Invalid timestamp value: " + timeStamp);
            }

            var self = this;

            // Reset interruptedAnimation flag
            self.__interruptedAnimation = true;

            // Stop deceleration
            if (self.__isDecelerating) {
                core.effect.Animate.stop(self.__isDecelerating);
                self.__isDecelerating = false;
                self.__interruptedAnimation = true;
            }

            // Stop animation
            if (self.__isAnimating) {
                core.effect.Animate.stop(self.__isAnimating);
                self.__isAnimating = false;
                self.__interruptedAnimation = true;
            }

            // Use center point when dealing with two fingers
            var currentTouchLeft, currentTouchTop;
            var isSingleTouch = touches.length === 1;
            if (isSingleTouch) {
                currentTouchLeft = touches[0].pageX;
                currentTouchTop = touches[0].pageY;
            } else {
                currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            }

            // Store initial positions
            self.__initialTouchLeft = currentTouchLeft;
            self.__initialTouchTop = currentTouchTop;

            // Store current zoom level
            self.__zoomLevelStart = self.__zoomLevel;

            // Store initial touch positions
            self.__lastTouchLeft = currentTouchLeft;
            self.__lastTouchTop = currentTouchTop;

            // Store initial move time stamp
            self.__lastTouchMove = timeStamp;

            // Reset initial scale
            self.__lastScale = 1;

            // Reset locking flags
            self.__enableScrollX = !isSingleTouch && self.options.scrollingX;
            self.__enableScrollY = !isSingleTouch && self.options.scrollingY;

            // Reset tracking flag
            self.__isTracking = true;

            // Reset deceleration complete flag
            self.__didDecelerationComplete = false;

            // Dragging starts directly with two fingers, otherwise lazy with an offset
            self.__isDragging = !isSingleTouch;

            // Some features are disabled in multi touch scenarios
            self.__isSingleTouch = isSingleTouch;

            // Clearing data structure
            self.__positions = [];

        },


        /**
         * Touch move handler for scrolling support
         */
        doTouchMove: function(touches, timeStamp, scale) {

            // Array-like check is enough here
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }

            if (timeStamp instanceof Date) {
                timeStamp = timeStamp.valueOf();
            }
            if (typeof timeStamp !== "number") {
                throw new Error("Invalid timestamp value: " + timeStamp);
            }

            var self = this;

            // Ignore event when tracking is not enabled (event might be outside of element)
            if (!self.__isTracking) {
                return;
            }


            var currentTouchLeft, currentTouchTop;

            // Compute move based around of center of fingers
            if (touches.length === 2) {
                currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            } else {
                currentTouchLeft = touches[0].pageX;
                currentTouchTop = touches[0].pageY;
            }

            var positions = self.__positions;

            // Are we already is dragging mode?
            if (self.__isDragging) {

                // Compute move distance
                var moveX = currentTouchLeft - self.__lastTouchLeft;
                var moveY = currentTouchTop - self.__lastTouchTop;

                // Read previous scroll position and zooming
                var scrollLeft = self.__scrollLeft;
                var scrollTop = self.__scrollTop;
                var level = self.__zoomLevel;

                // Work with scaling
                if (scale != null && self.options.zooming) {

                    var oldLevel = level;

                    // Recompute level based on previous scale and new scale
                    level = level / self.__lastScale * scale;

                    // Limit level according to configuration
                    level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom);

                    // Only do further compution when change happened
                    if (oldLevel !== level) {

                        // Compute relative event position to container
                        var currentTouchLeftRel = currentTouchLeft - self.__clientLeft;
                        var currentTouchTopRel = currentTouchTop - self.__clientTop;

                        // Recompute left and top coordinates based on new zoom level
                        scrollLeft = ((currentTouchLeftRel + scrollLeft) * level / oldLevel) - currentTouchLeftRel;
                        scrollTop = ((currentTouchTopRel + scrollTop) * level / oldLevel) - currentTouchTopRel;

                        // Recompute max scroll values
                        self.__computeScrollMax(level);

                    }
                }

                if (self.__enableScrollX) {

                    scrollLeft -= moveX * this.options.speedMultiplier;
                    var maxScrollLeft = self.__maxScrollLeft;

                    if (scrollLeft > maxScrollLeft || scrollLeft < 0) {

                        // Slow down on the edges
                        if (self.options.bouncing) {

                            scrollLeft += (moveX / 2  * this.options.speedMultiplier);

                        } else if (scrollLeft > maxScrollLeft) {

                            scrollLeft = maxScrollLeft;

                        } else {

                            scrollLeft = 0;

                        }
                    }
                }

                // Compute new vertical scroll position
                if (self.__enableScrollY) {

                    scrollTop -= moveY * this.options.speedMultiplier;
                    var maxScrollTop = self.__maxScrollTop;

                    if (scrollTop > maxScrollTop || scrollTop < 0) {

                        // Slow down on the edges
                        if (self.options.bouncing) {

                            scrollTop += (moveY / 2 * this.options.speedMultiplier);

                            // Support pull-to-refresh (only when only y is scrollable)
                            if (!self.__enableScrollX && self.__refreshHeight != null) {

                                if (!self.__refreshActive && scrollTop <= -self.__refreshHeight) {

                                    self.__refreshActive = true;
                                    if (self.__refreshActivate) {
                                        self.__refreshActivate();
                                    }

                                } else if (self.__refreshActive && scrollTop > -self.__refreshHeight) {

                                    self.__refreshActive = false;
                                    if (self.__refreshDeactivate) {
                                        self.__refreshDeactivate();
                                    }

                                }
                            }

                        } else if (scrollTop > maxScrollTop) {

                            scrollTop = maxScrollTop;

                        } else {

                            scrollTop = 0;

                        }
                    }
                }

                // Keep list from growing infinitely (holding min 10, max 20 measure points)
                if (positions.length > 60) {
                    positions.splice(0, 30);
                }

                // Track scroll movement for decleration
                positions.push(scrollLeft, scrollTop, timeStamp);

                // Sync scroll position
                self.__publish(scrollLeft, scrollTop, level);

                // Otherwise figure out whether we are switching into dragging mode now.
            } else {

                var minimumTrackingForScroll = self.options.locking ? 3 : 0;
                var minimumTrackingForDrag = 5;

                var distanceX = Math.abs(currentTouchLeft - self.__initialTouchLeft);
                var distanceY = Math.abs(currentTouchTop - self.__initialTouchTop);

                self.__enableScrollX = self.options.scrollingX && distanceX >= minimumTrackingForScroll;
                self.__enableScrollY = self.options.scrollingY && distanceY >= minimumTrackingForScroll;

                positions.push(self.__scrollLeft, self.__scrollTop, timeStamp);

                self.__isDragging = (self.__enableScrollX || self.__enableScrollY) && (distanceX >= minimumTrackingForDrag || distanceY >= minimumTrackingForDrag);
                if (self.__isDragging) {
                    self.__interruptedAnimation = false;
                }

            }

            // Update last touch positions and time stamp for next event
            self.__lastTouchLeft = currentTouchLeft;
            self.__lastTouchTop = currentTouchTop;
            self.__lastTouchMove = timeStamp;
            self.__lastScale = scale;

        },


        /**
         * Touch end handler for scrolling support
         */
        doTouchEnd: function(timeStamp) {

            if (timeStamp instanceof Date) {
                timeStamp = timeStamp.valueOf();
            }
            if (typeof timeStamp !== "number") {
                throw new Error("Invalid timestamp value: " + timeStamp);
            }

            var self = this;

            // Ignore event when tracking is not enabled (no touchstart event on element)
            // This is required as this listener ('touchmove') sits on the document and not on the element itself.
            if (!self.__isTracking) {
                return;
            }

            // Not touching anymore (when two finger hit the screen there are two touch end events)
            self.__isTracking = false;

            // Be sure to reset the dragging flag now. Here we also detect whether
            // the finger has moved fast enough to switch into a deceleration animation.
            if (self.__isDragging) {

                // Reset dragging flag
                self.__isDragging = false;

                // Start deceleration
                // Verify that the last move detected was in some relevant time frame
                if (self.__isSingleTouch && self.options.animating && (timeStamp - self.__lastTouchMove) <= 100) {

                    // Then figure out what the scroll position was about 100ms ago
                    var positions = self.__positions;
                    var endPos = positions.length - 1;
                    var startPos = endPos;

                    // Move pointer to position measured 100ms ago
                    for (var i = endPos; i > 0 && positions[i] > (self.__lastTouchMove - 100); i -= 3) {
                        startPos = i;
                    }

                    // If start and stop position is identical in a 100ms timeframe,
                    // we cannot compute any useful deceleration.
                    if (startPos !== endPos) {

                        // Compute relative movement between these two points
                        var timeOffset = positions[endPos] - positions[startPos];
                        var movedLeft = self.__scrollLeft - positions[startPos - 2];
                        var movedTop = self.__scrollTop - positions[startPos - 1];

                        // Based on 50ms compute the movement to apply for each render step
                        self.__decelerationVelocityX = movedLeft / timeOffset * (1000 / 60);
                        self.__decelerationVelocityY = movedTop / timeOffset * (1000 / 60);

                        // How much velocity is required to start the deceleration
                        var minVelocityToStartDeceleration = self.options.paging || self.options.snapping ? 4 : 1;

                        // Verify that we have enough velocity to start deceleration
                        if (Math.abs(self.__decelerationVelocityX) > minVelocityToStartDeceleration || Math.abs(self.__decelerationVelocityY) > minVelocityToStartDeceleration) {

                            // Deactivate pull-to-refresh when decelerating
                            if (!self.__refreshActive) {
                                self.__startDeceleration(timeStamp);
                            }
                        } else {
                            self.options.scrollingComplete();
                        }
                    } else {
                        self.options.scrollingComplete();
                    }
                } else if ((timeStamp - self.__lastTouchMove) > 100) {
                    self.options.scrollingComplete();
                }
            }

            // If this was a slower move it is per default non decelerated, but this
            // still means that we want snap back to the bounds which is done here.
            // This is placed outside the condition above to improve edge case stability
            // e.g. touchend fired without enabled dragging. This should normally do not
            // have modified the scroll positions or even showed the scrollbars though.
            if (!self.__isDecelerating) {

                if (self.__refreshActive && self.__refreshStart) {

                    // Use publish instead of scrollTo to allow scrolling to out of boundary position
                    // We don't need to normalize scrollLeft, zoomLevel, etc. here because we only y-scrolling when pull-to-refresh is enabled
                    self.__publish(self.__scrollLeft, -self.__refreshHeight, self.__zoomLevel, true);

                    if (self.__refreshStart) {
                        self.__refreshStart();
                    }

                } else {

                    if (self.__interruptedAnimation || self.__isDragging) {
                        self.options.scrollingComplete();
                    }
                    self.scrollTo(self.__scrollLeft, self.__scrollTop, true, self.__zoomLevel);

                    // Directly signalize deactivation (nothing todo on refresh?)
                    if (self.__refreshActive) {

                        self.__refreshActive = false;
                        if (self.__refreshDeactivate) {
                            self.__refreshDeactivate();
                        }

                    }
                }
            }

            // Fully cleanup list
            self.__positions.length = 0;

        },



        /*
         ---------------------------------------------------------------------------
         PRIVATE API
         ---------------------------------------------------------------------------
         */

        /**
         * Applies the scroll position to the content element
         *
         * @param left {Number} Left scroll position
         * @param top {Number} Top scroll position
         * @param animate {Boolean?false} Whether animation should be used to move to the new coordinates
         */
        __publish: function(left, top, zoom, animate) {

            var self = this;

            // Remember whether we had an animation, then we try to continue based on the current "drive" of the animation
            var wasAnimating = self.__isAnimating;
            if (wasAnimating) {
                core.effect.Animate.stop(wasAnimating);
                self.__isAnimating = false;
            }

            if (animate && self.options.animating) {

                // Keep scheduled positions for scrollBy/zoomBy functionality
                self.__scheduledLeft = left;
                self.__scheduledTop = top;
                self.__scheduledZoom = zoom;

                var oldLeft = self.__scrollLeft;
                var oldTop = self.__scrollTop;
                var oldZoom = self.__zoomLevel;

                var diffLeft = left - oldLeft;
                var diffTop = top - oldTop;
                var diffZoom = zoom - oldZoom;

                var step = function(percent, now, render) {

                    if (render) {

                        self.__scrollLeft = oldLeft + (diffLeft * percent);
                        self.__scrollTop = oldTop + (diffTop * percent);
                        self.__zoomLevel = oldZoom + (diffZoom * percent);

                        // Push values out
                        if (self.__callback) {
                            self.__callback(self.__scrollLeft, self.__scrollTop, self.__zoomLevel);
                        }

                    }
                };

                var verify = function(id) {
                    return self.__isAnimating === id;
                };

                var completed = function(renderedFramesPerSecond, animationId, wasFinished) {
                    if (animationId === self.__isAnimating) {
                        self.__isAnimating = false;
                    }
                    if (self.__didDecelerationComplete || wasFinished) {
                        self.options.scrollingComplete();
                    }

                    if (self.options.zooming) {
                        self.__computeScrollMax();
                        if(self.__zoomComplete) {
                            self.__zoomComplete();
                            self.__zoomComplete = null;
                        }
                    }
                };

                // When continuing based on previous animation we choose an ease-out animation instead of ease-in-out
                self.__isAnimating = core.effect.Animate.start(step, verify, completed, self.options.animationDuration, wasAnimating ? easeOutCubic : easeInOutCubic);

            } else {

                self.__scheduledLeft = self.__scrollLeft = left;
                self.__scheduledTop = self.__scrollTop = top;
                self.__scheduledZoom = self.__zoomLevel = zoom;

                // Push values out
                if (self.__callback) {
                    self.__callback(left, top, zoom);
                }

                // Fix max scroll ranges
                if (self.options.zooming) {
                    self.__computeScrollMax();
                    if(self.__zoomComplete) {
                        self.__zoomComplete();
                        self.__zoomComplete = null;
                    }
                }
            }
        },


        /**
         * Recomputes scroll minimum values based on client dimensions and content dimensions.
         */
        __computeScrollMax: function(zoomLevel) {

            var self = this;

            if (zoomLevel == null) {
                zoomLevel = self.__zoomLevel;
            }

            self.__maxScrollLeft = Math.max((self.__contentWidth * zoomLevel) - self.__clientWidth, 0);
            self.__maxScrollTop = Math.max((self.__contentHeight * zoomLevel) - self.__clientHeight, 0);

        },



        /*
         ---------------------------------------------------------------------------
         ANIMATION (DECELERATION) SUPPORT
         ---------------------------------------------------------------------------
         */

        /**
         * Called when a touch sequence end and the speed of the finger was high enough
         * to switch into deceleration mode.
         */
        __startDeceleration: function(timeStamp) {

            var self = this;

            if (self.options.paging) {

                var scrollLeft = Math.max(Math.min(self.__scrollLeft, self.__maxScrollLeft), 0);
                var scrollTop = Math.max(Math.min(self.__scrollTop, self.__maxScrollTop), 0);
                var clientWidth = self.__clientWidth;
                var clientHeight = self.__clientHeight;

                // We limit deceleration not to the min/max values of the allowed range, but to the size of the visible client area.
                // Each page should have exactly the size of the client area.
                self.__minDecelerationScrollLeft = Math.floor(scrollLeft / clientWidth) * clientWidth;
                self.__minDecelerationScrollTop = Math.floor(scrollTop / clientHeight) * clientHeight;
                self.__maxDecelerationScrollLeft = Math.ceil(scrollLeft / clientWidth) * clientWidth;
                self.__maxDecelerationScrollTop = Math.ceil(scrollTop / clientHeight) * clientHeight;

            } else {

                self.__minDecelerationScrollLeft = 0;
                self.__minDecelerationScrollTop = 0;
                self.__maxDecelerationScrollLeft = self.__maxScrollLeft;
                self.__maxDecelerationScrollTop = self.__maxScrollTop;

            }

            // Wrap class method
            var step = function(percent, now, render) {
                self.__stepThroughDeceleration(render);
            };

            // How much velocity is required to keep the deceleration running
            var minVelocityToKeepDecelerating = self.options.snapping ? 4 : 0.001;

            // Detect whether it's still worth to continue animating steps
            // If we are already slow enough to not being user perceivable anymore, we stop the whole process here.
            var verify = function() {
                var shouldContinue = Math.abs(self.__decelerationVelocityX) >= minVelocityToKeepDecelerating || Math.abs(self.__decelerationVelocityY) >= minVelocityToKeepDecelerating;
                if (!shouldContinue) {
                    self.__didDecelerationComplete = true;
                }
                return shouldContinue;
            };

            var completed = function(renderedFramesPerSecond, animationId, wasFinished) {
                self.__isDecelerating = false;
                if (self.__didDecelerationComplete) {
                    self.options.scrollingComplete();
                }

                // Animate to grid when snapping is active, otherwise just fix out-of-boundary positions
                self.scrollTo(self.__scrollLeft, self.__scrollTop, self.options.snapping);
            };

            // Start animation and switch on flag
            self.__isDecelerating = core.effect.Animate.start(step, verify, completed);

        },


        /**
         * Called on every step of the animation
         *
         * @param inMemory {Boolean?false} Whether to not render the current step, but keep it in memory only. Used internally only!
         */
        __stepThroughDeceleration: function(render) {

            var self = this;


            //
            // COMPUTE NEXT SCROLL POSITION
            //

            // Add deceleration to scroll position
            var scrollLeft = self.__scrollLeft + self.__decelerationVelocityX;
            var scrollTop = self.__scrollTop + self.__decelerationVelocityY;


            //
            // HARD LIMIT SCROLL POSITION FOR NON BOUNCING MODE
            //

            if (!self.options.bouncing) {

                var scrollLeftFixed = Math.max(Math.min(self.__maxDecelerationScrollLeft, scrollLeft), self.__minDecelerationScrollLeft);
                if (scrollLeftFixed !== scrollLeft) {
                    scrollLeft = scrollLeftFixed;
                    self.__decelerationVelocityX = 0;
                }

                var scrollTopFixed = Math.max(Math.min(self.__maxDecelerationScrollTop, scrollTop), self.__minDecelerationScrollTop);
                if (scrollTopFixed !== scrollTop) {
                    scrollTop = scrollTopFixed;
                    self.__decelerationVelocityY = 0;
                }

            }


            //
            // UPDATE SCROLL POSITION
            //

            if (render) {

                self.__publish(scrollLeft, scrollTop, self.__zoomLevel);

            } else {

                self.__scrollLeft = scrollLeft;
                self.__scrollTop = scrollTop;

            }


            //
            // SLOW DOWN
            //

            // Slow down velocity on every iteration
            if (!self.options.paging) {

                // This is the factor applied to every iteration of the animation
                // to slow down the process. This should emulate natural behavior where
                // objects slow down when the initiator of the movement is removed
                var frictionFactor = 0.95;

                self.__decelerationVelocityX *= frictionFactor;
                self.__decelerationVelocityY *= frictionFactor;

            }


            //
            // BOUNCING SUPPORT
            //

            if (self.options.bouncing) {

                var scrollOutsideX = 0;
                var scrollOutsideY = 0;

                // This configures the amount of change applied to deceleration/acceleration when reaching boundaries
                var penetrationDeceleration = self.options.penetrationDeceleration;
                var penetrationAcceleration = self.options.penetrationAcceleration;

                // Check limits
                if (scrollLeft < self.__minDecelerationScrollLeft) {
                    scrollOutsideX = self.__minDecelerationScrollLeft - scrollLeft;
                } else if (scrollLeft > self.__maxDecelerationScrollLeft) {
                    scrollOutsideX = self.__maxDecelerationScrollLeft - scrollLeft;
                }

                if (scrollTop < self.__minDecelerationScrollTop) {
                    scrollOutsideY = self.__minDecelerationScrollTop - scrollTop;
                } else if (scrollTop > self.__maxDecelerationScrollTop) {
                    scrollOutsideY = self.__maxDecelerationScrollTop - scrollTop;
                }

                // Slow down until slow enough, then flip back to snap position
                if (scrollOutsideX !== 0) {
                    if (scrollOutsideX * self.__decelerationVelocityX <= 0) {
                        self.__decelerationVelocityX += scrollOutsideX * penetrationDeceleration;
                    } else {
                        self.__decelerationVelocityX = scrollOutsideX * penetrationAcceleration;
                    }
                }

                if (scrollOutsideY !== 0) {
                    if (scrollOutsideY * self.__decelerationVelocityY <= 0) {
                        self.__decelerationVelocityY += scrollOutsideY * penetrationDeceleration;
                    } else {
                        self.__decelerationVelocityY = scrollOutsideY * penetrationAcceleration;
                    }
                }
            }
        }
    };

    // Copy over members to prototype
    for (var key in members) {
        Scroller.prototype[key] = members[key];
    }

})();
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/** @namespace */
var dat = dat || {};

/** @namespace */
dat.gui = dat.gui || {};

/** @namespace */
dat.utils = dat.utils || {};

/** @namespace */
dat.controllers = dat.controllers || {};

/** @namespace */
dat.dom = dat.dom || {};

/** @namespace */
dat.color = dat.color || {};

dat.utils.css = (function () {
  return {
    load: function (url, doc) {
      doc = doc || document;
      var link = doc.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = url;
      doc.getElementsByTagName('head')[0].appendChild(link);
    },
    inject: function(css, doc) {
      doc = doc || document;
      var injected = document.createElement('style');
      injected.type = 'text/css';
      injected.innerHTML = css;
      doc.getElementsByTagName('head')[0].appendChild(injected);
    }
  }
})();


dat.utils.common = (function () {
  
  var ARR_EACH = Array.prototype.forEach;
  var ARR_SLICE = Array.prototype.slice;

  /**
   * Band-aid methods for things that should be a lot easier in JavaScript.
   * Implementation and structure inspired by underscore.js
   * http://documentcloud.github.com/underscore/
   */

  return { 
    
    BREAK: {},
  
    extend: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (!this.isUndefined(obj[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
      
    },
    
    defaults: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (this.isUndefined(target[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
    
    },
    
    compose: function() {
      var toCall = ARR_SLICE.call(arguments);
            return function() {
              var args = ARR_SLICE.call(arguments);
              for (var i = toCall.length -1; i >= 0; i--) {
                args = [toCall[i].apply(this, args)];
              }
              return args[0];
            }
    },
    
    each: function(obj, itr, scope) {

      if (!obj) return;

      if (ARR_EACH && obj.forEach && obj.forEach === ARR_EACH) { 
        
        obj.forEach(itr, scope);
        
      } else if (obj.length === obj.length + 0) { // Is number but not NaN
        
        for (var key = 0, l = obj.length; key < l; key++)
          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
            return;
            
      } else {

        for (var key in obj) 
          if (itr.call(scope, obj[key], key) === this.BREAK)
            return;
            
      }
            
    },
    
    defer: function(fnc) {
      setTimeout(fnc, 0);
    },
    
    toArray: function(obj) {
      if (obj.toArray) return obj.toArray();
      return ARR_SLICE.call(obj);
    },

    isUndefined: function(obj) {
      return obj === undefined;
    },
    
    isNull: function(obj) {
      return obj === null;
    },
    
    isNaN: function(obj) {
      return obj !== obj;
    },
    
    isArray: Array.isArray || function(obj) {
      return obj.constructor === Array;
    },
    
    isObject: function(obj) {
      return obj === Object(obj);
    },
    
    isNumber: function(obj) {
      return obj === obj+0;
    },
    
    isString: function(obj) {
      return obj === obj+'';
    },
    
    isBoolean: function(obj) {
      return obj === false || obj === true;
    },
    
    isFunction: function(obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    }
  
  };
    
})();


dat.controllers.Controller = (function (common) {

  /**
   * @class An "abstract" class that represents a given property of an object.
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var Controller = function(object, property) {

    this.initialValue = object[property];

    /**
     * Those who extend this class will put their DOM elements in here.
     * @type {DOMElement}
     */
    this.domElement = document.createElement('div');

    /**
     * The object to manipulate
     * @type {Object}
     */
    this.object = object;

    /**
     * The name of the property to manipulate
     * @type {String}
     */
    this.property = property;

    /**
     * The function to be called on change.
     * @type {Function}
     * @ignore
     */
    this.__onChange = undefined;

    /**
     * The function to be called on finishing change.
     * @type {Function}
     * @ignore
     */
    this.__onFinishChange = undefined;

  };

  common.extend(

      Controller.prototype,

      /** @lends dat.controllers.Controller.prototype */
      {

        /**
         * Specify that a function fire every time someone changes the value with
         * this Controller.
         *
         * @param {Function} fnc This function will be called whenever the value
         * is modified via this Controller.
         * @returns {dat.controllers.Controller} this
         */
        onChange: function(fnc) {
          this.__onChange = fnc;
          return this;
        },

        /**
         * Specify that a function fire every time someone "finishes" changing
         * the value wih this Controller. Useful for values that change
         * incrementally like numbers or strings.
         *
         * @param {Function} fnc This function will be called whenever
         * someone "finishes" changing the value via this Controller.
         * @returns {dat.controllers.Controller} this
         */
        onFinishChange: function(fnc) {
          this.__onFinishChange = fnc;
          return this;
        },

        /**
         * Change the value of <code>object[property]</code>
         *
         * @param {Object} newValue The new value of <code>object[property]</code>
         */
        setValue: function(newValue) {
          this.object[this.property] = newValue;
          if (this.__onChange) {
            this.__onChange.call(this, newValue);
          }
          this.updateDisplay();
          return this;
        },

        /**
         * Gets the value of <code>object[property]</code>
         *
         * @returns {Object} The current value of <code>object[property]</code>
         */
        getValue: function() {
          return this.object[this.property];
        },

        /**
         * Refreshes the visual display of a Controller in order to keep sync
         * with the object's current value.
         * @returns {dat.controllers.Controller} this
         */
        updateDisplay: function() {
          return this;
        },

        /**
         * @returns {Boolean} true if the value has deviated from initialValue
         */
        isModified: function() {
          return this.initialValue !== this.getValue()
        }

      }

  );

  return Controller;


})(dat.utils.common);


dat.dom.dom = (function (common) {

  var EVENT_MAP = {
    'HTMLEvents': ['change'],
    'MouseEvents': ['click','mousemove','mousedown','mouseup', 'mouseover'],
    'KeyboardEvents': ['keydown']
  };

  var EVENT_MAP_INV = {};
  common.each(EVENT_MAP, function(v, k) {
    common.each(v, function(e) {
      EVENT_MAP_INV[e] = k;
    });
  });

  var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;

  function cssValueToPixels(val) {

    if (val === '0' || common.isUndefined(val)) return 0;

    var match = val.match(CSS_VALUE_PIXELS);

    if (!common.isNull(match)) {
      return parseFloat(match[1]);
    }

    // TODO ...ems? %?

    return 0;

  }

  /**
   * @namespace
   * @member dat.dom
   */
  var dom = {

    /**
     * 
     * @param elem
     * @param selectable
     */
    makeSelectable: function(elem, selectable) {

      if (elem === undefined || elem.style === undefined) return;

      elem.onselectstart = selectable ? function() {
        return false;
      } : function() {
      };

      elem.style.MozUserSelect = selectable ? 'auto' : 'none';
      elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
      elem.unselectable = selectable ? 'on' : 'off';

    },

    /**
     *
     * @param elem
     * @param horizontal
     * @param vertical
     */
    makeFullscreen: function(elem, horizontal, vertical) {

      if (common.isUndefined(horizontal)) horizontal = true;
      if (common.isUndefined(vertical)) vertical = true;

      elem.style.position = 'absolute';

      if (horizontal) {
        elem.style.left = 0;
        elem.style.right = 0;
      }
      if (vertical) {
        elem.style.top = 0;
        elem.style.bottom = 0;
      }

    },

    /**
     *
     * @param elem
     * @param eventType
     * @param params
     */
    fakeEvent: function(elem, eventType, params, aux) {
      params = params || {};
      var className = EVENT_MAP_INV[eventType];
      if (!className) {
        throw new Error('Event type ' + eventType + ' not supported.');
      }
      var evt = document.createEvent(className);
      switch (className) {
        case 'MouseEvents':
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false,
              params.cancelable || true, window, params.clickCount || 1,
              0, //screen X
              0, //screen Y
              clientX, //client X
              clientY, //client Y
              false, false, false, false, 0, null);
          break;
        case 'KeyboardEvents':
          var init = evt.initKeyboardEvent || evt.initKeyEvent; // webkit || moz
          common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          init(eventType, params.bubbles || false,
              params.cancelable, window,
              params.ctrlKey, params.altKey,
              params.shiftKey, params.metaKey,
              params.keyCode, params.charCode);
          break;
        default:
          evt.initEvent(eventType, params.bubbles || false,
              params.cancelable || true);
          break;
      }
      common.defaults(evt, aux);
      elem.dispatchEvent(evt);
    },

    /**
     *
     * @param elem
     * @param event
     * @param func
     * @param bool
     */
    bind: function(elem, event, func, bool) {
      bool = bool || false;
      if (elem.addEventListener)
        elem.addEventListener(event, func, bool);
      else if (elem.attachEvent)
        elem.attachEvent('on' + event, func);
      return dom;
    },

    /**
     *
     * @param elem
     * @param event
     * @param func
     * @param bool
     */
    unbind: function(elem, event, func, bool) {
      bool = bool || false;
      if (elem.removeEventListener)
        elem.removeEventListener(event, func, bool);
      else if (elem.detachEvent)
        elem.detachEvent('on' + event, func);
      return dom;
    },

    /**
     *
     * @param elem
     * @param className
     */
    addClass: function(elem, className) {
      if (elem.className === undefined) {
        elem.className = className;
      } else if (elem.className !== className) {
        var classes = elem.className.split(/ +/);
        if (classes.indexOf(className) == -1) {
          classes.push(className);
          elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
        }
      }
      return dom;
    },

    /**
     *
     * @param elem
     * @param className
     */
    removeClass: function(elem, className) {
      if (className) {
        if (elem.className === undefined) {
          // elem.className = className;
        } else if (elem.className === className) {
          elem.removeAttribute('class');
        } else {
          var classes = elem.className.split(/ +/);
          var index = classes.indexOf(className);
          if (index != -1) {
            classes.splice(index, 1);
            elem.className = classes.join(' ');
          }
        }
      } else {
        elem.className = undefined;
      }
      return dom;
    },

    hasClass: function(elem, className) {
      return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
    },

    /**
     *
     * @param elem
     */
    getWidth: function(elem) {

      var style = getComputedStyle(elem);

      return cssValueToPixels(style['border-left-width']) +
          cssValueToPixels(style['border-right-width']) +
          cssValueToPixels(style['padding-left']) +
          cssValueToPixels(style['padding-right']) +
          cssValueToPixels(style['width']);
    },

    /**
     *
     * @param elem
     */
    getHeight: function(elem) {

      var style = getComputedStyle(elem);

      return cssValueToPixels(style['border-top-width']) +
          cssValueToPixels(style['border-bottom-width']) +
          cssValueToPixels(style['padding-top']) +
          cssValueToPixels(style['padding-bottom']) +
          cssValueToPixels(style['height']);
    },

    /**
     *
     * @param elem
     */
    getOffset: function(elem) {
      var offset = {left: 0, top:0};
      if (elem.offsetParent) {
        do {
          offset.left += elem.offsetLeft;
          offset.top += elem.offsetTop;
        } while (elem = elem.offsetParent);
      }
      return offset;
    },

    // http://stackoverflow.com/posts/2684561/revisions
    /**
     * 
     * @param elem
     */
    isActive: function(elem) {
      return elem === document.activeElement && ( elem.type || elem.href );
    }

  };

  return dom;

})(dat.utils.common);


dat.controllers.OptionController = (function (Controller, dom, common) {

  /**
   * @class Provides a select input to alter the property of an object, using a
   * list of accepted values.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object|string[]} options A map of labels to acceptable values, or
   * a list of acceptable string values.
   *
   * @member dat.controllers
   */
  var OptionController = function(object, property, options) {

    OptionController.superclass.call(this, object, property);

    var _this = this;

    /**
     * The drop down menu
     * @ignore
     */
    this.__select = document.createElement('select');

    if (common.isArray(options)) {
      var map = {};
      common.each(options, function(element) {
        map[element] = element;
      });
      options = map;
    }

    common.each(options, function(value, key) {

      var opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);
      _this.__select.appendChild(opt);

    });

    // Acknowledge original value
    this.updateDisplay();

    dom.bind(this.__select, 'change', function() {
      var desiredValue = this.options[this.selectedIndex].value;
      _this.setValue(desiredValue);
    });

    this.domElement.appendChild(this.__select);

  };

  OptionController.superclass = Controller;

  common.extend(

      OptionController.prototype,
      Controller.prototype,

      {

        setValue: function(v) {
          var toReturn = OptionController.superclass.prototype.setValue.call(this, v);
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          return toReturn;
        },

        updateDisplay: function() {
          this.__select.value = this.getValue();
          return OptionController.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  return OptionController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.controllers.NumberController = (function (Controller, common) {

  /**
   * @class Represents a given property of an object that is a number.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object} [params] Optional parameters
   * @param {Number} [params.min] Minimum allowed value
   * @param {Number} [params.max] Maximum allowed value
   * @param {Number} [params.step] Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberController = function(object, property, params) {

    NumberController.superclass.call(this, object, property);

    params = params || {};

    this.__min = params.min;
    this.__max = params.max;
    this.__step = params.step;

    if (common.isUndefined(this.__step)) {

      if (this.initialValue == 0) {
        this.__impliedStep = 1; // What are we, psychics?
      } else {
        // Hey Doug, check this out.
        this.__impliedStep = Math.pow(10, Math.floor(Math.log(this.initialValue)/Math.LN10))/10;
      }

    } else {

    	this.__impliedStep = this.__step;

    }

    this.__precision = numDecimals(this.__impliedStep);


  };

  NumberController.superclass = Controller;

  common.extend(

      NumberController.prototype,
      Controller.prototype,

      /** @lends dat.controllers.NumberController.prototype */
      {

        setValue: function(v) {

          if (this.__min !== undefined && v < this.__min) {
            v = this.__min;
          } else if (this.__max !== undefined && v > this.__max) {
            v = this.__max;
          }

          if (this.__step !== undefined && v % this.__step != 0) {
            v = Math.round(v / this.__step) * this.__step;
          }

          return NumberController.superclass.prototype.setValue.call(this, v);

        },

        /**
         * Specify a minimum value for <code>object[property]</code>.
         *
         * @param {Number} minValue The minimum value for
         * <code>object[property]</code>
         * @returns {dat.controllers.NumberController} this
         */
        min: function(v) {
          this.__min = v;
          return this;
        },

        /**
         * Specify a maximum value for <code>object[property]</code>.
         *
         * @param {Number} maxValue The maximum value for
         * <code>object[property]</code>
         * @returns {dat.controllers.NumberController} this
         */
        max: function(v) {
          this.__max = v;
          return this;
        },

        /**
         * Specify a step value that dat.controllers.NumberController
         * increments by.
         *
         * @param {Number} stepValue The step value for
         * dat.controllers.NumberController
         * @default if minimum and maximum specified increment is 1% of the
         * difference otherwise stepValue is 1
         * @returns {dat.controllers.NumberController} this
         */
        step: function(v) {
          this.__step = v;
          this.__impliedStep = v;
          this.__precision = numDecimals(v);
          return this;
        }

      }

  );

  function numDecimals(x) {
    x = x.toString();
    if (x.indexOf('.') > -1) {
      return x.length - x.indexOf('.') - 1;
    } else {
      return 0;
    }
  }

  return NumberController;

})(dat.controllers.Controller,
dat.utils.common);


dat.controllers.NumberControllerBox = (function (NumberController, dom, common) {

  /**
   * @class Represents a given property of an object that is a number and
   * provides an input element with which to manipulate it.
   *
   * @extends dat.controllers.Controller
   * @extends dat.controllers.NumberController
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object} [params] Optional parameters
   * @param {Number} [params.min] Minimum allowed value
   * @param {Number} [params.max] Maximum allowed value
   * @param {Number} [params.step] Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberControllerBox = function(object, property, params) {

    this.__truncationSuspended = false;

    NumberControllerBox.superclass.call(this, object, property, params);

    var _this = this;

    /**
     * {Number} Previous mouse y position
     * @ignore
     */
    var prev_y;

    this.__input = document.createElement('input');
    this.__input.setAttribute('type', 'text');

    // Makes it so manually specified values are not truncated.

    dom.bind(this.__input, 'change', onChange);
    dom.bind(this.__input, 'blur', onBlur);
    dom.bind(this.__input, 'mousedown', onMouseDown);
    dom.bind(this.__input, 'keydown', function(e) {

      // When pressing entire, you can be as precise as you want.
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
      }

    });

    function onChange() {
      var attempted = parseFloat(_this.__input.value);
      if (!common.isNaN(attempted)) _this.setValue(attempted);
    }

    function onBlur() {
      onChange();
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    function onMouseDown(e) {
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      prev_y = e.clientY;
    }

    function onMouseDrag(e) {

      var diff = prev_y - e.clientY;
      _this.setValue(_this.getValue() + diff * _this.__impliedStep);

      prev_y = e.clientY;

    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
    }

    this.updateDisplay();

    this.domElement.appendChild(this.__input);

  };

  NumberControllerBox.superclass = NumberController;

  common.extend(

      NumberControllerBox.prototype,
      NumberController.prototype,

      {

        updateDisplay: function() {

          this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
          return NumberControllerBox.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  function roundToDecimal(value, decimals) {
    var tenTo = Math.pow(10, decimals);
    return Math.round(value * tenTo) / tenTo;
  }

  return NumberControllerBox;

})(dat.controllers.NumberController,
dat.dom.dom,
dat.utils.common);

var rawCssText = "/**\n * dat-gui JavaScript Controller Library\n * http://code.google.com/p/dat-gui\n *\n * Copyright 2011 Data Arts Team, Google Creative Lab\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n * http://www.apache.org/licenses/LICENSE-2.0\n */\n\n.slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}",
    cssConverterElement = document.createElement('div');

cssConverterElement.appendChild(document.createTextNode(rawCssText));

dat.controllers.NumberControllerSlider = (function (NumberController, dom, css, common, styleSheet) {

  /**
   * @class Represents a given property of an object that is a number, contains
   * a minimum and maximum, and provides a slider element with which to
   * manipulate it. It should be noted that the slider element is made up of
   * <code>&lt;div&gt;</code> tags, <strong>not</strong> the html5
   * <code>&lt;slider&gt;</code> element.
   *
   * @extends dat.controllers.Controller
   * @extends dat.controllers.NumberController
   * 
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Number} minValue Minimum allowed value
   * @param {Number} maxValue Maximum allowed value
   * @param {Number} stepValue Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberControllerSlider = function(object, property, min, max, step) {

    NumberControllerSlider.superclass.call(this, object, property, { min: min, max: max, step: step });

    var _this = this;

    this.__background = document.createElement('div');
    this.__foreground = document.createElement('div');
    


    dom.bind(this.__background, 'mousedown', onMouseDown);
    
    dom.addClass(this.__background, 'slider');
    dom.addClass(this.__foreground, 'slider-fg');

    function onMouseDown(e) {

      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);

      onMouseDrag(e);
    }

    function onMouseDrag(e) {

      e.preventDefault();

      var offset = dom.getOffset(_this.__background);
      var width = dom.getWidth(_this.__background);
      
      _this.setValue(
      	map(e.clientX, offset.left, offset.left + width, _this.__min, _this.__max)
      );

      return false;

    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    this.updateDisplay();

    this.__background.appendChild(this.__foreground);
    this.domElement.appendChild(this.__background);

  };

  NumberControllerSlider.superclass = NumberController;

  /**
   * Injects default stylesheet for slider elements.
   */
  NumberControllerSlider.useDefaultStyles = function() {
    css.inject(styleSheet);
  };

  common.extend(

      NumberControllerSlider.prototype,
      NumberController.prototype,

      {

        updateDisplay: function() {
          var pct = (this.getValue() - this.__min)/(this.__max - this.__min);
          this.__foreground.style.width = pct*100+'%';
          return NumberControllerSlider.superclass.prototype.updateDisplay.call(this);
        }

      }



  );

	function map(v, i1, i2, o1, o2) {
		return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
	}

  return NumberControllerSlider;
  
})(dat.controllers.NumberController,
dat.dom.dom,
dat.utils.css,
dat.utils.common,
cssConverterElement.innerHTML);


dat.controllers.FunctionController = (function (Controller, dom, common) {

  /**
   * @class Provides a GUI interface to fire a specified method, a property of an object.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var FunctionController = function(object, property, text) {

    FunctionController.superclass.call(this, object, property);

    var _this = this;

    this.__button = document.createElement('div');
    this.__button.innerHTML = text === undefined ? 'Fire' : text;
    dom.bind(this.__button, 'click', function(e) {
      e.preventDefault();
      _this.fire();
      return false;
    });

    dom.addClass(this.__button, 'button');

    this.domElement.appendChild(this.__button);


  };

  FunctionController.superclass = Controller;

  common.extend(

      FunctionController.prototype,
      Controller.prototype,
      {
        
        fire: function() {
          if (this.__onChange) {
            this.__onChange.call(this);
          }
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          this.getValue().call(this.object);
        }
      }

  );

  return FunctionController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.controllers.BooleanController = (function (Controller, dom, common) {

  /**
   * @class Provides a checkbox input to alter the boolean property of an object.
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var BooleanController = function(object, property) {

    BooleanController.superclass.call(this, object, property);

    var _this = this;
    this.__prev = this.getValue();

    this.__checkbox = document.createElement('input');
    this.__checkbox.setAttribute('type', 'checkbox');


    dom.bind(this.__checkbox, 'change', onChange, false);

    this.domElement.appendChild(this.__checkbox);

    // Match original value
    this.updateDisplay();

    function onChange() {
      _this.setValue(!_this.__prev);
    }

  };

  BooleanController.superclass = Controller;

  common.extend(

      BooleanController.prototype,
      Controller.prototype,

      {

        setValue: function(v) {
          var toReturn = BooleanController.superclass.prototype.setValue.call(this, v);
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          this.__prev = this.getValue();
          return toReturn;
        },

        updateDisplay: function() {
          
          if (this.getValue() === true) {
            this.__checkbox.setAttribute('checked', 'checked');
            this.__checkbox.checked = true;    
          } else {
              this.__checkbox.checked = false;
          }

          return BooleanController.superclass.prototype.updateDisplay.call(this);

        }


      }

  );

  return BooleanController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.color.toString = (function (common) {

  return function(color) {

    if (color.a == 1 || common.isUndefined(color.a)) {

      var s = color.hex.toString(16);
      while (s.length < 6) {
        s = '0' + s;
      }

      return '#' + s;

    } else {

      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';

    }

  }

})(dat.utils.common);


dat.color.interpret = (function (toString, common) {

  var result, toReturn;

  var interpret = function() {

    toReturn = false;

    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];

    common.each(INTERPRETATIONS, function(family) {

      if (family.litmus(original)) {

        common.each(family.conversions, function(conversion, conversionName) {

          result = conversion.read(original);

          if (toReturn === false && result !== false) {
            toReturn = result;
            result.conversionName = conversionName;
            result.conversion = conversion;
            return common.BREAK;

          }

        });

        return common.BREAK;

      }

    });

    return toReturn;

  };

  var INTERPRETATIONS = [

    // Strings
    {

      litmus: common.isString,

      conversions: {

        THREE_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt(
                  '0x' +
                      test[1].toString() + test[1].toString() +
                      test[2].toString() + test[2].toString() +
                      test[3].toString() + test[3].toString())
            };

          },

          write: toString

        },

        SIX_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9]{6})$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt('0x' + test[1].toString())
            };

          },

          write: toString

        },

        CSS_RGB: {

          read: function(original) {

            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3])
            };

          },

          write: toString

        },

        CSS_RGBA: {

          read: function(original) {

            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3]),
              a: parseFloat(test[4])
            };

          },

          write: toString

        }

      }

    },

    // Numbers
    {

      litmus: common.isNumber,

      conversions: {

        HEX: {
          read: function(original) {
            return {
              space: 'HEX',
              hex: original,
              conversionName: 'HEX'
            }
          },

          write: function(color) {
            return color.hex;
          }
        }

      }

    },

    // Arrays
    {

      litmus: common.isArray,

      conversions: {

        RGB_ARRAY: {
          read: function(original) {
            if (original.length != 3) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b];
          }

        },

        RGBA_ARRAY: {
          read: function(original) {
            if (original.length != 4) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2],
              a: original[3]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b, color.a];
          }

        }

      }

    },

    // Objects
    {

      litmus: common.isObject,

      conversions: {

        RGBA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b) &&
                common.isNumber(original.a)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b,
              a: color.a
            }
          }
        },

        RGB_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b
            }
          }
        },

        HSVA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v) &&
                common.isNumber(original.a)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v,
              a: color.a
            }
          }
        },

        HSV_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v
            }
          }

        }

      }

    }


  ];

  return interpret;


})(dat.color.toString,
dat.utils.common);

rawCssText = ".dg {\n  /** Clear list styles */\n  /* Auto-place container */\n  /* Auto-placed GUI's */\n  /* Line items that don't contain folders. */\n  /** Folder names */\n  /** Hides closed items */\n  /** Controller row */\n  /** Name-half (left) */\n  /** Controller-half (right) */\n  /** Controller placement */\n  /** Shorter number boxes when slider is present. */\n  /** Ensure the entire boolean and function row shows a hand */ }\n  .dg ul {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    clear: both; }\n  .dg.ac {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 0;\n    z-index: 10; }\n  .dg:not(.ac) .main {\n    /** Exclude mains in ac so that we don't hide close button */\n    overflow: hidden; }\n  .dg.main {\n    -webkit-transition: opacity 0.1s linear;\n    -o-transition: opacity 0.1s linear;\n    -moz-transition: opacity 0.1s linear;\n    transition: opacity 0.1s linear; }\n    .dg.main.taller-than-window {\n      overflow-y: auto; }\n      .dg.main.taller-than-window .close-button {\n        opacity: 1;\n        /* TODO, these are style notes */\n        margin-top: -1px;\n        border-top: 1px solid #2c2c2c; }\n    .dg.main ul.closed .close-button {\n      opacity: 1 !important; }\n    .dg.main:hover .close-button,\n    .dg.main .close-button.drag {\n      opacity: 1; }\n    .dg.main .close-button {\n      /*opacity: 0;*/\n      -webkit-transition: opacity 0.1s linear;\n      -o-transition: opacity 0.1s linear;\n      -moz-transition: opacity 0.1s linear;\n      transition: opacity 0.1s linear;\n      border: 0;\n      position: absolute;\n      line-height: 19px;\n      height: 20px;\n      /* TODO, these are style notes */\n      cursor: pointer;\n      text-align: center;\n      background-color: #000; }\n      .dg.main .close-button:hover {\n        background-color: #111; }\n  .dg.a {\n    float: right;\n    margin-right: 15px;\n    overflow-x: hidden; }\n    .dg.a.has-save > ul {\n      margin-top: 27px; }\n      .dg.a.has-save > ul.closed {\n        margin-top: 0; }\n    .dg.a .save-row {\n      position: fixed;\n      top: 0;\n      z-index: 1002; }\n  .dg li {\n    -webkit-transition: height 0.1s ease-out;\n    -o-transition: height 0.1s ease-out;\n    -moz-transition: height 0.1s ease-out;\n    transition: height 0.1s ease-out; }\n  .dg li:not(.folder) {\n    cursor: auto;\n    height: 27px;\n    line-height: 27px;\n    overflow: hidden;\n    padding: 0 4px 0 5px; }\n  .dg li.folder {\n    padding: 0;\n    border-left: 4px solid rgba(0, 0, 0, 0); }\n  .dg li.title {\n    cursor: pointer;\n    margin-left: -4px; }\n  .dg .closed li:not(.title),\n  .dg .closed ul li,\n  .dg .closed ul li > * {\n    height: 0;\n    overflow: hidden;\n    border: 0; }\n  .dg .cr {\n    clear: both;\n    padding-left: 3px;\n    height: 27px; }\n  .dg .property-name {\n    cursor: default;\n    float: left;\n    clear: left;\n    width: 40%;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .dg .c {\n    float: left;\n    width: 60%; }\n  .dg .c input[type=text] {\n    border: 0;\n    margin-top: 4px;\n    padding: 3px;\n    width: 100%;\n    float: right; }\n  .dg .has-slider input[type=text] {\n    width: 30%;\n    /*display: none;*/\n    margin-left: 0; }\n  .dg .slider {\n    float: left;\n    width: 66%;\n    margin-left: -5px;\n    margin-right: 0;\n    height: 19px;\n    margin-top: 4px; }\n  .dg .slider-fg {\n    height: 100%; }\n  .dg .c input[type=checkbox] {\n    margin-top: 9px; }\n  .dg .c select {\n    margin-top: 5px; }\n  .dg .cr.function,\n  .dg .cr.function .property-name,\n  .dg .cr.function *,\n  .dg .cr.boolean,\n  .dg .cr.boolean * {\n    cursor: pointer; }\n  .dg .selector {\n    display: none;\n    position: absolute;\n    margin-left: -9px;\n    margin-top: 23px;\n    z-index: 10; }\n  .dg .c:hover .selector,\n  .dg .selector.drag {\n    display: block; }\n  .dg li.save-row {\n    padding: 0; }\n    .dg li.save-row .button {\n      display: inline-block;\n      padding: 0px 6px; }\n  .dg.dialogue {\n    background-color: #222;\n    width: 460px;\n    padding: 15px;\n    font-size: 13px;\n    line-height: 15px; }\n\n/* TODO Separate style and structure */\n#dg-new-constructor {\n  padding: 10px;\n  color: #222;\n  font-family: Monaco, monospace;\n  font-size: 10px;\n  border: 0;\n  resize: none;\n  box-shadow: inset 1px 1px 1px #888;\n  word-wrap: break-word;\n  margin: 12px 0;\n  display: block;\n  width: 440px;\n  overflow-y: scroll;\n  height: 100px;\n  position: relative; }\n\n#dg-local-explain {\n  display: none;\n  font-size: 11px;\n  line-height: 17px;\n  border-radius: 3px;\n  background-color: #333;\n  padding: 8px;\n  margin-top: 10px; }\n  #dg-local-explain code {\n    font-size: 10px; }\n\n#dat-gui-save-locally {\n  display: none; }\n\n/** Main type */\n.dg {\n  color: #eee;\n  font: 11px 'Lucida Grande', sans-serif;\n  text-shadow: 0 -1px 0 #111;\n  /** Auto place */\n  /* Controller row, <li> */\n  /** Controllers */ }\n  .dg.main {\n    /** Scrollbar */ }\n    .dg.main::-webkit-scrollbar {\n      width: 5px;\n      background: #1a1a1a; }\n    .dg.main::-webkit-scrollbar-corner {\n      height: 0;\n      display: none; }\n    .dg.main::-webkit-scrollbar-thumb {\n      border-radius: 5px;\n      background: #676767; }\n  .dg li:not(.folder) {\n    background: #1a1a1a;\n    border-bottom: 1px solid #2c2c2c; }\n  .dg li.save-row {\n    line-height: 25px;\n    background: #dad5cb;\n    border: 0; }\n    .dg li.save-row select {\n      margin-left: 5px;\n      width: 108px; }\n    .dg li.save-row .button {\n      margin-left: 5px;\n      margin-top: 1px;\n      border-radius: 2px;\n      font-size: 9px;\n      line-height: 7px;\n      padding: 4px 4px 5px 4px;\n      background: #c5bdad;\n      color: #fff;\n      text-shadow: 0 1px 0 #b0a58f;\n      box-shadow: 0 -1px 0 #b0a58f;\n      cursor: pointer; }\n      .dg li.save-row .button.gears {\n        background: #c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;\n        height: 7px;\n        width: 8px; }\n      .dg li.save-row .button:hover {\n        background-color: #bab19e;\n        box-shadow: 0 -1px 0 #b0a58f; }\n  .dg li.folder {\n    border-bottom: 0; }\n  .dg li.title {\n    padding-left: 16px;\n    background: black url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;\n    cursor: pointer;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.2); }\n  .dg .closed li.title {\n    background-image: url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==); }\n  .dg .cr.boolean {\n    border-left: 3px solid #806787; }\n  .dg .cr.function {\n    border-left: 3px solid #e61d5f; }\n  .dg .cr.number {\n    border-left: 3px solid #2fa1d6; }\n    .dg .cr.number input[type=text] {\n      color: #2fa1d6; }\n  .dg .cr.string {\n    border-left: 3px solid #1ed36f; }\n    .dg .cr.string input[type=text] {\n      color: #1ed36f; }\n  .dg .cr.function:hover, .dg .cr.boolean:hover {\n    background: #111; }\n  .dg .c input[type=text] {\n    background: #303030;\n    outline: none; }\n    .dg .c input[type=text]:hover {\n      background: #3c3c3c; }\n    .dg .c input[type=text]:focus {\n      background: #494949;\n      color: #fff; }\n  .dg .c .slider {\n    background: #303030;\n    cursor: ew-resize; }\n  .dg .c .slider-fg {\n    background: #2fa1d6; }\n  .dg .c .slider:hover {\n    background: #3c3c3c; }\n    .dg .c .slider:hover .slider-fg {\n      background: #44abda; }\n";
cssConverterElement = document.createElement('div');

cssConverterElement.appendChild(document.createTextNode(rawCssText));

dat.GUI = dat.gui.GUI = (function (css, saveDialogueContents, styleSheet, controllerFactory, Controller, BooleanController, FunctionController, NumberControllerBox, NumberControllerSlider, OptionController, ColorController, requestAnimationFrame, CenteredDiv, dom, common) {

  css.inject(styleSheet);

  /** Outer-most className for GUI's */
  var CSS_NAMESPACE = 'dg';

  var HIDE_KEY_CODE = 72;

  /** The only value shared between the JS and SCSS. Use caution. */
  var CLOSE_BUTTON_HEIGHT = 20;

  var DEFAULT_DEFAULT_PRESET_NAME = 'Default';

  var SUPPORTS_LOCAL_STORAGE = (function() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  })();

  var SAVE_DIALOGUE;

  /** Have we yet to create an autoPlace GUI? */
  var auto_place_virgin = true;

  /** Fixed position div that auto place GUI's go inside */
  var auto_place_container;

  /** Are we hiding the GUI's ? */
  var hide = false;

  /** GUI's which should be hidden */
  var hideable_guis = [];

  /**
   * A lightweight controller library for JavaScript. It allows you to easily
   * manipulate variables and fire functions on the fly.
   * @class
   *
   * @member dat.gui
   *
   * @param {Object} [params]
   * @param {String} [params.name] The name of this GUI.
   * @param {Object} [params.load] JSON object representing the saved state of
   * this GUI.
   * @param {Boolean} [params.auto=true]
   * @param {dat.gui.GUI} [params.parent] The GUI I'm nested in.
   * @param {Boolean} [params.closed] If true, starts closed
   */
  var GUI = function(params) {

    var _this = this;

    /**
     * Outermost DOM Element
     * @type DOMElement
     */
    this.domElement = document.createElement('div');
    this.domElement.id = "dat.gui";
    this.__ul = document.createElement('ul');
    this.domElement.appendChild(this.__ul);

    dom.addClass(this.domElement, CSS_NAMESPACE);

    /**
     * Nested GUI's by name
     * @ignore
     */
    this.__folders = {};

    this.__controllers = [];

    /**
     * List of objects I'm remembering for save, only used in top level GUI
     * @ignore
     */
    this.__rememberedObjects = [];

    /**
     * Maps the index of remembered objects to a map of controllers, only used
     * in top level GUI.
     *
     * @private
     * @ignore
     *
     * @example
     * [
     *  {
     *    propertyName: Controller,
     *    anotherPropertyName: Controller
     *  },
     *  {
     *    propertyName: Controller
     *  }
     * ]
     */
    this.__rememberedObjectIndecesToControllers = [];

    this.__listening = [];

    params = params || {};

    // Default parameters
    params = common.defaults(params, {
      autoPlace: true,
      width: GUI.DEFAULT_WIDTH
    });

    params = common.defaults(params, {
      resizable: params.autoPlace,
      hideable: params.autoPlace
    });


    if (!common.isUndefined(params.load)) {

      // Explicit preset
      if (params.preset) params.load.preset = params.preset;

    } else {

      params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };

    }

    if (common.isUndefined(params.parent) && params.hideable) {
      hideable_guis.push(this);
    }

    // Only root level GUI's are resizable.
    params.resizable = common.isUndefined(params.parent) && params.resizable;


    if (params.autoPlace && common.isUndefined(params.scrollable)) {
      params.scrollable = true;
    }
//    params.scrollable = common.isUndefined(params.parent) && params.scrollable === true;

    // Not part of params because I don't want people passing this in via
    // constructor. Should be a 'remembered' value.
    var use_local_storage =
        SUPPORTS_LOCAL_STORAGE &&
            localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';

    var saveToLocalStorage;

    Object.defineProperties(this,

        /** @lends dat.gui.GUI.prototype */
        {

          /**
           * The parent <code>GUI</code>
           * @type dat.gui.GUI
           */
          parent: {
            get: function() {
              return params.parent;
            }
          },

          scrollable: {
            get: function() {
              return params.scrollable;
            }
          },

          /**
           * Handles <code>GUI</code>'s element placement for you
           * @type Boolean
           */
          autoPlace: {
            get: function() {
              return params.autoPlace;
            }
          },

          /**
           * The identifier for a set of saved values
           * @type String
           */
          preset: {

            get: function() {
              if (_this.parent) {
                return _this.getRoot().preset;
              } else {
                return params.load.preset;
              }
            },

            set: function(v) {
              if (_this.parent) {
                _this.getRoot().preset = v;
              } else {
                params.load.preset = v;
              }
              setPresetSelectIndex(this);
              _this.revert();
            }

          },

          /**
           * The width of <code>GUI</code> element
           * @type Number
           */
          width: {
            get: function() {
              return params.width;
            },
            set: function(v) {
              params.width = v;
              setWidth(_this, v);
            }
          },

          /**
           * The name of <code>GUI</code>. Used for folders. i.e
           * a folder's name
           * @type String
           */
          name: {
            get: function() {
              return params.name;
            },
            set: function(v) {
              // TODO Check for collisions among sibling folders
              params.name = v;
              if (title_row_name) {
                title_row_name.innerHTML = params.name;
              }
            }
          },

          /**
           * Whether the <code>GUI</code> is collapsed or not
           * @type Boolean
           */
          closed: {
            get: function() {
              return params.closed;
            },
            set: function(v) {
              params.closed = v;
              if (params.closed) {
                dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
              } else {
                dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
              }
              // For browsers that aren't going to respect the CSS transition,
              // Lets just check our height against the window height right off
              // the bat.
              this.onResize();

              if (_this.__closeButton) {
                _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
              }
            }
          },

          /**
           * Contains all presets
           * @type Object
           */
          load: {
            get: function() {
              return params.load;
            }
          },

          /**
           * Determines whether or not to use <a href="https://developer.mozilla.org/en/DOM/Storage#localStorage">localStorage</a> as the means for
           * <code>remember</code>ing
           * @type Boolean
           */
          useLocalStorage: {

            get: function() {
              return use_local_storage;
            },
            set: function(bool) {
              if (SUPPORTS_LOCAL_STORAGE) {
                use_local_storage = bool;
                if (bool) {
                  dom.bind(window, 'unload', saveToLocalStorage);
                } else {
                  dom.unbind(window, 'unload', saveToLocalStorage);
                }
                localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
              }
            }

          }

        });

    // Are we a root level GUI?
    if (common.isUndefined(params.parent)) {

      params.closed = false;

      dom.addClass(this.domElement, GUI.CLASS_MAIN);
      dom.makeSelectable(this.domElement, false);

      // Are we supposed to be loading locally?
      if (SUPPORTS_LOCAL_STORAGE) {

        if (use_local_storage) {

          _this.useLocalStorage = true;

          var saved_gui = localStorage.getItem(getLocalStorageHash(this, 'gui'));

          if (saved_gui) {
            params.load = JSON.parse(saved_gui);
          }

        }

      }

      this.__closeButton = document.createElement('div');
      this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
      this.domElement.appendChild(this.__closeButton);

      dom.bind(this.__closeButton, 'click', function() {

        _this.closed = !_this.closed;


      });


      // Oh, you're a nested GUI!
    } else {

      if (params.closed === undefined) {
        params.closed = true;
      }

      var title_row_name = document.createTextNode(params.name);
      dom.addClass(title_row_name, 'controller-name');

      var title_row = addRow(_this, title_row_name);

      var on_click_title = function(e) {
        e.preventDefault();
        _this.closed = !_this.closed;
        return false;
      };

      dom.addClass(this.__ul, GUI.CLASS_CLOSED);

      dom.addClass(title_row, 'title');
      dom.bind(title_row, 'click', on_click_title);

      if (!params.closed) {
        this.closed = false;
      }

    }

    if (params.autoPlace) {

      if (common.isUndefined(params.parent)) {

        if (auto_place_virgin) {
          auto_place_container = document.createElement('div');
          dom.addClass(auto_place_container, CSS_NAMESPACE);
          dom.addClass(auto_place_container, GUI.CLASS_AUTO_PLACE_CONTAINER);
          document.body.appendChild(auto_place_container);
          auto_place_virgin = false;
        }

        // Put it in the dom for you.
        auto_place_container.appendChild(this.domElement);

        // Apply the auto styles
        dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);

      }


      // Make it not elastic.
      if (!this.parent) setWidth(_this, params.width);

    }

    dom.bind(window, 'resize', function() { _this.onResize() });
    dom.bind(this.__ul, 'webkitTransitionEnd', function() { _this.onResize(); });
    dom.bind(this.__ul, 'transitionend', function() { _this.onResize() });
    dom.bind(this.__ul, 'oTransitionEnd', function() { _this.onResize() });
    this.onResize();


    if (params.resizable) {
      addResizeHandle(this);
    }

    saveToLocalStorage = function () {
      if (SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(_this, 'isLocal')) === 'true') {
        localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
      }
    }

    // expose this method publicly
    this.saveToLocalStorageIfPossible = saveToLocalStorage;

    var root = _this.getRoot();
    function resetWidth() {
	      var root = _this.getRoot();
	      root.width += 1;
	      common.defer(function() {
	        root.width -= 1;
	      });
	    }

	    if (!params.parent) {
	      resetWidth();
	    }

  };

  GUI.toggleHide = function() {

    hide = !hide;
    common.each(hideable_guis, function(gui) {
      gui.domElement.style.zIndex = hide ? -999 : 999;
      gui.domElement.style.opacity = hide ? 0 : 1;
    });
  };

  GUI.CLASS_AUTO_PLACE = 'a';
  GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
  GUI.CLASS_MAIN = 'main';
  GUI.CLASS_CONTROLLER_ROW = 'cr';
  GUI.CLASS_TOO_TALL = 'taller-than-window';
  GUI.CLASS_CLOSED = 'closed';
  GUI.CLASS_CLOSE_BUTTON = 'close-button';
  GUI.CLASS_DRAG = 'drag';

  GUI.DEFAULT_WIDTH = 245;
  GUI.TEXT_CLOSED = 'Close Controls';
  GUI.TEXT_OPEN = 'Open Controls';

  dom.bind(window, 'keydown', function(e) {

    if (document.activeElement.type !== 'text' &&
        (e.which === HIDE_KEY_CODE || e.keyCode == HIDE_KEY_CODE)) {
      GUI.toggleHide();
    }

  }, false);

  common.extend(

      GUI.prototype,

      /** @lends dat.gui.GUI */
      {

        /**
         * @param object
         * @param property
         * @returns {dat.controllers.Controller} The new controller that was added.
         * @instance
         */
        add: function(object, property) {

          return add(
              this,
              object,
              property,
              {
                factoryArgs: Array.prototype.slice.call(arguments, 2)
              }
          );

        },

        /**
         * @param object
         * @param property
         * @returns {dat.controllers.ColorController} The new controller that was added.
         * @instance
         */
        addColor: function(object, property) {

          return add(
              this,
              object,
              property,
              {
                color: true
              }
          );

        },

        /**
         * @param controller
         * @instance
         */
        remove: function(controller) {

          // TODO listening?
          this.__ul.removeChild(controller.__li);
          this.__controllers.slice(this.__controllers.indexOf(controller), 1);
          var _this = this;
          common.defer(function() {
            _this.onResize();
          });

        },

        destroy: function() {

          if (this.autoPlace) {
            auto_place_container.removeChild(this.domElement);
          }

        },

        /**
         * @param name
         * @returns {dat.gui.GUI} The new folder.
         * @throws {Error} if this GUI already has a folder by the specified
         * name
         * @instance
         */
        addFolder: function(name) {

          // We have to prevent collisions on names in order to have a key
          // by which to remember saved values
          if (this.__folders[name] !== undefined) {
            throw new Error('You already have a folder in this GUI by the' +
                ' name "' + name + '"');
          }

          var new_gui_params = { name: name, parent: this };

          // We need to pass down the autoPlace trait so that we can
          // attach event listeners to open/close folder actions to
          // ensure that a scrollbar appears if the window is too short.
          new_gui_params.autoPlace = this.autoPlace;

          // Do we have saved appearance data for this folder?

          if (this.load && // Anything loaded?
              this.load.folders && // Was my parent a dead-end?
              this.load.folders[name]) { // Did daddy remember me?

            // Start me closed if I was closed
            new_gui_params.closed = this.load.folders[name].closed;

            // Pass down the loaded data
            new_gui_params.load = this.load.folders[name];

          }

          var gui = new GUI(new_gui_params);
          this.__folders[name] = gui;

          var li = addRow(this, gui.domElement);
          dom.addClass(li, 'folder');
          return gui;

        },

        open: function() {
          this.closed = false;
        },

        close: function() {
          this.closed = true;
        },

        onResize: function() {

          var root = this.getRoot();

          if (root.scrollable) {

            var top = dom.getOffset(root.__ul).top;
            var h = 0;

            common.each(root.__ul.childNodes, function(node) {
              if (! (root.autoPlace && node === root.__save_row))
                h += dom.getHeight(node);
            });

            if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
              dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
              root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
            } else {
              dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
              root.__ul.style.height = 'auto';
            }

          }

          if (root.__resize_handle) {
            common.defer(function() {
              root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
            });
          }

          if (root.__closeButton) {
            root.__closeButton.style.width = root.width + 'px';
          }

        },

        /**
         * Mark objects for saving. The order of these objects cannot change as
         * the GUI grows. When remembering new objects, append them to the end
         * of the list.
         *
         * @param {Object...} objects
         * @throws {Error} if not called on a top level GUI.
         * @instance
         */
        remember: function() {

          if (common.isUndefined(SAVE_DIALOGUE)) {
            SAVE_DIALOGUE = new CenteredDiv();
            SAVE_DIALOGUE.domElement.innerHTML = saveDialogueContents;
          }

          if (this.parent) {
            throw new Error("You can only call remember on a top level GUI.");
          }

          var _this = this;

          common.each(Array.prototype.slice.call(arguments), function(object) {
            if (_this.__rememberedObjects.length == 0) {
              addSaveMenu(_this);
            }
            if (_this.__rememberedObjects.indexOf(object) == -1) {
              _this.__rememberedObjects.push(object);
            }
          });

          if (this.autoPlace) {
            // Set save row width
            setWidth(this, this.width);
          }

        },

        /**
         * @returns {dat.gui.GUI} the topmost parent GUI of a nested GUI.
         * @instance
         */
        getRoot: function() {
          var gui = this;
          while (gui.parent) {
            gui = gui.parent;
          }
          return gui;
        },

        /**
         * @returns {Object} a JSON object representing the current state of
         * this GUI as well as its remembered properties.
         * @instance
         */
        getSaveObject: function() {

          var toReturn = this.load;

          toReturn.closed = this.closed;

          // Am I remembering any values?
          if (this.__rememberedObjects.length > 0) {

            toReturn.preset = this.preset;

            if (!toReturn.remembered) {
              toReturn.remembered = {};
            }

            toReturn.remembered[this.preset] = getCurrentPreset(this);

          }

          toReturn.folders = {};
          common.each(this.__folders, function(element, key) {
            toReturn.folders[key] = element.getSaveObject();
          });

          return toReturn;

        },

        save: function() {

          if (!this.load.remembered) {
            this.load.remembered = {};
          }

          this.load.remembered[this.preset] = getCurrentPreset(this);
          markPresetModified(this, false);
          this.saveToLocalStorageIfPossible();

        },

        saveAs: function(presetName) {

          if (!this.load.remembered) {

            // Retain default values upon first save
            this.load.remembered = {};
            this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);

          }

          this.load.remembered[presetName] = getCurrentPreset(this);
          this.preset = presetName;
          addPresetOption(this, presetName, true);
          this.saveToLocalStorageIfPossible();

        },

        revert: function(gui) {

          common.each(this.__controllers, function(controller) {
            // Make revert work on Default.
            if (!this.getRoot().load.remembered) {
              controller.setValue(controller.initialValue);
            } else {
              recallSavedValue(gui || this.getRoot(), controller);
            }
          }, this);

          common.each(this.__folders, function(folder) {
            folder.revert(folder);
          });

          if (!gui) {
            markPresetModified(this.getRoot(), false);
          }


        },

        listen: function(controller) {

          var init = this.__listening.length == 0;
          this.__listening.push(controller);
          if (init) updateDisplays(this.__listening);

        }

      }

  );

  function add(gui, object, property, params) {

    if (object[property] === undefined) {
      throw new Error("Object " + object + " has no property \"" + property + "\"");
    }

    var controller;

    if (params.color) {

      controller = new ColorController(object, property);

    } else {

      var factoryArgs = [object,property].concat(params.factoryArgs);
      controller = controllerFactory.apply(gui, factoryArgs);

    }

    if (params.before instanceof Controller) {
      params.before = params.before.__li;
    }

    recallSavedValue(gui, controller);

    dom.addClass(controller.domElement, 'c');

    var name = document.createElement('span');
    dom.addClass(name, 'property-name');
    name.innerHTML = controller.property;

    var container = document.createElement('div');
    container.appendChild(name);
    container.appendChild(controller.domElement);

    var li = addRow(gui, container, params.before);

    dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
    dom.addClass(li, typeof controller.getValue());

    augmentController(gui, li, controller);

    gui.__controllers.push(controller);

    return controller;

  }

  /**
   * Add a row to the end of the GUI or before another row.
   *
   * @param gui
   * @param [dom] If specified, inserts the dom content in the new row
   * @param [liBefore] If specified, places the new row before another row
   */
  function addRow(gui, dom, liBefore) {
    var li = document.createElement('li');
    if (dom) li.appendChild(dom);
    if (liBefore) {
      gui.__ul.insertBefore(li, params.before);
    } else {
      gui.__ul.appendChild(li);
    }
    gui.onResize();
    return li;
  }

  function augmentController(gui, li, controller) {

    controller.__li = li;
    controller.__gui = gui;

    common.extend(controller, {

      options: function(options) {

        if (arguments.length > 1) {
          controller.remove();

          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [common.toArray(arguments)]
              }
          );

        }

        if (common.isArray(options) || common.isObject(options)) {
          controller.remove();

          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [options]
              }
          );

        }

      },

      name: function(v) {
        controller.__li.firstElementChild.firstElementChild.innerHTML = v;
        return controller;
      },

      listen: function() {
        controller.__gui.listen(controller);
        return controller;
      },

      remove: function() {
        controller.__gui.remove(controller);
        return controller;
      }

    });

    // All sliders should be accompanied by a box.
    if (controller instanceof NumberControllerSlider) {

      var box = new NumberControllerBox(controller.object, controller.property,
          { min: controller.__min, max: controller.__max, step: controller.__step });

      common.each(['updateDisplay', 'onChange', 'onFinishChange'], function(method) {
        var pc = controller[method];
        var pb = box[method];
        controller[method] = box[method] = function() {
          var args = Array.prototype.slice.call(arguments);
          pc.apply(controller, args);
          return pb.apply(box, args);
        }
      });

      dom.addClass(li, 'has-slider');
      controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);

    }
    else if (controller instanceof NumberControllerBox) {

      var r = function(returned) {

        // Have we defined both boundaries?
        if (common.isNumber(controller.__min) && common.isNumber(controller.__max)) {

          // Well, then lets just replace this with a slider.
          controller.remove();
          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [controller.__min, controller.__max, controller.__step]
              });

        }

        return returned;

      };

      controller.min = common.compose(r, controller.min);
      controller.max = common.compose(r, controller.max);

    }
    else if (controller instanceof BooleanController) {

      dom.bind(li, 'click', function() {
        dom.fakeEvent(controller.__checkbox, 'click');
      });

      dom.bind(controller.__checkbox, 'click', function(e) {
        e.stopPropagation(); // Prevents double-toggle
      })

    }
    else if (controller instanceof FunctionController) {

      dom.bind(li, 'click', function() {
        dom.fakeEvent(controller.__button, 'click');
      });

      dom.bind(li, 'mouseover', function() {
        dom.addClass(controller.__button, 'hover');
      });

      dom.bind(li, 'mouseout', function() {
        dom.removeClass(controller.__button, 'hover');
      });

    }
    else if (controller instanceof ColorController) {

      dom.addClass(li, 'color');
      controller.updateDisplay = common.compose(function(r) {
        li.style.borderLeftColor = controller.__color.toString();
        return r;
      }, controller.updateDisplay);

      controller.updateDisplay();

    }

    controller.setValue = common.compose(function(r) {
      if (gui.getRoot().__preset_select && controller.isModified()) {
        markPresetModified(gui.getRoot(), true);
      }
      return r;
    }, controller.setValue);

  }

  function recallSavedValue(gui, controller) {

    // Find the topmost GUI, that's where remembered objects live.
    var root = gui.getRoot();

    // Does the object we're controlling match anything we've been told to
    // remember?
    var matched_index = root.__rememberedObjects.indexOf(controller.object);

    // Why yes, it does!
    if (matched_index != -1) {

      // Let me fetch a map of controllers for thcommon.isObject.
      var controller_map =
          root.__rememberedObjectIndecesToControllers[matched_index];

      // Ohp, I believe this is the first controller we've created for this
      // object. Lets make the map fresh.
      if (controller_map === undefined) {
        controller_map = {};
        root.__rememberedObjectIndecesToControllers[matched_index] =
            controller_map;
      }

      // Keep track of this controller
      controller_map[controller.property] = controller;

      // Okay, now have we saved any values for this controller?
      if (root.load && root.load.remembered) {

        var preset_map = root.load.remembered;

        // Which preset are we trying to load?
        var preset;

        if (preset_map[gui.preset]) {

          preset = preset_map[gui.preset];

        } else if (preset_map[DEFAULT_DEFAULT_PRESET_NAME]) {

          // Uhh, you can have the default instead?
          preset = preset_map[DEFAULT_DEFAULT_PRESET_NAME];

        } else {

          // Nada.

          return;

        }


        // Did the loaded object remember thcommon.isObject?
        if (preset[matched_index] &&

          // Did we remember this particular property?
            preset[matched_index][controller.property] !== undefined) {

          // We did remember something for this guy ...
          var value = preset[matched_index][controller.property];

          // And that's what it is.
          controller.initialValue = value;
          controller.setValue(value);

        }

      }

    }

  }

  function getLocalStorageHash(gui, key) {
    // TODO how does this deal with multiple GUI's?
    return document.location.href + '.' + key;

  }

  function addSaveMenu(gui) {

    var div = gui.__save_row = document.createElement('li');

    dom.addClass(gui.domElement, 'has-save');

    gui.__ul.insertBefore(div, gui.__ul.firstChild);

    dom.addClass(div, 'save-row');

    var gears = document.createElement('span');
    gears.innerHTML = '&nbsp;';
    dom.addClass(gears, 'button gears');

    // TODO replace with FunctionController
    var button = document.createElement('span');
    button.innerHTML = 'Save';
    dom.addClass(button, 'button');
    dom.addClass(button, 'save');

    var button2 = document.createElement('span');
    button2.innerHTML = 'New';
    dom.addClass(button2, 'button');
    dom.addClass(button2, 'save-as');

    var button3 = document.createElement('span');
    button3.innerHTML = 'Revert';
    dom.addClass(button3, 'button');
    dom.addClass(button3, 'revert');

    var select = gui.__preset_select = document.createElement('select');

    if (gui.load && gui.load.remembered) {

      common.each(gui.load.remembered, function(value, key) {
        addPresetOption(gui, key, key == gui.preset);
      });

    } else {
      addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
    }

    dom.bind(select, 'change', function() {


      for (var index = 0; index < gui.__preset_select.length; index++) {
        gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
      }

      gui.preset = this.value;

    });

    div.appendChild(select);
    div.appendChild(gears);
    div.appendChild(button);
    div.appendChild(button2);
    div.appendChild(button3);

    if (SUPPORTS_LOCAL_STORAGE) {

      var saveLocally = document.getElementById('dg-save-locally');
      var explain = document.getElementById('dg-local-explain');

      saveLocally.style.display = 'block';

      var localStorageCheckBox = document.getElementById('dg-local-storage');

      if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
        localStorageCheckBox.setAttribute('checked', 'checked');
      }

      function showHideExplain() {
        explain.style.display = gui.useLocalStorage ? 'block' : 'none';
      }

      showHideExplain();

      // TODO: Use a boolean controller, fool!
      dom.bind(localStorageCheckBox, 'change', function() {
        gui.useLocalStorage = !gui.useLocalStorage;
        showHideExplain();
      });

    }

    var newConstructorTextArea = document.getElementById('dg-new-constructor');

    dom.bind(newConstructorTextArea, 'keydown', function(e) {
      if (e.metaKey && (e.which === 67 || e.keyCode == 67)) {
        SAVE_DIALOGUE.hide();
      }
    });

    dom.bind(gears, 'click', function() {
      newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
      SAVE_DIALOGUE.show();
      newConstructorTextArea.focus();
      newConstructorTextArea.select();
    });

    dom.bind(button, 'click', function() {
      gui.save();
    });

    dom.bind(button2, 'click', function() {
      var presetName = prompt('Enter a new preset name.');
      if (presetName) gui.saveAs(presetName);
    });

    dom.bind(button3, 'click', function() {
      gui.revert();
    });

//    div.appendChild(button2);

  }

  function addResizeHandle(gui) {

    gui.__resize_handle = document.createElement('div');

    common.extend(gui.__resize_handle.style, {

      width: '6px',
      marginLeft: '-3px',
      height: '200px',
      cursor: 'ew-resize',
      position: 'absolute'
//      border: '1px solid blue'

    });

    var pmouseX;

    dom.bind(gui.__resize_handle, 'mousedown', dragStart);
    dom.bind(gui.__closeButton, 'mousedown', dragStart);

    gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);

    function dragStart(e) {

      e.preventDefault();

      pmouseX = e.clientX;

      dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
      dom.bind(window, 'mousemove', drag);
      dom.bind(window, 'mouseup', dragStop);

      return false;

    }

    function drag(e) {

      e.preventDefault();

      gui.width += pmouseX - e.clientX;
      gui.onResize();
      pmouseX = e.clientX;

      return false;

    }

    function dragStop() {

      dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
      dom.unbind(window, 'mousemove', drag);
      dom.unbind(window, 'mouseup', dragStop);

    }

  }

  function setWidth(gui, w) {
    gui.domElement.style.width = w + 'px';
    // Auto placed save-rows are position fixed, so we have to
    // set the width manually if we want it to bleed to the edge
    if (gui.__save_row && gui.autoPlace) {
      gui.__save_row.style.width = w + 'px';
    }if (gui.__closeButton) {
      gui.__closeButton.style.width = w + 'px';
    }
  }

  function getCurrentPreset(gui, useInitialValues) {

    var toReturn = {};

    // For each object I'm remembering
    common.each(gui.__rememberedObjects, function(val, index) {

      var saved_values = {};

      // The controllers I've made for thcommon.isObject by property
      var controller_map =
          gui.__rememberedObjectIndecesToControllers[index];

      // Remember each value for each property
      common.each(controller_map, function(controller, property) {
        saved_values[property] = useInitialValues ? controller.initialValue : controller.getValue();
      });

      // Save the values for thcommon.isObject
      toReturn[index] = saved_values;

    });

    return toReturn;

  }

  function addPresetOption(gui, name, setSelected) {
    var opt = document.createElement('option');
    opt.innerHTML = name;
    opt.value = name;
    gui.__preset_select.appendChild(opt);
    if (setSelected) {
      gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
    }
  }

  function setPresetSelectIndex(gui) {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      if (gui.__preset_select[index].value == gui.preset) {
        gui.__preset_select.selectedIndex = index;
      }
    }
  }

  function markPresetModified(gui, modified) {
    var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
//    
    if (modified) {
      opt.innerHTML = opt.value + "*";
    } else {
      opt.innerHTML = opt.value;
    }
  }

  function updateDisplays(controllerArray) {


    if (controllerArray.length != 0) {

      requestAnimationFrame(function() {
        updateDisplays(controllerArray);
      });

    }

    common.each(controllerArray, function(c) {
      c.updateDisplay();
    });

  }

  return GUI;

})(dat.utils.css,
"<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>",
cssConverterElement.innerHTML,
dat.controllers.factory = (function (OptionController, NumberControllerBox, NumberControllerSlider, StringController, FunctionController, BooleanController, common) {

      return function(object, property) {

        var initialValue = object[property];

        // Providing options?
        if (common.isArray(arguments[2]) || common.isObject(arguments[2])) {
          return new OptionController(object, property, arguments[2]);
        }

        // Providing a map?

        if (common.isNumber(initialValue)) {

          if (common.isNumber(arguments[2]) && common.isNumber(arguments[3])) {

            // Has min and max.
            return new NumberControllerSlider(object, property, arguments[2], arguments[3]);

          } else {

            return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });

          }

        }

        if (common.isString(initialValue)) {
          return new StringController(object, property);
        }

        if (common.isFunction(initialValue)) {
          return new FunctionController(object, property, '');
        }

        if (common.isBoolean(initialValue)) {
          return new BooleanController(object, property);
        }

      }

    })(dat.controllers.OptionController,
dat.controllers.NumberControllerBox,
dat.controllers.NumberControllerSlider,
dat.controllers.StringController = (function (Controller, dom, common) {

  /**
   * @class Provides a text input to alter the string property of an object.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var StringController = function(object, property) {

    StringController.superclass.call(this, object, property);

    var _this = this;

    this.__input = document.createElement('input');
    this.__input.setAttribute('type', 'text');

    dom.bind(this.__input, 'keyup', onChange);
    dom.bind(this.__input, 'change', onChange);
    dom.bind(this.__input, 'blur', onBlur);
    dom.bind(this.__input, 'keydown', function(e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });
    

    function onChange() {
      _this.setValue(_this.__input.value);
    }

    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    this.updateDisplay();

    this.domElement.appendChild(this.__input);

  };

  StringController.superclass = Controller;

  common.extend(

      StringController.prototype,
      Controller.prototype,

      {

        updateDisplay: function() {
          // Stops the caret from moving on account of:
          // keyup -> setValue -> updateDisplay
          if (!dom.isActive(this.__input)) {
            this.__input.value = this.getValue();
          }
          return StringController.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  return StringController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common),
dat.controllers.FunctionController,
dat.controllers.BooleanController,
dat.utils.common),
dat.controllers.Controller,
dat.controllers.BooleanController,
dat.controllers.FunctionController,
dat.controllers.NumberControllerBox,
dat.controllers.NumberControllerSlider,
dat.controllers.OptionController,
dat.controllers.ColorController = (function (Controller, dom, Color, interpret, common) {

  var ColorController = function(object, property) {

    ColorController.superclass.call(this, object, property);

    this.__color = new Color(this.getValue());
    this.__temp = new Color(0);

    var _this = this;

    this.domElement = document.createElement('div');

    dom.makeSelectable(this.domElement, false);

    this.__selector = document.createElement('div');
    this.__selector.className = 'selector';

    this.__saturation_field = document.createElement('div');
    this.__saturation_field.className = 'saturation-field';

    this.__field_knob = document.createElement('div');
    this.__field_knob.className = 'field-knob';
    this.__field_knob_border = '2px solid ';

    this.__hue_knob = document.createElement('div');
    this.__hue_knob.className = 'hue-knob';

    this.__hue_field = document.createElement('div');
    this.__hue_field.className = 'hue-field';

    this.__input = document.createElement('input');
    this.__input.type = 'text';
    this.__input_textShadow = '0 1px 1px ';

    dom.bind(this.__input, 'keydown', function(e) {
      if (e.keyCode === 13) { // on enter
        onBlur.call(this);
      }
    });

    dom.bind(this.__input, 'blur', onBlur);

    dom.bind(this.__selector, 'mousedown', function(e) {

      dom
        .addClass(this, 'drag')
        .bind(window, 'mouseup', function(e) {
          dom.removeClass(_this.__selector, 'drag');
        });

    });

    var value_field = document.createElement('div');

    common.extend(this.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });

    common.extend(this.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: this.__field_knob_border + (this.__color.v < .5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });
    
    common.extend(this.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });

    common.extend(this.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });

    common.extend(value_field.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });
    
    linearGradient(value_field, 'top', 'rgba(0,0,0,0)', '#000');

    common.extend(this.__hue_field.style, {
      width: '15px',
      height: '100px',
      display: 'inline-block',
      border: '1px solid #555',
      cursor: 'ns-resize'
    });

    hueGradient(this.__hue_field);

    common.extend(this.__input.style, {
      outline: 'none',
//      width: '120px',
      textAlign: 'center',
//      padding: '4px',
//      marginBottom: '6px',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: this.__input_textShadow + 'rgba(0,0,0,0.7)'
    });

    dom.bind(this.__saturation_field, 'mousedown', fieldDown);
    dom.bind(this.__field_knob, 'mousedown', fieldDown);

    dom.bind(this.__hue_field, 'mousedown', function(e) {
      setH(e);
      dom.bind(window, 'mousemove', setH);
      dom.bind(window, 'mouseup', unbindH);
    });

    function fieldDown(e) {
      setSV(e);
      // document.body.style.cursor = 'none';
      dom.bind(window, 'mousemove', setSV);
      dom.bind(window, 'mouseup', unbindSV);
    }

    function unbindSV() {
      dom.unbind(window, 'mousemove', setSV);
      dom.unbind(window, 'mouseup', unbindSV);
      // document.body.style.cursor = 'default';
    }

    function onBlur() {
      var i = interpret(this.value);
      if (i !== false) {
        _this.__color.__state = i;
        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }

    function unbindH() {
      dom.unbind(window, 'mousemove', setH);
      dom.unbind(window, 'mouseup', unbindH);
    }

    this.__saturation_field.appendChild(value_field);
    this.__selector.appendChild(this.__field_knob);
    this.__selector.appendChild(this.__saturation_field);
    this.__selector.appendChild(this.__hue_field);
    this.__hue_field.appendChild(this.__hue_knob);

    this.domElement.appendChild(this.__input);
    this.domElement.appendChild(this.__selector);

    this.updateDisplay();

    function setSV(e) {

      e.preventDefault();

      var w = dom.getWidth(_this.__saturation_field);
      var o = dom.getOffset(_this.__saturation_field);
      var s = (e.clientX - o.left + document.body.scrollLeft) / w;
      var v = 1 - (e.clientY - o.top + document.body.scrollTop) / w;

      if (v > 1) v = 1;
      else if (v < 0) v = 0;

      if (s > 1) s = 1;
      else if (s < 0) s = 0;

      _this.__color.v = v;
      _this.__color.s = s;

      _this.setValue(_this.__color.toOriginal());


      return false;

    }

    function setH(e) {

      e.preventDefault();

      var s = dom.getHeight(_this.__hue_field);
      var o = dom.getOffset(_this.__hue_field);
      var h = 1 - (e.clientY - o.top + document.body.scrollTop) / s;

      if (h > 1) h = 1;
      else if (h < 0) h = 0;

      _this.__color.h = h * 360;

      _this.setValue(_this.__color.toOriginal());

      return false;

    }

  };

  ColorController.superclass = Controller;

  common.extend(

      ColorController.prototype,
      Controller.prototype,

      {

        updateDisplay: function() {

          var i = interpret(this.getValue());

          if (i !== false) {

            var mismatch = false;

            // Check for mismatch on the interpreted value.

            common.each(Color.COMPONENTS, function(component) {
              if (!common.isUndefined(i[component]) &&
                  !common.isUndefined(this.__color.__state[component]) &&
                  i[component] !== this.__color.__state[component]) {
                mismatch = true;
                return {}; // break
              }
            }, this);

            // If nothing diverges, we keep our previous values
            // for statefulness, otherwise we recalculate fresh
            if (mismatch) {
              common.extend(this.__color.__state, i);
            }

          }

          common.extend(this.__temp.__state, this.__color.__state);

          this.__temp.a = 1;

          var flip = (this.__color.v < .5 || this.__color.s > .5) ? 255 : 0;
          var _flip = 255 - flip;

          common.extend(this.__field_knob.style, {
            marginLeft: 100 * this.__color.s - 7 + 'px',
            marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
            backgroundColor: this.__temp.toString(),
            border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip +')'
          });

          this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px'

          this.__temp.s = 1;
          this.__temp.v = 1;

          linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toString());

          common.extend(this.__input.style, {
            backgroundColor: this.__input.value = this.__color.toString(),
            color: 'rgb(' + flip + ',' + flip + ',' + flip +')',
            textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip +',.7)'
          });

        }

      }

  );
  
  var vendors = ['-moz-','-o-','-webkit-','-ms-',''];
  
  function linearGradient(elem, x, a, b) {
    elem.style.background = '';
    common.each(vendors, function(vendor) {
      elem.style.cssText += 'background: ' + vendor + 'linear-gradient('+x+', '+a+' 0%, ' + b + ' 100%); ';
    });
  }
  
  function hueGradient(elem) {
    elem.style.background = '';
    elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);'
    elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
    elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
    elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
    elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
  }


  return ColorController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.color.Color = (function (interpret, math, toString, common) {

  var Color = function() {

    this.__state = interpret.apply(this, arguments);

    if (this.__state === false) {
      throw 'Failed to interpret color arguments';
    }

    this.__state.a = this.__state.a || 1;


  };

  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];

  common.extend(Color.prototype, {

    toString: function() {
      return toString(this);
    },

    toOriginal: function() {
      return this.__state.conversion.write(this);
    }

  });

  defineRGBComponent(Color.prototype, 'r', 2);
  defineRGBComponent(Color.prototype, 'g', 1);
  defineRGBComponent(Color.prototype, 'b', 0);

  defineHSVComponent(Color.prototype, 'h');
  defineHSVComponent(Color.prototype, 's');
  defineHSVComponent(Color.prototype, 'v');

  Object.defineProperty(Color.prototype, 'a', {

    get: function() {
      return this.__state.a;
    },

    set: function(v) {
      this.__state.a = v;
    }

  });

  Object.defineProperty(Color.prototype, 'hex', {

    get: function() {

      if (!this.__state.space !== 'HEX') {
        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
      }

      return this.__state.hex;

    },

    set: function(v) {

      this.__state.space = 'HEX';
      this.__state.hex = v;

    }

  });

  function defineRGBComponent(target, component, componentHexIndex) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'RGB') {
          return this.__state[component];
        }

        recalculateRGB(this, component, componentHexIndex);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'RGB') {
          recalculateRGB(this, component, componentHexIndex);
          this.__state.space = 'RGB';
        }

        this.__state[component] = v;

      }

    });

  }

  function defineHSVComponent(target, component) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'HSV')
          return this.__state[component];

        recalculateHSV(this);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'HSV') {
          recalculateHSV(this);
          this.__state.space = 'HSV';
        }

        this.__state[component] = v;

      }

    });

  }

  function recalculateRGB(color, component, componentHexIndex) {

    if (color.__state.space === 'HEX') {

      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);

    } else if (color.__state.space === 'HSV') {

      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));

    } else {

      throw 'Corrupted color state';

    }

  }

  function recalculateHSV(color) {

    var result = math.rgb_to_hsv(color.r, color.g, color.b);

    common.extend(color.__state,
        {
          s: result.s,
          v: result.v
        }
    );

    if (!common.isNaN(result.h)) {
      color.__state.h = result.h;
    } else if (common.isUndefined(color.__state.h)) {
      color.__state.h = 0;
    }

  }

  return Color;

})(dat.color.interpret,
dat.color.math = (function () {

  var tmpComponent;

  return {

    hsv_to_rgb: function(h, s, v) {

      var hi = Math.floor(h / 60) % 6;

      var f = h / 60 - Math.floor(h / 60);
      var p = v * (1.0 - s);
      var q = v * (1.0 - (f * s));
      var t = v * (1.0 - ((1.0 - f) * s));
      var c = [
        [v, t, p],
        [q, v, p],
        [p, v, t],
        [p, q, v],
        [t, p, v],
        [v, p, q]
      ][hi];

      return {
        r: c[0] * 255,
        g: c[1] * 255,
        b: c[2] * 255
      };

    },

    rgb_to_hsv: function(r, g, b) {

      var min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          delta = max - min,
          h, s;

      if (max != 0) {
        s = delta / max;
      } else {
        return {
          h: NaN,
          s: 0,
          v: 0
        };
      }

      if (r == max) {
        h = (g - b) / delta;
      } else if (g == max) {
        h = 2 + (b - r) / delta;
      } else {
        h = 4 + (r - g) / delta;
      }
      h /= 6;
      if (h < 0) {
        h += 1;
      }

      return {
        h: h * 360,
        s: s,
        v: max / 255
      };
    },

    rgb_to_hex: function(r, g, b) {
      var hex = this.hex_with_component(0, 2, r);
      hex = this.hex_with_component(hex, 1, g);
      hex = this.hex_with_component(hex, 0, b);
      return hex;
    },

    component_from_hex: function(hex, componentIndex) {
      return (hex >> (componentIndex * 8)) & 0xFF;
    },

    hex_with_component: function(hex, componentIndex, value) {
      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
    }

  }

})(),
dat.color.toString,
dat.utils.common),
dat.color.interpret,
dat.utils.common),
dat.utils.requestAnimationFrame = (function () {

  /**
   * requirejs version of Paul Irish's RequestAnimationFrame
   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   */

  return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback, element) {

        window.setTimeout(callback, 1000 / 60);

      };
})(),
dat.dom.CenteredDiv = (function (dom, common) {


  var CenteredDiv = function() {

    this.backgroundElement = document.createElement('div');
    common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear'
    });

    dom.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';

    this.domElement = document.createElement('div');
    common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear'
    });


    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);

    var _this = this;
    dom.bind(this.backgroundElement, 'click', function() {
      _this.hide();
    });


  };

  CenteredDiv.prototype.show = function() {

    var _this = this;
    


    this.backgroundElement.style.display = 'block';

    this.domElement.style.display = 'block';
    this.domElement.style.opacity = 0;
//    this.domElement.style.top = '52%';
    this.domElement.style.webkitTransform = 'scale(1.1)';

    this.layout();

    common.defer(function() {
      _this.backgroundElement.style.opacity = 1;
      _this.domElement.style.opacity = 1;
      _this.domElement.style.webkitTransform = 'scale(1)';
    });

  };

  CenteredDiv.prototype.hide = function() {

    var _this = this;

    var hide = function() {

      _this.domElement.style.display = 'none';
      _this.backgroundElement.style.display = 'none';

      dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
      dom.unbind(_this.domElement, 'transitionend', hide);
      dom.unbind(_this.domElement, 'oTransitionEnd', hide);

    };

    dom.bind(this.domElement, 'webkitTransitionEnd', hide);
    dom.bind(this.domElement, 'transitionend', hide);
    dom.bind(this.domElement, 'oTransitionEnd', hide);

    this.backgroundElement.style.opacity = 0;
//    this.domElement.style.top = '48%';
    this.domElement.style.opacity = 0;
    this.domElement.style.webkitTransform = 'scale(1.1)';

  };

  CenteredDiv.prototype.layout = function() {
    this.domElement.style.left = window.innerWidth/2 - dom.getWidth(this.domElement) / 2 + 'px';
    this.domElement.style.top = window.innerHeight/2 - dom.getHeight(this.domElement) / 2 + 'px';
  };
  
  function lockScroll(e) {
    
  }

  return CenteredDiv;

})(dat.dom.dom,
dat.utils.common),
dat.dom.dom,
dat.utils.common);/*!
 * verge 1.10.2+201705300050
 * http://npm.im/verge
 * MIT Ryan Van Etten
 */
!function(a,b,c){"undefined"!=typeof module&&module.exports?module.exports=c():a[b]=c()}(this,"verge",function(){function a(){return{width:k(),height:l()}}function b(a,b){var c={};return b=+b||0,c.width=(c.right=a.right+b)-(c.left=a.left-b),c.height=(c.bottom=a.bottom+b)-(c.top=a.top-b),c}function c(a,c){return!(!(a=a&&!a.nodeType?a[0]:a)||1!==a.nodeType)&&b(a.getBoundingClientRect(),c)}function d(b){b=null==b?a():1===b.nodeType?c(b):b;var d=b.height,e=b.width;return d="function"==typeof d?d.call(b):d,(e="function"==typeof e?e.call(b):e)/d}var e={},f="undefined"!=typeof window&&window,g="undefined"!=typeof document&&document,h=g&&g.documentElement,i=f.matchMedia||f.msMatchMedia,j=i?function(a){return!!i.call(f,a).matches}:function(){return!1},k=e.viewportW=function(){var a=h.clientWidth,b=f.innerWidth;return a<b?b:a},l=e.viewportH=function(){var a=h.clientHeight,b=f.innerHeight;return a<b?b:a};return e.mq=j,e.matchMedia=i?function(){return i.apply(f,arguments)}:function(){return{}},e.viewport=a,e.scrollX=function(){return f.pageXOffset||h.scrollLeft},e.scrollY=function(){return f.pageYOffset||h.scrollTop},e.rectangle=c,e.aspect=d,e.inX=function(a,b){var d=c(a,b);return!!d&&d.right>=0&&d.left<=k()},e.inY=function(a,b){var d=c(a,b);return!!d&&d.bottom>=0&&d.top<=l()},e.inViewport=function(a,b){var d=c(a,b);return!!d&&d.bottom>=0&&d.right>=0&&d.top<=l()&&d.left<=k()},e});/* global Sys, Layering */
Sys.ns("Layering");

Layering.Game = {
    Background: {
        image: 0
    },
    Logo: {
        image: 5
    },
    ResourceLoader: {
        fade: 50,
        spinner: 51
    },
    Movie: {
        video: 50,
        button: 51
    }
};
/* global Sys, Layering */
Sys.ns("Layering.Game");

/**
 * This file contains all the layering values used by components defined in common.
 * Override values here for your game if needed.
 *
 * PLEASE KEEP THIS FILE IN ALPHABETIC ORDER!
 */
Layering.Game.Slots = {
    BigWin: {
        text: 20
    },
    CoinWin: {
        background: 15,
        text: 16
    },
    FreeSpinSymbolAttentionAnimation: {
        animationItems: 2
    },
    FreeSpinAdditional: {
        text: 20
    },
    FreeSpinCountDown: {
        text: 20
    },
    FreeSpinIntro: {
        skip: 121,
        background: 122,
        button: 123,
        text: 124
    },
    FreeSpinOutro: {
        background: 120,
        backgroundImage: 121,
        button: 122,
        text: 123
    },
    Keypad: {
        background_basic: 3,
        background_freespin: 35,
        bet: 4,
        balance: 4,
        win: 36,
        total_win: 36,
        betLevelSelector: 5,
        coinValueSelector: 5,
        maxBet: {
            button: 5,
            label: 6
        },
        autoPlay: {
            button: 5,
            label: 6
        },
        paytable: {
            button: 5,
            label: 6
        }
    },
    QuickStop: {
        flash: 25
    },
    Spin: {
        "default": {
            symbols: 1
        },
        "symbols": 1
    },
    SpreadingWild: {
        symbols: 5
    },
    StickySymbols: {
        symbols: 5
    },
    WinningSymbols: {
        animationItems: 10
    },
    WinSituationsDisplay: {
        hoverBetlines: 21,
        betlines: 20,
        betlineNumberHighlight: 20
    }
};
/* global Sys, Core, Environment, Sys, Utils, Platform */
Sys.ns("Core");

/**
 * @class Core.Scaling
 * @extends Sys.Observable
 */
Core.Scaling = {

    constructor: function() {
        Core.Scaling.superclass.constructor.apply(this, arguments);

        this.performiOsSpecificRoutines();
        this.scalingPrefix = Sys.utils.getPrefixedCSSProperty("transform");
        this.viewport = document.getElementById("viewport");

        this.setElementSize(this.viewport);
        this.setupEvents();
    },

    /**
     * Setup iOs classes for document body.
     *
     * @returns {void}
     * */
    performiOsSpecificRoutines: function() {
        // iOS devices behaves a little different in some cases. This override handles all such issues.
        if (Platform.isIOSDevice) {
            if (!Utils.Platform.inIframe()) {
                // Add iOS identifier class for all iOS devices. This is needed for some vendor specific CSS code.
                Sys.utils.addCSSClass(document.body, "iOS_ui");
                Sys.utils.addCSSClass(document.body, "iOS");

                if (Platform.iPhoneX) {
                    Sys.utils.addCSSClass(document.body, "iPhoneX");
                }
            }
        }
    },

    /**
     * Setup event listeners.
     *
     * @private
     * @returns {void}
     */
    setupEvents: function() {
        this.on({
            "notify:platform.resized": this.updateGameSize,
            "notify:loader.closed": this.scaleContent
        });
    },

    /**
     * Reacts to orientation change.
     *
     * @deprecated Not in use.
     * @returns {void}
     */
    onOrientationChanged: function() {
        if (Environment.allowsCustomCanvasSize()) {
            this.updateGameSize();
        }
    },

    /**
     * Sets the size of the element with the corresponding ID to the size of the defined platform resolution.
     *
     * @private
     * @param {Element} element The element to resize.
     * @returns {void}
     */
    setElementSize: function(element) {
        var resolution = Environment.determineResolution().resolution;

        element.style.width = resolution.width + "px";
        element.style.height = resolution.height + "px";
        element.style[this.scalingPrefix + "Origin"] = "0 0";
    },

    /**
     * Scales the content.
     *
     * @private
     * @returns {void}
     */
    scaleContent: function() {
        var orientation = Utils.Platform.getOrientation(),
            scale = this.calculateScale();

        this.setScale(scale);
        this.scaleGame(scale);

        this.fireEvent("notify:viewport.scaled");
        this.fireEvent("notify:scaling.updated");
        this.fireEvent("notify:viewport." + orientation);
    },

    /**
     * Get the scale.
     *
     * @returns {number} The scale as a float.
     */
    getScale: function() {
        return this.scale;
    },

    /**
     * Get the scale.
     *
     * @param {number} scale The scale as a float.
     * @returns {void}
     */
    setScale: function(scale) {
        this.scale = scale;
    },

    /**
     * Calculates and returns the screen size to be used.
     *
     * @private
     * @deprecated Use Utils.Platform.getViewportInnerSize() instead.
     * @returns {Object} Object containing width and height to be used.
     */
    getScreenSize: function() {
        return Utils.Platform.isFullScreenAPISupported() ? Utils.Platform.getViewportInnerSize() : Environment.getRealScreenSize();
    },

    /**
     * Calculates the scale based on screen size and the client resolution.
     *
     * @private
     * @returns {number} The scale.
     */
    calculateScale: function() {
        var resolution = Environment.determineResolution().resolution,
            screenSize = Utils.Platform.getViewportSize(),
            verticalScale = screenSize.height / resolution.height,
            horizontalScale = screenSize.width / resolution.width,
            scale = Math.min(horizontalScale, verticalScale);

        return parseFloat((scale).toFixed(3));
    },

    /**
     * Scales the game.
     *
     * @private
     * @param {number} scale The scale.
     * @returns {void}
     */
    scaleGame: function(scale) {
        this.viewport.style[this.scalingPrefix] = "scale(" + scale + ")";

        this.centerGame(scale);
    },

    /**
     * Centers the game.
     *
     * @private
     * @param {number} scale The scale.
     * @returns {void}
     */
    centerGame: function(scale) {
        var resolutionProps = Environment.determineResolution(),
            resolution = resolutionProps.resolution,
            viewportSize = Utils.Platform.getViewportSize(),
            topPosition;

        if (Utils.Platform.isPortrait() && Platform.isMobileDevice) {
            topPosition = Math.round(resolutionProps.portraitTopOffset * resolution.height * scale);
        }
        else {
            topPosition = Math.round((viewportSize.height - (resolution.height * scale)) / 2);
        }

        this.viewport.style.top = topPosition + "px";
        this.viewport.style.left = Math.round((viewportSize.width - (resolution.width * scale)) / 2) + "px";

        // Trigger page repositioning
        window.scrollTo(0, 0);
    },

    /**
     * Sets the size of the HTML document and body to the size of the screen.
     *
     * @deprecated Should be set by CSS instead.
     * @returns {void}
     */
    setDocumentSize: function() {
        var bodyStyle = document.body.style,
            documentStyle = document.documentElement.style;

        documentStyle.width = "100%";
        documentStyle.height = "100%";

        // Hide scroll bars on desktop if the scale is greater than one.
        if (Platform.isDesktopDevice) {
            documentStyle.overflow = "hidden";
        }

        bodyStyle.width = "100%";
        bodyStyle.height = "100%";
    },

    /**
     * Updates the size of the viewport to the new resolution and scale the game accordingly.
     *
     * @private
     * @returns {void}
     */
    updateGameSize: function() {
        this.setElementSize(this.viewport);
        this.scaleContent();
        this.fireEvent("notify:scaling.gameSizeChanged");
    },

    /**
     * Sets the size of the viewport to the size of the defined platform resolution.
     *
     * @deprecated Not in use.
     * @returns {void}
     */
    setGameSize: function() {
        this.setElementSize(this.viewport);
    },

    /**
     * Formats the scale value.
     *
     * @deprecated Not in use.
     * @param {number} scale The value to format.
     * @returns {number} Scale value.
     */
    formatScaleValue: function(scale) {
        return parseFloat((scale).toFixed(3));
    },

    /**
     * Gets the vertical offset used to center the a scaled fullscreen element.
     *
     * @deprecated Not in use.
     * @param {number} scale The scale.
     * @returns {number} The offset in whole pixels.
     */
    getScaledFullscreenElementOffsetTop: function(scale) {
        var height = Utils.Platform.getViewportInnerSize().height,
            virtualHeight = Environment.determineResolution().resolution.height;

        return Math.round((height - (virtualHeight * scale)) / 2);
    },

    /**
     * Gets the horizontal offset used to center the a scaled fullscreen element.
     *
     * @deprecated Not in use.
     * @param {number} scale The scale.
     * @returns {number} The offset in whole pixels.
     */
    getScaledFullscreenElementOffsetLeft: function(scale) {
        var width = Utils.Platform.getViewportInnerSize().width,
            virtualWidth = Environment.determineResolution().resolution.width;

        return Math.round((width - (virtualWidth * scale)) / 2);
    },

    /**
     * Get the scaled offset.
     *
     * @deprecated Not in use.
     * @param {number} value The original value.
     * @param {number} scaledValue The scaled value.
     * @returns {number} Returns the scaled offset.
     */
    getScaledOffset: function(value, scaledValue) {
        return Math.round((value - scaledValue) / 2);
    }
};

Core.Scaling = Sys.extend(Sys.Observable, Core.Scaling, "Core.Scaling");
/* global Sys, Core, Environment, Utils */
Sys.ns("Core");

/**
 * The Orientation Class.
 *
 * Handles all device orientation management.
 * Replaces orientation functionality in Environment.
 *
 * @deprecated Will later be removed by moving to more responsive and functional solutions. Use Utils.Platform for any needs.
 * @class Core.Orientation
 * @extends Sys.Observable
 */
Core.Orientation = {

    /**
     * @inheritdoc
     */
    constructor: function() {
        Core.Orientation.superclass.constructor.apply(this, arguments);

        this.previousResolution = Utils.Platform.getViewportInnerSize();

        this.setupEvents();
        this.setBodyOrientationClass();
    },

    /**
     * Setup event listeners.
     *
     * @private
     * @returns {void}
     */
    setupEvents: function() {
        this.on({
            "notify:scaling.updated": this.onScalingUpdated
        });
    },

    /**
     * Checks if the current orientation is portrait.
     *
     * @deprecated Use Utils.Platform.isPortrait().
     * @returns {boolean} True if the current orientation is portrait.
     */
    isPortrait: function() {
        return this.getOrientation() === "PORTRAIT";
    },

    /**
     * Checks if the current orientation is landscape.
     *
     * @deprecated Use Utils.Platform.isLandscape().
     * @returns {boolean} True if the current orientation is landscape.
     */
    isLandscape: function() {
        return this.getOrientation() === "LANDSCAPE";
    },

    /**
     * Returns the current orientation in capital letters.
     *
     * @deprecated Use Utils.Platform.getOrientation().
     * @returns {string} Orientation of "LANDSCAPE" or "PORTRAIT".
     */
    getOrientation: function() {
        return Utils.Platform.getOrientation();
    },

    /**
     * Check if the orientation has changed since last check.
     *
     * @deprecated Anything dependant on this should listen to notify:platform.orientationChanged.
     * @returns {boolean} True if the orientation has changed since last check.
     */
    orientationHasChanged: function() {
        var prevRes = this.previousResolution,
            res = Utils.Platform.getViewportInnerSize(),
            prevRatio = Math.floor(prevRes.width / prevRes.height),
            newRatio = Math.floor(res.width / res.height);

        return prevRatio !== newRatio;
    },

    /**
     * Reacts to when the scaling has been updated.
     *
     * @returns {void}
     */
    onScalingUpdated: function() {
        this.setBodyOrientationClass();
    },

    /**
     * Sets the platform specific orientation class on the body element.
     *
     * @deprecated Should not set css class on body depending on orientation. Use media queries instead.
     * @returns {void}
     */
    setBodyOrientationClass: function() {
        var platform = Environment.getCurrentPlatformCSS(),
            orientation = this.getOrientation(),
            oldOrientation = orientation === "PORTRAIT" ? platform + "_landscape" : platform + "_portrait";

        Sys.utils.replaceCSSClass(document.body, oldOrientation, platform + "_" + orientation.toLowerCase(), true);
    }
};

Core.Orientation = Sys.extend(Sys.Observable, Core.Orientation, "Core.Orientation");
/* global Sys, Core, Resources */
Sys.ns("Core");

Core.DeviceDetectionCodes = {
    WHITE: 0,
    GREY_OS: 1,
    GREY_OS_VERSION: 2,
    GREY_BROWSER: 3,
    GREY_BROWSER_VERSION: 4,
    BLACK_OS: 5,
    BLACK_OS_VERSION: 6,
    BLACK_BROWSER: 7,
    BLACK_BROWSER_VERSION: 8
};

/**
 * @typedef {Object} DeviceDetectionValidationResult
 * @property {string|null} preferredBrowser - The preferred browser to use or null if the OS was not identified.
 * @property {boolean} allowed - Whether or not the combination is allowed to enter.
 * @property {number} code - The result code listed in Core.DeviceDetectionCodes.
 */

/**
 * @namespace Core.DeviceDetectionService
 */
Core.DeviceDetectionService = (function() {
    var getVersion,
        findMatch,
        findMatchOnWhiteList,
        findMatchOnBlackList,
        validateCombination;

    /**
     * Gets the version number from the user agent.
     *
     * @private
     * @static
     * @param {string} userAgent - The user agent string.
     * @param {string} pattern - The regular expression pattern used to retrieve the version information.
     * @param {string} [separator] - The optional regular expression pattern used to retrieve the separate the version numbers.
     * @returns {string} The version.
     */
    getVersion = function(userAgent, pattern, separator) {
        var versionRegExp = new RegExp(pattern),
            matches = versionRegExp.exec(userAgent),
            version;

        if (!(matches && matches.length > 0)) {
            throw new Error("Could not find a matching version");
        }

        version = matches[1];

        if (separator) {
            version = version.replace(new RegExp(separator, "g"), ".");
        }

        if (!Core._DeviceDetectionUtils.isVersionNumber(version)) {
            throw new Error("The match found is not a valid version");
        }

        return version;
    };

    /**
     * Finds the list item that matches the user agent.
     *
     * @private
     * @static
     * @param {string} userAgent - The user agent string.
     * @param {Object} map - The map of items.
     * @param {Object} map.version - The version range to match against.
     * @param {string} [map.version.min] - The optional minimum version.
     * @param {string} [map.version.max] - The optional maximum version.
     * @param {Object} map.browsers - The optional map of browsers linked to this item.
     * @param {Object} definitions - The map of item definitions.
     * @param {string} definitions.matchPattern - The regular expression pattern used to identify the item.
     * @param {string} [definitions.excludePattern] - The regular expression pattern used to negate identification of the item.
     * @param {Object} definitions.version - The instructions on how to identify the version.
     * @param {string} definitions.version.matchPattern - The regular expression pattern used to retrieve the version information.
     * @param {string} [definitions.version.separator] - The optional regular expression pattern used to retrieve the separate the version numbers.
     * @returns {Object|null} Returns an object containing the preferredBrowser and available browsers or null if no match was found.
     */
    findMatch = function(userAgent, map, definitions) {
        var names = Object.keys(map),
            numNames = names.length,
            item,
            definition,
            matcher,
            excluded,
            version,
            inRange,
            i;

        for (i = 0; i < numNames; i++) {
            item = map[names[i]];
            definition = definitions[names[i]];
            excluded = false;

            matcher = new RegExp(definition.matchPattern);

            if (definition.excludePattern) {
                excluded = (new RegExp(definition.excludePattern)).test(userAgent);
            }

            if (matcher.test(userAgent) && !excluded) {
                if (item.version) {
                    version = getVersion(userAgent, definition.version.matchPattern, definition.version.separator);
                    inRange = Core._DeviceDetectionUtils.isInRange(version, item.version.min, item.version.max);
                }
                else {
                    inRange = true;
                }

                return {
                    name: names[i],
                    inRange: inRange
                };
            }
        }

        return null;
    };

    /**
     * Tries to find a match for the user agent in the white list.
     *
     * @private
     * @static
     * @param {string} userAgent - The user agent string.
     * @param {Object} configuration - The device detection configuration.
     * @param {Object} configuration.definitions - The OS and browser definitions.
     * @param {Object} configuration.definitions.operatingSystems - The OS definitions.
     * @param {Object} configuration.definitions.browsers - The browser definitions.
     * @param {Object} configuration.ruleSets - The rule sets containing the white and black lists.
     * @param {Object} [configuration.ruleSets.white] - The optional white list rules.
     * @param {Object} [configuration.ruleSets.black] - The optional black list rules.
     * @returns {Object} The properties identified for a partial or full match.
     */
    findMatchOnWhiteList = function(userAgent, configuration) {
        var operatingSystems = configuration.definitions.operatingSystems,
            list = configuration.ruleSets.white || {},
            osMatch = findMatch(userAgent, list, operatingSystems),
            browserMatch,
            browsers,
            result = {};

        if (osMatch) {
            result.allowed = true;
            result.preferredBrowser = operatingSystems[osMatch.name].preferredBrowser;

            if (!osMatch.inRange) {
                result.code = Core.DeviceDetectionCodes.GREY_OS_VERSION;
                return result;
            }

            browsers = list[osMatch.name].browsers;
            browserMatch = findMatch(userAgent, browsers || {}, configuration.definitions.browsers);

            if (!browsers) {
                result.code = Core.DeviceDetectionCodes.WHITE;
            }
            else if (browserMatch) {
                if (!browserMatch.inRange) {
                    result.code = Core.DeviceDetectionCodes.GREY_BROWSER_VERSION;
                }
                else {
                    result.code = Core.DeviceDetectionCodes.WHITE;
                }
            }
            else {
                result.code = Core.DeviceDetectionCodes.GREY_BROWSER;
            }
        }

        return result;
    };

    /**
     * Tries to find a match for the user agent in the black list.
     *
     * @private
     * @static
     * @param {string} userAgent - The user agent string.
     * @param {Object} configuration - The device detection configuration.
     * @param {Object} configuration.definitions - The OS and browser definitions.
     * @param {Object} configuration.definitions.operatingSystems - The OS definitions.
     * @param {Object} configuration.definitions.browsers - The browser definitions.
     * @param {Object} configuration.ruleSets - The rule sets containing the white and black lists.
     * @param {Object} [configuration.ruleSets.white] - The optional white list rules.
     * @param {Object} [configuration.ruleSets.black] - The optional black list rules.
     * @returns {Object} The properties identified for a partial or full match.
     */
    findMatchOnBlackList = function(userAgent, configuration) {
        var operatingSystem = configuration.definitions.operatingSystems,
            list = configuration.ruleSets.black || {},
            osMatch = findMatch(userAgent, list, operatingSystem),
            os,
            browsers,
            browserMatch,
            browser,
            result = {};

        if (osMatch && osMatch.inRange) {
            os = list[osMatch.name];
            browsers = os.browsers;

            browserMatch = findMatch(userAgent, browsers || {}, configuration.definitions.browsers);

            if (browserMatch && browserMatch.inRange) {
                browser = browsers[browserMatch.name];

                result.preferredBrowser = operatingSystem[osMatch.name].preferredBrowser;
                result.allowed = false;

                if (!browser.version) {
                    result.code = Core.DeviceDetectionCodes.BLACK_BROWSER;
                }
                else {
                    result.code = Core.DeviceDetectionCodes.BLACK_BROWSER_VERSION;
                }
            }
            else if (!os.version) {
                result.allowed = false;
                result.code = Core.DeviceDetectionCodes.BLACK_OS;
            }
            else if (!browsers) {
                result.allowed = false;
                result.code = Core.DeviceDetectionCodes.BLACK_OS_VERSION;
            }
        }

        return result;
    };

    /**
     * Validates the OS and browser combination listed in the user agent against
     * the provided device detection configuration.
     *
     * @private
     * @static
     * @param {string} userAgent - The user agent string.
     * @param {Object} configuration - The device detection configuration.
     * @param {Object} configuration.definitions - The OS and browser definitions.
     * @param {Object} configuration.definitions.operatingSystems - The OS definitions.
     * @param {Object} configuration.definitions.browsers - The browser definitions.
     * @param {Object} configuration.ruleSets - The rule sets containing the white and black lists.
     * @param {Object} [configuration.ruleSets.white] - The optional white list rules.
     * @param {Object} [configuration.ruleSets.black] - The optional black list rules.
     * @returns {DeviceDetectionValidationResult} The result of the validation.
     */
    validateCombination = function(userAgent, configuration) {
        var deviceDetectionDisabled = Resources.readData("disableDeviceDetection"),
            result = {
                preferredBrowser: null,
                allowed: true,
                code: Core.DeviceDetectionCodes.GREY_OS
            };

        if (!deviceDetectionDisabled) {
            Sys.applyProperties(result, findMatchOnWhiteList(userAgent, configuration));
            Sys.applyProperties(result, findMatchOnBlackList(userAgent, configuration));

            return result;
        }

        return {
            preferredBrowser: null,
            allowed: true,
            code: Core.DeviceDetectionCodes.WHITE
        };
    };

    return {

        /**
         * Validates the OS and browser combination listed in the user agent against
         * the provided device detection configuration.
         *
         * @static
         * @memberof Core.DeviceDetectionService
         * @param {string} userAgent - The user agent string.
         * @param {Object} configuration - The device detection configuration.
         * @param {Object} configuration.definitions - The OS and browser definitions.
         * @param {Object} configuration.definitions.operatingSystems - The OS definitions.
         * @param {Object} configuration.definitions.browsers - The browser definitions.
         * @param {Object} configuration.ruleSets - The rule sets containing the white and black lists.
         * @param {Object} [configuration.ruleSets.white] - The optional white list rules.
         * @param {Object} [configuration.ruleSets.black] - The optional black list rules.
         * @returns {DeviceDetectionValidationResult} The result of the validation.
         */
        validate: function(userAgent, configuration) {
            if (typeof userAgent !== "string") {
                throw new Error("Could not validate the device since the user agent was not a string");
            }

            if (!Sys.isObj(configuration)) {
                throw new Error("Could not validate the device since the configuration was not an object");
            }

            return validateCombination(userAgent, configuration);
        }
    };
}());
/* global Sys, Core */
Sys.ns("Core");

Core._DeviceDetectionUtils = (function() {
    return {

        /**
         * Checks if a string is a valid version number.
         *
         * @static
         * @param {string} version The version number.
         * @returns {boolean} Whether or not the string is a valid version number.
         */
        isVersionNumber: function(version) {
            return (/^\d+(\.\d+){0,2}$/).test(version);
        },

        /**
         * Compares the two versions for order.
         *
         * @static
         * @param {string} a The first object to be compared.
         * @param {string} b The second object to be compared.
         * @throws {Error} Throws an error if any of the versions are invalid.
         * @returns {number} A negative integer, zero, or a positive integer as the first argument is less than, equal to, or greater than the second.
         */
        compareVersions: function(a, b) {
            var i,
                aPart,
                bPart,
                aParts,
                bParts;

            if (!Core._DeviceDetectionUtils.isVersionNumber(a) || !Core._DeviceDetectionUtils.isVersionNumber(b)) {
                throw new Error("The versions provided are not valid versions");
            }

            aParts = a.split(".").map(parseFloat);
            bParts = b.split(".").map(parseFloat);

            while (aParts.length < bParts.length) {
                aParts.push(0.0);
            }

            while (bParts.length < aParts.length) {
                bParts.push(0.0);
            }

            for (i = 0; i < aParts.length; i++) {
                aPart = aParts[i];
                bPart = bParts[i];
                if (aPart === bPart) {
                    continue;
                }
                return aPart < bPart ? -1 : 1;
            }

            return 0;
        },

        /**
         * Checks if a version is in range.
         *
         * @static
         * @param {string} version - The actual version.
         * @param {string} [min] - The minimum allowed version.
         * @param {string} [max] - The maximum allowed version.
         * @returns {boolean} - Whether or not the version is within the range.
         */
        isInRange: function(version, min, max) {
            var aboveOrEqToMin = true,
                belowOrEqToMax = true;

            if (min && Core._DeviceDetectionUtils.compareVersions(version, min) < 0) {
                aboveOrEqToMin = false;
            }

            if (max && Core._DeviceDetectionUtils.compareVersions(version, max) > 0) {
                belowOrEqToMax = false;
            }

            return aboveOrEqToMin && belowOrEqToMax;
        }
    };
}());
/* global Sys */
Sys.ns("Sys.utils");

/**
 * A collection of XML utility functions.
 *
 * @class Sys.utils.XMLHelper
 * @static
 */
Sys.utils.XMLHelper = {

    /**
     * Gets the text value of the first node occurrence with the specified nodeName. Searches the rootNode recursively.
     *
     * @static
     * @param {string} nodeName The name of the node.
     * @param {Document} rootNode The node to start the search from.
     * @returns {?string} The with value or null.
     */
    getNodeValue: function(nodeName, rootNode) {
        var result;

        if (rootNode.getElementsByTagName) {
            result = rootNode.getElementsByTagName(nodeName);

            if (result.length > 0) {
                return result[0].textContent;
            }
        }

        return null;
    },

    /**
     * Searches the specified rootNode for the first occurrence of a node with the specified name and returns it.
     *
     * @static
     * @param {string} nodeName The name of the node.
     * @param {Document} rootNode The node to start the search from.
     * @returns {?Element} The first node with the specified name or null.
     */
    findNode: function(nodeName, rootNode) {
        var result;

        if (rootNode.getElementsByTagName) {
            result = rootNode.getElementsByTagName(nodeName);

            if (result.length > 0) {
                return result[0];
            }
        }

        return null;
    },

    /**
     * Searches the specified rootNode for all occurrence of nodes with the specified name and returns an array.
     *
     * @static
     * @param {string} nodeName The name of the node.
     * @param {Document} rootNode The node to start the search from.
     * @returns {Element[]} An array of all found node occurrences.
     */
    findAll: function(nodeName, rootNode) {
        if (!Sys.isEmpty(rootNode) && rootNode.getElementsByTagName) {
            return rootNode.getElementsByTagName(nodeName);
        }

        return [];
    },

    /**
     * Returns the value of the specified attribute.
     *
     * @static
     * @param {string} attributeName The name of the desired attribute.
     * @param {Element} rootNode The node whose attribute we want to get.
     * @returns {?string} The attribute value or null.
     */
    getAttributeValue: function(attributeName, rootNode) {
        if (rootNode.attributes && rootNode.hasAttribute(attributeName)) {
            return rootNode.attributes.getNamedItem(attributeName).value;
        }

        return null;
    },

    /**
     * Parses an XML element tree recursively into JSON.
     *
     * @example
     * An XML element is represented in JSON as:
     *
     *     <country name="sweden">
     *     <city>Stockholm</city>
     *     <city>Gothenburg</city>
     *     </country>
     *
     *     {
     *        tag : "country",
     *        attributes : {
     *            "name" : "sweden"
     *        },
     *        children : [
     *            {
     *                tag : "city",
     *                text : "stockholm"
     *            },
     *            {
     *                tag : "city",
     *                text : "gothenburg"
     *            }
     *         ]
     *        }
     *
     * @static
     * @param {Element} root The root element.
     * @returns {Object} JSON object.
     */
    toJSON: function(root) {
        var json = {
                tag: root.nodeName
            },
            child,
            attr,
            i,
            len;

        if (root.hasChildNodes()) {
            json.children = [];

            for (i = 0, len = root.childNodes.length; i < len; i++) {
                child = root.childNodes.item(i);

                // if the childnode is an XML element (type 1)
                if (child.nodeType === 1) {
                    json.children.push(this.toJSON(child));
                }
                // if childnode is a textnode
                else if (child.nodeType === 3) {
                    json.text = child.nodeValue.replace(/^\s+|\s+$/g, "");
                }
            }
        }

        if (root.attributes) {
            json.attributes = {};

            for (i = 0, len = root.attributes.length; i < len; i++) {
                attr = root.attributes[i];

                json.attributes[attr.nodeName] = attr.nodeValue;
            }
        }

        json.find = this.findNodeInJSON;
        json.findAll = this.findAllNodesInJSON;

        return json;
    },

    /**
     * Helper method for XML that has been converted to XML.
     *
     * @private
     * @param {string} nodeName Name of the node to search for.
     * @returns {*|null} Node or null.
     */
    findNodeInJSON: function(nodeName) {
        return Sys.find(this.children, function(child) {
            return child.tag === nodeName;
        }) || null;
    },

    /**
     * Helper method for XML that has been converted to XML.
     *
     * @private
     * @param {string} nodeName Name of the node to search for.
     * @returns {Array} Array containing found nodes.
     */
    findAllNodesInJSON: function(nodeName) {
        return this.children.filter(function(child) {
            return child.tag === nodeName;
        });
    },

    /**
     * Setup the money format from the first matching currency in the xml structure.
     *
     * @static
     * @param {Document} xml The xml data.
     * @param {string} currency The currency to setup the format for.
     * @returns {?Object} The object containing the formatting information.
     */
    getMoneyFormatFromXML: function(xml, currency) {
        var nodes = this.findAll("moneyformat", xml),
            currentCurrency,
            len,
            i;

        for (i = 0, len = nodes.length; i < len; i++) {
            currentCurrency = this.getNodeValue("iso", nodes[i]);

            if (currentCurrency === currency) {
                return this.getMoneyFormatFromNode(nodes[i]);
            }
        }

        return null;
    },

    /**
     * Setup the money formatting information from the provided xml structure.
     *
     * @example
     *     <moneyformat>
     *         <dividers thousands="," decimal="."/>
     *         <strings>
     *             <curchar after="false">€</curchar>
     *             <centchar usecent="false" after="false">c</centchar>
     *         </strings>
     *         <iso>EUR</iso>
     *         <decimals>2</decimals>
     *     </moneyformat>
     *
     * @static
     * @param {Document} xmlNode The xml node containing the money format information.
     * @returns {Object} The object containing the formatting information.
     */
    getMoneyFormatFromNode: function(xmlNode) {
        var dividersNode = this.findNode("dividers", xmlNode),
            thousandsDivider = this.getAttributeValue("thousands", dividersNode),
            decimalDivider = this.getAttributeValue("decimal", dividersNode),
            currCharNode = this.findNode("curchar", xmlNode),
            currencyChar = currCharNode.textContent,
            isCurrCharAfter = this.getAttributeValue("after", currCharNode) === "true",
            iso = this.findNode("iso", xmlNode).textContent;

        return {
            thousandsDivider: thousandsDivider,
            decimalDivider: decimalDivider,
            currencyChar: currencyChar,
            isCurrCharAfter: isCurrCharAfter,
            iso: iso
        };
    }
};
/* global Sys, Loader, Resources, Utils, Platform, Services, Language */
Sys.ns("Loader");

/**
 * The Resource Handler.
 *
 * Handles the loading of the game resources.
 *
 * @class Loader.ResourceHandler
 * @extends Sys.Observable
 */
Loader.ResourceHandler = {

    /**
     * Determines which integration type is used
     */
    INTEGRATION: "standard",

    /**
     * A callback that will trigger on progress update.
     *
     * @cfg {Function} callback
     */

    /**
     * @param {Object} config The config object.
     * @returns {void}
     */
    constructor: function(config) {
        config = config || {};

        Loader.ResourceHandler.superclass.constructor.call(this, config);

        this.setupData(config);

        this.setupEvents();

        if (typeof config.callback === "function") {
            this.progressCallback = config.callback;
        }

        this.setLanguageOfHtmlTag(Resources.readData("queryData").lang);
    },

    /**
     * Sets up the initial data.
     *
     * @private
     * @param {Object} config The config.
     * @returns {void}
     */
    setupData: function(config) {
        var URLParameters = Sys.utils.qsToObj(window.location.search);

        this.data = {};

        this.storeData("callback", config.callback);
        this.storeData("scriptFiles", []);
        this.storeData("cssFiles", []);
        this.storeData("totalSize", 0);
        this.storeData("scriptsAppended", false);
        this.storeData("resourcesLoaded", false);
        this.storeData("animationComplete", false);
        this.storeData("deviceListPath", {
            fallbackPath: URLParameters.staticsharedurl
        });
        this.storeData("detectionComplete", false);
        this.storeData("allConfirmDialogsClosed", false);
        this.storeData("loaderCompleted", false);
        this.storeData("soundDecoded", !Utils.Platform.isWebAudioAPISupported());

        Resources.storeData("queryData", URLParameters);

        Resources.storeData("extraParams", {
            wantsfreerounds: true,
            freeroundmode: false,
            wantsreels: true
        });

        Resources.storeData("language", {
            defaultLang: "en",
            lang: URLParameters.lang
        });
    },

    /**
     * Set up the event handlers.
     *
     * @returns {void}
     */
    setupEvents: function() {
        this.on({
            "notify:loader.animationComplete": this.onLoaderAnimationComplete,
            "notify:gcmProxy.animationComplete": this.onLoaderAnimationComplete,

            "notify:loader.confirmDialogClosed": this.onRequestedConfirmDialogsClosed,

            // @deprecated 8.0.0. Remove these as userAgentManager is deprecated itself.
            "notify:userAgentManager.loadDialogConfirmed": this.onRequestedConfirmDialogsClosed,
            // @deprecated 8.0.0. Remove these as userAgentManager is deprecated itself.
            "notify:userAgentManager.requestedConfirmDialogsClosed": this.onRequestedConfirmDialogsClosed,
            // @deprecated 8.0.0. Remove these as userAgentManager is deprecated itself.
            "notify:userAgentManager.deviceDetectionFinished": this.onDetectionComplete,

            "notify:deviceDetector.validationComplete": this.onDetectionComplete,
            "notify:deviceDetector.finished": this.onRequestedConfirmDialogsClosed
        });
    },

    /**
     * Forwards the loader progress to the modules that visualize it.
     *
     * @private
     * @param {number} value The percentage value (0-100).
     * @returns {void}
     */
    progressCallback: function(value) {
        this.fireEvent("request:loader.updateProgress", value);
        this.fireEvent("request:gcmProxy.updateProgress", value);
    },

    /**
     * Load all the files needed for the loader, i.e. preload.
     *
     * @example
     * 1. Game init
     * 2. Load the resources.xml file
     * 3. Load the prioritized resources
     *
     * @returns {void}
     */
    preLoad: function() {
        var me = this,
            deferred = new Sys.Deferred(),
            sessionIDDeferred,
            initializationMethod;

        this.fireEvent("request:loader.show");
        this.storeData("startTime", Date.now());
        this.isDeviceDetectionDisabled();

        sessionIDDeferred = this.determineSessionID();

        // If we have a deferred to get the session, use it before we move to game server init
        if (sessionIDDeferred) {
            initializationMethod = deferred
                .when(sessionIDDeferred)
                .then(function() {
                    return me.gameServerInit();
                });
        }
        // If we have the session already move to game server init
        else {
            this.determinePluginURL();
            this.determineLobbyURL();

            initializationMethod = deferred
                .when(this.gameServerInit());
        }

        initializationMethod
            .then(function() {
                return me.loadResourcesXML();
            })
            .then(function() {
                me.addDynamicPriorityResources();
                return me.loadResources("priorityList");
            })
            .done(function() {
                me.fireEvent("notify:resourceHandler.priorityListComplete");
            });
    },

    /**
     * Load resources specified in resources.xml.
     *
     * @private
     * @returns {void}
     */
    load: function() {
        var me = this,
            deferred = new Sys.Deferred();

        this.addPlatformSpecificResourcesToGenericList();

        deferred
            .when(this.loadResources("genericList"))
            .fail(function(response) {
                me.fireEvent("request:loaderErrorHandler.handleRequestError", response);
            })
            .done(function() {
                me.storeData("loaderCompleted", true);
                me.onLoaderComplete();
            });
    },

    /**
     * Checks if we should disable device detection by game inclusion query parameter.
     *
     * @private
     * @returns {void}
     */
    isDeviceDetectionDisabled: function() {
        var queryData = Resources.readData("queryData");

        if (typeof queryData.disableDeviceDetection === "boolean") {
            Resources.storeData("disableDeviceDetection", queryData.disableDeviceDetection);
        }
    },

    /**
     * Determine the Session ID.
     *
     * @private
     * @returns {?Sys.Deferred} Sys.Deferred.
     */
    determineSessionID: function() {
        var queryData = Resources.readData("queryData"),
            callbackURL = queryData.callbackurl,
            sessionID = queryData.sessId,
            integration = queryData.integration;

        if (Sys.isDefined(callbackURL) && Sys.isDefined(integration)) {
            return this.performServletCall(callbackURL, integration);
        }
        else if (!Sys.isDefined(sessionID)) {
            Sys.utils.goToLobby("1");
        }

        this.storeSessionID(sessionID);

        return null;
    },

    /**
     * Determines the plugin URL.
     *
     * @private
     * @returns {void}
     */
    determinePluginURL: function() {
        var queryData = Resources.readData("queryData");

        if (Sys.isDefined(queryData.pluginURL)) {
            Resources.storeData("pluginURL", queryData.pluginURL);
        }
    },

    /**
     * Determines the lobby URL based on the input provided.
     *
     * @example
     * storeLobbyURL("http://www.google.com/");
     *
     * 
     * // Prints: http://www.google.com/
     *
     * @example
     * storeLobbyURL();
     *
     * 
     * // Prints the value of the lobbyUrl parameter in the query string or undefined if there is none.
     *
     * @private
     * @param {string?} [lobbyURL] The lobby url.
     * @returns {void}
     */
    determineLobbyURL: function(lobbyURL) {
        var queryData = Resources.readData("queryData");

        if (Sys.isDefined(lobbyURL)) {
            Resources.storeData("lobbyUrl", lobbyURL);
        }
        else if (Sys.isDefined(queryData.lobbyURL)) {
            Resources.storeData("lobbyUrl", queryData.lobbyURL);
        }
    },

    /**
     * Perform the servlet call.
     *
     * @private
     * @param {string} servletURL The URL to the servlet.
     * @param {string} integration The type of integration.
     * @returns {Sys.Deferred} Sys.Deferred.
     */
    performServletCall: function(servletURL, integration) {
        var me = this,
            deferred = new Sys.Deferred();

        if (integration === this.INTEGRATION) {
            deferred
                .when(Sys.utils.httpGet({
                    url: servletURL,
                    useCredentials: true
                }))
                .fail(function() {
                    Sys.utils.goToLobby("1");
                })
                .done(function(response) {
                    me.handleServletResponse(response);
                });
        }
        else {
            Sys.utils.goToLobby("1");
        }

        return deferred;
    },

    /**
     * Handle the response from the servlet.
     *
     * @private
     * @param {Object} response The server response.
     * @returns {void}
     */
    handleServletResponse: function(response) {
        var parsedResponse = Sys.utils.parseQueryString(response.responseText),
            sessionID = parsedResponse.playerSessionId,
            pluginURL = parsedResponse.pluginURL,
            lobbyURL = parsedResponse.lobbyURL;

        if (!Sys.isDefined(sessionID)) {
            Sys.utils.goToLobby("1");
        }
        else {
            this.storeSessionID(decodeURIComponent(sessionID));
        }

        if (Sys.isDefined(pluginURL)) {
            Resources.storeData("pluginURL", decodeURIComponent(pluginURL));
        }
        else {
            this.determinePluginURL();
        }

        this.determineLobbyURL(lobbyURL);
    },

    /**
     * Store the Session ID.
     *
     * @param {string} sessionID Session id.
     * @returns {void}
     */
    storeSessionID: function(sessionID) {
        this.storeData("sessionID", sessionID);
        Resources.storeData("sessionID", sessionID);
    },

    /**
     * When device detection is done, check if we can start loading.
     *
     * @private
     * @param {boolean} deviceAllowed If the detected device is allowed to play the game.
     * @returns {void}
     */
    onDetectionComplete: function(deviceAllowed) {
        if (deviceAllowed) {
            this.storeData("detectionComplete", true);
            this.load();
        }
    },

    /**
     * When requested confirm dialogs are closed.
     *
     * @private
     * @returns {void}
     */
    onRequestedConfirmDialogsClosed: function() {
        this.storeData("allConfirmDialogsClosed", true);

        if (this.readData("loaderCompleted")) {
            this.initGameIfPossible();
        }
    },

    /**
     * Goes through the Platform.resourceBundle and adds any used dynamically loaded resources to the generic list.
     *
     * @private
     * @returns {void}
     */
    addPlatformSpecificResourcesToGenericList: function() {
        var genericList = this.readData("genericList"),
            dynamicallyLoadedResources = this.readData("dynamicallyLoadedResources"),
            totalSize = this.readData("totalSize");

        Platform.PlatformManager.determineResourceBundle();

        Sys.iterate(Platform.resourceBundle.loaderResourceKeys, function(resourceType, resourceKey) {
            var resource = dynamicallyLoadedResources[resourceType][resourceKey];

            if (resource) {
                genericList.push(resource);
                totalSize += resource.size;
            }
        });

        this.storeData("genericList", genericList);
        this.storeData("totalSize", totalSize);
    },

    /**
     * @private
     * @returns {void}
     */
    addDynamicPriorityResources: function() {
        var priorityList = this.readData("priorityList"),
            resourcesToLoad = this.readData("priorityDynamicallyLoadedResources"),
            totalSize = this.readData("totalSize");

        Platform.PlatformManager.determineResourceBundle();

        Sys.iterate(Platform.resourceBundle.loaderResourceKeys, function(resourceType, resourceKey) {
            var resource = resourcesToLoad[resourceType] && resourcesToLoad[resourceType][resourceKey];

            if (resource) {
                priorityList.push(resource);
                totalSize += resource.size;
            }
        });

        this.storeData("priorityList", priorityList);
        this.storeData("totalSize", totalSize);
    },

    /**
     * Makes the game server init request.
     *
     * @private
     * @returns {Sys.Deferred} Sys.Deferred.
     */
    gameServerInit: function() {
        var me = this,
            deferred = new Sys.Deferred();

        return deferred
            .when(Sys.utils.httpGet({
                url: this.createInitQuery().getQuery()
            }))
            .fail(function(response) {
                me.fireEvent("request:loaderErrorHandler.handleRequestError", response);
            })
            .done(function(response) {
                me.gameServerInitComplete(response);
            });
    },

    /**
     * Fetches and parses resources.
     *
     * @private
     * @returns {Sys.Deferred} Sys.Deferred.
     */
    loadResourcesXML: function() {
        var me = this,
            deferred = new Sys.Deferred();

        return deferred
            .when(Sys.utils.httpGet({
                url: "resources.xml"
            }))
            .fail(function(response) {
                me.fireEvent("request:loaderErrorHandler.handleRequestError", response);
            })
            .done(function(response) {
                me.parseResourceXml(response);
            });
    },

    /**
     * Takes a list of resources and creates a chain of deferreds, a callback function
     * (specific for every resource type) will be called for each resource.
     *
     * @private
     * @param {string} listName The name of the resources list to be loaded.
     * @returns {Sys.Deferred} Sys.Deferred.
     */
    loadResources: function(listName) {
        var me = this,
            resources = this.readData(listName),
            parentDef = new Sys.Deferred(),
            defArr = [],
            resourceObj = this.readData("resources") || {};

        resources.forEach(function(resource) {
            // If audio should be pre-loaded, switch type to "preloadAudio" to trigger the correct callback, for every thing else use the specified type
            var type = resource.type,
                url = me.getPathFromName(resource),
                deferred = new Sys.Deferred(),
                responseType = type === "audio" ? "arraybuffer" : undefined,
                callback;

            // Defined callback only for generic lists, wrap it to preserve scope.
            if (listName === "genericList") {
                callback = function(event, name) {
                    me.onProgressCallback(event, name);
                };
            }

            // Add the css file to the list so that the order of the css files follows the order in resources.xml
            if (type === "css") {
                me.cssComplete("", resource.name, resource.url);
            }

            deferred
                .when(Sys.utils.httpGet({
                    url: url,
                    name: resource.name,
                    onProgressCallback: callback,
                    responseType: responseType
                }))
                .fallback(function(response) {
                    return me.onLoadResourceError(response, resource);
                })
                .done(function(response) {
                    var parsingFunction = me[type + "Complete"];

                    if (Sys.isDefined(parsingFunction)) {
                        // The css parsingFunction has already been executed
                        if (type !== "css") {
                            parsingFunction.call(me, response, resource.name, resource.url);
                        }
                    }
                    else {
                        Resources.storeData(resource.name + "Response", response);
                    }
                });

            resourceObj[resource.name] = 0;

            defArr.push(deferred);
        });

        this.storeData("resources", resourceObj);

        parentDef.when(defArr);

        return parentDef;
    },

    /**
     * The handler for error when loading files from resources.xml.
     *
     * @private
     * @param {Object} response The response from the request.
     * @param {Object} resource The resource object.
     * @returns {Sys.Deferred} Sys.Deferred.
     */
    onLoadResourceError: function(response, resource) {
        var me = this,
            language = Resources.readData("language"),
            validName = (resource.name === "languageJSON" || resource.name === "languageXML"),
            url;

        // If we got an error when trying to load a language that was not the default language.
        // This might be caused by faulty language code or that a code for a unsupported languge was provided)
        // Try to fetch the default language
        if (validName && language.lang !== language.defaultLang) {
            url = this.getLanguagePath(language.defaultLang, resource.type, resource.url);

            // set the language to the default language so that other components don't need to try and use the original
            language.lang = language.defaultLang;

            return Sys.utils.httpGet({
                url: url,
                name: resource.name
            }).fail(function(res) {
                me.fireEvent("request:loaderErrorHandler.handleRequestError", res);
            }).done(function(res) {
                me[resource.type + "Complete"](res, resource.name, resource.url);
            });
        }

        // else fire event to error manager
        this.fireEvent("request:loaderErrorHandler.handleRequestError", response);

        return undefined;
    },

    /**
     * The method call on the XMLHttpRequest progress event for each resource in the generic list.
     *
     * @param {Object} event The XMLHttpRequest event object.
     * @param {string} name The name of the resource loading.
     * @returns {void}
     */
    onProgressCallback: function(event, name) {
        var resourceObj = this.readData("resources");

        resourceObj[name] = event.loaded;
        this.calculatePercentage();
        this.checkLoadSpeed();
    },

    /**
     * Calculate the total percentage downloaded.
     *
     * Is calculated on each progress event.
     *
     * @private
     * @returns {void}
     */
    calculatePercentage: function() {
        var resourceObj = this.readData("resources"),
            totalSize = this.readData("totalSize"),
            totalDownloaded = 0,
            percentageLoaded;

        Object.keys(resourceObj).forEach(function(key) {
            totalDownloaded += resourceObj[key];
        });

        percentageLoaded = parseInt(Math.min((totalDownloaded / totalSize) * 100, 100), 10);

        this.storeData("percentageLoaded", percentageLoaded);
        this.progressCallback(percentageLoaded);
    },

    /**
     * Checks if the user should be shown the slow loading message.
     *
     * @private
     * @returns {void}
     */
    checkLoadSpeed: function() {
        var startTime = this.readData("startTime"),
            totalSize = this.readData("totalSize"),
            status = this.readData("status"),

            // The standard break point is at 60 sec for roughly 2.5mb
            breakPointTime = (60000 / 2500000) * totalSize;

        if (status !== "slow" && (Date.now() - startTime > breakPointTime)) {
            this.slownessDetected();
        }
    },

    /**
     * Request the "slow loading"-dialog to be shown.
     *
     * @protected
     * @returns {void}
     */
    slownessDetected: function() {
        var dialogConfig = {
            texts: [
                Services.languageManager.hasText(Language.Keys.loadingTakesLonger) ? Services.languageManager.getText(Language.Keys.loadingTakesLonger) : "Loading the game is taking longer than usual."
            ],
            buttons: [
                {
                    action: function() {
                        Sys.utils.goToLobby("9");
                    },
                    label: Services.languageManager.hasText(Language.Keys.btn_casino) ? Services.languageManager.getText(Language.Keys.btn_casino) : "Home",
                    scope: this
                },
                {
                    action: function() {
                        Sys.utils.reload();
                    },
                    label: Services.languageManager.hasText(Language.Keys.btn_reload) ? Services.languageManager.getText(Language.Keys.btn_reload) : "Reload",
                    scope: this
                }
            ],
            severity: "slow"
        };

        this.storeData("status", "slow");
        this.fireEvent("request:loader.showDialog", dialogConfig);
    },

    /**
     * Report that all resources have been downloaded and check if we are ready.
     *
     * @private
     * @returns {void}
     */
    onLoaderComplete: function() {
        this.progressCallback(100);
        this.storeData("resourcesLoaded", true);
        this.initGameIfPossible();
    },

    /**
     * Report the the loading animation is completed and check if we are ready.
     *
     * @private
     * @returns {void}
     */
    onLoaderAnimationComplete: function() {
        this.fireEvent("notify:resourceHandler.animationComplete");
        this.storeData("animationComplete", true);
        this.initGameIfPossible();
    },

    /**
     * If the resources is downloaded and the load animation has concluded its business we append the
     * javascript files which will init the game.
     *
     * @private
     * @returns {void}
     */
    initGameIfPossible: function() {
        if (!this.readData("scriptsAppended") && this.readData("resourcesLoaded") && this.readData("animationComplete") && this.readData("allConfirmDialogsClosed")) {
            this.fireEvent("notify:resourceHandler.gameAssetsLoaded");
            this.appendScriptFiles();
        }
    },

    /**
     * Called on a JSON-resource load complete.
     *
     * @private
     * @param {Object} response The game server init response.
     * @returns {void}
     */
    gameServerInitComplete: function(response) {
        Resources.storeData("gameServerInitResponse", Sys.utils.qsToObj(response.responseText));
        Resources.storeData("gameServerInitResponseObject", Sys.utils.parseQueryString(response.responseText, true));
        Resources.storeData("unParsedGameServerInitResponse", response.responseText);
        Resources.storeData("historyUrl", this.buildHistoryUrl());
    },

    /**
     * Called on a JSON-resource load complete.
     *
     * @param {Object} response The response.
     * @param {string} name The name.
     * @returns {void}
     */
    jsonComplete: function(response, name) {
        Resources.storeData(name, JSON.parse(response.responseText));
    },

    /**
     * Called when a priority audio json has been loaded. Determines if it should be stored for later load or pushed
     * to the generic list for preloading.
     *
     * @param {Object} response The XMLHTTPRequest object.
     * @param {string} name The the name of the resource.
     * @returns {void}
     */
    priorityAudioJsonComplete: function(response, name) {
        var parsedResponse = JSON.parse(response.responseText);

        // If this platform supports preloading of sound, add sound to generic list for loading
        if (Platform.resourceBundle.preloadAudio) {
            this.addAudioToGenericList(parsedResponse);
        }

        Resources.storeData(name, parsedResponse);
    },

    /**
     * Parse an audio json and pushes the individual resources to generic list for loading.
     *
     * @private
     * @param {Object} parsedResponse The parsed json object.
     * @returns {void}
     */
    addAudioToGenericList: function(parsedResponse) {
        var files = parsedResponse.files.main,
            fileSizes = Sys.isDefined(parsedResponse.fileSizes) && Sys.isDefined(parsedResponse.fileSizes.main) ? parsedResponse.fileSizes.main : {},
            genericList = this.readData("genericList"),
            totalSize = this.readData("totalSize");

        // If files is an object with specification for several audio files
        if (Sys.isObj(files)) {
            Object.keys(files).forEach(function(name) {
                genericList.push({
                    url: files[name],
                    type: "audio",
                    name: name,
                    size: 100000,
                    loadComplete: false
                });
                totalSize += fileSizes[name] || 100000;
            });
        }
        else {
            // files is the path to an audio sprite
            genericList.push({
                url: files,
                type: "audio",
                name: "main",
                size: 100000,
                loadComplete: false
            });
            totalSize += fileSizes || 100000;
        }

        this.storeData("genericList", genericList);
        this.storeData("totalSize", totalSize);
    },

    /**
     * Callback for pre-loading audio.
     *
     * Stores the array buffers for later decoding by the audio player.
     *
     * @param {Object} response The response object.
     * @param {ArrayBuffer} response.response The audio response.
     * @param {string} name The name of the resource.
     * @returns {void}
     */
    audioComplete: function(response, name) {
        var preloadedAudio = Resources.readData("preloadedAudio") || {};

        preloadedAudio["main/" + name] = response.response;
        Resources.storeData("preloadedAudio", preloadedAudio);
    },

    /**
     * Called on xml-resource complete.
     *
     * @param {Object} response The response.
     * @param {string} name The name.
     * @returns {void}
     */
    xmlComplete: function(response, name) {
        var validName = (name === "languageJSON" || name === "languageXML");

        if (validName && !response.responseXML) {
            this.fireEvent("request:loaderErrorHandler.showTechnicalError");
            throw new Error("Unable to parse language file xml. Aborting game.");
        }

        Resources.storeData(name, response.responseXML);
    },

    /**
     * Called on css-resource complete.
     *
     * @param {Object} response The response.
     * @param {string} name The name.
     * @param {string} url The url.
     * @returns {void}
     */
    cssComplete: function(response, name, url) {
        var cssFiles = this.readData("cssFiles"),
            el = document.createElement("link");

        el.setAttribute("rel", "stylesheet");
        el.setAttribute("type", "text/css");
        el.setAttribute("href", url);

        cssFiles.push(el);
        this.storeData("cssFiles", cssFiles);
    },

    /**
     * Called on css-resource complete.
     *
     * @param {Object} response The response.
     * @param {string} name The name.
     * @param {string} url The url.
     * @returns {void}
     */
    javascriptComplete: function(response, name, url) {
        var scriptFiles = this.readData("scriptFiles"),
            el = document.createElement("script");

        el.type = "text/javascript";
        el.charset = "utf-8";
        el.src = url;

        scriptFiles.push(el);
        this.storeData("scriptFiles", scriptFiles);
    },

    /**
     * Append the downloaded script files to the header will append the main.js
     * file which will self-execute and init the game.
     *
     * @private
     * @returns {void}
     */
    appendScriptFiles: function() {
        var head = document.getElementsByTagName("head")[0];

        this.readData("cssFiles").forEach(function(file) {
            head.appendChild(file);
        });

        this.readData("scriptFiles").forEach(function(file) {
            head.appendChild(file);
        });

        this.storeData("scriptsAppended", true);
    },

    /**
     * Store the fetched audio file in Resources object.
     *
     * @private
     * @param {Object} response The response.
     * @param {string} name The name.
     * @returns {void}
     */
    preloadAudioComplete: function(response, name) {
        Resources.storeData(name, JSON.parse(response.responseText));
        Resources.processAudio(name);
    },

    /**
     * Retrieves the path to language library.
     *
     * @private
     * @param {string} languageCode Language code.
     * @param {string} type Type format.
     * @param {string} url Url to library containing files. For XML this should be the xml file.
     * @returns {string} Path to language library.
     */
    getLanguagePath: function(languageCode, type, url) {
        var toPath = null;

        if (type === "json") {
            toPath = url + this.setCorrectCasing(languageCode) + ".json";
        }
        else if (type === "xml") {
            toPath = "../langlib/" + this.setCorrectCasing(languageCode) + "/" + url;
        }

        

        return toPath;
    },

    /**
     * For resources with a "dynamic" path (that can't be spec:ed in resource xml), eg. money_format, language.
     *
     * @private
     * @param {Object} resource Resource object.
     * @returns {string} Path.
     */
    getPathFromName: function(resource) {
        var name = resource.name,
            url = resource.url,
            toPath = url,
            initResponse = Resources.readData("gameServerInitResponse");

        if (name === "languageJSON" || name === "languageXML") {
            toPath = this.getLanguagePath(Resources.readData("language").lang, resource.type, resource.url);
        }
        else if (name === "moneyformat_player") {
            toPath = "../../../currencies/" + initResponse.playercurrencyiso.toLowerCase() + "/" + url;
        }
        else if (name === "moneyformat_jackpot") {
            toPath = "../../../currencies/" + initResponse.jackpotcurrencyiso.toLowerCase() + "/" + url;
        }
        else if (name === "deviceDetection" || name === "deviceDetectionJson") {
            toPath = (initResponse.staticsharedurl || this.readData("deviceListPath").fallbackPath) + "/" + url;
        }

        return toPath;
    },

    /**
     * Set correct casing for language codes.
     *
     * @private
     * @param {string} lang The language code.
     * @returns {string} Case corrected language code.
     */
    setCorrectCasing: function(lang) {
        if (lang.match(/[a-z]{2}_[a-z]{2}/i)) {
            return lang.substr(0, 2).toLowerCase() + "_" + lang.substr(3, 2).toUpperCase();
        }

        return lang.toLowerCase();
    },

    /**
     * Specifies the available query properties for the game server init request.
     *
     * @private
     * @returns {Object} Query.
     */
    createInitQuery: function() {
        var sessionId = this.getSessionId(),
            queryData = Resources.readData("queryData"),
            extraParams = Resources.readData("extraParams");

        return {
            serverStr: queryData.server + "servlet/CasinoGameServlet;jsession=" + sessionId,
            initStr: "?action=init&sessid=" + sessionId + "&gameId=" + queryData.gameId,
            extraParams: Sys.utils.objectToQueryString(extraParams),
            noCache: "&no-cache=" + Math.round(Date.now()),
            getQuery: function() {
                var str = "",
                    key;

                for (key in this) {
                    if (this.hasOwnProperty(key) && typeof this[key] === "string") {
                        str += this[key];
                    }
                }
                return str;
            }
        };
    },

    /**
     * Get the session id to use in server request.
     *
     * Broken out to a method as we need to override this for example OpenBet.
     *
     * @protected
     * @returns {string} Session id.
     */
    getSessionId: function() {
        return Resources.readData("sessionID");
    },

    /**
     * Parses the resources.xml and sorts the entries into their respective lists.
     *
     * @private
     * @param {XMLHttpRequest} XMLRequest The request to get the resources.xml.
     * @returns {void}
     */
    parseResourceXml: function(XMLRequest) {
        var resourceJSON = Sys.utils.XMLHelper.toJSON(XMLRequest.responseXML),
            resourceSequence = resourceJSON.children[0].children,
            priorityList = [],
            genericList = [],
            dynamicallyLoadedResources = {},
            priorityDynamicallyLoadedResources = {},
            totalSize = 0;

        resourceSequence.forEach(function(sequence) {
            sequence.findAll("resource").forEach(function(resource) {
                // Arguments that are passed to load lists
                var argObj = { url: "", type: "", size: "", loadComplete: false },
                    priority,
                    resourceTag,
                    type,
                    key;

                argObj.type = resource.find("type").text;
                argObj.url = resource.find("url").text;
                argObj.size = Sys.utils.toInt(resource.find("size").text);
                argObj.name = resource.find("name").text;

                priority = resource.find("priority");
                resourceTag = resource.find("resourceTag");

                if (priority !== null) {
                    if (resourceTag !== null) {
                        type = resourceTag.find("type").text;
                        key = resourceTag.find("key").text;

                        if (!Sys.isDefined(priorityDynamicallyLoadedResources[type])) {
                            priorityDynamicallyLoadedResources[type] = {};
                        }
                        priorityDynamicallyLoadedResources[type][key] = argObj;
                    }
                    else {
                        argObj.priority = priority.text;
                        priorityList.push(argObj);
                    }

                    // ADD TO PRIORITY DYNAMIC RESOURCES
                }
                else if (resourceTag !== null) {
                    type = resourceTag.find("type").text;
                    key = resourceTag.find("key").text;

                    if (!Sys.isDefined(dynamicallyLoadedResources[type])) {
                        dynamicallyLoadedResources[type] = {};
                    }

                    dynamicallyLoadedResources[type][key] = argObj;
                }
                else {
                    genericList.push(argObj);
                    totalSize += argObj.size;
                }
            });
        });

        this.storeData("totalSize", totalSize);
        this.storeData("priorityList", priorityList);
        this.storeData("genericList", genericList);
        this.storeData("dynamicallyLoadedResources", dynamicallyLoadedResources);
        this.storeData("priorityDynamicallyLoadedResources", priorityDynamicallyLoadedResources);
    },

    /**
     * Builds the history url from the given url parameters.
     *
     * @private
     * @returns {string} History url.
     */
    buildHistoryUrl: function() {
        var queryData = Resources.readData("queryData"),
            historyUrl = queryData.server;

        if (historyUrl[historyUrl.length - 1] !== "/") {
            historyUrl += "/";
        }

        historyUrl += "game/history?lang=" + queryData.lang + "&sessionId=" + Resources.readData("sessionID");

        return historyUrl;
    },

    /**
     * The read method for the internal data handling.
     *
     * @private
     * @param {string} key The key for the data that should be returned.
     * @returns {*} The requested data.
     */
    readData: function(key) {
        return this.data[key];
    },

    /**
     * The store method for the internal data handling.
     *
     * @private
     * @param {string} key The key for the data that should be returned.
     * @param {Object} value The value that should be stored for supplied key.
     * @returns {void}
     */
    storeData: function(key, value) {
        this.data[key] = value;
    },

    /**
     * Adds lang attribute to the html tag of the document its value depends upon the language of the game.
     *
     * @private
     * @param {string} lang The lang.
     * @returns {void}
     */
    setLanguageOfHtmlTag: function(lang) {
        document.documentElement.lang = lang;
    }
};

Loader.ResourceHandler = Sys.extend(Sys.Observable, Loader.ResourceHandler, "Loader.ResourceHandler");
/* global Sys, Core */
Sys.ns("Core");

/**
 * The Loader controller
 *
 * @class Core.LoaderController
 * @extends Core.Controller
 */
Core.LoaderController = {

    MINIMUM_LOADING_TIME: 3000,

    LOADER_PERCENTAGE_STEP: 0.2,

    constructor: function() {
        Core.LoaderController.superclass.constructor.apply(this, arguments);
    },

    /**
     * @protected
     * @inheritdoc
     */
    init: function() {
        Core.LoaderController.superclass.init.apply(this, arguments);

        this.model.storeData("delayedMessages", []);
        this.model.storeData("visualPercentage", 0);
        this.model.storeData("progress", 0);
    },

    /**
     * @protected
     * @inheritdoc
     */
    setupEvents: function() {
        this.on({
            "request:loader.show": this.show,
            "request:loader.hide": this.hide,
            "request:loader.showDialog": this.showDialog,
            "request:loader.hideDialog": this.hideDialog,
            "request:loader.updateProgress": this.updateProgress,
            "notify:stateHandler.leavingBeforeLoaderCloseState": this.hide
        });
    },

    /**
     * Update loader progress. The progress value is not directly used on progress bar.
     * It is combined with the minimum loading time as well, which means that progress bar is
     * updated according to the minimum loading time if the actual loading is fast. Otherwise
     * this value is applied on the loader bar.
     *
     * @private
     * @param {number} value Progress state [0-100].
     * @returns {void}
     */
    updateProgress: function(value) {
        this.model.storeData("progress", Sys.clamp({
            value: parseFloat(value, 10) || 0,
            min: 0,
            max: 100
        }));
    },

    /**
     * This function is updating the progress bar. It is called in every 600ms by default.
     * Minimum loading time for the loader is according to the constant property; this is to
     * ensure that the loader animation of the logo is shown in it's entirety before it
     * finishes.
     *
     * @private
     * @returns {void}
     */
    tick: function() {
        var me = this,
            visualPercentage = this.model.readData("visualPercentage"),
            timePassed = Date.now() - this.startTime,
            percentagePerMs = Math.min((timePassed / (this.MINIMUM_LOADING_TIME || 1)) * 100, 100),
            presentedProgress = Math.min(percentagePerMs, this.model.readData("progress"));

        if (visualPercentage !== presentedProgress) {
            this.model.storeData("visualPercentage", presentedProgress);
            this.view.updateLoaderBar();

            if (presentedProgress >= 100) {
                clearInterval(this.tickInterval);
                setTimeout(function() {
                    me.fireEvent("notify:loader.animationComplete");
                }, this.MINIMUM_LOADING_TIME * this.LOADER_PERCENTAGE_STEP);
                this.showDialogFromQueue();
            }
        }
    },

    /**
     * Show loader and start ticker for updating the progress bar.
     *
     * @private
     * @returns {void}
     */
    show: function() {
        var me = this;

        this.startTime = Date.now();

        clearInterval(this.tickInterval);
        this.tickInterval = setInterval(function() {
            me.tick();
        }, this.MINIMUM_LOADING_TIME * this.LOADER_PERCENTAGE_STEP);

        this.view.show();
    },

    /**
     * Hide loader.
     *
     * @private
     * @returns {void}
     */
    hide: function() {
        this.view.destroy();
        this.fireEvent("notify:loader.closed");
    },

    /**
     * Request a new dialog to be shown.
     *
     * @private
     * @param {Object} config Config object.
     * @param {string} [config.severity] Severity tells loader when to show the message. Values "stopped" or "slow" will be shown immediately, the rest will be shown at the end of the loading.
     * @param {string[]} [config.texts] An array with strings to be displayed in the dialog.
     * @param {Object[]} [config.buttons] An array with button configurations.
     * @returns {void}
     */
    showDialog: function(config) {
        if (!Sys.isObj(config)) {
            throw new Error("Invalid dialog config received:", config);
        }

        if (config.severity === "stopped" || config.severity === "slow") {
            if (config.severity === "stopped") {
                clearInterval(this.tickInterval);
                this.model.storeData("error", true);
                this.model.storeData("visualPercentage", 100);
                this.view.updateLoaderBar();
            }

            this.view.showDialog(config);
        }
        else {
            this.model.storeData("delayedMessage", this.model.readData("delayedMessages").push(config));
        }
    },

    /**
     * Hide dialog.
     *
     * @private
     * @returns {void}
     */
    hideDialog: function() {
        this.fireEvent("notify:loader.confirmDialogClosed");
        this.view.hideDialog();

        if (this.model.readData("visualPercentage") === 100) {
            this.showDialogFromQueue();
        }
    },

    /**
     * Show the next dialog from the queue.
     *
     * @private
     * @returns {void}
     */
    showDialogFromQueue: function() {
        var delayedMessages = this.model.readData("delayedMessages");

        if (delayedMessages.length) {
            this.view.showDialog(delayedMessages.pop());
        }
    }
};

Core.LoaderController = Sys.extend(Core.Controller, Core.LoaderController, "Core.LoaderController");
/* global Sys, Core, Interface */
Sys.ns("Core");

/**
 * The Coins Field base view.
 *
 * @class Core.LoaderView
 * @extends Core.View
 */
Core.LoaderView = {

    ANIMATION_DELAY: 100,

    LOGO_SVG: {
        tag: "svg",
        attributes: {
            "version": "1.1",
            "viewBox": "0 0 258 92",
            "xmlns": "http://www.w3.org/2000/svg",
            "class": "logo-svg"
        },
        children: [
            {
                tag: "defs",
                attributes: {},
                children: [
                    {
                        tag: "clipPath",
                        attributes: { id: "netMask" },
                        children: [
                            {
                                tag: "rect",
                                attributes: {
                                    x: "0",
                                    y: "0",
                                    width: "135px",
                                    height: "92px"
                                },
                                children: []
                            }
                        ]
                    },
                    {
                        tag: "clipPath",
                        attributes: { id: "entMask" },
                        children: [
                            {
                                tag: "rect",
                                attributes: {
                                    x: "136",
                                    y: "0",
                                    width: "245.427px",
                                    height: "92px"
                                },
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                tag: "g",
                attributes: { id: "logo" },
                children: [
                    {
                        tag: "path",
                        attributes: {
                            "id": "line",
                            "class": "logo-svg__logo-line logo-parts-fill",
                            "d": "M 135,0 L 137.393,0 L 137.393,91.447 L 135,91.447 L 135,0 Z",
                            "shape-rendering": "crispEdges"
                        },
                        children: []
                    },
                    {
                        tag: "g",
                        attributes: { "clip-path": "url(#netMask)" },
                        children: [
                            {
                                tag: "g",
                                attributes: {
                                    "class": "logo-svg__net-wrapper"
                                },
                                children: [
                                    {
                                        tag: "path",
                                        attributes: {
                                            d: "M 31.69,51.93 L 22.25,36.651 L 10.15,17.731 L 10.032,17.542 L 0.003,17.542 L 0.003,73.621 L 11.133,73.621 L 11.133,39.151 L 19.432,52.581 L 32.78,73.621 L 42.89,73.621 L 42.89,17.541 L 31.692,17.541 L 31.692,51.93 L 31.692,51.93 M 31.692,51.93 "
                                        },
                                        children: []
                                    },
                                    {
                                        tag: "path",
                                        attributes: {
                                            d: "M 49.15,73.62 L 85.91,73.62 L 85.91,63.001 L 60.35,63.001 L 60.35,50.772 L 82.199,50.772 L 82.199,40.074 L 60.35,40.074 L 60.35,28.245 L 85.91,28.245 L 85.91,17.547 L 49.15,17.547 L 49.15,73.627 L 49.15,73.627 M 49.15,73.627 "
                                        },
                                        children: []
                                    },
                                    {
                                        tag: "path",
                                        attributes: {
                                            d: "M 90.419,28.319 L 103.268,28.319 L 103.268,73.619 L 114.468,73.619 L 114.468,28.319 L 127.237,28.319 L 127.237,17.54 L 90.418,17.54 L 90.418,28.319 L 90.418,28.319 M 90.418,28.319 "
                                        },
                                        children: []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "g",
                        attributes: { "clip-path": "url(#entMask)" },
                        children: [
                            {
                                tag: "g",
                                attributes: {
                                    "class": "logo-svg__ent-wrapper"
                                },
                                children: [
                                    {
                                        tag: "path",
                                        attributes: {
                                            d: "M 135,73.621 L 168.309,73.621 L 168.309,63.002 L 142.753,63.002 L 142.753,50.773 L 164.601,50.773 L 164.601,40.075 L 142.753,40.075 L 142.753,28.246 L 168.309,28.246 L 168.309,17.548 L 135,17.548 "
                                        },
                                        children: []
                                    },
                                    {
                                        tag: "path",
                                        attributes: {
                                            d: "M 205.6,52.02 L 196.162,36.75 L 184.064,17.83 L 183.947,17.631 L 173.92,17.631 L 173.92,73.709 L 185.039,73.709 L 185.039,39.24 L 193.339,52.669 L 206.699,73.709 L 216.809,73.709 L 216.809,17.63 L 205.61,17.63 L 205.61,52.02 L 205.61,52.02 M 205.61,52.02 "
                                        },
                                        children: []
                                    },
                                    {
                                        tag: "path",
                                        attributes: {
                                            d: "M 221.38,17.629 L 221.38,28.408 L 234.228,28.408 L 234.228,73.706 L 245.427,73.706 L 245.427,28.407 L 258.196,28.407 L 258.196,17.627 L 221.377,17.627 L 221.377,17.627 M 221.377,17.627 "
                                        },
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },

    SLOGAN_SVG: {
        tag: "svg",
        attributes: {
            "viewBox": "0 0 195.8 22.1",
            "class": "slogan-svg"
        },
        children: [
            {
                tag: "path",
                attributes: {
                    d: "M8.8 21.9h-8.8v-18.7h8.4c3.8 0 5.4 2.4 5.4 5.1 0 1.4-.7 3-2.3 3.8 1.8.9 2.6 2.8 2.6 4.3.1 2.9-1.8 5.5-5.3 5.5zm-1.3-15.4h-3.8v4.1h3.8c1.5 0 2.5-.8 2.5-2 0-1.4-.8-2.1-2.5-2.1zm.2 7.3h-4v4.8h4c1.7 0 2.5-.9 2.5-2.4 0-1.4-.9-2.4-2.5-2.4zM15.9 3.2h12.9v3.3h-9.2v4.3h7.9v3.3h-7.9v4.4h9.2v3.3h-12.9v-18.6zM39 6.5v15.4h-3.7v-15.4h-5v-3.3h13.6v3.4h-4.9zM53.8 6.5v15.4h-3.7v-15.4h-5v-3.3h13.6v3.4h-4.9zM60.2 3.2h12.9v3.3h-9.2v4.3h7.9v3.3h-7.9v4.4h9.2v3.3h-12.9v-18.6zM83.1 3.2c3.8 0 5.4 3.1 5.4 5.8 0 2-1.1 4.2-3.1 5.2l3.4 7.7h-4l-2.9-7h-3.4v7h-3.7v-18.7h8.3zm-4.6 8.3h3.8c1.7 0 2.6-1 2.6-2.5 0-1.4-.9-2.5-2.6-2.5h-3.8v5zM103.9 22.1c-3.5 0-7.2-2-7.2-6v-7c0-4 3.6-6.1 7.3-6.1 2.1 0 4.4.6 5.8 1.8l-1.8 2.9c-1.1-1-2.7-1.3-3.9-1.3-1.7 0-3.6.9-3.6 3.4v5.5c0 2.4 1.8 3.4 3.5 3.4.7 0 1.6-.1 2.4-.8v-3.1h-2.7v-3.2h6.4v7.9c-1.7 1.9-4.2 2.6-6.2 2.6zM122.5 18h-6.5l-1.2 3.9h-4l6.6-18.7h3.8l6.5 18.7h-4.1l-1.1-3.9zm-5.5-3.1h4.5l-.7-2.4-1.5-4.9h-.1l-1.4 4.9-.8 2.4zM143.4 11.8l-1.7 3.5-2.1 4h-2.7l-2.1-3.9-1.8-3.5h-.1v10.1h-3.7v-18.8h3.4l3.3 6.6 2.3 4.6h.2l2.3-4.7 3.2-6.5h3.4v18.7h-3.7v-10.1h-.2zM154.3 3.2v18.7h-3.7v-18.7h3.7zM161.1 10.1v11.8h-3.7v-18.7h3.4l4.3 6.4 3.6 5.4h.1v-11.8h3.7v18.7h-3.4l-4.8-7.1-3.1-4.7h-.1zM182.1 22.1c-3.5 0-7.2-2-7.2-6v-7c0-4 3.6-6.1 7.3-6.1 2.1 0 4.4.6 5.8 1.8l-1.8 2.9c-1.1-1-2.7-1.3-3.9-1.3-1.7 0-3.6.9-3.6 3.4v5.5c0 2.4 1.8 3.4 3.5 3.4.7 0 1.6-.1 2.4-.8v-3.1h-2.7v-3.2h6.4v7.9c-1.7 1.9-4.2 2.6-6.2 2.6zM190.2.6v3.5h-.6v-3.5h-1.2v-.6h3.1v.6h-1.3zm3.7 2.2l.5-1.1.9-1.7h.5v4.1h-.6v-2.8l-.4.8-.7 1.4h-.4l-.7-1.3-.5-.9v2.8h-.6v-4.1h.6l.9 1.7.5 1.1z"
                },
                children: []
            }

        ]
    },

    constructor: function() {
        Core.LoaderView.superclass.constructor.apply(this, arguments);

        this.timeout = null;
        this.create();
        this.show();
    },

    /**
     * Create the elements required for the loader.
     *
     * @private
     * @returns {void}
     */
    create: function() {
        this.loaderEl = document.createElement("div");
        this.loaderEl.classList.add("loader");
        document.body.appendChild(this.loaderEl);

        this.loaderInner = document.createElement("div");
        this.loaderInner.classList.add("loader__inner");
        this.loaderEl.appendChild(this.loaderInner);

        this.loaderBar = document.createElement("div");
        this.loaderBar.classList.add("loader-bar");
        this.loaderInner.appendChild(this.loaderBar);

        this.loaderBarProgress = document.createElement("div");
        this.loaderBarProgress.classList.add("loader-bar__progress");
        this.loaderBar.appendChild(this.loaderBarProgress);

        this.logoContainer = document.createElement("div");
        this.logoContainer.classList.add("logo-container");
        this.logoWrapper = this.createSVG(this.LOGO_SVG, "logo-wrapper");
        this.sloganWrapper = this.createSVG(this.SLOGAN_SVG, "slogan-wrapper");
        this.logoContainer.appendChild(this.logoWrapper);
        this.logoContainer.appendChild(this.sloganWrapper);
        this.loaderInner.appendChild(this.logoContainer);

        this.loaderDialog = this.createDialog();
        this.loaderInner.appendChild(this.loaderDialog);

        this.brandingWrapper = this.createBrandingWrapper();
        this.loaderInner.appendChild(this.brandingWrapper);
    },

    /**
     * Update the body background color once the loader is closed.
     *
     * @private
     * @returns {void}
     */
    destroy: function() {
        clearTimeout(this.timeout);
        document.body.removeChild(this.loaderEl);
    },

    /**
     * Displays the loader wrapper and the loader background.
     *
     * @private
     * @returns {void}
     */
    show: function() {
        var me = this;

        this.timeout = setTimeout(function() {
            me.logoWrapper.classList.add("logo-wrapper--animate");
            me.sloganWrapper.classList.add("slogan-wrapper--animate");
            me.brandingWrapper.classList.add("branding-wrapper--animate");
        }, this.ANIMATION_DELAY);
    },

    /**
     * Updates loader bar progress.
     *
     * @private
     * @returns {void}
     */
    updateLoaderBar: function() {
        if (this.model.readData("error")) {
            this.loaderBarProgress.classList.add("loader-bar__progress--error");
        }

        this.loaderBarProgress.style.width = this.model.readData("visualPercentage") + "%";
    },

    /**
     * Creates and returns the loader bar element.
     *
     * @private
     * @returns {HTMLElement} The loader bar element.
     */
    createLoaderBar: function() {
        var barWrapper = document.createElement("div"),
            loaderBarProgress = document.createElement("div");

        barWrapper.classList.add("loader__bar");
        loaderBarProgress.classList.add("loader__bar__progress");

        barWrapper.appendChild(loaderBarProgress);

        this.loaderBarProgress = loaderBarProgress;
        return barWrapper;
    },

    /**
     * Creates and returns the element containing the main logo SVG.
     *
     * @private
     * @param {Object} svg The svg data.
     * @param {string} className The class name for the wrapper.
     * @returns {HTMLElement} The main logo element.
     */
    createSVG: function(svg, className) {
        var element = document.createElement("div"),
            svgEl = this.createElement(svg, "http://www.w3.org/2000/svg");

        element.classList.add(className);

        element.appendChild(svgEl);

        return element;
    },

    /**
     * Creates and returns an element based on the provided configuration object and namespace.
     *
     * @private
     * @param {Object} elementConfig An object containing the element configuration.
     * @param {string} elementConfig.tag The tag type to be created, e.g. "svg", "img", "path", "div".  If not specified, null is returned.
     * @param {Object} [elementConfig.attributes] An object with key-value pairs representing the attributes for the element.
     * @param {Object[]} [elementConfig.children] An array containing one object for each child element.
     * @param {string} [namespace] The namespace to be used for the element creation, e.g "http://www.w3.org/2000/svg".
     * @returns {HTMLElement} The created element.
     */
    createElement: function(elementConfig, namespace) {
        var element,
            attr,
            childNum,
            childElement;

        if (!elementConfig.tag) {
            return null;
        }

        if (namespace) {
            element = document.createElementNS(namespace, elementConfig.tag);
        }
        else {
            element = document.createElement(elementConfig.tag);
        }

        for (attr in elementConfig.attributes) {
            if (elementConfig.attributes.hasOwnProperty(attr)) {
                element.setAttribute(attr, elementConfig.attributes[attr]);
            }
        }

        for (childNum = 0; childNum < elementConfig.children.length; childNum++) {
            childElement = this.createElement(elementConfig.children[childNum], namespace);
            element.appendChild(childElement);
        }

        return element;
    },

    /**
     * Creates and returns a dialog element.
     *
     * @private
     * @param {Object} config Config.
     * @param {string[]} [config.texts] An array with strings to be displayed in the dialog.
     * @param {Object[]} [config.buttons] An array with button configurations.
     * @returns {HTMLElement} The dialog element.
     */
    createDialog: function(config) {
        var dialog = document.createElement("div"),
            textWrapper = document.createElement("div"),
            buttonGroup = document.createElement("div"),
            txt;

        dialog.classList.add("loader-dialog");

        if (!config) {
            return dialog;
        }

        textWrapper.classList.add("loader-dialog__message");
        buttonGroup.classList.add("loader-dialog__button-group");

        (config.texts || []).map(function(text) {
            txt = document.createElement("div");
            txt.innerText = text;
            textWrapper.appendChild(txt);
        });

        (config.buttons || []).map(function(buttonCfg) {
            var button = new Interface.utils.Button(Sys.apply(buttonCfg, {
                clickCallback: buttonCfg.action
            }));

            button.enable();
            buttonGroup.appendChild(button.getContainer().getEl());
        });

        dialog.appendChild(textWrapper);
        dialog.appendChild(buttonGroup);

        return dialog;
    },

    /**
     * Displays the current dialog message from the model.
     *
     * @private
     * @param {Object} message Message object.
     * @returns {void}
     */
    showDialog: function(message) {
        var me = this,
            newDialog = this.createDialog(message);

        this.loaderInner.replaceChild(newDialog, this.loaderDialog);
        this.loaderDialog = newDialog;

        setTimeout(function() {
            me.loaderDialog.classList.add("loader-dialog--show");
            me.logoContainer.classList.add("logo-container--hidden");
            me.brandingWrapper.classList.add("branding-wrapper--hidden");
        }, this.ANIMATION_DELAY);
    },

    /**
     * Hides the dialog.
     *
     * @private
     * @returns {void}
     */
    hideDialog: function() {
        this.loaderDialog.classList.remove("loader-dialog--show");
        this.logoContainer.classList.remove("logo-container--hidden");
        this.brandingWrapper.classList.remove("branding-wrapper--hidden");
    },

    /**
     * Creates and returns the branding wrapper element.
     *
     * @private
     * @returns {HTMLElement} The wrapping element for branding content.
     */
    createBrandingWrapper: function() {
        var wrapper = document.createElement("div"),
            brandingContent = this.getBrandingContent(),
            branding = this.createElement(brandingContent,
                brandingContent.tag === "svg" ? "http://www.w3.org/2000/svg" : null
            );

        wrapper.classList.add("branding-wrapper");

        if (branding) {
            wrapper.appendChild(branding);
        }

        return wrapper;
    },

    /**
     * Returns an object with branding content. Supports img and svg content.
     *
     * @example
     * return {
     *     tag: "img",
     *     attributes: {
     *          src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAowAAADXAgMAAADti+hYAAAABGdBTUEAALGPC/xhBQAAAAxQTFRFVVRT4N/f/v7+eHh47grbSQAAAAR0Uk5Tm6f+Afjdt38AABPvSURBVHja7Z3NbyNHdsApK6OD4IAnBwj/BJ6c7G0xQAsYOKcAEmBrgtFio8sChHqAzCZBDDjATBvrIKcAmoVGHtiLcWuhj2YX4fQpc0gwbo6NzIEX52Iv2DrktBFEHkJpMWWotz/2vVdV/UVJ1MBrFgcQAVFUs0n++Op9V3Wpls7+rXbN+DoyruLNmnDSf1dOmi7jiOFtEmMPT/J1MZ4Qo3EVxs3ZZnxxzXgVRncS4+kMMKZXYbS1MrZnm/H0Sozxa8AY4Vnea8C4q5XReQ0YdyeeZupkTK7G2JxBRiP9asYYvbH8cI2t1GeL0a4mbKh+O8UAGZQtS4PNVBkblGg8rCRne1oZN8/LhRirlxnbs8TYk4wFwYXaGf1xh10Y7TnQTD5jcvxSIX7s1oX/vkWn6WVcHvOFdNtp0mibb+wZ+hnr5w91+wQkCIw3Gw8T7YzG2BFxMxbb8JRpnLC52WLs5YybI3MLGdPFX88WI6rjTq1mkm9/A8wGGCnwFCqz6TLy/MNrdaWOaM89itBR45EBjOkb2hmFG/z0vboM4Dsy2EAW0WW3kDHSzdhWAXCvLg6gL4pMkUUstJGRNEA74xoTAuwp4wCqjmCdFcbn0tsgzK6y77YIO7PC2JBphGGq0PhCMkbM+Eo/457QPqRt/nXGcpox3nyrTkmuLsZQmK8MLu6Lg8x+T8ng54HxL8F4evoZVXC5aWbxhBhPHGBcBEufAUaV6/i9rLaKkTFERpP9696PS+nR9BmhnMkiNDBuFRj57gjd94eNT7UznhQZNzPGdsp3/iQy99lmt9zZny5jjxjRZD6swd1WznhCjK6bmh82N9OFUkkxfcZN6a8HoItBJi7yPRzG27SA8VQ7Y0MZ924zM99TjIUZY6yZ0Uez3iR/XmZ0csZIM6OFUcaqMpIX4mxFMKal8lEDYyocNDy2q4x7hpSjqZfRiERwAXvZzBkDNHgOajobjLFgbApGK6trNlPuSEb809bIiOaxK+oBq6nEFbFZYnSBEasEdC9GxphQ8MsZG3oZDf6oLlJJF8W1lStBgTEotnunztg2RvPSSNrIuKfUEXRUMopaVidjXvzvYjxsK3V0FOO8ckW6GZFqi2oCOfDIhIxtQxYVuhiDrF17qrILtI1RU8QVZJynFsbpLDAKI8F7t9ZdkPkip8mEuTXqQGpkdLJHbVl87a+qFQwhPon9qY/0MsqPNosFopqNfVmX7QH3ZnGCRhMjevCP5Gy6uEn256L0/qU+xoFiORUGHRU6pAIxP6BRjlt5wEkLHXv6azQn/jDLU/FTl6OtPDgZ+CIrzCBFN6Rqzmlm3Mw9uHTeaqijP1eqGS1oZFR5TqJq/Cif44r+LDefqKmfMcx6UUIhHxopyY6xXwuZPtfPGFDXNqrLtWWA+LVsSe6CC7foTI2MCIDligdWjOk4sK0YabeRufIelTiBTkbyMTigMLjoK7trRUR4vtcWzsnVy4ge/OcL0p9DljMypRAbWIcpRkMrI6Y7jTz+jdaUI3+zAX2BXenk9TFKN5nH6Eh2x2mpBdRjJnn5FxoZ3YJTFIxvZ1kERJus+D+dxPjNOt6vrv8AjO20kJEh45yU4r812KfwbCDZSoyJA2WOSoHTgS0C1GPyYev4eB9TKRMeDyzKQmmNjhuDf3uJUqEX4jsE8FITml3MYqKZfL8jn6kyvlDqV1eID6mnWzNdap2dy+jnjJ7IP0XnyKXHNsWFjmDsFBjpOa5IAngp6FIMhBMYGzmizCLsBjIaTRde3lZ93TKjlzGajkw8rYQYE5HIITUxBm7OiOdhX1OShPAubCJjJ4t/OeIv0FaIEfjMtqoby4xOxohACbNvMxDd+loH7rdN/HL7ay4xDuCP1dtsdTVGum2Twb0lGeGlED0SFxhXV9n26kWMwmT25tOvF6QqSsYa8jUvYOzkjPgQhrifBnCglQYkqAQ47gpGlBqOM/yEKFOLY8NVanSsGFP8ic9jdKTJAGJ3QeVlpkeMf4VGlMvRKjEyxRijClJ1RiZA+hkDBxz9jhgp4EtG/Bamz7HpQYw4+mBSnUsZd0XOCC2f0W0ccJMYhRwpp1SMZj5BIxgtyZi4rlAsoKN+NJqT6QtqZGRmzog+YGBz0lc4mqA5OYh6GaNHjA+/SkdkOe2FEuNyxghQm2VGXzLyDqsw4vja8ggy4mHF6KMxc1QPYsSh7+AbTZQj5GKICCGwDQO/X5djXWJsVhjBsCWjAyItMjJyfBlj7KIKSEaUcejxAyZIYnBuBx3UlIsZTWQMH8o1jz83WZtjXDHhmxKjczHjmiMZQ8/MGEkfGWlmaEvGpINeUDGSw+H78D2IEWx838VXX8YIGjcy0j8l92M/B8ZfgvCkHNfQljdunc/4fkcyBh6IL+zQQ+dcxnCM0QF5Egn4q89ddOWXMdIH19YotjhRoz16M2f8CzQaCM4jkaqXGR8wxWiD+DjGQPAs1jgjd/C8CiPYvmC0Qo+hP5jEeINysU2IKl+2wclkjDebVCyO3rpFyVmZ8T64F2G6foCRwqVAjZAVxtDhnTHGQER8uAtshnqsGF24LOscRtmL2Gww6zRntCDOPL8lssk2MX5UzimYLxjBzXgU+SwxoVxlDLxknJF3JCN8QdMqMI5dvBWhgZyYGaOdMXJipG7KmvCTYZVx4ElGC12h6MDRrE6V0QYPU2VMmGAc+APftODhZYzL2UIFmJxxJCNzFqGOAY+Uvi2TjHkYx60yY+BwaSIijUERQj7WqTIO7JiNMUIgEoy2oLwa414dkiAlR6wHu4BYU30A7JJWGMMOMQJAQka9RiHPdKuMpp+OM6bMJ0Yx0izN9bFqM5Hs3babbKeO6c8/CEa5Eim6kVcNHyVVxsQVjC5GC4L1KdcdY7TQq1cZB7Zg9ITVXGzXxAiZoTuHAM0D9gvBuMj2DbRnVWP36JTdMmPM3kfGBNMCYYDCg1sVRkairDIGDpGQ53niTmKkRkBzq2s0d3CIkXG0ZGChnZUQ2MM/yCdoZK3Anjqqi5XmWY9ZYZQXMVUZww6RQCAlLz6JERcoNHdMo+k1iXGsO7opVoVU5JgOPnZEq0gqeYXRO5fRl4yJKxgxEv5751JGUtH9n1Gh3dzlwBhTrT+/wAoLc1Na9FFlDFjG6BcZy3mPvGyjnPdgaktfLNkXWcVljG28W56XjJiuRhD8oprJyt37qDHOGBJjsA+BocxYyh85RA7IP8r5I5YIgpGqG2cS4wnppFtLoSFhkoWObhQRhT13zTHGhBjlp9KjPtkMHoEg1JGMovBReTgVgnhsQIwxE1nuBMZT5MKGCfwEFJ9FnZiN9rLUzypjLBhp9ILHyDVYhw9MB1hPW1jPHAIjjjmWBLKeQS9AQTSQjHiyN5GRFgF4xPi7fLaD1RcK3Xs8xan2AIhRWMEAKkLwOq4FtWDIfirqwm+xLkTJgQOVjJw9XhMJUygMjYmq6zJGRzHuzG02UYjzN7JrAdK50pzHOOPAkVl36ARUWZuyeqaOq6yvKQnPGEUFzqnaFYxYoNkTGcFODFxVBk29qHabFWY/yHRUStboVBkppWVU0sRMrAciNyMmRgOkGVhUzDDFmFI3lhJKwWiKLsBljDT/ZvBbJkWWiDop7tKcspXFwrrHYIwxpI+i0jAVq8AosYDHrpg6s4GRbJ5ZipEzVVBKRjKwSYwnbLmx23xYy4LfmwbNY8MKAeyyZC3mXvsqfTMrv3/5Nxefd/VbhNoasT0Y5zQPfrdUJ205KnruCYw/1E0wmsJ05zJNrMtFxHu8uISL62LE0NDYxrn+QvBr11PxV1EddTHGJKVuvRL8wFpU174w43Gqk7GQKeZgi+Vp7FTGIx2MlAyI4NcoQFpZjzx3A4kexhOKxSL4uW8XhttWa8YL+xnEGhnVInujPOd/UhlqkKw+xjALfdj0WandEOKLmpWLNaPMxKfMaBQZTTEp3BAe58vqVa/mDDDGEulELgMwy4Md6WE8RUbpCt1sLZSc2xKMBaNp6mGkINiQjNkie7Fo9KSYhetm7Em/nS0YbtBix171EueGpYVRTk3DbXs+X44gasABqwiyp5fRXaphZHGyFTW7+QUrWZvnxNDJ6Na/pqbFbjar7ZFr/3uZ6lZu02XcE4xqfeuu6rAAIy15JnPKeqOjd3UwOgXGk+L6uE3R3yPblsn9795Rcp4uo1wqAcMZzZ8ofaQLVsQidgiIK4ooX5I73dxsS8mx+9a7J9Jhk++2TkVA7NaM3OGrZezTXU9Rl4xza2z3RPoZWhVgiLWv1LjIAqeqbTTst9eTjVBxVS6JsY35ReZ0unUpX2P6jN0SI2XeSzTlxbDLp0Z5dEO6n8UdDb6nt1crMhby8GW+NC8AKZ0U22mM6hoYoeexnDPm61whRo+Ep6ypDtW7mfZOW47CUnsy5KnJJFfKMJp7J6cGvtEdQwvjpmR0l1Rh464YPxIkWVdgW13jrsGuTzNG2q+AFPK9eWlPapTd92rUtViGwKjBP8bCafdUTrbIHomP776drcUlZlya2/7HppY409wrMY6Eu+nOqUbp/pLEwS7Bnh7G7nyJUdryW9IJbdfyQNgtFmBa4kyBsStbP+5KrYQyNzOMIynD/dpYYvtCL+O+0jo5d/RonLA006WBUaQMo5pcnblSq5972sjUwpjLC6KeKS3ZuNAL6GAcqfVFinD7EkLMyTUwvpDFgZw4+tC49Gw9jD1ijFRc/pd0ZhkLEwqP6l/XZ5ExMsFdF6Pf/OwxnjK0k1oWAdlqrTZrjIGsUmq1uewyhaXabDEWJzm7WUr2qDZDjHF5t+ZcmNtLxqwwnu5VHXtNTXq5K/WuMQuMPXt8UGvZaoDVQuDRx9jYPDeQ19TyGfcdlWJoZLQuSIaibF3hvnCZ+hiblwRpla0x0eCbSUZs7d3OnNFIH+Ok/C0LQC7Tw7g3kZESdCXMHaGZ02VsX4GRnJEy80+gXKxPXY7GVeuKbAXV/rTl2DCufHomzGnLsbf8KhWkEOa05fjCfrU6F5OOacvx1HvFF4EBTVuOUfvVXzdtOearJGaVEYTYs2dejqPFdn3GGTHp3pptRhc73j+62tmh2zqbOmO0KNZRXPW23upPm5ES2KVXeMH63eNpMo7qVKOuvNKnrf9kdZqM39y+qKV8GePqVBkHWSX1Koy3/2OqjO7S6JVftP63/zRNxv+pf59XX/9vwGvGa8ZrxmvGa8ZrxmvGa8ZrxmtGDYwwyRBY6Ybcrelb3M3MtPEi2z5cg+PH4t/riNt32DeIuZVmV+HiFk7yFmc7+cPCbs7l02vVf/AZx3722EuHWOXjNen9wjtVXmALRj91aVsw2OXqpY/XenNYeng8xniEjGf08YHameHoUsZ47B/3hjlj7JQY+xczpkO4+B9nlY8DuKbPSu+l3B6G9z3EDunLZrcW3vXp4zfiTuGYfC95wxMkI7cDq8KYP4TdMIYKbCJj344/SdMhvJxz5xDev99P74kdxC5idNLjqzCGaeJfzPiTV2H0kjspnX/W5ziewNg6gz+HyBim/5vAHhDHbsLOcMeKp/9s4wu/ScUxOPW3B1ZIjLCTBUADH+cPntob+Lkx7BeTrN0xYU+G+GPftM0nfvCYr+EX4h/gZ8b/+TQ17/QHFnsGOn62AbJZQ3v47YEf4rZl+5LxHgeg4G6aHh4J7YAP/q4vhORx6x5/wOwB+4KdwZYE7CloKAIl4hicOjjw+3SIdTgoiWCEzUR8+pImfJE7zA7YfTjbAUbm0l5eaRgSI3sas08CemMbGnqw/wG8Dbz3vn8GvwJXMh6FAIQbjvzm/4lxeAh4fTHOXmK1eGi1BondAntp9bl9N0XFl8eA8Tj2D9FmEjuIP4NtyOAz+APb5MQYO8EDO7jvbfAnDrfuhvEzJ8C3IK1BRo9zewNO6KMRhNYxf0b2cBzbeGSDS8YhDixuSHB0jxhbgpFUzIv9X8HTw2EMjGF62OcgNNQyeQwY4deQGP0wPbAkow/kxGjDYzipFT/xUOnjL3z+vo/Kd5j4yGiDEwB7bfVDC9W1lT6x4b2PhqkHzx61Esl4eAivcbx1KcfYFoyk71787L8OA9YRjMyFb98nOcpjyJh6LfxC3OKWmcqx9oeCMfGTL5DRSz8HJe4IRgsZh4oxJOXqc/IkJvucWfje6b0j+OUpm+nTuXc90EfO8UP6xEjG6aVPPjhSjIFitNPvioyte4rxuMr4ABkPBSPsBFJgNJldYsR9I0K49MwzOwNkbLUGBcbwCIUGg33WPwO7Pk5LjH/3/hHaODL2SYtIUwN5jBiPvPPlCAifFeTIt4cFRqApMabfwjY7aAMv3SH6lKE3xGGUjPweMNqhL/wj+P8zcOV94cu89P+Se4FkDBWjQy5fMDroYZER9DE+8IuM4B+f5foInqnI6MG3U/pIjCCYkHxJSH6vj3u2ZPrIPbQvkCPFGVBDNLGMsQ/41l1iBMMUjBBn5LHwPjBCNEVGOwCkIiPEmftg176wazu83xF2jW8BL7grGe2NPtkMMh7Hn9n4EMMf/DpWdp0gMXMdEa85OjC7wBjjJo/AY4J/dIKn+AHgz+SxkMHbhb7yj5ZXZMR4Df7RD8g/wj6MnZD8owUUIIqhYISzgDF4CjlACO/8DP2jh28Kv8A/togxRl8QPP6NyHvAeCnvEdHJS38f42ZXwBN8kJrr/GMSAlPH7jvACFgizgSw32aBEfMeiDN+fwN254whLbjDKc4gI5wmbJVjnElbIcaZMFVxBt9UxJnWHyd/DCc835/w/OEUctz+93oetPyHZ4w734sxmfCv7v84jM73YozN9de+nvkDY53TfUssYDoAAAAASUVORK5CYII="
     *     },
     *     children: []
     * };
     *
     * @abstract
     * @returns {Object} An object with branding data.
     */
    getBrandingContent: function() {
        return {};
    }
};

Core.LoaderView = Sys.extend(Core.View, Core.LoaderView, "Core.LoaderView");
/* global Sys, Core */
Sys.ns("Core");

/**
 * The Loader
 *
 * @class Core.Loader
 * @extends Core.Module
 */
Core.Loader = {
    constructor: function() {
        Core.Loader.superclass.constructor.apply(this, arguments);
    },

    /**
     * @protected
     * @inheritdoc
     */
    getDefaultMVCClasses: function() {
        return {
            model: Core.Model,
            view: Core.LoaderView,
            controller: Core.LoaderController
        };
    }
};

Core.Loader = Sys.extend(Core.Module, Core.Loader, "Core.Loader");
/* global Sys, Loader, Language, Services */
Sys.ns("Loader");

/**
 * The Error Handler that handles errors received during loading phase of games,
 * by determining the error and requesting a dialog.
 *
 * @class Loader.ErrorHandler
 * @extends Sys.Observable
 */
Loader.ErrorHandler = {

    /**
     * Text config for http errors.
     */
    HTTP_ERROR_TEXTS: [
        {
            key: Language.Keys.connectionLost,
            fallback: "Connection Lost"
        },
        {
            key: Language.Keys.reload,
            fallback: "Please reload the game."
        }
    ],

    /**
     * Text config for game server errors.
     */
    GAME_SERVER_ERROR_TEXT: [
        {
            key: Language.Keys.error,
            fallback: "Technical Error"
        },
        {
            key: Language.Keys.returnToLobby,
            fallback: "Please return to Casino."
        }
    ],

    /**
     * Text config for plugin timeout errors.
     */
    PLUGIN_TIMEOUT_ERROR_TEXT: [
        {
            key: Language.Keys.error,
            fallback: "Technical Error"
        },
        {
            key: Language.Keys.returnToLobby,
            fallback: "Please return to Casino."
        }
    ],

    constructor: function() {
        Loader.ErrorHandler.superclass.constructor.apply(this, arguments);

        this.errorStatus = {
            http: "handleHttpError",
            timeout: "handleTimeoutError",
            server: "handleGameServerError"
        };

        this.data = {
            status: ""
        };

        this.setupDialogButtons();

        this.setupEvents();
    },

    /**
     * @protected
     * @inheritdoc
     * @listens request:loaderErrorHandler.handleRequestError
     * @listens request:loaderErrorHandler.handlePluginTimeoutError
     * @listens request:loaderErrorHandler.showTechnicalError
     */
    setupEvents: function() {
        this.on({
            "request:loaderErrorHandler.handleRequestError": this.handleRequestError,
            "request:loaderErrorHandler.handlePluginTimeoutError": this.handlePluginTimeoutError,
            "request:loaderErrorHandler.showTechnicalError": this.handleTechnicalError
        });
    },

    /**
     * Handle plugin error on timeout.
     *
     * @returns {void}
     */
    handlePluginTimeoutError: function() {
        this.dispatchDialogRequest({
            texts: this.getTexts(this.PLUGIN_TIMEOUT_ERROR_TEXT),
            buttons: this.dialogButtons,
            severity: "stopped"
        });
    },

    /**
     * Get the current error status.
     *
     * @returns {string} The current error status.
     */
    readStatus: function() {
        return this.data.status;
    },

    /**
     * Sets the error status.
     *
     * @param {string} status The new error status.
     * @returns {void}
     */
    setStatus: function(status) {
        var curStatus = this.readStatus();

        if (curStatus !== status) {
            this.data.status = status;
        }
    },

    /**
     * Determines the error received, if sessionTimeout this handles the bounce back functionality.
     *
     * @param {XMLHttpRequest} serverRequest The failed request.
     * @returns {void}
     */
    handleRequestError: function(serverRequest) {
        var errorStatus,
            gameServerError = Sys.utils.getErrorCode(serverRequest);

        // response undefined, 404 etc.
        if (!Sys.utils.httpRequestIsOK(serverRequest)) {
            errorStatus = "http";
        }
        else if (Sys.isDefined(gameServerError)) {
            errorStatus = "server";

            if (gameServerError === 20) {
                Sys.utils.goToLobby("1");
            }
        }
        else {
            Sys.utils.goToLobby("1");
        }

        // Return if received same error that is showing
        if (!Sys.isDefined(errorStatus) || errorStatus === this.readStatus()) {
            return;
        }

        // Call correct handler
        this[this.errorStatus[errorStatus]]();

        this.setStatus(errorStatus);
    },

    /**
     * Handles error codes from the server (everything else than status 200 is sent here, such as 500 or 404 errors).
     *
     * @returns {void}
     */
    handleHttpError: function() {
        this.dispatchDialogRequest({
            texts: this.getTexts(this.HTTP_ERROR_TEXTS),
            buttons: this.dialogButtons,
            severity: "stopped"
        });
    },

    /**
     * Handle error code from game server.
     *
     * @returns {void}
     */
    handleGameServerError: function() {
        this.dispatchDialogRequest({
            texts: this.getTexts(this.GAME_SERVER_ERROR_TEXT),
            buttons: this.dialogButtons,
            severity: "stopped"
        });
    },

    /**
     * Handle generic technical error.
     *
     * @returns {void}
     */
    handleTechnicalError: function() {
        this.handleGameServerError();
    },

    /**
     * Get the texts linked to each key.
     *
     * @param {Object[]} keys The keys.
     * @returns {string[]} Text strings related to supplied keys.
     */
    getTexts: function(keys) {
        var texts = [],
            key,
            i;

        for (i = -1; ++i < keys.length;) {
            key = keys[i];
            texts.push(Services.languageManager.hasText(key.key) ?
                Services.languageManager.getText(key.key) :
                key.fallback);
        }

        return texts;
    },

    /**
     * Initialize the dialog buttons used for error handling.
     *
     * @returns {void}
     */
    setupDialogButtons: function() {
        this.dialogButtons = [
            {
                action: function() {
                    Sys.utils.goToLobby("9");
                },
                label: Services.languageManager.hasText(Language.Keys.btn_casino) ? Services.languageManager.getText(Language.Keys.btn_casino) : "Home"
            },
            {
                action: function() {
                    Sys.utils.reload();
                },
                label: Services.languageManager.hasText(Language.Keys.btn_reload) ? Services.languageManager.getText(Language.Keys.btn_reload) : "Reload"
            }
        ];
    },

    /**
     * Send request to show dialog.
     *
     * @param {Object} config Config object.
     * @returns {void}
     */
    dispatchDialogRequest: function(config) {
        this.fireEvent("request:loader.showDialog", config);
    }
};

Loader.ErrorHandler = Sys.extend(Sys.Observable, Loader.ErrorHandler, "Loader.ErrorHandler");

/* global Sys, Loader, Platform, Language, Services */
if (Sys.isDefined(Loader.ResourceHandler) && Platform.isDesktopDevice) {
    Sys.override(Loader.ResourceHandler, {
        slownessDetected: function() {
            var me = this,
                dialogConfig,
                languageManager = Services.languageManager;

            me.storeData("status", "slow");

            dialogConfig = {
                texts: [
                    languageManager.hasText(Language.Keys.loadingTakesLonger) ? languageManager.getText(Language.Keys.loadingTakesLonger) : "Loading the game is taking longer than usual."
                ],
                buttons: [
                    {
                        action: function() {
                            Sys.utils.reload();
                        },
                        label: languageManager.hasText(Language.Keys.btn_reload) ? languageManager.getText(Language.Keys.btn_reload) : "Reload",
                        scope: me
                    }
                ],
                severity: "slow"
            };

            me.fireEvent("request:loader.showDialog", dialogConfig);
        }
    });
}
/* global Sys, Loader, Platform, Services, Language */
/*
 * Overrides the
 */
if (Sys.isDefined(Loader.ErrorHandler) && Platform.isDesktopDevice) {
    /**
     * @class ErrorHandlerDesktop
     * @override
     */
    Sys.override(Loader.ErrorHandler, {

        /**
         * Text config for game server errors.
         *
         * @memberof ErrorHandlerDesktop
         */
        GAME_SERVER_ERROR_TEXT: [
            {
                key: Language.Keys.error,
                fallback: "Technical Error"
            }
        ],

        SESSION_TIMEOUT_TEXT: [
            {
                key: "20",
                fallback: "Your session has timed out. Restart the game."
            }
        ],

        /**
         * Text config for plugin timeout errors.
         *
         * @memberof ErrorHandlerDesktop
         */
        PLUGIN_TIMEOUT_ERROR_TEXT: [
            {
                key: Language.Keys.error,
                fallback: "Technical Error"
            }
        ],

        /**
         * Determines the error received, if sessionTimeout this handles the bounce back functionality.
         *
         * @param {XMLHttpRequest} serverRequest The failed request.
         * @memberof ErrorHandlerDesktop
         * @returns {void}
         */
        handleRequestError: function(serverRequest) {
            var me = this,
                errorStatus,
                gameServerError = Sys.utils.getErrorCode(serverRequest);

            // Response undefined, 404 etc.
            if (!Sys.utils.httpRequestIsOK(serverRequest)) {
                errorStatus = "http";
            }
            else if (Sys.isDefined(gameServerError)) {
                errorStatus = "server";

                if (gameServerError === 20) {
                    errorStatus = "timeout";
                }
            }
            else {
                errorStatus = "server";
            }

            // Return if received same error that is showing.
            if (!Sys.isDefined(errorStatus) || errorStatus === me.readStatus()) {
                return;
            }

            // Call correct handler.
            me[me.errorStatus[errorStatus]]();

            me.setStatus(errorStatus);
        },

        /**
         * Initialize the dialog buttons used for error handling.
         *
         * @memberof ErrorHandlerDesktop
         * @returns {void}
         */
        setupDialogButtons: function() {
            this.dialogButtons = [
                {
                    action: function() {
                        Sys.utils.reload();
                    },
                    label: Services.languageManager.hasText(Language.Keys.btn_reload) ? Services.languageManager.getText(Language.Keys.btn_reload) : "Reload"
                }
            ];
        },

        /**
         * Handle Session Timeout Error.
         *
         * @memberof ErrorHandlerDesktop
         * @returns {void}
         */
        handleTimeoutError: function() {
            var me = this;

            me.dispatchDialogRequest({
                texts: me.getTexts(me.SESSION_TIMEOUT_TEXT),
                buttons: [],
                severity: "stopped"
            });
        }
    });
}
/* global Sys, Loader, Core, Resources, Services, Language, Platform */
Sys.ns("Loader");

/**
 * The Device Detector.
 *
 * Desc...
 *
 * @class Loader.DeviceDetector
 * @extends Sys.Observable
 */
Loader.DeviceDetector = {
    constructor: function() {
        Loader.DeviceDetector.superclass.constructor.call(this);

        this.setupEvents();
    },

    /**
     * Set up the event handlers.
     *
     * @returns {void}
     */
    setupEvents: function() {
        var me = this;

        me.on({
            "notify:resourceHandler.priorityListComplete": me.onPriorityListComplete
        });
    },

    /**
     * Performs the validation once the file has been downloaded.
     *
     * @private
     * @returns {void}
     */
    onPriorityListComplete: function() {
        this.performValidation();
    },

    /**
     * Performs the validation.
     *
     * @private
     * @returns {void}
     */
    performValidation: function() {
        var me = this,
            codes = Core.DeviceDetectionCodes,
            detectionConfig = Resources.readData("deviceDetectionJson"),
            result;

        try {
            result = Core.DeviceDetectionService.validate(navigator.userAgent, detectionConfig);
        }
        catch (e) {
            me.fireEvent("request:loaderErrorHandler.showTechnicalError");
            return;
        }

        switch (result.code) {
            case codes.WHITE:
                me.handleWhiteListedCombination();
                break;
            case codes.GREY_OS:
                me.handleGreyListedCombination(Services.languageManager.getText(Language.Keys.MGnoOSSupport));
                break;
            case Core.DeviceDetectionCodes.GREY_OS_VERSION:
                me.handleGreyListedCombination(Services.languageManager.getText(Language.Keys.deviceBestGameExperience));
                break;
            case Core.DeviceDetectionCodes.GREY_BROWSER:
                me.handleGreyListedCombination(Services.languageManager.getText(Language.Keys.optimisedForVersion, [result.preferredBrowser]));
                break;
            case Core.DeviceDetectionCodes.GREY_BROWSER_VERSION:
                me.handleGreyListedCombination(Services.languageManager.getText(Language.Keys.deviceUpdateBrowser));
                break;
            case codes.BLACK_OS:
            case codes.BLACK_OS_VERSION:
            case codes.BLACK_BROWSER:
            case codes.BLACK_BROWSER_VERSION:
                me.handleBlackListedCombination();
                break;
            default:
                me.fireEvent("request:loaderErrorHandler.showTechnicalError");
        }
    },

    /**
     * Handles a white listed OS and browser combination by sending an all clear to the loader.
     *
     * @private
     * @returns {void}
     */
    handleWhiteListedCombination: function() {
        this.fireEvent("notify:deviceDetector.validationComplete", true);
        this.fireEvent("notify:deviceDetector.finished");
    },

    /**
     * Handles a grey listed OS and browser combination by asking the loader to show a dialog.
     *
     * @private
     * @param {string} text Custom text for dialog.
     * @returns {void}
     */
    handleGreyListedCombination: function(text) {
        var me = this,
            buttons = {
                proceed: {
                    label: Services.languageManager.getText(Language.Keys.btn_continue),
                    action: function() {
                        me.fireEvent("notify:deviceDetector.finished");
                        me.fireEvent("request:loader.hideDialog");
                    }
                },
                casinoLobby: {
                    label: Services.languageManager.getText(Language.Keys.btn_casino),
                    action: function() {
                        Sys.utils.goToLobby("6");
                    }
                }
            };

        me.fireEvent("notify:deviceDetector.validationComplete", true);

        me.showDialog({
            texts: [text],
            buttons: Platform.isDesktopDevice ? [buttons.proceed] : [buttons.casinoLobby, buttons.proceed],
            confirmDialog: {
                id: "deviceDetector.greyList"
            }
        });
    },

    /**
     * Handles a black listed OS and browser combination asking the loader to show a sever dialog.
     *
     * @private
     * @returns {void}
     */
    handleBlackListedCombination: function() {
        var me = this,
            buttons = {
                casinoLobby: {
                    label: Services.languageManager.getText(Language.Keys.btn_casino),
                    action: function() {
                        Sys.utils.goToLobby("6");
                    }
                }
            };

        me.fireEvent("notify:deviceDetector.validationComplete", false);
        me.showDialog({
            texts: [Services.languageManager.getText(Language.Keys.MGdeviceNoSupport)],
            buttons: !Platform.isDesktopDevice ? [buttons.casinoLobby] : [],
            severity: "stopped"
        });
    },

    /**
     * Shows the dialog specified in the configuration.
     *
     * @private
     * @param {Object} config - The dialog configuration.
     * @param {string[]} config.texts - The texts to show in the dialog.
     * @param {Object[]} config.buttons - The configurations to create buttons from.
     * @param {string} [config.id] - The optional dialog id.
     * @param {string} [config.severity] - The optional dialog severity.
     * @returns {void}
     */
    showDialog: function(config) {
        this.fireEvent("request:loader.showDialog", config);
        this.handleIntegrationSpecificDialogs(config);
    },

    /**
     * Handles integration specific dialogs.
     *
     * @param {Object} config - The dialog configuration.
     * @param {string[]} config.texts - The texts to show in the dialog.
     * @param {Object[]} config.buttons - The configurations to create buttons from.
     * @param {string} [config.id] - The optional dialog id.
     * @param {string} [config.severity] - The optional dialog severity.
     * @returns {void}
     */
    handleIntegrationSpecificDialogs: function(config) {
        // To be overridden by integration module.
    }
};

Loader.DeviceDetector = Sys.extend(Sys.Observable, Loader.DeviceDetector, "Loader.DeviceDetector");
/* global Sys, Game, Loader, Core, Services, initializeGame, Platform, Utils */
Sys.ns("Game");
Sys.ns("Services");

Platform.PlatformManager.gatherUserAgentInformation();
Utils.Platform.init();
window.Environment = new Sys.Environment();
window.Resources = new Sys.Resources();
Services.storage = new Sys.Storage();
window.UserInput = new Sys.UserInput();

/*
 * Initializes the game.
 * @param {Object} [config] Optional config for the game initialization
 * @param {Function} [config.loaderProgressCallBack] Optional custom function that should display the load progress
 *
 */
window.initializeGame = function(config) {
    /* GAME START TIME */
    Game.gameStartDateMs = Date.now();

    /* INITIATE CORE COMPONENTS */
    if (Loader.DeviceDetector) {
        new Loader.DeviceDetector();
    }
    else if (Core.UseragentManager) {
        Game.uam = new Core.UseragentManager();
    }
    Services.orientation = new Core.Orientation();
    Game.viewport = Services.scaling = new Core.Scaling();
    Services.languageManager = new Core.LanguageManager();

    /*
     * Store language manager in Game namespace for backwards compability. Yes, it should be without camel case.
     */
    Game.languagemanager = Services.languageManager;

    /* INITIATE LOADER */
    if (!Sys.isGcmEnabled) {
        Game.loader = new Core.Loader({ name: "loader" });
    }

    /* INITIATE LOADER COMPONENTS */
    Game.errorHandler = new Loader.ErrorHandler();
    Game.resourceHandler = new Loader.ResourceHandler();

    /* START PRE-LOAD SEQUENCE */
    Services.scaling.scaleContent();
    Game.resourceHandler.preLoad();
};

/*
 * If the game is not running in gcm mode then initialize it on DOMContentLoaded.
 * If the game IS running in gcm mode then the game will be initialized by the gcm proxy
 */
if (!Sys.isGcmEnabled) {
    document.addEventListener("DOMContentLoaded", function() {
        initializeGame();
    });
}
/**
 * Audio Context Polyfill
 *
 * Since Chrome 55 and the removal of the webkitAudioContext, this is a polyfill to support the new
 * Web Audio API through multiple browsers. What it does is if a browser does not have access to the
 * new API, it creates methods with the new names and any additional functionality for the framework
 * to work.
 *
 * The old API will in this case still work, but the new API as well, so any products using the
 * framework with old API will still work.
 *
 * Because of all this, the recommended usage is to only use the new API.
 *
 * See MDN for more information:
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Porting_webkitAudioContext_code_to_standards_based_AudioContext
 *
 * Link to AudioContext API:
 * https://developer.mozilla.org/en/docs/Web/API/AudioContext
 */

/* eslint-disable wrap-iife */
(function(globals) {
    "use strict";

    var WebkitAudioContext = globals.webkitAudioContext,
        fixSetTarget = function(param) {
            if (!param) {
                return;
            }
            if (!param.setTargetAtTime) {
                param.setTargetAtTime = param.setTargetValueAtTime;
            }
        };

    // If new context does not exist, but this is a webkit browser, start the polyfill process
    if (!globals.AudioContext && WebkitAudioContext) {
        window.AudioContext = WebkitAudioContext;

        // These checks are for Safari, since in some versions the new API is used, but still within
        // the old context. Therefor we have to explicitly check whether the new API is supported or not
        // per requested function.
        if (!WebkitAudioContext.prototype.createGain) {
            AudioContext.prototype._createGain = WebkitAudioContext.prototype.createGainNode;
            AudioContext.prototype.createGain = function() {
                var node = this._createGain();

                fixSetTarget(node.gain);
                return node;
            };
        }

        if (!WebkitAudioContext.prototype.createDelay) {
            AudioContext.prototype._createDelay = WebkitAudioContext.prototype.createDelayNode;
            AudioContext.prototype.createDelay = function() {
                var node = this._createDelay();

                fixSetTarget(node.delayTime);
                return node;
            };
        }

        AudioContext.prototype.createScriptProcessor = WebkitAudioContext.prototype.createScriptProcessor || WebkitAudioContext.prototype.createJavascriptNode;

        AudioContext.prototype._createOscillator = WebkitAudioContext.prototype.createOscillator;
        AudioContext.prototype.createOscillator = function() {
            var osc = this._createOscillator();

            if (!osc.start) {
                osc.start = osc.noteOn;
            }
            if (!osc.stop) {
                osc.stop = osc.noteOff;
            }

            return osc;
        };

        AudioContext.prototype._createBufferSource = WebkitAudioContext.prototype.createBufferSource;
        AudioContext.prototype.createBufferSource = function() {
            var src = this._createBufferSource();

            if (!src.start) {
                src.start = src.noteGrainOn || src.noteOn;
            }
            if (!src.stop) {
                src.stop = src.noteOff;
            }
            fixSetTarget(src.playbackRate);
            return src;
        };
    }
})(window);
/* global Sys, Core, Archbot */
Sys.ns("Archbot");

/**
 *
 *
 * @class Archbot.Controller
 * @overrides Core.Controller
 *
 * Created by Nitin Jalwal on 01-12-2017.
 */

Archbot.Controller = {

    /**
     * Initializes the controller by storing references to the model and view as well as setting up the events.
     *
     * @protected
     * @param {Object} config The configuration object.
     * @returns {void}
     */
    init: function(config) {
        this.model = config.model;
        this.view = config.view;
        this.MODULE_NAME = config.name;

        this.setupEvents();
        this.setupArchbotEvents();
    },

    /**
     * Adds the desired events to the modules required for archbot.
     *
     * @returns {void}
     */
    setupArchbotEvents: function() {
        if (Sys.isDefined(this.view)) {
            this.addListener("request:" + this.MODULE_NAME + ".fetchItem", this.view.getItem.bind(this.view));
            this.addListener("view:sendItem", this.fireEvent.bind(this, "request:archBotGUI.saveItem", this.MODULE_NAME));
        }
        this.addListener("request:" + this.MODULE_NAME + ".fetchData", this.sendDataToArchbotModule);
    },

    /**
     * Requests archbot Module to save the desired data.
     *
     * @param {string} dataKey The property to fetch from model data.
     * @returns {void}
     */
    sendDataToArchbotModule: function(dataKey) {
        this.fireEvent("request:archBotGUI.saveData", this.model.readData(dataKey));
    }

};

Sys.override(Core.Controller, Archbot.Controller);
/* global Sys, Core, Archbot */
Sys.ns("Archbot");

/**
 *
 *
 * @class Archbot.View
 * @overrides Core.View
 *
 * Created by Nitin Jalwal on 01-12-2017.
 */

Archbot.View = {

    /**
     * Fetches the property from the view.
     *
     * @param {string} itemName The name of the item.
     * @param {string} item The variable name of the item.
     * @returns {void}.
     */
    getItem: function(itemName, item) {
        var me = this,
            element, items;

        if (Sys.isDefined(itemName) && Sys.isDefined(item)) {
            items = item.split(".");

            Sys.each(items, function(value, index) {
                if (index === 0) {
                    element = me[value];
                }
                else {
                    element = element[value];
                }

                if (!Sys.isDefined(element)) {
                    return false;
                }
                return true;
            });

            if (Sys.isDefined(element)) {
                this.fireEvent("view:sendItem", { itemName: itemName, item: element });
            }
        }
    }
};

Sys.override(Core.View, Archbot.View);
/*
 * Overrides the jsonComplete function so that in case of desktop it can apply desktop config properties to the game config
 * */
if(Sys.isDefined(Loader.ResourceHandler)) {

    /**
     * @class ResourceHandlerDesktop
     * @override Loader.ResourceHandler
     */
    Sys.override(Loader.ResourceHandler, {

        /**
         * Called on a JSON-resource load complete.
         * If desktop config is received which will only be received in desktop version then it will apply the desktop properties to game config
         *
         * @param {Object} response the response
         * @param {String} name the name
         */
        jsonComplete : function (response, name){
            var config, desktopConfig;
            if(name === 'configDesktop' && Platform.isDesktopDevice ){
                if(Sys.isDefined(Resources.readData('config'))) {
                    config = Resources.readData('config');
                    desktopConfig = JSON.parse(response.responseText);
                    this.copyProperties(desktopConfig, config);
                }
            }
            else{
                Resources.storeData(name, JSON.parse(response.responseText));
            }

        },

        /*
         * Copy all properties of config1 to confi2
         * */
        copyProperties : function (config1, config2) {
            Sys.iterate(config1, function (key,value) {
                if(!Sys.isDefined(config2[key])){
                    config2[key] = {};
                }

                if(Sys.isObj(value)){
                    Sys.applyProperties(config2[key], value);
                }
                else {
                    config2[key] = value;
                }
            });
        }
    });
}/* global Sys, Integration, Resources, Loader, Core, Platform */
Sys.ns("Integration");

/**
 * The Open Bet Resource Handler override.
 *
 * @class Integration.OpenBetResourceHandlerOverride
 * @override
 */
Integration.OpenBetResourceHandlerOverride = {

    /**
     * Determines which integration type is used
     */
    INTEGRATION: "openbet",

    /**
     * Determine the session id by calling the servlet.
     *
     * @returns {void}
     */
    determineSessionID: function() {
        return this.performServletCall(Resources.readData("queryData").callbackurl, "openbet");
    },

    /**
     * Handles the servlet response to get the rgi token.
     *
     * @param {string} response The query string.
     * @returns {void}
     */
    handleServletResponse: function(response) {
        var me = this,
            extraParams = {},
            responseObject = Sys.utils.qsToObj(response.responseText, false),
            queryData = Resources.readData("queryData"),
            pluginURL = responseObject.pluginURL;

        // Add open bet params from query string to extra params as they need to be appended to each server query.
        extraParams["openbet.rgitoken"] = responseObject.rgitoken;
        extraParams["openbet.user_id"] = queryData["openbet.user_id"];
        extraParams["openbet.game_code"] = queryData["openbet.game_code"];
        extraParams["openbet.channel"] = me.getOpenBetChannel();
        extraParams["openbet.user_type"] = queryData["openbet.user_type"];
        extraParams["openbet.affiliate"] = Sys.isDefined(queryData["openbet.affiliate"]) ? queryData["openbet.affiliate"] : "";
        extraParams["openbet.rgs_site"] = "NetEnt site";
        extraParams["openbet.promotions"] = "NO";

        Sys.applyIf(Resources.readData("extraParams"), extraParams);

        me.storeSessionID("NULL");

        if (Sys.isDefined(pluginURL)) {
            Resources.storeData("pluginURL", decodeURIComponent(pluginURL));
        }
        else {
            me.determinePluginURL();
        }
    },

    /**
     * Default channel for OpenBet, overridden by GCM.
     *
     * @returns {string} The queryData's openbet.channel value.
     */
    getOpenBetChannel: function() {
        return Resources.readData("queryData")["openbet.channel"];
    },

    /**
     * Store the original method for later use
     */
    _gameServerInitComplete: Loader.ResourceHandler.prototype.gameServerInitComplete,

    /**
     * Store the session id once we get the init response from the server.
     *
     * @param {XMLHttpRequest} response The server response from the init request.
     * @returns {void}
     */
    gameServerInitComplete: function(response) {
        var gameServerInitResponseObject = Sys.utils.parseQueryString(response.responseText, true);

        Resources.storeData("gameServerInitResponse", Sys.utils.qsToObj(response.responseText));
        Resources.storeData("gameServerInitResponseObject", gameServerInitResponseObject);
        this.storeSessionID(gameServerInitResponseObject.openbet.sessionid);
        Resources.storeData("unParsedGameServerInitResponse", response.responseText);
        Resources.storeData("historyUrl", this.buildHistoryUrl());
    }
};

Integration.OpenBetLanguageManagerOverride = {
    _getText: Core.LanguageManager.prototype.getText,

    getText: function(textId, values) {
        var me = this,
            OBTextId = "OB" + textId;

        if (me.hasText(OBTextId)) {
            return me._getText(OBTextId, values);
        }

        return me._getText(textId, values);
    }
};

Integration.applyOpenBetOverrides = function() {
    Sys.override(Loader.ResourceHandler, Integration.OpenBetResourceHandlerOverride);

    Integration.applyOpenBetLanguageOverrides();
};

Integration.applyOpenBetLanguageOverrides = function() {
    // It's only desktop that shall have open bet specific strings.
    if (Platform.isDesktopDevice) {
        Sys.override(Core.LanguageManager, Integration.OpenBetLanguageManagerOverride);
    }
};

if (Sys.openBetMode) {
    Integration.applyOpenBetOverrides();
}
else if (Sys.openBetPlayForFunMode) {
    Integration.applyOpenBetLanguageOverrides();
}
/* global Sys, Integration, Loader, Environment, Services, Platform, Language, Resources, com, initializeGame, setViewportHidden */
Sys.ns("Integration.GCM");

/**
 * Global property that is overridden in the games main.js file
 * @ignore
 */
Integration.GCM.availableOptions = ["MUTE", "TURBO"];

/**
 * Hides the game.
 *
 * @param {boolean} [hidden=false] Flag to hide the viewPort, default value is false.
 * @returns {void}
 */
window.setViewportHidden = function(hidden) {
    var viewPort = document.getElementById("viewport"),
        opacity;

    if (viewPort !== null && Sys.isDefined(viewPort)) {
        opacity = 1;
        if (hidden) {
            opacity = 0.01;
        }
        viewPort.style.opacity = opacity;
    }
};

/**
 * The Proxy handles integration logic of game with OpenBet GCM. And loads the gcm proxy object in this
 * @class Integration.GCM.Proxy
 * @extends Sys.Observable
 */
Integration.GCM.Proxy = {
    MODULE_NAME: "GCMProxy",

    /**
     *  @property {gcmCore} gcmCoreInstance The gcm core instance this proxy will communicate to
     */
    gcmCoreInstance: undefined,

    /**
     * @property {Boolean} exclusivityEnable Flag that hold that status of exclusivity on GCMProxy
     */
    exclusivityEnable: false,

    /**
     * @property {Boolean} inIdleState Flag indicating if the game is currently in idle state or not. We need this as some updates are done only in idle state
     */
    inIdleState: false,

    /**
     * Maintains the queue of the multichoice error dialogs that are raised by the game.
     *
     * @property {Array}
     * @private
     */
    multiChoiceGameDialogsQueue: [],

    /**
     * @private
     * @property {Number} freeBetBalance The free bet balance
     */
    freeBetBalance: 0,

    /**
     * @private
     * @property {Number} latestWin The last win balance
     */
    latestWin: 0,

    /**
     * @private
     * @property {boolean} basicGamePanelEnabled Whether or not the basic game panel is enabled in the game or not.
     */
    basicGamePanelEnabled: true,

    /**
     * @private
     * @property {boolean} balanceUpdatedWithNewRound Whether or not the balance in updated with the new game round or not.
     */
    balanceUpdatedWithNewRound: false,

    constructor: function() {
        var me = this,
            gcmBridge,
            commonUIIframe;

        Integration.GCM.Proxy.superclass.constructor.call(me);

        // GCM specific overrides that need the proxy in some way.
        Sys.override(Loader.ResourceHandler, {
            getOpenBetChannel: me.getGcmChannel.bind(me)
        });

        Sys.override(Environment, {
            goToLobby: me.goToLobby.bind(me)
        });

        // The interface we expose to GCM.
        me.exposedInterface = {
            gameRevealed: me.gameRevealed.bind(me),
            gcmReady: me.gcmReady.bind(me),
            optionHasChanged: me.optionHasChanged.bind(me),
            balancesHasChanged: me.balancesHasChanged.bind(me),
            toggleMute: me.toggleMute.bind(me),
            configReady: me.configReady.bind(me),
            resume: me.resume.bind(me),
            updateLoadingBar: me.simulateLoading.bind(me)
        };

        /*
         * Initialize the gcmBridge.
         * Note that it is the gcmBridge's responsibility to extract request parameters and feed them to the commonUI iframe.
         */
        gcmBridge = com.openbet.gcmBridge;
        gcmBridge.init(document.body, window.location.href, me.exposedInterface);

        commonUIIframe = me.getIframe();
        if (commonUIIframe !== null && Sys.isDefined(commonUIIframe)) {
            commonUIIframe.style.zIndex = 10;
            commonUIIframe.style.position = "fixed";
        }

        me.on({
            // Loader events.

            // Fired when the game is fully loaded and the main.js is about to be run.
            "notify:resourceHandler.gameAssetsLoaded": me.onGameLoadedSuccessfully,

            "request:gcmProxy.updateProgress": me.simulateLoading,

            // Game events.
            "notify:stateHandler.leavingBeforeLoaderCloseState": me.onGameResourcesLoaded,
            "notify:resourceHandler.animationComplete": me.onLoadAnimationClosed,
            "notify:loader.closed": me.onLoadAnimationClosed,
            "notify:stateHandler.enteringSpinningState": me.hideCommonUI,
            "request:spin.startNewRound": me.onSpinStart,
            "notify:stateHandler.enteringIdleState": me.onEnteringIdleState,
            "notify:stateHandler.leavingIdleState": me.onLeavingIdleState,
            "notify:settingsManager.settingChanged": me.onSettingChanged,
            "notify:responseParser.responseParsed": me.processServerResponse,
            "notify:moneyManager.betChanged": me.updateBetInUI,
            "notify:moneyManager.balanceReloaded": me.updateBalanceInUI,

            "request:disableBasicGamePanel": me.disableBasicGamePanel,
            "request:enableBasicGamePanel": me.enableBasicGamePanel,

            "request:gcmProxy.handleError": me.handleError,
            "request:cashField.showWin": me.onShowWin
        });
    },

    /**
     * Override method to handle the "go to lobby" action. As per OpenBet recommendation for redirecting the game back to lobby we raise a critical error with the suppress flag = true and let the gcm bridge handle the redirection.
     *
     * @returns {void}
     */
    goToLobby: function() {
        var me = this;

        me.handleError({
            category: "CRITICAL",
            severity: "ERROR",
            errorCode: "CRITICAL_ERROR",
            message: Services.languageManager.getText(Language.Keys.btn_casino),
            extraParameters: {
                originalError: "criticalError",
                originalTitle: Services.languageManager.getText(Language.Keys.btn_casino),
                reason: 3,
                suppressMessage: true
            }
        });
    },

    /**
     * Gets the reference of the iframe that holds the commonUI based on the url as in the query string.
     *
     * @returns {element} The iframe reference.
     */
    getIframe: function() {
        return document.querySelector("iframe[name='commonUIIFrame']");
    },

    /**
     * Reads gcm config and returns channel information defined in the gcm parameter (used in openbet.init call).
     *
     * @returns {Object} The config object.
     */
    getGcmChannel: function() {
        return this.gcmCoreInstance.getConfig().channel;
    },

    /* EVENT HANDLERS FOR LOADER EVENTS */

    /**
     * Tells the gcm core to finish the load animation and shows the game.
     *
     * @returns {void}
     */
    onGameLoadedSuccessfully: function() {
        this.setupAccount();
        setViewportHidden(false);
    },

    /**
     * Setup the account while game is initialized and show balance information on the common UI.
     *
     * @returns {void}
     */
    setupAccount: function() {
        var initResponse = Resources.readData("gameServerInitResponse"),
            playerCurrency = initResponse.playercurrencyiso,
            playerCurrencyFormat = Sys.utils.XMLHelper.getMoneyFormatFromXML(Resources.readData("moneyformat_player"), playerCurrency),

            accountInfo = {
                ccy_code: playerCurrency,
                ccy_decimal_separator: playerCurrencyFormat.decimalDivider,
                ccy_thousand_separator: playerCurrencyFormat.thousandsDivider
            },

            accBalance = Number(initResponse.credit) / 100,
            freeBetBalance = (Sys.isDefined(initResponse["openbet.freebets"]) ? Number(initResponse["openbet.freebets"]) : 0) / 100,

            balances = { CASH: { amount: accBalance }, FREEBET: { amount: freeBetBalance } };

        // initialize account again.
        this.gcmCoreInstance.accountInit(accountInfo, balances);

        // send stake and paid to commonUI.
        this.gcmCoreInstance.stakeUpdate(0.00);
        this.gcmCoreInstance.paidUpdate(0.00);
    },

    /* EVENT HANDLERS FOR IN-GAME EVENTS */

    /**
     * Tries to finish the gcm initialization (also requires that the load animation is done).
     *
     * @returns {void}
     */
    onGameResourcesLoaded: function() {
        this.gameResourcesLoaded = true;
        this.tryToFinishGCMInitialization();
    },

    /**
     * Tries to finish the gcm initialization (also requires that the game resources are loaded).
     *
     * @returns {void}
     */
    onLoadAnimationClosed: function() {
        this.loadAnimationClosed = true;
        this.tryToFinishGCMInitialization();
    },

    /**
     * If the load animation is complete and the game resources are loaded then we finish the gcm initialization.
     *
     * @returns {void}
     */
    tryToFinishGCMInitialization: function() {
        var me = this;

        if (me.gameResourcesLoaded && me.loadAnimationClosed) {
            // Update all values in the GCM UI when the loader is closed.
            me.updateBalanceInUI();
            me.updateBetInUI();
            me.updatePayoutInUI();

            me.registerAvailableOptions();
            me.gcmCoreInstance.gameReady();
            me.fireEvent("request:scaling.update");
        }
    },

    /**
     * Register what options are available to the commonUI to change in the game.
     * Available options are read from Integration.GCM.availableOptions so if you want to override this simply redefine it in main.js.
     *
     * @returns {void}
     */
    registerAvailableOptions: function() {
        var me = this,
            gcmCore = me.gcmCoreInstance;

        Sys.each(Integration.GCM.availableOptions, function(option) {
            gcmCore.regOption(option);
        });

        me.hasRegisteredOptions = true;

        me.updateTurboSettingInUI();
        me.updateAudioSettingInUI();
    },

    /**
     * Hides the commonUI (as a spin is underway).
     *
     * @returns {void}
     */
    onSpinStart: function() {
        var balances = this.getBalances(true);

        this.hideCommonUI();
        this.gcmCoreInstance.balancesUpdate(balances);
        this.balanceUpdatedWithNewRound = true;
    },

    /**
     * Function used to communicate with gcm to hide commonUI.
     *
     * @returns {void}
     */
    hideCommonUI: function() {
        this.gcmCoreInstance.gameAnimationStart();
    },

    /**
     * Stores the OpenBet freebets.
     *
     * @param {Object} serverResponse The parsed server response.
     * @returns {void}
     */
    processServerResponse: function(serverResponse) {
        var me = this,
            openBetParameters = serverResponse.openbet;

        me.freeBetBalance = (Sys.isDefined(openBetParameters) && Sys.isDefined(openBetParameters.freebets)) ? Number(openBetParameters.freebets) : me.freeBetBalance;
        me.latestWin = Sys.isDefined(serverResponse.wins) ? serverResponse.wins.centsTotal : 0;
    },

    /**
     * Updates the CommonUI balance and payout on win.
     *
     * @returns {void}
     */
    onShowWin: function() {
        this.updateBalanceInUI();
        this.updatePayoutInUI();
    },

    /**
     * Enables the commonUI (as the round is now over) and updates the player's balance.
     *
     * @returns {void}
     */
    onEnteringIdleState: function() {
        var me = this;

        me.inIdleState = true;
        me.showCommonUI();
    },

    /**
     * Tells the gcm core that the commonUI can now be shown.
     *
     * @returns {void}
     */
    showCommonUI: function() {
        this.gcmCoreInstance.gameAnimationComplete(this.enableUI);
    },

    /**
     * Callback function called by the gcm core that will enable the in-game controls.
     * This is not implemented by purpose as we currently have anything we want to handle here but we still need to provide a callback function or GCM will throw an error.
     *
     * @returns {void}
     */
    enableUI: function() {
        // Stub.
    },

    /**
     * Tells the gcm core to update the balance in the commonUI.
     *
     * @returns {void}
     */
    updateBalanceInUI: function() {
        var balances = this.getBalances();

        if (!this.balanceUpdatedWithNewRound) {
            this.gcmCoreInstance.balancesUpdate(balances);
        }
        this.balanceUpdatedWithNewRound = false;
    },

    /**
     * Creates the gcm Specific balance object from the game balance and free bets.
     *
     * @param {boolean} settleBetInFreebets Set true if bets needs to be deducted from freebets first and then adjustments in cash balance will happens.
     * @returns {{CASH: {amount:number}, FREEBET: {amount:number}}} The balance object.
     */
    getBalances: function(settleBetInFreebets) {
        var accountBalance = Services.moneyManager.getBalanceCents() / 100,
            freeBetBalance = this.freeBetBalance / 100,
            amount = accountBalance - freeBetBalance,
            freebets = freeBetBalance,
            bet = Services.moneyManager.getBetCents() / 100;

        if (settleBetInFreebets) {
            amount += bet;
            freeBetBalance -= bet;
            if (freeBetBalance < 0) {
                amount += freeBetBalance;
                freebets = 0;
            }
            else {
                freebets = freeBetBalance;
            }
        }

        return {
            CASH: {
                amount: amount
            },
            FREEBET: {
                amount: freebets
            }
        };
    },

    /**
     * Updates the paid field (wins) of commonUI.
     *
     * @returns {void}
     */
    updatePayoutInUI: function() {
        this.gcmCoreInstance.paidUpdate(this.latestWin / 100);
    },

    /**
     * Notes that we are no longer in idle state and should thus not show certain updates.
     * Also resets the winnings to zero as this is the start of a new game round.
     *
     * @returns {void}
     */
    onLeavingIdleState: function() {
        this.inIdleState = false;
        this.gcmCoreInstance.paidUpdate(0.00);
        this.updateBalanceInUI();
    },

    /**
     * Examines settings changes and updates the commonUI if necessary.
     *
     * @param {string} setting The name of the changed setting.
     * @returns {void}
     */
    onSettingChanged: function(setting) {
        if (setting === "betLevel" || setting === "denomination" || setting === "betLines") {
            this.updateBetInUI();
        }
        else if (setting === "quickSpin") {
            this.updateTurboSettingInUI();
        }
        else if (setting === "volume") {
            this.updateAudioSettingInUI();
        }
    },

    /**
     * Tells the gcm core to update the stake field (bet) of the commonUI.
     *
     * @returns {void}
     */
    updateBetInUI: function() {
        var bet = Services.moneyManager.getBetCents() / 100;

        if (Sys.isNumber(bet)) {
            this.gcmCoreInstance.stakeUpdate(bet);
        }
    },

    /**
     * Called when the quick spin setting is changed and updates the commonUI turbo field to reflect the new state.
     *
     * @returns {void}
     */
    updateTurboSettingInUI: function() {
        var me = this,
            // Must be a boolean when sent to the gcm core instance.
            turboModeActive = Services.settingsManager.getSetting("quickSpin") === true;

        if (me.hasRegisteredOptions && Integration.GCM.availableOptions.contains("TURBO")) {
            me.gcmCoreInstance.optionHasChanged("TURBO", "GAME", turboModeActive);
        }
    },

    /**
     * Called when the audio state is set and updates the commonUI mute icon to reflect the new state.
     *
     * @returns {void}
     */
    updateAudioSettingInUI: function() {
        var me = this,
            audioIsMuted = Services.settingsManager.getSetting("volume") === 0;

        if (me.hasRegisteredOptions && Integration.GCM.availableOptions.contains("MUTE")) {
            me.exposedInterface.toggleMute(audioIsMuted);
        }
    },

    /**
     * The function called by error generator to simulate game error handling.
     *
     * The errorParams Object values will be different for error categories.
     * The optional JSON object parameter to allow the game to pass additional information to the commonUI on how to handle the error. Name key, value pairs must be provided in a valid JSON format.
     * This parameter is used for (and not restricted to) error categories "OTHER_interfaceIN_PROGRESS" and "MULTI_CHOICE_DIALOG".
     *
     * Usage in "OTHER_interfaceIN_PROGRESS".
     * Raising a "OTHER_interfaceIN_PROGRESS" error category will inform the CommonUI that more than one game is already in progress.
     * The CommonUI can relaunch the corresponding game by using game information provided in errorParams argument.
     * When calling an error of this category type the game name must be provided as part of the error parameters in JSON format in a 'gameName' tag.
     * Any additional game launching information can be provided within a 'gameInProgressParams' tag in the JSON object.
     *
     * @example
     * Example of errorParams object for a "OTHER_interfaceIN_PROGRESS" error:
     *
     *    {'gameName': 'ChainReactors'}
     *    {'gameInProgressParams': {
     *        'channel': 'I',
     *        'lang': 'en',
     *        'playMode': 'real',
     *        'loginToken': 'tqQRojxew8fBeadMe/8gtOk8nz1+PeuCSE0AQdKyw0Og4wpnFyZhrVh2VhZhp67gz10s8Y2==',
     *         'affId': '1'
     *         }
     *    }}
     *
     * Usage in "MULTI_CHOICE_DIALOG"
     * Raising a "MULTI_CHOICE_DIALOG" error category will inform the CommonUI that the error dialog can be
     * displayed with multiple options.  These options will be provided in errorParams object.
     * When the user acknowledges the error dialog, the selected option's index will be returned to the game.
     *
     * Example of errorParams object for a "OTHER_interfaceIN_PROGRESS" error:
     *
     *    {'options' : ['Ok', 'Cancel', 'Quit']}
     *
     *
     * Usage in providing additional error handling information
     * This is an example of how this parameter can be used when the error category raised is not a "OTHER_interfaceIN_PROGRESS"
     * or "MULTI_CHOICE_DIALOG" type.  This example provides a method to suppress an error message if for example the previous
     * error was a "MULTI_CHOICE_DIALOG" error category type and the player selected an option to "close the game".
     * This could result in the game raising a Critical error to inform the CommonUI that it is closing the game.  This error
     * can be suppressed since the player has chosen to close the game.
     *
     * This example scenario would require additional information to be provided in the following format:
     *
     *    {'suppressMessage':'true'}
     *
     * @private
     * @param {Object} errorConfig Comes in two flavors: either a standard error or an RGI error.
     * @param {string} errorConfig.category The GCM category for the error.
     * @param {string} errorConfig.severity The GCM severity classification of the error.
     * @param {string} errorConfig.message The message to display in any dialog.
     * @param {string} errorConfig.errorCode The GCM error code.
     * @param {Object} errorConfig.extraParameters Any extra parameters to send with the error (see GCM documentation).
     * @param {Function[]} [errorConfig.actions] If this is a multi choice dialog category error this property should hold the actions associated with each option.
     * @param {boolean} [errorConfig.RGIError=false] Flag indicating if this is an RGI error.
     * @param {boolean} [errorConfig.RGIXML] If this is an RGIError this parameter should hold the error xml.
     * @returns {void}
     */
    handleError: function(errorConfig) {
        var me = this,
            handleErrorNow,
            xmlUtil,
            errorInfo;

        me.disableUI();
        handleErrorNow = true;
        if (errorConfig.RGIError) {
            xmlUtil = com.openbet.gcm.xmlutil;
            errorInfo = xmlUtil.getErrorInfoFromRGIXml(decodeURIComponent(errorConfig.RGIXML));

            me.shouldRevertRound = errorInfo.errorAction === "VOID_TXN";

            me.gcmCoreInstance.handleServerError(errorInfo);
        }
        else {
            errorConfig = Sys.applyIf(errorConfig, {
                category: "NON_RECOVERABLE_ERROR",
                severity: "ERROR",
                message: "An error occurred",
                errorCode: "CLIENTERROR"
            });

            if (errorConfig.category === "MULTI_CHOICE_DIALOG") {
                // If already prompted a dialog and waiting for user response.
                if (Sys.isDefined(me.actionsOfCurrentDialog)) {
                    handleErrorNow = false;
                    // Push the configuration in the processing Queue.
                    me.multiChoiceGameDialogsQueue.push(errorConfig);
                }
                else {
                    me.actionsOfCurrentDialog = errorConfig.actions;
                    if (!me.exclusivityEnable) {
                        me.fireEvent("request:userInputManager.activateExclusivity", me.MODULE_NAME);
                        me.fireEvent("request:quickSettingsMenu.externalDeactivate", me.MODULE_NAME);
                        me.fireEvent("request:spinButton.hide", me.MODULE_NAME);
                        me.exclusivityEnable = true;
                    }
                }
            }
            if (handleErrorNow) {
                me.shouldRevertRound = errorConfig.revert === true;

                me.gcmCoreInstance.handleError(
                    errorConfig.category,
                    errorConfig.severity,
                    errorConfig.errorCode,
                    errorConfig.message,
                    errorConfig.extraParameters
                );
            }
        }
    },

    /**
     * Stub method. Should do the opposite of enableUI if enableUI is ever implemented.
     *
     * @returns {void}
     */
    disableUI: function() {
        // Stub.
    },

    /* FUNCTIONS CALLED BY THE GCM BRIDGE (supplied in the gcmBridge.init) */

    /*
     * Functions called by the GCM bridge:
     * gcmReady:
     * configReady:
     * updateLoadingBar(simulateLoading):
     * gameRevealed:
     * optionHasChanged:
     * balancesHasChanged:
     * toggleMute:
     * resume:
     * customBridgeLoaded:
     */

    /**
     * Function called by the gcm bridge when the primary initialization of the gcm is complete.
     * NOTE: No loading should be done before this as many things require us to have access to the gcm interface.
     *
     * @param {gcmCore} gcm The interface that gcm provides for the game.
     * @returns {void}
     */
    gcmReady: function(gcm) {
        this.gcmCoreInstance = gcm;
        this.simulateLoading(0);
    },

    /**
     * Function called by the gcm bridge after its initial configuration is complete.
     *
     * @returns {void}
     */
    configReady: function() {
        var me = this,
            isRealMode = !me.isDemoMode();

        if ((isRealMode && Sys.openBetMode) || (!isRealMode && !Sys.openBetMode)) {
            /*
             * Start the loading process if we are in OpenBet mode with a logged in player or
             * we are not in OpenBet mode and are playing for fun
             **/
            initializeGame({ loaderProgressCallBack: me.simulateLoading.bind(me) });
        }
        else if (isRealMode && !Sys.openBetMode) {
            /*
             * Raise an error if the player is logged in but we are not in OpenBet mode
             *
             * since language manager is available at this stage of game initilalization and its an once in a while case. Moreover, operator has to handle it explicitly as the original requirement is
             * FL-DEMO-PFR-02 Clicking the Play for Real button in demo play, when the Player is
             * not logged in, presents the game login dialogue. refer OB.PTINT.CHK.RGI page 45
             *
             *  And NetEnt does not have any login scree so operator has to listen the category or errorCode to display login screen
             **/
            me.handleError({
                category: "LOGIN_ERROR",
                severity: "ERROR",
                message: "ACCOUNT_UNAVAILABLE",
                errorCode: "ACCOUNT_UNAVAILABLE",
                extraParameters: {
                    originalError: 70,
                    originalTitle: "MGaccountUnavailable"
                }
            });
        }
        else {
            /*
             * For any other case we go back to the lobby
             **/
            Sys.utils.goToLobby();
        }
    },

    /**
     * Reads the gcm config and returns true if game is in demo mode.
     *
     * @returns {boolean} True or false.
     */
    isDemoMode: function() {
        return this.gcmCoreInstance.getConfig().playMode === "demo";
    },

    /**
     * Sends an update to the gcmCoreInstance to update the loader and sends the animationComplete event if the progress is 100%.
     *
     * @param {number} percentLoaded The percentage the game is loaded.
     * @returns {void}
     */
    simulateLoading: function(percentLoaded) {
        var percent = Sys.utils.toInt(percentLoaded);

        if (percent < 100) {
            this.gcmCoreInstance.loadProgressUpdate(percent);
        }
        else {
            this.gcmCoreInstance.loadProgressUpdate(99);
            // Make the topbar disabled by default it will automatically gets enabled when game is entering in idle state.
            this.hideCommonUI();
            this.fireEvent("notify:gcmProxy.animationComplete");
        }
    },

    /**
     * Function that gcm calls when the commonUI has finished the loading sequence and has revealed the game.
     *
     * @returns {void}
     */
    gameRevealed: function() {
        this.configureGameForGcm();
    },

    /**
     * Requests any game changes that are required for gcm.
     *
     * @returns {void}
     */
    configureGameForGcm: function() {
        this.fireEvent("request:homeButton.hidePermanently");
    },

    /**
     * Gcm will call this when the option has been changed by the commonUI The game should respond by changing the option within the game.
     * Triggered by the controls on commonUI.
     *
     * @param {string} optionType Must be one of MUTE, TURBO We can extend this list in the future.
     * @param {boolean} newValue The new value for the option.
     * @returns {void}
     */
    optionHasChanged: function(optionType, newValue) {
        var me = this;

        switch (optionType) {
            case "MUTE":
                me.toggleSound(newValue);
                break;
            case "TURBO":
                me.toggleQuickSpin(newValue);
                break;
            case "GAME_PREFERENCES":
                if (Platform.isDesktopDevice) {
                    me.toggleSettingsWindowDesktop("gameSettings");
                }
                else {
                    me.toggleSettingsWindow(newValue, "betSettings");
                }
                break;
            case "PAYTABLE":
                me.toggleSettingsWindow(newValue, "paytable");
                break;
            case "ABOUT":
                if (me.inIdleState) {
                    me.toggleSettingsWindow(newValue, "gameRules");
                }
                break;
            default:
                
        }
    },

    /**
     * Disables the use of the basic game panel buttons.
     *
     * @private
     * @returns {void}
     */
    disableBasicGamePanel: function() {
        this.basicGamePanelEnabled = false;
    },

    /**
     * Enables the use of the basic game panel buttons.
     *
     * @private
     * @returns {void}
     */
    enableBasicGamePanel: function() {
        this.basicGamePanelEnabled = true;
    },

    /**
     * Requests that the settings window should open the specified page on Desktop.
     *
     * @param {string} menuIcon This is the settings icon being toggled displaying the settings menu.
     * @returns {void}
     */
    toggleSettingsWindowDesktop: function(menuIcon) {
        this.fireEvent("request:" + menuIcon + ".toggle");
    },

    /**
     * Requests that the settings window should open the specified page.
     *
     * @param {boolean} show True or false.
     * @param {string} page The settings page to open.
     * @returns {void}
     */
    toggleSettingsWindow: function(show, page) {
        if (!this.basicGamePanelEnabled) {
            return;
        }

        if (show) {
            this.fireEvent("request:" + page + ".show");
        }
        else {
            this.fireEvent("request:settingsWindow.close");
        }
    },

    /**
     * Called when sound is muted/un muted from common UI. Requests audio to be enabled/disabled.
     *
     * @param {boolean} mute The status of the sound.
     * @returns {void}
     */
    toggleSound: function(mute) {
        Services.settingsManager.storeSetting("volume", mute ? 0 : 1);
    },

    /**
     * Called when turbo is enabled/disabled from the commonUI. Updates the quick spin setting in the game.
     *
     * @param {boolean} active The status of turbo mode (quick spin) of the game.
     * @returns {void}
     */
    toggleQuickSpin: function(active) {
        var updatedValue;

        this.fireEvent("request:settingsManager.storeData", "quickSpin", active);

        updatedValue = Services.settingsManager.getSetting("quickSpin");

        // If the value has not been updated in the settings manager, restore common ui.
        if (updatedValue !== active) {
            this.gcmCoreInstance.optionHasChanged("TURBO", "GAME", updatedValue);
        }
    },

    /**
     * Gcm will call this when the balances has been changed by the commonUI, which can happen after an in-game quick-deposit.
     * Games should update their internal balances state when this function is called.
     * If the game is in a state where it is preventing bets because the balance is too low, it is able to check whether the bet is now allowed with the new updated balance.
     *
     * @param {gcmUnFormattedBalance} balances The current balances.
     * @returns {void}
     */
    balancesHasChanged: function(balances) {
        var cashCents,
            freeBetCents;

        // If game is idle i.e. reels are not spinning and player just click the spin button and balance is validated on client side only then we allow game to update the balance without reloading
        // but if game is animating a server returns insufficient funds error in that case the game must reload to reflect the balance as with in sufficient funds server does not generate any outcome of that spin.
        if (this.inIdleState) {
            cashCents = parseInt(Math.round(balances.CASH.amount * 100), 10);
            freeBetCents = parseInt(Math.round(balances.FREEBET.amount * 100), 10);

            Services.moneyManager.setBalance(cashCents + freeBetCents);
            this.freeBetBalance = freeBetCents;
        }
        else {
            Sys.utils.reload();
        }
    },

    /**
     * Updates the common ui with the given audio state.
     *
     * @param {boolean} audioIsMuted Flag indicating if the audio is currently muted (disabled).
     * @returns {void}
     */
    toggleMute: function(audioIsMuted) {
        this.gcmCoreInstance.optionHasChanged("MUTE", "GAME", audioIsMuted);
    },

    /**
     * A call back function that will get called when the commonUI has finished handling a non-fog/RGI error.
     *
     * @param {number} [chosenOption] If the error handled was a MULTI_CHOICE_DIALOG this will be the index of the chosen option (as provided in handleError).
     * @returns {void}
     */
    resume: function(chosenOption) {
        var me = this,
            option = chosenOption,
            hasActions = Sys.isArray(me.actionsOfCurrentDialog),
            errorConfig;

        try {
            if (hasActions && me.actionsOfCurrentDialog.length === 1 && !Sys.isDefined(option)) {
                option = 0;
            }

            if (hasActions && Sys.isDefined(me.actionsOfCurrentDialog[option])) {
                me.actionsOfCurrentDialog[option]();
            }
            else if (me.shouldRevertRound) {
                me.fireEvent("request:moneyManager.revertBet");
                me.fireEvent("request:spin.activateDefaultOutcome", "basic");
                me.updateBalanceInUI();
            }
        }
        finally {
            me.actionsOfCurrentDialog = undefined;
        }

        // If there is any waiting dialog then process them sequentially.
        if (me.multiChoiceGameDialogsQueue.length > 0) {
            // Process the first dialog of the queue.
            errorConfig = me.multiChoiceGameDialogsQueue.shift();
            me.handleError(errorConfig);
        }
        else {
            me.exclusivityEnable = false;
            me.fireEvent("request:userInputManager.deactivateExclusivity", me.MODULE_NAME);
            me.fireEvent("request:quickSettingsMenu.externalActivate", me.MODULE_NAME);
            me.fireEvent("request:spinButton.show", me.MODULE_NAME);
        }
    }
};

Integration.GCM.Proxy = Sys.extend(Sys.Observable, Integration.GCM.Proxy, "Integration.GCM.Proxy");

// Sets the proxy object if not there
if (Sys.isGcmEnabled) {
    setViewportHidden(true);
    Sys.utils.addCSSClass(document.body, "gcmMode");
    Sys.utils.loadJS({ url: "../../../gcm/js/gcmBridge.js" }).then(function() {
        new Integration.GCM.Proxy();
    });
}

/*
 * DOCUMENTATION FOR CLASSES USED BY THIS CLASS
 * Taken from the gcm core documentation 2014-02-17
 */

/**
 * @class gcmUnFormattedBalance
 */

/**
 * @property {{amount: Number}} CASH
 */

/**
 * @property {{amount: Number}} FREEBET
 */

/**
 * @class gcmMoneyFormat
 */

/**
 * @property {String} ccy_code The currency code (for instance 'GBP')
 */

/**
 * @property {String} ccy_decimal_separator The currency decimal separator (for instance '.')
 */

/**
 * @property {String} ccy_thousands_separator The currency thousands separator (for instance ',')
 */

/**
 * @class gcmFormattedMoney
 */

/**
 * @property {String} display What to display (for instance '£10.00')
 */

/**
 * @property {String} code The currency code (for instance 'GBP')
 */

/**
 * @property {Number} value for instance 10.0
 */

/**
 * @property {String} currency_symbol for instance '£'
 */

/**
 * @property {String} ccy_thousand_separator The currency decimal separator (for instance '.')
 */

/**
 * @property {String} ccy_decimal_separator The currency thousands separator (for instance ',')
 */

/**
 * @class gcmCore
 * The gcmCore is the interface to the GCM from the game
 */

/**
 * @property {Function} accountInit This function is call by game at start-up phase, to initialize account setting and set initial balance.
 * @param {gcmMoneyFormat} accountInfo
 * @param {{CASH : gcmUnFormattedBalance, FREEBET : gcmUnFormattedBalance}} initialBalance
 * @returns {{CASH : gcmFormattedMoney, FREEBET : gcmFormattedMoney}}
 *
 */

/**
 * @property {Function} balancesUpdate The game should call this function with a balanceFudge parameter when it wants to hide the winnings, then when the winnings have been revealed in the game, game should call it again without the balanceFudge parameter to display the actual balance.
 * @param {gcmUnFormattedBalance} balances
 * @param {Number} [balanceFudge] Numeric amount to decrement the displayed balance by until the game play is complete
 * @param {Boolean} [changedFromCommonUI]
 */

/**
 * @property {Function} commonUIReady The commonUI should call this method when it is loaded.
 * @param {Object} commonUI An instance of a commonUI object
 */

/**
 * @property {Function} commonUIResize This API can be called by common UI to modify the height and width of common UI iframe.
 * @param {String} height The new height of iframe in any css unit, e.g. '20%', '20px', '20em' are all valid.
 * @param {String} width The new width of iframe, same format as height.
 */

/**
 * @property {Function} gameAnimationComplete The game should call gameAnimationComplete(resumeCallback) when the game animation is complete.
 * @param {Function} resumeCallback The callback function that should be called when the commonUI has completed dealing with notifications.
 */

/**
 * @property {Function} gameAnimationStart The game should call gameAnimationStart when it starts it's game play animation After this the commonUI is not permitted to display any content until gameAnimationComplete() is invoked by the game.
 */

/**
 * @property {Function} gameReady The game should call this method when it is loaded and initialized.
 */

/**
 * @property {Function} gameRevealed After the commonUI has shown the game it should call this method to say it has done so, so that the game can enable it's UI.
 */

/**
 * @property {Function} getConfig Retrieves game configuration information.
 * @returns {Object} the config object.
 */

/**
 * @property {Function} handleError The game should call handleError on gcm for any error to be displayed and handled by the CommonUI.
 * @param {String} errorCategory The category of current error. The current error categories are: { CRITICAL, INSUFFICIENT_FUNDS, LOGIN_ERROR, RECOVERABLE_ERROR, NON_RECOVERABLE_ERROR, CONNECTION_ERROR, MULTI_CHOICE_DIALOG, OTHER_interfaceIN_PROGRESS }.
 * @param {String} errorSeverity This signifies the severity of the error and can be 'WARNING', 'INFO' or 'ERROR'.
 * @param {String} errorCode The error code string.
 * @param {String} errorMessage The error message provide by game.
 * @param {Object} [errorParams] The optional JSON object parameter to allow the game to pass additional information to the commonUI on how to handle the error.
 */

/**
 * @property {Function} handleServerError The game should call handleServerError with every error that it receives from the game server.
 * @param {{ errorCode: String, errorMessage: String }} errorInfo
 */

/**
 * @property {Function} init The commonUI should call init on gcm as soon as possible.
 * @param {Document} gameWindow reference to game window.
 * @param {Document} commonUIWindow reference to commonUI window.
 * @param {String} gcmWebServiceBaseUrl web service url.
 */

/**
 * @property {Function} loadProgressUpdate The game must call this on gcm so that the commonUI can be updated with loading progress and display progress in a loading screen
 * @param {Number} percentLoaded the percentage of the loading process complete.
 */

/**
 * @property {Function} optionHasChanged Either the game or the commonUI can call this method on gcm to state that an option has changed.
 * @param {string} optionType one of MUTE, TURBO, ABOUT or interfacePREFERENCE.
 * @param {string} changedFrom one of COMMONUI, GAME. This tells gcm whether the option was switched in the game or the commonUI.
 * @param {boolean} newValue the new value of the option.
 */

/**
 * @property {Function} paidUpdate The game must call this each time paid changes, even though not all commonUI implementations will choose to display paid in the commonUI.
 * @param {Number} paid numeric value.
 * @returns {gcmFormattedMoney}
 */

/**
 * @property {Function} playForReal Both game and commonUI can call gcm.playForReal() to reload the game in real mode.
 */

/**
 * @property {Function} regOption This is an optional call for the game to make to GCM.
 * @param {String} optionType must be one of MUTE or TURBO (list can be extended in the future).
 * @returns {Boolean} the initial value of the option is returned back to the game. GCM can potentially in the future save these options in cookies or against the account, so that we have persistence of options.
 */

/**
 * @property {Function} resume This function is called by commonUI when it's done handling recoverable error.
 * @param {*} errorParamIndex of error Params passed for error category MULTI_CHOICE_DIALOG.
 */

/**
 * @property {Function} sessionContinue This will be called by common UI when user choose to continue on a game session
 */

/**
 * @property {Function} sessionEnd This will be called by common UI when user choose to quit the current game session
 */

/**
 * @property {Function} setGame gcmBridge will call this method from gcmReady(), passing in the game object supplied by the game on gcmBridge init()
 * @param {Object} game
 */

/**
 * @property {Function} stakeUpdate The game must call this each time the stake changes, even though not all commonUI implementations will choose to display stake in the commonUI.
 * @param {Number} stake numeric value
 * @returns {gcmFormattedMoney} the ccy format object of the stake value
 */

/* global Sys, Integration, Loader */
Sys.ns("Integration.GCM");

/**
 * The Error Handler override for GCM.
 *
 * Overridden to handle GCM specific errors.
 *
 * @class Integration.GCM.ErrorHandler
 * @override
 */
Integration.GCM.ErrorHandler = {

    /**
     * Determines what kind of error has happened and handles it. Overridden to handle GCM specific errors.
     *
     * @private
     * @param {XMLHttpRequest} serverRequest Request object as returned by Sys.utils.httpGet.
     * @returns {void}
     */
    handleRequestError: function(serverRequest) {
        var me = this,
            openBetErrorXML = Sys.utils.getResponseParameter("openbet.error.xml", serverRequest),
            errorStatus;

        // response undefined, 404 etc.
        if (!Sys.utils.httpRequestIsOK(serverRequest)) {
            errorStatus = "http";
        }
        else if (Sys.isDefined(openBetErrorXML)) {
            this.fireEvent("request:gcmProxy.handleError", {
                RGIError: true,
                RGIXML: openBetErrorXML.replace(/\+/g, " ")
            });
        }
        else {
            errorStatus = "server";
        }

        // Return if received same error that is showing.
        if (!Sys.isDefined(errorStatus) || errorStatus === me.readStatus()) {
            return;
        }

        // Call correct handler.
        me[me.errorStatus[errorStatus]]();

        me.setStatus(errorStatus);
    }
};

/**
 * The Resource Handler override for GCM.
 *
 * Overridden to disable slowness detected dialog.
 *
 * @class Integration.GCM.ResourceHandler
 * @override
 */
Integration.GCM.ResourceHandler = {

    /**
     * Overrides the base function slownessDetected. The actual showing of the dialog is handled by the commonUI, since its a notification that will be closed automatically by the game, but in GCM mode we do not have such functionality to close the dialog from the game itself so we have to leave it empty doing nothing.
     *
     * @returns {void}
     */
    slownessDetected: function() {
        // Stub.
    }
};

/**
 * The Device Detector override for GCM.
 *
 * Overrides the integration specific dialog handling in order to add GCM specific parameters to the dialog config.
 *
 * @class Integration.GCM.DeviceDetector
 * @override
 */
Integration.GCM.DeviceDetector = {

    /**
     * Overrides the integration specific dialog handling in order to add GCM specific parameters to the dialog config.
     *
     * @param {Object} config The dialog configuration.
     * @param {string} config.texts The texts to show in the dialog.
     * @param {Object} config.buttons The configurations to create buttons from.
     * @param {string} [config.id] The optional dialog id.
     * @param {string} [config.severity] The optional dialog severity.
     * @returns {void}
     */
    handleIntegrationSpecificDialogs: function(config) {
        var critical = config.severity === "stopped",
            gcmConfig = {
                category: "MULTI_CHOICE_DIALOG",
                severity: critical ? "ERROR" : "INFO",
                message: config.texts.join("\n"),
                errorCode: "ERROR",
                actions: [],
                extraParameters: {}
            },
            options = [];

        Sys.each(config.buttons, function(button) {
            options.push(button.label);
            gcmConfig.actions.push(button.action);
        });

        gcmConfig.extraParameters.options = options;

        this.fireEvent("request:gcmProxy.handleError", gcmConfig);
    }
};

/*
 * Self-executing function that applies overrides to loader classes if gcm is enabled.
 */
(function() {
    if (Sys.isGcmEnabled) {
        Sys.override(Loader.ErrorHandler, Integration.GCM.ErrorHandler);
        Sys.override(Loader.ResourceHandler, Integration.GCM.ResourceHandler);

        if (Sys.isDefined(Loader.DeviceDetector)) {
            Sys.override(Loader.DeviceDetector, Integration.GCM.DeviceDetector);
        }
    }
}());
