console.log("lets go!");
new Promise(resolve=>{
    setTimeout(()=>resolve('value'),2000);
}).then(value=>console.log(2+value)).then(console.log("ok"));
Promise.resolve("this is value").then(
    value=>{
        console.log("step1:"+value);
        console.log(typeof value)
        var object={
            value:value
        }
        console.log(object)
        var json=JSON.stringify(object);
        console.log(json)

    }
)