declare module createjs
{

	//
	// Definition file for SoundJS-0.3.0
	//

	/**
	 * Base class for AudioPlugins
	 * @class AudioPlugin
	 */
	class AudioPlugin
	{
		/**
		 * The capabilities of the plugin.
		 * @property capabilities
		 * @type Object
		 * @default null
		 * @static
		 */
		static capabilities : any;

		/**
		 * Determine if the plugin can be used.
		 * @method isSupported
		 * @return {Boolean} If the plugin can be initialized.
		 * @static
		 */
		static isSupported(): boolean;

		/**
		 * Determine the capabilities of the plugin.
		 * @method generateCapabiities
		 * @static
		 */
		static generateCapabilities(): void;
	}

}