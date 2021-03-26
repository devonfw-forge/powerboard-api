
import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertData1616398412912 implements MigrationInterface {
    name = 'InsertData1616398412912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "business_unit" ("id", "name", "parent_id", "root_parent_id") VALUES (1, 'Capgemini India', 1, 1);`,
          );
          await queryRunner.query(
            `INSERT INTO "business_unit" ("id", "name", "parent_id", "root_parent_id") VALUES (11, 'NA BU', 1, 1);`,
          );
          await queryRunner.query(
            `INSERT INTO "business_unit" ("id", "name", "parent_id", "root_parent_id") VALUES (12, 'Sogeti', 1, 1);`,
          );
          await queryRunner.query(
            `INSERT INTO "business_unit" ("id", "name", "parent_id", "root_parent_id") VALUES (13, 'NA AS CSD', 11, 1);`,
          );
          await queryRunner.query(
            `INSERT INTO "business_unit" ("id", "name", "parent_id", "root_parent_id") VALUES (14, 'Europe CSD AS', 2, 1);`,
          );
          await queryRunner.query(
            `INSERT INTO "business_unit" ("id", "name", "parent_id", "root_parent_id") VALUES (2, 'Europe BU', 1, 1);`,
          );
          await queryRunner.query(
            `INSERT INTO "business_unit" ("id", "name", "parent_id", "root_parent_id") VALUES (3, 'Europe CSD AD', 2, 1);`,
          );
          await queryRunner.query(
            `INSERT INTO "business_unit" ("id", "name", "parent_id", "root_parent_id") VALUES (4, 'ADC Bangalore', 3, 1);`,
          );
      
          await queryRunner.query(`INSERT INTO "team" ("id", "name", "business_unit_id") VALUES (1 ,'Diamler Devops',4);`);
          await queryRunner.query(`INSERT INTO "team" ("id", "name", "business_unit_id") VALUES (3 ,'Devon',14);`);
          await queryRunner.query(`INSERT INTO "team" ("id", "name", "business_unit_id" ) VALUES (2 ,'IKEA',13);`);
      
          await queryRunner.query(
            `INSERT INTO "code_quality_snapshot" ("id", "bugs", "debt", "code_coverage" ,"status","team_id" ,"snapshot_time") VALUES (10 ,5, 21, 80,'PASSED',2,'2021-02-15 02:10:55');`,
          );
          await queryRunner.query(
            `INSERT INTO "code_quality_snapshot" ("id", "bugs", "debt", "code_coverage" , "status","team_id" ,"snapshot_time") VALUES (11 ,3, 4, 90 ,'PASSED',1, '2021-03-26 13:23:22');`,
          );
          await queryRunner.query(
            `INSERT INTO "code_quality_snapshot" ("id", "bugs", "debt", "code_coverage" , "status","team_id" ,"snapshot_time") VALUES (12 ,3, 13, 85 ,'PASSED',1, '2021-03-18 14:30:22');`,
          );
      
          await queryRunner.query(`INSERT INTO "sprint_metric" ("id","name" ) VALUES (2,'Work Completed');`);
      
          await queryRunner.query(`INSERT INTO "sprint_metric" ("id","name" ) VALUES (1,'Work Committed');`);
      
          await queryRunner.query(`INSERT INTO "sprint_status" ("id","status" ) VALUES (2,'In Progress');`);
      
          await queryRunner.query(`INSERT INTO "sprint_status" ("id","status" ) VALUES (3,'Completed');`);
      
          await queryRunner.query(`INSERT INTO "sprint_work_unit" ("id","work_unit" ) VALUES (1,'hour');`);
          await queryRunner.query(`INSERT INTO "sprint_work_unit" ("id","work_unit" ) VALUES (2,'story point');`);
          await queryRunner.query(
            `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id","work_unit") VALUES (1, 9, 3,'2021-01-20', '2021-03-02',1 ,2);`,
          );
          await queryRunner.query(
            `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id","work_unit") VALUES (2, 10, 3,'2021-03-03', '2021-03-24',1 ,2);`,
          );
          await queryRunner.query(
            `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id", "work_unit") VALUES (3, 11, 2,'2021-03-25', '2021-04-22',1 ,2 );`,
          );
          await queryRunner.query(
            `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id", "work_unit") VALUES (4, 21, 3,'2021-02-26', '2021-03-19',2 ,1);`,
          );
          await queryRunner.query(
            `INSERT INTO "sprint" ("id","sprint_number","status" , "start_date","end_date","team_id","work_unit") VALUES (5, 22, 2,'2021-03-20', '2021-04-17',2 ,1);`,
          );
      
          await queryRunner.query(`INSERT INTO "team_spirit" ("id","team_spirit_rating", "sprint_id") VALUES (1, 8, 2);`);
          await queryRunner.query(`INSERT INTO "team_spirit" ("id","team_spirit_rating", "sprint_id") VALUES (2, 9, 3);`);
          await queryRunner.query(`INSERT INTO "team_spirit" ("id","team_spirit_rating", "sprint_id") VALUES (3, 7, 4);`);
      
          await queryRunner.query(`INSERT INTO "client_status" ("id","client_rating", "sprintId") VALUES (1, 8,3);`);
          await queryRunner.query(`INSERT INTO "client_status" ("id","client_rating", "sprintId") VALUES (2, 5, 2);`);
          await queryRunner.query(`INSERT INTO "client_status" ("id","client_rating", "sprintId") VALUES (3, 7, 4);`);
      
          await queryRunner.query(
            `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES (1001, 3,'2021-03-25');`,
          );
      
          await queryRunner.query(
            `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES (1002, 3,'2021-03-26');`,
          );
      
          await queryRunner.query(
            `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES (1003, 5,'2021-03-26');`,
          );
          await queryRunner.query(
            `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES (1004, 2,'2021-03-18');`,
          );
          await queryRunner.query(
            `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES (1005, 1,'2021-01-31');`,
          );
          await queryRunner.query(
            `INSERT INTO "sprint_snapshot" ("id","sprint_id","date_time") VALUES (1006, 4,'2021-03-18');`,
          );
      
          await queryRunner.query(
            `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES (1, 1001,1,120);`,
          );
      
          await queryRunner.query(
            `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES (2, 1001,2,10);`,
          );
      
          await queryRunner.query(
            `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES (3, 1002,1,140);`,
          );
      
          await queryRunner.query(
            `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES (4, 1002,2, 12);`,
          );
      
          await queryRunner.query(
            `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES (5, 1003, 1, 280);`,
          );
          await queryRunner.query(
            `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES (6, 1003, 2, 75);`,
          );
          await queryRunner.query(
            `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES (7, 1004, 1, 140);`,
          );
          await queryRunner.query(
            `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES (8, 1004, 2, 120);`,
          );
          await queryRunner.query(
            `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES (9, 1005, 1, 120);`,
          );
          await queryRunner.query(
            `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES (10, 1005, 2, 110);`,
          );
          await queryRunner.query(
            `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES (11, 1006, 1, 100);`,
          );
          await queryRunner.query(
            `INSERT INTO "sprint_snapshot_metric" ("id","snapshot_id","metric_id","value" ) VALUES (12, 1006, 2, 90);`,
          );
         
          await queryRunner.query(`INSERT INTO "user"("id", "username", "password", "role", "name", "teamId") Values(10, 'John11' ,'password',0, 'John', 1);`,);
        
          await queryRunner.query(`INSERT INTO "user"("id", "username", "password", "role", "name", "teamId") Values(11, 'Azhar21' ,'password',0, 'Azhar', 2);`,);
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
