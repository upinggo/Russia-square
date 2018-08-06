var http=require('http');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.write('Hello syl');
    res.end();
}).listen(2018);
//必须要有listen方法！！！才会调用createServer方法中的request与response参数