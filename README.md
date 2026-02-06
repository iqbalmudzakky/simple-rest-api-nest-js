# NestJS REST API dengan JWT Authentication

Sebuah REST API sederhana dan scalable yang dibangun dengan NestJS dan TypeScript, dilengkapi dengan JWT authentication, database PostgreSQL, dan E2E testing yang komprehensif.

## 📋 Ringkasan Proyek

Proyek ini adalah REST API seperti blog yang mendemonstrasikan implementasi dari:

- Dua operasi CRUD yang saling berkaitan (Users dan Posts)
- Autentikasi berbasis JWT
- Integrasi database SQL (PostgreSQL)
- E2E testing untuk alur autentikasi
- Clean architecture patterns

## ✨ Fitur

- 🔐 **JWT Authentication** - Login aman dengan access token
- 👥 **User Management** - Operasi CRUD untuk users
- 📝 **Post Management** - Operasi CRUD untuk posts (milik user)
- 🔗 **Relational Data** - Relasi One-to-Many antara Users dan Posts
- 🗃️ **PostgreSQL Database** - Database SQL dengan Sequelize ORM
- 🧪 **E2E Testing** - Testing autentikasi dan API yang komprehensif
- ✅ **Input Validation** - Aturan validasi di level model
- 🛡️ **Error Handling** - Global exception filters

## 🛠 Tech Stack

- **Framework**: NestJS 10.x
- **Bahasa**: TypeScript 5.x
- **Database**: PostgreSQL
- **ORM**: Sequelize dengan sequelize-typescript
- **Authentication**: JWT (@nestjs/jwt, passport-jwt)
- **Testing**: Jest + Supertest
- **Validasi**: Sequelize validators
- **Environment**: dotenv untuk konfigurasi

## 🏗️ Architecture Pattern

### **Modular Architecture + Layered Architecture**

Project ini menggunakan kombinasi **Modular Architecture** dan **Layered Architecture**. Berikut alasan pemilihan pattern ini:

#### **1. Modular Architecture**

```
src/
├── auth/          # Modul autentikasi
├── users/         # Modul users
├── posts/         # Modul posts
└── common/        # Utilitas bersama
```

**Keuntungan:**

- ✅ **Separation of Concerns** - Setiap module bertanggung jawab atas satu domain spesifik
- ✅ **Scalability** - Mudah menambah fitur baru tanpa mengubah module lain
- ✅ **Reusability** - Module dapat di-import dan digunakan kembali
- ✅ **Team Collaboration** - Tim dapat bekerja pada module berbeda secara parallel
- ✅ **Testing** - Mudah melakukan unit test dan mock dependencies
- ✅ **Lazy Loading** - Module dapat dimuat sesuai kebutuhan (optimal untuk microservices)

#### **2. Layered Architecture**

Setiap module mengikuti layer pattern:

```
Module/
├── controller.ts   # Presentation Layer (handling HTTP)
├── service.ts      # Business Logic Layer
├── model.ts        # Data Access Layer (entitas ORM)
└── dto/           # Data Transfer Objects (validasi)
```

**Keuntungan:**

- ✅ **Single Responsibility** - Setiap layer punya tanggung jawab jelas
- ✅ **Dependency Direction** - Controller → Service → Model (unidirectional flow)
- ✅ **Testability** - Layer dapat di-test secara independen dengan mock
- ✅ **Maintainability** - Business logic terpisah dari HTTP concerns
- ✅ **Flexibility** - Mudah mengganti implementasi (misal: ganti ORM)

#### **3. Design Patterns yang Diimplementasikan**

**a) Dependency Injection Pattern**

```typescript
@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostModel)
    private postModel: typeof PostModel,
  ) {}
}
```

- Loose coupling antar komponen
- Mudah testing dengan mock dependencies
- NestJS memiliki built-in IoC container

**b) Repository Pattern (via Sequelize)**

```typescript
this.postModel.create(dto);
this.postModel.findAll();
```

