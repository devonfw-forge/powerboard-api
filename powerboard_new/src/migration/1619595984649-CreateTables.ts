import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1619595984649 implements MigrationInterface {
    name = 'CreateTables1619595984649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "business_unit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "parent_id" character varying NOT NULL, "root_parent_id" character varying NOT NULL, CONSTRAINT "PK_842dd03ad7a179a295f55c01008" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "logo" character varying(3000), "business_unit_id" uuid, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_info" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying(255) NOT NULL, "last_name" character varying(255), "center" character varying(255), "email" character varying(255) NOT NULL, "team_spirit_name" character varying(255), CONSTRAINT "PK_273a06d6cdc2085ee1ce7638b24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" integer NOT NULL DEFAULT '0', "user_info_id" uuid, "teamId" uuid, CONSTRAINT "REL_ee24a311e8099f9f44424df108" UNIQUE ("user_info_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "daily_meeting" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying(255) NOT NULL, "daily_meeting_link" character varying(5000) NOT NULL, "daily_team_id" uuid, CONSTRAINT "PK_ce7d6a7e510e6c079f546b247bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sprint_status" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, CONSTRAINT "PK_424723b856615d12cff927feb48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sprint_work_unit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "work_unit" character varying NOT NULL, CONSTRAINT "PK_1efd0999b5f820ec7038e807bfd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sprint" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "sprint_number" integer NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "status" uuid, "team_id" uuid, "work_unit" uuid, CONSTRAINT "PK_f371c7b5c4bc62fb2ba2bdb9f61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_status" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "client_rating" integer NOT NULL, "sprintId" uuid, CONSTRAINT "REL_16a31ed3a3cc5249369bbd25c9" UNIQUE ("sprintId"), CONSTRAINT "PK_2fcaf8756581eab94bba1d006c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "code_quality_snapshot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "bugs" integer NOT NULL, "debt" integer NOT NULL, "code_coverage" integer NOT NULL, "status" character varying(255) NOT NULL, "snapshot_time" TIMESTAMP NOT NULL, "team_id" uuid, CONSTRAINT "PK_f8d07080172f9eb6c516154ed48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sprint_metric" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_abdcbac9e92b1c6bbd0a44d7cfe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sprint_snapshot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "date_time" TIMESTAMP NOT NULL, "sprint_id" uuid, CONSTRAINT "PK_6e1a42261df25461db8e2118701" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sprint_snapshot_metric" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "value" character varying NOT NULL, "snapshot_id" uuid, "metric_id" uuid, CONSTRAINT "PK_126e53ff91d28e182cd19086006" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team_spirit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "team_spirit_rating" integer NOT NULL, "sprint_id" uuid, CONSTRAINT "REL_c258101a9e329fc1cf1ca46019" UNIQUE ("sprint_id"), CONSTRAINT "PK_f4f2b4281be72d5392d9efb8466" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "image" character varying(3000) NOT NULL, "image_team_id" uuid, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "videos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying(3000) NOT NULL, "video_team_id" uuid, CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team_links" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "link" character varying(5000) NOT NULL, "team_id" uuid, CONSTRAINT "PK_259fb255d02d3404b08279f41fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "visibility" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "daily_meeting" boolean, "team_link" boolean, "images" boolean, "videos" boolean, "visibility_team_id" uuid, CONSTRAINT "REL_396c9b89d74447b5dd2e60b9b2" UNIQUE ("visibility_team_id"), CONSTRAINT "PK_8f15c8e8a76e82ac50fb9cbb110" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_780f295d5c3ed479ac1358a9f01" FOREIGN KEY ("business_unit_id") REFERENCES "business_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_ee24a311e8099f9f44424df108e" FOREIGN KEY ("user_info_id") REFERENCES "user_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_1e89f1fd137dc7fea7242377e25" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_meeting" ADD CONSTRAINT "FK_0654efb07db0f680ea953c810c6" FOREIGN KEY ("daily_team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD CONSTRAINT "FK_39768350e23ee9800f4b30bb94f" FOREIGN KEY ("status") REFERENCES "sprint_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD CONSTRAINT "FK_738321a380b6d8e5266516b5302" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD CONSTRAINT "FK_b376aaa2ef5e4724f3508cf5f33" FOREIGN KEY ("work_unit") REFERENCES "sprint_work_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_status" ADD CONSTRAINT "FK_16a31ed3a3cc5249369bbd25c9a" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "code_quality_snapshot" ADD CONSTRAINT "FK_03be61d9d46dd39f1f355862e32" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprint_snapshot" ADD CONSTRAINT "FK_fb748d58ef594e8505aa9970d98" FOREIGN KEY ("sprint_id") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprint_snapshot_metric" ADD CONSTRAINT "FK_ea96cf0fa988134725f6ad0984b" FOREIGN KEY ("snapshot_id") REFERENCES "sprint_snapshot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprint_snapshot_metric" ADD CONSTRAINT "FK_32ee1ecd7212edf6dad1a86ee6a" FOREIGN KEY ("metric_id") REFERENCES "sprint_metric"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_spirit" ADD CONSTRAINT "FK_c258101a9e329fc1cf1ca460195" FOREIGN KEY ("sprint_id") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_ad3659fcd491b5a0bb65af47b5f" FOREIGN KEY ("image_team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "videos" ADD CONSTRAINT "FK_d20b5471e94253b5c2f194016b7" FOREIGN KEY ("video_team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_links" ADD CONSTRAINT "FK_e2facb7b8634882f8a0ee04979f" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "visibility" ADD CONSTRAINT "FK_396c9b89d74447b5dd2e60b9b24" FOREIGN KEY ("visibility_team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "visibility" DROP CONSTRAINT "FK_396c9b89d74447b5dd2e60b9b24"`);
        await queryRunner.query(`ALTER TABLE "team_links" DROP CONSTRAINT "FK_e2facb7b8634882f8a0ee04979f"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "FK_d20b5471e94253b5c2f194016b7"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_ad3659fcd491b5a0bb65af47b5f"`);
        await queryRunner.query(`ALTER TABLE "team_spirit" DROP CONSTRAINT "FK_c258101a9e329fc1cf1ca460195"`);
        await queryRunner.query(`ALTER TABLE "sprint_snapshot_metric" DROP CONSTRAINT "FK_32ee1ecd7212edf6dad1a86ee6a"`);
        await queryRunner.query(`ALTER TABLE "sprint_snapshot_metric" DROP CONSTRAINT "FK_ea96cf0fa988134725f6ad0984b"`);
        await queryRunner.query(`ALTER TABLE "sprint_snapshot" DROP CONSTRAINT "FK_fb748d58ef594e8505aa9970d98"`);
        await queryRunner.query(`ALTER TABLE "code_quality_snapshot" DROP CONSTRAINT "FK_03be61d9d46dd39f1f355862e32"`);
        await queryRunner.query(`ALTER TABLE "client_status" DROP CONSTRAINT "FK_16a31ed3a3cc5249369bbd25c9a"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_b376aaa2ef5e4724f3508cf5f33"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_738321a380b6d8e5266516b5302"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_39768350e23ee9800f4b30bb94f"`);
        await queryRunner.query(`ALTER TABLE "daily_meeting" DROP CONSTRAINT "FK_0654efb07db0f680ea953c810c6"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_1e89f1fd137dc7fea7242377e25"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ee24a311e8099f9f44424df108e"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_780f295d5c3ed479ac1358a9f01"`);
        await queryRunner.query(`DROP TABLE "visibility"`);
        await queryRunner.query(`DROP TABLE "team_links"`);
        await queryRunner.query(`DROP TABLE "videos"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "team_spirit"`);
        await queryRunner.query(`DROP TABLE "sprint_snapshot_metric"`);
        await queryRunner.query(`DROP TABLE "sprint_snapshot"`);
        await queryRunner.query(`DROP TABLE "sprint_metric"`);
        await queryRunner.query(`DROP TABLE "code_quality_snapshot"`);
        await queryRunner.query(`DROP TABLE "client_status"`);
        await queryRunner.query(`DROP TABLE "sprint"`);
        await queryRunner.query(`DROP TABLE "sprint_work_unit"`);
        await queryRunner.query(`DROP TABLE "sprint_status"`);
        await queryRunner.query(`DROP TABLE "daily_meeting"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_info"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP TABLE "business_unit"`);
    }

}
