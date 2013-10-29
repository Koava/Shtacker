/// <reference path="../display/Stage.d.ts"/>

declare module createjs {

	//
	// Definition file for EaselJS-0.5.0
	//

	/**
	 * Global utility for working with multi-touch enabled devices in EaselJS. Currently supports W3C Touch API
	 * (iOS & modern Android browser) and IE10.
	 * @class Touch
	 **/
	class Touch {		
		
		// Public static methods:
		/**
		 * Returns true if touch is supported in the current browser.
		 * @method isSupported
		 * @return {Boolean} A boolean indicating whether touch is supported in the current browser.
		 * @static
		 **/
		static isSupported ():boolean;

		/**
		 * Enables touch interaction for the specified EaselJS stage. Currently supports iOS (and compatible browsers, such
		 * as modern Android browsers), and IE10.
		 * Supports both single touch and multi-touch modes. Extends the EaselJS MouseEvent model, but without support for
		 * double click or over/out events. See MouseEvent.pointerID for more information.
		 * @method enable
		 * @param {Stage} stage The stage to enable touch on.
		 * @param {Boolean} singleTouch If true, only a single touch will be active at a time. Default is false.
		 * @param {Boolean} allowDefault If true, then default gesture actions (ex. scrolling, zooming) will be allowed when the user is interacting with the target canvas. Default is false.
		 * @return {Boolean} Returns true if touch was successfully enabled on the target stage.
		 * @static
		 **/
		static enable (stage:Stage, singleTouch?:boolean, allowDefault?:boolean):boolean;

		/**
		 * Removes all listeners that were set up when calling Touch.enable on a stage.
		 * @method disable
		 * @param {Stage} stage The stage to disable touch on.
		 * @static
		 **/
		static disable(stage:Stage): void;


	}

}