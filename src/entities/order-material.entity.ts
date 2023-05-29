import {ViewEntity, Connection, ViewColumn} from "typeorm";
import { OrderFurniture } from "src/entities/order-furniture.entity"
import { FurnitureMaterial } from "src/entities/furnitureMaterial.entity"

@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
    .select("order_furniture.orderId", "orderId")
    .addSelect("furniture_material.materialId", "materialId")
    .addSelect("SUM(furniture_material.quantity * order_furniture.quantity)", "quantity")
    .from(OrderFurniture, "order_furniture")
    .innerJoin(FurnitureMaterial, "furniture_material", "furniture_material.furnitureId = order_furniture.furnitureId")
    .groupBy("order_furniture.orderId")
    .addGroupBy("furniture_material.materialId")
})

export class OrderMaterial {
  @ViewColumn()
  orderId: number;

  @ViewColumn()
  materialId: number;

  @ViewColumn()
  quantity: number;
}
