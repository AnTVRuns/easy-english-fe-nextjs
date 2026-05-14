# Migration Log 01: Course Discovery

## Ngày bắt đầu: 2026-05-14

## Hôm nay đã migrate

1. **Home discovery page**
   - [x] Migrate trang home hiển thị featured/popular courses từ API course filter.
   - [x] Hiển thị course card trực tiếp trên home page.
   - [x] Thêm skeleton/loading state khi chưa có data.

2. **Course list page**
   - [x] Migrate trang `/courses` để hiển thị danh sách khóa học.
   - [x] Dùng chung data từ API course filter.
   - [x] Thêm empty state khi backend chưa trả dữ liệu.

3. **Course detail page**
   - [x] Migrate route chi tiết khóa học `/courses/[courseId]`.
   - [x] Load dữ liệu course detail từ API.
   - [x] Load related courses từ API.

4. **Course API & types**
   - [x] Hoàn thiện API wrapper cho course filter, course detail, related courses.
   - [x] Hoàn thiện type `CourseFilterRequest`, `CourseSummary`, `CourseDetailResponse`, `CoursePageResponse`.

## Còn lại chưa migrate

1. **Search/Filter/Sort thật sự hoạt động trên UI**
   - [ ] Tạo search bar để nhập từ khóa.
   - [ ] Tạo filter panel: category, rating, topic, level.
   - [ ] Tạo sort dropdown và map query đúng cho API.

2. **Pagination và query sync**
   - [ ] Đọc pageNumber/size từ query params.
   - [ ] Đồng bộ state filter/sort/search với URL.
   - [ ] Render control chuyển trang dựa trên totalPages.

3. **Recommend course và teacher list trong discovery**
   - [ ] Bổ sung section recommend courses riêng.
   - [ ] Bổ sung teacher list ở mức discovery.

4. **Bổ sung type/model còn thiếu cho discovery**
   - [ ] Tạo `types/models/course.ts` để tách model domain course.
   - [ ] Chuẩn hóa interface cho search params và pagination metadata.

5. **Kiểm thử trước khi chốt log**
   - [ ] Kiểm tra search/filter/sort trả dữ liệu đúng.
   - [ ] Kiểm tra empty state, loading state, error state.
   - [ ] Kiểm tra responsive desktop/mobile.
   - [ ] Kiểm tra không còn TypeScript errors ở scope discovery.

## Điều kiện đóng file log
- Luồng discovery đầy đủ: tìm kiếm, lọc, sắp xếp, phân trang, mở course detail.
- Không còn hạng mục unchecked trong file này.
