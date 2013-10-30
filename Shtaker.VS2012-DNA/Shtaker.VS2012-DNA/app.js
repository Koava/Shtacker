/// <reference path="tweenjs.d.ts" />
/// <reference path="easeljs.d.ts" />
var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
        this.gameCanvas = (document.getElementById("gameCanvas"));

        this.gameStage = new createjs.Stage(this.gameCanvas);
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () {
            return _this.span.innerHTML = new Date().toUTCString();
        }, 500);
        var g = new createjs.Graphics();
        g.setStrokeStyle(2);
        var r = g.beginFill("red").rect(10, 10, 10, 10).endFill();
        var s = new createjs.Shape(r);
        this.gameStage.addChild(s);
        this.gameStage.draw(this.gameCanvas.getContext("2d"));
    };

    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
})();

window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};
//# sourceMappingURL=app.js.map
