import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialUserTweetsMG1725286353783 implements MigrationInterface {
    name = 'InitialUserTweetsMG1725286353783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tweet" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userUid" character varying, "originalTweetId" integer, CONSTRAINT "PK_6dbf0db81305f2c096871a585f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tweet_like" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userUid" character varying, "tweetId" integer, CONSTRAINT "PK_865efe9d84efd500a0789155218" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`CREATE TABLE "users" ("uid" character varying NOT NULL, "email" character varying NOT NULL, "emailVerified" boolean NOT NULL, "firstName" character varying(15) NOT NULL, "lastName" character varying(15) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', CONSTRAINT "PK_6e20ce1edf0678a09f1963f9587" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`ALTER TABLE "tweet" ADD CONSTRAINT "FK_c475a09237d19fda087582f1a7e" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tweet" ADD CONSTRAINT "FK_e4db3ae6f2260efdd275d2e184c" FOREIGN KEY ("originalTweetId") REFERENCES "tweet"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tweet_like" ADD CONSTRAINT "FK_909e42fdbe4e22fd177203a0024" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tweet_like" ADD CONSTRAINT "FK_ca377a6c2e3b53128b27ee07485" FOREIGN KEY ("tweetId") REFERENCES "tweet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweet_like" DROP CONSTRAINT "FK_ca377a6c2e3b53128b27ee07485"`);
        await queryRunner.query(`ALTER TABLE "tweet_like" DROP CONSTRAINT "FK_909e42fdbe4e22fd177203a0024"`);
        await queryRunner.query(`ALTER TABLE "tweet" DROP CONSTRAINT "FK_e4db3ae6f2260efdd275d2e184c"`);
        await queryRunner.query(`ALTER TABLE "tweet" DROP CONSTRAINT "FK_c475a09237d19fda087582f1a7e"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "tweet_like"`);
        await queryRunner.query(`DROP TABLE "tweet"`);
    }

}
