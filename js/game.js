var Game=function(){
  var nextDiv;
  var gameDiv;
  var gameData=[
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
  ];
  var cur;
  var next;
  var nextDivs=[];
  var gameDivs=[];
  var setData=function(){
    for(var i=0;i<cur.data.length;i++){
      for(var j=0;j<cur.data[0].length;j++){
      if(check(cur.origin,i,j)){
        gameData[cur.origin.x+i][cur.origin.y+j]=cur.data[i][j];
      }
      }
    }
  };
  var check=function(pos,x,y){
    if(pos.x+x<0){
      return false;
    }else if(pos.x+x>=gameData.length){
       return false;
    }else if(pos.y+y<0){
      return false;
    }
    else if(pos.y+y>=gameData[0].length){
      return false;
    }else if(gameData[pos.x+x][pos.y+y]==1){
      return false;
    }else{
      return true;
    }
  }
  var Valid=function(pos,data){
    for(var i=0;i<data.length;i++){
      for(var j=0;j<data[0].length;j++){
        if(data[i][j]!=0){
          if(!check(pos,i,j)){
            return false;
          }
        }
      }
    }
    return true;
  }
  var clear=function(){
    for(var i=0;i<cur.data.length;i++){
      for(var j=0;j<cur.data[0].length;j++){
        if(check(cur.origin,i,j)){
          gameData[cur.origin.x+i][cur.origin.y+j]=0;
        }

      }
    }
  }
  var down=function(){
    if(cur.Candown(Valid)){
      clear();
      cur.down();
      setData();
      refreshDiv(gameData,gameDivs)
      return true;
    }else{
      return false;
    }

  };
  var up=function(){
    if(cur.Canup(Valid)){
      clear();
      cur.up();
      setData();
      refreshDiv(gameData,gameDivs)
    }

  };
  var left=function(){
    if(cur.Canleft(Valid)){
      clear();
      cur.left();
      setData();
      refreshDiv(gameData,gameDivs)
    }

  };
  var right=function(){
    if(cur.Canright(Valid)){
      clear();
      cur.right();
      setData();
      refreshDiv(gameData,gameDivs)
    }

  };
  var initDiv=function(container,data,divs){
    for(var i=0;i<data.length;i++){
      var gameDiv=[];
      for(var j=0;j<data[i].length;j++){
        var newNode=document.createElement('div');
        newNode.className="none";
        newNode.style.top=(i*20)+'px';
        newNode.style.left=(j*20)+'px';
        container.appendChild(newNode);
        gameDiv.push(newNode);

      }
      divs.push(gameDiv);
  }}
  var refreshDiv=function(data,divs){
    for(var i=0;i<data.length;i++){
      for(var j=0;j<data[i].length;j++){
        if(data[i][j]==0){
          divs[i][j].className='none';
        }else if(data[i][j]==1){
          divs[i][j].className='done';
        }else if(data[i][j]==2){
          divs[i][j].className='current';
        }
      }
    }
  }
  var checkClear=function(){
    var line=0;
      for(var i=gameData.length-1;i>=0;i--){
        var clear=true;
        for(var j=0;j<gameData[0].length;j++){
          if(gameData[i][j]!=1){
            clear=false;
            break;
          }
        }
          if(clear){
            for(var m=i;m>0;m--){
              for(var n=0;n<gameData[0].length;n++){
                gameData[m][n]=gameData[m-1][n];
              }
            }
            for(var n=0;n<gameData[0].length;n++){
              gameData[0][n]=0;
            }
            i++;
            line++;
        }
      }
      return line;
  }
  var gameover=function(){
    var over=false;
    for(var i=0;i<gameData[0].length;i++){
      if(gameData[1][i]==1){
        over=true;

      }
    }
    return over;
  }
  //方块底部固定
  var fixed=function(){
    for(var i=0;i<cur.data.length;i++){
      for(var j=0;j<cur.data[i].length;j++){
        if(check(cur.origin,i,j)){
          if(gameData[cur.origin.x+i][cur.origin.y+j]==2){
            gameData[cur.origin.x+i][cur.origin.y+j]=1;
          }
        }
      }
    }
    refreshDiv(gameData,gameDivs)
  }
  var performNext=function(type,dir){
    cur=next;
    setData();
    next=squareFactory.prototype.make(type,dir);
    refreshDiv(next.data,nextDivs)
  }
  var init=function(doms,type,dir){
    gameDiv=doms.gameDiv;
    nextDiv=doms.nextDiv;
    TimeDiv=doms.TimeDiv;
    pointDiv=doms.pointDiv;
    next=squareFactory.prototype.make(type,dir);


    initDiv(gameDiv,gameData,gameDivs);
    initDiv(nextDiv,next.data,nextDivs);

    refreshDiv(next.data,nextDivs);
  }
  var TimeDiv;
  var score=0;
  var pointDiv
var point=function(line){
var s=0;
switch (line) {
  case 1:
    s=10;
    break;
    case 2:
      s=30;
      break;
      case 3:
        s=60;
        break;
        case 4:
          s=100;
          break;
  default:break;

}
score=score+s;
pointDiv.innerHTML=score;
}
  var setTime=function(time){
      TimeDiv.innerHTML=time;
  }
  this.gameover=gameover;
  this.next
  this.init=init;
  this.left=left;
  this.right=right;
  this.up=up;
  this.point=point;
  this.setTime=setTime;
  this.performNext=performNext;
  this.checkClear=checkClear;
  this.fixed=fixed;
  this.down=down;
}
