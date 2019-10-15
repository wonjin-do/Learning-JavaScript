p.93 상단 NOTE ` ( console.log(obj) ).obj[SIZE] ` 잘된거 아닌데;;


객체
=
~~~
    const obj={};
    const RED = Symbol("hi");
    obj[RED] = "red";// 대괄호 []로 프로퍼티 추가
    console.log(obj[RED]); //red 출력
    
    const obj2={};
    const BLUE = Symbol("me too");
    obj2.BLUE = "blue";// 점 . 으로 프로퍼티 추가
    console.log(obj2.BLUE);// blue 출력
~~~
객체의 key 값으로 <br>
1.심볼 , 2.유효식별자("abc" 띄어쓰기 없는 문자열), 3.비유효식별자("abc ABC" 띄어쓰기 있는 문자열)이 가능하고<br>
위 코드는 '1.심볼'을 사용하였습니다.<br><br> 이 때, 유의사항이 있다.★★★<br>[ ]는 1, 2, 3일 때 모두 사용가능하다. <br>
그러나 1.심볼 일 경우, key 값을 불러올 때 값을 등록했을 때의 방법과 일치시켜서 불러와야 한다.<br>
위의 코드처럼 `obj[RED] = "red"`로 등록을 했다면 console.log 메소드 안에 `obj[RED]`로 불러와야 한다. `obj.RED`는 오류임.
<br>
### 1. Symbol (유일한 토큰을 나타내기 위한 ES6의 새 데이트 타입) - 항상 유일하다. 다른 어떤 심볼과 같지 않다.
#### a) obj[Symbol]  [ ] 안에 큰 따옴표없음.
결과 `{BLUE: "blue"}`
#### b) obj.Symbol
#####  콘솔에서 obj를 출력할 때, [ ] 등록후 접근시 key 의 리터럴이 조회되지 않음. 대신, symbol의 파라미터가 보여짐.
결과 `{Symbol(hi): "red"}`<br>
### 2. 유효식별자_문자열
#### a) obj["string"] 안에 큰따옴표 있어야함.
#### b) obj.string
### 3. 비유효식별자_공백포함문자열
#### a) obj["space_string"] 안에 큰따옴표 있어야함.
#### b) 불가능



~~~
const s = "hello";
s.rating = 3;
s.rating //undefined
~~~
이유 : s.rating = 3 코드 직후 임시로 만들어진 String 객체가 raing 프로퍼티를 할당하고 바로 소멸됨.

숫자로 바꾸기
=
## way1
~~~
const numStr = "33.3";
const num = Number(numStr); 
~~~
Number객체의 생성자를 빌려다 쓰고 바로 '원시값'을 반환함.

## way2
~~~
const a = parseInt("16 volts", 10);

const b = parseInt("3a", 16);

const c = parseFloat("15.5 kph");
~~~
세 경우 모두 결과물이 10진수임.<br>
두번째 파라미터값은 첫번째 파라미터의 진수를 나타냄.<br>
따라서, 3a 는 16진수이고 b 에는 58이 저장됨.
####parseFloat는 항상 파라미터가 10진수임.

~~~
const now = new Date();
const ts = d.valueOf();
~~~
Date타입은 숫자로 바꿀 때, valueOf() 메소드를 쓴다.

문자열로 변환
=
### 모든 객체가 toString()메서드를 갖고있음.
그러나, 결과값은 `[object Object]`라서 쓸모없어짐. 이를 위해 toSring()을 오버롸이딩을 해서 사용함.
### 배열의 toString()메서드는 쓸만함.



요약
=
~~~
    let q = {a: 1};
    q === {a: 1}         // false임
~~~
이유: === 연산을 알 필요가 있다.
#### 원시타입일 경우
    1. 데이터 타입 2. 리터럴(값) 순으로 비교
#### 객체타입의 변수일 경우
    1. 같은 객체를 가르키는지 비교
#### 위 경우와 같이 객체변수 vs 객체 일 경우
    1. 변수는 객체를 가르키고 있을 뿐, 객체자체는 아님. 변수와 객체는 같은것이 아니라고 판단함.
