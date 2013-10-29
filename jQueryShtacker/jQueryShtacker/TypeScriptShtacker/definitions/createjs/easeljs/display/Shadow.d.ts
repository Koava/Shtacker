declare module createjs {

	//
	// Definition file for EaselJS-0.5.0
	//

	/**
	* Encapsulates the properties required to define a shadow to apply to a DisplayObject via it's .shadow property.
	* @class Shadow
	**/
	export class Shadow {
		
		// static public properties:
		/**
		 * An identity shadow object (all properties are set to 0). Read-only.
		 * @property identity
		 * @type Shadow
		 * @static
		 * @final
		 **/
		static identitiy: Shadow;


		// public properties:
		/** The color of the shadow.
		 * property color
		 * @type String
		 * @default null
		*/
		color:string;

		/** The x offset of the shadow.
		 * property offsetX
		 * @type Number
		 * @default 0
		*/
		offsetX:number;

		/** The y offset of the shadow.
		 * property offsetY
		 * @type Number
		 * @default 0
		*/
		offsetY:number;

		/** The blur of the shadow.
		 * property blur
		 * @type Number
		 * @default 0
		*/
		blur:number;

		

		/**
		* @constructor
		* @param {String} color The color of the shadow.
		* @param {Number} offsetX The x offset of the shadow.
		* @param {Number} offsetY The y offset of the shadow.
		* @param {Number} blur The size of the blurring effect.
		**/
		constructor(color:string, offsetX:number, offsetY:number, blur:number);
		


		// public methods:
		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/		
		tostring():string;

		/**
		 * Returns a clone of this Shadow instance.
		 * @method clone
		 * @return {Shadow} A clone of the current Shadow instance.
		 **/
		clone():Shadow;
		
		

	}

}