/*
 * @netent/game-inclusion 1.7.2
 * Game Inclusion
 *
 * Copyright, NetEnt AB (publ)
 * Website: https://www.netent.com/
*/

var netent_lcapi=function(){function e(e,a,n){e.currency||(e.currency="EUR"),e.walletMode||(e.walletMode="SEAMLESS_WALLET"),e.operatorId=e.operatorId||e.casinoId||e.liveCasinoParams.casinoId;var o=e.gameServerURL+"lobbycomm/services/LobbyApi/tables/"+e.operatorId+"/"+e.currency+"/"+e.walletMode;e.sessionId&&(o=o+"?sessionId="+e.sessionId);var s=e.staticServer||"https://"+e.operatorId+"-static.casinomodule.com/",i=function(r){var a="static://",n="mpp://";return 0===r.indexOf(a)?r.replace(a,s):0===r.indexOf(n)?r.replace(n,e.gameServerURL):r},t=function(e){for(var r={},a=0;a<e.length;++a)void 0!==e[a]&&(r[a]=e[a]);return r};netent_json_handling.getJson(o,function(r){for(var n=0;n<r.length;n++)if(r[n].tableBackgroundImageUrl=i(r[n].tableBackgroundImageUrl),r[n].dealer&&(r[n].dealer.imageUrl=i(r[n].dealer.imageUrl)),e.sessionId)for(var o=0;o<r[n].games.length;o++){var d=r[n].games[o];d.launchConfig={gameId:d.gameId,staticServer:s,gameServerURL:e.gameServerURL,sessionId:e.sessionId,casinoId:e.operatorId,tableId:r[n].tableId},r[n].playForFun===!0&&(d.forFunLaunchConfig=d.launchConfig,d.forFunLaunchConfig.sessionId="demo:"+d.forFunLaunchConfig.sessionId)}a(t(r))},function(e){var a=JSON.parse(e);n(new netent_error_handling.GiError(a.errors[0].errorCode,r,"XmlHTTPRequest",{error:a.errors[0].message}))},!0)}var r="netent_lcapi",a=["gameServerURL","operatorId||liveCasinoParams.casinoId||casinoId"];return{init:e,essentialParameters:a}}();