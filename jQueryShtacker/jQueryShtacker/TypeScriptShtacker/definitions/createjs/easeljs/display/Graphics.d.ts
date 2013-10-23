declare module createjs {

	//
	// Definition file for EaselJS-0.5.0
	//

	/**
	* The Graphics class exposes an easy to use API for generating vector drawing instructions and drawing them to a specified context.
	* Note that you can use Graphics without any dependency on the Easel framework by calling draw() directly,
	* or it can be used with the Shape object to draw vector graphics within the context of an Easel display list.<br/><br/>
	* <pre><code>var g = new Graphics();
	*	g.setStrokeStyle(1);
	*	g.beginStroke(Graphics.getRGB(0,0,0));
	*	g.beginFill(Graphics.getRGB(255,0,0));
	*	g.drawCircle(0,0,3);
	*
	*	var s = new Shape(g);
	*		s.x = 100;
	*		s.y = 100;
	*
	*	stage.addChild(s);
	*	stage.update();</code></pre><br />
	* Note that all drawing methods in Graphics return the Graphics instance, so they can be chained together. For example, the following 
	* line of code would generate the instructions to draw a rectangle with a red stroke and blue fill, then render it to the specified 
	* context2D:<br />
	* <pre><code>myGraphics.beginStroke("#F00").beginFill("#00F").drawRect(20, 20, 100, 50).draw(myContext2D);
	* @class Graphics	
	**/
	class Graphics {

		// static public methods:

		/**
		 * Returns a CSS compatible color string based on the specified RGB numeric color values in the format 
		 * "rgba(255,255,255,1.0)", or if alpha is null then in the format "rgb(255,255,255)". For example,
		 * Graphics.getRGB(50, 100, 150, 0.5) will return "rgba(50,100,150,0.5)". It also supports passing a single hex color 
		 * value as the first param, and an optional alpha value as the second param. For example, Graphics.getRGB(0xFF00FF, 0.2)
		 * will return "rgba(255,0,255,0.2)".
		 * @method getRGB
		 * @static
		 * @param {Number} r The red component for the color, between 0 and 0xFF (255).
		 * @param {Number} g The green component for the color, between 0 and 0xFF (255).
		 * @param {Number} b The blue component for the color, between 0 and 0xFF (255).
		 * @param {Number} alpha Optional. The alpha component for the color where 0 is fully transparent and 1 is fully opaque.
		 * @return {String} A CSS compatible color string based on the specified RGB numeric color values in the format 
		 * "rgba(255,255,255,1.0)", or if alpha is null then in the format "rgb(255,255,255)".
		 **/
		static getRGB(r:number, g:number, b:number, alpha?:number):string;

		/**
		 * Returns a CSS compatible color string based on the specified HSL numeric color values in the format "hsla(360,100,100,1.0)", 
		 * or if alpha is null then in the format "hsl(360,100,100)". For example, Graphics.getHSL(150, 100, 70) will return 
		 * "hsl(150,100,70)".
		 * @method getHSL
		 * @static
		 * @param {Number} hue The hue component for the color, between 0 and 360.
		 * @param {Number} saturation The saturation component for the color, between 0 and 100.
		 * @param {Number} lightness The lightness component for the color, between 0 and 100.
		 * @param {Number} alpha Optional. The alpha component for the color where 0 is fully transparent and 1 is fully opaque.
		 * @return {String} A CSS compatible color string based on the specified HSL numeric color values in the format 
		 * "hsla(360,100,100,1.0)", or if alpha is null then in the format "hsl(360,100,100)". For example, 
		 * Graphics.getHSL(150, 100, 70) will return "hsl(150,100,70)".
		 **/
		static getHSL(hue:number, saturation:number, lightness:number, alpha?:number):string;

		/**
		 * Map of Base64 characters to values. Used by decodePath().
		 * @property BASE_64
		 * @static
		 * @final
		 * @type Object
		 **/
		static BASE_64:any;

		/**
		 * Maps numeric values for the caps parameter of setStrokeStyle to corresponding string values.
		 * This is primarily for use with the tiny API. The mappings are as follows: 0 to "butt",
		 * 1 to "round", and 2 to "square".
		 * For example, myGraphics.ss(16, 2) would set the line caps to "square".
		 * @property STROKE_CAPS_MAP
		 * @static
		 * @final
		 * @type Array[String]
		 **/
    static STROKE_CAPS_MAP:string[];

		/**
		 * Maps numeric values for the joints parameter of setStrokeStyle to corresponding string values.
		 * This is primarily for use with the tiny API. The mappings are as follows: 0 to "miter",
		 * 1 to "round", and 2 to "bevel".
		 * For example, myGraphics.ss(16, 0, 2) would set the line joints to "bevel".
		 * @property STROKE_JOINTS_MAP
		 * @static
		 * @final
		 * @type Array[String]
		 **/
    static STROKE_JOINTS_MAP:string[];



		// Properties:
		/**
		 * Maps the familiar ActionScript curveTo() method to the functionally similar quatraticCurveTo() method.
		 * @property curveTo
		 * @type Function
		 **/
		curveTo(cpx:number, cpy:number, x:number, y:number):Graphics;

		/**
		 * Maps the familiar ActionScript drawRect() method to the functionally similar rect() method.
		 * @property drawRect
		 * @type Function
		 **/
		drawRect(x:number, y:number, w:number, h:number):Graphics;
		



		// Constructor:
		constructor();




		/**
		 * Draws the display object into the specified context ignoring it's visible, alpha, shadow, and transform.
		 * Returns true if the draw was handled (useful for overriding functionality).
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method draw
		 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
		 **/
		draw(ctx:CanvasRenderingContext2D):void;

		/**
		 * Draws only the path described for this Graphics instance, skipping any
		 * non-path instructions, including fill and stroke descriptions.
		 * Used by DisplayObject.clippingPath to draw the clipping path, for example.
		 * @method drawAsPath
		 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
		 **/
		drawAsPath(ctx:CanvasRenderingContext2D): void;


		// public methods that map directly to context 2D calls:
		/**
		 * Moves the drawing point to the specified position.
		 * @method moveTo
		 * @param {Number} x The x coordinate the drawing point should move to.
		 * @param {Number} y The y coordinate the drawing point should move to.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		moveTo(x:number, y:number):Graphics;

		/**
		 * Draws a line from the current drawing point to the specified position, which become the new current drawing point. 
		 * For detailed information, read the 
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#complex-shapes-(paths)">
		 * whatwg spec</a>.
		 * @method lineTo
		 * @param {Number} x The x coordinate the drawing point should draw to.
		 * @param {Number} y The y coordinate the drawing point should draw to.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		lineTo(x:number, y:number):Graphics;

		/**
		 * Draws an arc with the specified control points and radius.  For detailed information, read the 
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-arcto">
		 * whatwg spec</a>.
		 * @method arcTo
		 * @param {Number} x1
		 * @param {Number} y1
		 * @param {Number} x2
		 * @param {Number} y2
		 * @param {Number} radius
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		arcTo(x1:number, y1:number, x2:number, y2:number, radius:number):Graphics;

		/**
		 * Draws an arc defined by the radius, startAngle and endAngle arguments, centered at the position (x, y). For example 
		 * arc(100, 100, 20, 0, Math.PI*2) would draw a full circle with a radius of 20 centered at (100, 100). For detailed 
		 * information, read the 
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-arc">whatwg spec</a>.
		 * @method arc
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} radius
		 * @param {Number} startAngle Measured in radians.
		 * @param {Number} endAngle Measured in radians.
		 * @param {Boolean} anticlockwise
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		arc(x:number, y:number, radius:number, startAngle:number, endAngle:number, anticlockwise:boolean):Graphics;

		/**
		 * Draws a quadratic curve from the current drawing point to (x, y) using the control point (cpx, cpy).  For detailed information, 
		 * read the <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-quadraticcurveto">
		 * whatwg spec</a>.
		 * @method quadraticCurveTo
		 * @param {Number} cpx
		 * @param {Number} cpy
		 * @param {Number} x
		 * @param {Number} y
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		quadraticCurveTo(cpx:number, cpy:number, x:number, y:number):Graphics;

		/**
		 * Draws a bezier curve from the current drawing point to (x, y) using the control points (cp1x, cp1y) and (cp2x, cp2y).  
		 * For detailed information, read the 
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-beziercurveto">
		 * whatwg spec</a>.
		 * method @bezierCurveTo
		 * @param {Number} cp1x
		 * @param {Number} cp1y
		 * @param {Number} cp2x
		 * @param {Number} cp2y
		 * @param {Number} x
		 * @param {Number} y
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		bezierCurveTo(cp1x:number, cp1y:number, cp2x:number, cp2y:number, x:number, y:number):Graphics;

		/**
		 * Draws a rectangle at (x, y) with the specified width and height using the current fill and/or stroke.
		 *  For detailed information, read the 
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-rect">
		 * whatwg spec</a>.
		 * @method rect
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} w Width of the rectangle
		 * @param {Number} h Height of the rectangle
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		rect(x:number, y:number, w:number, h:number):Graphics;

		/**
		 * Closes the current path, effectively drawing a line from the current drawing point to the first drawing point specified
		 * since the fill or stroke was last set.
		 * @method closePath
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		closePath():Graphics;



		// public methods that roughly map to Flash graphics APIs:
		/**
		 * Clears all drawing instructions, effectively reseting this Graphics instance.
		 * @method clear
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		clear():Graphics;

		/**
		 * Begins a fill with the specified color. This ends the current subpath.
		 * @method beginFill
		 * @param {String} color A CSS compatible color value (ex. "#FF0000" or "rgba(255,0,0,0.5)"). Setting to null will 
		 * result in no fill.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		beginFill(color:string):Graphics;

		/**
		 * Begins a linear gradient fill defined by the line (x0, y0) to (x1, y1). This ends the current subpath. For example, the
		 * following code defines a black to white vertical gradient ranging from 20px to 120px, and draws a square to display it:<br/>
		 * myGraphics.beginLinearGradientFill(["#000","#FFF"], [0, 1], 0, 20, 0, 120).drawRect(20, 20, 120, 120);
		 * @method beginLinearGradientFill
		 * @param {Array[String]} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define a gradient 
		 * drawing from red to blue.
		 * @param {Array[Number]} ratios An array of gradient positions which correspond to the colors. For example, [0.1, 0.9] would draw 
		 * the first color to 10% then interpolating to the second color at 90%.
		 * @param {Number} x0 The position of the first point defining the line that defines the gradient direction and size.
		 * @param {Number} y0 The position of the first point defining the line that defines the gradient direction and size.
		 * @param {Number} x1 The position of the second point defining the line that defines the gradient direction and size.
		 * @param {Number} y1 The position of the second point defining the line that defines the gradient direction and size.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		beginLinearGradientFill(colors:string[], ratios:number[], x0:number, y0:number, x1:number, y1:number):Graphics;

		/**
		 * Begins a radial gradient fill. This ends the current subpath. For example, the following code defines a red to blue radial 
		 * gradient centered at (100, 100), with a radius of 50, and draws a circle to display it:<br/>
		 * myGraphics.beginRadialGradientFill(["#F00","#00F"], [0, 1], 100, 100, 0, 100, 100, 50).drawCircle(100, 100, 50);
		 * @method beginRadialGradientFill
		 * @param {Array[String]} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define a gradient 
		 * drawing from red to blue.
		 * @param {Array[Number]} ratios An array of gradient positions which correspond to the colors. For example, [0.1, 0.9] would 
		 * draw the first color to 10% then interpolating to the second color at 90%.
		 * @param {Number} x0 Center position of the inner circle that defines the gradient.
		 * @param {Number} y0 Center position of the inner circle that defines the gradient.
		 * @param {Number} r0 Radius of the inner circle that defines the gradient.
		 * @param {Number} x1 Center position of the outer circle that defines the gradient.
		 * @param {Number} y1 Center position of the outer circle that defines the gradient.
		 * @param {Number} r1 Radius of the outer circle that defines the gradient.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		beginRadialGradientFill(colors:string[], ratios:number[], x0:number, y0:number, r0:number, x1:number, y1:number, r1:number):Graphics;
		
		/**
		 * Begins a pattern fill using the specified image. This ends the current subpath.
		 * @method beginBitmapFill
		 * @param {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement} image The Image, Canvas, or Video object to use as the pattern.
		 * @param {String} repetition Optional. Indicates whether to repeat the image in the fill area. One of "repeat", "repeat-x",
		 * "repeat-y", or "no-repeat". Defaults to "repeat".
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		beginBitmapFill(image:any, repetition?:string):Graphics;

		/**
		 * Ends the current subpath, and begins a new one with no fill. Functionally identical to beginFill(null).
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		endFill():Graphics;

		/**
		 * Sets the stroke style for the current subpath. Like all drawing methods, this can be chained, so you can define the stroke style and color in a single line of code like so:
		 * myGraphics.setStrokeStyle(8,"round").beginStroke("#F00");
		 * @method setStrokeStyle
		 * @param {Number} thickness The width of the stroke.
		 * @param {String | Number} caps Optional. Indicates the type of caps to use at the end of lines. One of butt, round, or square. Defaults to "butt". Also accepts the values 0 (butt), 1 (round), and 2 (square) for use with the tiny API.
		 * @param {String | Number} joints Optional. Specifies the type of joints that should be used where two lines meet. One of bevel, round, or miter. Defaults to "miter". Also accepts the values 0 (miter), 1 (round), and 2 (bevel) for use with the tiny API.
		 * @param {Number} miter Optional. If joints is set to "miter", then you can specify a miter limit ratio which controls at what point a mitered joint will be clipped.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		setStrokeStyle(thickness:number, caps?:any, joints?:any, miter?:number):Graphics;	// TODO: Do the overload

		/**
		 * Begins a stroke with the specified color. This ends the current subpath.
		 * @method beginStroke
		 * @param {String} color A CSS compatible color value (ex. "#FF0000" or "rgba(255,0,0,0.5)"). Setting to null will result in no stroke.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		beginStroke(color:string):Graphics;

		/**
		 * Begins a linear gradient stroke defined by the line (x0, y0) to (x1, y1). This ends the current subpath. For example, the following code defines a black to white vertical gradient ranging from 20px to 120px, and draws a square to display it:<br/>
		 * myGraphics.setStrokeStyle(10).beginLinearGradientStroke(["#000","#FFF"], [0, 1], 0, 20, 0, 120).drawRect(20, 20, 120, 120);
		 * @method beginLinearGradientStroke
		 * @param {Array[String]} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define a gradient drawing from red to blue.
		 * @param {Array[Number]} ratios An array of gradient positions which correspond to the colors. For example, [0.1, 0.9] would draw the first color to 10% then interpolating to the second color at 90%.
		 * @param {Number} x0 The position of the first point defining the line that defines the gradient direction and size.
		 * @param {Number} y0 The position of the first point defining the line that defines the gradient direction and size.
		 * @param {Number} x1 The position of the second point defining the line that defines the gradient direction and size.
		 * @param {Number} y1 The position of the second point defining the line that defines the gradient direction and size.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		beginLinearGradientStroke(colors:string[], ratios:number[], x0:number, y0:number, x1:number, y1:number):Graphics;

		/**
		 * Begins a radial gradient stroke. This ends the current subpath. For example, the following code defines a red to blue radial gradient centered at (100, 100), with a radius of 50, and draws a rectangle to display it:<br/>
		 * myGraphics.setStrokeStyle(10).beginRadialGradientStroke(["#F00","#00F"], [0, 1], 100, 100, 0, 100, 100, 50).drawRect(50, 90, 150, 110);
		 * @method beginRadialGradientStroke
		 * @param {Array[String]} colors An array of CSS compatible color values. For example, ["#F00","#00F"] would define a gradient drawing from red to blue.
		 * @param {Array[Number]} ratios An array of gradient positions which correspond to the colors. For example, [0.1, 0.9] would draw the first color to 10% then interpolating to the second color at 90%, then draw the second color to 100%.
		 * @param {Number} x0 Center position of the inner circle that defines the gradient.
		 * @param {Number} y0 Center position of the inner circle that defines the gradient.
		 * @param {Number} r0 Radius of the inner circle that defines the gradient.
		 * @param {Number} x1 Center position of the outer circle that defines the gradient.
		 * @param {Number} y1 Center position of the outer circle that defines the gradient.
		 * @param {Number} r1 Radius of the outer circle that defines the gradient.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)	
		 **/
		beginRadialGradientStroke(colors:string[], ratios:number[], x0:number, y0:number, r0:number, x1:number, y1:number, r1:number):Graphics;

		/**
		 * Begins a pattern fill using the specified image. This ends the current subpath.
		 * @method beginBitmapStroke
		 * @param {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement} image The Image, Canvas, or Video object to use as the pattern.
		 * @param {String} repetition Optional. Indicates whether to repeat the image in the fill area. One of "repeat", "repeat-x",
		 * "repeat-y", or "no-repeat". Defaults to "repeat".
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)	
		 **/
		beginBitmapStroke(image:any, repetition:string):Graphics;	// TODO: Do the overload

		/**
		 * Ends the current subpath, and begins a new one with no stroke. Functionally identical to beginStroke(null).
		 * @method endStroke
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		endStroke():Graphics;
		

		/**
		 * Draws a rounded rectangle with all corners with the specified radius.
		 * @method drawRoundRect
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} w
		 * @param {Number} h
		 * @param {Number} radius Corner radius.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		drawRoundRect(x:number, y:number, w:number, h:number, radius:number):Graphics;

		/**
		 * Draws a rounded rectangle with different corner radii. Supports positive and negative corner radii.
		 * @method drawRoundRectComplex
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} w
		 * @param {Number} h
		 * @param {Number} radiusTL Top left corner radius.
		 * @param {Number} radiusTR Top right corner radius.
		 * @param {Number} radiusBR Bottom right corner radius.
		 * @param {Number} radiusBL Bottom left corner radius.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		drawRoundRectComplex(x:number, y:number, w:number, h:number, radiusTL:number, radiusTR:number, radiusBR:number, radiusBL:number):Graphics;

		/**
		 * Draws a circle with the specified radius at (x, y).
		*
		 * <pre><code>var g = new Graphics();
		*	g.setStrokeStyle(1);
		*	g.beginStroke(Graphics.getRGB(0,0,0));
		*	g.beginFill(Graphics.getRGB(255,0,0));
		*	g.drawCircle(0,0,3);
		*
		*	var s = new Shape(g);
		*		s.x = 100;
		*		s.y = 100;
		*
		*	stage.addChild(s);
		*	stage.update();</code></pre>
		 * @method drawCircle
		 * @param {Number} x x coordinate center point of circle.
		 * @param {Number} y y coordinate center point of circle.
		 * @param {Number} radius Radius of circle.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		drawCircle(x:number, y:number, radius:number):Graphics;

		/**
		 * Draws an ellipse (oval).
		 * @method drawEllipse
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} w
		 * @param {Number} h
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		drawEllipse(x:number, y:number, w:number, h:number):Graphics;

		/**
		 * Draws a star if pointSize is greater than 0 or a regular polygon if pointSize is 0 with the specified number of points.
		 * For example, the following code will draw a familiar 5 pointed star shape centered at 100, 100 and with a radius of 50:
		 * myGraphics.beginFill("#FF0").drawPolyStar(100, 100, 50, 5, 0.6, -90); // -90 makes the first point vertical
		 * @method drawPolyStar
		 * @param {Number} x Position of the center of the shape.
		 * @param {Number} y Position of the center of the shape.
		 * @param {Number} radius The outer radius of the shape.
		 * @param {Number} sides The number of points on the star or sides on the polygon.
		 * @param {Number} pointSize The depth or "pointy-ness" of the star points. A pointSize of 0 will draw a regular polygon (no points), 
		 * a pointSize of 1 will draw nothing because the points are infinitely pointy.
		 * @param {Number} angle The angle of the first point / corner. For example a value of 0 will draw the first point directly to the 
		 * right of the center.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		drawPolyStar(x:number, y:number, radius:number, sides:number, ponumberSize:number, angle:number):Graphics;

		/**
		 * Decodes a compact encoded path string into a series of draw instructions.
		 * This format is not intended to be human readable, and is meant for use by authoring tools.
		 * The format uses a base64 character set, with each character representing 6 bits, to define a series of draw commands.
		 * <br/><br/>
		 * Each command is comprised of a single "header" character followed by a variable number of alternating x and y position values.
		 * Reading the header bits from left to right (most to least significant): bits 1 to 3 specify the type of operation
		 * (0-moveTo, 1-lineTo, 2-quadraticCurveTo, 3-bezierCurveTo, 4-7 unused). Bit 4 indicates whether position values use 12 bits (2 characters) 
		 * or 18 bits (3 characters), with a one indicating the latter. Bits 5 and 6 are currently unused.
		 * <br/><br/>
		 * Following the header is a series of 2 (moveTo, lineTo), 4 (quadraticCurveTo), or 6 (bezierCurveTo) parameters.
		 * These parameters are alternating x/y positions represented by 2 or 3 characters (as indicated by the 4th bit in the command char).
		 * These characters consist of a 1 bit sign (1 is negative, 0 is positive), followed by an 11 (2 char) or 17 (3 char) bit integer value.
		 * All position values are in tenths of a pixel.
		 * Except in the case of move operations, this value is a delta from the previous x or y position (as appropriate).
		 * <br/><br/>
		 * For example, the string "A3cAAMAu4AAA" represents a line starting at -150,0 and ending at 150,0.
		 * A - bits 000000. First 3 bits (000) indicate a moveTo operation. 4th bit (0) indicates 2 chars per parameter.
		 * n0 - 110111011100. Absolute x position of -150.0px. First bit indicates a negative value, remaining bits indicate 1500 tenths of a pixel. 
		 * AA - 000000000000. Absolute y position of 0.
		 * I - 001100. First 3 bits (001) indicate a lineTo operation. 4th bit (1) indicates 3 chars per parameter.
		 * Au4 - 000000101110111000. An x delta of 300.0px, which is added to the previous x value of -150.0px to provide an absolute position of +150.0px.
		 * AAA - 000000000000000000. A y delta value of 0.
		 * 
		 * @method decodePath
		 * @param {String} str The path string to decode.
		 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
		 **/
		decodePath(str:string):Graphics;

		/**
		 * Returns a clone of this Graphics instance.
		 * @method clone
		 * @return {Graphics} A clone of the current Graphics instance.
		 **/
		clone():Graphics;

		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		tostring():string;




		// tiny API:
		/** Shortcut to moveTo.
		 * @property mt
		 * @protected
		 * type Function
		 **/
		mt(x:number, y:number):Graphics;

		/** Shortcut to lineTo.
		 * @property lt
		 * @protected
		 * type Function
		 **/
		lt(x:number, y:number):Graphics;

		/** Shortcut to arcTo.
		 * @property at
		 * @protected
		 * type Function
		 **/
		at(x1:number, y1:number, x2:number, y2:number, radius:number):Graphics;

		/** Shortcut to bezierCurveTo.
		 * @property bt
		 * @protected
		 * type Function
		 **/
		bt(cp1x:number, cp1y:number, cp2x:number, cp2y:number, x:number, y:number):Graphics;

		/** Shortcut to quadraticCurveTo / curveTo.
		 * @property qt
		 * @protected
		 * type Function
		 **/
		qt(cpx:number, cpy:number, x:number, y:number):Graphics;

		/** Shortcut to arc.
		 * @property a
		 * @protected
		 * type Function
		 **/
		a(x:number, y:number, radius:number, startAngle:number, endAngle:number, anticlockwise:boolean):Graphics;

		/** Shortcut to rect.
		 * @property r
		 * @protected
		 * type Function
		 **/
		r(x:number, y:number, w:number, h:number):Graphics;

		/** Shortcut to closePath.
		 * @property cp
		 * @protected
		 * type Function
		 **/
		cp():Graphics;

		/** Shortcut to clear.
		 * @property c
		 * @protected
		 * type Function
		 **/
		c():Graphics;

		/** Shortcut to beginFill.
		 * @property f
		 * @protected
		 * type Function
		 **/
		f(color:string):Graphics;

		/** Shortcut to beginLinearGradientFill.
		 * @property lf
		 * @protected
		 * type Function
		 **/
		lf(colors:string[], ratios:number[], x0:number, y0:number, x1:number, y1:number):Graphics;

		/** Shortcut to beginRadialGradientFill.
		 * @property rf
		 * @protected
		 * type Function
		 **/
		rf(colors:string[], ratios:number[], x0:number, y0:number, r0:number, x1:number, y1:number, r1:number):Graphics;

		/** Shortcut to beginBitmapFill.
		 * @property bf
		 * @protected
		 * type Function
		 **/
		bf(image:any, repetition?:string):Graphics;

		/** Shortcut to endFill.
		 * @property ef
		 * @protected
		 * type Function
		 **/
		ef():Graphics;

		/** Shortcut to setStrokeStyle.
		 * @property ss
		 * @protected
		 * type Function
		 **/
		ss(thickness:number, caps?:any, joints?:any, miter?:number):Graphics;

		/** Shortcut to beginStroke.
		 * @property s
		 * @protected
		 * type Function
		 **/
		s(color:string):Graphics;

		/** Shortcut to beginLinearGradientStroke.
		 * @property ls
		 * @protected
		 * type Function
		 **/
		ls(colors:string[], ratios:number[], x0:number, y0:number, x1:number, y1:number):Graphics;

		/** Shortcut to beginRadialGradientStroke.
		 * @property rs
		 * @protected
		 * type Function
		 **/
		rs(colors:string[], ratios:number[], x0:number, y0:number, r0:number, x1:number, y1:number, r1:number):Graphics;

		/** Shortcut to beginBitmapStroke.
		 * @property bs
		 * @protected
		 * type Function
		 **/
		bs(image:any, repetition:string):Graphics;	// TODO: Do the overload

		/** Shortcut to endStroke.
		 * @property es
		 * @protected
		 * type Function
		 **/
		es():Graphics;

		/** Shortcut to drawRect.
		 * @property dr
		 * @protected
		 * type Function
		 **/
		dr(x:number, y:number, w:number, h:number):Graphics;

		/** Shortcut to drawRoundRect.
		 * @property rr
		 * @protected
		 * type Function
		 **/
		rr(x:number, y:number, w:number, h:number, radius:number):Graphics;

		/** Shortcut to drawRoundRectComplex.
		 * @property rc
		 * @protected
		 * type Function
		 **/
		rc(x:number, y:number, w:number, h:number, radiusTL:number, radiusTR:number, radiusBR:number, radiusBL:number):Graphics;

		/** Shortcut to drawCircle.
		 * @property dc
		 * @protected
		 * type Function
		 **/
		dc(x:number, y:number, radius:number):Graphics;

		/** Shortcut to drawEllipse.
		 * @property de
		 * @protected
		 * type Function
		 **/
		de (x:number, y:number, w:number, h:number):Graphics;

		/** Shortcut to drawPolyStar.
		 * @property dp
		 * @protected
		 * type Function
		 **/
		dp(x:number, y:number, radius:number, sides:number, ponumberSize:number, angle:number):Graphics;

		/** Shortcut to decodePath.
		 * @property p
		 * @protected
		 * type Function
		 **/
		p(str:string):Graphics;

		

		


	}

}