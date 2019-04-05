# World News Aggregator

# Introduction
뉴스 API를 이용해 클라이언트가 입력한 검색어, 검색 소스를 기반으로 뉴스 리스트를 보여주는 웹 애플리케이션입니다.
<br>
![](vanilla-world-news.gif)

## Setup

Install dependencies

```sh
$ yarn install (or npm install)
```

## Development

```sh
$ yarn start (or npm start)
# visit http://localhost:3000
```

## Features

- 사용자가 검색어를 입력할 수 있습니다.
- 사용자가 검색을 원하는 기간을 설정할 수 있는 UI가 있습니다.. (예: 2018년 2월 1일 - 2018년 2월 5일 뉴스 검색)
- 검색을 원하는 소스를 선택할 수 있어야 합니다. (다중 선택 가능, 최대 20개)
  - 검색 소스는 [News API Source](https://newsapi.org/docs/endpoints/sources)를 이용했습니다.
- 검색 결과는 [News API Everything](https://newsapi.org/docs/endpoints/everything)을 이용했습니다.
- 검색 결과는 항상 "인기" 순으로 정렬됩니다.
- 검색 결과 화면 아래로 스크롤을 내릴 경우, 더 이상 검색 결과가 없을때까지 계속하여 30개씩 더 보여줍니다.
- 사용자는 검색 결과를 "리스트" 형식 혹은 "카드" 형식으로 선택할 수 있습니다.
- "리스트" 형식의 각 검색 결과는 다음 정보를 보여줍니다.
  - 검색 소스 이름
  - 뉴스 작성자
  - 뉴스 제목
  - 뉴스 작성일
- "카드" 형식의 각 검색 결과는 다음 정보를 보여줍니다.
  - 뉴스 이미지
  - 뉴스 작성자
  - 뉴스 제목
- 각 검색 결과를 클릭할 경우, Modal을 이용하여 다음과 같은 상세 정보를 보여줍니다.
  - 검색 소스 이름
  - 뉴스 작성자
  - 뉴스 제목
  - 뉴스 작성일
  - 뉴스 설명
  - 뉴스 내용
  - 뉴스 이미지
  - 뉴스 링크
- 모달 바깥 부분을 클릭할 경우, 모달은 사라집니다.

### Tech
- React
- HTML5
- CSS3
- Sass
