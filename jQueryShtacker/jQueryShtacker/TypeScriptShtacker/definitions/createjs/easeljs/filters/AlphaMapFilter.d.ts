

declare module createjs {

	//
	// Definition file for EaselJS-0.5.0
	//

	/**
	 * Applies a greyscale alpha map image (or canvas) to the target, such that the alpha channel of the result will
	 * be copied from the red channel of the map, and the RGB channels will be copied from the target.
	 * <br/><br/>
	 * Generally, it is recommended that you use AlphaMaskFilter, because it has much better performance.
	 * @class AlphaMapFilter
	 * @augments Filter	 
	 **/
	class AlphaMapFilter {

		// public properties:

		/**
		 * The greyscale image (or canvas) to use as the alpha value for the result. This should be exactly the same
			* dimensions as the target.
		 * @property alphaMap
		 * @type Image
		 **/
		alphaMap: HTMLImageElement;	// TODO: This was an Image type originally but compiler throws errors. Check it out




		/**
		* @constructor
		 * @param {Image} alphaMap The greyscale image (or canvas) to use as the alpha value for the result. This should be exactly the same
		 * dimensions as the target.
		**/
		constructor (alphaMap: HTMLImageElement);	// TODO: This was an Image type originally but compiler throws errors. Check it out




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
		applyFilter(ctx:CanvasRenderingContext2D, x:number, y:number, width:number, height:number, targetCtx?:CanvasRenderingContext2D, targetX?:Number, targetY?:Number): boolean;

		/**
		 * Returns a clone of this object.
		 * @return {AlphaMapFilter} A clone of the current AlphaMapFilter instance.
		 **/
		clone(): AlphaMapFilter;

		/**
		 * Returns a string representation of this object.
		 * @return {String} a string representation of the instance.
		 **/
		toString():string;

	}

}