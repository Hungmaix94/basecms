# Tài liệu Hướng dẫn - BaseCMS Project

Chào mừng đến với tài liệu hướng dẫn của dự án BaseCMS - một hệ thống quản lý nội dung toàn diện với Strapi CMS và Next.js.

## 📚 Mục lục

1. [Tổng quan dự án](./01-project-overview.md)
2. [Cài đặt và Khởi động](./02-installation.md)
3. [Cấu trúc dự án](./03-project-structure.md)
4. [Strapi CMS](./04-strapi-cms.md)
5. [Page Builder](./05-page-builder.md)
6. [Landing Page Application](./06-landing-page.md)
7. [API và Tích hợp](./07-api-integration.md)
8. [Deployment](./08-deployment.md)
9. [Troubleshooting](./09-troubleshooting.md)

## 🚀 Bắt đầu nhanh

```bash
# Clone repository
git clone <repository-url>
cd basecms

# Cài đặt dependencies
cd strapi && yarn install
cd ../landingpage && yarn install

# Khởi động services
docker-compose up -d  # PostgreSQL, MinIO
cd strapi && yarn develop
cd ../landingpage && yarn dev
```

## 🔗 Liên kết nhanh

- **Strapi Admin**: http://localhost:1337/admin
- **Landing Page**: http://localhost:3000
- **Page Builder**: http://localhost:1337/admin/plugins/page-builder
- **API Documentation**: http://localhost:1337/documentation

## 📞 Hỗ trợ

Nếu bạn gặp vấn đề, vui lòng tham khảo phần [Troubleshooting](./09-troubleshooting.md) hoặc tạo issue trên GitHub.
