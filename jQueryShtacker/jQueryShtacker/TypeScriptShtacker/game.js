/// <reference path="definitions/createjs/tweenjs/Tween.d.ts"/>
/// <reference path="definitions/createjs/preloadjs/PreloadJS.d.ts"/>
/// <reference path="definitions/createjs/easeljs/geom/Point.d.ts"/>
/// <reference path="definitions/createjs/easeljs/utils/Ticker.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Container.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Stage.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Shape.d.ts"/>
/// <reference path="definitions/createjs/easeljs/display/Bitmap.d.ts"/>
var _this = this;
var Game = (function () {
    function Game() {
        this.titleFont = "bold 56px Comic Sans MS";
        this.menuFont = "bold 32px Comic Sans MS";
        this.fontColor = "orange";
        this.circleRadius = 16;
        this.stageWidth = 400;
        this.stageHeight = 600;
        this.canvas = document.getElementById('gameCanvas');
        this.stage = new createjs.Stage(this.canvas);
        this.initiate();
    }
    Game.prototype.initiate = function () {
        var _this = this;
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

        var title = new createjs.Text();
        title.text = "Shtacker";
        title.color = this.fontColor;
        title.font = this.titleFont;
        title.x = 85;
        title.y = 100;
        this.menuContainer.addChild(title);

        var menu1 = new createjs.Text();
        menu1.text = "Play";
        menu1.color = this.fontColor;
        menu1.font = this.menuFont;
        menu1.x = 170;
        menu1.y = 240;
        menu1.onPress = function () {
            _this.startPlay();
        };
        this.menuContainer.addChild(menu1);

        this.menuContainer.x = 600;
        this.stage.addChild(this.menuContainer);
        this.showMenu();

        this.youLoseContainer = new createjs.Container();
        var title = new createjs.Text();
        title.text = "You Lose!";
        title.color = this.fontColor;
        title.font = this.titleFont;
        title.x = 65;
        title.y = 100;
        this.youLoseContainer.addChild(title);
        this.youLoseContainer.x = 600;
        this.stage.addChild(this.youLoseContainer);

        this.youWinContainer = new createjs.Container();
        var title = new createjs.Text();
        title.text = "You Win!";
        title.color = this.fontColor;
        title.font = this.titleFont;
        title.x = 65;
        title.y = 100;
        this.youWinContainer.addChild(title);
        this.youWinContainer.x = 600;
        this.stage.addChild(this.youWinContainer);
    };

    Game.prototype.startPlay = function () {
        var _this = this;
        this.reset();
        this.stage.onPress = function () {
            _this.clicked = true;
        };
        createjs.Ticker.addListener(this);
    };

    Game.prototype.registerClick = function () {
        this.clicked = true;
    };

    Game.prototype.tick = function () {
        if (this.currentRow < 15) {
            if (!this.clicked) {
                if (this.direction == "back") {
                    if (this.rows[this.currentRow][0].x > 19) {
                        for (var i = 0; i < this.rows[this.currentRow].length; i++) {
                            this.rows[this.currentRow][i].x -= this.speed;
                        }
                    } else {
                        for (var i = 0; i < this.rows[this.currentRow].length; i++) {
                            this.rows[this.currentRow][i].x += this.speed;
                        }
                        this.direction = "foward";
                    }
                } else {
                    if (this.rows[this.currentRow][this.rows[this.currentRow].length - 1].x < 381) {
                        for (var i = 0; i < this.rows[this.currentRow].length; i++) {
                            this.rows[this.currentRow][i].x += this.speed;
                        }
                    } else {
                        for (var i = 0; i < this.rows[this.currentRow].length; i++) {
                            this.rows[this.currentRow][i].x -= this.speed;
                        }
                        this.direction = "back";
                    }
                }
            } else {
                this.clicked = false;
                this.dropCircles();
                if (this.rows[this.currentRow].length == 0) {
                    //You lose
                    this.youLose();
                } else {
                    this.previousRowRange = [this.rows[this.currentRow][0].x, this.rows[this.currentRow][(this.rows[this.currentRow].length - 1)].x];
                    this.currentRow++;
                }
            }

            if (this.currentRow > 3) {
                this.speed = this.currentRow / 3;
            }
        } else {
            this.youWin();
        }
    };

    Game.prototype.dropCircles = function () {
        var newCurrent = [];
        for (var i = 0; i < this.rows[this.currentRow].length; i++) {
            var xPos = this.rows[this.currentRow][i].x;
            if (xPos < this.previousRowRange[0] - 20) {
                createjs.Tween.get(this.rows[this.currentRow][i]).to({ y: 900 }, 1200);
            } else if (xPos > this.previousRowRange[1] + 20) {
                createjs.Tween.get(this.rows[this.currentRow][i]).to({ y: 900 }, 1200);
            } else {
                newCurrent[newCurrent.length] = this.rows[this.currentRow][i];
            }
        }
        this.rows[this.currentRow] = newCurrent;
    };

    Game.prototype.removeMenu = function () {
        createjs.Tween.get(this.menuContainer).to({ x: 500 }, 500);
    };

    Game.prototype.showMenu = function () {
        createjs.Tween.get(this.menuContainer).to({ x: 0 }, 500);
    };

    Game.prototype.getCircle = function (xCentre, yCentre) {
        var circle = new createjs.Shape();
        circle.graphics.setStrokeStyle(6);
        circle.graphics.beginLinearGradientStroke(["#FFCC00", "#FFCC66"], [0, 1], 0, 0, 0, 10).drawCircle(0, 0, this.circleRadius);
        circle.alpha = 0.8;
        circle.x = xCentre;
        circle.y = yCentre;
        return circle;
    };

    Game.prototype.youLose = function () {
        createjs.Ticker.removeListener(this);
        this.stage.onPress = null;
        createjs.Tween.get(this.youLoseContainer).to({ x: 0 }, 500).wait(3000).to({ x: 500 }, 500).call(this.initiate, null, this);
    };
    Game.prototype.youWin = function () {
        createjs.Ticker.removeListener(this);
        this.stage.onPress = null;
        createjs.Tween.get(this.youWinContainer).to({ x: 0 }, 500).wait(3000).to({ x: 500 }, 500).call(this.initiate, null, this);
    };
    Game.prototype.reset = function () {
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
    };
    return Game;
})();

window.onload = function () {
    var game = new _this.Game();
};
