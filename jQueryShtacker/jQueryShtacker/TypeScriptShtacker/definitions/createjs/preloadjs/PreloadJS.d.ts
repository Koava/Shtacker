/// <reference path="AbstractLoader.d.ts"/>


declare module createjs {

	//
	// Definition file for PreloadJS-0.2.0
	//

	/**
	 * PreloadJS provides a consistent way to preload content for use in HTML applications.
	 * @class PreloadJS	 
	 * @extends AbstractLoader
	 */
	class PreloadJS extends AbstractLoader {

		// Static class members
		static CSS: string;
		static IMAGE: string;
		static JAVASCRIPT: string;
		static JSON: string;
		static SOUND: string;
		static TEXT: string;
		static XML: string;
		static TIMEOUT_TIME: number;


		// Public members

		// Flags
		/**
		 * Use XMLHttpRequest when possible.
		 * @property useXHR
		 * @type Boolean
		 * @default true
		 */
		useXHR: boolean;

		/**
		 * Stop processing the current queue when an error is encountered.
		 * @property stopOnError
		 * @type Boolean
		 * @default false
		 */
		stopOnError: boolean;

		/**
		 * Ensure loaded scripts "complete" in the order they are specified.
		 * @property maintainScriptOrder
		 * @type Boolean
		 * @default true
		 */
		maintainScriptOrder: boolean;

		/**
		 * The next preload queue to process when this one is complete.
		 * @property next
		 * @type PreloadJS
		 * @default null
		 */
		next: PreloadJS;
		
		// Browser Capabilities
		TAG_LOAD_OGGS: boolean;

		


		// CONSTRUCTOR
		/**
			* @param {Boolean} useXHR Use XHR (XML HTTP Requests) for loading. When this is false,
			* PreloadJS will use tag loading when possible. Note that Scripts and CSS require
			* XHR to load properly.
			**/
		constructor (useXHR:boolean);




		// FUNCTIONS - PUBLIC API	

		/**
		 * Stops all queued and loading items, and clears the queue. This also removes
		 * all internal references to loaded content, and allowed the queue to be used again.
		 * Items that have not yet started can be kicked off again using the load() method.
		 * @method removeAll
		 */
		removeAll(): void;

		/**
		 * Stops an item from being loaded, and removes it from the queue. If nothing is passed,
		 * all items are removed. This also removes internal references to loaded item(s).
		 * @method remove
		 * @param {String | Array} idsOrUrls The id or ids to remove from this queue. You can pass
		 *      an item, an array of items, or multiple items as arguments.
		 */
		remove(idsOrUrls: any): void;		// TODO function overloads

		/**
		 * Stops all open loads, destroys any loaded items, and resets the queue, so all items can
		 * be reloaded again by calling <b>load()</b>. Items are not removed from the queue. To remove
		 * items use the <b>remove()</b> or <b>removeAll()</b> method.
		 * @method reset
		 */
		reset(): void;

		/**
		 * Register a plugin. Plugins can map to both load types (sound, image, etc), or can map to specific
		 * extensions (png, mp3, etc). Only one plugin can currently exist per suffix/type.
		 * Plugins must return an object containing:
		 *  * callback: The function to call
		 *  * types: An array of types to handle
		 *  * extensions: An array of extensions to handle. This is overriden by type handlers
		 * @method installPlugin
		 * @param {Function} plugin The plugin to install
		 */
		installPlugin(plugin: any):void;
		
		/**
		 * Set the maximum number of concurrent connections.
		 * @method setMaxConnections
		 * @param {Number} value The number of concurrent loads to allow. By default, only a single connection is open at any time.
		 * Note that browsers and servers may have a built-in maximum number of open connections
		 */
		setMaxConnections(value: number): void;

