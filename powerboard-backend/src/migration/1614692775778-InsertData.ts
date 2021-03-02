import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertData1614692775778 implements MigrationInterface {
    name = 'InsertData1614692775778'

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
    
    
       
    
    
    
          await queryRunner.query(
            `INSERT INTO "team" ("id", "name", "businessUnitId") VALUES (1 ,'Diamler Devops',4);`,
          );
          await queryRunner.query(
            `INSERT INTO "team" ("id", "name", "businessUnitId" ) VALUES (2 ,'IKEA',14);`,
          );
    
          await queryRunner.query(
            `INSERT INTO "code_quality_snapshot" ("id", "bugs", "debt", "codeCoverage" ,"status","teamId" ,"codeQualityTime") VALUES (10 ,5, 21, 80,'PASSED',1,'2021-02-15');`,
          );
          await queryRunner.query(
            `INSERT INTO "code_quality_snapshot" ("id", "bugs", "debt", "codeCoverage" , "status","teamId" ,"codeQualityTime") VALUES (11 ,3, 4, 90 ,'FAILED',2, '2021-02-25');`,
          );
      
    
          await queryRunner.query(
            `INSERT INTO "sprint" ("id","sprintNumber","status" , "startDate","endDate","teamId") VALUES (1, 10, 1,'2021-02-15', '2021-02-26',1);`,
              );
          await queryRunner.query(
            `INSERT INTO "sprint" ("id","sprintNumber","status" , "startDate","endDate","teamId") VALUES (2, 11, 1,'2021-02-26', '2021-03-10',1);`,
             );

          await queryRunner.query(
            `INSERT INTO "team_spirit" ("id","teamSpiritRating", "teamId", "sprintId") VALUES (1, 8, 1, 1);`,
             );
        
          await queryRunner.query(
            `INSERT INTO "client_status" ("id","clientRating", "teamId", "sprintId") VALUES (1, 4, 1, 1);`,
             );
        
          await queryRunner.query(
            `INSERT INTO "user" ("id", "name", "teamId") VALUES (10, 'john',1);`,
          );
          await queryRunner.query(
            `INSERT INTO "user" ("id", "name", "teamId") VALUES (11, 'Azhar',2);`,
          );
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
