import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertData1623310398553 implements MigrationInterface {
    name = 'InsertData1623310398553'

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
          `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id","work_unit") VALUES ('20155bf8-ada5-495c-8019-8d7ab76d488e', 9, '11155bf3-ada5-495c-8019-8d7ab76d488e','2021-04-11', '2021-05-09','46455bf7-ada7-495c-8019-8d7ab76d488e' ,'11155bf2-ada5-495c-8019-8d7ab76d488e');`,
        );
        await queryRunner.query(
          `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id","work_unit") VALUES ('20255bf8-ada5-495c-8019-8d7ab76d488e', 10, '11155bf3-ada5-495c-8019-8d7ab76d488e','2021-05-10', '2021-06-07','46455bf7-ada7-495c-8019-8d7ab76d488e' ,'11155bf2-ada5-495c-8019-8d7ab76d488e');`,
        );
        await queryRunner.query(
          `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id", "work_unit") VALUES ('20355bf8-ada5-495c-8019-8d7ab76d488e', 11, '11155bf2-ada5-495c-8019-8d7ab76d488e','2021-06-08', '2021-07-06','46455bf7-ada7-495c-8019-8d7ab76d488e' ,'11155bf2-ada5-495c-8019-8d7ab76d488e' );`,
        );
        await queryRunner.query(
          `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id", "work_unit") VALUES ('20455bf8-ada5-495c-8019-8d7ab76d488e', 21, '11155bf3-ada5-495c-8019-8d7ab76d488e','2021-05-10', '2021-06-07','46455bf7-ada7-495c-8019-8d7ab76d490e' ,'11155bf1-ada5-495c-8019-8d7ab76d488e');`,
        );
        await queryRunner.query(
          `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id","work_unit") VALUES ('20555bf8-ada5-495c-8019-8d7ab76d488e', 22, '11155bf2-ada5-495c-8019-8d7ab76d488e','2021-06-08', '2021-07-06','46455bf7-ada7-495c-8019-8d7ab76d490e' ,'11155bf1-ada5-495c-8019-8d7ab76d488e');`,
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
          `INSERT INTO "user"("id", "username", "password","email" ) Values('10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d', 'raj11' ,'$2b$12$.hA7MmRGIzsr7v.eYFRtuOUTNw5WEqkGPcE92EX6opaiVMbr77fme','raj@capgemini.com');`,
        );
    
        await queryRunner.query(
          `INSERT INTO "user"("id", "username", "password", "email") Values('11cf1dfd-43e9-4cc4-8257-a6ba5c70e33d', 'siva11' ,'$2b$12$.hA7MmRGIzsr7v.eYFRtuOUTNw5WEqkGPcE92EX6opaiVMbr77fme','siva@capgemini.com');`,
        );

        await queryRunner.query(
          `INSERT INTO "user"("id", "username", "password", "email") Values('35afbdf8-9035-4bc6-ae04-28c6140495ad', 'system' ,'$2b$12$bv3gEToQOb4X/dkoHprAY.MHwBJpCeJpFbv1eElwTmoFeBuXtOSsS','powerboardsys@mail.com');`,
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
          `INSERT INTO "user_team"("id","user_Id", "team_Id","user_role_id") Values('61c80b70-e33a-4a1e-ac70-57eaa1c762cd','35afbdf8-9035-4bc6-ae04-28c6140495ad','null','557f1dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
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
          `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80011dfd-43e9-4cc4-8257-a6ba5c70e34d','view_dashboard','For seeing all kpis' );`,
        );
         await queryRunner.query(
          `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80021dfd-43e9-4cc4-8257-a6ba5c70e34d','view_meeting_links','For viewing meetings' );`,
        );
         await queryRunner.query(
          `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80031dfd-43e9-4cc4-8257-a6ba5c70e34d','view_team_links' ,'For viewing team links');`,
        );
        await queryRunner.query(
          `INSERT INTO "privileges"("id", "privilege_name","privilege_description") Values('80041dfd-43e9-4cc4-8257-a6ba5c70e34d','view_multimedia' ,'For view of images and videos');`,
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
          `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('555f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80011dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
        );
          await queryRunner.query(
          `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('555f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80021dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
        );
         await queryRunner.query(
          `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('555f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80031dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
        );
         await queryRunner.query(
          `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('555f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80041dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
        );
    
       //For team admin , and respective permission id
       await queryRunner.query(
          `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('556f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80011dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
        );
      await queryRunner.query(
          `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('556f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80021dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
        );
      await queryRunner.query(
          `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('556f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80031dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
        );
      await queryRunner.query(
          `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('556f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80041dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
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
          `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('557f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80041dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
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
       await queryRunner.query(
          `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('558f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80011dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
        );
     await queryRunner.query(
          `INSERT INTO "user_role_privilege"("role_id", "privilege_id") Values('558f1dfd-43e9-4cc4-8257-a6ba5c70e34d','80041dfd-43e9-4cc4-8257-a6ba5c70e34d');`,
        );
      }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_role_privilege" DROP CONSTRAINT "FK_97a74e8a9913478806bd9258dea"`);
        await queryRunner.query(`ALTER TABLE "user_role_privilege" DROP CONSTRAINT "FK_b5953b98d1159f75a3156d071a9"`);
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
