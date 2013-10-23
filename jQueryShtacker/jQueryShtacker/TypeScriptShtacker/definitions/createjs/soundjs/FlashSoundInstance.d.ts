/// <reference path="SoundInstance.d.ts"/>

declare module createjs {

	//
	// Definition file for SoundJS-0.3.0
	//
	//	Flash Sound Instance
	//	This is a dummy sound instance, which allows SoundJS to return something so
	//	developers don't need to check nulls.
	class FlashSoundInstance extends SoundInstance
	{
		
		/**		 
		 * Instances are created by the FlashPlugin, and returned to the user.
		 * The user can control the audio directly.
		 * Note that audio control is shuttled to a flash player instance via the flash reference.
		 * @param {String} src The path to the sound source
		 * @param {Object} flash A reference to the Flash Player instance that controls the audio.		 
		 */
		constructor( src:string, flash:any );

	}

}