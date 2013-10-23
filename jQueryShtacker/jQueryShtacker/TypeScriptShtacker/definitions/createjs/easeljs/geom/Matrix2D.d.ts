/// <reference path="../display/Shadow.d.ts"/>

declare module createjs {

	//
	// Definition file for EaselJS-0.5.0
	//

	/**
		* Represents an affine transformation matrix, and provides tools for constructing and concatenating matrixes.
		* @class Matrix2D
	**/
	class Matrix2D {

		// static public properties:
		/**
		 * An identity matrix, representing a null transformation. Read-only.
		 * @property identity
		 * @static
		 * @type Matrix2D
		 **/
		static identity: Matrix2D;

		/**
		 * Multiplier for converting degrees to radians. Used internally by Matrix2D. Read-only.
		 * @property DEG_TO_RAD
		 * @static
		 * @final
		 * @type Number
		 **/
		static DEG_TO_RAD:number;


		// public properties:
		/**
		 * Position (0, 0) in a 3x3 affine transformation matrix.
		 * @property a
		 * @type Number
		 **/
    a:number;

		/**
		 * Position (0, 1) in a 3x3 affine transformation matrix.
		 * @property b
		 * @type Number
		 **/
		b:number;

		/**
		 * Position (1, 0) in a 3x3 affine transformation matrix.
		 * @property c
		 * @type Number
		 **/
		c:number;

		/**
		 * Position (1, 1) in a 3x3 affine transformation matrix.
		 * @property d
		 * @type Number
		 **/
		d:number;

		/**
		 * Position (2, 0) in a 3x3 affine transformation matrix.
		 * @property atx
		 * @type Number
		 **/
		tx: number;

		/**
		 * Position (2, 1) in a 3x3 affine transformation matrix.
		 * @property ty
		 * @type Number
		 **/
		ty:number;

		/**
		 * Property representing the alpha that will be applied to a display object. This is not part of matrix
		 * operations, but is used for operations like getConcatenatedMatrix to provide concatenated alpha values.
		 * @property alpha
		 * @type Number
		 **/
		alpha:number;
		
		/**
		 * Property representing the shadow that will be applied to a display object. This is not part of matrix
		 * operations, but is used for operations like getConcatenatedMatrix to provide concatenated shadow values.
		 * @property shadow
		 * @type Shadow
		 **/	
		shadow:Shadow;

		/**
		 * Property representing the compositeOperation that will be applied to a display object. This is not part of
		 * matrix operations, but is used for operations like getConcatenatedMatrix to provide concatenated
		 * compositeOperation values. You can find a list of valid composite operations at:
		 * <a href="https://developer.mozilla.org/en/Canvas_tutorial/Compositing">https://developer.mozilla.org/en/Canvas_tutorial/Compositing</a>
		 * @property compositeOperation
		 * @type String
		 **/
		compositeOperation:string;	
		
		
		

		/**
		* @constructor
		* @param {Number} a Specifies the a property for the new matrix.
		* @param {Number} b Specifies the b property for the new matrix.
		* @param {Number} c Specifies the c property for the new matrix.
		* @param {Number} d Specifies the d property for the new matrix.
		* @param {Number} tx Specifies the tx property for the new matrix.
		* @param {Number} ty Specifies the ty property for the new matrix.
		**/
		constructor(a:number, b:number, c:number, d:number, tx:number, ty:number);		



		// public methods:
		/**
		 * Concatenates the specified matrix properties with this matrix. All parameters are required.
		 * @method prepend
		 * @param {Number} a
		 * @param {Number} b
		 * @param {Number} c
		 * @param {Number} d
		 * @param {Number} tx
		 * @param {Number} ty
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/	
		prepend (a:number, b:number, c:number, d:number, tx:number, ty:number):Matrix2D;

		/**
		 * Appends the specified matrix properties with this matrix. All parameters are required.
		 * @method append
		 * @param {Number} a
		 * @param {Number} b
		 * @param {Number} c
		 * @param {Number} d
		 * @param {Number} tx
		 * @param {Number} ty
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/
		append (a:number, b:number, c:number, d:number, tx:number, ty:number):Matrix2D;

		/**
		 * Prepends the specified matrix with this matrix.
		 * @method prependMatrix
		 * @param {Matrix2D} matrix
		 **/
		prependMatrix (matrix:Matrix2D):void;

