# Migration Log 02: Course Detail & Enrollment

## Ngày bắt đầu: 2026-05-14

## Mục tiêu
- Migrate toàn bộ luồng xem chi tiết khóa học và đăng ký học.
- Đảm bảo các trạng thái truy cập khóa học hoạt động đúng.

## Phạm vi
- Course detail page.
- Curriculum, FAQ, review, announcement.
- Related course/related bundle.
- Enroll flow và trạng thái đã mua/chưa mua.

## Không bao gồm
- Search/filter/sort, course list, home discovery modules (xử lý ở Log 01).
- Cart/order/payment và checkout (xử lý ở Log 03).
- Profile/settings và upload avatar (xử lý ở Log 04).

## Danh sách bước thực hiện (đánh số)
1. **Chuẩn hóa API & Types cho Detail**
   - [ ] Migrate API course detail.
   - [ ] Migrate API curriculum, FAQ, review, announcement.
   - [ ] Bổ sung types cho detail response và sections.

2. **Migrate Components Course Detail**
   - [ ] Header/overview khóa học.
   - [ ] Curriculum accordion/list.
   - [ ] FAQ/review/announcement components.
   - [ ] Related course/bundle components.

3. **Migrate Enroll Logic**
   - [ ] Kết nối API enroll.
   - [ ] Xử lý trạng thái button: enroll/continue/locked.
   - [ ] Điều hướng đúng sau enroll thành công.

4. **Migrate Pages & Routing**
   - [ ] Tạo route course detail theo app router.
   - [ ] Kết nối toàn bộ component vào page.
   - [ ] Xử lý lỗi 404 khi course không tồn tại.

5. **Kiểm thử & hoàn thiện**
   - [ ] Kiểm tra luồng từ discovery sang detail.
   - [ ] Kiểm tra enroll với các trạng thái user khác nhau.
   - [ ] Kiểm tra điều kiện vào learn/test sau khi enroll (chỉ ở mức access/routing).

## File dự kiến liên quan
- app/(student)/courses/[courseId]/page.tsx
- components/CourseDetail/*
- api/course/*
- api/enrollment/*
- types/api/course.ts
- types/models/course.ts

## Tiêu chí hoàn thành
- Detail page render đầy đủ các sections chính.
- Enroll flow hoạt động và điều hướng chính xác.
- Không có TypeScript errors ở module detail/enroll.

## Ghi chú
- Nếu có dependency với lesson tracker, ghi rõ integration point trong log cập nhật hằng ngày.
