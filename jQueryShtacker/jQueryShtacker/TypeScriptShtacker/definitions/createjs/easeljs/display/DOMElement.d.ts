/// <reference path="DisplayObject.d.ts"/>


declare module createjs {

	//
	// Definition file for EaselJS-0.5.0
	//

	/**
	* <b>This class is still experimental, and more advanced use is likely to be buggy. Please report bugs.</b><br/><br/>
	* A DOMElement allows you to associate a HTMLElement with the display list. It will be transformed
	* within the DOM as though it is child of the Container it is added to. However, it is not rendered
	* to canvas, and as such will retain whatever z-index it has relative to the canvas (ie. it will be
	* drawn in front of or behind the canvas).<br/><br/>
	* The position of a DOMElement is relative to their parent node in the DOM. It is recommended that
	* the DOM Object be added to a div that also contains the canvas so that they share the same position
	* on the page.<br/><br/>
	* DOMElement is useful for positioning HTML elements over top of canvas content, and for elements
	* that you want to display outside the bounds of the canvas. For example, a tooltip with rich HTML
	* content.<br/><br/>
	* DOMElement instances are not full EaselJS display objects, and do not participate in EaselJS mouse
	* events or support methods like hitTest.
	* @class DOMElement
	* @extends DisplayObject
	**/
	class DOMElement extends DisplayObject{

		// public properties:

		/**
		 * The DOM object to manage.
		 * @property htmlElement
		 * @type HTMLElement
		 **/
		htmlElement:HTMLElement;		


		/**
		* @constructor
		* @param {HTMLElement} htmlElement A reference or id for the DOM element to manage.
		**/
		constructor (htmlElement:HTMLElement);		



		// public methods:
		// TODO: fix this. Right now it's used internally to determine if it should be drawn, but DOMElement always needs to be drawn.
		/**
		 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
		 * This does not account for whether it would be visible within the boundaries of the stage.
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method isVisible
		 * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
		 **/
		isVisible ():boolean;

		/**
		 * Draws the display object into the specified context ignoring it's visible, alpha, shadow, and transform.
		 * Returns true if the draw was handled (useful for overriding functionality).
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method draw
		 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
		 * @param {Boolean} ignoreCache Indicates whether the draw operation should ignore any current cache.
		 * For example, used for drawing the cache (to prevent it from simply drawing an existing cache back
		 * into itself).
		 **/
		//draw(ctx:CanvasRenderingContext2D, ignoreCache:boolean):void;	// Extended from DisplayObject

		/**
		 * This presently clones the DOMElement instance, but not the associated HTMLElement.
		 * @method clone
		 * @return {DOMElement} a clone of the DOMElement instance.
		 **/
		clone(): DOMElement;

		

	}

}