import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertData1624341559430 implements MigrationInterface {
  name = 'InsertData1624341559430';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "ad_center" ("id", "name") VALUES ('98655bf7-ada7-495c-8019-8d7ab62d488e', 'ADCenter Valencia');`,
    );
    await queryRunner.query(
      `INSERT INTO "ad_center" ("id", "name") VALUES ('98755bf7-ada7-495c-8019-8d7ab62d488e', 'ADCenter Mumbai');`,
    );
    await queryRunner.query(
      `INSERT INTO "ad_center" ("id", "name") VALUES ('98855bf7-ada7-495c-8019-8d7ab62d488e', 'ADCenter Poland');`,
    );
    await queryRunner.query(
      `INSERT INTO "ad_center" ("id", "name") VALUES ('98955bf7-ada7-495c-8019-8d7ab62d488e', 'ADCenter Murcia');`,
    );

    await queryRunner.query(
      `INSERT INTO "ad_center" ("id", "name") VALUES ('99055bf7-ada7-495c-8019-8d7ab62d488e', 'ADCenter Bangalore');`,
    );

    await queryRunner.query(
      `INSERT INTO "team" ("id","team_code", "logo", "name", "ad_center_id") VALUES ('46455bf7-ada7-495c-8019-8d7ab76d488e' ,'10012345','uploads\\logo\\team_logof1421c16-7ce3-44ad-a94b-5231bcea6887.jpg','Diamler Devops','99055bf7-ada7-495c-8019-8d7ab62d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team" ("id","team_code","logo", "name", "ad_center_id") VALUES ('46455bf7-ada7-495c-8019-8d7ab76d489e' ,'10012346','' ,'Devon Offshore','99055bf7-ada7-495c-8019-8d7ab62d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team" ("id", "team_code","logo","name", "ad_center_id" ) VALUES ('46455bf7-ada7-495c-8019-8d7ab76d490e' ,'10012347','', 'K&N','99055bf7-ada7-495c-8019-8d7ab62d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team" ("id", "team_code","logo","name", "ad_center_id" ) VALUES ('46455bf7-ada7-495c-8019-8d7ab76d491e' ,'10033347','', 'BMW','98755bf7-ada7-495c-8019-8d7ab62d488e');`,
    );

    await queryRunner.query(
      `INSERT INTO "daily_meeting" ("id", "type","title", "daily_meeting_link" ,"daily_team_id") VALUES ('43000bf7-ada7-495c-8019-8d7ab76d490e' ,'TEAMS','Stand Up','https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "daily_meeting" ("id", "type","title", "daily_meeting_link" ,"daily_team_id") VALUES ('43001bf7-ada7-495c-8019-8d7ab76d490e' ,'TEAMS','Stand Up','https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d','46455bf7-ada7-495c-8019-8d7ab76d490e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team_links" ("id", "title", "link" ,"team_id") VALUES ('51055bf7-ada6-495c-8019-8d7ab76d488e','Jira Cloud','https://powerboard-capgemini.atlassian.net/jira/software/projects/DUM/boards/3','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team_links" ("id", "title", "link" ,"team_id") VALUES ('51055bf8-ada5-495c-8019-8d7ab76d488e' ,'GitHub','https://github.com/devonfw-forge/powerboard-api/blob/develop-0.0.1/','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );

    await queryRunner.query(
      `INSERT INTO "team_links" ("id", "title", "link" ,"team_id") VALUES ('51055bf9-ada5-495c-8019-8d7ab76d488e' ,'GitHub','https://github.com/devonfw-forge/powerboard-api/blob/develop-0.0.1/','46455bf7-ada7-495c-8019-8d7ab76d490e');`,
    );

    await queryRunner.query(
      `INSERT INTO "images" ("id", "image", "image_team_id") VALUES ('aaad19f7-1b66-44aa-a443-4fcdd173f385' ,'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "images" ("id", "image", "image_team_id") VALUES ('89cbb47b-5454-440d-a0e8-98b681ed6f83' ,'Capgeminie399d4d7-5119-4c2b-b238-4275d2f7c5da.jpg','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "images" ("id", "image", "image_team_id") VALUES ('fbf8ea11-62a2-433a-936f-9fddfb90b1c6' ,'chare72e95bb-b552-425a-a051-b7dfc69efa0b.jpg','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "images" ("id", "image", "image_team_id") VALUES ('dc6a6a55-23f9-4edf-90e5-a18c6b07a0be' ,'dataf74b26af-7a68-42c9-94b8-b4ebc378dce1.jpg','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "images" ("id", "image", "image_team_id") VALUES ('8c4f8d5d-b3b7-4efb-868e-4336474094b3' ,'france-capgeminic4ba8e67-c56d-446d-814e-9ab149521959.jpg','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );

    await queryRunner.query(
      `INSERT INTO "images" ("id", "image", "image_team_id") VALUES ('73eaf00a-f1fe-4573-8cbb-324499c39431' ,'altrand72e3352-0353-4e5f-8fa3-5a25444f0c62.jpg','46455bf7-ada7-495c-8019-8d7ab76d490e');`,
    );
    await queryRunner.query(
      `INSERT INTO "images" ("id", "image", "image_team_id") VALUES ('b76075b9-744b-46d8-adce-ed94efbdc91d' ,'manyata_collagedbd58693-3e4a-4e88-9b98-35db5f8b5582.jpg','46455bf7-ada7-495c-8019-8d7ab76d490e');`,
    );
    await queryRunner.query(
      `INSERT INTO "images" ("id", "image", "image_team_id") VALUES ('df6f2d70-cd9e-48dd-8040-e15fe0cd9e4d' ,'media-handler5eb3609d-b8ab-4c2d-abb0-0d434076c4e9.jpg','46455bf7-ada7-495c-8019-8d7ab76d490e');`,
    );

    await queryRunner.query(
      `INSERT INTO "videos" ("id", "content", "video_team_id") VALUES ('79b90a96-bd52-4fab-9b8f-e119cf4e66ab' ,'CapgeminiPurpose1c42fff2-6884-40bd-a8f0-489552af140f.mp4','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "videos" ("id", "content", "video_team_id") VALUES ('0176b6eb-6336-4efc-9710-edfc4af25a31' ,'CapgeminiValues499f846a-780c-4a9a-86c9-99d3055f7d1e.mp4','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "videos" ("id", "content", "video_team_id") VALUES ('30b230a3-ad4f-4c3b-bfd1-1df1565cca55' ,'Capgemini_GetTheFutureYouWant8dac72f9-be9d-43ef-b94e-4f6fc3a076d6.mp4','46455bf7-ada7-495c-8019-8d7ab76d490e');`,
    );
    await queryRunner.query(
      `INSERT INTO "videos" ("id", "content", "video_team_id") VALUES ('ced443de-abb9-43e5-8643-a8908bfe3462' ,'Servicesef81820c-6674-42ea-80e1-dc4513bbad52.mp4','46455bf7-ada7-495c-8019-8d7ab76d490e');`,
    );

    await queryRunner.query(
      `INSERT INTO "visibility" ("id", "daily_meeting", "team_link","images","videos","visibility_team_id") VALUES ('52455bf8-ada5-495c-8019-8d7ab76d488e',true, true, true, true,'46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );

    await queryRunner.query(
      `INSERT INTO "code_quality_snapshot" ("id", "bugs", "debt", "code_coverage" ,"status","team_id" ,"snapshot_time") VALUES ('61055bf8-ada5-495c-8019-8d7ab76d488e' ,5, 21, 80,'PASSED','46455bf7-ada7-495c-8019-8d7ab76d490e','2021-05-17 02:10:55');`,
    );
    await queryRunner.query(
      `INSERT INTO "code_quality_snapshot" ("id", "bugs", "debt", "code_coverage" , "status","team_id" ,"snapshot_time") VALUES ('61155bf8-ada5-495c-8019-8d7ab76d488e' ,3, 4, 90 ,'PASSED','46455bf7-ada7-495c-8019-8d7ab76d488e', '2021-05-17 13:23:22');`,
    );
    await queryRunner.query(
      `INSERT INTO "code_quality_snapshot" ("id", "bugs", "debt", "code_coverage" , "status","team_id" ,"snapshot_time") VALUES ('61255bf8-ada5-495c-8019-8d7ab76d488e' ,3, 13, 85 ,'PASSED','46455bf7-ada7-495c-8019-8d7ab76d488e', '2021-05-17 14:30:22');`,
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
      `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id","work_unit") VALUES ('20155bf8-ada5-495c-8019-8d7ab76d488e', 9, '11155bf3-ada5-495c-8019-8d7ab76d488e','2021-04-11 16:30:15', '2021-05-09 16:30:15','46455bf7-ada7-495c-8019-8d7ab76d488e' ,'11155bf2-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id","work_unit") VALUES ('20255bf8-ada5-495c-8019-8d7ab76d488e', 10, '11155bf3-ada5-495c-8019-8d7ab76d488e','2021-05-10 16:30:15', '2021-06-07 16:30:15','46455bf7-ada7-495c-8019-8d7ab76d488e' ,'11155bf2-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id", "work_unit") VALUES ('20355bf8-ada5-495c-8019-8d7ab76d488e', 11, '11155bf2-ada5-495c-8019-8d7ab76d488e','2021-06-08 13:30:15', '2021-07-06 13:30:15','46455bf7-ada7-495c-8019-8d7ab76d488e' ,'11155bf2-ada5-495c-8019-8d7ab76d488e' );`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id", "work_unit") VALUES ('20455bf8-ada5-495c-8019-8d7ab76d488e', 21, '11155bf3-ada5-495c-8019-8d7ab76d488e','2021-05-10 14:30:15', '2021-06-07 14:30:15','46455bf7-ada7-495c-8019-8d7ab76d490e' ,'11155bf1-ada5-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id","work_unit") VALUES ('20555bf8-ada5-495c-8019-8d7ab76d488e', 22, '11155bf2-ada5-495c-8019-8d7ab76d488e','2021-06-08 15:30:15', '2021-07-06 15:30:15','46455bf7-ada7-495c-8019-8d7ab76d490e' ,'11155bf1-ada5-495c-8019-8d7ab76d488e');`,
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
      `INSERT INTO "team_spirit_median" ("id", "survey_median","start_date","end_date","survey_code","team_name") VALUES ('70013bf8-ada5-495c-8019-8d7ab76d488e', 3,'2021-05-15 14:15:36','2021-05-25 14:15:30' ,'AZR32' ,'Diamler Devops');`,
    );

    await queryRunner.query(
      `INSERT INTO "team_spirit_median" ("id", "survey_median","start_date","end_date","survey_code","team_name") VALUES ('70023bf8-ada5-495c-8019-8d7ab76d488e', 7,'2021-06-22 13:20:34','2021-07-02 13:25:40' ,'AZ4r52' ,'Diamler Devops');`,
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
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80155bf8-ada5-495c-8019-8d7ab76d488e', '20355bf8-ada5-495c-8019-8d7ab76d488e','2021-06-08 14:30:00');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80255bf8-ada5-495c-8019-8d7ab76d488e', '20355bf8-ada5-495c-8019-8d7ab76d488e','2021-06-09 14:30:00');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80355bf8-ada5-495c-8019-8d7ab76d488e', '20555bf8-ada5-495c-8019-8d7ab76d488e','2021-06-08 14:30:00');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80455bf8-ada5-495c-8019-8d7ab76d488e', '20255bf8-ada5-495c-8019-8d7ab76d488e','2021-05-31 14:30:00');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80555bf8-ada5-495c-8019-8d7ab76d488e', '20155bf8-ada5-495c-8019-8d7ab76d488e','2021-05-01 14:30:00');`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80655bf8-ada5-495c-8019-8d7ab76d488e', '20455bf8-ada5-495c-8019-8d7ab76d488e','2021-05-26 14:30:00');`,
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
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90455bf8-ada5-495c-8019-8d7ab76d488e', '80255bf8-ada5-495c-8019-8d7ab76d488e','11155bf2-ada5-495c-8019-8d7ab76d488e', 18);`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90555bf8-ada5-495c-8019-8d7ab76d488e','80355bf8-ada5-495c-8019-8d7ab76d488e', '11155bf1-ada5-495c-8019-8d7ab76d488e', 280);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90655bf8-ada5-495c-8019-8d7ab76d488e', '80355bf8-ada5-495c-8019-8d7ab76d488e', '11155bf2-ada5-495c-8019-8d7ab76d488e', 35);`,
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
      `INSERT INTO "user"("id", "username", "password","email","is_password_changed" ) Values('10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d', 'raj11' ,'$2b$12$.hA7MmRGIzsr7v.eYFRtuOUTNw5WEqkGPcE92EX6opaiVMbr77fme','raj@capgemini.com', true);`,
    );

    await queryRunner.query(
      `INSERT INTO "user"("id", "username", "password", "email","is_password_changed") Values('11cf1dfd-43e9-4cc4-8257-a6ba5c70e33d', 'siva11' ,'$2b$12$.hA7MmRGIzsr7v.eYFRtuOUTNw5WEqkGPcE92EX6opaiVMbr77fme','siva@capgemini.com', true);`,
    );

    await queryRunner.query(
      `INSERT INTO "user"("id", "username", "password", "email","is_password_changed") Values('35afbdf8-9035-4bc6-ae04-28c6140495ad', 'system' ,'$2b$12$bv3gEToQOb4X/dkoHprAY.MHwBJpCeJpFbv1eElwTmoFeBuXtOSsS','powerboardsys@mail.com',true);`,
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "username", "password", "email","is_password_changed") Values('e46622d4-8936-4f9f-ac18-696a35d7162e', 'guest' ,'$2b$12$ilSmP0sQ7qD.hmnrUS788OaQhDBn/jv.LyPG162xtrYe9FLyBCUKi','guest@mail.com',true);`,
    );

    //Here role table entry is there
    await queryRunner.query(
      `INSERT INTO "user_role"("id", "role_name") Values('555f1dfd-43e9-4cc4-8257-a6ba5c70e34d','team_member' );`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role"("id", "role_name") Values('556f1dfd-43e9-4cc4-8257-a6ba5c70e34d','team_admin' );`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role"("id", "role_name") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','system_admin' );`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role"("id", "role_name") Values('558f1dfd-43e9-4cc4-8257-a6ba5c70e34d','guest_user' );`,
    );

    //Here userId and corresponding teamId with their role has been given
    await queryRunner.query(
      `INSERT INTO "user_team"("id","user_Id","user_role_id") Values('61c80b70-e33a-4a1e-ac70-57eaa1c762cd','35afbdf8-9035-4bc6-ae04-28c6140495ad','557f1dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_team"("id","user_Id","user_role_id") Values('01e41236-dcd9-4fd4-8d9c-7faf526f9ee4','e46622d4-8936-4f9f-ac18-696a35d7162e','558f1dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_team"("id","user_Id", "team_Id","user_role_id") Values('762f1dfd-43e9-4cc4-8257-a6ba5c70e33d','10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d','46455bf7-ada7-495c-8019-8d7ab76d488e','555f1dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_team"("id" ,"user_Id", "team_Id","user_role_id" ) Values('763f1dfd-43e9-4cc4-8257-a6ba5c70e33d','11cf1dfd-43e9-4cc4-8257-a6ba5c70e33d','46455bf7-ada7-495c-8019-8d7ab76d489e','555f1dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_team"("id" ,"user_Id", "team_Id" ,"user_role_id") Values('764f1dfd-43e9-4cc4-8257-a6ba5c70e33d','11cf1dfd-43e9-4cc4-8257-a6ba5c70e33d','46455bf7-ada7-495c-8019-8d7ab76d490e','556f1dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );

    //Here we are adding privileges
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80011dfd-43e9-4cc4-8257-a6ba5c70e34d','add_team_admin','For admin to determine role' );`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80021dfd-43e9-4cc4-8257-a6ba5c70e34d','view_meeting_links','For viewing meetings' );`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80031dfd-43e9-4cc4-8257-a6ba5c70e34d','view_team_links' ,'For viewing team links');`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80051dfd-43e9-4cc4-8257-a6ba5c70e34d','team_configuration','For configuring the team' );`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80061dfd-43e9-4cc4-8257-a6ba5c70e34d','register_team','For register of team' );`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80071dfd-43e9-4cc4-8257-a6ba5c70e34d','update_team','For updating the team' );`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80081dfd-43e9-4cc4-8257-a6ba5c70e34d','delete_team' ,'For deleting the team');`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80091dfd-43e9-4cc4-8257-a6ba5c70e34d','view_all_team' ,'View all team');`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80101dfd-43e9-4cc4-8257-a6ba5c70e34d','view_members_of_team','view members of particular team' );`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80111dfd-43e9-4cc4-8257-a6ba5c70e34d','update_role' ,'For updating the role');`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80121dfd-43e9-4cc4-8257-a6ba5c70e34d','delete_team_members','For deleting the team members' );`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80131dfd-43e9-4cc4-8257-a6ba5c70e34d','add_team_member', 'For adding team meber' );`,
    );
    await queryRunner.query(
      `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80141dfd-43e9-4cc4-8257-a6ba5c70e34d','add_guest_user' ,'For adding guest user');`,
    );
    //Here we relate roleId to PrivilegeId
    //for team member and their respective permission id
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('555f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80021dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('555f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80031dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );

    //For team admin , and respective permission id

    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('556f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80021dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('556f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80031dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('556f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80051dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('556f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80101dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('556f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80121dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('556f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80131dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    //For system admin , and their respective permission id
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80011dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80021dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80031dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80051dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80061dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80071dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80081dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80091dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80101dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80111dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80121dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80131dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80141dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
    );

    //For guest user , and respective permission id
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_role_privilege" DROP CONSTRAINT "FK_97a74e8a9913478806bd9258dea"`);
    await queryRunner.query(`ALTER TABLE "user_role_privilege" DROP CONSTRAINT "FK_b5953b98d1159f75a3156d071a9"`);
    await queryRunner.query(`ALTER TABLE "visibility" DROP CONSTRAINT "FK_396c9b89d74447b5dd2e60b9b24"`);
    await queryRunner.query(`ALTER TABLE "team_links" DROP CONSTRAINT "FK_e2facb7b8634882f8a0ee04979f"`);
    await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "FK_d20b5471e94253b5c2f194016b7"`);
    await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_ad3659fcd491b5a0bb65af47b5f"`);
    await queryRunner.query(`ALTER TABLE "team_spirit" DROP CONSTRAINT "FK_c258101a9e329fc1cf1ca460195"`);
    await queryRunner.query(`ALTER TABLE "team_spirit_median" DROP CONSTRAINT "FK_103f28512266352104e3edea624"`);
    await queryRunner.query(`ALTER TABLE "sprint_snapshot_metric" DROP CONSTRAINT "FK_32ee1ecd7212edf6dad1a86ee6a"`);
    await queryRunner.query(`ALTER TABLE "sprint_snapshot_metric" DROP CONSTRAINT "FK_ea96cf0fa988134725f6ad0984b"`);
    await queryRunner.query(`ALTER TABLE "sprint_snapshot" DROP CONSTRAINT "FK_fb748d58ef594e8505aa9970d98"`);
    await queryRunner.query(`ALTER TABLE "code_quality_snapshot" DROP CONSTRAINT "FK_03be61d9d46dd39f1f355862e32"`);
    await queryRunner.query(`ALTER TABLE "client_status" DROP CONSTRAINT "FK_16a31ed3a3cc5249369bbd25c9a"`);
    await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_b376aaa2ef5e4724f3508cf5f33"`);
    await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_738321a380b6d8e5266516b5302"`);
    await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_39768350e23ee9800f4b30bb94f"`);
    await queryRunner.query(`ALTER TABLE "daily_meeting" DROP CONSTRAINT "FK_0654efb07db0f680ea953c810c6"`);
    await queryRunner.query(`ALTER TABLE "user_team" DROP CONSTRAINT "FK_0c4cda0f5bdb141e7cdccb9c563"`);
    await queryRunner.query(`ALTER TABLE "user_team" DROP CONSTRAINT "FK_8d8673f465f0797bf6126766c96"`);
    await queryRunner.query(`ALTER TABLE "user_team" DROP CONSTRAINT "FK_f7c7dca694de337fa4a89d73ec8"`);
    await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_8e571805766848ea10996a178d4"`);
    await queryRunner.query(`ALTER TABLE "ad_center" DROP CONSTRAINT "FK_981851c0e0af71d8c3a0088df19"`);
    await queryRunner.query(`DROP INDEX "IDX_97a74e8a9913478806bd9258de"`);
    await queryRunner.query(`DROP INDEX "IDX_b5953b98d1159f75a3156d071a"`);
    await queryRunner.query(`DROP TABLE "user_role_privilege"`);
    await queryRunner.query(`DROP TABLE "visibility"`);
    await queryRunner.query(`DROP TABLE "team_links"`);
    await queryRunner.query(`DROP TABLE "videos"`);
    await queryRunner.query(`DROP TABLE "images"`);
    await queryRunner.query(`DROP TABLE "team_spirit"`);
    await queryRunner.query(`DROP TABLE "team_spirit_median"`);
    await queryRunner.query(`DROP TABLE "sprint_snapshot_metric"`);
    await queryRunner.query(`DROP TABLE "sprint_snapshot"`);
    await queryRunner.query(`DROP TABLE "sprint_metric"`);
    await queryRunner.query(`DROP TABLE "code_quality_snapshot"`);
    await queryRunner.query(`DROP TABLE "client_status"`);
    await queryRunner.query(`DROP TABLE "sprint"`);
    await queryRunner.query(`DROP TABLE "sprint_work_unit"`);
    await queryRunner.query(`DROP TABLE "sprint_status"`);
    await queryRunner.query(`DROP TABLE "daily_meeting"`);
    await queryRunner.query(`DROP TABLE "user_team"`);
    await queryRunner.query(`DROP TABLE "team"`);
    await queryRunner.query(`DROP TABLE "ad_center"`);
    await queryRunner.query(`DROP TABLE "business_unit"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP TABLE "privileges"`);
  }
}
