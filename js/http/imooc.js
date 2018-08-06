var http=require('http');
var url='http://www.imooc.com/learn/384';
var cheerio=require('cheerio')
function filterChapters(html){
    var $=cheerio.load(html);
    var chapters=$('.chapter');
    // [{
    //     chapterTitle:'',
    //     video:[
    //         title : '',
    //         id:'',
    //     ]
    // }]
    var courseData=[];
    chapters.each(function(item){
        var chapter=$(this);
        var chapterTitle=chapter.find(".chapter-description").text();
        var videos=chapter.find('.video').children('li')
        var chapterData={
            chapterTitle:chapterTitle,
            videos:[]
        };
        videos.each(function(item){
            var video=$(this).find('.J-media-item');
            var videoTitle=video.text();
            var id=video.attr('href').split('video/')[1];
            chapterData.videos.push({title:videoTitle,
            id:id,
            })

        })
        courseData.push(chapterData)
    })
    return courseData;
    
}


http.get(url,function(res){
    var html='';
    res.on('data',function(data){
        html+=data;
    })

    res.on('end',function(){
        var courseData=filterChapters(html);
        printInfo(courseData);
    }).on('error',function(){
        console.log("出错啦！！！")
    });

})
function printInfo(courseData){
    courseData.forEach(function(item){
        var chapterTitle=item.chapterTitle;
        console.log(chapterTitle+'\n');
        item.videos.forEach(function(item){
            console.log("【"+item.id+"】"+item.title+"\n");
        });
    })
}