import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertData1620719566255 implements MigrationInterface {
  name = 'InsertData1620719566255';

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
      `INSERT INTO "team" ("id","logo", "name", "business_unit_id") VALUES ('46455bf7-ada7-495c-8019-8d7ab76d488e' ,'uploads\\logo\\team_logof1421c16-7ce3-44ad-a94b-5231bcea6887.jpg','Diamler Devops','46655bf7-ada7-495c-8019-8d7ab62d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team" ("id","logo", "name", "business_unit_id") VALUES ('46455bf7-ada7-495c-8019-8d7ab76d489e' ,'' ,'Devon Offshore','46555bf7-ada7-495c-8019-8d7ab62d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "team" ("id", "logo","name", "business_unit_id" ) VALUES ('46455bf7-ada7-495c-8019-8d7ab76d490e' ,'', 'K&N','46655bf7-ada7-495c-8019-8d7ab62d488e');`,
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
      `INSERT INTO "images" ("id", "image", "image_team_id") VALUES ('cf959b61-58b1-4985-92e5-4d5f9f5afa87' ,'uploads\\profileimages\\chara5ac33c9-e152-4522-9ce5-e902fe5f2d1c.jpg','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "images" ("id", "image", "image_team_id") VALUES ('117ae945-4803-427c-aeb4-410081c88f88' ,'uploads\\profileimages\\france-capgeminife447381-c7fb-4f7a-a02a-e0e727cd7393.jpg','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "images" ("id", "image", "image_team_id") VALUES ('e732a995-4c70-4ef3-ab71-041f458d0d83' ,'uploads\\profileimages\\altrandd662280-77f7-4884-98c1-03e42dbee263.jpg','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "images" ("id", "image", "image_team_id") VALUES ('6da523cf-b1ba-4731-8da7-0d989a4f00f4' ,'uploads\\profileimages\\bannered66c18c-a4de-4da6-8cb9-005cddc9087e.jpg','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "images" ("id", "image", "image_team_id") VALUES ('9494e8ed-e68a-432e-86ea-e37495fd23d0' ,'uploads\\profileimages\\Capgeminif3ddc40c-2f8d-4f7b-beee-f5bc8388239f.jpg','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "images" ("id", "image", "image_team_id") VALUES ('181d444b-b42c-4f7f-9834-0603e8b328b0' ,'uploads\\profileimages\\manyata_collage2c648b45-37c1-448d-a85d-3a4de68f941b.jpg','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "images" ("id", "image", "image_team_id") VALUES ('196726f99-e026-4d8b-acc7-51aad9fa258a' ,'uploads\\profileimages\\media-handler58ee93d8-35ca-41a7-8514-37c713b28d32.jpg','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "images" ("id", "image", "image_team_id") VALUES ('3fd1997b-348f-48d0-91e4-d954fb1bd5ef' ,'uploads\\profileimages\\skybaeb6aaa-5d3e-4b1f-b4f5-72eb569afbd9.jpg','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "images" ("id", "image", "image_team_id") VALUES ('23dee64a-5382-4405-934a-680d98e97429' ,'uploads\\profileimages\\Winner57dbf7ec-fb7c-4246-a82b-b7439eadad6f.jpeg','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );

    await queryRunner.query(
      `INSERT INTO "videos" ("id", "content", "video_team_id") VALUES ('5121e15a-2d3d-44d8-9d4d-4c2a50dc426c' ,'uploads\\videos\\CapgeminiPurposeaf737d4e-a121-4781-b49a-86575b2886d3.mp4','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "videos" ("id", "content", "video_team_id") VALUES ('d0bdc9da-0092-43fc-a9cb-220a63992b77','uploads\\videos\\CapgeminiValues9a20518c-e2d5-46a9-9c5d-9b5c72f66174.mp4','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "videos" ("id", "content", "video_team_id") VALUES ('458e5d53-9513-4009-af1d-f5c06ba97839','uploads\\videos\\Capgemini_GetTheFutureYouWant18c0092d-d55f-4b6e-a191-ea25306e01d7.mp4','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "videos" ("id", "content", "video_team_id") VALUES ('716d642a-fbb8-4bae-9550-d05eeb77f2d9','uploads\\videos\\Servicesaaf35ae4-f5d3-4521-8abd-787dd9d218c9.mp4','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
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
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80255bf8-ada5-495c-8019-8d7ab76d488e', '20355bf8-ada5-495c-8019-8d7ab76d488e','2021-05-09 14:30:00');`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES ('80355bf8-ada5-495c-8019-8d7ab76d488e', '20555bf8-ada5-495c-8019-8d7ab76d488e','2021-05-09 14:30:00');`,
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
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90455bf8-ada5-495c-8019-8d7ab76d488e', '80255bf8-ada5-495c-8019-8d7ab76d488e','11155bf2-ada5-495c-8019-8d7ab76d488e', 83);`,
    );

    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90555bf8-ada5-495c-8019-8d7ab76d488e','80355bf8-ada5-495c-8019-8d7ab76d488e', '11155bf1-ada5-495c-8019-8d7ab76d488e', 280);`,
    );
    await queryRunner.query(
      `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES ('90655bf8-ada5-495c-8019-8d7ab76d488e', '80355bf8-ada5-495c-8019-8d7ab76d488e', '11155bf2-ada5-495c-8019-8d7ab76d488e', 172);`,
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
      `INSERT INTO "user"("id", "username", "password", "role", "user_info_id") Values('10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d', 'raj11' ,'password',0, '55cf1dfd-43e9-5dd4-8257-a6ba5c70e33d');`,
    );

    await queryRunner.query(
      `INSERT INTO "user"("id", "username", "password", "role", "user_info_id") Values('11cf1dfd-43e9-4cc4-8257-a6ba5c70e34d', 'siva11' ,'password',0, '56cf1dfd-43e9-5dd4-8257-a6ba5c70e33d');`,
    );
    //Here userId and corresponding teamId  has been given
    await queryRunner.query(
      `INSERT INTO "user_team_id_team"("userId", "teamId") Values('10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_team_id_team"("userId", "teamId") Values('11cf1dfd-43e9-4cc4-8257-a6ba5c70e34d','46455bf7-ada7-495c-8019-8d7ab76d488e');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_team_id_team"("userId", "teamId") Values('11cf1dfd-43e9-4cc4-8257-a6ba5c70e34d','46455bf7-ada7-495c-8019-8d7ab76d490e');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_team_id_team"("userId", "teamId") Values('11cf1dfd-43e9-4cc4-8257-a6ba5c70e34d','46455bf7-ada7-495c-8019-8d7ab76d489e');`,
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
    await queryRunner.query(`ALTER TABLE "user_team_id_team" DROP CONSTRAINT "FK_1982ff364868fab18f5e2aca97e"`);
    await queryRunner.query(`ALTER TABLE "user_team_id_team" DROP CONSTRAINT "FK_b29b5a3393388510a5c1f00a325"`);
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
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ee24a311e8099f9f44424df108e"`);
    await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_780f295d5c3ed479ac1358a9f01"`);
    await queryRunner.query(`DROP INDEX "IDX_1982ff364868fab18f5e2aca97"`);
    await queryRunner.query(`DROP INDEX "IDX_b29b5a3393388510a5c1f00a32"`);
    await queryRunner.query(`DROP TABLE "user_team_id_team"`);
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
