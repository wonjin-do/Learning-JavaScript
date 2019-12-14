p.308 너무 어렵다...p.

//단일스레드에서 동작

//14.2.1
const start = new Date();
let i = 0;
const intervalid = setInterval(function(){
    let now = new Date();
    if(now.getMinutes() !== start.getMinutes() || ++i > 10)
        return clearInterval(intervalid);
    console.log(`${i}:${now}`);
}, 5*1000);

//Timer 브라우저가 제공하는 웹API이다.
//자바스크립트 인터페이스 setTimeout, setInterval, clearInterval

//함수호출시 새로운 클로저 생성됨.

//14.2.2
//1. timer로 func이 전달됨.
//2. main종료가 됨.
//비동기이기 때문에 1과 2가 동시에 일어남
//func이 큐에 push되는 순서는 다름

//절대시간으로 부터 지난 시간을 기준으로 실행됨.
setTimeout(function () {
    console.log(`go1`);
}, (3*1000));

setTimeout(function () {
    console.log(`go2`);
}, (2)*1000);

setTimeout(function () {
    console.log(`go3`);
}, (1)*1000);
return;

//상대시간으로 계산하여 자신을 감싸고 있는 함수가 종료된 기준으로 실행함.
setTimeout(function () {
    console.log(`go1`);
    setTimeout(function () {
        console.log(`go2`);
        setTimeout(function () {
            console.log(`go3`);
        }, (3)*1000);
    }, (5)*1000);
}, (15)*1000);
return;

//Bad
function countDown() {
    let i;
    console.log("Countdown:");
    for(i=5;i>=0;i--){
        setTimeout(function () {
            console.log(i===0?"GO":i);
        }, (5-i)*1000);//timer가 5초 4초 3초 2초 1초 간격으로 제대로 동작안하는거 같은데??
    }
}
countDown();

//Good
function countDown() {
    console.log("Countdown:");
    for(let i=5;i>=0;i--){
        setTimeout(function () {
            console.log(i===0?"GO":i);
        }, (5-i)*1000);//timer가 5초 4초 3초 2초 1초 간격으로 제대로 동작안하는거 같은데??
    }
}
countDown();


//14.2.3오류 우선 콜백
//뭔소린지 모르겠어... 설명이 이상해
//(문제상황)콜백의 파라미터로 에러를 받는 방법이 왜 어려운지 알아보자
const fs = require(`fs`);
const fname = `may_or_may_not_exist.txt`;
fs.readFile(fname, function (err, data) {
    if(err)return console.error(`error reading file ${fname}: ${err.message}`);
    console.log(`${fname} contents: ${data}`);
});


//14.2.4 콜백지옥
const fs = require(`fs`);
fs.readFile(`a.txt`, function(err, dataA){
    if(err)console.error(err);
    fs.readFile(`b.txt`,function(err, dataB) {
        if(err)console.error(err);
        fs.readFile(`c.txt`, function(err, dataC){
            if(err)console.error(err);
            setTimeout(function () {
                fs.writeFile('d.txt',dataA+dataB+dataC, function(err){
                    if(err)console.error(err);
                });     
            }, 60*1000);
        });
    });
});

//bad
const fs = require(`fs`);
function readSketchyFile(){
    try{
        fs.readFile(`does_not_exist.txt`, function(err, data){
            //콜백함수는 여러번 또는 0번 호출될 문제가 있다.
            if(err)throw err;
        });
    }catch(err){
        //catch구문으로 throw가 안돼서 err를 처리하지 못함.
        console.log('warning: minor issue occurred, program continuing');
    }
}
readSketchyFile();

//해결책
/*
프로미스
1. 콜백을 예측가능한 패턴으로 사용하게끔 만들어줌
2. 콜백만 사용했을 때 나타나는 버그를 해결
*/

//프로미스 사용전
function countDown() {
    console.log("Countdown:");
    for(let i=5;i>=0;i--){
        setTimeout(function () {
            console.log(i===0?"GO":i);
        }, (5-i)*1000);//timer가 5초 4초 3초 2초 1초 간격으로 제대로 동작안하는거 같은데??
    }
}
countDown();


function countDown(seconds){
    return new Promise(function(resolve, reject){
        for(let i=seconds; i>=0; i--){
            setTimeout(function(){
                if(i>0)console.log(i + `...`);
                else resolve(console.log("GO!"));
            }, (seconds-i)*1000);
        }
    });
}

//14.3.2프라미스 사용
countDown(5).then(
    function(){
        console.log(`countDown completed successfully`);
    },
    function(err){ //이 함수가 왜 필요하지?
        console.log(`countDown experienced an error: ` + err.message);
    }
);

