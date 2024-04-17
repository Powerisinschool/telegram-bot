import { Column, Entity, ManyToOne, ObjectIdColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { File } from './file.entity';

@Entity()
export class Stream {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @OneToMany(() => File, file => file.buffer, { eager: true })
    files: File[];

    @ManyToOne(() => User, user => user.stream, { eager: true })
    user: User;
}