- Abstraksi data access
- Tidak perlu raw SQL queries
- Operasi database yang type-safe

**c) DTO Pattern**

```typescript
export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}
```

- Validasi input
- Type safety
- API contract yang jelas

**d) Guard Pattern (JWT Authentication)**

```typescript
@UseGuards(JwtAuthGuard)
@Get()
findAll() { ... }
```

- Otorisasi deklaratif
- Logic autentikasi yang dapat digunakan kembali
- Proteksi di level route

#### **Mengapa Pattern Ini Dipilih?**

1. **Maintainability** 🔧
   - Code terstruktur dengan baik, mudah dibaca dan di-maintain
   - Perubahan di satu layer tidak affect layer lain

2. **Scalability** 📈
   - Mudah menambah module baru (misal: Comments, Categories)
   - Dapat di-scale menjadi microservices jika diperlukan

3. **Testability** 🧪
   - Setiap layer dapat di-test independen
   - Mock dependencies dengan mudah
   - E2E test terpisah dari unit test

4. **Team Productivity** 👥
   - Developer dapat fokus pada satu module/layer
   - Standard pattern yang familiar bagi NestJS developers
   - Code review lebih mudah

5. **Best Practices** ✨
   - Mengikuti NestJS official recommendations
   - SOLID principles
   - Clean architecture concepts

## 📦 Struktur Proyek

```
server-nest-test/
├── src/
│   ├── auth/                    # Modul autentikasi
│   │   ├── auth.controller.ts   # Endpoint login
│   │   ├── auth.service.ts      # Pembuatan JWT token
│   │   └── auth.module.ts       # Konfigurasi modul auth
│   ├── users/                   # Modul users
│   │   ├── users.controller.ts  # Endpoint user
│   │   ├── users.service.ts     # Business logic user
│   │   ├── user.model.ts        # Entitas & validasi user
│   │   └── dto/
│   │       └── create-user.dto.ts
│   ├── posts/                   # Modul posts
│   │   ├── posts.controller.ts  # Endpoint post
│   │   ├── posts.service.ts     # Business logic post
│   │   ├── post.model.ts        # Entitas & relasi post
│   │   └── dto/
│   │       └── create-post.dto.ts
│   ├── common/                  # Utilitas bersama
│   │   └── filters/
│   │       └── sequelize-exception.filter.ts
│   ├── app.module.ts            # Modul root
│   └── main.ts                  # Entry point aplikasi
├── test/                        # E2E tests
│   ├── auth.e2e-spec.ts         # Testing alur auth
│   └── .jest/
│       └── setEnv.ts            # Setup environment test
├── .env                         # Konfigurasi development
├── .env.test                    # Konfigurasi test
└── docker-compose.yml           # Container PostgreSQL

```

## 🚀 Memulai

### Prasyarat

- Node.js >= 18.x
- Docker & Docker Compose (untuk PostgreSQL)
- npm atau yarn

### Instalasi

1. **Clone repository**

```bash
git clone <repository-url>
cd server-nest-test
```

2. **Install dependensi**

```bash
npm install
```

3. **Setup environment variables**

Buat file `.env`:

```env
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=nestuser
DB_PASSWORD=nestpass123
DB_NAME=nestdb
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
PORT=3000
```

Buat file `.env.test`:

```env
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=nestuser
DB_PASSWORD=nestpass123
DB_NAME=nestdb_test
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
```

4. **Jalankan PostgreSQL**

```bash
docker-compose up -d
```

5. **Jalankan aplikasi**

```bash
# Mode development dengan hot reload
npm run start:dev

# Mode production
npm run start:prod
```

Aplikasi akan berjalan di `http://localhost:3000`

## 🧪 Testing

### E2E Tests

```bash
npm run test:e2e
```

E2E tests mencakup:

- ✅ Alur autentikasi (login & validasi token)
- ✅ Akses route yang dilindungi dengan JWT
- ✅ Pembuatan user
- ✅ Penolakan akses yang tidak terotorisasi

