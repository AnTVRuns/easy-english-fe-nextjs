# Migration Log 03: Cart, Order & Payment

## Ngày bắt đầu: 2026-05-14

## Mục tiêu
- Hoàn thiện luồng thương mại: thêm giỏ hàng, checkout, thanh toán, theo dõi đơn.

## Phạm vi
- Cart page.
- Orders list + order detail.
- Payment callback/result.
- Trạng thái pending/success/failed.

## Không bao gồm
- Discovery, course list, search/filter/sort (xử lý ở Log 01).
- Course detail content và enroll UI state (xử lý ở Log 02).
- Profile/settings và các module teacher/admin/chat/writing (xử lý ở Log 04, Log 05).

## Danh sách bước thực hiện (đánh số)
1. **Chuẩn hóa API & Types cho Commerce**
   - [ ] Migrate API cart.
   - [ ] Migrate API order.
   - [ ] Migrate API payment/callback.
   - [ ] Bổ sung types cart item, order summary, payment result.

2. **Migrate Cart Features**
   - [ ] Thêm/xóa khóa học khỏi cart.
   - [ ] Cập nhật số lượng (nếu có).
   - [ ] Hiển thị tổng tiền/tổng giảm giá.

3. **Migrate Order Features**
   - [ ] Orders list page.
   - [ ] Order detail page.
   - [ ] Trạng thái đơn hàng theo timeline cơ bản.

4. **Migrate Payment Features**
   - [ ] Checkout submit.
   - [ ] Payment callback handling.
   - [ ] Payment result page (success/failed/pending).

5. **Kiểm thử & hoàn thiện**
   - [ ] Kiểm tra luồng end-to-end cart -> checkout -> payment result.
   - [ ] Kiểm tra redirect callback không bị lặp.
   - [ ] Kiểm tra xử lý lỗi gateway/API timeout ở luồng commerce.

## File dự kiến liên quan
- app/(student)/cart/page.tsx
- app/(student)/orders/page.tsx
- app/(student)/orders/[orderId]/page.tsx
- app/(student)/payment-result/page.tsx
- api/cart/*
- api/order/*
- api/payment/*
- types/api/cart.ts
- types/api/order.ts

## Tiêu chí hoàn thành
- User mua khóa học được từ đầu đến cuối.
- Kết quả thanh toán hiển thị đúng trạng thái.
- Không có TypeScript errors ở module commerce.

## Ghi chú
- Ghi rõ mapping giữa status backend và status UI để tránh sai logic hiển thị.
