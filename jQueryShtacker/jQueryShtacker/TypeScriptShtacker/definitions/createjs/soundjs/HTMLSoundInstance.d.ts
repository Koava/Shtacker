/// <reference path="SoundInstance.d.ts"/>

declare module createjs {

	//
	// Definition file for SoundJS-0.3.0
	//
	// This is a dummy sound instance, which allows SoundJS to return something so
	// developers don't need to check nulls.
	class HTMLSoundInstance extends SoundInstance
	{		

		/**
		 * The play state of the sound. Play states are defined as constants on SoundJS
		 * @property playState
		 * @type String
		 * @default null
		 */
		playState:string;

		constructor(src:string);
		
	}

}