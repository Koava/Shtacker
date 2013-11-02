/// <reference path="definitions/createjs/tweenjs/Tween.d.ts"/>
/// <reference path="definitions/createjs/preloadjs/PreloadJS.d.ts"/>
/// <reference path="definitions/createjs/easeljs/geom/Point.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Container.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Stage.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Shape.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Bitmap.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/SpriteSheet.d.ts"/>
/// <reference path="definitions/createjs/easeljs/utils/SpriteSheetBuilder.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Text.d.ts"/>
/// <reference path="definitions/createjs/easeljs/utils/Ticker.d.ts"/>
var PieceDisplayTemplate = (function () {
    function PieceDisplayTemplate(size, strokeWidth) {
        if (typeof strokeWidth === "undefined") { strokeWidth = 6; }
        var radius = (size - strokeWidth) / 2;
        var centerOffset = size / 2;

        this._templateGraphics = new createjs.Graphics().setStrokeStyle(strokeWidth).beginLinearGradientStroke(["#FFCC00", "#FFCC66"], [0, 1], 0, 0, 0, 10).drawCircle(centerOffset, centerOffset, radius);
        this._templateShape = new createjs.Shape(this._templateGraphics);
        this._templateShape.alpha = 0.8;

        var spriteSheetBuilder = new createjs.SpriteSheetBuilder();
        var frameBounds = new createjs.Rectangle(0, 0, size, size);
        var frameIndex = spriteSheetBuilder.addFrame(this._templateShape, frameBounds);
        var spriteSheet = spriteSheetBuilder.build();

        this._templateSprite = new createjs.Sprite(spriteSheet, frameIndex);
    }
    PieceDisplayTemplate.prototype.newPieceDisplay = function () {
        var pieceSprite = this._templateSprite.clone();
        return pieceSprite;
    };
    return PieceDisplayTemplate;
})();

