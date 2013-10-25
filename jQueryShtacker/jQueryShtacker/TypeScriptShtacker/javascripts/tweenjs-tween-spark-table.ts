/// reference path="Graphics.d.ts" />
/// <reference path="definitions/createjs/tweenjs/Tween.d.ts"/>
/// <reference path="definitions/createjs/tweenjs/Ease.d.ts"/>
/// <reference path="definitions/createjs/easeljs/utils/Ticker.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Stage.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Shape.d.ts"/>


// -------------------------------------------------------------------------------------------------------------------
//		GLOBAL
// --------------------------------------------------------------------------------------------------------------------


window.onload = () => {
	if (window.top != window)	{
		document.getElementById("header").style.display = "none";
  }

	var tweenTweenSparkTable: TweenJSTweenSparkTable = new TweenJSTweenSparkTable();
	tweenTweenSparkTable.init();
};



class TweenJSTweenSparkTable {

	// Members	
	private canvas:HTMLCanvasElement;
	private stage:createjs.Stage;
	private count:number = 0;
	private prevPoint:createjs.Point;
	private bar: createjs.Shape;
	private container;
	private oldX;
	private dataProvider:any[];
	private tweenType;
	private currentClip:createjs.Shape;
	private selectedFunction: createjs.Ease;
	private selectedItem;
	private resetRuninng: boolean;
	private hue;
	private selectedIndex:number = 0;
	private clips:createjs.Shape[] = [];	

	private update: boolean = false;
	


	// --------------------------------------------------------------------------------------------------------------------
	//		Constructor
	// --------------------------------------------------------------------------------------------------------------------
	constructor () { }


	// --------------------------------------------------------------------------------------------------------------------
	//		PUBLIC METHODS
	// --------------------------------------------------------------------------------------------------------------------
	public init(): void
	{ 
		this.canvas = <HTMLCanvasElement>document.getElementById("testCanvas");
		this.stage = new createjs.Stage(this.canvas);

		this.resetRuninng = false;
		var graphics = new createjs.Graphics();				
		
		this.dataProvider = [
			{type:"divider", label:"Ease Equations"},
			{type:createjs.Ease.backIn, label:"backIn"},
			{type:createjs.Ease.backInOut, label:"backInOut"},
			{type:createjs.Ease.backOut, label:"backOut"},
			{type:createjs.Ease.bounceIn, label:"bounceIn"},
			{type:createjs.Ease.bounceInOut, label:"bounceInOut"},
			{type:createjs.Ease.bounceOut, label:"bounceOut"},
			{type:createjs.Ease.circIn, label:"circIn"},
			{type:createjs.Ease.circInOut, label:"circInOut"},
			{type:createjs.Ease.circOut, label:"circOut"},
			{type:createjs.Ease.cubicIn, label:"cubicIn"},
			{type:createjs.Ease.cubicInOut, label:"cubicInOut"},
			{type:createjs.Ease.cubicOut, label:"cubicOut"},
			{type:createjs.Ease.elasticIn, label:"elasticIn"},
			{type:createjs.Ease.elasticInOut, label:"elasticInOut"},
			{type:createjs.Ease.elasticOut, label:"elasticOut"},
			{type:createjs.Ease.linear, label:"linear"},
			{type:createjs.Ease.none, label:"none"},
			{type:createjs.Ease.quadIn, label:"quadIn"},
			{type:createjs.Ease.quadInOut, label:"quadInOut"},
			{type:createjs.Ease.quadOut, label:"quadOut"},
			{type:createjs.Ease.quartIn, label:"quartIn"},
			{type:createjs.Ease.quartInOut, label:"quartInOut"},
			{type:createjs.Ease.quartOut, label:"quartOut"},
			{type:createjs.Ease.quintIn, label:"quintIn"},
			{type:createjs.Ease.quintInOut, label:"quintInOut"},
			{type:createjs.Ease.quintOut, label:"quintOut"},
			{type:createjs.Ease.sineIn, label:"sineIn"},
			{type:createjs.Ease.sineInOut, label:"sineInOut"},
			{type:createjs.Ease.sineOut, label:"sineOut"},

			{type:"divider", label:"Custom Eases"},
			{type:createjs.Ease.getBackIn(2.5), label:"getBackIn"},
			{type:createjs.Ease.getBackInOut(2.5), label:"getBackInOut"},
			{type:createjs.Ease.getBackOut(2.5), label:"getBackOut"},
			{type:createjs.Ease.getElasticIn(2,5), label:"getElasticIn"},
			{type:createjs.Ease.getElasticInOut(2,5), label:"getElasticInOut"},
			{type:createjs.Ease.getElasticOut(2,5), label:"getElasticOut"},
			{type:createjs.Ease.getPowIn(2.5), label:"getPowIn"},
			{type:createjs.Ease.getPowInOut(20.5), label:"getPowInOut"},
			{type:createjs.Ease.getPowOut(2.5), label:"getPowOut"}
		];		

		var eases = document.getElementById("eases");		
		var baseElement = <HTMLAnchorElement>document.createElement("a");
		baseElement.href = "#";
		var dataItem;
		var clonedElement

		for (var i=0, l = this.dataProvider.length; i<l; i++) {
			dataItem = this.dataProvider[i];

			if (dataItem.type == "divider")
			{
				var clonedElement = document.createElement("span");
				clonedElement.innerHTML = dataItem.label;
				eases.appendChild(clonedElement);
				continue;
			}
						
			clonedElement = <HTMLElement>baseElement.cloneNode(true);
			clonedElement.id = i; // .toString()
			clonedElement.onclick = ( event: MouseEvent ) => { this.selectItem( <HTMLElement>event.target ); }
			clonedElement.innerHTML = dataItem.label;

			eases.appendChild(clonedElement);

			// By default select LINEAR element
			if (dataItem.label == "linear")
			{
				this.selectedItem = clonedElement;
				this.selectedIndex = clonedElement.id;
				clonedElement.className = "selected";
			}
		}
			
		createjs.Ticker.addListener(this);
			
		this.container = new createjs.Container();
		this.container.x = 20;
		this.container.y = 20;
		this.stage.addChild(this.container);

		this.prevPoint = new createjs.Point(212, 0);

		this.bar = new createjs.Shape();
		this.bar.graphics.f("#FFFFFF").ss(1).dr(2, 0,4,15).dr(2, 330, 4, 15).ef().ss(1).f("#FFFFFF").dr(3, 10, 2, 320);
		this.bar.alpha = 0.7;
		this.container.addChild(this.bar);

		var bounds = new createjs.Shape();
		bounds.graphics.ss(1).s("#FFFFFF").mt(0, 0).lt(0, 350).lt(700, 350).lt(700, 0);
		bounds.alpha = 0.7;
		this.container.addChild(bounds);

		// Update stage to reflect changes
		this.stage.update();

		this.run();
	}


