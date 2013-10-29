/// <reference path="DisplayObject.d.ts"/>

declare module createjs {

	//
	// Definition file for EaselJS-0.5.0
	//

	/**
	* Allows you to display one or more lines of dynamic text (not user editable) in the display list.
	* Line wrapping support (using the lineWidth is very basic, wrapping on spaces and tabs only. Note
	* that as an alternative to Text, you can position HTML text above or below the canvas relative to 
	* items in the display list using the localToGlobal() method.
	* @class Text
	* @extends DisplayObject
	**/
	class Text extends DisplayObject{

		// public properties:
		/**
		 * The text to display.
		 * @property text
		 * @type String
		 **/
		text:string;

		/**
		 * The font style to use. Any valid value for the CSS font attribute is acceptable (ex. "bold 36px Arial"). 
		 * @property font
		 * @type String
		 **/
		font:string;

		/**
		 * The color to draw the text in. Any valid value for the CSS color attribute is acceptable (ex. "#F00"). Default is "#000".
		 * @property color
		 * @type String
		 **/
		color:string;

		/**
		 * The horizontal text alignment. Any of "start", "end", "left", "right", and "center". For detailed 
		 * information view the 
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#text-styles">
		 * whatwg spec</a>. Default is "left".
		 * @property textAlign
		 * @type String
		 **/
		textAlign:string;

		/** The vertical alignment point on the font. Any of "top", "hanging", "middle", "alphabetic", 
		 * "ideographic", or "bottom". For detailed information view the 
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#text-styles">
		 * whatwg spec</a>. Default is "top".
		 * @property textBaseline
		 * @type String
		*/
		textBaseline:string;

		/** The maximum width to draw the text. If maxWidth is specified (not null), the text will be condensed or 
		 * shrunk to make it fit in this width. For detailed information view the 
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#text-styles">
		 * whatwg spec</a>.
		 * @property maxWidth
		 * @type Number
		*/
		maxWidth:number;

		/** If true, the text will be drawn as a stroke (outline). If false, the text will be drawn as a fill.
		 * @property outline
		 * @type Boolean
		 **/
		outline: boolean;

		/** Indicates the line height (vertical distance between baselines) for multi-line text. If null or 0, 
		 * the value of getMeasuredLineHeight is used.
		 * @property lineHeight
		 * @type Number
		 **/
		lineHeight:number;

		/**
		 * Indicates the maximum width for a line of text before it is wrapped to multiple lines. If null, 
		 * the text will not be wrapped.
		 * @property lineWidth
		 * @type Number
		 **/
		lineWidth:number;
		


		/**
		* @constructor
		* @param {String} text Optional. The text to display.
		* @param {String} font Optional. The font style to use. Any valid value for the CSS font attribute is 
		* acceptable (ex. "bold 36px Arial").
		* @param {String} color Optional. The color to draw the text in. Any valid value for the CSS color attribute
		* is acceptable (ex. "#F00").
		**/
		constructor(text?:string, font?:string, color?:string);

		
		/**
		 * Returns the measured, untransformed width of the text without wrapping.
		 * @method getMeasuredWidth
		 * @return {Number} The measured, untransformed width of the text.
		 **/
		getMeasuredWidth():number;

		/**
		 * Returns an approximate line height of the text, ignoring the lineHeight property. This is based 
		 * on the measured width of a "M" character multiplied by 1.2, which approximates em for most fonts.
		 * @method getMeasuredLineHeight
		 * @return {Number} an approximate line height of the text, ignoring the lineHeight property. This is 
		 * based on the measured width of a "M" character multiplied by 1.2, which approximates em for most fonts.
		 **/
		getMeasuredLineHeight():number;

		/**
		 * Returns the approximate height of multiline text by multiplying the number of lines against
		 * either the lineHeight (if specified) or getMeasuredLineHeight(). Note that this operation
		 * requires the text flowing logic to run, which has an associated CPU cost.
		 * @method getMeasuredHeight
		 * @return {Number} The approximate height of the drawn multiline text.
		 **/
    getMeasuredHeight():number;

		/**
	 * Returns a clone of the Text instance.
	 * @method clone
	 * @return {Text} a clone of the Text instance.
	 **/
    clone(): Text;

	}

}