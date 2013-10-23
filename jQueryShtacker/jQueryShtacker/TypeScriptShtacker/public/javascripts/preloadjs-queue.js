window.onload = function () {
    if(window.top != window) {
        document.getElementById("header").style.display = "none";
    }
    var preloadQueue = new PreloadQueue();
    preloadQueue.init();
};
var PreloadQueue = (function () {
    function PreloadQueue() {
        this.m_Map = {
        };
        this.m_Width = 238;
        this.m_Height = 170;
    }
    PreloadQueue.prototype.init = function () {
        var _this = this;
        $("#loadAnotherBtn").click(function (event) {
            _this.loadAnother(event);
        });
        $("#loadAllBtn").click(function (event) {
            _this.loadAll(event);
        });
        $("#reloadBtn").click(function (event) {
            _this.reload(event);
        });
        this.reload();
    };
    PreloadQueue.prototype.reload = function (event) {
        var _this = this;
        if(this.m_Preload != null) {
            this.m_Preload.close();
        }
        $("#reloadBtn").css("display", "none");
        $(".box").remove();
        $("#mainProgress .progress").width(0);
        $("#loadAnotherBtn").attr("disabled", null);
        $("#loadAllBtn").attr("disabled", null);
        this.m_Manifest = [
            "assets/image0.jpg", 
            "assets/image1.jpg", 
            "assets/image2.jpg", 
            "assets/image3.jpg", 
            "assets/Autumn.png", 
            "assets/BlueBird.png", 
            "assets/Nepal.jpg", 
            "assets/Texas.jpg"
        ];
        this.m_Preload = new createjs.PreloadJS(true);
        this.m_Preload.onFileLoad = function (evt) {
            _this.handleFileLoad(evt);
        };
        this.m_Preload.onProgress = function (evt) {
            _this.handleOverallProgress(evt);
        };
        this.m_Preload.onFileProgress = function (evt) {
            _this.handleFileProgress(evt);
        };
        this.m_Preload.onError = function (evt) {
            _this.handleFileError(evt);
        };
        this.m_Preload.setMaxConnections(5);
    };
    PreloadQueue.prototype.stop = function () {
        if(this.m_Preload != null) {
            this.m_Preload.close();
        }
    };
    PreloadQueue.prototype.loadAll = function (event) {
        while(this.m_Manifest.length > 0) {
            this.loadAnother();
        }
    };
    PreloadQueue.prototype.loadAnother = function (event) {
        var item = this.m_Manifest.shift();
        this.m_Preload.loadFile(item);
        if(this.m_Manifest.length == 0) {
            $("#loadAnotherBtn").attr("disabled", "disabled");
            $("#loadAllBtn").attr("disabled", "disabled");
            $("#reloadBtn").css("display", "inline");
        }
        var div = $("#template").clone();
        div.attr("id", "");
        div.addClass("box");
        $("#container").append(div);
        this.m_Map[item] = div;
    };
    PreloadQueue.prototype.handleFileLoad = function (event) {
        var div = this.m_Map[event.src];
        div.addClass("complete");
        var img = event.result;
        var r = img.width / img.height;
        var ir = this.m_Width / this.m_Height;
        if(r > ir) {
            img.width = this.m_Width;
            img.height = this.m_Width / r;
        } else {
            img.height = this.m_Height;
            img.width = this.m_Height;
        }
        div.append(img);
    };
    PreloadQueue.prototype.handleOverallProgress = function (event) {
        $("#mainProgress > .progress").width(this.m_Preload.progress * $("#mainProgress").width());
    };
    PreloadQueue.prototype.handleFileProgress = function (event) {
        var div = this.m_Map[event.src];
        div.children("DIV").width(event.progress * div.width());
    };
    PreloadQueue.prototype.handleFileError = function (event) {
        var div = this.m_Map[event.src];
        div.addClass("error");
    };
    return PreloadQueue;
})();
