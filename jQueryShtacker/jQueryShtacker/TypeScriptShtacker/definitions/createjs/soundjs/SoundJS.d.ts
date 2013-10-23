/// <reference path="SoundInstance.d.ts"/>

declare module createjs {

	// Definition file for SoundJS-0.3.0

	/**
	 * The public API for creating sounds, and controlling the overall sound levels,
	 * and affecting multiple sounds at once. All SoundJS APIs are static.
	 *
	 * SoundJS can also be used as a PreloadJS plugin to help preload audio properly.
	 * @class SoundJS
	 * @constructor
	 */
	class SoundJS {

		/**
		 * Determine how audio is split, when multiple paths are specified in a source.
		 * @property DELIMITER
		 * @type String
		 * @default |
		 * @static
		 */
		static DELIMITER: string;

		/**
		 * The duration in milliseconds to determine a timeout.
		 * @property AUDIO_TIMEOUT
		 * @static
		 * @type Number
		 * @default 8000
		 */
		static AUDIO_TIMEOUT: number;

		/**
		 * The interrupt value to use to interrupt any currently playing instance with the same source.
		 * @property INTERRUPT_ANY
		 * @type String
		 * @default any
		 * @static
		 */
		static INTERRUPT_ANY: string;

		/**
		 * The interrupt value to use to interrupt the earliest currently playing instance with the same source.
		 * @property INTERRUPT_EARLY
		 * @type String
		 * @default early
		 * @static
		 */
		static INTERRUPT_EARLY: string;

		/**
		 * The interrupt value to use to interrupt the latest currently playing instance with the same source.
		 * @property INTERRUPT_LATE
		 * @type String
		 * @default late
		 * @static
		 */
		static INTERRUPT_LATE: string;

		/**
		 * The interrupt value to use to interrupt no currently playing instances with the same source.
		 * @property INTERRUPT_NONE
		 * @type String
		 * @default none
		 * @static
		 */
		static INTERRUPT_NONE: string;

		// Important, implement playState in plugins with these values.

		/**
		 * Defines the playState of an instance that is still initializing.
		 * @property PLAY_INITED
		 * @type String
		 * @default playInited
		 * @static
		 */
		static PLAY_INITED: string;

		/**
		 * Defines the playState of an instance that is currently playing or paused.
		 * @property PLAY_SUCCEEDED
		 * @type String
		 * @default playSucceeded
		 * @static
		 */
		static PLAY_SUCCEEDED: string;

		/**
		 * Defines the playState of an instance that was interrupted by another instance.
		 * @property PLAY_INTERRUPTED
		 * @type String
		 * @default playInterrupted
		 * @static
		 */
		static PLAY_INTERRUPTED: string;

		/**
		 * Defines the playState of an instance that completed playback.
		 * @property PLAY_FINISHED
		 * @type String
		 * @default playFinished
		 * @static
		 */
		static PLAY_FINISHED: string;

		/**
		 * Defines the playState of an instance that failed to play. This is usually caused by a lack of available channels
		 * when the interrupt mode was "INTERRUPT_NONE", the playback stalled, or the sound could not be found.
		 * @property PLAY_FAILED
		 * @type String
		 * @default playFailed
		 * @static
		 */
		static PLAY_FAILED: string;

		/**
		 * The currently active plugin. If this is null, then no plugin could be initialized.
		 * If no plugin was specified, only the HTMLAudioPlugin is tested.
		 * @property activePlugin
		 * @type Object
		 * @default null
		 * @static
		 */
		static activePlugin: any;

		/**
		 * SoundJS is currently muted. No audio will play, unless existing instances are unmuted. This property
		 * is read-only.
		 * @property muted
		 * @type {Boolean}
		 * @default false
		 */
		static muted: boolean;

		/**
		 * Register a list of plugins, in order of precedence.
		 * @method registerPlugins
		 * @param {Array} plugins An array of plugins to install.
		 * @return {Boolean} Whether a plugin was successfully initialized.
		 * @static
		 */
		static registerPlugins(plugins: any[]): boolean;

		/**
		 * Register a SoundJS plugin. Plugins handle the actual playing
		 * of audio. By default the HTMLAudio plugin will be installed if
		 * no other plugins are present when the user starts playback.
		 * @method registerPlugin
		 * @param {Object} plugin The plugin class to install.
		 * @return {Boolean} Whether the plugin was successfully initialized.
		 * @static
		 */
		static registerPlugin(plugin: any): boolean;

		/**
		 * Determines if SoundJS has been initialized, and a plugin has been activated.
		 * @method isReady
		 * @return {Boolean} If SoundJS has initialized a plugin.
		 * @static
		 */
		static isReady(): boolean;

		/**
		 * Get the active plugin's capabilities, which help determine if a plugin can be
		 * used in the current environment, or if the plugin supports a specific feature.
		 * Capabilities include:
		 * <ul>
		 *     <li><b>panning:</b> If the plugin can pan audio from left to right</li>
		 *     <li><b>volume;</b> If the plugin can control audio volume.</li>
		 *     <li><b>mp3:</b> If MP3 audio is supported.</li>
		 *     <li><b>ogg:</b> If OGG audio is supported.</li>
		 *     <li><b>wav:</b> If WAV audio is supported.</li>
		 *     <li><b>mpeg:</b> If MPEG audio is supported.</li>
		 *     <li><b>channels:</b> The maximum number of audio channels that can be created.</li>
		 * @method getCapabilities
		 * @return {Object} An object containing the capabilities of the active plugin.
		 * @static
		 */
		static getCapabilities(): any;