	private stop():void
	{
		//Ticker.removeListener(window);
	}

	private selectItem( selectedElement:HTMLElement ):boolean
	{
		if (this.clips.length > 0) { this.fade(); }
	

		if (this.selectedItem != null && this.selectedItem != selectedElement ) 
		{
			this.selectedItem.className = "";
		}
					
		this.selectedItem = selectedElement;
		this.selectedIndex = parseInt(this.selectedItem.id);
		this.selectedItem.className = "selected";
		this.selectedFunction = this.dataProvider[this.selectedIndex].type;

		this.resetRuninng = true;
		createjs.Tween.get(this.bar, { override: true }).to({ x: 0, y: 0 }, 500).call(() => { this.resetComplete(); });
		return false;
	}	
		
	private resetComplete() {
		this.count = 0;
		this.bar.x = 0;
		this.resetRuninng = false;
		this.currentClip = null;
			
		this.run(this.selectedFunction);
	}

	private run( easeType?:createjs.Ease )
	{
		this.currentClip = new createjs.Shape();
		this.clips.push(this.currentClip);
		this.stage.addChild(this.currentClip);

		this.update = true;											// TODO: What is this?

		this.oldX = 0;
		this.prevPoint.x = this.prevPoint.y = 0;

		createjs.Tween.get(this.bar, {override:true}).to({x:700}, 1500, easeType);
	}

	private tick() {
		if ( this.bar.x != this.oldX && !this.resetRuninng) {
			var g = this.currentClip.graphics;
			var pt = new createjs.Point(this.container.x + this.prevPoint.x, this.container.y + this.prevPoint.y);

			g.moveTo(pt.x, pt.y);

			this.count++;
			this.prevPoint.x = this.bar.x;
			this.prevPoint.y = ( this.count*11 );

			g.setStrokeStyle(1, "round", "round");
			this.hue = ( this.selectedIndex / this.dataProvider.length) * 360;

			g.beginStroke(createjs.Graphics.getHSL( this.hue, 50, 50));
			g.lineTo( this.container.x + this.prevPoint.x, this.container.y + this.prevPoint.y);
			g.beginStroke(createjs.Graphics.getHSL( this.hue, 100, 50));
			g.beginFill(createjs.Graphics.getHSL( this.hue, 100, 50));
			g.drawCircle(pt.x, pt.y, 2);
			g.endFill();

			this.stage.update();
		}
		else if ( this.resetRuninng)
		{
			this.stage.update();
		}
		this.oldX = this.bar.x;
	}

	private fade()
	{	
		for(var i=0; i<this.clips.length; i++)
		{
			var clip = this.clips[i];

			var tween = createjs.Tween.get( clip, { override: true } );
			tween.to( { alpha: clip.alpha - 0.4 }, 1000 ).call( ( cTween: createjs.Tween ) => { this.fadeTweenComplete( cTween ); } );
		}
	}

	private fadeTweenComplete( tween:createjs.Tween )
	{		
		var clip = tween.target;
		if (clip.alpha <= 0)
		{
			this.stage.removeChild(clip);
			var index = this.clips.indexOf(clip);
			this.clips.splice(index, 1);
		}	
	}

}