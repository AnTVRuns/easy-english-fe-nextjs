# Migration Log 05: Teacher, Admin, Chat, AI & Writing

## Ngày bắt đầu: 2026-05-14

## Mục tiêu
- Hoàn tất các module quản trị và tính năng nâng cao sau khi core student flow ổn định.

## Phạm vi
- Teacher management features.
- Admin dashboard features.
- Chat, chat AI, writing task/result, realtime notifications.

## Không bao gồm
- Student discovery/detail/enroll và commerce flow (xử lý ở Log 01, Log 02, Log 03).
- Profile/settings và upload avatar của học viên (xử lý ở Log 04).
- Auth và lesson/test core đã có log riêng.

## Danh sách bước thực hiện (đánh số)
1. **Teacher Workspace**
   - [ ] Migrate course management cho teacher.
   - [ ] Migrate gradebook, bundle, student drop.
   - [ ] Chuẩn hóa teacher layout + role protection.

2. **Admin Dashboard**
   - [ ] Migrate user management, category, topic/level.
   - [ ] Migrate admin course management.
   - [ ] Migrate analytics chart/review analysis.

3. **Shared Role-based Layout**
   - [ ] Chuẩn hóa navbar/sidebar cho teacher/admin.
   - [ ] Rà soát role-based routing và redirect.
   - [ ] Loại bỏ dependency còn sót từ React app cũ.

4. **Chat & AI Features**
   - [ ] Migrate chat page + chat components.
   - [ ] Migrate chat AI flows.
   - [ ] Tích hợp websocket/realtime notification nếu có.

5. **Writing Features**
   - [ ] Migrate writing task page.
   - [ ] Migrate writing result flow.
   - [ ] Kiểm tra upload/preview/chấm điểm hoặc phản hồi AI.

6. **Kiểm thử & hoàn thiện**
   - [ ] Kiểm tra role access cho teacher/admin và luồng vào module chat/writing.
   - [ ] Kiểm tra realtime ổn định khi reconnect.
   - [ ] Kiểm tra performance cơ bản ở trang dashboard/chat.

## File dự kiến liên quan
- app/(teacher)/*
- app/(admin)/*
- app/(student)/chat/*
- components/Teacher/*
- components/Admin/*
- components/Chat/*
- api/* (teacher/admin/chat/writing)
- types/api/* tương ứng

## Tiêu chí hoàn thành
- Teacher/Admin dùng được các màn hình quản trị chính.
- Chat và writing hoạt động end-to-end ở mức chức năng.
- Không có TypeScript errors ở các module nâng cao.

## Ghi chú
- Nên triển khai sau khi đã chốt Course/Commerce để giảm rủi ro block integration.
