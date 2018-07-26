var   Square=function(){
  //square
  this.data=[
    [0,2,0,0],
    [0,2,0,0],
    [0,2,0,0],
    [0,2,0,0]
  ];
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
  var text={};
  text.x=this.origin.x+1;
  text.y=this.origin.y;
 return  Valid(text,this.data);
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
  this.origin.x-=1;;;;
}
