

declare module createjs {

	//
	// Definition file for EaselJS-0.5.0
	//

	/**
	* Represents a point on a 2 dimensional x / y coordinate system.
	* @class Point	
	**/
	class Point {

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
		* @constructor
		* @param {Number} x X position. Default is 0.
		* @param {Number} y Y position. Default is 0.
		**/
    constructor(x:number, y:number);

		/**
		 * Returns a clone of the Point instance.
		 * @method clone
		 * @return {Point} a clone of the Point instance.
		 **/
		clone():Point;

		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		tostring():string;

	}

}