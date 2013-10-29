/// <reference path="Container.d.ts"/>


declare module createjs {

	//
	// Definition file for EaselJS-0.5.0
	//

	/**
	* A stage is the root level Container for a display list. Each time its tick method is called, it will render its display
	* list to its target canvas.
	* @class Stage
	* @extends Container
	**/
	class Stage extends Container{		
		
		// public properties:
		/**
		 * Indicates whether the stage should automatically clear the canvas before each render. You can set this to false to manually
		 * control clearing (for generative art, or when pointing multiple stages at the same canvas for example).
		 * @property autoClear
		 * @type Boolean
		 * @default true
		 **/
		autoClear:boolean;

		/**
		 * The canvas the stage will render to. Multiple stages can share a single canvas, but you must disable autoClear for all but the
		 * first stage that will be ticked (or they will clear each other's render).
		 * @property canvas
		 * @type HTMLCanvasElement
		 **/
		canvas:HTMLCanvasElement;

		/**
		 * READ-ONLY. The current mouse X position on the canvas. If the mouse leaves the canvas, this will indicate the most recent
		 * position over the canvas, and mouseInBounds will be set to false.
		 * @property mouseX
		 * @type Number
		 **/
		mouseX:number;

		/**
		 * READ-ONLY. The current mouse Y position on the canvas. If the mouse leaves the canvas, this will indicate the most recent
		 * position over the canvas, and mouseInBounds will be set to false.
		 * @property mouseY
		 * @type Number
		 **/
		mouseY:number;

		/**
		 * The onMouseMove callback is called when the user moves the mouse over the canvas.  The handler is passed a single param
		 * containing the corresponding MouseEvent instance.
		 * @event onMouseMove
		 * @param {MouseEvent} event A MouseEvent instance with information about the current mouse event.
		 **/
		onMouseMove: (MouseEvent) => void;

		/**
		 * The onMouseUp callback is called when the user releases the mouse button anywhere that the page can detect it.  The handler
		 * is passed a single param containing the corresponding MouseEvent instance.
		 * @event onMouseUp
		 * @param {MouseEvent} event A MouseEvent instance with information about the current mouse event.
		 **/
		onMouseUp: (MouseEvent) => void;

		/**
		 * The onMouseDown callback is called when the user presses the mouse button over the canvas.  The handler is passed a single
		 * param containing the corresponding MouseEvent instance.
		 * @event onMouseDown
		 * @param {MouseEvent} event A MouseEvent instance with information about the current mouse event.
		 **/
		onMouseDown: (MouseEvent) => void;
    
		/**
		 * Indicates whether this stage should use the snapToPixel property of display objects when rendering them. See
		 * DisplayObject.snapToPixel for more information.
		 * @property snapToPixelEnabled
		 * @type Boolean
		 * @default false
		 **/
    snapToPixelEnabled:boolean;

		/**
		 * Indicates whether the mouse is currently within the bounds of the canvas.
		 * @property mouseInBounds
		 * @type Boolean
		 * @default false
		 **/
		mouseInBounds:boolean;

		/**
		 * If false, tick callbacks will be called on all display objects on the stage prior to rendering to the canvas.
		 * @property tickOnUpdate
		 * @type Boolean
		 * @default false
		 **/		
		tickOnUpdate:boolean;

		/**
		 * If true, onMouseMove handlers will continue to be called when the mouse leaves the target canvas. See
		 * mouseInBounds, and MouseEvent.x/y/rawX/rawY.
		 * @property tickOnUpdate
		 * @type mouseMoveOutside
		 * @default false
		 **/
		mouseMoveOutside: boolean;



		/**
		* @constructor
		* @param {HTMLCanvasElement} canvas The canvas the stage will render to.
		**/
		constructor(canvas:HTMLCanvasElement);


		// public methods:

		/**
		 * @event tick
		 * Broadcast to children when the stage is updated.
		 **/

		/**
		 * Each time the update method is called, the stage will tick any descendants exposing a tick method (ex. BitmapAnimation)
		 * and render its entire display list to the canvas. Any parameters passed to update will be passed on to any
		 * onTick handlers.
		 * @method update
		 **/
		update():void;

		/**
		 * Clears the target canvas. Useful if autoClear is set to false.
		 * @method clear
		 **/
		clear():void;		

		/**
		 * Returns a data url that contains a Base64 encoded image of the contents of the stage. The returned data url can be
		 * specified as the src value of an image element.
		 * @method toDataURL
		 * @param {String} backgroundColor The background color to be used for the generated image. The value can be any value HTML color
		 * value, including HEX colors, rgb and rgba. The default value is a transparent background.
		 * @param {String} mimeType The MIME type of the image format to be create. The default is "image/png". If an unknown MIME type
		 * is passed in, or if the browser does not support the specified MIME type, the default value will be used.
		 * @return {String} a Base64 encoded image.
		 **/
		toDataURL(backgroundColor:string, mimeType:string):string;

		/**
		 * Enables or disables (by passing a frequency of 0) mouse over handlers (onMouseOver and onMouseOut) for this stage's display
		 * list. These events can be expensive to generate, so they are disabled by default, and the frequency of the events
		 * can be controlled independently of mouse move events via the optional frequency parameter.
		 * @method enableMouseOver
		 * @param {Number} frequency Optional param specifying the maximum number of times per second to broadcast mouse over/out events. Set to 0 to disable mouse
		 * over events completely. Maximum is 50. A lower frequency is less responsive, but uses less CPU. Default is 20.
		 **/
		enableMouseOver(frequency:number):void;

		/**
		 * Returns a clone of this Stage.
		 * @return {Stage} A clone of the current Container instance.
		 **/
		clone(): Stage;

    

	}

}