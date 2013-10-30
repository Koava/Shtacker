/// <reference path="tweenjs.d.ts" />
/// <reference path="easeljs.d.ts" />

class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;
    gameCanvas: HTMLCanvasElement;
    gameStage: createjs.Stage;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
        this.gameCanvas = <HTMLCanvasElement>(document.getElementById("gameCanvas"));

        this.gameStage = new createjs.Stage(this.gameCanvas);
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
        var g = new createjs.Graphics();
        g.setStrokeStyle(2);
        var r = g.beginFill("red").rect(10, 10, 10, 10).endFill();
        var s = new createjs.Shape(r);
        this.gameStage.addChild(s);
        this.gameStage.draw(this.gameCanvas.getContext("2d"));
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};