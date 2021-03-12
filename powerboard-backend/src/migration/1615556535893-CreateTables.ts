import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1615556535893 implements MigrationInterface {
    name = 'CreateTables1615556535893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "business_unit" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "parent_id" integer NOT NULL, "root_parent_id" integer NOT NULL, CONSTRAINT "PK_842dd03ad7a179a295f55c01008" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "business_unit_id" integer, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sprint_status" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, CONSTRAINT "PK_424723b856615d12cff927feb48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sprint_work_unit" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "work_unit" character varying NOT NULL, CONSTRAINT "PK_1efd0999b5f820ec7038e807bfd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sprint" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "sprint_number" integer NOT NULL, "start_date" character varying(255) NOT NULL, "end_date" character varying(255) NOT NULL, "status" integer, "team_id" integer, "work_unit" integer, CONSTRAINT "PK_f371c7b5c4bc62fb2ba2bdb9f61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_status" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "client_rating" integer NOT NULL, "sprintId" integer, CONSTRAINT "REL_16a31ed3a3cc5249369bbd25c9" UNIQUE ("sprintId"), CONSTRAINT "PK_2fcaf8756581eab94bba1d006c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "code_quality_snapshot" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "bugs" integer NOT NULL, "debt" integer NOT NULL, "code_coverage" integer NOT NULL, "status" character varying(255) NOT NULL, "snapshot_time" TIMESTAMP NOT NULL, "team_id" integer, CONSTRAINT "PK_f8d07080172f9eb6c516154ed48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "teamId" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sprint_metric" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_abdcbac9e92b1c6bbd0a44d7cfe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sprint_snapshot" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "date_time" character varying NOT NULL, "sprint_id" integer, CONSTRAINT "PK_6e1a42261df25461db8e2118701" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sprint_snapshot_metric" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "value" character varying NOT NULL, "snapshot_id" integer, "metric_id" integer, CONSTRAINT "PK_126e53ff91d28e182cd19086006" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team_spirit" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "team_spirit_rating" integer NOT NULL, "sprint_id" integer, CONSTRAINT "REL_c258101a9e329fc1cf1ca46019" UNIQUE ("sprint_id"), CONSTRAINT "PK_f4f2b4281be72d5392d9efb8466" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_780f295d5c3ed479ac1358a9f01" FOREIGN KEY ("business_unit_id") REFERENCES "business_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD CONSTRAINT "FK_39768350e23ee9800f4b30bb94f" FOREIGN KEY ("status") REFERENCES "sprint_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD CONSTRAINT "FK_738321a380b6d8e5266516b5302" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD CONSTRAINT "FK_b376aaa2ef5e4724f3508cf5f33" FOREIGN KEY ("work_unit") REFERENCES "sprint_work_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_status" ADD CONSTRAINT "FK_16a31ed3a3cc5249369bbd25c9a" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "code_quality_snapshot" ADD CONSTRAINT "FK_03be61d9d46dd39f1f355862e32" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_1e89f1fd137dc7fea7242377e25" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprint_snapshot" ADD CONSTRAINT "FK_fb748d58ef594e8505aa9970d98" FOREIGN KEY ("sprint_id") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprint_snapshot_metric" ADD CONSTRAINT "FK_ea96cf0fa988134725f6ad0984b" FOREIGN KEY ("snapshot_id") REFERENCES "sprint_snapshot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprint_snapshot_metric" ADD CONSTRAINT "FK_32ee1ecd7212edf6dad1a86ee6a" FOREIGN KEY ("metric_id") REFERENCES "sprint_metric"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_spirit" ADD CONSTRAINT "FK_c258101a9e329fc1cf1ca460195" FOREIGN KEY ("sprint_id") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_spirit" DROP CONSTRAINT "FK_c258101a9e329fc1cf1ca460195"`);
        await queryRunner.query(`ALTER TABLE "sprint_snapshot_metric" DROP CONSTRAINT "FK_32ee1ecd7212edf6dad1a86ee6a"`);
        await queryRunner.query(`ALTER TABLE "sprint_snapshot_metric" DROP CONSTRAINT "FK_ea96cf0fa988134725f6ad0984b"`);
        await queryRunner.query(`ALTER TABLE "sprint_snapshot" DROP CONSTRAINT "FK_fb748d58ef594e8505aa9970d98"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_1e89f1fd137dc7fea7242377e25"`);
        await queryRunner.query(`ALTER TABLE "code_quality_snapshot" DROP CONSTRAINT "FK_03be61d9d46dd39f1f355862e32"`);
        await queryRunner.query(`ALTER TABLE "client_status" DROP CONSTRAINT "FK_16a31ed3a3cc5249369bbd25c9a"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_b376aaa2ef5e4724f3508cf5f33"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_738321a380b6d8e5266516b5302"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_39768350e23ee9800f4b30bb94f"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_780f295d5c3ed479ac1358a9f01"`);
        await queryRunner.query(`DROP TABLE "team_spirit"`);
        await queryRunner.query(`DROP TABLE "sprint_snapshot_metric"`);
        await queryRunner.query(`DROP TABLE "sprint_snapshot"`);
        await queryRunner.query(`DROP TABLE "sprint_metric"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "code_quality_snapshot"`);
        await queryRunner.query(`DROP TABLE "client_status"`);
        await queryRunner.query(`DROP TABLE "sprint"`);
        await queryRunner.query(`DROP TABLE "sprint_work_unit"`);
        await queryRunner.query(`DROP TABLE "sprint_status"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP TABLE "business_unit"`);
    }

}
