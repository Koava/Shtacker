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

class PieceDisplayTemplate {
    private _templateGraphics: createjs.Graphics;
    private _templateShape: createjs.Shape;
    private _templateSprite: createjs.Sprite;

    constructor(size: number, strokeWidth: number = 6) {
        var radius = (size - strokeWidth) / 2;
        var centerOffset = size / 2;

        this._templateGraphics = new createjs.Graphics()
            .setStrokeStyle(strokeWidth)
            .beginLinearGradientStroke(["#FFCC00", "#FFCC66"], [0, 1], 0, 0, 0, 10)
            .drawCircle(centerOffset, centerOffset, radius);
        this._templateShape = new createjs.Shape(this._templateGraphics);
        this._templateShape.alpha = 0.8;

        var spriteSheetBuilder = new createjs.SpriteSheetBuilder();
        var frameBounds = new createjs.Rectangle(0, 0, size, size);
        var frameIndex = spriteSheetBuilder.addFrame(this._templateShape, frameBounds);
        var spriteSheet = spriteSheetBuilder.build();

        this._templateSprite = new createjs.Sprite(spriteSheet, frameIndex);
    }

    public newPieceDisplay(): createjs.DisplayObject {
        var pieceSprite = this._templateSprite.clone();
        return pieceSprite;
    }
}

interface IDisplayElement {
    x: number;
    y: number;
    visible: boolean;
}

class GamePiece {
    public _transform: createjs.Matrix2D;
    private _visible: boolean;
    private _displayElement: IDisplayElement;

    constructor(transform: createjs.Matrix2D, makeVisible: boolean = true) {
        this._transform = transform.clone();
        this._visible = makeVisible;
    }

    public set visible(makeVisible: boolean) {
        this._visible = makeVisible;
        if (this._displayElement) {
            this._displayElement.visible = this._visible;
        }
    }

    ////public set transform(transform: createjs.Matrix2D) {
    ////    this._transform = transform;
    ////}

    //public get transform(): createjs.Matrix2D {
    //    return this._transform;
    //}

    public set displayShape(displayElement: IDisplayElement) {
        this._displayElement = displayElement;
        this.resetDisplay();
    }

    public resetDisplay() {
        if (this._displayElement) {
            this._displayElement.visible = this._visible;
            this._displayElement.x = this._transform.tx;
            this._displayElement.y = this._transform.ty;
        }
    }

    public get x(): number {
        return this._transform.tx;
    }

    public set x(xPos: number) {
        this._transform.tx = xPos;
        if (this._displayElement) {
            this._displayElement.x = xPos;
        }
    }
}

class PiecesBlock {
    private _startTransform: createjs.Matrix2D;
    private _pieces: Array<GamePiece>;

    constructor(numPieces: number, startBox: createjs.Rectangle) {
        this._startTransform = createjs.Matrix2D.identity
            .clone()
            .scale(startBox.width, startBox.height)
            .translate(startBox.x, startBox.y);

        this._pieces = new Array<GamePiece>(numPieces);

        for (var i = 0; i < numPieces; i++) {
            this._pieces[i] = new GamePiece(this._startTransform);
        }

        this.resetBlock();
    }

    public set visible(makeVisible: boolean) {
        this._pieces.forEach(p => { p.visible = makeVisible; });
    }

    public get bounds(): { min: number; max: number } {
        //var xs = this._pieces.map(p => { return p.x });
        //return { min: Math.min.apply(xs), max: Math.max.apply(xs) };
        var minX = this._pieces[0].x;
        var maxX = this._pieces[this._pieces.length - 1].x + this._startTransform.a;
        return { min: minX, max: maxX };
    }

    public get pieces(): Array<GamePiece> {
        return this._pieces;
    }

    public resetBlock() {
        var pieceTransform = this._startTransform.clone();

        for (var i = 0; i < this._pieces.length; i++) {
            this._pieces[i]._transform.copy(pieceTransform);
            this._pieces[i].resetDisplay();
            pieceTransform.translate(pieceTransform.a, 0);
        }
    }

