var http=require('http');
var baseUrl='http://www.imooc.com/learn/';
var videoIds=[348,259,197,134,75];
var Promise=require('bluebird');//这个是Promise库 npm下载的
// var Promise=require('Promise') 
var cheerio=require('cheerio');
function async(url){
    return new Promise(function(resolve,reject){
        console.log("正在爬去！用Promise"+url);
        http.get(url,function(res){
            var html='';
            res.on('data',function(data){
                html+=data;
            })
        
            res.on('end',function(){
                resolve(html);
                //var courseData=filterChapters(html);
                //printInfo(courseData);
            }).on('error',function(e){
                reject(e)
                console.log("出错啦！！！")
            });
        
        })
    })
}
var fetchCourseArry=[];
videoIds.forEach(function(id){
    fetchCourseArry.push(async(baseUrl+id))
})
Promise.all(fetchCourseArry).then(function(pages){
var coursesData=[];
pages.forEach(function(html){
    var courses=filterChapters(html);
    coursesData.push(courses);
})
coursesData.sort(function(a,b){
    return a.number<b.number
})
printInfo(coursesData);
})
function filterChapters(html){
    var $=cheerio.load(html);
    var chapters=$('.chapter');
    var title=$('.chapter h3').text();
    var number=$(".js-learn-num").text();

    // [{
    //     chapterTitle:'',
    //     video:[
    //         title : '',
    //         id:'',
    //     ]
    // }]
    var courseData={videos:[],
    number:number,
    title:title,
    };
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
        courseData.videos.push(chapterData)
    })
    return courseData;
    
}



function printInfo(coursesData){
    coursesData.forEach(function(courseData){
        console.log(courseData.number+'people学过'+courseData.title+'\n');
    })
    coursesData.forEach(function(courseData){
        console.log("###"+courseData.title+'\n');
        courseData.videos.forEach(function(item){
            var chapterTitle=item.chapterTitle;
        console.log(chapterTitle+'\n');
        item.videos.forEach(function(item){
            console.log("【"+item.id+"】"+item.title+"\n");
        });
        })
        
    })
}