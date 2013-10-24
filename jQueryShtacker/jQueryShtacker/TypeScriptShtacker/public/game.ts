/// <reference path="../definitions/createjs/tweenjs/Tween.d.ts"/>
/// <reference path="../definitions/createjs/preloadjs/PreloadJS.d.ts"/>
/// <reference path="../definitions/createjs/easeljs/geom/Point.d.ts"/>
/// <reference path="../definitions/createjs/easeljs/utils/Ticker.d.ts"/>
/// <reference path="../definitions/createjs/easeljs/display/Container.d.ts"/>
/// <reference path="../definitions/createjs/easeljs/display/Stage.d.ts"/>
/// <reference path="../definitions/createjs/easeljs/display/Shape.d.ts"/>
/// <reference path="../definitions/createjs/easeljs/display/Bitmap.d.ts"/>

class Game {
    //Vars
    timerToken: number;
    private canvas: HTMLCanvasElement;
    private stage: createjs.Stage;
    private stageBg: createjs.Bitmap;
    private menuContainer: createjs.Container;

    private titleFont: string = "bold 56px Comic Sans MS";
    private menuFont: string = "bold 32px Comic Sans MS";
    private fontColor: string = "orange";

    private speed:number = 2000;

    constructor() {

    }

    initiate() {
        this.canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
        this.stage = new createjs.Stage(this.canvas);

        createjs.Ticker.setFPS(32);
        // in order for the stage to continue to redraw when the Ticker is paused we need to add it with
        // the second ("pauseable") param set to false.
        createjs.Ticker.addListener(this.stage, false);

        //Can't get this working, what's up with this?
        //this.stageBg = new createjs.Bitmap("assets/Images/gameBg.png");
        //this.stage.addChild(this.stageBg);
        var gradient = new createjs.Shape();
        gradient.graphics.beginLinearGradientFill(["#000", "#072B8A"], [0, 1], 0, 400, 600, 600).drawRect(0, 0, 400, 600);
        gradient.graphics.endFill();
        this.stage.addChild(gradient);
        this.stage.update();

        this.menuContainer = new createjs.Container();

        var title: createjs.Text = new createjs.Text();
        title.text = "Shtacker";
        title.color = this.fontColor;
        title.font = this.titleFont;
        title.x = 85;
        title.y = 100;
        this.menuContainer.addChild(title);

        var menu1: createjs.Text = new createjs.Text();
        menu1.text = "Play";
        menu1.color = this.fontColor;
        menu1.font = this.menuFont;
        menu1.x = 170;
        menu1.y = 240;
        menu1.onPress = () => { this.startPlay(); };
        this.menuContainer.addChild(menu1);

        this.menuContainer.x = 600;           
        this.stage.addChild(this.menuContainer);
        this.showMenu();
    }

    startPlay(): void {
        this.removeMenu();
        var circle = this.getCircle(381, 581);
        //this.drawcircle(19, 581);
        this.stage.addChild(circle);
        createjs.Tween.get(circle, { loop: true }).to({ x: 19 }, this.speed).to({ x: 381 }, this.speed);

        this.stage.update();
    }

    removeMenu(): void {
        createjs.Tween.get(this.menuContainer).to({ x: 500 }, 500);
    }

    showMenu(): void {
        createjs.Tween.get(this.menuContainer).to({ x: 0 }, 500);
    }


    getCircle(xCentre: number, yCentre: number): createjs.Shape {
        var circle = new createjs.Shape();
        circle.graphics.setStrokeStyle(6);
        circle.graphics.beginLinearGradientStroke(["#FFCC00", "#FFCC66"], [0, 1], 0, 0, 0, 10).drawCircle(0, 0, 4 * 4);
        circle.alpha = 0.8;
        circle.x = xCentre;
        circle.y = yCentre;
        return circle;
    }
}

window.onload = () => {
    var game = new this.Game();
    game.initiate();
};