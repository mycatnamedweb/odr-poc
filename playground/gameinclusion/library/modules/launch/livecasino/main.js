/*
 * @netent/game-inclusion 1.7.2
 * Game Inclusion
 *
 * Copyright, NetEnt AB (publ)
 * Website: https://www.netent.com/
*/

var netent_embed=function(){function e(e){var t={defaultWidth:e.defaultWidth,defaultHeight:e.defaultHeight,width:e.operatorConfiguration.width||e.defaultWidth,height:e.operatorConfiguration.height||e.defaultHeight,fullScreen:netent_tools.getBooleanValue(e.operatorConfiguration.fullScreen,!1),targetElement:e.operatorConfiguration.targetElement||netent_config_handling.defaultValues.targetElement,enforceRatio:netent_tools.getBooleanValue(e.operatorConfiguration.enforceRatio,!0)};if(!document.getElementById(t.targetElement))throw new netent_error_handling.GiError(16,"common.embed","targetElement",{value:t.targetElement});return t}function t(t){var n,o=e(t);return document.documentElement?(o.fullScreen&&(o.width=(window.innerWidth||document.documentElement.clientWidth)+"px",o.height=(window.innerHeight||document.documentElement.clientHeight)+"px"),n=netent_tools.resize(o.defaultWidth,o.defaultHeight,o.width,o.height,o.enforceRatio),t.width=n.width,t.height=n.height,t.targetElement=o.targetElement,t):{}}return{updateTargetElementConfig:t}}(),netent_common_flash=function(){function e(e){return{menu:netent_tools.getBooleanValue(e.operatorConfiguration.menu,!1),base:e.operatorConfiguration.base||".",quality:e.operatorConfiguration.quality||"high",scale:e.operatorConfiguration.scale||"exactfit",allowscriptaccess:e.operatorConfiguration.allowscriptaccess||"always",wmode:"direct"===e.defaultWmode?"direct":e.operatorConfiguration.wmode||e.defaultWmode,bgcolor:e.operatorConfiguration.bgcolor||"000000",allowFullScreen:netent_tools.getBooleanValue(e.operatorConfiguration.allowFullScreen,!0),allowFullScreenInteractive:netent_tools.getBooleanValue(e.operatorConfiguration.allowFullScreenInteractive,!0)}}function t(e){return{lang:e.language,gameId:e.operatorConfiguration.gameId,doDebug:netent_tools.getBooleanValue(e.operatorConfiguration.debugMode,!1),fullscreen:netent_tools.getBooleanValue(e.operatorConfiguration.fullScreen,!1),disableAudio:void 0!==e.operatorConfiguration.defaultAudio&&!e.operatorConfiguration.defaultAudio,ignoreminimumtime:netent_tools.getBooleanValue(e.operatorConfiguration.ignoreminimumtime,!1)}}function n(t,n,o,a,r){var i=e(t),l=function(e){e.success?"undefined"!=typeof netent_netentextend&&"livecasino-games"!==t.gameFamily?n(new netent_netentextend.Flash(document.getElementById(t.targetElement),t)):n():o(13,"common.flash")};if(window.swfobject)try{window.swfobject.embedSWF(r,t.targetElement,t.width,t.height,t.technologyVersion,t.staticServer+"gameinclusion/library/expressInstall.swf",a,i,{},l)}catch(s){o(13,"common.flash")}else o(14,"common.flash","Missing SwfObject")}function o(e,t,n){netent_tools.loadScript(e.staticServer+"gameinclusion/library/swfobject.js",t,function(){n(14,"common.flash","Invalid script src")},l)}function a(){return null!==document.getElementById(l)}function r(e){Object.keys(e.flashParams||{}).forEach(function(t){e.flashParams.hasOwnProperty(t)&&!e.hasOwnProperty(t)&&(e[t]=e.flashParams[t])}),delete e.flashParams}function i(e,t,i,l,s){r(e.operatorConfiguration),e.provisionSwfObject=netent_tools.getBooleanValue(e.operatorConfiguration.provisionSwfObject,!0);try{e=netent_embed.updateTargetElementConfig(e),e.provisionSwfObject&&!a()?o(e,function(){n(e,t,i,l,s)},i):n(e,t,i,l,s)}catch(u){if(!(u instanceof netent_error_handling.GiError))throw u;i(u)}}var l="gi-swfobject";return{launch:i,createStandardFlashVars:t}}(),netent_livecasino=function(){function e(e,t){var n="";return"default"!==t.casinoBrand&&(n=t.casinoBrand+"/"),e.replace("<casinobrand>/",n)}function t(t){"/"===t.gameServerURL[t.gameServerURL.length-1]&&(t.gameServerURL=t.gameServerURL.substring(0,t.gameServerURL.length-1)),t=netent_tools.combine(netent_launch_tools.flatten(t.liveCasinoParams,!0),t);var n={accountType:t.accountType||"SEAMLESS_WALLET",brandingLocale:t.brandingLocale||"en",casinoId:t.operatorId||t.casinoId,customLeaveTable:netent_tools.getBooleanValue(t.customLeaveTable,!1),alternateBranding:t.casinoBrand,gameHostURL:t.staticServer+e(a.gameHostPath,t),integrationTest:netent_tools.getBooleanValue(t.integrationTest,!1),jsonRequestURL:t.gameServerURL,lobbyURL:t.lobbyURL,tableId:t.tableId,sessionid:t.sessionId,showMiniLobby:netent_tools.getBooleanValue(t.showMiniLobby,!0),wmode:t.defaultWmode||t.operatorConfiguration.wmode};return n=netent_tools.combine(netent_common_flash.createStandardFlashVars(t),n),delete t.liveCasinoParams,n=netent_tools.combine(netent_launch_tools.flatten(t.operatorConfiguration,!0),n),netent_tools.removeMissingProperties(n),n}function n(n,o,r){netent_logging_handling.log("game_load_started"),netent_common_flash.launch(n,o,r,t(n),n.staticServer+e(a.liveCasinoLoaderPath,n))}var o=["operatorId||liveCasinoParams.casinoId||casinoId"],a={gameHostPath:"live_casino/<casinobrand>/",liveCasinoLoaderPath:"live_casino/<casinobrand>/livecasinoloader/livecasinoloader-application.swf"};return window.openLCHistory=function(e){var t="directories=no,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no,width=440,height=420";window.open(e,"history",t)},window.rules=function(e){var t="directories=no,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no,width=440,height=420";window.open(e,"rules",t)},{init:n,essentialParameters:o}}();