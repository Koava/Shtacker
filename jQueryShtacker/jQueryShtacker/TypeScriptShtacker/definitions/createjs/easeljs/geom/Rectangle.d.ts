

declare module createjs {

	//
	// Definition file for EaselJS-0.5.0
	//

	/**
	* Represents a rectangle as defined by the points (x, y) and (x+width, y+height).
	* @class Rectangle
	**/
	class Rectangle {

		// public properties:
		/** 
		 * X position. 
		 * @property x
		 * @type Number
		 **/
		x:number;

		/** 
		 * Y position. 
		 * @property y
		 * @type Number
		 **/
		y:number;

		/** 
		 * Width.
		 * @property width
		 * @type Number
		 **/
		width:number;

		/** 
		 * Height.
		 * @property height
		 * @type Number
		 **/
		height:number;		
		

		/**
		* @constructor
		* @param {Number} x X position. Default is 0.
		* @param {Number} y Y position. Default is 0.
		* @param {Number} width Width. Default is 0.
		* @param {Number} height Height. Default is 0.
		**/
    constructor (x:number, y:number, width:number, height:number);

		// public methods:
		/**
		 * Returns a clone of the Rectangle instance.
		 * @method clone
		 * @return {Rectangle} a clone of the Rectangle instance.
		 **/
		clone ():Rectangle;

		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		tostring ():string;

	}

}