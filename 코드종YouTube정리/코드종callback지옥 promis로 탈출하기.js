function delay(sec, callback){
    setTimeout(()=>{
        callback(new Date().toISOString());
    }, sec * 1000);
}

// delay(1,(time)=>{
//     console.log(1, time);
// });

function delayP(sec){
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


