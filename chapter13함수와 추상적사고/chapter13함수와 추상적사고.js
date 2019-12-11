//13 함수와 추상적사고
//13.1 리턴없는 서브루틴으로서 함수
//13.2 리턴하는 서브루틴으로서 함수
//13.3 함수로서의 함수(순수함수가 권장)
/*
순수함수
특징1. input이 같으면 output도 같다.
특징2. 함수를 사용하는(호출하는) client단에서,순수함수는 client단에 있는 변수를 변경시키지(영향을 주지) 말아야함.

메소드
특징1. 객체(컨텍스트)라는 소속을 갖음.
특징2. 메소드의 동작은 소속환경(객체의 상태)에 따라 좌우됨.
*/

//단점 : colorIndex값이 변함, input값이 undefined라는 동일조건에 매호출시마다 다른 값을 리턴함.
const colors = [`red`, `orange`, `yellow`, `green`, `blue`,`indigo`,`violet`];
let colorIndex = -1;
function getNextRainbowColor(){
    if(++colorIndex >= colors.length)colorIndex = 0;
    return colors[colorIndex];
}

//개선 :colorIndex값이 변하지 않음.
const getNextRainbowColor2 = (function(){
    const colors = [`red`, `orange`, `yellow`, `green`, `blue`,`indigo`,`violet`];
    let colorIndex = -1;
    return function getNextRainbowColor(){
        if(++colorIndex >= colors.length)colorIndex = 0;
        return colors[colorIndex];
    };
})();

//완벽한 개선 : 호출시 동일한 이터레이터를 반환함.
//p.277 상단 설명 대단쓰...
function getRainbowIterator(){
    const colors = [`red`, `orange`, `yellow`, `green`, `blue`,`indigo`,`violet`];
    let colorIndex = -1;//클로저의 중요성
    return {    //iter객체를 리턴
        next(){
            if(++colorIndex >= colors.length)colorIndex = 0;
            return {value: colors[colorIndex], done: false}; 
        }
    };
}
const iter1 = getRainbowIterator();//colorIndex = -1
//new getRainbowIterator() 호출후 colorIndex는 블록{ }밖에서 소멸되야하나
//next()스코프와 클로저를 형성한 colorIndex가 계속 남아 있어 0,1,2,3,,,값으로 변하게 됨.
const iter2 = getRainbowIterator();//위 colorIndex와 다른 별도의 변수가 할당됨.

//13.4.1함수도 객체다
//typeof를 선행해서 사용하여 function임을 확인, 이후 instanceof 로 Object를 확인

/*13.5 함수표현식(IIFE, Immediately Invoked Function Expression)
와 비동기적 코드
*/

//제대로 동작안함.
/*var i;
for(i=5;i>=0;i--){
    setTimeout(function(){
        console.log(i===0?`go!`: i);
    },(5-i)*1000);
}
*/

//제대로 동작함.
/*
function loopBody(i){
    setTimeout(function(){
        console.log(i===0?`go!`: i);
    },(5-i)*1000);
}
var i;
for(i=5;i>=0;i--){
    loopBody(i);
}
*/

//제대로 동작함.
/*
var i;
for(i=5;i>=0;i--){
    (function(i){
        setTimeout(function(){
            console.log(i===0?`go!`: i);
        },(5-i)*1000);
    })(i);
}*/

for(let i=5;i>=0;i--){
    setTimeout(function(){
        console.log(i===0?`go!`: i);
    },(5-i)*1000);
    
}

