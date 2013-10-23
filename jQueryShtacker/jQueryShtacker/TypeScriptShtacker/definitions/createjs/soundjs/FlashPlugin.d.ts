/// <reference path="AudioPlugin.d.ts"/>


declare module createjs {

	//
	// Definition file for SoundJS-0.3.0
	//

	/**
	 * Play sounds using a Flash instance. This plugin requires swfObject.as
	 * as well as the FlashAudioPlugin.swf. Ensure that FlashPlugin.BASE_PATH
	 * is set when using this plugin, so that the script can find the swf.
	 * @class FlashPlugin	 
	 */
	class FlashPlugin extends AudioPlugin
	{	
		/**
		 * The path relative to the HTML page that the FlashAudioPlugin.swf resides.
		 * If this is not correct, this plugin will not work.
		 * @property BASE_PATH
		 * @type String
		 * @default src/soundjs
		 * @static
		 */
		static BASE_PATH : string;

	}

}