# BUSTOP_openAPI
경기도 버스 도착 시간을 알려 주는 기능을 가진 웹페이지입니다.


## 프로젝트 개요

이 프로젝트는 현재 시간, 날씨 정보, 버스 도착 정보를 실시간으로 제공하는 웹 애플리케이션입니다. 사용자는 현재 위치 기반의 날씨 정보를 확인하고, 버스 정류장에서의 버스 도착 시간을 확인할 수 있습니다. 또한, 날씨와 기온에 따라 옷차림 추천도 받을 수 있습니다.

## 사용된 기술 스택

- HTML
- CSS
- JavaScript

## 기능 설명

1. **현재 시간 업데이트**
   - 함수는 현재 시간을 실시간으로 업데이트하여 웹 페이지에 표시합니다.
   

2. **버스 도착 정보**
   - `getBusInformation()` 함수는 API를 통해 특정 정류장의 버스 도착 정보를 가져와 웹 페이지에 표시합니다.
   - `setInterval(getBusInformation, 1000 * 60)`을 통해 1분마다 버스 정보를 갱신합니다.

3. **날씨 정보**
   - poenweatherAPI를 이용해 사용자의 현재 위치를 기반으로 날씨 정보를 가져와 웹 페이지에 표시합니다.
   - 1시간마다 날씨 정보를 갱신합니다.

4. **옷차림 추천**
   - Google Generative AI API()를 사용하여 현재 날씨와 기온에 맞는 옷차림을 추천합니다.

## 파일 구조

- `index.html`: 메인 HTML 파일
- `style.css`: 스타일시트 파일
- `main.js`: 주요 JavaScript 파일
- `api_keys.js`: API 키를 저장하는 파일

## 사용된 API
1. 경기도 버스 정보 API
http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList

2. 날씨 정보 API
https://api.openweathermap.org/data/2.5/weather

3. Google Generative AI API
https://esm.run/@google/generative-ai
