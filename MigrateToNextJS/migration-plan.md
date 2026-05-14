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

## 8. Kế hoạch migrate phần tiếp theo theo tính năng

Sau khi hoàn tất Auth và Lesson/Test, phần tiếp theo nên được chia theo feature để bám sát hành trình người dùng và giảm phụ thuộc chéo giữa các màn hình.

### 8.1. Course Discovery
- Migrate trang home student và trang tìm kiếm khóa học.
- Migrate course list, course card, filter, sort, recommend course.
- Chuẩn hóa các API cho course detail, related course, bundle, teacher list.
- Mục tiêu: người dùng có thể tìm, lọc và mở trang chi tiết khóa học ổn định.

### 8.2. Course Detail & Enrollment
- Migrate trang chi tiết khóa học.
- Migrate các component mô tả khóa học, curriculum, FAQ, review, announcement.
- Tích hợp luồng đăng ký học, trạng thái đã mua/chưa mua, và điều kiện truy cập bài học.
- Mục tiêu: từ trang chi tiết có thể đi sang enroll hoặc học tiếp mà không đứt luồng.

### 8.3. Cart, Order & Payment
- Migrate giỏ hàng, checkout, danh sách đơn hàng, chi tiết đơn hàng.
- Migrate payment callback và trang hiển thị kết quả thanh toán.
- Chuẩn hóa các API cart, order, payment và trạng thái pending/success/failed.
- Mục tiêu: hoàn tất toàn bộ luồng mua khóa học từ thêm vào giỏ đến thanh toán.

### 8.4. Favourite, Notifications & Personal Library
- Migrate trang khóa học yêu thích và thông báo.
- Đồng bộ badge/unread count nếu backend hỗ trợ.
- Migrate các thành phần liên quan đến danh sách khóa học đã lưu và lịch sử tương tác của user.
- Mục tiêu: giữ được các tính năng theo dõi nội dung cá nhân sau khi người học đăng nhập.

### 8.5. Profile & Account Settings
- Migrate trang xem hồ sơ, chỉnh sửa hồ sơ và cài đặt tài khoản.
- Tích hợp upload avatar, validate form, đồng bộ dữ liệu user.
- Tái sử dụng các component form và validation đã có để giảm trùng lặp.
- Mục tiêu: người dùng tự quản lý thông tin cá nhân mà không phải rời khỏi Next.js app.

### 8.6. Teacher Workspace
- Migrate trang quản lý khóa học của teacher, gradebook, bundle, student drop.
- Chuẩn hóa layout và quyền truy cập theo role teacher.
- Tách API dùng chung cho teacher để tránh lặp logic với student flow.
- Mục tiêu: teacher có thể quản lý nội dung và tiến độ học viên trên cùng hệ thống.

### 8.7. Admin Dashboard
- Migrate user management, category, topic/level, course management, review analytics, chart dashboards.
- Tổ chức lại sidebar, navbar, role-based layout, và các bảng dữ liệu admin.
- Mục tiêu: admin có đủ công cụ quản trị mà không phụ thuộc vào React cũ.

### 8.8. Chat, AI & Writing
- Migrate chat, chat AI, writing task, writing result, realtime notification nếu có socket/websocket.
- Chuẩn hóa client-side state cho realtime message và upload media.
- Mục tiêu: hoàn tất các feature nâng cao sau khi các luồng core đã ổn định.

### 8.9. Ưu tiên triển khai đề xuất
1. Course Discovery
2. Course Detail & Enrollment
3. Cart, Order & Payment
4. Favourite, Notifications & Personal Library
5. Profile & Account Settings
6. Teacher Workspace
7. Admin Dashboard
8. Chat, AI & Writing

### 8.10. Tiêu chí hoàn thành cho mỗi feature
- Route mới render đúng trên app router.
- API wrapper và types compile không lỗi.
- Component chính có loading state, error state và empty state.
- Luồng điều hướng sau action chính xác, không bị 404 hay redirect sai.
- Nếu feature có form thì cần validate và hiển thị lỗi rõ ràng.
- Nếu feature có dữ liệu realtime hoặc media thì cần kiểm thử riêng trên desktop và mobile.

### 8.11. Cách chia việc thực tế
- Làm service/type trước, sau đó mới ghép page và component.
- Feature nào độc lập thì có thể migrate song song với feature khác.
- Mỗi feature nên có một log riêng để dễ đối chiếu trạng thái hoàn thành.
- Sau khi xong một feature, chạy kiểm thử tối thiểu trước khi chuyển sang feature kế tiếp.

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