//catch문
const p = countDown(5);
p.then(function(){
    console.log("countdown completed successfully");
});
p.catch(function(err){
    console.log("countdown experienced an error: " + err.message);
});

//에러 유도
function countDown(seconds){
    return new Promise(function(resolve, reject){
        for(let i=seconds; i>=0; i--){
            setTimeout(function(){
                if(i === 13)return reject(new Error("Oh my god"));
                if(i>0)console.log(i + `...`);
                else resolve(console.log("GO!"));
            }, (seconds-i)*1000);
        }
    });
}

//14.3.3이벤트
const EventEmitter = require(`events`).EventEmitter;
class Countdown extends EventEmitter{
    constructor(sec, superstitious){
        super();
        this.sec = sec;
        this.superstitious = superstitious;
    }
    go(){
        const countdown = this;
        return new Promise(function(resolve, reject){
            for(let i=countdown.sec; i>=0; i--){
                setTimeout(function(){
                    if(countdown.superstitious && i === 13)
                        return reject(new Error("Oh my god"));
                    countdown.emit(`tick`,i);
                    if(i===0)resolve();
                }, (countdown.sec-i)*1000);
            }
        });
    }
}

const c = new Countdown(15);
//const c = new Countdown(15, true);
c.on(`tick`, function(i){
    if(i>0)console.log(i + `...`);
});
c.go()
    .then(function(){
        console.log(`GO!`);
    })
    .catch(function(err){
        console.error(err.message);
    });

//p.305
const EventEmitter = require(`events`).EventEmitter;
class Countdown extends EventEmitter{
    constructor(sec, superstitious){
        super();
        this.sec = sec;
        this.superstitious = superstitious;
    }
    go(){
        const countdown = this;
        const timeoutIds =[];
        return new Promise(function(resolve, reject){
            for(let i=countdown.sec; i>=0; i--){
                timeoutIds.push(setTimeout(function(){
                    if(countdown.superstitious && i === 13){
                        timeoutIds.forEach(clearTimeout);
                        return reject(new Error("Oh my god"));
                    }
                        
                    countdown.emit(`tick`,i);
                    if(i===0)resolve();
                }, (countdown.sec-i)*1000));
                
            }
        });
    }
}

const c = new Countdown(15, true)
    .on(`tick`, function(i){
    if(i>0)console.log(i + `...`);
});
c.go()
    .then(function(){
        console.log(`GO!`);
    })
    .catch(function(err){
        console.error(err.message);
    });

//14.3.4 프라미스 체인
function launch(){
    return new Promise(function(resolve, reject){
        console.log("Lift off!");
        setTimeout(function(){
            resolve("In orbit!");
        }, 2*1000);
    });
}
// const c = new Countdown(15, true)
const c = new Countdown(5, true)
    .on(`tick`, i => console.log(i + `...`));

c.go()
    .then(launch)
    .then(msg => {console.log(msg);})
    .catch(function(err){
        console.error("We have a problem...");
    });

//14.3.5 결정되지 않는 프라미스 방지하기
function launch(){
    return new Promise(function(resolve, reject){
        //에러추가
        if(Math.random() < 0.5)return;
        console.log("Lift off!");
        setTimeout(function(){
            resolve("In orbit!");
        }, 2*1000);
    });
}

//결정되지 않은 프로미스를 실패하게 만드는 함수
function addTimeout(fn, timeout){
    if(timeout === undefined)timeout = 1000;
    return function(...args){
        return new Promise(function(resolve, reject){
            const tid = setTimeout(reject, timeout, new Error("promise timed out"));
            fn(...args)
                .then((...args) => {
                    clearTimeout(tid);
                    resolve(...args);
                })
                .catch((...args) => {
                    clearTimeout(tid);
                    reject(...args);
                });
        });
    }
}
// const c = new Countdown(15, true)
const c = new Countdown(12, true)
    .on(`tick`, i => console.log(i + `...`));

c.go()
    .then(addTimeout(launch, 11 * 1000))
    //.then(launch)
    .then(msg => {console.log(msg);})
    .catch(function(err){
        console.error("We have a problem...");
    });


//14.4제너레이터
const fs = require(`fs`);
fs.readFile(`a.txt`, function(err, dataA){
    if(err)console.error(err);
    fs.readFile(`b.txt`,function(err, dataB) {
        if(err)console.error(err);
        fs.readFile(`c.txt`, function(err, dataC){
            if(err)console.error(err);
            setTimeout(function () {
                fs.writeFile('d.txt',dataA+dataB+dataC, function(err){
                    if(err)console.error(err);
                });     
            }, 60*1000);
        });
    });
});