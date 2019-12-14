function delay(sec, callback){
    //특징: 1.기능수행 --> 2.처리
    setTimeout(()=>{
        callback(new Date().toISOString());
    }, sec * 1000);
}
function delayP(sec){
    //기능수행
    //resolve: 할 일을 다했을 때 호출
    //reject: 할 일을 하던중 예외가 날 때 호출
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(new Date().toISOString());
        }, sec * 1000);//내부적으로 Promise의 생성자가 => 함수를 실행시킬것임.
    });
}

//way0
delay(3,(time)=>{
    console.log("1st", time);
});
delay(2,(time)=>{
    console.log("2nd", time);
});
delay(1,(time)=>{
    console.log("3rd", time);
});
return;


//way1
delay(1,(time)=>{
    console.log(1, time);
    delay(2,(time)=>{
        console.log(2, time);
        delay(3,(time)=>{
            console.log(3, time);
        });
    });
});
return;


//way2
delayP(1).then((result)=>{
    console.log(1, result);
    delayP(1).then((result)=>{
        console.log(2, result);
    });
});
return;

//way3
delayP(1).then((result)=>{
    console.log("1st", result);
    return delayP(1);
}).then((result)=>{
    console.log("2nd", result);
    return delayP(1);
})//then은 정의부에서 Promise를 리턴하게 설계됨.
  //그 Promise가 resolve
  .then((result)=>{
    console.log("3rd", result);
    //return 없음
})//윗 줄에서 return을 하지 않았을 지라도 resolve된 Promise를 리턴함.
  .then((result)=>{
    console.log("4th", result);
    return "wow";//Promise리턴이 아니기에 지연없이 "wow"만 callback함수에 전달된다.
}).then((result)=>{
    console.log("5th", result);
});
