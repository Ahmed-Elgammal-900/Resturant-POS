import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DeletedEmails {
  @PrimaryGeneratedColumn()
  ID: string;

  @Column()
  email: string;
}
