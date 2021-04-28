import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertData1619596002445 implements MigrationInterface {
  name = 'InsertData1619596002445';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "business_unit" ("id", "name", "parent_id", "root_parent_id") VALUES ('11111bf1-ada1-111c-1111-1d1ab11d111e', 'Capgemini India', '11111bf1-ada1-111c-1111-1d1ab11d111e', '11111bf1-ada1-111c-1111-1d1ab11d111e');`,
    );
    await queryRunner.query(
      `INSERT INTO "business_unit" ("id", "name", "parent_id", "root_parent_id") VALUES ('46055bf7-ada7-495c-8019-8d7ab62d488e', 'NA BU', '11111bf1-ada1-111c-1111-1d1ab11d111e', '11111bf1-ada1-111c-1111-1d1ab11d111e');`,
    );
    await queryRunner.query(
      `INSERT INTO "business_unit" ("id", "name", "parent_id", "root_parent_id") VALUES ('46155bf7-ada7-495c-8019-8d7ab62d488e', 'Sogeti', '11111bf1-ada1-111c-1111-1d1ab11d111e', '11111bf1-ada1-111c-1111-1d1ab11d111e');`,
    );
    await queryRunner.query(
      `INSERT INTO "business_unit" ("id", "name", "parent_id", "root_parent_id") VALUES ('46255bf7-ada7-495c-8019-8d7ab62d488e', 'NA AS CSD', '46055bf7-ada7-495c-8019-8d7ab62d488e', '11111bf1-ada1-111c-1111-1d1ab11d111e');`,
    );
    await queryRunner.query(
      `INSERT INTO "business_unit" ("id", "name", "parent_id", "root_parent_id") VALUES ('46355bf7-ada7-495c-8019-8d7ab62d488e', 'Europe CSD AS', '46455bf7-ada7-495c-8019-8d7ab62d488e', '11111bf1-ada1-111c-1111-1d1ab11d111e');`,
    );
    await queryRunner.query(
      `INSERT INTO "business_unit" ("id", "name", "parent_id", "root_parent_id") VALUES ('46455bf7-ada7-495c-8019-8d7ab62d488e', 'Europe BU', '11111bf1-ada1-111c-1111-1d1ab11d111e', '11111bf1-ada1-111c-1111-1d1ab11d111e');`,
    );
    await queryRunner.query(
      `INSERT INTO "business_unit" ("id", "name", "parent_id", "root_parent_id") VALUES ('46555bf7-ada7-495c-8019-8d7ab62d488e', 'Europe CSD AD', '46455bf7-ada7-495c-8019-8d7ab62d488e', '11111bf1-ada1-111c-1111-1d1ab11d111e');`,
    );
    await queryRunner.query(
      `INSERT INTO "business_unit" ("id", "name", "parent_id", "root_parent_id") VALUES ('46655bf7-ada7-495c-8019-8d7ab62d488e', 'ADCenter Bangalore', '46555bf7-ada7-495c-8019-8d7ab62d488e', '11111bf1-ada1-111c-1111-1d1ab11d111e');`,
    );

    await queryRunner.query(
      `INSERT INTO "team" ("id","logo", "name", "business_unit_id") VALUES ('46455bf7-ada7-495c-8019-8d7ab76d488e' ,'uploads\\logo\\logo31ca9983-ae97-4bb0-9f22-4867d3cc16a0.png','Diamler Devops','46655bf7-ada7-495c-8019-8d7ab62d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team" ("id","logo", "name", "business_unit_id") VALUES ('46455bf7-ada7-495c-8019-8d7ab76d489e' ,'' ,'Devon','46355bf7-ada7-495c-8019-8d7ab62d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team" ("id", "logo","name", "business_unit_id" ) VALUES ('46455bf7-ada7-495c-8019-8d7ab76d490e' ,'', 'IKEA','46255bf7-ada7-495c-8019-8d7ab62d488e');`,
    );

    await queryRunner.query(
      `INSERT INTO "daily_meeting" ("id", "type", "daily_meeting_link" ,"daily_team_id") VALUES ('43000bf7-ada7-495c-8019-8d7ab76d490e' ,'TEAMS','https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team_links" ("id", "title", "link" ,"team_id") VALUES ('51055bf7-ada6-495c-8019-8d7ab76d488e','Jira Cloud','https://powerboard-capgemini.atlassian.net/jira/software/projects/DUM/boards/3','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team_links" ("id", "title", "link" ,"team_id") VALUES ('51055bf8-ada5-495c-8019-8d7ab76d488e' ,'GitHub','https://github.com/devonfw-forge/powerboard-api/blob/develop-0.0.1/','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );

    await queryRunner.query(
      `INSERT INTO "images" ("id", "image", "image_team_id") VALUES ('52055bf8-ada5-495c-8019-8d7ab76d488e' ,'uploads\\profileimages\\jirab05d9639-10f5-4ec5-85bf-087731ce4f8b.png','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "images" ("id", "image", "image_team_id") VALUES ('52155bf8-ada5-495c-8019-8d7ab76d488e' ,'uploads\\profileimages\\power46455bf7-ada7-495c-8019-8d7ab76d497e.png','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "videos" ("id", "content", "video_team_id") VALUES ('52255bf8-ada5-495c-8019-8d7ab76d488e' ,'uploads\\videos\\coronab47da341-3258-4cf2-b19f-9f93de76241a.mp4','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "videos" ("id", "content", "video_team_id") VALUES ('52355bf8-ada5-495c-8019-8d7ab76d488e','uploads\\videos\\aspirants95cf1dfd-43e9-4cc4-8257-a6ba5c70e3bd.mp4','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "visibility" ("id", "daily_meeting", "team_link","images","videos","visibility_team_id") VALUES ('52455bf8-ada5-495c-8019-8d7ab76d488e',true, true, true, true,'46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );

    await queryRunner.query(
      `INSERT INTO "code_quality_snapshot" ("id", "bugs", "debt", "code_coverage" ,"status","team_id" ,"snapshot_time") VALUES ('61055bf8-ada5-495c-8019-8d7ab76d488e' ,5, 21, 80,'PASSED','46455bf7-ada7-495c-8019-8d7ab76d490e','2021-04-26 02:10:55');`,
    );
    await queryRunner.query(
      `INSERT INTO "code_quality_snapshot" ("id", "bugs", "debt", "code_coverage" , "status","team_id" ,"snapshot_time") VALUES ('61155bf8-ada5-495c-8019-8d7ab76d488e' ,3, 4, 90 ,'PASSED','46455bf7-ada7-495c-8019-8d7ab76d488e', '2021-04-26 13:23:22');`,
    );
    await queryRunner.query(
      `INSERT INTO "code_quality_snapshot" ("id", "bugs", "debt", "code_coverage" , "status","team_id" ,"snapshot_time") VALUES ('61255bf8-ada5-495c-8019-8d7ab76d488e' ,3, 13, 85 ,'PASSED','46455bf7-ada7-495c-8019-8d7ab76d488e', '2021-04-25 14:30:22');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_metric" ("id","name" ) VALUES ('11155bf2-ada5-495c-8019-8d7ab76d488e','Work Completed');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_metric" ("id","name" ) VALUES ('11155bf1-ada5-495c-8019-8d7ab76d488e','Work Committed');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_status" ("id","status" ) VALUES ('11155bf2-ada5-495c-8019-8d7ab76d488e','In Progress');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_status" ("id","status" ) VALUES ('11155bf3-ada5-495c-8019-8d7ab76d488e','Completed');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_work_unit" ("id","work_unit" ) VALUES ('11155bf1-ada5-495c-8019-8d7ab76d488e','hour');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_work_unit" ("id","work_unit" ) VALUES ('11155bf2-ada5-495c-8019-8d7ab76d488e','story point');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id","work_unit") VALUES ('20155bf8-ada5-495c-8019-8d7ab76d488e', 9, '11155bf3-ada5-495c-8019-8d7ab76d488e','2021-02-27', '2021-03-27','46455bf7-ada7-495c-8019-8d7ab76d488e' ,'11155bf2-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id","work_unit") VALUES ('20255bf8-ada5-495c-8019-8d7ab76d488e', 10, '11155bf3-ada5-495c-8019-8d7ab76d488e','2021-03-28', '2021-04-25','46455bf7-ada7-495c-8019-8d7ab76d488e' ,'11155bf2-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id", "work_unit") VALUES ('20355bf8-ada5-495c-8019-8d7ab76d488e', 11, '11155bf2-ada5-495c-8019-8d7ab76d488e','2021-04-25', '2021-05-23','46455bf7-ada7-495c-8019-8d7ab76d488e' ,'11155bf2-ada5-495c-8019-8d7ab76d488e' );`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id", "work_unit") VALUES ('20455bf8-ada5-495c-8019-8d7ab76d488e', 21, '11155bf3-ada5-495c-8019-8d7ab76d488e','2021-03-23', '2021-04-23','46455bf7-ada7-495c-8019-8d7ab76d490e' ,'11155bf1-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id","work_unit") VALUES ('20555bf8-ada5-495c-8019-8d7ab76d488e', 22, '11155bf2-ada5-495c-8019-8d7ab76d488e','2021-04-24', '2021-05-22','46455bf7-ada7-495c-8019-8d7ab76d490e' ,'11155bf1-ada5-495c-8019-8d7ab76d488e');`,
    );

    await queryRunner.query(
      `INSERT INTO "team_spirit" ("id","team_spirit_rating", "sprint_id") VALUES ('20111bf8-ada5-495c-8019-8d7ab76d488e', 8, '20255bf8-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team_spirit" ("id","team_spirit_rating", "sprint_id") VALUES ('20112bf8-ada5-495c-8019-8d7ab76d488e', 9, '20355bf8-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team_spirit" ("id","team_spirit_rating", "sprint_id") VALUES ('20113bf8-ada5-495c-8019-8d7ab76d488e', 7, '20455bf8-ada5-495c-8019-8d7ab76d488e');`,
    );

    await queryRunner.query(
      `INSERT INTO "client_status" ("id","client_rating", "sprintId") VALUES ('20111bf8-ada5-495c-8019-8d7ab76d488e', 8,'20355bf8-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "client_status" ("id","client_rating", "sprintId") VALUES ('20112bf8-ada5-495c-8019-8d7ab76d488e', 5, '20255bf8-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "client_status" ("id","client_rating", "sprintId") VALUES ('20113bf8-ada5-495c-8019-8d7ab76d488e', 7, '20455bf8-ada5-495c-8019-8d7ab76d488e');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80155bf8-ada5-495c-8019-8d7ab76d488e', '20355bf8-ada5-495c-8019-8d7ab76d488e','2021-04-25 14:30:00');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80255bf8-ada5-495c-8019-8d7ab76d488e', '20355bf8-ada5-495c-8019-8d7ab76d488e','2021-04-26 14:30:00');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80355bf8-ada5-495c-8019-8d7ab76d488e', '20555bf8-ada5-495c-8019-8d7ab76d488e','2021-04-26 14:30:00');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80455bf8-ada5-495c-8019-8d7ab76d488e', '20255bf8-ada5-495c-8019-8d7ab76d488e','2021-04-12 14:30:00');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80555bf8-ada5-495c-8019-8d7ab76d488e', '20155bf8-ada5-495c-8019-8d7ab76d488e','2021-03-10 14:30:00');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80655bf8-ada5-495c-8019-8d7ab76d488e', '20455bf8-ada5-495c-8019-8d7ab76d488e','2021-03-20 14:30:00');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90155bf8-ada5-495c-8019-8d7ab76d488e', '80155bf8-ada5-495c-8019-8d7ab76d488e','11155bf1-ada5-495c-8019-8d7ab76d488e',140);`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90255bf8-ada5-495c-8019-8d7ab76d488e', '80155bf8-ada5-495c-8019-8d7ab76d488e','11155bf2-ada5-495c-8019-8d7ab76d488e',7);`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90355bf8-ada5-495c-8019-8d7ab76d488e', '80255bf8-ada5-495c-8019-8d7ab76d488e','11155bf1-ada5-495c-8019-8d7ab76d488e',140);`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90455bf8-ada5-495c-8019-8d7ab76d488e', '80255bf8-ada5-495c-8019-8d7ab76d488e','11155bf2-ada5-495c-8019-8d7ab76d488e', 12);`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90555bf8-ada5-495c-8019-8d7ab76d488e','80355bf8-ada5-495c-8019-8d7ab76d488e', '11155bf1-ada5-495c-8019-8d7ab76d488e', 280);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90655bf8-ada5-495c-8019-8d7ab76d488e', '80355bf8-ada5-495c-8019-8d7ab76d488e', '11155bf2-ada5-495c-8019-8d7ab76d488e', 75);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90755bf8-ada5-495c-8019-8d7ab76d488e', '80455bf8-ada5-495c-8019-8d7ab76d488e', '11155bf1-ada5-495c-8019-8d7ab76d488e', 140);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90855bf8-ada5-495c-8019-8d7ab76d488e', '80455bf8-ada5-495c-8019-8d7ab76d488e', '11155bf2-ada5-495c-8019-8d7ab76d488e', 120);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90955bf8-ada5-495c-8019-8d7ab76d488e', '80555bf8-ada5-495c-8019-8d7ab76d488e','11155bf1-ada5-495c-8019-8d7ab76d488e', 120);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('91055bf8-ada5-495c-8019-8d7ab76d488e', '80555bf8-ada5-495c-8019-8d7ab76d488e','11155bf2-ada5-495c-8019-8d7ab76d488e', 110);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('91155bf8-ada5-495c-8019-8d7ab76d488e', '80655bf8-ada5-495c-8019-8d7ab76d488e','11155bf1-ada5-495c-8019-8d7ab76d488e', 100);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('91255bf8-ada5-495c-8019-8d7ab76d488e', '80655bf8-ada5-495c-8019-8d7ab76d488e', '11155bf2-ada5-495c-8019-8d7ab76d488e', 90);`,
    );

    await queryRunner.query(
      `INSERT INTO "user_info"("id", "first_name", "last_name" ,"center" ,"email","team_spirit_name") Values('55cf1dfd-43e9-5dd4-8257-a6ba5c70e33d', 'Raj' ,'Singh' ,'ADCenter Bangalore','rajsingh123@gmail.com', '');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_info"("id", "first_name", "last_name" ,"center" ,"email","team_spirit_name") Values('56cf1dfd-43e9-5dd4-8257-a6ba5c70e33d', 'Azhar' ,'Hussain' ,'ADCenter Bangalore','azharhusaain123@gmail.com', '');`,
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "username", "password", "role", "user_info_id", "teamId") Values('10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d', 'raj11' ,'password',0, '55cf1dfd-43e9-5dd4-8257-a6ba5c70e33d', '46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );

    await queryRunner.query(
      `INSERT INTO "user"("id", "username", "password", "role", "user_info_id", "teamId") Values('11cf1dfd-43e9-4cc4-8257-a6ba5c70e34d', 'Azhar21' ,'password',0, '56cf1dfd-43e9-5dd4-8257-a6ba5c70e33d', '46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );

    //   await queryRunner.query(`INSERT INTO USER(id, username, password, role, name, teamId) VALUES(?, ?, ?, ?, ?, ?);`, [
    //     11,
    //     'Azhar@mail.com',
    //     await hash('password', await genSalt(12)),
    //     roles.USER,
    //     'Azhar',
    //     2
    //   ]);
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