		/**
		 * Load a single file. Note that calling loadFile appends to the current queue, so it can be used multiple times to
		 * add files. Use <b>loadManifest()</b> to add multiple files at onces. To clear the queue first use the <b>close()</b> method.
		 * @method loadFile
		 * @param {Object | String} file The file object or path to load. A file can be either
			 * <ol>
			 *     <li>a path to a resource (string). Note that this kind of load item will be
			 *     converted to an object (next item) in the background.</li>
			 *     <li>OR an object that contains:<ul>
			 *         <li>src: The source of the file that is being loaded. This property is <b>required</b>. The source can either be a string (recommended), or an HTML tag.</li>
			 *         <li>type: The type of file that will be loaded (image, sound, json, etc).
			 *         PreloadJS does auto-detection of types using the extension. Supported types are defined on PreloadJS, such as PreloadJS.IMAGE.
			 *         It is recommended that a type is specified when a non-standard file URI (such as a php script) us used.</li>
			 *         <li>id: A string indentifier which can be used to reference the loaded object.</li>
			 *         <li>data: An arbitrary data object, which is included with the loaded object</li>
			 *     </ul>
			 * </ol>
		 * @param {Boolean} loadNow Kick off an immediate load (true) or wait for a load call (false). The default value is true. If the queue is paused, and this value
		 * is true, the queue will resume.
		 */
		loadFile(src: any, loadNow?: boolean):void;		// TODO: Function overload 

		/**
		 * Load a manifest. This is a shortcut method to load a group of files. To load a single file, use the loadFile method.
		 * Note that calling loadManifest appends to the current queue, so it can be used multiple times to add files. To clear
		 * the queue first, use the <b>close()</b> method.
		 * @method loadManifest
		 * @param {Array} manifest The list of files to load. Each file can be either
		 * <ol>
		 *     <li>a path to a resource (string). Note that this kind of load item will be
		 *     converted to an object (next item) in the background.</li>
		 *     <li>OR an object that contains:<ul>
		 *         <li>src: The source of the file that is being loaded. This property is <b>required</b>.
		 *         The source can either be a string (recommended), or an HTML tag. </li>
		 *         <li>type: The type of file that will be loaded (image, sound, json, etc).
		 *         PreloadJS does auto-detection of types using the extension. Supported types are defined on PreloadJS, such as PreloadJS.IMAGE.
		 *         It is recommended that a type is specified when a non-standard file URI (such as a php script) us used.</li>
		 *         <li>id: A string indentifier which can be used to reference the loaded object.</li>
		 *         <li>data: An arbitrary data object, which is included with the loaded object</li>
		 *     </ul>
		 * </ol>
		 * @param {Boolean} loadNow Kick off an immediate load (true) or wait for a load call (false). The default value is true. If the queue is paused, and this value
		 * is true, the queue will resume.
		 */
		loadManifest(manifest: any, loadNow?: boolean):void;

		/**
		 * Lookup a loaded item using either the "id" or "src" that was specified when loading it.
		 * @method getResult
		 * @param {String} value The "id" or "src" of the loaded item.
		 * @return {Object} A result object containing the contents of the object that was initially requested using loadFile or loadManifest, including:
			 * <ol>
			 *     <li>src: The source of the file that was requested.</li>
			 *     <li>type: The type of file that was loaded. If it was not specified, this is auto-detected by PreloadJS using the file extension.</li>
			 *     <li>id: The id of the loaded object. If it was not specified, the ID will be the same as the "src" property.</li>
			 *     <li>data: Any arbitrary data that was specified, otherwise it will be undefined.
			 *     <li>result: The loaded object. PreloadJS provides usable tag elements when possible:
			 *				<ul>
			 *          <li>An HTMLImageElement tag (&lt;image /&gt;) for images</li>
			 *          <li>An HTMLAudioElement tag (&lt;audio &gt;) for audio</li>
			 *          <li>A script tag for JavaScript (&lt;script&gt;&lt;/script&gt;)</li>
			 *          <li>A style tag for CSS (&lt;style&gt;&lt;/style&gt;)</li>
			 *          <li>Raw text for JSON or any other kind of loaded item</li>
			 *				</ul>
			 *     </li>
			 * </ol>
			 * This object is also returned via the "onFileLoad" callback, although a "target" will be included, which is a reference to the PreloadJS instance.
		 */
		getResult(src: string): PreloadEventArgs;
		
		/**
		 * Pause or resume the current load. The active item will not cancel, but the next
		 * items in the queue will not be processed.
		 * @method setPaused
		 * @param {Boolean} value Whether the queue should be paused or not.
		 */
		setPaused(value: boolean): void;
		
		/**
		 * Close the active queue. Closing a queue completely empties the queue, and prevents any remaining items from starting to
		 * download. Note that currently there any active loads will remain open, and events may be processed.<br/><br/>
		 * To stop and restart a queue, use the <b>setPaused(true|false)</b> method instead.
		 * @method close
		 */
		close():void;
		
	}

}