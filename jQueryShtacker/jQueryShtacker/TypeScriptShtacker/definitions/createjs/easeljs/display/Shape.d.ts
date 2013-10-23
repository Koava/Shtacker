/// <reference path="Graphics.d.ts"/>

declare module createjs {
	
	//
	// Definition file for EaselJS-0.5.0
	//

	/**
	* A Shape allows you to display vector art in the display list. It composites a Graphics instance which exposes all of the vector
	* drawing methods. The Graphics instance can be shared between multiple Shape instances to display the same vector graphics with different
	* positions or transforms. If the vector art will not change between draws, you may want to use the cache() method to reduce the rendering cost.
	* @class Shape
	* @extends DisplayObject	
	**/
	class Shape extends DisplayObject{

		// public properties:
		/**
		 * The graphics instance to display.
		 * @property graphics
		 * @type Graphics
		 **/
		graphics:Graphics;

		// constructor:
		/**
		 * @param {Graphics} graphics Optional. The graphics instance to display. If null, a new Graphics instance will be created.
		 **/
		constructor(graphics?:Graphics);
		
		    

		/**
		 * Returns a clone of this Shape. Some properties that are specific to this instance's current context are reverted to 
		 * their defaults (for example .parent).
		 * @method clone
		 * @param {Boolean} recursive If true, this Shape's Graphics instance will also be cloned. If false, the Graphics instance 
		 * will be shared with the new Shape.
		 **/
		clone(recursive?:boolean):Shape;	

	}

}