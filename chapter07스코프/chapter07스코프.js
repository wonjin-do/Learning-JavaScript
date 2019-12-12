function f(x){
    return x+3;
}
f(5);//8
x;// Reference Error

//스코프 와 존재
//스코프 : 현재 실행 컨택스트에서 사용가능한 변수 식별자들의 집합
//존재 : 리터럴

//정적스코프
function f1(){
    console.log(`one`);
}
function f2(){
    console.log(`two`);
}
f2();
f1();
f2();


const x = 3;
function f(){
    console.log(x);
    console.log(y);
}

{
    const y =5;
    f();//호출할 때 스코프 中 y가 있는데 f()는 y에 접근못함. 
    //자신이 정의 될 때의 스코프는 사용가능. 그 스코프에는 x가 포함됨.
}

//7.5 변수숨기기
{
    //let으로 해야지 var로 하면 적절한 예제가 아님.
    //let은 블록단위로 스코프형성
    //var는 함수단위로 스코프형성
    let x = `blue`;
    console.log(x);
    {
        let x = 3;
        console.log(x);
    }
    console.log(x);
}
console.log(typeof x);


//클로져
/*
(잠깐)
const x = 3;
function f(){
    console.log(x);
    console.log(y);
}

{
    const y =5;
    f(); //스코프에 x,y가 있으나 f가 정의될 때의 스코프 x만 사용가능.
    //현재 블록에 x가 계속 남아있음.
}
*/

//전역스코프
let globalFunc;
{
    //블록스코프
    let blockVar = `a`;
    globalFunc = function(){
        console.log(blockVar);
    }
}//일반적인 경우 다음줄 부터는 식별자 blockVar는 소멸되야함
globalFunc();// 그럼에도 불구하고 blockVar를 이 함수가 접근할 수 있음.
// 변수 globalFunc가 블록안에서 값을 할당받으면 '전역스코프'와 '블록스코프'가 클로저를 형성


//7.7즉시 호출하는 함수표현식
const message = (function(){
    const secret = "I'm a secret!";
    return `The secret is ${secret.length} characters long.`;
})();
console.log(message);

const f= (function(){
    let count = 0;
    return function(){
        return `I have been called ${++count}time(s).`;
    }
})();
f();//function(){return `I have been called ${++count}time(s).`;}이 정의돼는 위치의 스코프를 사용할 수 있으므로 count에 접근 가능하다.
f();//f()에서 count를 접근 가능한 것이지, 외부로부터 count는 차단되어 있다.


//코드종 클로저
/*
var 과 let의 차이
    //let은 블록단위로 스코프형성
    //var는 함수단위로 스코프형성
*/
function x(){
    {
        var t = 1;
        let u = 1;
    }
    console.log(t);//함수x의 스코프에 있는 t이기 때문에 출력가능
    console.log(u);//중괄호{ }로 스코프를 구분하기 떄문에 u는 undefined가 뜸.
}

function x(){
    {
        var t = 1;
        let u = 1;
    }
    console.log(t);//함수x의 스코프에 있는 t이기 때문에 출력가능
    //에러발생
    console.log(u);//중괄호{ }로 스코프를 구분하기 떄문에 u는 undefined가 뜸.
}
//x();
 
var btns = [
    document.getElementById(`btn0`),
    document.getElementById(`btn1`),
    document.getElementById(`btn2`)
];
// for(var i=0;i<3;i++){
//     var str = `btn${i}`;
//     btns.push(document.getElementById(str));
// }
function setClick(){
    //var는 함수단위 스코프 형성함.
    //let은 중괄호 { } 단위로 스코프 형성함
    for(let i = 0; i < 3; i++){ 
        btns[i].addEventListener("click", function(){
            console.log(i);
        });
        
    }
}
setClick();



$(document).ready(function(){
    'use strict';
    

  



});