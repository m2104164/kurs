export class CreateFurnitureDto {
    name: string;
    materials: { id: number; amount: number}[];
}
