declare module createjs {

	//
	// Definition file for TweenJS-0.3.0
	//

	/**
	 * A TweenJS plugin for working with numeric CSS string properties (ex. top, left). To use simply call
	 * CSSPlugin.install() after TweenJS has loaded. You can adjust the CSS properties it will work with by
	 * modifying the cssSuffixMap property.
	 * @class CSSPlugin	 
	 **/
	class CSSPlugin  {

		/** 
		 * Defines the default suffix map for CSS tweens. This can be overridden on a per tween basis by specifying a
		 * cssSuffixMap value for the individual tween. The object maps CSS property names to the suffix to use when
		 * reading or setting those properties. For example a map in the form {top:"px"} specifies that when tweening
		 * the "top" CSS property, it should use the "px" suffix (ex. target.style.top = "20.5px"). This only applies
		 * to tweens with the "css" config property set to true.
		 * @property cssSuffixMap
		 * @type Object
		 * @static
		 **/
		static cssSuffixMap: any;

		/**
		 * Used by TweenJS to determine when to call this plugin.
		 * @property priority
		 * @protected
		 * @static
		 **/
		static priority: number;

		/**
		 * Installs this plugin for use with TweenJS. Call this once, after TweenJS is loaded to enable this plugin.
		 * @method install
		 * @static
		 **/
		static install(object?:any): void;

	}

}