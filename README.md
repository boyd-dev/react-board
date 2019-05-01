
# react-Board with uPort

react.js로 구현된, 글쓰기만 가능한 간단한 게시판입니다. 프론트엔드는 react, 백엔드는 [koa](https://koajs.com) 프레임워크를 사용합니다. 데이터베이스는 MySQL입니다.   

### 프론트엔드

create-react-app으로 생성된 프로젝트로 만들어졌습니다. 게시판 목록은 [ag-Grid](https://www.ag-grid.com/)를 사용하였고 글쓰기는 [CKEditor4(Basic)](https://ckeditor.com/)을 이용합니다.
스타일이나 디자인은 최소화합니다.😛

* react-redux  
redux, react-redux를 사용하여 애플리케이션 state를 관리합니다. 경우에 따라서는 해당 컴포넌트에서만 사용되는 state를 만들기도 합니다. 

* redux-saga  
백엔드의 REST-API와 통신하기 위해 미들웨어 [redux-saga](https://github.com/redux-saga/redux-saga)를 사용합니다. redux-saga는 애플리케이션이 "side-effect"를 일으킬 때 애플리케이션의 상태를 보다 쉽게 관리할 수 있도록 해주는 미들웨어입니다. 이 예제처럼 백엔드 서버의 REST-API를 호출하는 것이 대표적인 "side-effect"가 되겠습니다. redux-thunk와는 다르게 "declarative"하게 처리합니다. redux-thunk에서는 thunk라는 함수를 작성하여 action 생성 함수에 넣어주고 다시 dispatch하는 방식이지만 redux-saga는 saga라고 부르는 generator 함수를 작성하며 action은 변경되지 않습니다. saga 함수를 코드에서 직접 호출하지 않고 특정 action이 dispatch될 때 미들웨어가 실행합니다.  

* axios  
[axios](https://github.com/axios/axios)는 프라미스 기반의 HTTP 클라이언트 라이브러리입니다. 게시판 CRUD를 위한 HTTP 메소드를 쉽게 실행할 수 있도록 합니다.

* uport-connect    
[uport](https://www.uport.me/)는 컨센시스에서 개발한 이더리움 기반의 탈중앙화 신원증명 프레임워크입니다. 게시판을 사용하기 위해서 로그인을 할 때 uport 모바일 앱을 사용하여 본인의 이름을 애플리케이션에게 제공합니다.  uport 모바일 앱에서 자기주권ID(self-sovereign identifier)인 분산ID(Decentralized ID, DID)를 생성한 후 애플리케이션이 사용자의 정보를 요청합니다. 
사용자는 요청 수락을 통해 애플리케이션에 로그인할 수 있습니다. 사용자의 "존재"는 이더리움에 "앵커(anchor)"되어 있으므로 전세계 어디에서도(이더리움이 연결되는 어느 곳이든) 자신의 "존재"를 제출할 수 있습니다.

<b>이 예제에서는 로그인하지 않아도 dummy user로 게시판을 사용할 수 있도록 되어 있습니다.</b>

### 백엔드

기본적으로 koa 웹 프레임워크를 사용합니다. 

 * Sequelize  
[Sequelize](http://docs.sequelizejs.com/)는 자바스크립트 ORM 라이브러리 입니다. SQL을 사용하지 않고 모델을 사용하여 CRUD를 처리합니다.
따라서 MySQL에서 미리 테이블을 생성하지 않습니다. 백엔드 애플리케이션이 구동될 때 정의된 모델을 사용하여 테이블을 생성합니다. 이 예제에서는 Board라는 모델이 게시판 테이블 역할을 합니다. 개발모드에서는 재시작할 때마다 테이블을 drop 후 다시 생성합니다(당연히 데이터가 삭제됩니다). app.js 에서 force 옵션을 false로 변경하여 데이터를 유지할 수 있습니다.  

```
models.sequelize.sync({force: false});
```

 * MySQL  
백엔드에서 MySQL과 연계하기 위해서 mysql2 패키지를 설치합니다.

### 예제 실행

1) 프론트엔드 
front-end 디렉토리에서 다음을 실행하십시오.

```
npm run start
```

2) 백엔드

```
npm run start:dev
```


### uport 사용법

1)  모바일 기기에 uport를 설치합니다. 

2) 프론트 애플리케이션에서 [Login wirh uPort]를 클릭합니다(QR코드가 표시될 때까지 약간 지연이 발생할 수 있습니다).

3) 모바일 uport 앱을 사용하여 QR 코드를 스캔합니다.  앱에서 QR 코드 스캔 버튼을 누르십시오.

4) 잠시 후 다음과 같은 화면이 표시됩니다. [Login with Existing]을 누릅니다.

5) 사용자 정보가 표시됩니다. 이 정보를 애플리케이션에 제공하여 로그인하려면 [Share to Login]을 누릅니다.

6) 잠시 후 사용자가 제공한 정보(이름)이 프론트 애플리케이션에 표시됩니다(다소 지연이 발생할 수 있습니다).

7) react-Board를 클릭하고 게시판을 사용합니다.

8) 프론트 애플리케이션에서 로그아웃하려면 메인 화면에서 [Logout from uPort]를 클릭하십시오.


### ⚠️ Warning!

디폴트로 이더리움 <b>Rinkeby 테스트넷</b>에 존재증명을 기록하므로 실제 이더를 송금하지 마십시오!


