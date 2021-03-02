import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1614692760036 implements MigrationInterface {
    name = 'CreateTables1614692760036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "business_unit" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "parent_id" integer NOT NULL, "root_parent_id" integer NOT NULL, CONSTRAINT "PK_842dd03ad7a179a295f55c01008" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "businessUnitId" integer, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sprint" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "sprintNumber" integer NOT NULL, "status" integer NOT NULL, "startDate" character varying(255) NOT NULL, "endDate" character varying(255) NOT NULL, "teamId" integer, CONSTRAINT "PK_f371c7b5c4bc62fb2ba2bdb9f61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_status" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "clientRating" integer NOT NULL, "teamId" integer, "sprintId" integer, CONSTRAINT "REL_f432f469a6b18f640393bf2b14" UNIQUE ("teamId"), CONSTRAINT "REL_16a31ed3a3cc5249369bbd25c9" UNIQUE ("sprintId"), CONSTRAINT "PK_2fcaf8756581eab94bba1d006c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "code_quality_snapshot" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "bugs" integer NOT NULL, "debt" integer NOT NULL, "codeCoverage" integer NOT NULL, "status" character varying(255) NOT NULL, "codeQualityTime" TIMESTAMP NOT NULL, "teamId" integer, CONSTRAINT "PK_f8d07080172f9eb6c516154ed48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "teamId" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team_spirit" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "teamSpiritRating" integer NOT NULL, "teamId" integer, "sprintId" integer, CONSTRAINT "REL_a2722987addc40a25d8fdaac87" UNIQUE ("teamId"), CONSTRAINT "REL_b9025695db2c4c5d36bbaf2312" UNIQUE ("sprintId"), CONSTRAINT "PK_f4f2b4281be72d5392d9efb8466" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_1a5fdd6e2d0ba30d0e6b61b27d8" FOREIGN KEY ("businessUnitId") REFERENCES "business_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD CONSTRAINT "FK_a075246e2ee59a81a2e241c0f10" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_status" ADD CONSTRAINT "FK_f432f469a6b18f640393bf2b149" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_status" ADD CONSTRAINT "FK_16a31ed3a3cc5249369bbd25c9a" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "code_quality_snapshot" ADD CONSTRAINT "FK_bc83bdeb0eab72e39887e7686a5" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_1e89f1fd137dc7fea7242377e25" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_spirit" ADD CONSTRAINT "FK_a2722987addc40a25d8fdaac871" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_spirit" ADD CONSTRAINT "FK_b9025695db2c4c5d36bbaf23120" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_spirit" DROP CONSTRAINT "FK_b9025695db2c4c5d36bbaf23120"`);
        await queryRunner.query(`ALTER TABLE "team_spirit" DROP CONSTRAINT "FK_a2722987addc40a25d8fdaac871"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_1e89f1fd137dc7fea7242377e25"`);
        await queryRunner.query(`ALTER TABLE "code_quality_snapshot" DROP CONSTRAINT "FK_bc83bdeb0eab72e39887e7686a5"`);
        await queryRunner.query(`ALTER TABLE "client_status" DROP CONSTRAINT "FK_16a31ed3a3cc5249369bbd25c9a"`);
        await queryRunner.query(`ALTER TABLE "client_status" DROP CONSTRAINT "FK_f432f469a6b18f640393bf2b149"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_a075246e2ee59a81a2e241c0f10"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_1a5fdd6e2d0ba30d0e6b61b27d8"`);
        await queryRunner.query(`DROP TABLE "team_spirit"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "code_quality_snapshot"`);
        await queryRunner.query(`DROP TABLE "client_status"`);
        await queryRunner.query(`DROP TABLE "sprint"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP TABLE "business_unit"`);
    }

}
