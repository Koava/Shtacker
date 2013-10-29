var MediaGrid = (function () {
    function MediaGrid() {
        this.m_Preload = new createjs.PreloadJS(true);
        this.m_Preload.installPlugin(createjs.SoundJS);
        this.m_Preload.onProgress = this.onProgressEvent;
        this.m_Preload.onLoadStart = this.onLoadStartEvent;
        this.m_Preload.onComplete = this.onCompletedEvent;
        this.m_Preload.onFileProgress = this.handleFileProgress;
        this.m_Preload.onFileLoad = this.handleFileLoaded;
        this.m_Preload.onError = this.handleFileError;
    }
    MediaGrid.prototype.stop = function () {
        if(this.m_Preload != null) {
            this.m_Preload.close();
        }
    };
    MediaGrid.prototype.loadAsset = function (target) {
        var div = document.getElementById(target.id);
        div.innerHTML = "<label>Loading...</label>";
        this.m_Preload.loadFile(target.id);
    };
    MediaGrid.prototype.onLoadStartEvent = function (event) {
        console.log(event);
    };
    MediaGrid.prototype.onProgressEvent = function (event) {
        console.log(event);
    };
    MediaGrid.prototype.onCompletedEvent = function (event) {
        console.log(event);
    };
    MediaGrid.prototype.handleFileProgress = function (event) {
        console.log(event);
    };
    MediaGrid.prototype.handleFileLoaded = function (event) {
        var div = document.getElementById(event.id);
        switch(event.type) {
            case createjs.PreloadJS.CSS: {
                var head = document.getElementsByTagName('head')[0];
                head.appendChild(event.result);
                div.innerHTML = "<label>Complete :)</label>";
                break;

            }
            case createjs.PreloadJS.IMAGE: {
                div.innerHTML = "<img src='" + event.id + "' width=" + div.clientWidth + " height=" + div.clientHeight + "/>";
                break;

            }
            case createjs.PreloadJS.JAVASCRIPT: {
                document.body.appendChild(event.result);
                div.innerHTML = "<label>Complete :)</label>";
                break;

            }
            case createjs.PreloadJS.JSON:
            case createjs.PreloadJS.XML: {
                alert(event.result);
                div.innerHTML = "<label>Complete :)</label>";
                break;

            }
            case createjs.PreloadJS.SOUND: {
                document.body.appendChild(event.result);
                var soundInstance = event.result;
                soundInstance.play();
                div.innerHTML = "<label>Complete :)</label>";
                break;

            }
        }
        div.style.backgroundColor = "#222222";
    };
    MediaGrid.prototype.handleFileError = function (result) {
        var div = document.getElementById(result.id);
        div.innerHTML = "<label>Error :(</label>";
        div.style.backgroundColor = "#992222";
    };
    return MediaGrid;
})();
var mediaGrid;
window.onload = function () {
    if(window.top != window) {
        document.getElementById("header").style.display = "none";
    }
    console.log("MediaGrid created");
    mediaGrid = new MediaGrid();
};
