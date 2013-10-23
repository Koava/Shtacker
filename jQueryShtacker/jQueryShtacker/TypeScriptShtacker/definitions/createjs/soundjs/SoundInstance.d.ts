declare module createjs 
{

	//
	// Definition file for SoundJS-0.3.0
	//
	// This is a dummy sound instance, which allows SoundJS to return something so
	// developers don't need to check nulls.
	class SoundInstance 
	{

		/**
		 * The source of the sound.
		 * @property src
		 * @type String
		 * @default null
		 */
		src: string;
		
		/**
		 * The unique ID of the instance
		 * @property uniqueId
		 * @type String | Number
		 * @default -1
		 */
		uniqueId:string;		

		/**
		 * The plugin that created the instance
		 * @property owner
		 * @type HTMLAudioPlugin
		 * @default null
		 */
		owner:any;

		/**
		 * Determines if the audio is currently muted.
		 * @property muted
		 * @type Boolean
		 * @default false
		 */
		muted:boolean;		
		
		/**
		 * Determines if the audio is currently paused. If the audio has not yet started playing,
		 * it will be true, unless the user pauses it.
		 * @property paused
		 * @type Boolean
		 * @default false
		 */
		paused:boolean;		
		
		/**
		 * The callback that is fired when a sound has completed playback
		 * @event onComplete
		 */
		onComplete:any;

		/**
		 * The callback that is fired when a sound has completed playback, but has loops remaining.
		 * @event onLoop
		 */
		onLoop:any;

		/**
		 * The callback that is fired when a sound is ready to play.
		 * @event onReady
		 */
		onReady:any;

		/**
		 * The callback that is fired when a sound has failed to start.
		 * @event onPlayFailed
		 */
		onPlayFailed:any;

		/**
		 * The callback that is fired when a sound has been interrupted.
		 * @event onPlayInterrupted
		 */
		onPlayInterrupted:any;


		constructor(src:string);


		/**
		 * Play an instance. This API is only used to play an instance after it has been stopped
		 * or interrupted.`
		 * @method play
		 * @param {String} interrupt How this sound interrupts other instances with the same source. Interrupt values are defined as constants on SoundJS.
		 * @param {Number} delay The delay in milliseconds before the sound starts
		 * @param {Number} offset How far into the sound to begin playback.
		 * @param {Number} loop The number of times to loop the audio. Use -1 for infinite loops.
		 * @param {Number} volume The volume of the sound between 0 and 1.
		 * @param {Number} pan The pan of the sound between -1 and 1. Note that pan does not work for HTML Audio.
		 */
		play( interrupt?:string, delay?:number, offset?:number, loop?:number, volume?:number, pan?:number ):void;

		/**
		 * Pause the instance.
		 * @method pause
		 * @return {Boolean} If the pause call succeeds.
		 */
		pause():boolean;

		/**
		 * Resume a sound instance that has been paused.
		 * @method resume
		 * @return {Boolean} If the resume call succeeds.
		 */
		resume():boolean;
		
		/**
		 * Stop a sound instance.
		 * @method stop
		 * @return {Boolean} If the stop call succeeds.
		 */
		stop():boolean;
				
		/**
		 * Set the volume of the sound instance.
		 * @method setVolume
		 * @param value
		 * @return {Boolean} If the setVolume call succeeds.
		 */
		setVolume(value:number):boolean;

		/**
		 * Get the volume of the sound, not including how the master volume has affected it.
		 * @method getVolume
		 * @param value
		 * @return The volume of the sound.
		 */
		getVolume():number;

		/**
		 * Mute the sound.
		 * @method mute
		 * @param {Boolean} isMuted If the sound should be muted or not.
		 * @return {Boolean} If the mute call succeeds.
		 */
		mute(isMuted:boolean):boolean;

		/**
		 * Set the pan of a sound instance. Note that this does not work in HTML audio.
		 * @method setPan
		 * @param {Number} value The pan value between -1 (left) and 1 (right).
		 * @return {boolean} If the setPan call succeeds.
		 */
		setPan(value:number):boolean;

		/**
		 * Get the pan of a sound instance. Note that this does not work in HTML audio.
		 * @method getPan
		 * @return {Number} The value of the pan between -1 (left) and 1 (right).
		 */
		getPan():number;

		/**
		 * Get the position of the playhead in the sound instance.
		 * @method getPosition
		 * @return {Number} The position of the playhead in milliseconds.
		 */	
		getPosition():number;


		/**
		 * Set the position of the playhead in the sound instance.
		 * @method setPosition
		 * @param {Number} value The position of the playhead in milliseconds.
		 */
		setPosition(value:number):void;	

		/**
		 * Get the duration of the sound instance.
		 * @method getDuration
		 * @return {Number} The duration of the sound instance in milliseconds.
		 */
		getDuration():number;	


		toString(): string;
		
			
		

		

	}

}