    public stacksWith(otherBlock: PiecesBlock, tolerance: number): boolean {
        var thisBounds = this.bounds;
        var otherBounds = otherBlock.bounds;
        return thisBounds.min + tolerance >= otherBounds.min && thisBounds.max - tolerance <= otherBounds.max;
    }

    public moveTo(xPos: number) {
        // TODO use a container instead of moving each piece individually
        var len = this._pieces.length;
        for (var i = 0; i < len; i++) {
            this._pieces[i].x = xPos + i * this._startTransform.a;
        }
    }
}

enum MovementDirection {
    Left,
    Right
}

class GameBoard {
    private _cellDimensions: createjs.Point;
    private _boardSize: { columns: number; rows: number };
    private _boardDimensions: createjs.Point;

    private _blocksStack: Array<PiecesBlock>;
    public _topBlockIndex: number;
    public _activeBlockIndex: number;

    private _movementDirection: MovementDirection;

    constructor(cellDimensions: createjs.Point, boardColumns: number, boardRows: number) {
        this._cellDimensions = cellDimensions;
        this._boardSize = { columns: boardColumns, rows: boardRows };
        this._boardDimensions = new createjs.Point(boardColumns * cellDimensions.x, boardRows * cellDimensions.y);
        this._blocksStack = new Array<PiecesBlock>(boardRows);
        this._movementDirection = MovementDirection.Left;

        // initial position just off the board to the right
        var blockStartBox: createjs.Rectangle = new createjs.Rectangle(this._boardDimensions.x, 0, cellDimensions.x, cellDimensions.y);

        for (var i = 0; i < boardRows; i++) {
            var numPieces = 6 - Math.ceil(i / 3);
            this._blocksStack[i] = new PiecesBlock(numPieces, blockStartBox);
            blockStartBox.y += cellDimensions.y;
        }

        this._topBlockIndex = -1;
        this._activeBlockIndex = 0;
    }

    public get boardSize(): { columns: number; rows: number } {
        return this._boardSize;
    }

    public get boardDimensions(): createjs.Point {
        return this._boardDimensions;
    }

    public get activeBlock(): PiecesBlock {
        return this._blocksStack[this._activeBlockIndex];
    }

    public get blocks(): Array<PiecesBlock> {
        return this._blocksStack;
    }

    public resetBoard() {
        this._blocksStack.forEach(l => l.resetBlock());
        this._topBlockIndex = -1;
        this._activeBlockIndex = 0;
    }

