/// <reference path="definitions/createjs/tweenjs/Tween.d.ts"/>
/// <reference path="definitions/createjs/preloadjs/PreloadJS.d.ts"/>
/// <reference path="definitions/createjs/easeljs/geom/Point.d.ts"/>
/// <reference path="definitions/createjs/easeljs/utils/Ticker.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Container.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Stage.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Shape.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Bitmap.d.ts"/>

class Game {
    //Vars
    timerToken: number;
    private canvas: HTMLCanvasElement;
    private stage: createjs.Stage;
    private stageBg: createjs.Bitmap;
    private menuContainer: createjs.Container;
    private youLoseContainer: createjs.Container;
    private youWinContainer: createjs.Container;


    private titleFont: string = "bold 56px Comic Sans MS";
    private menuFont: string = "bold 32px Comic Sans MS";
    private fontColor: string = "orange";

    private speed: number;
    private circleRadius: number = 16;
    private stageWidth: number = 400;
    private stageHeight: number = 600;


    private rows: Array<Array<createjs.Shape>>;
    private currentRow: number;

    private circle1: createjs.Shape;
    private circle2: createjs.Shape;
    private circle3: createjs.Shape;

    private circle11: createjs.Shape;
    private circle12: createjs.Shape;
    private circle13: createjs.Shape;

    private circle21: createjs.Shape;
    private circle22: createjs.Shape;
    private circle23: createjs.Shape;

    private circle31: createjs.Shape;
    private circle32: createjs.Shape;
    private circle33: createjs.Shape;

    private circle41: createjs.Shape;
    private circle42: createjs.Shape;
    private circle43: createjs.Shape;

    private circle51: createjs.Shape;
    private circle52: createjs.Shape;

    private circle61: createjs.Shape;
    private circle62: createjs.Shape;

    private circle71: createjs.Shape;
    private circle72: createjs.Shape;

    private circle81: createjs.Shape;
    private circle82: createjs.Shape;

    private circle91: createjs.Shape;
    private circle92: createjs.Shape;

    private circle101: createjs.Shape;
    private circle102: createjs.Shape;

    private circle111: createjs.Shape;

    private circle121: createjs.Shape;

    private circle131: createjs.Shape;

    private circle141: createjs.Shape;

