import { Column, Entity, ObjectId, ObjectIdColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Stream } from "./stream.entity";

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @PrimaryColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username?: string

  @Column()
  email?: string;

  @OneToOne(type => Stream, stream => stream.user)
  stream?: Stream;

  constructor(id: number, firstName: string, lastName: string, username?: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
  }
}