    public moveActiveBlockBy(xOffset: number) {
        if (this._activeBlockIndex < this.blocks.length) {
            var activeBlock = this._blocksStack[this._activeBlockIndex];
            var blockBounds = activeBlock.bounds;
            var newXPos = this._movementDirection == MovementDirection.Left ? blockBounds.min - xOffset : blockBounds.min + xOffset;
            if (newXPos < 0) {
                this._movementDirection = MovementDirection.Right;
                newXPos = -newXPos;
            }
            else {
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
    }

    public stackActiveBlock(): { stacksUp: boolean; newActiveBlockIndex: number } {
        var activeBlock = this._blocksStack[this._activeBlockIndex];
        var topBlock = this._topBlockIndex >= 0 ? this._blocksStack[this._topBlockIndex] : null;
        var stacksUp = topBlock != null ? activeBlock.stacksWith(topBlock, this._cellDimensions.x / 2) : true;
        var newActiveBlockIndex = stacksUp ? this.nextBlock() : this._activeBlockIndex;
        return { stacksUp: stacksUp, newActiveBlockIndex: newActiveBlockIndex };
    }

    private nextBlock(): number {
        this._topBlockIndex = this._activeBlockIndex;
        this._activeBlockIndex++;
        //        this._blocksStack[this._activeBlockIndex].visible = true;
        this._movementDirection = MovementDirection.Left;
        return this._activeBlockIndex;
    }
}

class LocalPlayGameController implements IMenuEventSink {
    private _settings: GameSettings;
    private _display: GameDisplay;
    private _board: GameBoard;
    private _movementSpeed: number; // in pixel/frame
    private _stackBlock: boolean;
    private _gameCallbacks: IGameEventSink;

    constructor(settings: GameSettings, display: GameDisplay) {
        this._settings = settings;
        this._display = display;
        var cellDimensions = new createjs.Point(display.cellSize, display.cellSize);
        this._board = new GameBoard(cellDimensions, settings.boardColumns, settings.boardRows);
        this._movementSpeed = LocalPlayGameController.PixelSpeed(settings.gameSpeed, this._board.boardDimensions.x, settings.boardColumns, display.targetFrameRate);

        this.setupBoard();
    }

    private setupBoard() {
        var shapeTemplate = new PieceDisplayTemplate(this._display.cellSize, 6);
        this._board.blocks.forEach(block => {
            block.pieces.forEach(piece => {
                var shape = shapeTemplate.newPieceDisplay();
                piece.displayShape = <IDisplayElement>shape;
                this._display.boardDisplay.addChild(shape);
            });
        });
    }

    public set gameCallbacks(gameCallbacks: IGameEventSink) {
        this._gameCallbacks = gameCallbacks;
    }

    public gameStart() {
        this._display.boardDisplay.on("mousedown", this.stackBlock, this);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.setFPS(this._display.targetFrameRate);
        createjs.Ticker.on("tick", this.frameTick, this);
    }

    private stackBlock(evt: createjs.Event) {
        this._stackBlock = true;
    }

    private gamePause() {
        createjs.Ticker.setPaused(true);
    }

    private gameResume() {
        createjs.Ticker.setPaused(false);
    }

    private gameOver(text: string) {
        this._board.resetBoard();
        this._display.boardDisplay.removeAllEventListeners("mousedown");
        this._gameCallbacks.gameOver(text, this._board._topBlockIndex + 1);
    }

    private frameTick(evt: createjs.Event) {
        if (!evt.Paused) {
            if (!this._stackBlock) {
                this._board.moveActiveBlockBy(this._movementSpeed);
                this._display.update(evt);
            }
            else {
                this._stackBlock = false;
                var pile = this._board.stackActiveBlock();
                if (!pile.stacksUp) {
                    evt.remove();
                    this.gameOver("Game Over");
                }
                else if (pile.newActiveBlockIndex == this._settings.boardRows) {
                    evt.remove();
                    this.gameOver("You Win!");
                }
            }
        }
    }

    public static PixelSpeed(gameSpeed: number, boardWidth: number, boardColumns: number, frameRate: number): number {
        // columns / s * pixel / columns / frame * s = pixel/frame
        return gameSpeed * boardWidth / (boardColumns * frameRate);
    }
}

class GameSettings {
    public gameSpeed: number;
    public boardColumns: number;
    public boardRows: number;

    constructor(gameSpeed = 12, colums = 12, rows = 15) {
        this.gameSpeed = gameSpeed;
        this.boardColumns = colums;
        this.boardRows = rows;
    }
}

interface IMenuEventSink {
    gameStart();
}

interface IGameEventSink {
    gameOver(text: string, score: number);
}

class GameDisplay implements IGameEventSink {
    private canvas: HTMLCanvasElement;
    private stage: createjs.Stage;

    public boardDisplay: createjs.Container;
    private _titleDisplay: createjs.Container;
    private _menuDisplay: createjs.Container;

    private _menuCallbacks: IMenuEventSink;

    public cellSize: number;
    public targetFrameRate: number;
    private _frameCounter: number;
    private _frameRateDisplay: HTMLElement;

    constructor(canvasElementId: string, cellSize: number = 32, targetFrameRate: number = 60)
    {
        var canvas = <HTMLCanvasElement>document.getElementById(canvasElementId);
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
        boardBackground.cache(boardBackground.x, boardBackground.y, canvas.width, canvas.height)
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

    public set menuCallbacks(menuCallbacks: IMenuEventSink) {
        this._menuCallbacks = menuCallbacks;
    }

    public startPressed(evt: createjs.Event) {
        this.showMenu(false);
        this._menuCallbacks.gameStart();
    }

    public gameOver(text: string, score: number) {
        createjs.Ticker.addEventListener("tick", this.stage);
        var overlay = GameAdornments.BuildOverlay(this.canvas.width, this.canvas.height, text);
        var targetY = overlay.y;
        var overlayHeight = this.canvas.height - 2 * overlay.y;
        overlay.y = -overlayHeight;
        this.stage.addChild(overlay);
        createjs.Tween.get(overlay)
            .to({ y: targetY, rotation: 360 }, 500)
            .wait(500)
            .call((o: createjs.DisplayObject) => { this.stage.removeChild(o); this.showMenu(true); }, [overlay], this);
    }

    public update(evt: createjs.Event) {
        this.stage.update(evt);
        this._frameCounter++;
        if ((this._frameRateDisplay != null) && (this._frameCounter % this.targetFrameRate) == 0) {
            var actualFrameRate = Math.round(createjs.Ticker.getMeasuredFPS());
            if (actualFrameRate > 0) {
                this._frameRateDisplay.innerText = actualFrameRate + " fps";
            }
        }
    }

    public showMenu(doShow: boolean): void {
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
        }
        else {
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
    }
}

module GameAdornments {
    var titleFont: string = "bold 56px Comic Sans MS";
    var overlayFont: string = "bold 32px Comic Sans MS";
    var menuFont: string = "bold 32px Comic Sans MS";
    var fontColor: string = "orange";

    export function BuildBoardBackground(width: number, height: number): createjs.DisplayObject {
        var background = new createjs.Shape();
        background.graphics
            .beginLinearGradientFill(["#000000", "#ffffff"], [0, 1], 0, 0, 0, height)
            .drawRect(0, 0, width, height);
        return background;
    }

    export function BuildTitle(width: number, height: number): createjs.DisplayObject {
        var title = new createjs.Text();
        title.text = "/Shtacker\\";
        title.color = fontColor;
        title.font = titleFont;
        var textBox = title.getBounds();
        title.x = (width - textBox.width) / 2;
        title.y = 50;
        return title;
    }

    export function BuildMenu(width: number, height: number): createjs.DisplayObject {
        var menu = new createjs.Text();
        menu.text = "Play";
        menu.color = fontColor;
        menu.font = menuFont;
        var textBox = menu.getBounds();
        menu.x = (width - textBox.width) / 2;
        menu.y = (height - textBox.height) / 2;
        return menu;
    }

    export function BuildOverlay(width: number, height: number, text: string): createjs.DisplayObject {
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
}

class GameHost {
    public gameController: LocalPlayGameController;
    private _settings: GameSettings;
    private _display: GameDisplay;

    constructor(canvasElementId: string, settings: GameSettings = new GameSettings()) {
        this._settings = settings;
        this._display = new GameDisplay(canvasElementId);
        this.gameController = new LocalPlayGameController(this._settings, this._display);
        this.gameController.gameCallbacks = <IGameEventSink>this._display;
        this._display.menuCallbacks = <IMenuEventSink>this.gameController;
        this._display.showMenu(true);
    }
}

//class Game2 {
//    //Vars
//    timerToken: number;
//    private canvas: HTMLCanvasElement;
//    private stage: createjs.Stage;
//    private stageBg: createjs.Bitmap;
//    private menuContainer: createjs.Container;
//    private youLoseContainer: createjs.Container;
//    private youWinContainer: createjs.Container;


//    private titleFont: string = "bold 56px Comic Sans MS";
//    private menuFont: string = "bold 32px Comic Sans MS";
//    private fontColor: string = "orange";

//    private speed: number;
//    private circleRadius: number = 16;
//    private stageWidth: number = 400;
//    private stageHeight: number = 600;


//    private rows: Array<Array<createjs.Shape>>;
//    private currentRow: number;

//    private circle1: createjs.Shape;
//    private circle2: createjs.Shape;
//    private circle3: createjs.Shape;

//    private circle11: createjs.Shape;
//    private circle12: createjs.Shape;
//    private circle13: createjs.Shape;

//    private circle21: createjs.Shape;
//    private circle22: createjs.Shape;
//    private circle23: createjs.Shape;

//    private circle31: createjs.Shape;
//    private circle32: createjs.Shape;
//    private circle33: createjs.Shape;

//    private circle41: createjs.Shape;
//    private circle42: createjs.Shape;
//    private circle43: createjs.Shape;

//    private circle51: createjs.Shape;
//    private circle52: createjs.Shape;

//    private circle61: createjs.Shape;
//    private circle62: createjs.Shape;

//    private circle71: createjs.Shape;
//    private circle72: createjs.Shape;

//    private circle81: createjs.Shape;
//    private circle82: createjs.Shape;

//    private circle91: createjs.Shape;
//    private circle92: createjs.Shape;

//    private circle101: createjs.Shape;
//    private circle102: createjs.Shape;

//    private circle111: createjs.Shape;

//    private circle121: createjs.Shape;

//    private circle131: createjs.Shape;

//    private circle141: createjs.Shape;

//    private gameOver: boolean;
//    private direction: string;
//    private clicked: boolean;
//    private previousRowRange: Array<number>;
//    constructor() {
//        this.canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
//        this.stage = new createjs.Stage(this.canvas);
//        this.initiate();
//    }

//    initiate() {   
//        createjs.Ticker.setFPS(30);
//        createjs.Ticker.addListener(this.stage, false);

//        //Can't get this working, what's up with this?
//        //this.stageBg = new createjs.Bitmap("assets/Images/gameBg.png");
//        //this.stage.addChild(this.stageBg);
//        var gradient = new createjs.Shape();
//        gradient.graphics.beginLinearGradientFill(["#000", "#141654"], [0, 1], 0, 0, this.stageWidth, this.stageHeight).drawRect(0, 0, this.stageWidth, this.stageHeight);
//        gradient.graphics.endFill();
//        this.stage.addChild(gradient);

//        this.menuContainer = new createjs.Container();

//        var title: createjs.Text = new createjs.Text();
//        title.text = "Shtacker";
//        title.color = this.fontColor;
//        title.font = this.titleFont;
//        title.x = 85;
//        title.y = 100;
//        this.menuContainer.addChild(title);

//        var menu1: createjs.Text = new createjs.Text();
//        menu1.text = "Play";
//        menu1.color = this.fontColor;
//        menu1.font = this.menuFont;
//        menu1.x = 170;
//        menu1.y = 240;
//        menu1.onPress = () => { this.startPlay() };
//        this.menuContainer.addChild(menu1);

//        this.menuContainer.x = 600;           
//        this.stage.addChild(this.menuContainer);
//        this.showMenu();

//        this.youLoseContainer = new createjs.Container();
//        var title: createjs.Text = new createjs.Text();
//        title.text = "You Lose!";
//        title.color = this.fontColor;
//        title.font = this.titleFont;
//        title.x = 65;
//        title.y = 100;
//        this.youLoseContainer.addChild(title);
//        this.youLoseContainer.x = 600;
//        this.stage.addChild(this.youLoseContainer);

//        this.youWinContainer = new createjs.Container();
//        var title: createjs.Text = new createjs.Text();
//        title.text = "You Win!";
//        title.color = this.fontColor;
//        title.font = this.titleFont;
//        title.x = 65;
//        title.y = 100;
//        this.youWinContainer.addChild(title);
//        this.youWinContainer.x = 600;
//        this.stage.addChild(this.youWinContainer);

//    }

//    private startPlay(): void {
//        this.reset();
//        this.stage.onPress = () => { this.clicked = true; };
//        createjs.Ticker.addListener(this);
//    }

//    private registerClick() {
//        this.clicked = true;
//    }

//    private tick() {
//        if (this.currentRow < 15) {
//            if (!this.clicked) {
//                if (this.direction == "back") {
//                    if (this.rows[this.currentRow][0].x > 19) {
//                        for (var i: number = 0; i < this.rows[this.currentRow].length; i++) {
//                            this.rows[this.currentRow][i].x -= this.speed;
//                        }
//                    }
//                    else {//Change Direction
//                        for (var i: number = 0; i < this.rows[this.currentRow].length; i++) {
//                            this.rows[this.currentRow][i].x += this.speed;
//                        }
//                        this.direction = "foward";
//                    }
//                }
//                else { //Foward
//                    if (this.rows[this.currentRow][this.rows[this.currentRow].length - 1].x < 381) {
//                        for (var i: number = 0; i < this.rows[this.currentRow].length; i++) {
//                            this.rows[this.currentRow][i].x += this.speed;
//                        }
//                    }
//                    else {//Change Direction
//                        for (var i: number = 0; i < this.rows[this.currentRow].length; i++) {
//                            this.rows[this.currentRow][i].x -= this.speed;
//                        }
//                        this.direction = "back";
//                    }
//                }
//            }
//            else { //Clicked
//                this.clicked = false;
//                this.dropCircles();
//                if (this.rows[this.currentRow].length == 0) {
//                    //You lose
//                    this.youLose();
//                }
//                else {
//                    this.previousRowRange = [this.rows[this.currentRow][0].x, this.rows[this.currentRow][(this.rows[this.currentRow].length - 1)].x];
//                    this.currentRow++;
//                }
//            }

//            if (this.currentRow > 3) {//Speed up
//                this.speed = this.currentRow / 3;
//            }
//        }
//        else {
//            this.youWin();
//        }

//    }

//    dropCircles() {
//        var newCurrent = [];
//        for (var i: number = 0; i < this.rows[this.currentRow].length; i++) {
//            var xPos = this.rows[this.currentRow][i].x;
//            if (xPos < this.previousRowRange[0] - 20) {
//                createjs.Tween.get(this.rows[this.currentRow][i]).to({ y: 900 }, 1200);
//            }
//            else if (xPos > this.previousRowRange[1] + 20) {
//                createjs.Tween.get(this.rows[this.currentRow][i]).to({ y: 900 }, 1200);
//            }
//            else {
//                newCurrent[newCurrent.length] = this.rows[this.currentRow][i]
//            }
//        }
//        this.rows[this.currentRow] = newCurrent;
//    }

//    removeMenu(): void {
//        createjs.Tween.get(this.menuContainer).to({ x: 500 }, 500);
//    }

//    showMenu(): void {
//        createjs.Tween.get(this.menuContainer).to({ x: 0 }, 500);
//    }


//    getCircle(xCentre: number, yCentre: number): createjs.Shape {
//        var circle = new createjs.Shape();
//        circle.graphics.setStrokeStyle(6);
//        circle.graphics.beginLinearGradientStroke(["#FFCC00", "#FFCC66"], [0, 1], 0, 0, 0, 10).drawCircle(0, 0, this.circleRadius);
//        circle.alpha = 0.8;
//        circle.x = xCentre;
//        circle.y = yCentre;
//        return circle;
//    }

//    youLose() {
//        createjs.Ticker.removeListener(this);
//        this.stage.onPress = null;
//        createjs.Tween.get(this.youLoseContainer)
//            .to({ x: 0 }, 500)
//            .wait(3000)
//            .to({ x: 500 }, 500)
//            .call(this.initiate, null, this);
//    }
//    youWin() {
//        createjs.Ticker.removeListener(this);
//        this.stage.onPress = null;
//        createjs.Tween.get(this.youWinContainer)
//            .to({ x: 0 }, 500)
//            .wait(3000)
//            .to({ x: 500 }, 500)
//            .call(this.initiate, null, this);
//    }
//    reset() {
//        this.removeMenu();
//        this.circle1 = this.getCircle(440, 581);
//        this.circle2 = this.getCircle(478, 581);
//        this.circle3 = this.getCircle(516, 581);
//        this.stage.addChild(this.circle1);
//        this.stage.addChild(this.circle2);
//        this.stage.addChild(this.circle3);

//        this.circle11 = this.getCircle(440, 543);
//        this.circle12 = this.getCircle(478, 543);
//        this.circle13 = this.getCircle(516, 543);
//        this.stage.addChild(this.circle11);
//        this.stage.addChild(this.circle12);
//        this.stage.addChild(this.circle13);

//        this.circle21 = this.getCircle(440, 505);
//        this.circle22 = this.getCircle(478, 505);
//        this.circle23 = this.getCircle(516, 505);
//        this.stage.addChild(this.circle21);
//        this.stage.addChild(this.circle22);
//        this.stage.addChild(this.circle23);


//        this.circle31 = this.getCircle(440, 468);
//        this.circle32 = this.getCircle(479, 468);
//        this.circle33 = this.getCircle(516, 468);
//        this.stage.addChild(this.circle31);
//        this.stage.addChild(this.circle32);
//        this.stage.addChild(this.circle33);


//        this.circle41 = this.getCircle(440, 430);
//        this.circle42 = this.getCircle(478, 430);
//        this.circle43 = this.getCircle(516, 430);
//        this.stage.addChild(this.circle41);
//        this.stage.addChild(this.circle42);
//        this.stage.addChild(this.circle43);

//        this.circle51 = this.getCircle(440, 392);
//        this.circle52 = this.getCircle(479, 392);
//        this.stage.addChild(this.circle51);
//        this.stage.addChild(this.circle52);

//        this.circle61 = this.getCircle(440, 354);
//        this.circle62 = this.getCircle(479, 354);
//        this.stage.addChild(this.circle61);
//        this.stage.addChild(this.circle62);

//        this.circle71 = this.getCircle(440, 316);
//        this.circle72 = this.getCircle(479, 316);
//        this.stage.addChild(this.circle71);
//        this.stage.addChild(this.circle72);

//        this.circle81 = this.getCircle(440, 278);
//        this.circle82 = this.getCircle(479, 278);
//        this.stage.addChild(this.circle81);
//        this.stage.addChild(this.circle82);

//        this.circle91 = this.getCircle(440, 240);
//        this.circle92 = this.getCircle(479, 240);
//        this.stage.addChild(this.circle91);
//        this.stage.addChild(this.circle92);

//        this.circle101 = this.getCircle(440, 202);
//        this.circle102 = this.getCircle(479, 202);
//        this.stage.addChild(this.circle101);
//        this.stage.addChild(this.circle102);

//        this.circle111 = this.getCircle(440, 164);
//        this.stage.addChild(this.circle111);

//        this.circle121 = this.getCircle(440, 126);
//        this.stage.addChild(this.circle121);

//        this.circle131 = this.getCircle(440, 88);
//        this.stage.addChild(this.circle131);

//        this.circle141 = this.getCircle(440, 50);
//        this.stage.addChild(this.circle141);

//        //matrix of circles and columns
//        this.rows = [];
//        this.rows.push([this.circle1, this.circle2, this.circle3]);
//        this.rows.push([this.circle11, this.circle12, this.circle13]);
//        this.rows.push([this.circle21, this.circle22, this.circle23]);
//        this.rows.push([this.circle31, this.circle32, this.circle33]);
//        this.rows.push([this.circle41, this.circle42, this.circle43]);
//        this.rows.push([this.circle51, this.circle52]);
//        this.rows.push([this.circle61, this.circle62]);
//        this.rows.push([this.circle71, this.circle72]);
//        this.rows.push([this.circle81, this.circle82]);
//        this.rows.push([this.circle91, this.circle92]);
//        this.rows.push([this.circle101, this.circle102]);
//        this.rows.push([this.circle111]);
//        this.rows.push([this.circle121]);
//        this.rows.push([this.circle131]);
//        this.rows.push([this.circle141]);

//        this.previousRowRange = [0, this.stageWidth];

//        this.currentRow = 0;

//        this.direction = "back";
//        this.speed = 1;
//        this.clicked = false;
//        this.stage.update();
//    }
//}

//window.onload = () => {
//    gameHost = new GameHost("gameCanvas");
//    gameController = gameHost.gameController;
//};