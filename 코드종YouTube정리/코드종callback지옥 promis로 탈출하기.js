function delay(sec, callback){
    setTimeout(()=>{
        callback(new Date().toISOString());
    }, sec * 1000);
}

// delay(1,(time)=>{
//     console.log(1, time);
// });

function delayP(sec){
    //resolve: 할 일을 다했을 때 호출
    //reject: 할 일을 하던중 예외가 날 때 호출
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(new Date().toISOString());
        }, sec * 1000);
    });
}

delayP(1).then((res) => {
   console.log(1, res);
    return delayP(1);
}).then((res) => {
    console.log(1, res);
    return delayP(1);
 }).then((res) => {
    console.log(1, res);
 }).then((res) => {
    console.log(res);
 });
