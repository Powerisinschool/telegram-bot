import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Stream } from "./stream.entity";

@Entity()
export class File {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    filename: string;

    @Column()
    mimetype: string;

    @OneToMany(() => Stream, stream => stream.files)
    buffer: Stream;
}