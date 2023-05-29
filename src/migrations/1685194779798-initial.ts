import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1685194779798 implements MigrationInterface {
    name = 'Initial1685194779798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "materials" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_2fd1a93ecb222a28bef28663fa0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "furnitures" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_7effa6aa3ab998c431ea028393a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "furniture_material" ("material_id" integer NOT NULL, "furniture_id" integer NOT NULL, CONSTRAINT "PK_585c85719f9b81fde022e2e95bc" PRIMARY KEY ("material_id", "furniture_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_71df08a7020dcbab0535118c4a" ON "furniture_material" ("material_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_99de947ae283250a9295f71266" ON "furniture_material" ("furniture_id") `);
        await queryRunner.query(`ALTER TABLE "furniture_material" ADD CONSTRAINT "FK_71df08a7020dcbab0535118c4a2" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "furniture_material" ADD CONSTRAINT "FK_99de947ae283250a9295f712665" FOREIGN KEY ("furniture_id") REFERENCES "furnitures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "furniture_material" DROP CONSTRAINT "FK_99de947ae283250a9295f712665"`);
        await queryRunner.query(`ALTER TABLE "furniture_material" DROP CONSTRAINT "FK_71df08a7020dcbab0535118c4a2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_99de947ae283250a9295f71266"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_71df08a7020dcbab0535118c4a"`);
        await queryRunner.query(`DROP TABLE "furniture_material"`);
        await queryRunner.query(`DROP TABLE "furnitures"`);
        await queryRunner.query(`DROP TABLE "materials"`);
    }

}
