/// <reference path="../display/SpriteSheet.d.ts"/>
/// <reference path="../display/DisplayObject.d.ts"/>
/// <reference path="../display/MovieClip.d.ts"/>
/// <reference path="../geom/Rectangle.d.ts"/>

declare module createjs {

	//
	// Definition file for EaselJS-0.5.0
	//

	/**
	 * The SpriteSheetBuilder allows you to generate sprite sheets at run time from any display object. This can allow
	 * you to maintain your assets as vector graphics (for low file size), and render them at run time as sprite sheets
	 * for better performance.
	 * <br/><br/>
	 * Sprite sheets can be built either synchronously, or asynchronously, so that large sprite sheets can be generated
	 * without locking the UI.
	 * <br/><br/>
	 * Note that the "images" used in the generated sprite sheet are actually canvas elements, and that they will be sized
	 * to the nearest power of 2 up to the value of maxWidth or maxHeight.
	 * @class SpriteSheetBuilder	 
	 **/
	class SpriteSheetBuilder {

		// constants:
		static ERR_DIMENSIONS: string;
		static ERR_RUNNING: string;

		// public properties:

		/**
		 * The maximum width for the images (not individual frames) in the generated sprite sheet. It is recommended to use
		 * a power of 2 for this value (ex. 1024, 2048, 4096). If the frames cannot all fit within the max dimensions, then
		 * additional images will be created as needed.
		 * @property maxWidth
		 * @type Number
		 * @default 2048
		*/
		maxWidth: number;

		/**
		 * The maximum height for the images (not individual frames) in the generated sprite sheet. It is recommended to use
		 * a power of 2 for this value (ex. 1024, 2048, 4096). If the frames cannot all fit within the max dimensions, then
		 * additional images will be created as needed.
		 * @property maxHeight
		 * @type Number
		 * @default 2048
		 **/
		maxHeight: number;

		/**
		 * The sprite sheet that was generated. This will be null before a build is completed successfully.
		 * @property spriteSheet
		 * @type SpriteSheet
		 **/
		spriteSheet: SpriteSheet;

		/**
		 * The scale to apply when drawing all frames to the sprite sheet. This is multiplied against any scale specified
		 * in the addFrame call. This can be used, for example, to generate a sprite sheet at run time that is tailored to
		 * the a specific device resolution (ex. tablet vs mobile).
		 * @property defaultScale
		 * @type Number
		 * @default 1
		 **/
		scale: number;

		/**
		* The padding to use between frames. This is helpful to preserve antialiasing on drawn vector content.
		* @property padding
		* @type Number
		* @default 1
		**/
		padding: number;




		// constructor:
		constructor ();




		// public methods:
		/**
		 * Adds a frame to the sprite sheet. Note that the frame will not be drawn until you call build. The optional
		 * setup params allow you to have a function run immediately before the draw occurs. For example, this allows you to
		 * add a single source multiple times, but manipulate it or it's children to change it to generate different frames.
		 * <br/><br/>
		 * Note that the source's transformations (x,y,scale,rotate,alpha) will be ignored, except for regX/Y. To apply
		 * transforms to a source object and have them captured in the sprite sheet, simply place it into a Container
		 * and pass in the Container as the source.
		 * @method addFrame
		 * @param {DisplayObject} source The source display object to draw as the frame.
		 * @param {Rectangle} sourceRect Optional. A rectangle defining the portion of the source to draw to the frame. If
		 * not specified, it will look for a getBounds method, bounds property, or nominalBounds property on the source to use.
		 * If one is not found, the frame will be skipped.
		 * @param {Number} scale Optional. The scale to draw this frame at. Default is 1.
		 * @param {Function} setupFunction Optional. A function to call immediately before drawing this frame.
		 * @param {Array} setupParams Optional. Parameters to pass to the setup function.
		 * @param {Object} setupScope Optional. The scope to call the setupFunction in.
		 * @return {Number} The index of the frame that was just added, or null if a sourceRect could not be determined.
		 **/
		addFrame(source: DisplayObject, sourceRect: Rectangle, scale?: number, setupFunction?: any, setupParams?: any[], setupScope?: any): number;

		/**
		 * Adds an animation that will be included in the created sprite sheet.
		 * @method addFrame
		 * @param {String} name The name for the animation.
		 * @param {Array} frames An array of frame indexes that comprise the animation. Ex. [3,6,5] would describe an animation
		 * that played frame indexes 3, 6, and 5 in that order.
		 * @param {String} next Optional. Specifies the name of the animation to continue to after this animation ends. You can
		 * also pass false to have the animation stop when it ends. By default it will loop to the start of the same animation.
		 * @param {Number} frequency Optional. Specifies a frame advance frequency for this animation. For example, a value
		 * of 2 would cause the animation to advance every second tick.
		 **/
		addAnimation(name:string, frames:number[], next?:string, frequency?:number): void;

		/**
		 * This will take a MovieClip, and add its frames and labels to this builder. Labels will be added as an animation
		 * running from the label index to the next label. For example, if there is a label named "foo" at frame 0 and a label
		 * named "bar" at frame 10, in a MovieClip with 15 frames, it will add an animation named "foo" that runs from frame
		 * index 0 to 9, and an animation named "bar" that runs from frame index 10 to 14.
		 * <br/><br/>
		 * Note that this will iterate through the full MovieClip with actionsEnabled set to false, ending on the last frame.
		 * @method addMovieClip
		 * @param {MovieClip} source The source MovieClip to add to the sprite sheet.
		 * @param {Rectangle} sourceRect Optional. A rectangle defining the portion of the source to draw to the frame. If
		 * not specified, it will look for a getBounds method, frameBounds array, bounds property, or nominalBounds property
		 * on the source to use. If one is not found, the MovieClip will be skipped.
		 * @param {Number} scale Optional. The scale to draw the movie clip at. Default is 1.
		 **/
		addMovieClip(source: MovieClip, sourceRect?: Rectangle, scale?: number): void;

		/**
		 * Builds a SpriteSheet instance based on the current frames.
		 * @method build
		 * @return SpriteSheet The created SpriteSheet instance, or null if a build is already running or an error occurred.
		 **/
		build(): SpriteSheet;

		/**
		 * Asynchronously builds a SpriteSheet instance based on the current frames. It will run 20 times per second, using
		 * an amount of time defined by timeSlice. When it is complete it will call the specified callback.
		 * @method buildAsync
		 * @param {Function} callback Optional. The function to call when the build operation completes. It will be called
		 * with a single parameter providing a reference back to the builder.
		 * @param {Number} timeSlice Optional. A number from 0.01 to 1 that indicates what percentage of time the builder can use. This can be
		 * thought of as the number of seconds per second the builder will use. For example, with a timeSlice value of 0.3,
		 * the builder will run 20 times per second, using approximately 15ms per build (30% of available time, or 0.3s per second).
		 * Defaults to 0.3.
		 **/
		buildAsync(callback?:any, timeSlice?:number): void;

		/**
		 * Stops the current asynchronous build.
		 * @method stopAsync
		 **/
		stopAsync(): void;

		/**
		 * SpriteSheetBuilder instances cannot be cloned.
		 * @method clone
		 **/
		clone(): void;

		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		toString(): string;




	}

}