/// <reference path="definitions/createjs/tweenjs/Tween.d.ts"/>
/// <reference path="definitions/createjs/tweenjs/Ease.d.ts"/>
/// <reference path="definitions/createjs/easeljs/utils/Ticker.d.ts"/>
/// <reference path="definitions/createjs/easeljs/ui/Touch.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Shape.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Text.d.ts"/>

// -------------------------------------------------------------------------------------------------------------------
//		GLOBAL
// --------------------------------------------------------------------------------------------------------------------


window.onload = () => {
	if (window.top != window) {
		document.getElementById("header").style.display = "none";
  }

	var tweenCircles: TweenJSCircles = new TweenJSCircles();
	tweenCircles.init();
};



class TweenJSCircles {
	// Membes
	private m_Canvas;
  private m_Stage;
  private m_Tweens;
  private m_ActiveCount;
  private m_CircleCount = 25;
  private m_Text;


	// --------------------------------------------------------------------------------------------------------------------
	//		Constructor
	// --------------------------------------------------------------------------------------------------------------------
	constructor () { }


	// --------------------------------------------------------------------------------------------------------------------
	//		PUBLIC METHODS
	// --------------------------------------------------------------------------------------------------------------------
	public init(): void
	{
		this.m_Canvas = document.getElementById("testCanvas");
    this.m_Stage = new createjs.Stage(this.m_Canvas);
    this.m_Tweens = [];
    this.m_Stage.enableMouseOver(10);
		createjs.Touch.enable(this.m_Stage);

    for (var i=0; i<this.m_CircleCount; i++)
		{
        var circle = new createjs.Shape();
        circle.graphics.setStrokeStyle(15);
        circle.graphics.beginStroke("#113355");
        circle.graphics.drawCircle(0,0,(i+1)*4);
        circle.alpha = 1-i*0.02;
        circle.x = Math.random()*550;
        circle.y = Math.random()*400;
        circle.compositeOperation = "lighter";

        var tween = createjs.Tween.get(circle)
					.to({ x: 275, y: 200 }, (0.5 + i * 0.04) * 1500, createjs.Ease.bounceOut)
					.call( () => { this.tweenComplete(); } );

        this.m_Tweens.push({tween:tween, ref:circle});
        this.m_Stage.addChild(circle);
    }

    this.m_ActiveCount = this.m_CircleCount;
    this.m_Stage.onMouseUp = (event: Event) => { this.handleMouseUp(event) };

	  this.m_Text = new createjs.Text("Click Anywhere to Tween", "36px Arial", "#777");
	  this.m_Text.x = 350;
	  this.m_Text.y = 200;
	  this.m_Stage.addChild(this.m_Text);

		createjs.Ticker.addListener(this);
	}


	// --------------------------------------------------------------------------------------------------------------------
	//		PRIVATE METHODS
	// --------------------------------------------------------------------------------------------------------------------
	private handleMouseUp(event):void
	{
	  if (this.m_Text) 
		{
	    this.m_Stage.removeChild(this.m_Text);
	    this.m_Text = null;
	  }
		
    for (var i=0; i<this.m_CircleCount; i++)
		{
			var ref = this.m_Tweens[i].ref;
			var tween = this.m_Tweens[i].tween;
			createjs.Tween.get(ref,{override:true})
				.to({x:this.m_Stage.mouseX,y:this.m_Stage.mouseY}, (0.5+i*0.04)*1500, createjs.Ease.bounceOut)
				.call(() => { this.tweenComplete(); } );
    }

    this.m_ActiveCount = this.m_CircleCount;
  }

	private tweenComplete():void
	{
      this.m_ActiveCount--;
  }

  private tick():void
	{
      if (this.m_ActiveCount) { this.m_Stage.update(); }
  }

}