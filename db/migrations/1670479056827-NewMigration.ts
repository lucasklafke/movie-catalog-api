import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1670479056827 implements MigrationInterface {
  name = 'NewMigration1670479056827';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "movie" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "director" character varying NOT NULL, "genre" character varying NOT NULL, "release_date" TIMESTAMP NOT NULL, "image_url" character varying, CONSTRAINT "UQ_cee7125f3cbad047d34a6e13539" UNIQUE ("name"), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "movie"`);
  }
}
