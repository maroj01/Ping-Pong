
//Modelo // función anonima, que se va aejecutar a si misma
(function(){
    // recibe los parametros del constructor 
self.Board = function(width,height){
    this.width = width;
    this.height = height;
    this.playing = false;
    this.game_over = false;
    this.bars = [];
    this.ball = null;
    //this.playing = false;
}

self.Board.prototype = {
    get elements(){
        var elements = this.bars.map(function(bar){ return bar; });
        elements.push(this.ball);
        return elements;
    }
}
})();

//Función  pelota
(function(){
self.Ball = function(x,y,radius,board){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed_y = 0;
    this.speed_x = 3;
    this.board = board;
    this.direction = -1;
    this.bounce_angle = 0;
    this.max_bounce_angle = Math.PI / 12;
    this.speed = 3;

    board.ball = this;
    this.kind = "circle";	
}

    //Método para mover la pelota
self.Ball.prototype = {
    move: function(){
        this.x += (this.speed_x * this.direction);
        this.y += (this.speed_y);
    },
    get width(){
        return this.radius * 2;
    },
    get height(){
        return this.radius * 2;
    },

            // Función que reacciona a la colisión de la barra que recibe como parametro
    collision: function(bar){

        //Reacciona a la colisión con una barra que recibe como parámetro
        var relative_intersect_y = ( bar.y + (bar.height / 2) ) - this.y;

        var normalized_intersect_y = relative_intersect_y / (bar.height / 2);

        this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;
        console.log(this.bounce_angle);
        this.speed_y = this.speed * -Math.sin(this.bounce_angle);
        this.speed_x = this.speed * Math.cos(this.bounce_angle);

        if(this.x > (this.board.width / 2)) this.direction = -1;
        else this.direction = 1;
    }
}
})();
(function(){
    // Dibujar las barras
self.Bar = function(x,y,width,height,board){
    this.x = x;// cordenadas
    this.y = y;
    this.width = width;
    this.height = height;
    this.board = board;
    this.board.bars.push(this);
    this.kind = "rectangle";
    this.speed = 5; // incrementa o decrementa la velocidad
}

    //Mover las barras    
self.Bar.prototype = {
    down: function(){
        this.y += this.speed;
    },
    up: function(){
        this.y -= this.speed;
    },
    toString: function(){
        return "x: "+ this.x +" y: "+ this.y ;
    }
}
})();

//Vista // canvas para dibujar los elementos
(function(){
self.BoardView = function(canvas,board){

    this.canvas = canvas;
    this.canvas.width = board.width;
    this.canvas.height = board.height;
    this.board = board;
    this.contexto = canvas.getContext("2d");
}

self.BoardView.prototype = {
    clean: function(){
        this.contexto.clearRect(0,0,this.board.width,this.board.height);
    },
    draw: function(){

        for (var i = this.board.elements.length - 1; i >= 0; i--) {
            var el = this.board.elements[i];

            draw(this.contexto,el);
        };
    },

            //Función para revizar colisiones
    check_collisions: function(){

        for (var i = this.board.bars.length - 1; i >= 0; i--) {
            var bar = this.board.bars[i];
            if(hit(bar, this.board.ball)){

                this.board.ball.collision(bar);
            }
        };
    },
        //Méto que ejecuta para dibujar y limpiar
    play: function(){
        if(this.board.playing){
            this.clean();
            this.draw();
            this.check_collisions();
            this.board.ball.move();	
        }
        
    }
}

    //Función para revisar colisiones entre las barras
function hit(a,b){
    //Revisa si a colisiona con b
    var hit = false;
    //Colsiones horizontales
    if(b.x + b.width >= a.x && b.x < a.x + a.width)
    {
        //Colisiones verticales
        if(b.y + b.height >= a.y && b.y < a.y + a.height)
            hit = true;
    }
    //Colisión de a con b
    if(b.x <= a.x && b.x + b.width >= a.x + a.width)
    {
        if(b.y <= a.y && b.y + b.height >= a.y + a.height)
            hit = true;
    }
    //Colisión b con a
    if(a.x <= b.x && a.x + a.width >= b.x + b.width)
    {
        if(a.y <= b.y && a.y + a.height >= b.y + b.height)
            hit = true;
    }
    
    return hit;
}

    // dibujar los diferentes elementos
function draw(contexto,element){ // draw dibuja los diferentes elementos
    
    switch(element.kind){
        case "rectangle":
            contexto.fillRect(element.x,element.y,element.width,element.height);
            break;
        case "circle": 
        contexto.beginPath();
        contexto.arc(element.x,element.y,element.radius,0,7);
        contexto.fill();
        contexto.closePath();
            break;
    }	   
    
}
})();

var board = new Board(800,400);
var bar = new Bar(20,150,40,150,board);
var bar_2 = new Bar(735,150,40,150,board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas,board);
var ball = new Ball(370, 200, 10,board);

//Método que captura cuando el evento ocurre (mover las barras)
document.addEventListener("keydown",function(ev){

if(ev.keyCode == 38){
    ev.preventDefault();
    bar.up();
}
else if(ev.keyCode == 40){
    ev.preventDefault();
    bar.down();
}else if(ev.keyCode === 87){
    ev.preventDefault();    
    bar_2.up();
}else if(ev.keyCode === 83){
    ev.preventDefault();
    
    bar_2.down();
}else if(ev.keyCode === 32){
    ev.preventDefault();
    board.playing = !board.playing;
}

console.log(ev.keyCode);
});

board_view.draw();
//Método que va actualizando el programa
window.requestAnimationFrame(controller);

// función que ejecuta todos los elementos
function controller(){
board_view.play();
requestAnimationFrame(controller);
}