Moment.js

"날짜" = 날짜, 시간
날짜(시간명시X) = 낮12시

//15.1 날짜, 타임존, 타임스탬프, 유닉스시간
타임존 : UTC를 기준으로(https://upload.wikimedia.org/wikipedia/commons/8/88/World_Time_Zones_Map.png) 
+,-한 시간, 덕분에 어느 나라에서건 오후 7시가 저녁이라는 것이 일치함.

const d = new Date();
console.log(d);//그레고리력 (깔끔함)
console.log(d.valueOf());//초단위

//15.3 Moment.js
<script src="//cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.4.0/moment-timezone.min.js"></script>
또는
npm install --save moment-timezone 이후 const moment = require(`moment-timezone`);로 사용함.Date


//15.5 날짜 데이터 만들기
서버에서 만든 날짜와 사용자의 브라우저에서 만든 날짜는 다르다. (문제점)
LA~WashingTon 3시간 차이남.

//15.5.1 서버에서 날짜 생성하기
//new Date(Date.UTC())
const num = Date.UTC(2016,4,27);//UTC 시간을 숫자형으로 표시
console.log(num);
console.log("UTC 표기: ", new Date(num));//UTC지역의 시간을 표시(지역에 상관없이 동일)
console.log("지역표준시: ", new Date(2016,4,27));//지역에 따라 다른 지역표준시

//moment.tz를 써서 타임존을 손으로 변형할 필요가 없다.
//서버의 위치를 표기하면 UTC시간대를 편리하게 계산해준다.
console.log(new Date(2016,3,27,9,19));//현재 자신의 위치에서 UTC시간대를 표시
const d = moment.tz([2016, 3, 27, 9, 19],`America/Los_Angeles`).toDate();
//const s = moment.tz([2016, 3, 27, 9, 19],`Asia/Seoul`);
const s = moment.tz([2016, 3, 27, 9, 19],`Asia/Seoul`).toDate();
console.log(d);
console.log(s);

//15.5.2브라우저에서 날짜 생성하기
일반적으로 자바스크립트는 브라우저가 속한 운영체제의 시간을 택한다.
다른 타임존을 처리하고 싶다면 moment.js를 써라.

//15.6 날짜데이터 전송하기

const before = {d: new Date()};
before.d instanceof Date;
const json = JSON.stringify(before);
const after = JSON.parse(json);
after.d instanceof Date;
typeof after.d 


//15.7 날짜 형식
Date객체로 날짜형식 만들기 번거로움. Moment.js를 이용할 것 YYYY형식으로 연도지정가능(장점)
Date
"5/9/1930"
"5/9/1930 4:00 PM"
Moment
"YYYY-MM-DD"
"YYYY-MM-DD HH:mm"
"YYYY-MM-DD HH:mm Z"



