

declare module createjs {

	//
	// Definition file for EaselJS-0.5.0
	//
	/**
	* The Ticker class uses a static interface (ex. Ticker.getPaused()) and should not be instantiated.
	* Provides a centralized tick or heartbeat broadcast at a set interval. Listeners can subscribe
	* to the tick event to be notified when a set time interval has elapsed.
	* Note that the interval that the tick event is called is a target interval, and may be broadcast
	* at a slower interval during times of high CPU load.
	* @class Ticker	
	**/
	class Ticker {

		// public static properties:
		/**
		 * Indicates whether Ticker should use requestAnimationFrame if it is supported in the browser. If false, Ticker
		 * will use setTimeout. If you use RAF, it is recommended that you set the framerate to a divisor of 60 (ex. 15,
		 * 20, 30, 60).
		 * @property useRAF
		 * @static
		 * @type Boolean
		 **/
		static useRAF:boolean;
		

		// public static methods:
		/**
		 * Adds a listener for the tick event. The listener must be either an object exposing a .tick() method,
		 * or a function. The listener will be called once each tick / interval. The interval is specified via the 
		 * .setInterval(ms) method.
		 * The tick method or function is passed two parameters: the elapsed time between the 
		 * previous tick and the current one, and a boolean indicating whether Ticker is paused.
		 * @method addListener
		 * @static
		 * @param {Object} o The object or function to add as a listener.
		 * @param {Boolean} pauseable If false, the listener will continue to have tick called 
		 * even when Ticker is paused via Ticker.pause(). Default is true.
		 **/
		static addListener (o:any, pauseable?:boolean):void;

		/**
		 * Initializes or resets the timer, clearing all associated listeners and fps measuring data, starting the tick.
		 * This is called automatically when the first listener is added.
		 * @method init
		 * @static
		 **/
		static init ():void;

		/**
		 * Removes the specified listener.
		 * @method removeListener
		 * @static
		 * @param {Object} o The object or function to remove from listening from the tick event.
		 **/
		static removeListener (o:any):void;

		/**
		 * Removes all listeners.
		 * @method removeAllListeners
		 * @static
		 **/
		static removeAllListeners ():void;

		/**
		 * Sets the target time (in milliseconds) between ticks. Default is 50 (20 FPS).
		 * Note actual time between ticks may be more than requested depending on CPU load.
		 * @method setInterval
		 * @static
		 * @param {Number} interval Time in milliseconds between ticks. Default value is 50.
		 **/
		static setInterval (interval:number):void;

		/**
		 * Returns the current target time between ticks, as set with setInterval.
		 * @method getInterval
		 * @static
		 * @return {Number} The current target interval in milliseconds between tick events.
		 **/
		static getInterval (): number;

		/**
		 * Sets the target frame rate in frames per second (FPS). For example, with an interval of 40, getFPS() will 
		 * return 25 (1000ms per second divided by 40 ms per tick = 25fps).
		 * @method setFPS
		 * @static
		 * @param {Number} value Target number of ticks broadcast per second.
		 **/
		static setFPS (value:number):void;

		/**
		 * Returns the target frame rate in frames per second (FPS). For example, with an 
		 * interval of 40, getFPS() will return 25 (1000ms per second divided by 40 ms per tick = 25fps).
		 * @method getFPS
		 * @static
		 * @return {Number} The current target number of frames / ticks broadcast per second.
		 **/
		static getFPS ():number;

		/**
		 * Returns the actual frames / ticks per second.
		 * @method getMeasuredFPS
		 * @static
		 * @param {Number} ticks Optional. The number of previous ticks over which to measure the actual 
		 * frames / ticks per second. Defaults to the number of ticks per second.
		 * @return {Number} The actual frames / ticks per second. Depending on performance, this may differ
		 * from the target frames per second.
		 **/
		static getMeasuredFPS (ticks?:number):number;

		/**
		 * While Ticker is paused, pausable listeners are not ticked. See addListener for more information.
		 * @method setPaused
		 * @static
		 * @param {Boolean} value Indicates whether to pause (true) or unpause (false) Ticker.
		 **/
		static setPaused (value:boolean):void;

		/**
		 * Returns a boolean indicating whether Ticker is currently paused, as set with setPaused.
		 * @method getPaused
		 * @static
		 * @return {Boolean} Whether the Ticker is currently paused.
		 **/
		static getPaused ():boolean;				

		/**
		 * Returns the number of milliseconds that have elapsed since the first tick event listener was added to
		 * Ticker. For example, you could use this in a time synchronized animation to determine the exact amount of 
		 * time that has elapsed.
		 * @method getTime
		 * @static
		 * @param {Boolean} pauseable Indicates whether to include time elapsed
		 * while Ticker was paused. If false only time elapsed while Ticker is not paused will be returned.
		 * If true, the value returned will be total time elapsed since the first tick event listener was added.
		 * @return {Number} Number of milliseconds that have elapsed since Ticker was begun.
		 **/
		static getTime (pauseable:boolean):number;

		/**
		 * Returns the number of ticks that have been broadcast by Ticker.
		 * @method getTicks
		 * @static
		 * @param {Boolean} pauseable Indicates whether to include ticks that would have been broadcast
		 * while Ticker was paused. If false only tick events broadcast while Ticker is not paused will be returned.
		 * If true, tick events that would have been broadcast while Ticker was paused will be included in the return
		 * value. The default value is false.
		 * @return {Number} of ticks that have been broadcast.
		 **/
		static getTicks (pauseable:boolean):number;

		

		
		

	}

}