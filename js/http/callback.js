function callback(something){
    console.log(something);
}
function we(callback,something){
    something+='is cool';
    callback(something);
}
we(callback,'fjakdsj');
var p=new Promise((a,b)=>{
   //先接受到那个就执行哪个！！！状态只改变一次哈哈哈哈哈
   b('lm error');
    a('l\'m ok');
    
}).then(a=>{
    console.log(a);
},b=>{
    console.log(b)
})
console.log(p);