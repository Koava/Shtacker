/// <reference path="definitions/createjs/preloadjs/PreloadJS.d.ts"/>
/// <reference path="definitions/createjs/soundjs/FlashPlugin.d.ts"/>
/// <reference path="definitions/createjs/soundjs/SoundJS.d.ts"/>
/// <reference path="definitions/jquery-1.8.d.ts"/>
// --------------------------------------------------------------------------------------------------------------------
//		GLOBAL
// --------------------------------------------------------------------------------------------------------------------
var soundJSConvultion;
window.onload = function () {
    if(window.top != window) {
        document.getElementById("header").style.display = "none";
    }
    soundJSConvultion = new SoundJSConvultion();
    soundJSConvultion.init();
};
var SoundJSConvultion = (function () {
    // Controllable instance
    // --------------------------------------------------------------------------------------------------------------------
    //		Constructor
    // --------------------------------------------------------------------------------------------------------------------
    function SoundJSConvultion() {
    }
    // --------------------------------------------------------------------------------------------------------------------
    //		PUBLIC METHODS
    // --------------------------------------------------------------------------------------------------------------------
        SoundJSConvultion.prototype.init = function () {
        var _this = this;
        // Initialize the base path from this document to the Flash Plugin
        createjs.FlashPlugin.BASE_PATH = "javascripts/soundjs/";
        if(!createjs.SoundJS.checkPlugin(true)) {
            document.getElementById("error").style.display = "block";
            document.getElementById("content").style.display = "none";
            return;
        }
        document.getElementById("loader").className = "loader";
        // Preload a set of sounds.
        var assetPath = "assets/";
        var manifest = [
            {
                id: "dong",
                src: assetPath + "ToneWobble.mp3|" + assetPath + "ToneWobble.ogg",
                data: 3
            }, 
            {
                id: "rat",
                src: assetPath + "R-Damage.mp3|" + assetPath + "R-Damage.ogg",
                data: 2
            }, 
            {
                id: "gull",
                src: assetPath + "S-Damage.mp3|" + assetPath + "S-Damage.ogg",
                data: 1
            }
        ];
        this.m_Preload = new createjs.PreloadJS(true);
        this.m_Preload.onComplete = function () {
            _this.handleLoadComplete();
        };
        this.m_Preload.installPlugin(createjs.SoundJS);
        this.m_Preload.loadManifest(manifest);
    };
    SoundJSConvultion.prototype.stop = function () {
        if(this.m_Preload != null) {
            this.m_Preload.close();
        }
        createjs.SoundJS.stop();
    };
    SoundJSConvultion.prototype.handleLoadComplete = function () {
        document.getElementById("loader").className = "";
        // Enable the UI
        $("#demoStarter").attr("disabled", false);
    };
    SoundJSConvultion.prototype.begin = function () {
        //  In this demo, we play sounds at specific times, and show
        //  that the rules follow the instructions laid out.
        // Please report issues to create@createjs.com
        // Disable and reset the UI
        $("#demoStarter").attr("disabled", true);
        $("#p11").removeClass("active")// Reset UI
        ;
        // Play "dong" immediately
        this.m_Instance = createjs.SoundJS.play("dong", createjs.SoundJS.INTERRUPT_NONE, 0, 400, -1);
        $("#p01").addClass("active");
        // Play "gull" immediately
        createjs.SoundJS.play("gull", createjs.SoundJS.INTERRUPT_NONE);
        $("#p00").addClass("active");
        // Play "gull" after 150 ms. Interrupts first gull sound
        createjs.SoundJS.play("gull", createjs.SoundJS.INTERRUPT_ANY, 150);
        setTimeout(function () {
            $("#p00").removeClass("active");
            $("#p01").removeClass("active");
            $("#p02").addClass("active");
        }, 150);
        // Play "rat" after 1 second
        createjs.SoundJS.play("rat", createjs.SoundJS.INTERRUPT_NONE, 1000);
        setTimeout(function () {
            $("#p02").removeClass("active");
            $("#p03").addClass("active");
        }, 1000);
        // Play "rat" immediately after previous. Interrupts previous rat sound.
        setTimeout(function () {
            $("#p03").removeClass("active");
            createjs.SoundJS.play("rat", createjs.SoundJS.INTERRUPT_ANY);
            $("#p04").addClass("active");
        }, 1050);
        // Play "dong" after another second. Should start a new channel.
        setTimeout(function () {
            $("#p04").removeClass("active");
            createjs.SoundJS.play("dong", createjs.SoundJS.INTERRUPT_NONE, 0, 1000);
            $("#p05").addClass("active");
        }, 2500);
        // Play "dong" after another second. Should start a new channel.
        setTimeout(function () {
            $("#p05").removeClass("active");
            createjs.SoundJS.play("dong", createjs.SoundJS.INTERRUPT_NONE, 0, 1000);
            $("#p06").addClass("active");
        }, 3500);
        // Wait half a second, then pause all "dong" sounds.
        setTimeout(function () {
            $("#p06").removeClass("active");
            createjs.SoundJS.pause("dong");
            $("#p07").addClass("active");
        }, 4000);
        // Play another "dong" sound. instances are used up, so it should fail.
        setTimeout(function () {
            $("#p07").removeClass("active");
            createjs.SoundJS.play("dong", createjs.SoundJS.INTERRUPT_NONE, 0, 1000);
            $("#p08").addClass("active");
        }, 4500);
        // Wait 3 seconds, then resume all paused sounds.
        setTimeout(function () {
            $("#p08").removeClass("active");
            createjs.SoundJS.resume();
            $("#p09").addClass("active");
        }, 8000);
        // Wait another second, and play "dong" sound. Previous instance should be complete, so it will work.
        setTimeout(function () {
            $("#p09").removeClass("active");
            createjs.SoundJS.play("dong", createjs.SoundJS.INTERRUPT_NONE, 0, 1000);
            $("#p10").addClass("active");
        }, 9000);
        // Wait one second, and stop specific "dong" sounds.
        setTimeout(function () {
            $("#p10").removeClass("active");
            this.instance.stop();
            $("#p11").addClass("active");
        }, 10000);
        setTimeout(function () {
            $("#demoStarter").attr("disabled", false);
        }, 11000);
    };
    return SoundJSConvultion;
})();
//@ sourceMappingURL=soundjs-convultion.js.map
