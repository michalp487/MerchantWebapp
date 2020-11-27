import { IBasketItem } from './basket-item';

export interface IBasketItemResponse {
    basketItems: IBasketItem[];
    amount: number;
}
