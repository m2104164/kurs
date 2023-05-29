export class CreateOrderDto {
    deadline: Date;
    items: { id: number; amount: number}[];
}
