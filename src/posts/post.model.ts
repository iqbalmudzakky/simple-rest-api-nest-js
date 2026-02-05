import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';

export interface PostCreationAttributes {
  title: string;
  content: string;
  userId: number;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [1, 255],
        msg: 'Title must be between 1 and 255 characters',
      },
      notNull: { msg: 'Title is required' },
      notEmpty: { msg: 'Title cannot be empty' },
    },
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    validate: {
      notNull: { msg: 'Content is required' },
      notEmpty: { msg: 'Content cannot be empty' },
    },
  })
  declare content: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: 'User ID is required' },
      notEmpty: { msg: 'User ID cannot be empty' },
    },
  })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;
}
