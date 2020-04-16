/*
 * @netent/game-inclusion 1.7.2
 * Game Inclusion
 *
 * Copyright, NetEnt AB (publ)
 * Website: https://www.netent.com/
*/

var netent_embed=function(){function e(e){var t={defaultWidth:e.defaultWidth,defaultHeight:e.defaultHeight,width:e.operatorConfiguration.width||e.defaultWidth,height:e.operatorConfiguration.height||e.defaultHeight,fullScreen:netent_tools.getBooleanValue(e.operatorConfiguration.fullScreen,!1),targetElement:e.operatorConfiguration.targetElement||netent_config_handling.defaultValues.targetElement,enforceRatio:netent_tools.getBooleanValue(e.operatorConfiguration.enforceRatio,!0)};if(!document.getElementById(t.targetElement))throw new netent_error_handling.GiError(16,"common.embed","targetElement",{value:t.targetElement});return t}function t(t){var n,r=e(t);return document.documentElement?(r.fullScreen&&(r.width=(window.innerWidth||document.documentElement.clientWidth)+"px",r.height=(window.innerHeight||document.documentElement.clientHeight)+"px"),n=netent_tools.resize(r.defaultWidth,r.defaultHeight,r.width,r.height,r.enforceRatio),t.width=n.width,t.height=n.height,t.targetElement=r.targetElement,t):{}}return{updateTargetElementConfig:t}}(),netent_html_embed=function(){function e(e,t,n,o,a){var i=document.createElement("iframe");i.setAttribute("id",e),n.iframeSandbox&&i.setAttribute("sandbox",n.iframeSandbox.trim()),i.setAttribute("src",t),i.setAttribute("frameBorder","0");var l="autoplay;";return netent_tools.getBooleanValue(n.allowHtmlEmbedFullScreen,!1)&&(i.setAttribute("allowFullScreen",""),l+=" fullscreen;"),n.additionalAllow&&(l+=" "+n.additionalAllow.trim()),i.setAttribute("allow",l),i.setAttribute("autoplay",""),i.style.width=n.width,i.style.height=n.height,i.onload=function(){o&&o(new netent_netentextend.Html(i,n))},i.onerror=function(e){a(18,r,e)},i}function t(t,o,a){var i,l,d;n(t.operatorConfiguration);try{if(t=netent_embed.updateTargetElementConfig(t),d=document.getElementById(t.targetElement),!d)return;var u=netent_launch_tools.extractQueryConfig(t.operatorConfiguration);i=netent_launch_tools.createUrl(t.gameURL,u),netent_logging_handling.log("game_load_started"),i=netent_tools.addLoggingData(i),l=e(t.targetElement,i,t,o,a);var m=d.parentNode;m&&m.replaceChild(l,d)}catch(g){g instanceof netent_error_handling.GiError?a(g):a(18,r,g)}}function n(e){var t=[{from:"gameServerURL",to:"server"},{from:"language",to:"lang"},{from:"sessionId",to:"sessId"},{from:"casinoBrand",to:"operatorId"}];if(e.hasOwnProperty("mobileParams")){var n=e.mobileParams;Object.keys(n).forEach(function(t){n.hasOwnProperty(t)&&!e.hasOwnProperty(t)&&(e[t]=n[t])})}delete e.mobileParams,t.forEach(function(t){e.hasOwnProperty(t.from)&&(e[t.to]=e[t.from]),delete e[t.from]})}var r="netent_html_embed";return{init:t}}();