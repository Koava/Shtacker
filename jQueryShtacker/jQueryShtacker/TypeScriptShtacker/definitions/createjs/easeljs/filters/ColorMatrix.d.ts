

declare module createjs {

	//
	// Definition file for EaselJS-0.5.0
	//

	/**
		 * Provides helper functions for assembling a matrix for use with the ColorMatrixFilter.
		 * Can be used directly as the matrix for a ColorMatrixFilter. Most methods return the instance
		 * to facilitate chained calls. Ex. myColorMatrix.adjustHue(20).adjustBrightness(50);
		 * @class ColorMatrix
	**/
	class ColorMatrix {


		/**
		 * Array of delta values for contrast calculations.
		 * @property DELTA_INDEX
		 * @type Array
		 * @static
		 **/
		//static DELTA_INDEX: number[];

		/**
		 * Identity matrix values.
		 * @property IDENTITY_MATRIX
		 * @type Array
		 * @static
		 **/
		//static IDENTITY_MATRIX : number[];

		/**
		 * The constant length of a color matrix.
		 * @property LENGTH
		 * @type Number
		 * @static
		 **/
		//static LENGTH: number;
				


		/**
		 * @constructor
		 * @augments Array
		 * @param {Number} brightness
		 * @param {Number} contrast
		 * @param {Number} saturation
		 * @param {Number} hue
		 **/
		constructor(brightness:number, contrast:number, saturation:number, hue:number);
				
		/**
		 * Resets the matrix to identity values.
		 * @method reset
		 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
		 */
		reset(): ColorMatrix;
		
		/**
		 * Shortcut method to adjust brightness, contrast, saturation and hue.
		 * Equivalent to calling adjustHue(hue), adjustContrast(contrast),
		 * adjustBrightness(brightness), adjustSaturation(saturation), in that order.
		 * @param {Number} brightness
		 * @param {Number} contrast
		 * @param {Number} saturation
		 * @param {Number} hue
		 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
		 **/
		adjustColor (brightness:number, contrast:number, saturation:number, hue:number):ColorMatrix;

		/**
		 * Adjusts the brightness of pixel color by adding the specified value to the red, green and blue channels.
		 * Positive values will make the image brighter, negative values will make it darker.
		 * @param {Number} value A value between -255 & 255 that will be added to the RGB channels.
		 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
		 **/
		adjustBrightness (value:number):ColorMatrix;

		/**
		 * Adjusts the contrast of pixel color.
		 * Positive values will increase contrast, negative values will decrease contrast.
		 * @param {Number} value A value between -100 & 100.
		 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
		 **/
		adjustContrast (value:number):ColorMatrix;
			
		/**
		 * Adjusts the color saturation of the pixel.
		 * Positive values will increase saturation, negative values will decrease saturation (trend towards greyscale).
		 * @param {Number} value A value between -100 & 100.
		 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
		 **/
		adjustSaturation (value:number):ColorMatrix;

		/**
		 * Adjusts the hue of the pixel color.
		 * @param {Number} value A value between -180 & 180.
		 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
		 **/
		adjustHue (value:number):ColorMatrix;

		/**
		 * Concatenates (multiplies) the specified matrix with this one.
		 * @param {Array} matrix An array or ColorMatrix instance.
		 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
		 **/
		concat (matrix:any[]):ColorMatrix;	// TODO We need overload here. param {Array} matrix An array or ColorMatrix instance.

		/**
		 * Returns a clone of this ColorMatrix.
		 * @return {ColorMatrix} A clone of this ColorMatrix.
		 **/
		clone ():ColorMatrix;

		
		/**
		 * Copy the specified matrix's values to this matrix.
		 * @param {Array} matrix An array or ColorMatrix instance.
		 * @return {ColorMatrix} The ColorMatrix instance the method is called on (useful for chaining calls.)
		 **/
		copyMatrix (matrix:any[]):ColorMatrix;	// TODO We need overload here. param {Array} matrix An array or ColorMatrix instance.

		/**
		 * Return a length 25 (5x5) array instance containing this matrix's values.
		 * @return {Array} An array holding this matrix's values.
		 **/
		toArray ():number[];

	}

}