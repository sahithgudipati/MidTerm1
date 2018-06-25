
/* Name: Sahith Reddy Gudipati
 Id: 300986770
 Date: 6/25/2018 */

let app;
(function (app) {
    "use strict";

    // Game Variables
    let stage;
    let canvas;
    let helloLabel;
    let assetManager;
    let startButton;

    var d1;
    // bitmap image created for dice2
    var d2;
    // textblock created for dice 1
    var tb1;
    // textblock created for dice 2
    var tb2;
    let manifest = [
        { id: "1", src: "/Assets/images/1.png" },
        { id: "2", src: "/Assets/images/2.png" },
        { id: "3", src: "/Assets/images/3.png" },
        { id: "4", src: "/Assets/images/4.png" },
        { id: "5", src: "/Assets/images/5.png" },
        { id: "6", src: "/Assets/images/6.png" },
        { id: "blank", src: "/Assets/images/blank.png" },
        { id: "StartButton", src: "/Assets/images/StartButton.png" }
    ];

    function Init() {
        console.log("App Initializing...");
        assetManager = new createjs.LoadQueue();
        assetManager.installPlugin(createjs.Sound);
        assetManager.on("complete", Start);
        assetManager.loadManifest(manifest);
    }

    function roll() {
        stage.removeAllChildren();
        stage.addChild(startButton);
        var num1 = (Math.floor(Math.random() * 6) + 1);
        var num2 = (Math.floor(Math.random() * 6) + 1);
        var img1 = assetManager.getResult(num1);
        var img2 = assetManager.getResult(num2);
        d1 = new createjs.Bitmap(img1);
        d2 = new createjs.Bitmap(img2);
        d1.x = 640 - (d1.getBounds().width * 2) - 50;
        d2.x = 640 - (d1.getBounds().width) - 30;
        d1.y = 60;
        d2.y = 60;

        tb1 = new createjs.Text(num1);
        tb2 = new createjs.Text(num2);
        tb1.x = d1.x + (d1.getBounds().width * 0.4);
        tb2.x = d2.x + (d2.getBounds().width * 0.4);
        tb1.y = 100 + d1.getBounds().height + 5;
        tb2.y = 100 + d2.getBounds().height + 5;

        stage.addChild(d1);
        stage.addChild(d2);
        stage.addChild(tb1);
        stage.addChild(tb2);

        if (num1 == num2) {
            finish();
        }

    }

    function finish() {
        helloLabel = new createjs.Text("Goal!", "60px Consolas", "#DF1515");
        helloLabel.regX = helloLabel.getBounds().width * 0.5;
        helloLabel.regY = helloLabel.getBounds().height * 0.5;
        helloLabel.x = 160;
        helloLabel.y = 20;
        stage.addChild(helloLabel);
    }
    /**
     * The Start function initializes the createjs Stage object,
     * sets the framerate and sets up the Main Game Loop to
     * trigger every frame
     *
     */
    function Start() {
        console.log("App Started...");
        canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);

        Main();
    }

    /**
     * This is the Main Game Loop it runs at 60 fps
     *
     */
    function Update() {
        stage.update();
    }

    /**
     *  This is the main function - place all your code here
     *
     */
    function Main() {
        console.log("Main Function...");

        // hello label
        helloLabel = new createjs.Text("Rolling Dice !", "60px Consolas", "#DF1515");
        helloLabel.regX = helloLabel.getBounds().width * 0.5;
        helloLabel.regY = helloLabel.getBounds().height * 0.5;
        helloLabel.x = 320;
        helloLabel.y = 200;
        stage.addChild(helloLabel);

        // start button
        startButton = new createjs.Bitmap(assetManager.getResult("StartButton"));
        startButton.regX = startButton.getBounds().width * 0.5;
        startButton.regY = startButton.getBounds().height * 0.5;
        startButton.x = 320;
        startButton.y = 300;
        stage.addChild(startButton);

        // start button listeners
        startButton.addEventListener("click", function () {
            stage.removeAllChildren();
            startButton = new createjs.Bitmap(assetManager.getResult("StartButton"));
            startButton.regX = startButton.getBounds().width * 0.5;
            startButton.regY = startButton.getBounds().height * 0.5;
            startButton.x = 320;
            startButton.y = 400;
            stage.addChild(startButton);
            startButton.addEventListener("click", roll);

            console.log("Start Button Clicked");
        });

        startButton.addEventListener("mouseover", function (event) {
            event.currentTarget.alpha = 0.7;
        });

        startButton.addEventListener("mouseout", function (event) {
            event.currentTarget.alpha = 1.0;
        });
    }

    window.addEventListener("load", Init);
})(app | (app = {}));
