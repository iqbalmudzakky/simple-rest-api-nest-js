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

   - setelah itu membuat file `.sequelizerc` di root project dan mebuat file `sequelize.config.js` di root project. Contoh nya bisa dilihat pada project nestjs yang telah dibuat.

   - kemudian jalankan perintah berikut untuk membuat folder `migrations`:

   ```bash
   <!-- npx sequelize-cli init -->
   npx sequelize-cli migration:generate --name create-users
   ```

   - Edit file migration yang telah dibuat di folder `database\migrations` sesuai kebutuhan.

   - Jalankan perintah berikut untuk menjalankan migrasi:

   ```bash
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   ```

   - Jika ingin menambahkan kolom baru pada tabel yang sudah ada, buat migration baru dengan perintah:

   ```bash
   npx sequelize-cli migration:generate --name add-new-column
   ```

   kemudian edit file migration yang telah dibuat untuk menambahkan kolom baru, lalu jalankan kembali perintah migrasi di atas.
   - Jika model sudah dibuat, dan ingin menambahkan kolom baru, setelah membuat migration baru, jangan lupa untuk menambahkan kolom baru pada model yang bersangkutan.

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

12. Untuk handle validation error dari sequelize, bisa dengan menggunakan Global Exception Filter di NestJS. Buat file `sequelize-exception.filter.ts` di folder `common/filters`, isi nya bisa dilihat pada project nestjs yang telah dibuat. Lalu daftarkan filter tersebut di `main.ts`.

# Step 6

13. Menambahkan fitur hashing password menggunakan bcryptjs, install package terlebih dahulu, buat file bcrypt.util.ts di folder common/utils, lalu gunakan util tersebut di users.service.ts sebelum menyimpan user baru. Contoh implementasi bisa dilihat pada project nestjs yang telah dibuat.

14. Implementasi fitur autentikasi menggunakan JWT:

- install package seperti pada express, kemudian buat file jwt.util.ts di folder common/utils, isi nya bisa dilihat pada project nestjs yang telah dibuat.

- `npm i @nestjs/jwt passport-jwt @nestjs/passport passport`:
  ini untuk menginstal paket-paket yang diperlukan untuk mengimplementasikan auth guard nantinya.
  - Atau bisa juga mengikuti implementasi jwt pada project nestjs yang telah dibuat.

- tambahkan env variable untuk jwt secret di file .env

- update auth module seperti pada project nestjs yang telah dibuat.

- update users module untuk mengekspor UsersService agar bisa digunakan di AuthService.

- membuat DTO untuk login di folder auth/dto/login.dto.ts

- tambah metode findByEmail di users.service.ts

- update code auth.service.ts

- buat endpoint login di auth.controller.ts

- testing endpoint login menggunakan Postman atau Insomnia, endpointnya adalah `http://localhost:3000/auth/login`.

15. JWT Strategy dan Auth Guard:

- Buat file jwt.strategy.ts di folder auth/, isi nya bisa dilihat pada project nestjs yang telah dibuat.

- update auth.module.ts untuk menambahkan JwtStrategy sebagai provider.

- gunakan AuthGuard di controller yang ingin dilindungi, contoh di posts.controller.ts pada project nestjs yang telah dibuat.

- untuk mengambil data user dari token jwt, bisa langsung menggunakan req.user pada method di controller, contoh di posts.controller.ts pada project nestjs yang telah dibuat.

# Step 7

16. Setup e2e testing file:

- pastikan file jest-e2e.json sudah ada di test/jest-e2e.json
- buat file auth.e2e-spec.ts di folder test/, isi nya bisa dilihat pada project nestjs yang telah dibuat.
- jangan lupa buat environment variable di file .env.test untuk testing database.
- update jest-e2e.json untuk menambahkan setupFiles, liat pada project nestjs yang telah dibuat.
- buat file setEnv.ts di folder .jest/, isi nya bisa dilihat pada project nestjs yang telah dibuat.
- pastikan docker container untuk testing database sudah berjalan.
