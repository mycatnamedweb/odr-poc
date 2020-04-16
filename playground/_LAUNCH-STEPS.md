
STEPS TO LAUNCH THE PLAYGROUND:

1. Download and uncompress the attached game bundle (modified by me)

From a terminal:
2. Install npm serve: `npm install -g serve`
3. Navigate into the starburst_mobile_html-5.31.0 folder
4. Execute from terminal: `serve .`

From a browser:
5. Click on Toggle Device Toolbar in order to emulate a mobile browser
6. Navigate to https://gpd.williamhill-dev.com/us/nj/bet
7. Execute the following code in the Console (DevTools)
<code>
    // Inject Netent game:
    // (with: 1. fixed main.js, 2. interceptor <script> in .xhtml)
    var iframe = document.createElement('iframe');
    iframe.src = 'http://gabriele-sacchi.github.io/odr-poc/playground/games/starburst_mobile_html/game/starburst_mobile_html.xhtml?lobbyURL=http://localhost:5000/&server=https://neogames-game-test.casinomodule.com/&sessId=DEMO-12345-EUR&operatorId=neogames&gameId=starburst_mobile_html_sw&lang=en&integration=standard&keepAliveURL=&disableDeviceDetection=true&skipIntro=false&launchType=iframe';
    iframe.height = '600px';
    iframe.width = '100%';
    document.body.appendChild(iframe);
</code>
