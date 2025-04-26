import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string;

  @Column()
  email: string;

  @Column()
  PASSWORD: string;
}
