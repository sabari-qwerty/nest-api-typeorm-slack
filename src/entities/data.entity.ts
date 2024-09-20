import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Data {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  property: string;

  @Column()
  url: string;

  constructor() {
    if (!this.id) {
      this.id == uuidv4();
    }
  }
}
