var   Square=function(){

  //Square
  this.data=[
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
  this.dir=0;

  this.origin={
    x:0,
    y:0
  }
}
Square.prototype.Candown=function(Valid){
  var text={};
  text.x=this.origin.x+1;
  text.y=this.origin.y;
 return  Valid(text,this.data);
}
Square.prototype.Canup=function(Valid){
  var d=this.dir+1;
  var text=[
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
  if(d==4){
    d=0;
  }
  for(var i=0;i<this.data.length;i++){
    for(var j=0;j<this.data[0].length;j++){
      text[i][j]=this.uprotate[d][i][j];
    }
  }
 return  Valid(this.origin,text);
}
Square.prototype.Canright=function(Valid){
  var text={};
  text.x=this.origin.x;
  text.y=this.origin.y+1;
 return  Valid(text,this.data);
}
Square.prototype.Canleft=function(Valid){
  var text={};
  text.x=this.origin.x;
  text.y=this.origin.y-1;
 return  Valid(text,this.data);
}
Square.prototype.down=function(){
  this.origin.x+=1;
}
Square.prototype.left=function(){
  this.origin.y-=1;
}
Square.prototype.right=function(){
  this.origin.y+=1;
}
Square.prototype.up=function(){
  this.dir=this.dir+1;

  if(this.dir==4){
    this.dir=0;
  }
  for(var i=0;i<this.data.length;i++){
    for(var j=0;j<this.data[0].length;j++){
      this.data[i][j]=this.uprotate[this.dir][i][j];
    }
  }

}
