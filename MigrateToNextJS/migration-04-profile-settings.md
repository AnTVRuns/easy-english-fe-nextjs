# Migration Log 04: Profile & Settings

## Ngày bắt đầu: 2026-05-14

## Mục tiêu
- Migrate các tính năng quản lý hồ sơ người dùng và cài đặt tài khoản.

## Phạm vi
- Profile view.
- Profile edit.
- Account settings.
- Upload avatar và validate thông tin.

## Không bao gồm
- Discovery/detail/enroll và commerce flow (xử lý ở Log 01, Log 02, Log 03).
- Teacher/Admin dashboards (xử lý ở Log 05).
- Chat, AI writing và realtime chat notification (xử lý ở Log 05).

## Danh sách bước thực hiện (đánh số)
1. **Chuẩn hóa API & Types cho User**
   - [ ] Migrate API profile view/update.
   - [ ] Chuẩn hóa API upload avatar.
   - [ ] Bổ sung types user profile/settings.

2. **Migrate Profile Components**
   - [ ] Thông tin cơ bản (fullname, email, phone, dob...).
   - [ ] Avatar uploader.
   - [ ] Validation error display components dùng riêng cho user profile.

3. **Migrate Profile Pages**
   - [ ] Profile viewer page.
   - [ ] Profile edit page.
   - [ ] User settings page.

4. **Tối ưu UX & bảo vệ dữ liệu**
   - [ ] Form validation đầy đủ.
   - [ ] Loading/saving states rõ ràng.
   - [ ] Thông báo thành công/thất bại khi cập nhật.

5. **Kiểm thử & hoàn thiện**
   - [ ] Kiểm tra cập nhật profile end-to-end.
   - [ ] Kiểm tra upload avatar với file hợp lệ/không hợp lệ.
   - [ ] Kiểm tra responsive và accessibility cơ bản.

## File dự kiến liên quan
- app/(student)/profile/page.tsx (hoặc route tương đương)
- app/(student)/settings/page.tsx
- components/User/*
- components/Form/*
- api/user/* (hoặc api/auth/user tùy cấu trúc hiện tại)
- types/api/user.ts

## Tiêu chí hoàn thành
- User xem/sửa profile và settings ổn định.
- Upload avatar hoạt động.
- Không có TypeScript errors ở module profile/settings.

## Ghi chú
- Ưu tiên tái sử dụng validation patterns đã dùng ở auth forms.
