/// <reference path="definitions/createjs/tweenjs/Tween.d.ts"/>
/// <reference path="definitions/createjs/tweenjs/CSSPlugin.d.ts"/>
/// <reference path="definitions/createjs/tweenjs/Ease.d.ts"/>
/// <reference path="definitions/createjs/easeljs/utils/Ticker.d.ts"/>
// -------------------------------------------------------------------------------------------------------------------
//		GLOBAL
// --------------------------------------------------------------------------------------------------------------------
window.onload = function () {
    if(window.top != window) {
        document.getElementById("header").style.display = "none";
    }
    // createjs.CSSPlugin.install(createjs.Tween); <- Old API. Grant should update the examples
    createjs.CSSPlugin.install();
    createjs.Ticker.setFPS(20);
    var tweenCssExample = new TweenJSCssExample();
    tweenCssExample.init();
};
var TweenJSCssExample = (function () {
    // --------------------------------------------------------------------------------------------------------------------
    //		Constructor
    // --------------------------------------------------------------------------------------------------------------------
    function TweenJSCssExample() {
        // Membes
        this.m_ColorSeed = 0;
    }
    // --------------------------------------------------------------------------------------------------------------------
    //		PUBLIC METHODS
    // --------------------------------------------------------------------------------------------------------------------
        TweenJSCssExample.prototype.init = function () {
        var _this = this;
        var count = 600;
        while(--count >= 0) {
            var box = document.createElement("div");
            box.style.width = "6px";
            box.style.height = "2px";
            box.style.position = "absolute";
            box.style.borderRadius = "2px";
            box.style.backgroundColor = "#0F0";
            document.body.appendChild(box);
            var a = (Math.random() * Math.PI * 2 * 16 | 0) / 16;
            box.style.webkitTransform = "rotate(" + a + "rad)";
            var d = 30;
            box.style.left = window.innerWidth / 2 + Math.cos(a - 0.2 - Math.random()) * d + "px";
            box.style.top = window.innerHeight / 2 + Math.sin(a - 0.2 - Math.random()) * d + "px";
            d = (Math.min(window.innerWidth, window.innerHeight) - 16) / 2 * (Math.random() * 0.3 + 0.7);
            var x = window.innerWidth / 2 + Math.cos(a) * d;
            var y = window.innerHeight / 2 + Math.sin(a) * d;
            createjs.Tween.get(box, {
                loop: true
            }, true).set({
                opacity: "0"
            }, box.style).wait(Math.random() * 1000 + 1 | 0).call(function (tween) {
                _this.updateColor(tween);
            }).to({
                top: y,
                left: x,
                width: 16,
                height: 4,
                opacity: 1
            }, Math.random() * 1500 + 1000, this.easeIn);
        }
        // tween the base color that divs will be assigned when they start moving:
        createjs.Tween.get(this, {
            loop: true
        }).to({
            colorSeed: 360
        }, 5000);
    }// --------------------------------------------------------------------------------------------------------------------
    //		PRIVATE METHODS
    // --------------------------------------------------------------------------------------------------------------------
    ;
    TweenJSCssExample.prototype.updateColor = function (tween) {
        // grab the tween's target (the style object), and update it's color
        tween.target.style.backgroundColor = "hsl(" + (Math.random() * 60 + this.m_ColorSeed | 0) + ",100%,50%)";
        //tween._target.style.backgroundColor = "hsl("+(Math.random()*60+this.m_ColorSeed|0)+",100%,50%)";
            }// very simple easing equation:
    ;
    TweenJSCssExample.prototype.easeIn = function (ratio) {
        return ratio * ratio;
    };
    return TweenJSCssExample;
})();
//@ sourceMappingURL=tweenjs-css-example.js.map