### Unit Tests

```bash
npm run test

# Dengan coverage
npm run test:cov
```

## 📚 Dokumentasi API (file postman ada di root project)

### Base URL

```
http://localhost:3000
```

### Authentication

#### Register/Buat User

```http
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "gender": "male"  // opsional: "male" | "female"
}
```

**Respons:** `201 Created`

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "gender": "male",
  "createdAt": "2026-02-06T...",
  "updatedAt": "2026-02-06T..."
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Respons:** `201 Created`

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Users

#### Ambil Semua Users

```http
GET /users
Authorization: Bearer <access_token>
```

**Respons:** `200 OK`

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "gender": "male",
    "posts": []
  }
]
```

#### Ambil User Berdasarkan ID

```http
GET /users/:id
Authorization: Bearer <access_token>
```

### Posts

#### Buat Post

```http
POST /posts
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the content of my first post.",
  "userId": 1
}
```

**Respons:** `201 Created`

```json
{
  "id": 1,
  "title": "My First Post",
  "content": "This is the content of my first post.",
  "userId": 1,
  "createdAt": "2026-02-06T...",
  "updatedAt": "2026-02-06T..."
}
```

#### Ambil Semua Posts

```http
GET /posts
Authorization: Bearer <access_token>
```

**Respons:** `200 OK`

```json
[
  {
    "id": 1,
    "title": "My First Post",
    "content": "This is the content...",
    "userId": 1,
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
]
```

### Respons Error

#### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

#### 400 Bad Request (Error Validasi)

```json
{
  "statusCode": 400,
  "message": "Validation error details...",
  "error": "Bad Request"
}
```

## 🔒 Fitur Keamanan

- **Password Hashing** - Password disimpan dengan aman (implementasi bcrypt untuk production)
- **JWT Tokens** - Autentikasi stateless
- **Input Validation** - Validator di level model mencegah data tidak valid
- **SQL Injection Prevention** - Sequelize ORM menggunakan parameterized queries
- **Environment Variables** - Data sensitif tidak di-hardcode

## 🐳 Skema Database

### Tabel Users

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  gender ENUM('male', 'female'),
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

### Tabel Posts

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  userId INTEGER REFERENCES users(id) ON DELETE CASCADE,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

## 📝 Catatan Development

### Peningkatan Type Safety

1. **Konsistensi DTO dan Model**
   - Membuat interface `UserCreationAttributes` dan `PostCreationAttributes`
   - Memastikan DTO sesuai dengan requirement model tanpa menggunakan `as any`

2. **Integrasi Sequelize TypeScript**
   - Menggunakan explicit creation interfaces sebagai parameter generic kedua
   - Menghindari circular reference errors

3. **Konfigurasi JWT**
   - Menggunakan `JwtModule.registerAsync()` dengan `ConfigService`
   - Manajemen konfigurasi yang type-safe

### Issue Umum & Solusi

**Issue**: `Type 'CreateUserDto' is not assignable to parameter`
**Solusi**: Definisikan explicit creation interfaces di models

**Issue**: `Cannot find module 'src/app.module'` di tests
**Solusi**: Gunakan relative imports atau konfigurasi `moduleNameMapper` di Jest config

**Issue**: Koneksi database di tests
**Solusi**: Gunakan file `.env.test` terpisah dengan test database

## 🤝 Kontribusi

1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/FiturBaru`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan FiturBaru'`)
4. Push ke branch (`git push origin feature/FiturBaru`)
5. Buka Pull Request

## 📄 Lisensi

Proyek ini menggunakan [lisensi MIT](LICENSE).

## 👨‍💻 Penulis

Dibuat sebagai bagian dari proyek pembelajaran NestJS.

## 🔗 Sumber Referensi

- [NestJS Documentation](https://docs.nestjs.com)
- [Sequelize Documentation](https://sequelize.org)
- [JWT.io](https://jwt.io)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
