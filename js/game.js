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
  var fixed=function(){
    for(var i=0;i<cur.length;i++){
      for(var j=0;j<cur[i].length;j++){
        if(check(cur.origin,i,j)){
          if(gameData[cur.origin.x+i][cur.origin.y+j]==2){
            gameData[cur.origin.x+i][cur.origin.y+j]==1;
          }
        }
      }
    }
    refreshDiv(gameData,gameDivs)
  }
  var init=function(doms){
    gameDiv=doms.gameDiv;
    nextDiv=doms.nextDiv;
    cur=squareFactory.prototype.make(2,2);
    next=squareFactory.prototype.make(3,3);


    initDiv(gameDiv,gameData,gameDivs);
    initDiv(nextDiv,next.data,nextDivs);
    cur.origin.x=5;
    cur.origin.y=5;
    setData();
    refreshDiv(gameData,gameDivs);
    refreshDiv(next.data,nextDivs);
  }
  this.init=init;
  this.left=left;
  this.right=right;
  this.up=up;
  this.fixed=fixed;
  this.down=down;
}
