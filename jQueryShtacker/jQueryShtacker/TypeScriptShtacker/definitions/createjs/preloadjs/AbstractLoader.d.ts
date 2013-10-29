declare module createjs {

	/**
	 * The base loader, which handles all callbacks. All loaders should extend this class.
	 * @class AbstractLoader	 
	 */
	class AbstractLoader {

		/**
		 * Determine if this loader has completed already.
		 * @property loaded
		 * @type Boolean
		 * @default false
		 */
		loaded: boolean;

		/**
		 * Determine if a preload instance was canceled. Canceled loads will
		 * not fire complete events. Note that PreloadJS queues should be closed
		 * instead of canceled.
		 * @property canceled
		 * @type {Boolean}
		 * @default false
		 */
		canceled: boolean;

		/**
		 * The current load progress (percentage) for this item.
		 * @property progress
		 * @type Number
		 * @default 0
		 */
		progress: number;

			
		//Callbacks
		/**
		 * The callback to fire when progress changes.
		 * @event onProgress
		 */
		onProgress: ( evt:PreloadOverallProgressEventArgs ) => void;

		/**
		 * The callback to fire when a load starts.
		 * @event onLoadStart
		 */
		onLoadStart: ( evt:PreloadEventArgs ) => void;

		/**
		 * The callback to fire when a file completes.
		 * @event onFileLoad
		 */
		onFileLoad: ( evt:PreloadEventArgs ) => void;

		/**
		 * The callback to fire when a file progress changes.
		 * @event onFileProgress
		 */
		onFileProgress: ( evt:PreloadFileProgressEventArgs ) => void;

		/**
		 * The callback to fire when all loading is complete.
		 * @event onComplete
		 */
		onComplete: ( evt:PreloadEventArgs ) => void;
				
		/**
		 * The callback to fire when the loader encounters an error. If the error was encountered
		 * by a file, the event will contain the required file data, but the target will be the loader.
		 * @event onError
		 */		
		onError: ( evt:PreloadEventArgs ) => void;
		
		
			
		/**
		 * Get a reference to the manifest item that is loaded by this loader.
		 * @return {Object} The manifest item
		 */
		getItem(): any;
		
		/**
		 * Begin the load.
		 */
		load(): void;	

		/**
		 * Cancel the load.
		 */
		cancel(): void;			
	}

	/**
	 * Interfaces for PreloadJS events
	 */
	interface PreloadEventArgs {
		data:any;
		id:string;
		result:any;
		src:string;
		target:AbstractLoader;
		type:string;
	}

	interface PreloadFileProgressEventArgs {
		data:any;
		id:string;
		progress:number;
		result:any;
		src:string;
		target:AbstractLoader;
		type:string;
	}

	interface PreloadOverallProgressEventArgs {
		loaded:number;
		total:number;
		target:AbstractLoader;
	}


}