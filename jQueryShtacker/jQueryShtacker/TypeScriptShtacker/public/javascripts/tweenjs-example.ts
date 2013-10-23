/// <reference path="definitions/createjs/tweenjs/Tween.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Stage.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Shape.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Text.d.ts"/>
/// <reference path="definitions/createjs/easeljs/utils/Ticker.d.ts"/>
/// <reference path="definitions/createjs/tweenjs/Ease.d.ts"/>


// --------------------------------------------------------------------------------------------------------------------
//		GLOBAL
// --------------------------------------------------------------------------------------------------------------------
window.onload = () => {
	var tweenExample: TweenJSExample = new TweenJSExample();
	tweenExample.init();
};



class TweenJSExample {
	
	// Members
	private m_Stage: createjs.Stage;
	private m_Circle: createjs.Shape;
	private m_Highlight: createjs.Shape;
	private m_Text: createjs.Text;


	// --------------------------------------------------------------------------------------------------------------------
	//		Constructor
	// --------------------------------------------------------------------------------------------------------------------
	constructor () {}


	// --------------------------------------------------------------------------------------------------------------------
	//		PUBLIC METHODS
	// --------------------------------------------------------------------------------------------------------------------
	public init():void
	{	
		var canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas1");
		this.m_Stage = new createjs.Stage(canvasElement);

		this.m_Circle = new createjs.Shape();
		this.m_Circle.graphics.beginFill("#FF0000").drawCircle(0,0,50);

		this.m_Highlight = new createjs.Shape();
		this.m_Highlight.graphics.beginFill("#FFFF66").drawRect(-50,-5,100,30);
		this.m_Highlight.x = 250;
		this.m_Highlight.y = 250;

		this.m_Text = new createjs.Text("TweenJS", "bold 20px Arial");
		this.m_Text.textAlign = "center";
		this.m_Text.x =  250;
		this.m_Text.y = 250;

		this.m_Stage.addChild(this.m_Circle);
		this.m_Stage.addChild(this.m_Highlight);
		this.m_Stage.addChild(this.m_Text);

		// set up a tween that tweens between scale 0.3 and 1 every second.
		createjs.Tween.get(this.m_Circle,{loop:true})
			.wait(1000) // wait for 1 second
			.to({scaleX:0.2,scaleY:0.2}) // jump to the new scale properties (default duration of 0)
			.wait(1000)
			.to({scaleX:1,scaleY:1},1000,createjs.Ease.bounceOut) // tween to scaleX/Y of 1 with ease bounce out

		// for demonstration purposes, try setting the override (third) parameter to true
		// this will override any previous tweens on the circle and replace them with this tween
		// resulting in the scaling tween above being cleared.
		createjs.Tween.get(this.m_Circle, {loop:true}, true) // get a new tween targeting circle
			.to({x:500,y:200,alpha:0.1},1000,createjs.Ease.get(1)) // tween x/y/alpha properties over 1s (1000ms) with ease out
			.to({x:0},1000,createjs.Ease.get(-1)) // tween x over 0.5s with ease in
			.to({y:400}) // jump to new y property (defaults to a duration of 0)
			.call(console.log, ["wait..."], console) // call console.log("wait...")
			.wait(800) // wait for 0.8s
			.to({y:0,alpha:1},300) // tween y/alpha over 0.3s
			.call(console.log, ["done!"],console) // call console.log("done!");

		// this tween doesn't actually tween anything, it just sequences some actions:
		// note that it has pauseable set to false, so it will keep playing even when Ticker is paused.
		createjs.Tween.get(this.m_Text,{loop:true, ignoreGlobalPause:true}) // get a tween targeting txt
			.to({text:"the new javascript tweening engine"},1500) // change text after 1.5s
			.set({visible:false},this.m_Highlight) // set visible=false on highlight
			.to({text:"by Grant Skinner, gskinner.com"},1500) // change text after 1.5s
			.to({text:"TweenJS"},1500).set({visible:true},this.m_Highlight); // change text after 1.5s & set visible=true on highlight
			/*
			// We could also do the above using wait and set:
			.wait(1500) // wait 1.5s
			.set({visible:false},highlight) // set visible=false on highlight
			.set({text:"the new javascript tweening engine"}) // set the text property of the target
			.wait(1500).set({text:"by Grant Skinner, gskinner.com"}) // wait 1.5s & update text
			.wait(1500).set({text:"TweenJS"}).set({visible:true},highlight); // etc.
			*/

		createjs.Ticker.setFPS(20);
		// in order for the stage to continue to redraw when the Ticker is paused we need to add it with
		// the second ("pauseable") param set to false.
		createjs.Ticker.addListener(this.m_Stage,false);

	
	}

}