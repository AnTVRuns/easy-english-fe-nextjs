# Tìm hiểu tính năng của dự án easy-english-fe (React)

## 1. Tổng quan dự án
- Dự án easy-english-fe là một ứng dụng web học tiếng Anh với nhiều tính năng phục vụ cho học viên, giáo viên và quản trị viên.
- Sử dụng ReactJS, Redux, i18n, và nhiều thư viện hỗ trợ UI/UX, xác thực, quản lý trạng thái, gọi API, v.v.

## 2. Các tính năng chính

### 2.1. Đăng nhập, đăng ký, xác thực
- Đăng nhập, đăng ký tài khoản học viên, giáo viên, quản trị viên.
- Xác thực OTP, quên mật khẩu, đổi mật khẩu.
- Quản lý thông tin người dùng, cập nhật hồ sơ cá nhân.

### 2.2. Quản lý khóa học
- Xem danh sách khóa học, chi tiết khóa học, đăng ký học.
- Quản lý bài học, bài kiểm tra, tiến trình học tập.
- Đánh giá, bình luận khóa học.

### 2.3. Quản lý bài học & kiểm tra
- Học bài lý thuyết, bài tập thực hành, bài kiểm tra trắc nghiệm, tự luận.
- Làm bài kiểm tra, xem kết quả, thống kê điểm số.
- Hỗ trợ audio, video, hình ảnh trong bài học.

### 2.4. Tính năng chat, thông báo, notification
- Chat giữa học viên và giáo viên.
- Nhận thông báo về bài học mới, kết quả kiểm tra, thông báo hệ thống.
- Notification realtime, toast, websocket.

### 2.5. Quản trị hệ thống & phân quyền động
- Quản lý người dùng, khóa học, bài học, câu hỏi, đơn hàng, v.v.
- Phân quyền truy cập động theo vai trò (admin, teacher, student), layout động.

### 2.6. Giỏ hàng & thanh toán
- Thêm khóa học vào giỏ hàng, đặt hàng, thanh toán.
- Quản lý đơn hàng, lịch sử mua hàng.

### 2.7. Đa ngôn ngữ
- Hỗ trợ tiếng Việt và tiếng Anh (i18n), chuyển đổi ngôn ngữ động.

### 2.8. Giao diện & trải nghiệm người dùng
- Responsive, tối ưu cho desktop và mobile.
- Sử dụng các component UI hiện đại, dễ sử dụng.
- Tùy biến theme, GlobalStyles, Chakra UI.

### 2.9. AI Chat, trợ lý ảo, hỗ trợ học tập
- Chat với AI, hỗ trợ luyện viết, giải đáp, gợi ý học tập.
- Tích hợp API AI cho chấm điểm, hỗ trợ bài viết, chuyển ảnh thành text.

### 2.10. Thống kê, phân tích, dashboard, biểu đồ
- Dashboard quản trị, biểu đồ phân tích khóa học, đánh giá, kết quả học tập.

### 2.11. Quản lý chủ đề, trình độ, phân loại
- Quản lý chủ đề, cấp độ khóa học, phân loại nội dung.

### 2.12. Quản lý học viên cho giáo viên
- Giáo viên quản lý học viên, điểm số, bảng điểm, drop học viên.

### 2.13. Bài kiểm tra đầu vào, phân loại trình độ
- Học viên làm bài kiểm tra đầu vào, xem kết quả, phân loại trình độ.

### 2.14. Tìm kiếm, gợi ý khóa học, giáo viên
- Tìm kiếm, gợi ý khóa học, giáo viên phù hợp.

### 2.15. Quản lý, upload tài liệu, media
- Upload, preview, quản lý file media (audio, video, image) cho bài học, bài kiểm tra.

### 2.16. Tích hợp hooks, toast, realtime
- Sử dụng custom hooks, toast, websocket cho trải nghiệm realtime.

## 3. Các module chính trong source code
- `src/components/`: Các component UI tái sử dụng.
- `src/pages/`: Các trang chức năng chính.
- `src/services/`: Gọi API backend.
- `src/store/`: Quản lý trạng thái (Redux).
- `src/utils/`: Hàm tiện ích, xử lý logic chung.
- `src/themes/`: Giao diện, style chung.
- `src/i18n.js`: Cấu hình đa ngôn ngữ.

## 4. Công nghệ sử dụng
- ReactJS, Redux, React Router, i18next, Axios, SCSS, Docker, ESLint, Prettier, v.v.

## 5. Đối tượng sử dụng
- Học viên, giáo viên, quản trị viên hệ thống trung tâm tiếng Anh.

---

*File này giúp tổng hợp các tính năng chính và cấu trúc dự án cũ, phục vụ cho việc migrate và phát triển tiếp theo.*
