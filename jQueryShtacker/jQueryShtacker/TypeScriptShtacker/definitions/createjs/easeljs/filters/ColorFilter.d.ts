/// <reference path="Filter.d.ts"/>

declare module createjs {

	//
	// Definition file for EaselJS-0.5.0
	//

	/**
		* Applies color transforms.
		* @class ColorFilter
	**/
	class ColorFilter {

		// public properties:
		/**
		 * Red channel multiplier.
		 * @property redMultiplier
		 * @type Number
		 **/
		redMultiplier:number;

		/** 
		 * Green channel multiplier.
		 * @property greenMultiplier
		 * @type Number
		 **/
		greenMultiplier:number;

		/**
		 * Blue channel multiplier.
		 * @property blueMultiplier
		 * @type Number
		 **/
		blueMultiplier:number;

		/**
		 * Alpha channel multiplier.
		 * @property redMultiplier
		 * @type Number
		 **/
		alphaMultiplier:number;

		/**
		 * Red channel offset (added to value).
		 * @property redOffset
		 * @type Number
		 **/
		redOffset:number;

		/**
		 * Green channel offset (added to value).
		 * @property greenOffset
		 * @type Number
		 **/
		greenOffset:number;

		/**
		 * Blue channel offset (added to value).
		 * @property blueOffset
		 * @type Number
		 **/
		blueOffset:number;

		/**
		 * Alpha channel offset (added to value).
		 * @property alphaOffset
		 * @type Number
		 **/
		alphaOffset:number;
		

		/**
		* @constructor
		* @augments Filter
		* @param {Number} redMultiplier
		* @param {Number} greenMultiplier
		* @param {Number} blueMultiplier
		* @param {Number} alphaMultiplier
		* @param {Number} redOffset
		* @param {Number} greenOffset
		* @param {Number} blueOffset
		* @param {Number} alphaOffset
		**/
		constructor (redMultiplier:number, greenMultiplier:number, blueMultiplier:number, alphaMultiplier?:number, redOffset?:number, greenOffset?:number, blueOffset?:number, alphaOffset?:number);
		
		// public methods:
		/**
		 * Applies the filter to the specified context.
		 * @method applyFilter
		 * @param {CanvasRenderingContext2D} ctx The 2D context to use as the source.
		 * @param {Number} x The x position to use for the source rect.
		 * @param {Number} y The y position to use for the source rect.
		 * @param {Number} width The width to use for the source rect.
		 * @param {Number} height The height to use for the source rect.
		 * @param {CanvasRenderingContext2D} targetCtx Optional. The 2D context to draw the result to. Defaults to the context passed to ctx.
		 * @param {Number} targetX Optional. The x position to draw the result to. Defaults to the value passed to x.
		 * @param {Number} targetY Optional. The y position to draw the result to. Defaults to the value passed to y.
		 * @return {Boolean}
		 **/
		applyFilter (ctx:CanvasRenderingContext2D, x:number, y:number, width:number, height:number, targetCtx?:CanvasRenderingContext2D, targetX?:number, targetY?:number):boolean;

		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		tostring ():string;

		/**
		 * Returns a clone of this ColorFilter instance.
		 * @method clone
		 * @return {ColorFilter} A clone of the current ColorFilter instance.
		 **/
		clone ():ColorFilter;	


	}

}