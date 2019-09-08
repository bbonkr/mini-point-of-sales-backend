# POS <small>Point Of Sales</small> 시스템

## 요구사항

단순 메뉴를 판매하는 소매점에서 사용하는 판매시점정보관리 시스템

    • 매장관리
    • 메뉴관리
    • 주문관리
    • 고객관리
    • 결재관리 - 이번 구현에서 제외

## 기능

### 매장관리

### 메뉴관리

### 주문관리

주문은 메뉴 목록에서 항목을 추가해서 작성됩니다.

### 고객관리

고객의 전화번호를 입력받아 포인트를 적립할 수 있게 합니다.

발생된 포인트는 다음 구매에 사용할 수 있도록 합니다.

> 전화번호 입력 => 카카오에서 제공하는 기능 연계
> 이번 구현에서 제외

## 설계

![ERD](./erd/mini-pos.png)

> ERD는 [vuerd-front](https://github.com/vuerd/vuerd-front) 프로젝트를 사용해서 작성되었습니다.

storeId 외래키는 저장소 최적화에서 사용합니다.

## 실행

### 개발모드

저장소를 복제한 후 아래 명령으로 의존 패키지를 설치합니다.

```bash
$ npm install
```

프로젝트 디렉터리에 `.env` 파일을 작성합니다.

> 필요한 정보는 `.env.sample` 파일을 참조하십시오.

데이터베이스가 준비되면 아래 명령으로 실행합니다.

```bash
$ npm run dev
```

## API 목록

### 계정

작성방법 생각!

```http
POST: /api/account/signin
```

body

```ts
{
    username: string;
    password: string;
}
```

response:

```ts
{
	success: boolean
	data?: {
		user: User | null
		token: string
	},
	message?: string
}
```
