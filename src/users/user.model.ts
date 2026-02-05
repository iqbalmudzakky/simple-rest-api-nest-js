import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Post } from 'src/posts/post.model';

export interface UserCreationAttributes {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
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
        args: [2, 50],
        msg: 'Name must be between 2 and 50 characters long',
      },
      notNull: { msg: 'Name is required' },
      notEmpty: { msg: 'Name cannot be empty' },
    },
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: 'Invalid email format' },
      notNull: { msg: 'Email is required' },
      notEmpty: { msg: 'Email cannot be empty' },
    },
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 100],
        msg: 'Password must be at least 8 characters long',
      },
      // is: {
      //   args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      //   msg: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      // },
      notNull: { msg: 'Password is required' },
      notEmpty: { msg: 'Password cannot be empty' },
    },
  })
  declare password: string;

  @HasMany(() => Post)
  declare posts: Post[];
}