    private gameOver: boolean;
    private direction: string;
    private clicked: boolean;
    private previousRowRange: Array<number>;
    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
        this.stage = new createjs.Stage(this.canvas);
        this.initiate();
    }

    initiate() {   
        createjs.Ticker.setFPS(1000);
        createjs.Ticker.addListener(this.stage, false);

        //Can't get this working, what's up with this?
        //this.stageBg = new createjs.Bitmap("assets/Images/gameBg.png");
        //this.stage.addChild(this.stageBg);
        var gradient = new createjs.Shape();
        gradient.graphics.beginLinearGradientFill(["#000", "#141654"], [0, 1], 0, 0, this.stageWidth, this.stageHeight).drawRect(0, 0, this.stageWidth, this.stageHeight);
        gradient.graphics.endFill();
        this.stage.addChild(gradient);

        this.menuContainer = new createjs.Container();

        var title: createjs.Text = new createjs.Text();
        title.text = "Shtacker";
        title.color = this.fontColor;
        title.font = this.titleFont;
        title.x = 85;
        title.y = 100;
        this.menuContainer.addChild(title);

        var menu1: createjs.Text = new createjs.Text();
        menu1.text = "Play";
        menu1.color = this.fontColor;
        menu1.font = this.menuFont;
        menu1.x = 170;
        menu1.y = 240;
        menu1.onPress = () => { this.startPlay() };
        this.menuContainer.addChild(menu1);

        this.menuContainer.x = 600;           
        this.stage.addChild(this.menuContainer);
        this.showMenu();

        this.youLoseContainer = new createjs.Container();
        var title: createjs.Text = new createjs.Text();
        title.text = "You Lose!";
        title.color = this.fontColor;
        title.font = this.titleFont;
        title.x = 65;
        title.y = 100;
        this.youLoseContainer.addChild(title);
        this.youLoseContainer.x = 600;
        this.stage.addChild(this.youLoseContainer);

        this.youWinContainer = new createjs.Container();
        var title: createjs.Text = new createjs.Text();
        title.text = "You Win!";
        title.color = this.fontColor;
        title.font = this.titleFont;
        title.x = 65;
        title.y = 100;
        this.youWinContainer.addChild(title);
        this.youWinContainer.x = 600;
        this.stage.addChild(this.youWinContainer);

    }

    private startPlay(): void {
        this.reset();
        this.stage.onPress = () => { this.clicked = true; };
        createjs.Ticker.addListener(this);
    }

    private registerClick() {
        this.clicked = true;
    }

    private tick() {
        if (this.currentRow < 15) {
            if (!this.clicked) {
                if (this.direction == "back") {
                    if (this.rows[this.currentRow][0].x > 19) {
                        for (var i: number = 0; i < this.rows[this.currentRow].length; i++) {
                            this.rows[this.currentRow][i].x -= this.speed;
                        }
                    }
                    else {//Change Direction
                        for (var i: number = 0; i < this.rows[this.currentRow].length; i++) {
                            this.rows[this.currentRow][i].x += this.speed;
                        }
                        this.direction = "foward";
                    }
                }
                else { //Foward
                    if (this.rows[this.currentRow][this.rows[this.currentRow].length - 1].x < 381) {
                        for (var i: number = 0; i < this.rows[this.currentRow].length; i++) {
                            this.rows[this.currentRow][i].x += this.speed;
                        }
                    }
                    else {//Change Direction
                        for (var i: number = 0; i < this.rows[this.currentRow].length; i++) {
                            this.rows[this.currentRow][i].x -= this.speed;
                        }
                        this.direction = "back";
                    }
                }
            }
            else { //Clicked
                this.clicked = false;
                this.dropCircles();
                if (this.rows[this.currentRow].length == 0) {
                    //You lose
                    this.youLose();
                }
                else {
                    this.previousRowRange = [this.rows[this.currentRow][0].x, this.rows[this.currentRow][(this.rows[this.currentRow].length - 1)].x];
                    this.currentRow++;
                }
            }

            if (this.currentRow > 3) {//Speed up
                this.speed = this.currentRow / 3;
            }
        }
        else {
            this.youWin();
        }

    }

    dropCircles() {
        var newCurrent = [];
        for (var i: number = 0; i < this.rows[this.currentRow].length; i++) {
            var xPos = this.rows[this.currentRow][i].x;
            if (xPos < this.previousRowRange[0] - 20) {
                createjs.Tween.get(this.rows[this.currentRow][i]).to({ y: 900 }, 1200);
            }
            else if (xPos > this.previousRowRange[1] + 20) {
                createjs.Tween.get(this.rows[this.currentRow][i]).to({ y: 900 }, 1200);
            }
            else {
                newCurrent[newCurrent.length] = this.rows[this.currentRow][i]
            }
        }
        this.rows[this.currentRow] = newCurrent;
    }

    removeMenu(): void {
        createjs.Tween.get(this.menuContainer).to({ x: 500 }, 500);
    }

    showMenu(): void {
        createjs.Tween.get(this.menuContainer).to({ x: 0 }, 500);
    }


    getCircle(xCentre: number, yCentre: number): createjs.Shape {
        var circle = new createjs.Shape();
        circle.graphics.setStrokeStyle(6);
        circle.graphics.beginLinearGradientStroke(["#FFCC00", "#FFCC66"], [0, 1], 0, 0, 0, 10).drawCircle(0, 0, this.circleRadius);
        circle.alpha = 0.8;
        circle.x = xCentre;
        circle.y = yCentre;
        return circle;
    }

    youLose() {
        createjs.Ticker.removeListener(this);
        this.stage.onPress = null;
        createjs.Tween.get(this.youLoseContainer)
            .to({ x: 0 }, 500)
            .wait(3000)
            .to({ x: 500 }, 500)
            .call(this.initiate, null, this);
    }
    youWin() {
        createjs.Ticker.removeListener(this);
        this.stage.onPress = null;
        createjs.Tween.get(this.youWinContainer)
            .to({ x: 0 }, 500)
            .wait(3000)
            .to({ x: 500 }, 500)
            .call(this.initiate, null, this);
    }
    reset() {
        this.removeMenu();
        this.circle1 = this.getCircle(440, 581);
        this.circle2 = this.getCircle(478, 581);
        this.circle3 = this.getCircle(516, 581);
        this.stage.addChild(this.circle1);
        this.stage.addChild(this.circle2);
        this.stage.addChild(this.circle3);

        this.circle11 = this.getCircle(440, 543);
        this.circle12 = this.getCircle(478, 543);
        this.circle13 = this.getCircle(516, 543);
        this.stage.addChild(this.circle11);
        this.stage.addChild(this.circle12);
        this.stage.addChild(this.circle13);

        this.circle21 = this.getCircle(440, 505);
        this.circle22 = this.getCircle(478, 505);
        this.circle23 = this.getCircle(516, 505);
        this.stage.addChild(this.circle21);
        this.stage.addChild(this.circle22);
        this.stage.addChild(this.circle23);


        this.circle31 = this.getCircle(440, 468);
        this.circle32 = this.getCircle(479, 468);
        this.circle33 = this.getCircle(516, 468);
        this.stage.addChild(this.circle31);
        this.stage.addChild(this.circle32);
        this.stage.addChild(this.circle33);


        this.circle41 = this.getCircle(440, 430);
        this.circle42 = this.getCircle(478, 430);
        this.circle43 = this.getCircle(516, 430);
        this.stage.addChild(this.circle41);
        this.stage.addChild(this.circle42);
        this.stage.addChild(this.circle43);

        this.circle51 = this.getCircle(440, 392);
        this.circle52 = this.getCircle(479, 392);
        this.stage.addChild(this.circle51);
        this.stage.addChild(this.circle52);

        this.circle61 = this.getCircle(440, 354);
        this.circle62 = this.getCircle(479, 354);
        this.stage.addChild(this.circle61);
        this.stage.addChild(this.circle62);

        this.circle71 = this.getCircle(440, 316);
        this.circle72 = this.getCircle(479, 316);
        this.stage.addChild(this.circle71);
        this.stage.addChild(this.circle72);

        this.circle81 = this.getCircle(440, 278);
        this.circle82 = this.getCircle(479, 278);
        this.stage.addChild(this.circle81);
        this.stage.addChild(this.circle82);

        this.circle91 = this.getCircle(440, 240);
        this.circle92 = this.getCircle(479, 240);
        this.stage.addChild(this.circle91);
        this.stage.addChild(this.circle92);

        this.circle101 = this.getCircle(440, 202);
        this.circle102 = this.getCircle(479, 202);
        this.stage.addChild(this.circle101);
        this.stage.addChild(this.circle102);

        this.circle111 = this.getCircle(440, 164);
        this.stage.addChild(this.circle111);

        this.circle121 = this.getCircle(440, 126);
        this.stage.addChild(this.circle121);

        this.circle131 = this.getCircle(440, 88);
        this.stage.addChild(this.circle131);

        this.circle141 = this.getCircle(440, 50);
        this.stage.addChild(this.circle141);

        //matrix of circles and columns
        this.rows = [];
        this.rows.push([this.circle1, this.circle2, this.circle3]);
        this.rows.push([this.circle11, this.circle12, this.circle13]);
        this.rows.push([this.circle21, this.circle22, this.circle23]);
        this.rows.push([this.circle31, this.circle32, this.circle33]);
        this.rows.push([this.circle41, this.circle42, this.circle43]);
        this.rows.push([this.circle51, this.circle52]);
        this.rows.push([this.circle61, this.circle62]);
        this.rows.push([this.circle71, this.circle72]);
        this.rows.push([this.circle81, this.circle82]);
        this.rows.push([this.circle91, this.circle92]);
        this.rows.push([this.circle101, this.circle102]);
        this.rows.push([this.circle111]);
        this.rows.push([this.circle121]);
        this.rows.push([this.circle131]);
        this.rows.push([this.circle141]);

        this.previousRowRange = [0, this.stageWidth];

        this.currentRow = 0;

        this.direction = "back";
        this.speed = 1;
        this.clicked = false;
        this.stage.update();
    }
}


window.onload = () => {
    var game = new this.Game();
};