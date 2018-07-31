var Local =function(){
  var game ;
  var time=500;
  var timer=null;
  var point=0;
  var move=function(){

     timefunc();
    if(!game.down()){
      game.fixed();
      var line=game.checkClear();
      if(line){
        game.point(line);
      }
      if(game.gameover()){
        stop();
      }else{
        game.performNext(generateType(),generateDir());
      }


    };

  }
  var timefunc=function(){
    timecounter+=(time/1000);
    game.setTime(timecounter)
  }
  var timecounter=0;
  var stop=function(){
    if(timer){
      clearInterval(timer);
      timer=null;
    }
    document.onkeydown=null;
  }
var   generateType=function(){
      return Math.ceil(Math.random()*7)-1;
  }
  var generateDir=function(){
    return Math.ceil(Math.random()*4)-1;
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
      gameDiv:document.getElementById('local_game'),
      nextDiv:document.getElementById('local_next'),
      TimeDiv:document.getElementById('local_time'),
      pointDiv:document.getElementById('local_score')
    }
    game=new Game();
    game.init(doms,generateType(),generateDir());
    game.performNext(generateDir(),generateDir())
    bindKey();
    timer=setInterval(move,time);
  }
  this.start=start;
}
