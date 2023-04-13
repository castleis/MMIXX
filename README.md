<br>
<br>
<br>
<a href="https://j8a403.p.ssafy.io/">
<img src = "readme_contents/empty.png" width="120" height="128">
<img src = "readme_contents/mmixx_icon_black.png" width="128" height="128">
<br>
<img src = "readme_contents/empty.png" width="60" height="128">
<img src = "readme_contents/mmixx_logo_black.png" width="269" height="121">
</a>

# **`MUSIC MIXING FOR WHOLE NEW EXPERIENCE`**

## **MMIXX 팀**

| 프로필                                                    | 이름 | 역할                                                                                                                                                                       | GitHub                                   |
|--------------------------------------------------------|----|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------|
| <img src="https://github.com/SuhyungK.png" width="50"> | 김수형 | <img src="https://img.shields.io/badge/-FRONTEND-lightblue"> <img src="https://img.shields.io/badge/-PRESENTOR-yellow">                                                  | [@SuhyungK](https://github.com/SuhyungK) |
| <img src="https://github.com/castleis.png" width="50"> | 김성은 | <img src="https://img.shields.io/badge/-FRONTEND-lightblue"> <img src="https://img.shields.io/badge/-ML/DL-orange"> <img src="https://img.shields.io/badge/-CI/CD-gray"> | [@castleis](https://github.com/castleis) |
| <img src="https://github.com/ealswjd.png" width="50">  | 이민정 | <img src="https://img.shields.io/badge/-FRONTEND-lightblue"> <img src="https://img.shields.io/badge/-BACKEND-green">                                                     | [@ealswjd](https://github.com/ealswjd)   |
| <img src="https://github.com/get783.png" width="50">   | 이지연 | <img src="https://img.shields.io/badge/-FRONTEND-lightblue"> <img src="https://img.shields.io/badge/-BACKEND-green">                                                     | [@get783](https://github.com/get783)     |
| <img src="https://github.com/city1616.png" width="50"> | 문승우 | <img src="https://img.shields.io/badge/-BACKEND-green"> <img src="https://img.shields.io/badge/-ML/DL-orange"> <img src="https://img.shields.io/badge/-CI/CD-gray">      | [@city1616](https://github.com/city1616) |
| <img src="https://github.com/GijuAhn.png" width="50">  | 안기주 | <img src="https://img.shields.io/badge/-BACKEND-green"> <img src="https://img.shields.io/badge/-ML/DL-orange"> <img src="https://img.shields.io/badge/-CI/CD-gray">      | [@GijuAhn](https://github.com/GijuAhn)   |


## **목차**
1. [서비스 소개](#서비스-소개)
2. [서비스 특징](#서비스-특징)
3. [딥러닝 아키텍처](#핵심-기능)
4. [서비스 아키텍처](#서비스-아키텍처)
5. [사용 기술](#사용-기술)
6. [API 명세](#API-명세)
7. [화면 설계](#화면-설계)
8. [데이터베이스 설계](#데이터베이스-설계)
9. [유저 가이드](#유저-가이드)


## **서비스 소개**

음악을 듣기만 하는 것이 지루해지셨나요?

***MMIXX*** 는 딥러닝 기반의 음악 믹싱 웹어플리케이션입니다.

곡의 분위기를 변화시킬 수 있는 **Music Style Transfer** 기능과,
연주음(MR) 과 보컬을 분리할 수 있는 **Sound Source Separation** 기능을 활용해 **자신만의 플레이리스트를 만들고 공유**해보세요!


## **서비스 특징**

* 음악 스타일 변환 
  * 웅장한, 신나는, 편안한, 강렬한, 밝은 등 다양한 분위기의 프리셋이 제공됩니다.
  * 원하는 스타일로 곡을 변환해보세요!
* 연주음/보컬 분리
  * 좋아하는 곡의 Inst. 버전을 찾기 어려우셨나요?
  * 연주음(MR)과 보컬을 깔끔하게 분리할 수 있습니다. 노래 연습, 녹음, 믹싱에 활용해보세요.
* 업로드 & 다운로드
  * 원하는 음악을 업로드해 믹싱에 활용해보세요!
  * 모든 파일은 개인 저장소에 저장되며, 다운로드도 가능합니다.
* 플레이리스트
  * 자신만의 플레이리스트를 만들고, 공유해보세요!
  * 다른 사람들이 만든 플레이리스트를 들어보고, 즐겨찾기로 추가할 수도 있습니다.
* 간편한 로그인
  * 구글 아이디로 간편하게 로그인해서 모든 서비스를 즐겨보세요.

## **딥러닝 아키텍처**
### Audio Style Transfer: DeepAFx-ST
 
<img src="readme_contents/deepafx_diagram.png" width="1280">

<img src="readme_contents/deepafx_sound.png" width="1280">


### Sound Source Separation: Spleeter

<img src="readme_contents/spleeter_architecture.jpg" width="1280">

## **서비스 아키텍처**
<img src="readme_contents/MMIXX_system_architecture_real_final.png" width="1280">

## **사용 기술**

| Category | Tech         | Version                 | Dockerization       |
| --- |--------------|-------------------------|---------------------|
| Version Control | GitLab       |                         |                     |
|  | JIRA         |                         |                     |
| Documentation | Notion       |                         |                     |
| Front-End | HTML5        |                         |                     |
|  | CSS3         |                         |                     |
|  | JavaScript   | ES6                     |                     |
|  | React        | 18.2.0                  |                     |
|  | Recoil       |                         |                     |
|  | Node.js      | 18.15.0                 |                     |
| Back-End | Java         | 11                      |                     |
|  | Gradle       | 7.6.1                   |                     |
|  | Spring Boot  | 2.7.10                  |                     |
|  | QueryDSL | 5.0.0                   |                     |
|  | JPA Hibernate |                         |                     |
|  | Python       | 3.8                     |                     |
|  | Django       | 3.2.13                  |                     |
| DataBase | MySQL        | 8.0.32                  |                     |
| Server | AWS EC2      |                         |                     |
|  | AWS S3       |                         |                     |
|  | NginX        | nginx/1.18.0 (Ubuntu)   | Latest Docker Image |
| CI/CD | Docker       | 23.0.1                  |                     |
|  | Jenkins      | 2.387.1                 | Latest Docker Image |

## **API 명세**
<img src="readme_contents/api1.png" width="1280">

<img src="readme_contents/api2.png" width="1280">

## **화면 설계**
<img src="readme_contents/mmixx_figma.png" width="1280">

## **데이터베이스 설계**
<img src="readme_contents/mmixx_erd.png" width="1280">

## **유저 가이드**
### 로그인
![01-login.png](readme_contents%2Fuser_guide_instruction%2F01-login.png)

### 메인 페이지
![02-mainpage.png](readme_contents%2Fuser_guide_instruction%2F02-mainpage.png)

### 파일 업로드
![03-upload1.png](readme_contents%2Fuser_guide_instruction%2F03-upload1.png)

![04-upload2.png](readme_contents%2Fuser_guide_instruction%2F04-upload2.png)

![05-upload3.png](readme_contents%2Fuser_guide_instruction%2F05-upload3.png)

### 마이뮤직 기능
![00-feature-bar.png](readme_contents%2Fuser_guide_instruction%2F00-feature-bar.png)

![000-filter+sort.png](readme_contents%2Fuser_guide_instruction%2F000-filter%2Bsort.png)

### 플레이리스트
![06-pl1.png](readme_contents%2Fuser_guide_instruction%2F06-pl1.png)

![07-pl2.png](readme_contents%2Fuser_guide_instruction%2F07-pl2.png)

![08-pl3.png](readme_contents%2Fuser_guide_instruction%2F08-pl3.png)

![09-pl4.png](readme_contents%2Fuser_guide_instruction%2F09-pl4.png)

![10-pl5.png](readme_contents%2Fuser_guide_instruction%2F10-pl5.png)

![11-pl6.png](readme_contents%2Fuser_guide_instruction%2F11-pl6.png)

![12-pl7.png](readme_contents%2Fuser_guide_instruction%2F12-pl7.png)

![13-pl8.png](readme_contents%2Fuser_guide_instruction%2F13-pl8.png)

### 믹스 (분위기 변환)

![14-mix1.png](readme_contents%2Fuser_guide_instruction%2F14-mix1.png)

![15-mix2.png](readme_contents%2Fuser_guide_instruction%2F15-mix2.png)

![16-mix3.png](readme_contents%2Fuser_guide_instruction%2F16-mix3.png)

![17-mix4.png](readme_contents%2Fuser_guide_instruction%2F17-mix4.png)

![18-mix5.png](readme_contents%2Fuser_guide_instruction%2F18-mix5.png)

![19-mix6.png](readme_contents%2Fuser_guide_instruction%2F19-mix6.png)

### 스플릿 (보컬 제거, MR 추출)

![20-split1.png](readme_contents%2Fuser_guide_instruction%2F20-split1.png)

![21-split2.png](readme_contents%2Fuser_guide_instruction%2F21-split2.png)

![22-split3.png](readme_contents%2Fuser_guide_instruction%2F22-split3.png)
