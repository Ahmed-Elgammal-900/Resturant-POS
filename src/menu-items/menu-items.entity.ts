import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MenuItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  category: string;
}
