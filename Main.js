
//Modelo // función anonima, que se va aejecutar a si misma
(function(){ 
// recibe los parametros del constructor
self.Board = function(width,height){ 
this.width= width;
this.height = height;
this.playing= false;
this.game_over = false;
this.bars = [];
this.ball= null;
}

self.Board.prototype = {
    get elements(){
        var elements = this.bars.map(function(bar){ return bar; });;
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
		}



	}
})();


// Dibujar las barras
(function(){
   self.Bar = function(x,y,width,height,board){
   this.x = x; // cordenadas
   this.y = y;
   this.width = width;
   this.height = height;
   this.board = board;
   this.board.bars.push(this);
   this.kind = "rectangle";
   this.speed = 10; // incrementa o decrementa la velocidad
}

//Mover las barras
self.Bar.prototype = {
down: function(){
    this.y += this.speed;
},
up: function(){
this.y -= this.speed;
},
 // Función que imprime en que cordenadas se encuentra
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
		this.contexto = canvas.getContext("2d");  //getContexto es el metodo con el cual se puede dibujar en javascript
    }  
    
    self.BoardView.prototype={        
		clean: function(){
			this.contexto.clearRect(0,0,this.board.width,this.board.height);
		},
        draw: function(){
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
				var el = this.board.elements[i];

				draw(this.contexto,el);
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
    





    // dibujar los diferentes elementos
    function draw(contexto, element){ // draw dibuja los diferentes elementos
        switch (element.kind){
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

    var board = new Board(800,400)
    var bar = new Bar(20,100,40,100,board);
    var bar2 = new Bar(700,100,40,100,board);
    var canvas = document.getElementById('canvas');
    var boar_view = new BoardView(canvas,board);
    var ball = new Ball(350, 100, 10,board);
   
   //Método que captura cuando el evento ocurre (mover las barras)
document.addEventListener("keydow", function(ev){
    
if(ev.keyCode == 38){
    ev.preventDefault();
    bar.up();
}
else if(ev.keyCode == 40){
    ev.preventDefault();
    bar.down();
}

else if (ev.keyCode == 87){
    ev.preventDefault();
    bar2.up();
}
else if(ev.keyCode == 83){
    ev.preventDefault();
    bar2.down();
}
});

//board_view.draw();
//Método que va actualizando el programa
window.requestAnimationFrame(controler);
// función que ejecuta todos los elementos
function controler(){  
boar_view.draw();
requestAnimationFrame(controler);

}