var Local =function(){
  var game ;
  var time=200;
  var timer=null;
  var move=function(){
    game.down();
    game.fixed();
  }
  var bindKey=function(){
    document.onkeydown=function(e){
      if(e.keyCode==38){
game.up();
      }else if(e.keyCode==39){
game.right();
      }else if(e.keyCode==40){
        game.down();
      }else if(e.keyCode==37){
          game.left()
      }else if(e.keyCode==32){

      }
    }
  }
  var start=function(){
    var doms={
      gameDiv:document.getElementById('game'),
      nextDiv:document.getElementById('next')
    }
    game=new Game();
    game.init(doms);
    bindKey();
    timer=setInterval(move,time);
  }
  this.start=start;
}
