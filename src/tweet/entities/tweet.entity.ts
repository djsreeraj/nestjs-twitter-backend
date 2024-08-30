import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TweetLike } from "./tweet-like.entity";

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, user => user.tweets, {
    onDelete: "CASCADE"  // Deletes all tweets if the user is deleted
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  // Relationship to manage retweets; links back to the original tweet
  @ManyToOne(() => Tweet, tweet => tweet.retweets, {
    nullable: true,
    onDelete: "SET NULL"  // Set the originalTweet to null if the original tweet is deleted
  })
  originalTweet: Tweet | null;

  // List of retweets this tweet has, each retweet is a standalone tweet
  @OneToMany(() => Tweet, tweet => tweet.originalTweet, {
    cascade: ["insert"]  // Allows for automatic insertion of retweets
  })
  retweets: Tweet[];

  @OneToMany(() => TweetLike, tweetLike => tweetLike.tweet)
  likes: TweetLike[];
}
