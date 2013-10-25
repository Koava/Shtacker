/// <reference path="definitions/createjs/preloadjs/PreloadJS.d.ts"/>
/// <reference path="definitions/jquery-1.8.d.ts"/>

// --------------------------------------------------------------------------------------------------------------------
//		GLOBAL
// --------------------------------------------------------------------------------------------------------------------
window.onload = () => {
			
	if (window.top != window) {
		document.getElementById("header").style.display = "none";
	}
	var preloadQueue: PreloadQueue = new PreloadQueue();
	preloadQueue.init();
};



class PreloadQueue {

	// Members
	private m_Map = {};
	private m_Preload: createjs.PreloadJS;
	private m_Loader;
	private m_Manifest:string[];
	private m_Width:number = 238; // Item width
	private m_Height:number = 170; // Item height

	// --------------------------------------------------------------------------------------------------------------------
	//		Constructor
	// --------------------------------------------------------------------------------------------------------------------
	constructor (){}


	// --------------------------------------------------------------------------------------------------------------------
	//		PUBLIC METHODS
	// --------------------------------------------------------------------------------------------------------------------
	public init():void
	{
		$("#loadAnotherBtn").click((event: JQueryEventObject) => { this.loadAnother(event); } );
		$("#loadAllBtn").click((event: JQueryEventObject) => { this.loadAll(event); } );
		$("#reloadBtn").click((event: JQueryEventObject) => { this.reload(event); } );

		this.reload();
	}


	// --------------------------------------------------------------------------------------------------------------------
	//		PRIVATE METHODS
	// --------------------------------------------------------------------------------------------------------------------

	// Reset everything
	private reload( event?: JQueryEventObject ):void
	{
		// If there is an open preload queue, close it.
		if (this.m_Preload != null) { this.m_Preload.close(); }

		// Reset the UI
		$("#reloadBtn").css("display", "none");
		$(".box").remove();
		$("#mainProgress .progress").width(0);

		$("#loadAnotherBtn").attr("disabled", null);
		$("#loadAllBtn").attr("disabled", null);

		// Push each item into our manifest
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

		// Create a preloader. There is no manifest added to it up-front, we will add items on-demand.
		this.m_Preload = new createjs.PreloadJS(true);

		// Use this instead to use tag loading
		//preload = new createjs.PreloadJS(false);

		this.m_Preload.onFileLoad = (evt: createjs.PreloadEventArgs) => { this.handleFileLoad(evt); };
		this.m_Preload.onProgress = (evt: createjs.PreloadOverallProgressEventArgs) => { this.handleOverallProgress(evt); };
		this.m_Preload.onFileProgress = (evt: createjs.PreloadFileProgressEventArgs) => { this.handleFileProgress(evt); };
		this.m_Preload.onError = (evt: createjs.PreloadEventArgs) => { this.handleFileError(evt); };
		this.m_Preload.setMaxConnections(5);
	}

	private stop():void
	{
		if (this.m_Preload != null) { this.m_Preload.close(); }
	}

	private loadAll( event?: JQueryEventObject ):void
	{
		while (this.m_Manifest.length > 0)
		{
			this.loadAnother();
		}
	}

	private loadAnother(event?: JQueryEventObject):void
	{
		// Get the next manifest item, and load it
		var item = this.m_Manifest.shift();
		this.m_Preload.loadFile(item);

		// If we have no more items, disable the UI.
		if (this.m_Manifest.length == 0) {
			$("#loadAnotherBtn").attr("disabled", "disabled");
			$("#loadAllBtn").attr("disabled", "disabled");
			$("#reloadBtn").css("display","inline");
		}

		// Create a new loader display item
		var div = $("#template").clone();
		div.attr("id", ""); // Wipe out the ID
		div.addClass("box")
		$("#container").append(div);
		this.m_Map[item] = div; // Store a reference to each item by its src
	}

	// File complete handler
	private handleFileLoad( event: createjs.PreloadEventArgs )
	{		
		var div = this.m_Map[event.src];
		div.addClass("complete");

		// Get a reference to the loaded image (<img/>)
		var img = event.result;

		// Resize it to fit inside the item
		var r = img.width/img.height;
		var ir = this.m_Width/this.m_Height
		if (r > ir) {
			img.width = this.m_Width;
			img.height = this.m_Width/r;
		} else {
			img.height = this.m_Height;
			img.width = this.m_Height;
		}
		div.append(img); // Add it to the DOM
	}

	// Overall progress handler
	private handleOverallProgress( event: createjs.PreloadOverallProgressEventArgs ) {
		$("#mainProgress > .progress").width(this.m_Preload.progress * $("#mainProgress").width());
	}

	// File progress handler
	private handleFileProgress( event: createjs.PreloadFileProgressEventArgs ) {
		var div = this.m_Map[event.src]; // Lookup the related item
		div.children("DIV").width(event.progress*div.width()); // Set the width the progress.
	}	

	// An error happened on a file
	private handleFileError( event: createjs.PreloadEventArgs ) {
		var div = this.m_Map[event.src];
		div.addClass("error");
	}

}