		/**
		 * Get a specific capability of the active plugin. See the <b>getCapabilities</b> for a full list
		 * of capabilities.
		 * @method getCapability
		 * @param {String} key The capability to retrieve
		 * @return {String | Number | Boolean} The capability value.
		 * @static
		 */
		static getCapability(key: string): any;


		/* ---------------
		 Static API.
		--------------- */
		/**
		 * Play a sound, receive an instance to control. If the sound failed to play, the soundInstance
		 * will still be returned, and have a playState of SoundJS.PLAY_FAILED. Note that even on sounds with
		 * failed playback, you may still be able to call play(), since the failure could be due to lack of available
		 * channels.
		 * @method play
		 * @param {String} value The src or ID of the audio.
		 * @param {String} interrupt How to interrupt other instances of audio. Values are defined as constants on SoundJS.
		 * @param {Number} delay The amount of time to delay the start of the audio. Delay is in milliseconds.
		 * @param {Number} offset The point to start the audio. Offset is in milliseconds.
		 * @param {Number} loop Determines how many times the audio loops when it reaches the end of a sound. Default is 0 (no loops). Set to -1 for infinite.
		 * @param {Number} volume The volume of the sound, between 0 and 1
		 * @param {Number} pan The left-right pan of the sound (if supported), between -1 (left) and 1 (right)
		 * @return {SoundInstance} A SoundInstance that can be controlled after it is created.
		 * @static
		 */
		static play(src: string, interrupt?: string, delay?: number, offset?: number, loop?: number, volume?: number, pan?:number ): SoundInstance;
		
		/**
		 * Determine if a plugin has been initialized. Optionally initialize the default plugin, which enables
		 * SoundJS to work without manually setting up the plugins.
		 * @method checkPlugin
		 * @param {Boolean} initializeDefault Determines if the default plugin should be initialized if there
		 * is not yet a plugin when this is checked.
		 * @returns If a plugin is initialized. If the browser does not have the capabilities to initialize
		 * an available plugin, this will be false.
		 */
		static checkPlugin(initializeDefault: boolean): boolean;
		
		/**
		 * Get the source of a sound via the ID passed in with the manifest. If no ID is found
		 * the value is passed back.
		 * @method getSrcFromId
		 * @param value The name or src of a sound.
		 * @return {String} The source of the sound.
		 * @static
		 */
		static getSrcFromId(id: any): string;


		/* ---------------
	 Global controls
	--------------- */
		/**
		 * Set the volume of all sounds. This sets the volume value of all audio, and
		 * is not a "master volume". Use setMasterVolume() instead.
		 * @method setVolume
		 * @param {Number} The volume to set on all sounds. The acceptable range is 0-1.
		 * @param {String} id Optional, the specific sound ID to target.
		 * @return {Boolean} If the volume was set.
		 * @static
		 */
		static setVolume(value: number, id?: string): boolean;

		/**
		 * Get the master volume. All sounds multiply their current volume against the master volume.
		 * @method getMasterVolume
		 * @return {Number} The master volume
		 * @static
		 */
		static getMasterVolume(): number;
			
		/**
		 * To set the volume of all instances at once, use the setVolume() method.
		 * @method setMasterVolume
		 * @param {Number} value The master volume to set.
		 * @return {Boolean} If the master volume was set.
		 * @static
		 */
		static setMasterVolume(value: number): boolean;

		/**
		 * Mute/Unmute all audio. Note that muted audio still plays at 0 volume,
		 * and that individually muted audio will be affected by setting the global mute.
		 * @method setMute
		 * @param {Boolean} isMuted Whether the audio should be muted or not.
		 * @param {String} id The specific sound ID (set) to target.
		 * @return {Boolean} If the mute was set.
		 * @static
		 */
		static setMute(isMuted: boolean, id: string): boolean;
		
		/**
		 * Pause all instances.
		 * @method pause
		 * @param id The specific sound ID (set) to target.
		 * @return If the audio was paused or not.
		 * @static
		 */		
		static pause(id: string): boolean;
		
		/**
		 * Resume all instances. Note that the pause/resume methods do not work independantly
		 * of each instance's paused state. If one instance is already paused when the SoundJS.pause
		 * method is called, then it will resume when this method is called.
		 * @method resume
		 * @param id The specific sound ID (set) to target.
		 * @return If the audio was resumed or not
		 * @static
		 */		
		static resume(id?: string): boolean;

		/**
	 * Stop all audio (Global stop).
	 * @method stop
	 * @param id The specific sound ID (set) to target.
	 * @return If the audio was stopped or not.
	 * @static
	 */
		static stop(id?: string): boolean;

		/**
		 * Get a SoundInstance by a unique id. It is often useful to store audio
		 * instances by id (in form elements for example), so this method provides
		 * a useful way to access the instances via their IDs.
		 * @method getInstanceById
		 * @param uniqueId The id to use as lookup.
		 * @return {SoundInstance} The sound instance with the specified ID.
		 * @static
		 */
		static getInstanceById(id: string): SoundInstance;

	}

}