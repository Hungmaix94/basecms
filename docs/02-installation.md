# Cài đặt và Khởi động

## Yêu cầu Tiên quyết

Trước khi bắt đầu, đảm bảo bạn đã cài đặt:

- **Node.js** >= 18.0.0 (khuyến nghị v22.19.0)
- **Docker** và **Docker Compose**
- **Git**
- **pnpm** hoặc **yarn** package manager

## Bước 1: Clone Repository

```bash
git clone <repository-url>
cd basecms
```

## Bước 2: Cấu hình Environment Variables

### Strapi (.env)

Tạo file `.env` trong thư mục `/strapi`:

```bash
cd strapi
cp .env.example .env
```

Cập nhật các biến môi trường:

```env
# Server
HOST=0.0.0.0
PORT=1337
APP_KEYS=<generate-random-keys>
API_TOKEN_SALT=<generate-random-salt>
ADMIN_JWT_SECRET=<generate-random-secret>
TRANSFER_TOKEN_SALT=<generate-random-salt>
JWT_SECRET=<generate-random-secret>

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
DATABASE_SSL=false

# MinIO S3 Storage
S3_ENDPOINT=localhost
S3_PORT=9000
S3_BUCKET=strapi
S3_ACCESS_KEY_ID=minioadmin
S3_ACCESS_SECRET=minioadmin
S3_USE_SSL=false
S3_REGION=us-east-1

# URLs
STRAPI_URL=http://localhost:1337
FRONTEND_URL=http://localhost:3000
```

### Landing Page (.env.local)

Tạo file `.env.local` trong thư mục `/landingpage`:

```bash
cd ../landingpage
cp .env.example .env.local
```

Cập nhật:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=<your-strapi-api-token>
```

## Bước 3: Khởi động Docker Services

Từ thư mục root của project:

```bash
docker-compose up -d
```

Lệnh này sẽ khởi động:
- PostgreSQL (port 5432)
- MinIO (port 9000, console: 9001)

Kiểm tra services đang chạy:

```bash
docker-compose ps
```

## Bước 4: Cài đặt Dependencies

### Cài đặt Strapi

```bash
cd strapi
yarn install
# hoặc
pnpm install
```

### Cài đặt Landing Page

```bash
cd ../landingpage
yarn install
# hoặc
pnpm install
```

### Cài đặt Page Builder Packages

```bash
# Page Builder Plugin
cd ../packages/strapi-page-builder
pnpm install
pnpm build

# Page Builder React
cd ../strapi-page-builder-react
pnpm install
pnpm build
```

## Bước 5: Khởi động Strapi

```bash
cd ../../strapi
yarn develop
# hoặc
pnpm develop
```

Strapi sẽ khởi động tại: http://localhost:1337

### Tạo Admin User

Lần đầu tiên chạy Strapi, bạn cần tạo admin user:

1. Truy cập http://localhost:1337/admin
2. Điền thông tin admin:
   - Email: admin@admin.com
   - Password: Hung231194@ (hoặc password của bạn)
   - Xác nhận password
3. Click "Let's start"

## Bước 6: Cấu hình Strapi

### Tạo API Token

1. Vào **Settings** → **API Tokens**
2. Click **Create new API Token**
3. Nhập:
   - Name: "Landing Page Token"
   - Token type: "Full access"
   - Token duration: "Unlimited"
4. Copy token và thêm vào `.env.local` của landing page

### Cấu hình Permissions

1. Vào **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click **Public**
3. Enable permissions cho:
   - Landing Page: `find`, `findOne`
   - Blog Post: `find`, `findOne`
   - Category: `find`, `findOne`
   - Upload: `find`, `findOne`

## Bước 7: Khởi động Landing Page

```bash
cd ../landingpage
yarn dev
# hoặc
pnpm dev
```

Landing page sẽ khởi động tại: http://localhost:3000

## Bước 8: Kiểm tra Cài đặt

### Kiểm tra Strapi
- Admin panel: http://localhost:1337/admin
- API: http://localhost:1337/api
- Documentation: http://localhost:1337/documentation

### Kiểm tra Landing Page
- Homepage: http://localhost:3000
- Editor: http://localhost:3000/editor

### Kiểm tra Page Builder
- Page Builder: http://localhost:1337/admin/plugins/page-builder

## Troubleshooting

### Port đã được sử dụng

Nếu port 1337 hoặc 3000 đã được sử dụng:

```bash
# Tìm process đang sử dụng port
lsof -i :1337
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database connection error

Kiểm tra PostgreSQL đang chạy:

```bash
docker-compose ps postgres
```

Restart nếu cần:

```bash
docker-compose restart postgres
```

### MinIO connection error

Kiểm tra MinIO:

```bash
docker-compose ps minio
```

Truy cập MinIO console: http://localhost:9001
- Username: minioadmin
- Password: minioadmin

### Module not found

Xóa node_modules và cài lại:

```bash
rm -rf node_modules
yarn install
```

### Page Builder không load

1. Rebuild page builder packages:
```bash
cd packages/strapi-page-builder
pnpm build

cd ../strapi-page-builder-react
pnpm build
```

2. Restart Next.js dev server:
```bash
cd ../../landingpage
# Kill process và restart
yarn dev
```

3. Clear browser cache và hard refresh (Ctrl+Shift+R)

## Scripts Hữu ích

### Strapi

```bash
# Development
yarn develop

# Build
yarn build

# Start production
yarn start

# Strapi console
yarn strapi
```

### Landing Page

```bash
# Development
yarn dev

# Build
yarn build

# Start production
yarn start

# Lint
yarn lint
```

### Docker

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart service
docker-compose restart <service-name>
```

## Bước tiếp theo

Sau khi cài đặt thành công, tham khảo:
- [Cấu trúc dự án](./03-project-structure.md)
- [Strapi CMS](./04-strapi-cms.md)
- [Page Builder](./05-page-builder.md)
