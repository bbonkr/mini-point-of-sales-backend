import { IPrimaryEntityBase } from './PrimaryEntityBase';
import { PaymentMethod } from '../enums/paymentMethod';
import { BusinessTypes } from '../enums/BusinessTypes';

export interface ICustomer extends IPrimaryEntityBase {
    /**
     * 휴대전화번호
     */
    mobile: string;

    /**
     * 이름
     */
    name?: string;

    stores?: IStore[];

    payments?: IPayment[];
}

export interface IMenu extends IPrimaryEntityBase {
    /** 메뉴 이름 */
    name: string;

    /** 가격 */
    price: number;

    /** 상품 이미지 url */
    image: string;
    /** 설명 */
    description?: string;
    /** 적립 포인트 */
    point: number;

    storeId?: string;

    store?: IStore;
}

export interface IOrder extends IPrimaryEntityBase {
    /** 주문 가격 */
    amounts: number;

    /** 할인 금액 */
    discount: number;

    storeId?: string;

    store?: IStore;

    orderDetails?: IOrderDetail[];

    payments?: IPayment[];
}

export interface IOrderDetail extends IPrimaryEntityBase {
    /** 메뉴 이름 */
    name: string;

    /** 메뉴 단품 가격 */
    price: number;

    /** 수량 */
    quantity: number;

    /** 할인 금액 */
    discount: number;

    /** 포장 여부 */
    takeout: boolean;

    storeId?: string;

    store?: IStore;

    orderId?: string;

    order?: IOrder;
}

export interface IPayment extends IPrimaryEntityBase {
    /** 주문금액 */
    orderAmount: number;

    /** 사용 포인트 */
    pointUsed: number;

    /** 결재 대상 금액 */
    amount: number;

    /** 공급가액 */
    value: number;

    /** 부가세 */
    tax: number;

    /** 결재방법 */
    payMethod: PaymentMethod;

    /** 할부 개월 */
    installment: number;

    /** 적립 포인트 */
    pointEarned: number;

    /** 취소 여부 */
    isCancelled: boolean;

    storeId: string;

    store: IStore;

    orderId: string;

    order: IOrder;

    customerId: string;

    customer: ICustomer;
}

export interface IRole extends IPrimaryEntityBase {
    /** 역할 이름 */
    name: string;

    users?: IUser[];
}

export interface IStore extends IPrimaryEntityBase {
    /** 매장 이름 */
    name: string;

    /** 업종 - 필드 정리 필요 */
    businessType: BusinessTypes;

    /** 유효기간 시작 */
    validAt?: Date;

    /** 유효기간 종료 */
    validUntil?: Date;

    administrations?: IUser[];

    customers?: ICustomer[];

    payments?: IPayment[];

    orderDetails?: IOrderDetail[];

    orders?: IOrder[];

    menus?: IMenu[];
}

export interface IUser extends IPrimaryEntityBase {
    /** 사용자 계정 이름 */
    username: string;

    /** 사용자 이름 */
    displayName: string;

    /** 전자우편주소 */
    email: string;

    /** 비밀번호 */
    password?: string;

    /** 전자우편주소 확인 여부 */
    isEmailConfirmed: boolean;

    /** 사용자 이미지 URL */
    photo: string;

    /** 역할 */
    roles?: IRole[];

    /** 관리 매장 */
    stores: IStore[];
}
