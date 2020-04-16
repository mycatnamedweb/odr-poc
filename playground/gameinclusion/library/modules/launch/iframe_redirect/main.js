/*
 * @netent/game-inclusion 1.7.2
 * Game Inclusion
 *
 * Copyright, NetEnt AB (publ)
 * Website: https://www.netent.com/
*/

var netent_iframe_redirect=function(){function o(o){var n=[{from:"gameServerURL",to:"server"},{from:"language",to:"lang"},{from:"sessionId",to:"sessId"},{from:"casinoBrand",to:"operatorId"}];if(o.hasOwnProperty("mobileParams")){var t=o.mobileParams;Object.keys(t).forEach(function(n){t.hasOwnProperty(n)&&!o.hasOwnProperty(n)&&(o[n]=t[n])})}delete o.mobileParams,n.forEach(function(n){o.hasOwnProperty(n.from)&&(o[n.to]=o[n.from]),delete o[n.from]})}function n(n,t,e){o(n.operatorConfiguration),netent_logging_handling.initLogging(n,n,function(){n.operatorConfiguration.gameURL=n.gameURL;try{var o=netent_launch_tools.extractQueryConfig(n.operatorConfiguration),t=netent_launch_tools.createUrl(n.gameURL,o);netent_logging_handling.log("game_load_started",null,function(){t=netent_tools.addLoggingData(t,!0),netent_iframe_redirect.windowLocation(t)})}catch(r){console.dir(r),e(r)}})}function t(o){window.location=o}return{init:n,windowLocation:t}}();