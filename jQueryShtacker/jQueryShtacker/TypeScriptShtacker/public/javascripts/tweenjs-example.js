window.onload = function () {
    var tweenExample = new TweenJSExample();
    tweenExample.init();
};
var TweenJSExample = (function () {
    function TweenJSExample() {
    }
    TweenJSExample.prototype.init = function () {
        var canvasElement = document.getElementById("canvas1");
        this.m_Stage = new createjs.Stage(canvasElement);
        this.m_Circle = new createjs.Shape();
        this.m_Circle.graphics.beginFill("#FF0000").drawCircle(0, 0, 50);
        this.m_Highlight = new createjs.Shape();
        this.m_Highlight.graphics.beginFill("#FFFF66").drawRect(-50, -5, 100, 30);
        this.m_Highlight.x = 250;
        this.m_Highlight.y = 250;
        this.m_Text = new createjs.Text("TweenJS", "bold 20px Arial");
        this.m_Text.textAlign = "center";
        this.m_Text.x = 250;
        this.m_Text.y = 250;
        this.m_Stage.addChild(this.m_Circle);
        this.m_Stage.addChild(this.m_Highlight);
        this.m_Stage.addChild(this.m_Text);
        createjs.Tween.get(this.m_Circle, {
            loop: true
        }).wait(1000).to({
            scaleX: 0.2,
            scaleY: 0.2
        }).wait(1000).to({
            scaleX: 1,
            scaleY: 1
        }, 1000, createjs.Ease.bounceOut);
        createjs.Tween.get(this.m_Circle, {
            loop: true
        }, true).to({
            x: 500,
            y: 200,
            alpha: 0.1
        }, 1000, createjs.Ease.get(1)).to({
            x: 0
        }, 1000, createjs.Ease.get(-1)).to({
            y: 400
        }).call(console.log, [
            "wait..."
        ], console).wait(800).to({
            y: 0,
            alpha: 1
        }, 300).call(console.log, [
            "done!"
        ], console);
        createjs.Tween.get(this.m_Text, {
            loop: true,
            ignoreGlobalPause: true
        }).to({
            text: "the new javascript tweening engine"
        }, 1500).set({
            visible: false
        }, this.m_Highlight).to({
            text: "by Grant Skinner, gskinner.com"
        }, 1500).to({
            text: "TweenJS"
        }, 1500).set({
            visible: true
        }, this.m_Highlight);
        createjs.Ticker.setFPS(20);
        createjs.Ticker.addListener(this.m_Stage, false);
    };
    return TweenJSExample;
})();
