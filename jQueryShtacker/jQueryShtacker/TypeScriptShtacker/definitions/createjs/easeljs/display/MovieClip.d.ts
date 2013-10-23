/// <reference path="../../tweenjs/Timeline.d.ts"/>
/// <reference path="DisplayObject.d.ts"/>
/// <reference path="Container.d.ts"/>

declare module createjs {

	//
	// Definition file for EaselJS-0.5.0
	//

	/**
	 * The MovieClip class associates a TweenJS Timeline with an EaselJS Container. It allows you to create objects which
	 * encapsulate timeline animations, state changes, and synched actions. Due to the complexities inherent in correctly
	 * setting up a MovieClip, it is largely intended for tool output and is not included in the main EaselJS library.
	 * <br/><br/>
	 * Currently MovieClip only works properly if it is tick based (as opposed to time based) though some concessions have
	 * been made to support time based timelines in the future.
	 * @class MovieClip
	 * @extends Container
	**/
	class MovieClip extends Container {

		/**
		 * Read-only. The MovieClip will advance independently of its parent, even if its parent is paused.
		 * This is the default mode.
		 * @property INDEPENDENT
		 * @static
		 * @type String
		 * @default "independent"
		 **/
		static INDEPENDENT: string;

		/**
		 * Read-only. The MovieClip will only display a single frame (as determined by the startPosition property).
		 * @property SINGLE_FRAME
		 * @static
		 * @type String
		 * @default "single"
		 **/
		static SINGLE_FRAME: string;

		/**
		 * Read-only. The MovieClip will be advanced only when it's parent advances and will be synched to the position of
		 * the parent MovieClip.
		 * @property SYNCHED
		 * @static
		 * @type String
		 * @default "synched"
		 **/
		static SYNCHED: string;



		// public properties:

		/**
		 * Controls how this MovieClip advances its time. Must be one of 0 (INDEPENDENT), 1 (SINGLE_FRAME), or 2 (SYNCHED).
		 * See each constant for a description of the behaviour.
		 * @property mode
		 * @type String
		 * @default null
		 **/
		mode: string;

		/**
		 * Specifies what the first frame to play in this movieclip, or the only frame to display if mode is SINGLE_FRAME.
		 * @property startPosition
		 * @type Number
		 * @default 0
		 */
		startPosition: number;

		/**
		 * Indicates whether this MovieClip should loop when it reaches the end of its timeline.
		 * @property loop
		 * @type Boolean
		 * @default true
		 */
		loop: boolean;

		/**
		 * The TweenJS Timeline that is associated with this MovieClip. This is created automatically when the MovieClip
		 * instance is initialized.
		 * @property timeline
		 * @type Timeline
		 */
		timeline: Timeline;

		/**
		 * If true, the MovieClip's position will not advance when ticked.
		 * @property paused
		 * @type Boolean
		 */
		paused: boolean;

		/**
		 * If true, actions in this MovieClip's tweens will be run when the playhead advances.
		 * @property actionsEnabled
		 * @type Boolean
		 */
		actionsEnabled: boolean;




		/**
		 * @constructor
		 * @param {String} mode Initial value for the mode property. One of MovieClip.INDEPENDENT, MovieClip.SINGLE_FRAME, or MovieClip.SYNCHED.
		 * @param {Number} startPosition Initial value for the startPosition property.
		 * @param {Boolean} loop Initial value for the loop property.
		 * @param {Object} labels A hash of labels to pass to the timeline instance associated with this MovieClip.
		 **/
		constructor (mode: string, startPosition: number, loop: boolean, labels: any);		


		/**
		 * Sets paused to false.
		 * @method play
		 **/
		play ():void;
		
		/**
		 * Sets paused to true.
		 * @method stop
		 **/
		stop ():void;
		
		/**
		 * Advances this movie clip to the specified position or label and sets paused to false.
		 * @method gotoAndPlay
		 * @param {String|Number} positionOrLabel
		 **/
		gotoAndPlay (positionOrLabel:any):void;	// TODO: Do the overload

		/**
		 * Advances this movie clip to the specified position or label and sets paused to true.
		 * @method gotoAndStop
		 * @param {String|Number} positionOrLabel
		 **/
		gotoAndStop (positionOrLabel:any):void;	// TODO: Do the overload

		clone (recursive?:boolean):MovieClip;


		// Extened from Container / DisplayObject
		//isVisible ():boolean;
		//draw (ctx:CanvasRenderingContext2D, ignoreCache:boolean):void;
		// tostring ():string;


		


	}

}