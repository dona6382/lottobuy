# lottobuy

## 프로젝트 목적
* 로또 구매 프로그램

## 상세 이유
* 매번 온라인으로 들어가서 구매하는 과정이 귀찮아서 만들게 됨

## 주요 기술
* 로또 자동구매
* 구매한 로또에 대한 결과 정보를 토요일 저녁에 전달

## 테이블 목록
1. 구매 목록
2. 주차별 로또 당첨 번호
3. 계정 정보(대칭키 암호화)
4. 토요일 저녁에 메시지 전달 결과 히스토리


## Setting Prettier
* install 이후에 IDE 에 prettier 설정을 해야 정상 작동합니다.
* Intellj 기준으로 설명합니다.
    * file > settings > Languages & Frameworks > Prettier 메뉴 접속
    * 'Prettier Package'(2번째 input)에는 node_modules 에 설치되어 있는 prettier  경로를 설정합니다.
        * 보통 '~\IdeaProjects\funds_project\node_modules\prettier' 로 설정하면 됨
    * 아래 On code reformat, On Save 체크 후 IDE 재시작
    * 이후 코드 수정 후 ctrl + s (Mac 은 cmd + s)를 하면 prettier 적용됩니다.
* Prettier 관련 설정은 .prettierrc 를 수정하시면 됩니다.

## Tech stack
* nodejs (18+) & TypeScript (^4.9.5)
* 퍼펫티어
* 서버, 크롤링 : node.js, nest.js
* 텔레그램 봇 : python
* 데이터베이스 : 미정, typeOrm

#
우선 js로 만들고 type으로 변환
- 마이그레이션 작업도 같이하고 싶어서

# 질문
만약 구매 프로세스가 진행중인데 또 구매 요청이 온다면 어떻게 동작할까?
- 메시지큐에 넣어볼까?
