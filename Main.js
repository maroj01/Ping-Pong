//MODELO
(function(){ // función anonima, que se va aejecutar a si misma

self.Board = function(ancho,altura){ // recibe los parametros del constructor
this.ancho= ancho;
this.altura = altura;
this.jugando= false;
this.juego_terminado = false;
this.barras = [];
this.pelota= null;

}

self.Board.prototype = {
    get elementos(){
        var elementos = this.barras;
        elementos.push(pelota);
        return elementos;
    }
}

}) ();

//VISTA
(function(){
    self.BoardView = function(canvas,board){ // canvas para dibujar los elementos
      this.canvas = canvas;
      this.canvas.ancho= board.ancho;
      this.canvas.altura= board.altura;
      this.board = board;
      this.contexto = canvas.getContexto("2d"); //getContexto es el metodo con el cual se puede dibujar en javascript
         
    }    
})();

//
window.addEventListener("load",main);

function main(){ // función main que ejecuta todos los elementos
var board = new Board(800,400)
var canvas = document.getElementById('canvas');
var BoardView = new BoardView(canvas,board);

}