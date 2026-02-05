# Step 1

1. `npm i -g @nestjs/cli`:
   - Dijalankan untuk menginstal NestJS CLI secara global pada sistem Anda. Ini memungkinkan Anda untuk membuat dan mengelola proyek NestJS dengan mudah melalui perintah baris.

2. `nest new project-name`:
   - Digunakan untuk membuat proyek NestJS baru dengan nama yang ditentukan (ganti `project-name` dengan nama proyek yang diinginkan). Perintah ini akan menghasilkan struktur dasar proyek NestJS beserta file konfigurasi yang diperlukan.

# Step 2

3. `npm install --save @nestjs/sequelize sequelize sequelize-typescript pg pg-hstore`:
   - Perintah ini menginstal paket-paket yang diperlukan untuk menggunakan Sequelize sebagai ORM (Object-Relational Mapping) dalam proyek NestJS Anda, serta dukungan untuk database PostgreSQL.

   `npm i -D sequelize-cli`
   - Perintah ini menginstal Sequelize CLI (Command Line Interface) sebagai dependensi pengembangan. Sequelize CLI digunakan untuk mengelola migrasi database, pembuatan model, dan tugas-tugas terkait database lainnya.

4. Menambahkan konfigurasi Sequelize di `app.module.ts`:
   - Anda perlu mengimpor dan mengonfigurasi `SequelizeModule` di dalam file `app.module.ts` untuk menghubungkan aplikasi NestJS Anda dengan database PostgreSQL menggunakan Sequelize. Contoh konfigurasi dasar adalah sebagai berikut:

   ```typescript
   import { Module } from '@nestjs/common';
   import { SequelizeModule } from '@nestjs/sequelize';
   import { AppController } from './app.controller';
   import { AppService } from './app.service';

   @Module({
     imports: [
       SequelizeModule.forRoot({
         dialect: 'postgres',
         host: 'localhost',
         port: 5432,
         username: 'your-username',
         password: 'your-password',
         database: 'your-database',
         autoLoadModels: true,
         synchronize: false,
       }),
     ],
     controllers: [AppController],
     providers: [AppService],
   })
   export class AppModule {}
   ```

   - Gantilah `your-username`, `your-password`, dan `your-database` dengan kredensial database PostgreSQL Anda.
   - `autoLoadModels: true` memungkinkan Sequelize untuk memuat model secara otomatis.
   - `synchronize: false` menghindari sinkronisasi otomatis skema database, yang lebih aman untuk lingkungan produksi.

   - Jika ingin menyimpan ke .env file, Anda bisa menggunakan `@nestjs/config` untuk mengelola variabel lingkungan. Contoh konfigurasi `.env` adalah sebagai berikut:

   ```bash
   npm install @nestjs/config
   ```

   Kemudian di `app.module.ts`:

   ```typescript
   import { ConfigModule } from '@nestjs/config';
   @Module({
     imports: [
       ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: '.env',
       }),
       ... // other imports
     ],
   })
   ```

5. `npm run start:dev`:
   - Perintah ini digunakan untuk menjalankan aplikasi NestJS dalam mode pengembangan. Ini memungkinkan Anda untuk melihat perubahan secara langsung tanpa perlu memulai ulang server setiap kali Anda melakukan perubahan pada kode sumber.

# Step 3

6. Menjalankan generator NestJS:

```bash
   nest g module users
   nest g controller users --no-spec
   nest g service users --no-spec

   nest g module posts
   nest g controller posts --no-spec
   nest g service posts --no-spec

   nest g module auth
   nest g controller auth --no-spec
   nest g service auth --no-spec
```

- Perintah-perintah di atas digunakan untuk menghasilkan modul, controller, dan service untuk fitur `users`, `posts`, dan `auth` dalam proyek NestJS Anda. Opsi `--no-spec` digunakan untuk menghindari pembuatan file spesifikasi (test files) secara otomatis.

# Step 4

7. Membuat model Sequelize untuk `User` dan `Post`:

- Buat file `user.model.ts` di dalam folder `users` dengan isi sebagai berikut:

```typescript
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;
}
```

8. Menambahkan konfigurasi Sequelize di masing-masing module (contoh untuk `users.module.ts`):

- Di dalam file `users.module.ts`, Anda perlu mengimpor `SequelizeModule` dan mendaftarkan model yang sesuai untuk masing-masing modul. Contoh konfigurasi untuk `users.module.ts` adalah sebagai berikut:

```typescript
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

# Step 5

9. Membuat file DTO (Data Transfer Object) untuk `CreateUserDto` di dalam folder `users`(src/users/dto/create-user.dto.ts):

```typescript
export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}
```

10. Implementasi CRUD di `users.service.ts` dan `users.controller.ts`:

- Contoh implementasi metode `create` di dalam `users.service.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }
  // Implementasi metode lainnya (findAll, findOne, update, remove) sesuai kebutuhan.
}
```

- Contoh implementasi metode `create` di dalam `users.controller.ts`:

```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  // Implementasi metode lainnya sesuai kebutuhan.
}
```

11. Testing endpoint menggunakan Postman atau Insomnia, endpoint dapat diketahui berdasarkan dari controller yang telah dibuat, misalnya untuk `users` endpointnya adalah `http://localhost:3000/users`.
