import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  count: number;

  @Column()
  order_id: number;
}
