class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;
    canvas: HTMLCanvasElement;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();

        this.canvas = document.createElement('canvas');
        this.element.appendChild(this.canvas);

        this.canvas.height = 1000;
        this.canvas.width = 600;
        this.canvas.innerHTML = "<h1>Hallow World</h1>";
        var cvx = this.canvas.getContext("2d");

        cvx.fillStyle = "rgd(200,0,0)";
        cvx.fillRect(10, 10, 55, 50);
        
        cvx.fillStyle = "rgba(0, 0, 200, 0.5)";
        cvx.fillRect(30, 30, 55, 50);

        //cvx.
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};