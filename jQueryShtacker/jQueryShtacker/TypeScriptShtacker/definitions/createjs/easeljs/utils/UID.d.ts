

declare module createjs {

	//
	// Definition file for EaselJS-0.5.0
	//

	/**
	* Global utility for generating sequential unique ID numbers.
	* The UID class uses a static interface (ex. UID.get()) and should not be instantiated.
	* @class UID	
	**/
	class UID {

		/**
		 * Returns the next unique id.
		 * @method get
		 * @return {Number} The next unique id
		 * @static
		 **/
		static get():number;

	}

}