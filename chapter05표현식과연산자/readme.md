5.13.2 빈객체도 항상 참인데 예시가 이해가 안됨;;;


해체할당
=

# 객체 Obj의 경우
~~~
const obj = {b: 2, c: 3, d: 4};

const {a,b,c} = obj;//선언 및 해체할당
a; undefined // obj에 a 없음
b; 2
c; 3

~~~

★주의사항★  위 예시는 선언과 동시에 해체할당을 했습니다.
그러나, 선언이후 해체할당을 다른 실행문에서 진행 할 경우....
~~~
const obj = {b:2, c:3, d:4};
let a,b,c;
( {a,b,c} = obj ) ;
~~~
괄호로 꼭 감싸줘야함.

# 배열 arr인 경우
~~~
const arr = [1,2,3];
let [x,y] = arr;
x; //1
y; //2
~~~

확산연산자(...)를 이용해 남은 요소를 새 배열 rest에 할당가능
~~~
const arr = [1,2,3,4,5];
let [x,y, ...rest] = arr;
x;    //1
y;    //2
rest; //[3,4,5]
~~~


### 배열의 위치바꿀 때( tmp변수 필요없음)

~~~
let a = 5, b = 10;
[a,b] = [b,a];
a;//10
b;//5
~~~

# if문 단축평가하는 OR 표현식으로 바꾸기
~~~
if(!options) options = {}; // 빈객체가 아니면 비어있게 만들어라
~~~
~~~
options = options || {}; // options가 빈 객체라면 OR조건의 후자가 표현식으로 리턴됨.
~~~

