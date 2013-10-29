/// <reference path="AudioPlugin.d.ts"/>

declare module createjs {	

	//
	// Definition file for SoundJS-0.3.0
	//

	/**
	 * Play sounds using HTML <audio> tags in the browser.
	 * @class HTMLAudioPlugin	
	 */
	class HTMLAudioPlugin extends AudioPlugin
	{

		/**
		 * The maximum number of instances that can be played. This is a browser limitation.
		 * @property MAX_INSTANCES
		 * @type Number
		 * @default 30
		 * @static
		 */
		static MAX_INSTANCES: number;

		static lastId: any;

		// Event constants
		static AUDIO_READY: string;
		static AUDIO_ENDED: string;
		static AUDIO_ERROR: string;
		static AUDIO_STALLED: string;

		//TODO: Not used. Chrome can not do this when loading audio from a server.
		static fillChannels: boolean;		

	}

}