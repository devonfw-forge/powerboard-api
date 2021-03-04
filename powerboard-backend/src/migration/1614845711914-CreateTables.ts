import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1614845711914 implements MigrationInterface {
    name = 'CreateTables1614845711914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "burndown" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "estimatedWork" integer NOT NULL, "actualWork" integer NOT NULL, "SprintDays" integer NOT NULL, "sprintId" integer, CONSTRAINT "PK_4e86e2571105fc6fda254888e5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "burndown" ADD CONSTRAINT "FK_160aa1fad73efa69bf736808847" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "burndown" DROP CONSTRAINT "FK_160aa1fad73efa69bf736808847"`);
        await queryRunner.query(`DROP TABLE "burndown"`);
    }

}
