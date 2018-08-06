var http=require('http');
var url='http://www.imooc.com/learn/384';
var cheerio=require('cheerio')
function filterChapters(html){
    var $=cheerio.load(html);
    var chapters=$('.learnchapter');
    // [{
    //     chapterTite:'',
    //     video:[
    //         title : '',
    //         id:'',
    //     ]
    // }]
    var courseData=[];
    chapters.each(function(item){
        var chapter=$(this);
        var chapterTitle=chapter.find("strong").text();
        var video
    })
}


http.get(url,function(res){
    var html='';
    res.on('data',function(data){
        html+=data;
    })

    res.on('end',function(){
        filterChapters(html)
    }).on('error',function(){
        console.log("出错啦！！！")
    });

})