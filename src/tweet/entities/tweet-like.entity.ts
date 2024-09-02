import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tweet } from "./tweet.entity";

@Entity()
export class TweetLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.likes, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Tweet, tweet => tweet.likes, { onDelete: "CASCADE" })
  tweet: Tweet;

  @CreateDateColumn()
  createdAt: Date;
}
