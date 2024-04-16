
/////////////////// updateTime() 함수 정의////////////////////////////////
////////////////////////////////현재 시간 정의 ////////////////////////////
function updateTime() {
    const now = new Date(); // 현재 시간을 가져옴
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;
    document.getElementById('currenttime').innerHTML = `<h1>${currentTime}</h1>`;

    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    const currentDate = now.toLocaleDateString('ko-KR', options);
    document.getElementById('currentdate').innerHTML = currentDate;
}

// setInterval(updateTime, 1000);

////////////////////////////////////////////////////////////////////
////////////////////// 버스 api /////////////////////////////////// 

function getBusInformation() {
    var xhr = new XMLHttpRequest();
    var url = 'http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + config.bus_API; /*Service Key*/
    queryParams += '&' + encodeURIComponent('stationId') + '=' + encodeURIComponent('200000078'); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            // XML 문자열을 파싱하여 DOM 객체로 변환
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(this.responseText, "text/xml");

            // busArrivalList 요소들을 가져옴
            var busArrivalLists = xmlDoc.getElementsByTagName("busArrivalList");

            // JSON 객체로 변환할 배열 생성
            var jsonData = [];

            document.getElementById("bus_route").innerHTML = ''
            // 각 busArrivalList에 대해 반복하여 데이터를 추출하여 JSON 객체로 변환 후 배열에 추가
            for (var i = 0; i < 4; i++) {
                var busArrivalList = busArrivalLists[i];

                // 필요한 정보를 가져옴
                var routeId = busArrivalList.getElementsByTagName("routeId")[0].textContent;
                var locationNo1 = busArrivalList.getElementsByTagName("locationNo1")[0].textContent;
                var preddictTime1 = busArrivalList.getElementsByTagName("predictTime1")[0].textContent;

                // JSON 객체로 변환하여 배열에 추가
                var jsonDataItem = {
                    "routeId": routeId,
                    "preddictTime1": preddictTime1,
                    "locationNo1": locationNo1
                };
                //              <p id="1st_bus">102번 도착예정시간: 12분, 10정거장 전</p>
                //              <p id="2nd_bus">103번 도착예정시간: 2분, 2정거장 전</p>
                //              <p id="3rd_bus">311번 도착예정시간: 1분, 1정거장 전</p>
                jsonData.push(jsonDataItem);
                document.getElementById("bus_route").innerHTML += `<p>${routeId}번 도착 예정 시간 : ${preddictTime1}분, ${locationNo1}정거장 전 </p>`
            }

            // JSON 문자열로 변환하여 출력
            console.log(JSON.stringify(jsonData));


        }

    };

    xhr.send('');
}

// getBusInformation()
// setInterval(getBusInformation, 1000*60)

/////////////////////////////////////////////////////////////////////
/////////////////////////// 날씨 api ////////////////////////////////
//////////////////////////////////////////////////////////////////////
var weatherDescription;
var tempperature;
var humidity;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude; // 위도
            var lng = position.coords.longitude; // 경도


            var apiKey = config.openWeather_API;
            var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then((data) => {

                    var cityName = data.name;
                    var weather_icon = data.weather[0].icon
                    weatherDescription = data.weather[0].description;
                    tempperature = data.main.temp;
                    humidity = data.main.humidity;

                    document.getElementById('city_Name').innerHTML = `도시 : ${cityName}`
                    document.getElementById('city_weather').innerHTML = `날씨 : ${weatherDescription}`
                    document.getElementById('city_temperature').innerHTML = `온도 : ${tempperature.toFixed(1)} °C`
                    document.getElementById('city_humanity').innerHTML = `습도 : ${humidity}%`
                    document.getElementById('weather_icon').src = `https://openweathermap.org/img/wn/${weather_icon}@2x.png`
                })
                .catch(() => {
                    console.log("날씨 정보를 가져오는 중 오류 발생 : ", error);
                    document.getElementById('weather-info').innerHTML = "날씨 정보를 가져올 수 없습니다.";
                })
        })
    }
}

// getLocation();
// setInterval(getLocation(), 1000 * 3600);