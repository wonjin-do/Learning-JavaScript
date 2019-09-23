p.93 상단 NOTE ` ( console.log(obj) ).obj[SIZE] ` 잘된거 아닌데;;


객체
=
~~~
    const obj={};
    const RED = Symbol("hi");
    obj[RED] = "red";
    console.log(obj);
    console.log(obj[RED]);
    
    const obj2={};
    const BLUE = Symbol("me too");
    obj2.BLUE = "blue";
    console.log(obj2);
    console.log(obj2.BLUE);
~~~
위 코드처럼 객체의 key 값으로 <br>
1.심볼 , 2.유효식별자, 3.비유효식별자(띄어쓰기 있는 문자열)<br>
중 심볼을 사용하였습니다.<br><br> 이 때, 유의사항이 있다. [ ]는 1, 2, 3일 때 모두 사용가능하다. <br>
그러나 1.심볼 일 경우, key 값을 불러올 때 값을 등록했을 때의 방법과 일치시켜서 불러와야 한다.<br>
위의 코드처럼 `obj[RED] = "red"`로 등록을 했다면 console.log 메소드 안에 `obj[RED]`로 불러와야 한다. `obj.RED`는 오류임.
<br>
### 1. Symbol 
#### a) obj[Symbol]  [ ] 안에 큰 따옴표없음.
#### b) obj.Symbol
### 2. 유효식별자_문자열
#### a) obj["string"] 안에 큰따옴표 있어야함.
#### b) obj.string
### 3. 비유효식별자_공백포함문자열
#### a) obj["space_string"] 안에 큰따옴표 있어야함.
#### b) 불가능

