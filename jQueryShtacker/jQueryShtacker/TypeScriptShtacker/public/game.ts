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
    private viewContainer: createjs.Container;
    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
        this.stage = new createjs.Stage(this.canvas);     

        //this.stageBg = new createjs.Bitmap("assets/Images/gameBg.png");
        //this.stage.addChild(this.stageBg);

        var gradient = new createjs.Shape();
        gradient.graphics.beginLinearGradientFill(["#000", "#072B8A"], [0, 1], 0, 400, 600, 600).drawRect(0, 0, 400, 600);
        gradient.graphics.endFill();
        this.stage.addChild(gradient);

        this.stage.update();
    }

    private drawcircle = (xCentre:number, yCentre:number, color:string) => {
        var circle = new createjs.Shape();
        circle.graphics.setStrokeStyle(6);
        circle.graphics.beginStroke("#113355");
        circle.graphics.drawCircle(0, 0, 4 * 4);
        circle.alpha = 1 - 3 * 0.02;
        circle.x = 200;
        circle.y = 200;
        circle.compositeOperation = "lighter";
        this.stage.addChild(circle); 
    }
}

window.onload = () => {
    var game = new Game();
};