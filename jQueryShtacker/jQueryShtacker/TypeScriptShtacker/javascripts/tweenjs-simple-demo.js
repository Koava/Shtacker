window.onload = function () {
    if(window.top != window) {
        document.getElementById("header").style.display = "none";
    }
    var tweenSimpleDemo = new TweenJSSimpleDemo();
    tweenSimpleDemo.init();
};
var TweenJSSimpleDemo = (function () {
    function TweenJSSimpleDemo() {
    }
    TweenJSSimpleDemo.prototype.init = function () {
        var _this = this;
        this.canvas = document.getElementById("testCanvas");
        this.stage = new createjs.Stage(this.canvas);
        this.stage.autoClear = true;
        var ball = new createjs.Shape();
        ball.graphics.setStrokeStyle(5, 'round', 'round');
        ball.graphics.beginStroke(('#000000'));
        ball.graphics.beginFill("#FF0000").drawCircle(0, 0, 50);
        ball.graphics.endStroke();
        ball.graphics.endFill();
        ball.graphics.setStrokeStyle(1, 'round', 'round');
        ball.graphics.beginStroke(('#000000'));
        ball.graphics.moveTo(0, 0);
        ball.graphics.lineTo(0, 50);
        ball.graphics.endStroke();
        ball.x = 200;
        ball.y = -50;
        var tween = createjs.Tween.get(ball, {
            loop: true
        }).to({
            x: ball.x,
            y: this.canvas.height - 55,
            rotation: -360
        }, 1500, createjs.Ease.bounceOut).wait(1000).to({
            x: this.canvas.width - 55,
            rotation: 360
        }, 2500, createjs.Ease.bounceOut).wait(1000).call(function (tween) {
            _this.handleComplete(tween);
        }).to({
            scaleX: 2,
            scaleY: 2,
            x: this.canvas.width - 110,
            y: this.canvas.height - 110
        }, 2500, createjs.Ease.bounceOut).wait(1000).to({
            scaleX: 0.5,
            scaleY: 0.5,
            x: 30,
            rotation: -360,
            y: this.canvas.height - 30
        }, 2500, createjs.Ease.bounceOut);
        this.stage.addChild(ball);
        createjs.Ticker.addListener(this);
    };
    TweenJSSimpleDemo.prototype.handleComplete = function (tween) {
        var ball = tween._target;
    };
    TweenJSSimpleDemo.prototype.tick = function () {
        this.stage.update();
    };
    return TweenJSSimpleDemo;
})();
