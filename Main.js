
//Modelo // función anonima, que se va aejecutar a si misma
(function(){ 

// recibe los parametros del constructor
self.Board = function(width,height){ 
this.width= width;
this.height = height;
this.playing= false;
this.jgame_over = false;
this.bars = [];
this.ball= null;

}

self.Board.prototype = {
    get elements(){
        var elements = this.bars;
        elements.push(this.ball);
        return elements;
    }
}

}) ();

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
this.speed = 10;
}

//Mover las barras
self.Bar.prototype = {
down: function(){
    this.y += speed;
},
up: function(){
this.y -= speed;
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
      this.contexto = canvas.getContext("2d"); //getContexto es el metodo con el cual se puede dibujar en javascript
    }  
    
    self.BoardView.prototype={
        draw: function(){
            for (var i = this.board.elements.length -1; i>= 0; i--){
                var el = this.board.elements[i];
                draw(this.contexto,el)
            };
        }
    };

    // dibujar los diferentes elementos
    function draw(contexto, element){ // draw dibuja los diferentes elementos
        if (element != null && element.hasOwnProperty("kind")){
            switch (element.kind){
                case "rectangle":
                    contexto.fillRect(element.x,element.y,element.width,element.height);
                    break;
             }
        }
    }
})();


window.addEventListener("load",main);
// función main que ejecuta todos los elementos
function main(){ 
    var board = new Board(800,400)
    var bar = new Bar(20,100,40,100,board);
    var bar = new Bar(700,100,40,100,board);
    var canvas = document.getElementById('canvas');
    var boar_view = new BoardView(canvas,board);
    
console.log(board);
boar_view.draw();

}