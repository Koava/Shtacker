/// <reference path="DisplayObject.d.ts"/>

declare module createjs {

	//
	// Definition file for EaselJS-0.5.0
	//

	/**
	* A Bitmap represents an Image, Canvas, or Video in the display list.
	* @class Bitmap
	* @extends DisplayObject
	**/	
	class Bitmap extends DisplayObject{

		// public properties:
		/**
		 * The image to render. This can be an Image, a Canvas, or a Video.
		 * @property image
		 * @type Image | HTMLCanvasElement | HTMLVideoElement
		 **/
		image:any;

		/**
		 * Whether or not the Bitmap should be draw to the canvas at whole pixel coordinates.
		 * @property snapToPixel
		 * @type Boolean
		 * @default true
		 **/
		snapToPixel: boolean;
		
		/**
		 * Specifies an area of the source image to draw. If omitted, the whole image will be drawn.
		 * @property sourceRect
		 * @type Rectangle
		 * @default null
		 */
		sourceRect:Rectangle;
		

		/**
		* @constructor
		* @param {Image | HTMLCanvasElement | HTMLVideoElement | String} imageOrUri The source object or URI to an image to display. This can be either an Image, Canvas, or Video object, or a string URI to an image file to load and use. If it is a URI, a new Image object will be constructed and assigned to the .image property.
		**/
		constructor (imageOrUri:any);	// TODO: DO the overloads


		// public methods:

		/**
		 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
		 * This does not account for whether it would be visible within the boundaries of the stage.
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 * @method isVisible
		 * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
		 **/
		isVisible():boolean;

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
		draw(ctx:CanvasRenderingContext2D, ignoreCache:boolean):void;

		//Note, the doc sections below document using the specified APIs (from DisplayObject)  from
		//Bitmap. This is why they have no method implementations.

		/**
		 * Because the content of a Bitmap is already in a simple format, cache is unnecessary for Bitmap instances.
		 * You should not cache Bitmap instances as it can degrade performance.
		 * @method cache
		 **/

		/**
		 * Because the content of a Bitmap is already in a simple format, cache is unnecessary for Bitmap instances.
		 * You should not cache Bitmap instances as it can degrade performance.
		 * @method updateCache
		 **/

		/**
		 * Because the content of a Bitmap is already in a simple format, cache is unnecessary for Bitmap instances.
		 * You should not cache Bitmap instances as it can degrade performance.
		 * @method uncache
		 **/


		/* Not implemented since this methods are extended from DisplayObject
		cache(x?:number, y?:number, width?:number, height?:number):void;
		updateCache(compositeOperation?:string):void;
		uncache():void;		
		*/



		/**
		 * Returns a clone of the Bitmap instance.
		 * @method clone
		 * @return {Bitmap} a clone of the Bitmap instance.
		 **/
		clone(recursive?:boolean):Bitmap;

	}

}