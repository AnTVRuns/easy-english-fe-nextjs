# Kế hoạch migrate từ easy-english-fe (React) sang easy-english-fe-nextjs (Next.js)

## 1. Đánh giá & Chuẩn bị
- Đánh giá cấu trúc source code hiện tại của easy-english-fe.
- Xác định các thành phần, page, service, asset, và các logic cần migrate.
- Kiểm tra các thư viện đang sử dụng, xác định các package cần thay thế hoặc cập nhật cho Next.js.
- Xác định các route, layout, và cấu trúc thư mục phù hợp với Next.js.

## 2. Thiết lập dự án Next.js
- Khởi tạo dự án Next.js (đã có easy-english-fe-nextjs).
- Thiết lập cấu hình TypeScript, ESLint, Prettier, PostCSS, Tailwind (nếu cần).
- Cấu hình các thư mục: `app/`, `public/`, `components/`, `services/`, `utils/`, ...

## 3. Migrate các thành phần chính
- **Assets & Static files**: Di chuyển các file trong `public/` và `src/assets/` sang `public/` của Next.js.
- **Components**: Migrate từng component từ `src/components/` sang `easy-english-fe-nextjs/components/`.
- **Utils & Services**: Migrate các file trong `src/utils/` và `src/services/` sang Next.js, điều chỉnh import/export nếu cần.
- **Store (Redux, Context, ...)**: Thiết lập lại store phù hợp với Next.js (nếu dùng Redux, sử dụng next-redux-wrapper hoặc tương tự).
- **i18n**: Thiết lập i18n cho Next.js (next-i18next hoặc tương tự), migrate file locale.

## 4. Migrate Routing & Pages
- Chuyển các page từ `src/pages/` sang `app/` hoặc `pages/` của Next.js.
- Chuyển đổi các route động, nested route theo chuẩn Next.js.
- Thiết lập layout (app/layout.tsx) và các layout con nếu cần.

## 5. Xử lý các vấn đề đặc thù
- **SSR/CSR**: Xác định các component/page cần SSR, CSR hoặc SSG.
- **API calls**: Điều chỉnh các API call cho phù hợp với môi trường Next.js (fetch server/client, env).
- **Auth**: Điều chỉnh logic authentication cho Next.js (middleware, API route, ...).
- **Custom Document, Head, SEO**: Thiết lập _document, _app, metadata, SEO.

## 6. Kiểm thử & Hoàn thiện
- Viết test cho các component/page chính.
- Kiểm thử toàn bộ luồng chức năng.
- Fix bug, tối ưu performance, bundle size.

## 7. Triển khai & Bảo trì
- Thiết lập CI/CD, Dockerfile, cấu hình deploy.
- Viết tài liệu hướng dẫn sử dụng, phát triển, bảo trì.

---

## Checklist migrate (cập nhật khi thực hiện)
- [ ] Đánh giá & chuẩn bị
- [ ] Thiết lập dự án Next.js
- [ ] Migrate assets/static
- [ ] Migrate components
- [ ] Migrate utils/services
- [ ] Thiết lập store/i18n
- [ ] Migrate routing/pages
- [ ] Xử lý SSR/CSR/API/Auth
- [ ] Kiểm thử & hoàn thiện
- [ ] Triển khai & bảo trì
