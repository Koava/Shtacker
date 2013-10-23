/// <reference path="../display/SpriteSheet.d.ts"/>

declare module createjs {

	//
	// Definition file for EaselJS-0.5.0
	//
	class SpriteSheetUtils {


		/**
		* <b>This is an experimental method, and is likely to be buggy. Please report issues.</b><br/><br/>
		* Extends the existing sprite sheet by flipping the original frames either horizontally, vertically, or both,
		* and adding appropriate animation & frame data.
		* @method flip
		* @static
		* @param {Image} spriteSheet The sprite sheet to use as the source.
		* @param {Object} flipData A generic object that specifies which frames will be flipped, what to name the
		* flipped result, and how to flip the frames (horizontally, vertically, or both). Each property name
		* indicates the name of a new sequence to create, and should reference an array where the first index is
		* the name of the original sequence to flip, the second index indicates whether to flip it horizontally,
		* the third index indicates whether to flip it vertically, and the fourth indicates what the "next" value
		* for the resulting frame data should be. For example, the following would create a new sequence named
		* "walk_left" consisting of the frames from the original "walk_right" sequence flipped
		* horizontally: &#123;walk_left: ["walk_right", true, false]&#125;
		**/
		static addFlippedFrames (spriteSheetImage:any, horizontal:boolean, vertical:boolean, both:boolean):void;

		
		// TODO: HTMLImageElement is originally Image class but compilter throw errors on that
		static extractFrame (spriteSheet:SpriteSheet, frame:any):HTMLImageElement;
		static flip (spriteSheet:HTMLImageElement, flipData:any):void;

		}

}