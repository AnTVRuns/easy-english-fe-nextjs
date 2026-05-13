# Kế hoạch migrate phần tiếp theo: Course Discovery, Enrollment, Cart, Order, Profile & Admin

## Mục tiêu
- Tiếp tục migrate các module còn lại sau khi Auth và Lesson/Test đã hoàn thành.
- Ưu tiên các luồng có tác động trực tiếp đến người học: tìm kiếm khóa học, xem chi tiết, đăng ký học, giỏ hàng, thanh toán và theo dõi đơn hàng.
- Đồng thời chuẩn bị các module quản trị và giáo viên để đảm bảo hệ thống Next.js có thể vận hành đầy đủ như dự án React cũ.

## Phạm vi migrate
- **Student flow**: Home, search, course detail, enroll, cart, orders, notifications, favourite, recommend course, teacher list.
- **Payment flow**: tạo đơn hàng, thanh toán, xem kết quả thanh toán, lịch sử giao dịch.
- **Profile flow**: xem/cập nhật hồ sơ người dùng, avatar, settings.
- **Teacher flow**: quản lý khóa học, chi tiết khóa học, bundle, gradebook, student drop.
- **Admin flow**: quản lý người dùng, category, topic/level, review analysis, analytics chart.
- **Shared features**: chat, chat AI, viết bài, realtime notification, upload media.

---

## PHASE 1: Foundation cho Course & Commerce
*Mục tiêu: migrate service/type/model nền tảng trước khi ghép vào page*

1. **Course Services & APIs**
   - Migrate `courseService.js` sang `api/course/index.ts`.
   - Migrate các API liên quan đến course detail, related course, recommend course.
   - Tạo hoặc bổ sung types cho course, bundle, prerequisite, curriculum.

2. **Commerce Services & APIs**
   - Migrate `cartService.js` sang `api/cart/index.ts`.
   - Migrate `orderService.js` sang `api/order/index.ts`.
   - Migrate `paymentService.js` sang `api/payment/index.ts`.
   - Tạo types cho cart item, order summary, payment result.

3. **Student Utility Services**
   - Migrate `enrollmentService.js` sang `api/enrollment/index.ts`.
   - Migrate `favouriteService.js` sang `api/favourite/index.ts`.
   - Migrate `notificationService.js` sang `api/notification/index.ts`.
   - Migrate `lessonTrackerService.js` nếu cần mở rộng luồng học từ course detail.

4. **Shared Data & Types**
   - Tạo hoặc hoàn thiện `types/api/course.ts`, `types/api/order.ts`, `types/api/cart.ts`, `types/api/user.ts`.
   - Tạo hoặc hoàn thiện `types/models/course.ts`, `types/models/order.ts`, `types/models/cart.ts`.

---

## PHASE 2: Student Pages & Components
*Mục tiêu: hoàn thiện các luồng chính của học viên*

5. **Home & Discovery**
   - Tạo `app/page.tsx` hoặc trang home tương ứng cho student.
   - Migrate `HomePage.jsx`.
   - Migrate `SearchPage.jsx` và các component filter/course card.
   - Migrate `RecommendCourse.jsx` và `TeacherPage.jsx`.

6. **Course Detail & Enrollment**
   - Tạo `app/(student)/courses/[courseId]/page.tsx`.
   - Migrate `Student/CourseDetailPage.jsx`.
   - Migrate các component course detail: description, curriculum, FAQ, reviews, related course, related bundle, announcement.
   - Tạo luồng enroll course và các trạng thái: chưa đăng ký, đã đăng ký, đang học, hết quyền truy cập.

7. **Cart, Order & Payment**
   - Tạo `app/(student)/cart/page.tsx`.
   - Tạo `app/(student)/orders/page.tsx` và `app/(student)/orders/[orderId]/page.tsx`.
   - Tạo `app/(student)/payment-result/page.tsx`.
   - Migrate `CartPage.jsx`, `OrdersPage.jsx`, `OrderDetailPage.jsx`, `PaymentResultPage.jsx`.
   - Chuẩn hóa luồng checkout, payment callback, hiển thị lỗi/thành công.

8. **Favourite & Notifications**
   - Migrate `FavouritePage.jsx`.
   - Migrate `Notifications.jsx`.
   - Đồng bộ badge/unread count nếu backend hỗ trợ.

---

## PHASE 3: Profile & User Settings
*Mục tiêu: đảm bảo người dùng tự quản lý thông tin cá nhân*

