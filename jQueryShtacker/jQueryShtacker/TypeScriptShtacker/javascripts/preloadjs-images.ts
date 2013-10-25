/// <reference path="definitions/createjs/tweenjs/Tween.d.ts"/>
/// <reference path="definitions/createjs/preloadjs/PreloadJS.d.ts"/>
/// <reference path="definitions/createjs/easeljs/geom/Point.d.ts"/>
/// <reference path="definitions/createjs/easeljs/utils/Ticker.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Container.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Stage.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Shape.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Bitmap.d.ts"/>



interface ManifestObject 
{
	src: string;
	id: string;
}



class PreloadImages 
{

	// Members
	m_LoaderBar:createjs.Container;
	m_Stage:createjs.Stage;
	m_LoaderStage:createjs.Stage;
	m_Bar: createjs.Shape;
	m_Canvas:HTMLCanvasElement;
	m_Offset:createjs.Point;
	m_ImageContainer:createjs.Container;  	
	m_Update:boolean;
	m_BorderPadding:number;
	m_LoaderWidth:number;
	m_LoaderColor:string;
	m_TotalLoaded:number;
	m_Preload:createjs.PreloadJS;
	m_Manifest: ManifestObject[];
	m_CurrentItem: any;


	constructor () 
	{
  	this.init();
	}

	init(): void 
	{
		this.m_Manifest = [
				{src:"./assets/image0.jpg", id:"image0"},
				{src:"./assets/image1.jpg", id:"image1"},
				{src:"./assets/image2.jpg", id:"image2"},
				{src:"./assets/image3.jpg", id:"image3"}
			];

		var canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('myCanvas');
		this.m_Canvas = <HTMLCanvasElement>document.getElementById('loaderCanvas');
		this.m_Update = false;

		this.m_Stage = new createjs.Stage(canvas);
		this.m_LoaderStage = new createjs.Stage(this.m_Canvas);

		this.m_TotalLoaded = 0;
		this.m_BorderPadding = 10;
		
		var barHeight = 20;
		this.m_LoaderColor = createjs.Graphics.getRGB(0,0,0)
		this.m_LoaderBar = new createjs.Container();

		this.m_Bar = new createjs.Shape();
		this.m_Bar.graphics.beginFill( this.m_LoaderColor );
		this.m_Bar.graphics.drawRect(0, 0, 1, barHeight);
		this.m_Bar.graphics.endFill();

		this.m_ImageContainer = new createjs.Container();
		this.m_ImageContainer.x = 430;
		this.m_ImageContainer.y = 200;
		this.m_LoaderWidth = 800;
		this.m_Stage.addChild( this.m_ImageContainer );

		
		var bgBar = new createjs.Shape();
		var padding = 3
		bgBar.graphics.setStrokeStyle(1);
		bgBar.graphics.beginStroke( this.m_LoaderColor );
		bgBar.graphics.drawRect(-padding/2, -padding/2, this.m_LoaderWidth, barHeight+padding);

		this.m_LoaderBar.addChild(bgBar);
		
		this.m_LoaderBar.addChild( this.m_Bar );
		this.m_LoaderBar.x = this.m_LoaderBar.y = 10;

		this.m_LoaderStage.addChild( this.m_LoaderBar );

		this.m_Preload = new createjs.PreloadJS( true );
		// Use this instead to use tag loading
		//preload = new createjs.PreloadJS(false);

		this.m_Preload.onProgress = (event: createjs.PreloadOverallProgressEventArgs) => {
			this.m_Bar.scaleX = ( event.loaded * 100 ) * ( this.m_LoaderWidth / 100 );
			this.m_LoaderStage.update();
			if (this.m_Bar.scaleX >= (100*(this.m_LoaderWidth/100))) {
					this.m_LoaderBar.visible = false;
					this.m_LoaderStage.update();
			}
		};


		this.m_Preload.onComplete = (event: createjs.PreloadEventArgs) => {
			console.log('complete', event.src);				
		};
		

		this.m_Preload.onFileLoad = (event: createjs.PreloadEventArgs) => {
			var img = new Image();
			img.src = event.src;
			img.onload = (event2) => {
				var movieClip = new createjs.Container();
				var imageElem: HTMLImageElement = <HTMLImageElement>event2.currentTarget;
				var bmp = new createjs.Bitmap(imageElem);

				var _w = imageElem.width;
				var _h = imageElem.height;

				bmp.scaleX = bmp.scaleY = .75;
				bmp.regX = _w/2;
				bmp.regY = _h/2;

				bmp.onPress = (event3) => { this.press(event3); };
				bmp.rotation = Math.random() * 16 - 8;

				var border = new createjs.Shape();
				border.graphics.beginFill(createjs.Graphics.getRGB(255,255,255));
				border.graphics.drawRect(0, 0, _w + this.m_BorderPadding, _h + this.m_BorderPadding);
				border.graphics.endFill();
				border.rotation = bmp.rotation;
				border.regX = _w/2;
				border.regY = _h/2;
				bmp.x = bmp.y = (this.m_BorderPadding/2) * bmp.scaleX;

				border.scaleX = border.scaleY =  bmp.scaleX;

				border.shadow = new createjs.Shadow('#000000', 0, 0, 2.5);

				movieClip.addChild(border);
				movieClip.addChild(bmp);

				this.m_ImageContainer.addChild(movieClip);
				this.m_Update = true;
				this.m_TotalLoaded += 1;		


				if (this.m_TotalLoaded == this.m_Manifest.length) {
						this.m_Update = false;
						this.m_Stage.update();
				}
			};
		};

		this.m_Preload.loadManifest(this.m_Manifest);

		this.m_LoaderStage.update();
		this.m_Stage.update();
		createjs.Ticker.setFPS(30);
		createjs.Ticker.addListener(window);
	}
       
	private press(event):void
	{
			this.m_CurrentItem = event.target.parent;
						this.m_Update = true;
						var tween = createjs.Tween.get(this.m_CurrentItem).to({ y: -350 }, 200).call( 
							// Anonymus function
							() => {
								this.m_ImageContainer.addChildAt(this.m_CurrentItem, 0);
								var tween2 = createjs.Tween.get(this.m_CurrentItem).to({y:0}, 500).call(

								// Second anonymus
								() => {
									this.m_Stage.update();
									this.m_Update = false;
								});
						});
		}
	 
	private stop():void 
	{
		createjs.Ticker.removeListener(window);
		if (this.m_Preload != null) { this.m_Preload.close(); }
	}
		
	private tick():void
	{
		if ( this.m_Update )
		{
				this.m_Stage.update();
		}
	}

}


// Global var, create the class on window load
window.onload = () => {
		
	if (window.top != window) {
		document.getElementById("header").style.display = "none";
  }		
	var preloadImages: PreloadImages = new PreloadImages();
};