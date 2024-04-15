import { Column, Entity, ObjectIdColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Stream {
    @ObjectIdColumn()
    id: number;

    @Column()
    filename: string;

    @Column()
    files: string[];

    @OneToOne(type => User, user => user.id)
    user: User;
}