9. **Profile pages**
   - Migrate `ProfileViewerPage.jsx`.
   - Migrate `UserProfileEditPage.jsx`.
   - Migrate `UserSettings.jsx` nếu còn dùng trong luồng mới.
   - Bổ sung upload avatar và validate dữ liệu người dùng.

10. **User-related components**
    - Migrate `UploadAvatar.jsx`.
    - Migrate `ValidationErrors.jsx` nếu cần dùng lại trong form chung.
    - Migrate `ImagePicker.jsx`, `VideoPicker.jsx`, `AudioPicker.jsx` nếu các page mới có upload media.

---

## PHASE 4: Teacher & Admin Management
*Mục tiêu: hoàn thiện các trang quản trị và giáo viên còn lại*

11. **Teacher pages**
    - Migrate `Teacher/CourseManagementForTeacherPage.jsx`.
    - Migrate `Teacher/CourseDetailPage.jsx`.
    - Migrate `Teacher/Gradebook.jsx`.
    - Migrate `Teacher/StudentDropPage.jsx`.
    - Migrate `Teacher/Bundle.jsx` và các component bundle liên quan.

12. **Admin pages**
    - Migrate `Admin/UserManagementPage.jsx`.
    - Migrate `Admin/CategoryPage.jsx`.
    - Migrate `Admin/TopicAndLevelPage.jsx`.
    - Migrate `Admin/CourseManagementPage.jsx`.
    - Migrate `Admin/CourseLineChartPage.jsx`, `Admin/CoursePieChartPage.jsx`, `Admin/ReviewAnalystPage.jsx`.

13. **Shared admin/teacher components**
    - Migrate navbar, sidebar, role-based layout nếu còn phụ thuộc vào React cũ.
    - Migrate course card, bundle card, table, drawer, and modal components phục vụ admin/teacher.

---

## PHASE 5: Chat, AI, Writing & Realtime
*Mục tiêu: hoàn thiện các tính năng nâng cao và trải nghiệm realtime*

14. **Chat & Notification Realtime**
    - Migrate `ChatPage.jsx`, `ChatAIPage.jsx`.
    - Migrate `Chat.jsx`, `ChatBox.jsx`.
    - Migrate `websocketService.js` sang client phù hợp với Next.js.
    - Đồng bộ logic notification realtime nếu có socket/websocket.

15. **Writing & AI Support**
    - Migrate `WritingTaskPage.jsx`.
    - Migrate `writingService.js` và `writingResultService.js`.
    - Đảm bảo các luồng upload, preview, chấm điểm và phản hồi AI hoạt động ổn định.

---

## PHASE 6: Polish & Verification
*Mục tiêu: dọn dẹp, kiểm thử và chốt bản migrate cho nhóm tính năng tiếp theo*

16. **Routing & Layout Cleanup**
    - Rà soát lại app router, layout, protected route, role-based layout.
    - Chuẩn hóa naming route và chuyển hướng giữa auth, student, teacher, admin.

17. **Testing & Validation**
    - Kiểm tra các luồng chính: search, detail, enroll, cart, order, payment, profile, chat.
    - Kiểm tra responsive trên desktop và mobile.
    - Kiểm tra các API types, loading state, error state, fallback.

18. **Documentation & Progress Log**
    - Ghi lại những file đã migrate vào log tương ứng.
    - Cập nhật checklist để xác định module nào còn lại cho phase tiếp theo.

---

## Checklist đề xuất
- [ ] Course services & types
- [ ] Cart / order / payment services
- [ ] Student discovery pages
- [ ] Course detail & enrollment
- [ ] Cart / order / payment pages
- [ ] Favourite & notifications
- [ ] Profile & settings
- [ ] Teacher management pages
- [ ] Admin management pages
- [ ] Chat / AI / writing
- [ ] Routing & layout cleanup
- [ ] Verification & docs

## Ghi chú triển khai
- Ưu tiên migrate các page có tần suất sử dụng cao trước để giảm rủi ro đứt luồng cho người học.
- Mỗi phase nên hoàn thiện service/type trước, sau đó mới ghép page và component.
- Nếu phát sinh module phụ thuộc chéo giữa teacher/admin/student, tách thành các file API dùng chung để tránh lặp logic.

---

*File này là kế hoạch cho phần migrate tiếp theo sau Auth, Lesson/Test. Có thể cập nhật dần theo tiến độ thực tế.*