		/**
		 * Appends the specified matrix with this matrix.
		 * @method appendMatrix
		 * @param {Matrix2D} matrix
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/
		appendMatrix (matrix:Matrix2D):Matrix2D;

		/**
		 * Generates matrix properties from the specified display object transform properties, and prepends them with this matrix.
		 * For example, you can use this to generate a matrix from a display object: var mtx = new Matrix2D();
		 * mtx.prependTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation);
		 * @method prependTransform
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} scaleX
		 * @param {Number} scaleY
		 * @param {Number} rotation
		 * @param {Number} skewX
		 * @param {Number} skewY
		 * @param {Number} regX Optional.
		 * @param {Number} regY Optional.
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/
		prependTransform (x:number, y:number, scaleX:number, scaleY:number, rotation:number, skewX:number, skewY:number, regX?:number, regY?:number):Matrix2D;

		/**
		 * Generates matrix properties from the specified display object transform properties, and appends them with this matrix.
		 * For example, you can use this to generate a matrix from a display object: var mtx = new Matrix2D();
		 * mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation);
		 * @method appendTransform
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} scaleX
		 * @param {Number} scaleY
		 * @param {Number} rotation
		 * @param {Number} skewX
		 * @param {Number} skewY
		 * @param {Number} regX Optional.
		 * @param {Number} regY Optional.
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/
		appendTransform (x:number, y:number, scaleX:number, scaleY:number, rotation:number, skewX:number, skewY:number, regX?:number, regY?:number):Matrix2D;

		/**
		 * Applies a rotation transformation to the matrix.
		 * @method rotate
		 * @param {Number} angle The angle in degrees.
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/
		rotate (angle:number):Matrix2D;

		/**
		 * Applies a skew transformation to the matrix.
		 * @method skew
		 * @param {Number} skewX The amount to skew horizontally in degrees.
		 * @param {Number} skewY The amount to skew vertically in degrees.
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		*/
		skew (skewX:number, skewY:number):Matrix2D;

		/**
		 * Applies a scale transformation to the matrix.
		 * @method scale
		 * @param {Number} x
		 * @param {Number} y
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/
		scale (x:number, y:number):Matrix2D;

		/**
		 * Translates the matrix on the x and y axes.
		 * @method translate
		 * @param {Number} x
		 * @param {Number} y
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/
		translate (x:number, y:number):Matrix2D;

		/**
		 * Sets the properties of the matrix to those of an identity matrix (one that applies a null transformation).
		 * @method identity
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/
		identity ():Matrix2D;		

		/**
		 * Inverts the matrix, causing it to perform the opposite transformation.
		 * @method invert
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		 **/
		invert ():Matrix2D;

		/**
		 * Returns true if the matrix is an identity matrix.
		 * @method isIdentity
		 * @return {Boolean}
		 **/
		isIdentity ():boolean;	

		/**
		 * Decomposes the matrix into transform properties (x, y, scaleX, scaleY, and rotation). Note that this these values
		 * may not match the transform properties you used to generate the matrix, though they will produce the same visual
		 * results.
		 * @method decompose
		 * @param {Object} target The object to apply the transform properties to. If null, then a new object will be returned.
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		*/
		decompose (target:any):Matrix2D;

		/**
		 * Reinitializes all matrix properties to those specified.
		 * @method appendProperties
		 * @param {Number} a
		 * @param {Number} b
		 * @param {Number} c
		 * @param {Number} d
		 * @param {Number} tx
		 * @param {Number} ty
		 * @param {Number} alpha desired alpha value
		 * @param {Shadow} shadow desired shadow value
		 * @param {String} compositeOperation desired composite operation value
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		*/
		reinitialize(a:number, b:number, c:number, d:number, tx:number, ty:number, shadow:Shadow, compositeOperation:string): Matrix2D;
		
		/**
		 * Appends the specified visual properties to the current matrix.
		 * @method appendProperties
		 * @param {Number} alpha desired alpha value
		 * @param {Shadow} shadow desired shadow value
		 * @param {String} compositeOperation desired composite operation value
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		*/
		appendProperties (alpha:number, shadow:Shadow, compositeOperation:string):Matrix2D;			
		
		/**
		 * Prepends the specified visual properties to the current matrix.
		 * @method prependProperties
		 * @param {Number} alpha desired alpha value
		 * @param {Shadow} shadow desired shadow value
		 * @param {String} compositeOperation desired composite operation value
		 * @return {Matrix2D} This matrix. Useful for chaining method calls.
		*/
		prependProperties (alpha:number, shadow:Shadow, compositeOperation:string):Matrix2D;		

		/**
		 * Returns a clone of the Matrix2D instance.
		 * @method clone
		 * @return {Matrix2D} a clone of the Matrix2D instance.
		 **/
		clone ():Matrix2D;

		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		tostring ():string;

		

		

	}

}