var GamePiece = (function () {
    function GamePiece(transform, makeVisible) {
        if (typeof makeVisible === "undefined") { makeVisible = true; }
        this._transform = transform.clone();
        this._visible = makeVisible;
    }
    Object.defineProperty(GamePiece.prototype, "visible", {
        set: function (makeVisible) {
            this._visible = makeVisible;
            if (this._displayElement) {
                this._displayElement.visible = this._visible;
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(GamePiece.prototype, "displayShape", {
        set: ////public set transform(transform: createjs.Matrix2D) {
        ////    this._transform = transform;
        ////}
        //public get transform(): createjs.Matrix2D {
        //    return this._transform;
        //}
        function (displayElement) {
            this._displayElement = displayElement;
            this.resetDisplay();
        },
        enumerable: true,
        configurable: true
    });

    GamePiece.prototype.resetDisplay = function () {
        if (this._displayElement) {
            this._displayElement.visible = this._visible;
            this._displayElement.x = this._transform.tx;
            this._displayElement.y = this._transform.ty;
        }
    };

    Object.defineProperty(GamePiece.prototype, "x", {
        get: function () {
            return this._transform.tx;
        },
        set: function (xPos) {
            this._transform.tx = xPos;
            if (this._displayElement) {
                this._displayElement.x = xPos;
            }
        },
        enumerable: true,
        configurable: true
    });

    return GamePiece;
})();

var PiecesBlock = (function () {
    function PiecesBlock(numPieces, startBox) {
        this._startTransform = createjs.Matrix2D.identity.clone().scale(startBox.width, startBox.height).translate(startBox.x, startBox.y);

        this._pieces = new Array(numPieces);

        for (var i = 0; i < numPieces; i++) {
            this._pieces[i] = new GamePiece(this._startTransform);
        }

        this.resetBlock();
    }
    Object.defineProperty(PiecesBlock.prototype, "visible", {
        set: function (makeVisible) {
            this._pieces.forEach(function (p) {
                p.visible = makeVisible;
            });
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(PiecesBlock.prototype, "bounds", {
        get: function () {
            //var xs = this._pieces.map(p => { return p.x });
            //return { min: Math.min.apply(xs), max: Math.max.apply(xs) };
            var minX = this._pieces[0].x;
            var maxX = this._pieces[this._pieces.length - 1].x + this._startTransform.a;
            return { min: minX, max: maxX };
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(PiecesBlock.prototype, "pieces", {
        get: function () {
            return this._pieces;
        },
        enumerable: true,
        configurable: true
    });

    PiecesBlock.prototype.resetBlock = function () {
        var pieceTransform = this._startTransform.clone();

        for (var i = 0; i < this._pieces.length; i++) {
            this._pieces[i]._transform.copy(pieceTransform);
            this._pieces[i].resetDisplay();
            pieceTransform.translate(pieceTransform.a, 0);
        }
    };

    PiecesBlock.prototype.stacksWith = function (otherBlock, tolerance) {
        var thisBounds = this.bounds;
        var otherBounds = otherBlock.bounds;
        return thisBounds.min + tolerance >= otherBounds.min && thisBounds.max - tolerance <= otherBounds.max;
    };

    PiecesBlock.prototype.moveTo = function (xPos) {
        // TODO use a container instead of moving each piece individually
        var len = this._pieces.length;
        for (var i = 0; i < len; i++) {
            this._pieces[i].x = xPos + i * this._startTransform.a;
        }
    };
    return PiecesBlock;
})();

var MovementDirection;
(function (MovementDirection) {
    MovementDirection[MovementDirection["Left"] = 0] = "Left";
    MovementDirection[MovementDirection["Right"] = 1] = "Right";
})(MovementDirection || (MovementDirection = {}));

var GameBoard = (function () {
    function GameBoard(cellDimensions, boardColumns, boardRows) {
        this._cellDimensions = cellDimensions;
        this._boardSize = { columns: boardColumns, rows: boardRows };
        this._boardDimensions = new createjs.Point(boardColumns * cellDimensions.x, boardRows * cellDimensions.y);
        this._blocksStack = new Array(boardRows);
        this._movementDirection = MovementDirection.Left;

        // initial position just off the board to the right
        var blockStartBox = new createjs.Rectangle(this._boardDimensions.x, 0, cellDimensions.x, cellDimensions.y);

        for (var i = 0; i < boardRows; i++) {
            var numPieces = 6 - Math.ceil(i / 3);
            this._blocksStack[i] = new PiecesBlock(numPieces, blockStartBox);
            blockStartBox.y += cellDimensions.y;
        }

        this._topBlockIndex = -1;
        this._activeBlockIndex = 0;
    }
    Object.defineProperty(GameBoard.prototype, "boardSize", {
        get: function () {
            return this._boardSize;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(GameBoard.prototype, "boardDimensions", {
        get: function () {
            return this._boardDimensions;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(GameBoard.prototype, "activeBlock", {
        get: function () {
            return this._blocksStack[this._activeBlockIndex];
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(GameBoard.prototype, "blocks", {
        get: function () {
            return this._blocksStack;
        },
        enumerable: true,
        configurable: true
    });

    GameBoard.prototype.resetBoard = function () {
        this._blocksStack.forEach(function (l) {
            return l.resetBlock();
        });
        this._topBlockIndex = -1;
        this._activeBlockIndex = 0;
    };

    GameBoard.prototype.moveActiveBlockBy = function (xOffset) {
        if (this._activeBlockIndex < this.blocks.length) {
            var activeBlock = this._blocksStack[this._activeBlockIndex];
            var blockBounds = activeBlock.bounds;
            var newXPos = this._movementDirection == MovementDirection.Left ? blockBounds.min - xOffset : blockBounds.min + xOffset;
            if (newXPos < 0) {
                this._movementDirection = MovementDirection.Right;
                newXPos = -newXPos;
            } else {
                if (this._movementDirection == MovementDirection.Right) {
                    var rightmost = this._boardDimensions.x - (blockBounds.max - blockBounds.min);
                    if (newXPos > rightmost) {
                        this._movementDirection = MovementDirection.Left;
                        newXPos = rightmost + rightmost - newXPos;
                    }
                }
            }
            activeBlock.moveTo(newXPos);
        }
    };

    GameBoard.prototype.stackActiveBlock = function () {
        var activeBlock = this._blocksStack[this._activeBlockIndex];
        var topBlock = this._topBlockIndex >= 0 ? this._blocksStack[this._topBlockIndex] : null;
        var stacksUp = topBlock != null ? activeBlock.stacksWith(topBlock, this._cellDimensions.x / 2) : true;
        var newActiveBlockIndex = stacksUp ? this.nextBlock() : this._activeBlockIndex;
        return { stacksUp: stacksUp, newActiveBlockIndex: newActiveBlockIndex };
    };

    GameBoard.prototype.nextBlock = function () {
        this._topBlockIndex = this._activeBlockIndex;
        this._activeBlockIndex++;

        //        this._blocksStack[this._activeBlockIndex].visible = true;
        this._movementDirection = MovementDirection.Left;
        return this._activeBlockIndex;
    };
    return GameBoard;
})();

var LocalPlayGameController = (function () {
    function LocalPlayGameController(settings, display) {
        this._settings = settings;
        this._display = display;
        var cellDimensions = new createjs.Point(display.cellSize, display.cellSize);
        this._board = new GameBoard(cellDimensions, settings.boardColumns, settings.boardRows);
        this._movementSpeed = LocalPlayGameController.PixelSpeed(settings.gameSpeed, this._board.boardDimensions.x, settings.boardColumns, display.targetFrameRate);

        this.setupBoard();
    }
    LocalPlayGameController.prototype.setupBoard = function () {
        var _this = this;
        var shapeTemplate = new PieceDisplayTemplate(this._display.cellSize, 6);
        this._board.blocks.forEach(function (block) {
            block.pieces.forEach(function (piece) {
                var shape = shapeTemplate.newPieceDisplay();
                piece.displayShape = shape;
                _this._display.boardDisplay.addChild(shape);
            });
        });
    };

    Object.defineProperty(LocalPlayGameController.prototype, "gameCallbacks", {
        set: function (gameCallbacks) {
            this._gameCallbacks = gameCallbacks;
        },
        enumerable: true,
        configurable: true
    });

    LocalPlayGameController.prototype.gameStart = function () {
        this._display.boardDisplay.on("mousedown", this.stackBlock, this);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.setFPS(this._display.targetFrameRate);
        createjs.Ticker.on("tick", this.frameTick, this);
    };

    LocalPlayGameController.prototype.stackBlock = function (evt) {
        this._stackBlock = true;
    };

    LocalPlayGameController.prototype.gamePause = function () {
        createjs.Ticker.setPaused(true);
    };

    LocalPlayGameController.prototype.gameResume = function () {
        createjs.Ticker.setPaused(false);
    };

    LocalPlayGameController.prototype.gameOver = function (text) {
        this._board.resetBoard();
        this._display.boardDisplay.removeAllEventListeners("mousedown");
        this._gameCallbacks.gameOver(text, this._board._topBlockIndex + 1);
    };

    LocalPlayGameController.prototype.frameTick = function (evt) {
        if (!evt.Paused) {
            if (!this._stackBlock) {
                this._board.moveActiveBlockBy(this._movementSpeed);
                this._display.update(evt);
            } else {
                this._stackBlock = false;
                var pile = this._board.stackActiveBlock();
                if (!pile.stacksUp) {
                    evt.remove();
                    this.gameOver("Game Over");
                } else if (pile.newActiveBlockIndex == this._settings.boardRows) {
                    evt.remove();
                    this.gameOver("You Win!");
                }
            }
        }
    };

    LocalPlayGameController.PixelSpeed = function (gameSpeed, boardWidth, boardColumns, frameRate) {
        // columns / s * pixel / columns / frame * s = pixel/frame
        return gameSpeed * boardWidth / (boardColumns * frameRate);
    };
    return LocalPlayGameController;
})();

var GameSettings = (function () {
    function GameSettings(gameSpeed, colums, rows) {
        if (typeof gameSpeed === "undefined") { gameSpeed = 12; }
        if (typeof colums === "undefined") { colums = 12; }
        if (typeof rows === "undefined") { rows = 15; }
        this.gameSpeed = gameSpeed;
        this.boardColumns = colums;
        this.boardRows = rows;
    }
    return GameSettings;
})();

var GameDisplay = (function () {
    function GameDisplay(canvasElementId, cellSize, targetFrameRate) {
        if (typeof cellSize === "undefined") { cellSize = 32; }
        if (typeof targetFrameRate === "undefined") { targetFrameRate = 60; }
        var canvas = document.getElementById(canvasElementId);
        if (canvas == null) {
            throw new Error("Canvas element with ID '" + canvasElementId + "' not found in document.");
        }

        this.canvas = canvas;

        this.stage = new createjs.Stage(this.canvas);

        this.boardDisplay = new createjs.Container();

        // draw board in math coordinates: origin at bottom left, y axis up
        this.boardDisplay.y += canvas.height;
        this.boardDisplay.scaleY = -1;

        var boardBackground = GameAdornments.BuildBoardBackground(canvas.width, canvas.height);
        boardBackground.cache(boardBackground.x, boardBackground.y, canvas.width, canvas.height);
        this.boardDisplay.addChild(boardBackground);
        this.stage.addChild(this.boardDisplay);

        this._titleDisplay = new createjs.Container();
        this._titleDisplay.addChild(GameAdornments.BuildTitle(canvas.width, canvas.height));
        this._titleDisplay.visible = false;

        this._menuDisplay = new createjs.Container();
        this._menuDisplay.addChild(GameAdornments.BuildMenu(canvas.width, canvas.height));
        this._menuDisplay.visible = false;
        this._menuDisplay.cursor = "pointer";

        this.cellSize = cellSize;
        this.targetFrameRate = targetFrameRate;
        this._frameCounter = 0;
        this._frameRateDisplay = document.getElementById("fpsDisplay");
    }
    Object.defineProperty(GameDisplay.prototype, "menuCallbacks", {
        set: function (menuCallbacks) {
            this._menuCallbacks = menuCallbacks;
        },
        enumerable: true,
        configurable: true
    });

    GameDisplay.prototype.startPressed = function (evt) {
        this.showMenu(false);
        this._menuCallbacks.gameStart();
    };

    GameDisplay.prototype.gameOver = function (text, score) {
        var _this = this;
        createjs.Ticker.addEventListener("tick", this.stage);
        var overlay = GameAdornments.BuildOverlay(this.canvas.width, this.canvas.height, text);
        var targetY = overlay.y;
        var overlayHeight = this.canvas.height - 2 * overlay.y;
        overlay.y = -overlayHeight;
        this.stage.addChild(overlay);
        createjs.Tween.get(overlay).to({ y: targetY, rotation: 360 }, 500).wait(500).call(function (o) {
            _this.stage.removeChild(o);
            _this.showMenu(true);
        }, [overlay], this);
    };

    GameDisplay.prototype.update = function (evt) {
        this.stage.update(evt);
        this._frameCounter++;
        if ((this._frameRateDisplay != null) && (this._frameCounter % this.targetFrameRate) == 0) {
            var actualFrameRate = Math.round(createjs.Ticker.getMeasuredFPS());
            if (actualFrameRate > 0) {
                this._frameRateDisplay.innerText = actualFrameRate + " fps";
            }
        }
    };

    GameDisplay.prototype.showMenu = function (doShow) {
        if (doShow) {
            createjs.Ticker.setFPS(15);
            if (!this.stage.hasEventListener("tick")) {
                createjs.Ticker.addEventListener("tick", this.stage);
            }

            this.stage.addChild(this._titleDisplay);
            this.stage.addChild(this._menuDisplay);
            this.stage.enableMouseOver(10);

            this._titleDisplay.alpha = 0;
            this._titleDisplay.visible = true;

            this._menuDisplay.on("mousedown", this.startPressed, this);
            this._menuDisplay.alpha = 0;
            this._menuDisplay.visible = true;

            createjs.Tween.get(this._menuDisplay).to({ alpha: 1 }, 500);
            createjs.Tween.get(this._titleDisplay).to({ alpha: 1 }, 500);
        } else {
            createjs.Tween.get(this._menuDisplay).to({ alpha: 0 }, 500);
            createjs.Tween.get(this._titleDisplay).to({ alpha: 0 }, 500);

            this._titleDisplay.visible = false;
            this._menuDisplay.removeAllEventListeners("mousedown");
            this._menuDisplay.visible = false;

            this.stage.enableMouseOver(0);
            this.stage.removeChild(this._titleDisplay);
            this.stage.removeChild(this._menuDisplay);

            createjs.Ticker.removeEventListener("tick", this.stage);
        }
    };
    return GameDisplay;
})();

var GameAdornments;
(function (GameAdornments) {
    var titleFont = "bold 56px Comic Sans MS";
    var overlayFont = "bold 32px Comic Sans MS";
    var menuFont = "bold 32px Comic Sans MS";
    var fontColor = "orange";

    function BuildBoardBackground(width, height) {
        var background = new createjs.Shape();
        background.graphics.beginLinearGradientFill(["#000000", "#ffffff"], [0, 1], 0, 0, 0, height).drawRect(0, 0, width, height);
        return background;
    }
    GameAdornments.BuildBoardBackground = BuildBoardBackground;

    function BuildTitle(width, height) {
        var title = new createjs.Text();
        title.text = "/Shtacker\\";
        title.color = fontColor;
        title.font = titleFont;
        var textBox = title.getBounds();
        title.x = (width - textBox.width) / 2;
        title.y = 50;
        return title;
    }
    GameAdornments.BuildTitle = BuildTitle;

    function BuildMenu(width, height) {
        var menu = new createjs.Text();
        menu.text = "Play";
        menu.color = fontColor;
        menu.font = menuFont;
        var textBox = menu.getBounds();
        menu.x = (width - textBox.width) / 2;
        menu.y = (height - textBox.height) / 2;
        return menu;
    }
    GameAdornments.BuildMenu = BuildMenu;

    function BuildOverlay(width, height, text) {
        var overlay = new createjs.Text();
        overlay.text = text;
        overlay.color = fontColor;
        overlay.font = overlayFont;
        var textBox = overlay.getBounds();
        overlay.regX = textBox.width / 2;
        overlay.regY = textBox.height / 2;
        overlay.x = (width - textBox.width) / 2 + overlay.regX;
        overlay.y = (height - textBox.height) / 2 + overlay.regY;
        return overlay;
    }
    GameAdornments.BuildOverlay = BuildOverlay;
})(GameAdornments || (GameAdornments = {}));

var GameHost = (function () {
    function GameHost(canvasElementId, settings) {
        if (typeof settings === "undefined") { settings = new GameSettings(); }
        this._settings = settings;
        this._display = new GameDisplay(canvasElementId);
        this.gameController = new LocalPlayGameController(this._settings, this._display);
        this.gameController.gameCallbacks = this._display;
        this._display.menuCallbacks = this.gameController;
        this._display.showMenu(true);
    }
    return GameHost;
})();
//# sourceMappingURL=game.d2.js.map
