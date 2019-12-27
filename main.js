const moment = require(`moment-timezone`);


const num = Date.UTC(2016,4,27);//UTC 시간을 숫자형으로 표시
console.log(num);
console.log("UTC 표기: ", new Date(num));//UTC지역의 시간을 표시(지역에 상관없이 동일)
console.log("지역표준시: ", new Date(2016,4,27));//지역에 따라 다른 지역표준시




