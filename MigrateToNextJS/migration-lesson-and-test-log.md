# Migration Log: Quản lý bài học & kiểm tra (Lesson & Test)

## Ngày bắt đầu: 2026-05-12

### Thứ tự và các bước thực hiện:

## 🚀 PHASE 1: Foundation (Độc lập, chạy song song)
*Hoàn thành trong ~30 phút - Không phụ thuộc vào gì*

1. **Tạo cấu trúc thư mục cho Lesson & Test** ⏱️ 2 phút
   - [x] Tạo thư mục `app/(student)/learn/` cho trang học bài
   - [x] Tạo thư mục `app/(student)/test/` cho trang bài kiểm tra
   - [x] Tạo thư mục `app/(student)/entrance-test/` cho bài kiểm tra đầu vào
   - [x] Tạo thư mục `components/Lesson/` cho các component bài học
   - [x] Tạo thư mục `components/Test/` cho các component bài kiểm tra

2. **Migrate Lesson Services & APIs** ⏱️ 15-20 phút
   - [x] Migrate `lessonService.js` → `api/lesson/index.ts`
   - [x] Migrate `textLessonService.js` → `api/lesson/textLesson.ts`
   - [x] Migrate `lessonTrackerService.js` → `api/lesson/tracker.ts`
   - [x] Tạo types: `types/api/lesson.ts`
   - [x] Tạo models: `types/models/lesson.ts`

3. **Migrate Test Services & APIs** ⏱️ 15-20 phút (chạy song song với Bước 2)
   - [x] Migrate `testService.js` → `api/test/index.ts`
   - [x] Migrate `testPartService.js` → `api/test/parts.ts`
   - [x] Migrate `testQuestionService.js` → `api/test/questions.ts`
   - [x] Migrate `testResultService.js` → `api/test/results.ts`
   - [x] Tạo types: `types/api/test.ts`
   - [x] Tạo models: `types/models/test.ts`

---

## 🔨 PHASE 2: Components (Phụ thuộc PHASE 1, chạy song song)
*Hoàn thành trong ~40 phút - Bắt đầu sau PHASE 1 hoàn thành*

4. **Migrate Lesson Components** ⏱️ 20-25 phút
   - [x] Migrate component hiển thị Video Lesson (`VideoLesson.tsx`)
   - [x] Migrate component hiển thị Text Lesson (`TextLesson.tsx`)
   - [x] Migrate component hiển thị Audio Lesson (`AudioLesson.tsx`)
   - [x] Tạo component Lesson Sidebar (`LessonSidebar.tsx` - danh sách các bài)
   - [x] Tạo component Lesson Viewer wrapper (`LessonViewer.tsx`)

6. **Migrate Test Components** ⏱️ 25-30 phút (chạy song song với Bước 4)
   - [x] Migrate component `TestPreview.tsx` - Xem trước bài kiểm tra
   - [x] Migrate component `TakeTest.tsx` - Giao diện làm bài kiểm tra
   - [x] Migrate component `TestPart.tsx` - Phần của bài kiểm tra
   - [x] Migrate component `QuestionDisplay.tsx` - Hiển thị câu hỏi
   - [x] Migrate component `AnswerOptions.tsx` - Các lựa chọn trả lời
   - [x] Migrate component `TestResult.tsx` - Hiển thị kết quả

9. **Tích hợp Lesson Tracker Hook** ⏱️ 10 phút (chạy song song với Bước 4,6)
   - [x] Tạo custom hook `useLessonTracker.ts` từ `lessonTrackerService`
   - [x] Xử lý mark lesson as completed
   - [x] Cập nhật lastViewedLesson

---

## 📄 PHASE 3: Pages (Phụ thuộc PHASE 2, chạy song parallel)
*Hoàn thành trong ~45 phút - Bắt đầu sau PHASE 2 hoàn thành*

5. **Migrate Lesson Pages** ⏱️ 20-25 phút
   - [ ] Tạo `app/(student)/learn/page.tsx` - Danh sách khóa học để học
   - [ ] Tạo `app/(student)/learn/[courseId]/page.tsx` - Chi tiết khóa học
   - [ ] Tạo `app/(student)/learn/[courseId]/[lessonId]/page.tsx` - Học bài chi tiết
   - [ ] Tích hợp LessonViewer component
   - [ ] Tạo `app/(student)/learn/layout.tsx`

7. **Migrate Test Pages** ⏱️ 30-35 phút (chạy song parallel với Bước 5)
   - [ ] Tạo `app/(student)/test/page.tsx` - Danh sách bài kiểm tra
   - [ ] Tạo `app/(student)/test/[testId]/preview/page.tsx` - Xem trước bài
   - [ ] Tạo `app/(student)/test/[testId]/take/page.tsx` - Làm bài kiểm tra
   - [ ] Tạo `app/(student)/test/[testId]/result/page.tsx` - Xem kết quả
   - [ ] Tạo `app/(student)/test/layout.tsx`

---

## ✨ PHASE 4: Polish & Enhancement (Phụ thuộc PHASE 3, chạy song parallel)
*Hoàn thành trong ~50 phút - Bắt đầu sau PHASE 3 hoàn thành*

8. **Migrate Entrance Test Pages** ⏱️ 15-20 phút
   - [ ] Tạo `app/(student)/entrance-test/page.tsx` - Bài kiểm tra đầu vào
   - [ ] Tạo `app/(student)/entrance-test/result/page.tsx` - Kết quả kiểm tra đầu vào
   - [ ] Tạo `app/(student)/entrance-test/layout.tsx`
   - [ ] Tích hợp special logic cho entrance test

10. **Tích hợp Test Timer & Validation** ⏱️ 15-20 phút (chạy song parallel với Bước 8)
    - [ ] Tạo component `TestTimer.tsx` - Bộ đếm thời gian
    - [ ] Tạo custom hook `useTestTimer.ts` - Logic timer
    - [ ] Thêm validation: không allow go back khi đã submit
    - [ ] Thêm warning khi time còn 5 phút
    - [ ] Implement auto-submit khi time hết

11. **Styling & UX Enhancements** ⏱️ 20-25 phút (chạy song parallel với Bước 8,10)
    - [ ] Responsive design cho lesson & test pages
    - [ ] Loading states, error handling, fallbacks
    - [ ] Toast notifications cho actions (use custom hook)
    - [ ] Breadcrumb navigation
    - [ ] Progress bar cho lesson/test
    - [ ] Accessibility improvements

---

## Log chi tiết

### 2026-05-12 - Bắt đầu

#### Phân tích hiện trạng:
- Auth module đã hoàn thành (login, register, verify-otp, forgot-password, reset-password)
- Cần migrate lesson & test modules - phức tạp hơn, liên quan đến:
  - Danh sách bài học từ khóa học
  - Xem nội dung bài học (video, audio, text)
  - Làm bài kiểm tra trắc nghiệm
  - Xem kết quả kiểm tra

#### Workflow Parallelize:
```
PHASE 1 (Độc lập):     [Bước 1] ─┐
                                ├─→ [Bước 2] (15-20 phút)
                       [Bước 3] (15-20 phút, song song)
                                ├─→ [Types] (10 phút, song parallel)
                       ⏱️ TOTAL: ~30 phút

                                         ┌─→ [Bước 4] (20-25 phút)
PHASE 2 (Components):  Phụ thuộc PHASE 1 ├─→ [Bước 6] (25-30 phút)
                                         └─→ [Bước 9] (10 phút)
                                         ⏱️ TOTAL: ~40 phút (parallel)

                                         ┌─→ [Bước 5] (20-25 phút)
PHASE 3 (Pages):       Phụ thuộc PHASE 2 ├─→ [Bước 7] (30-35 phút)
                                         ⏱️ TOTAL: ~45 phút (parallel)

                                         ┌─→ [Bước 8] (15-20 phút)
PHASE 4 (Polish):      Phụ thuộc PHASE 3 ├─→ [Bước 10] (15-20 phút)
                                         ├─→ [Bước 11] (20-25 phút)
                                         ⏱️ TOTAL: ~50 phút (parallel)

🏁 GRAND TOTAL: ~165 phút (~2h 45 phút)
```

## Progress Update (2026-05-12)

- **Hoàn thành:**
   - Tạo thư mục Phase 1:
      - `app/(student)/learn/`
      - `app/(student)/test/`
      - `app/(student)/entrance-test/`
      - `components/Lesson/`
      - `components/Test/`
   - Migrate services → API wrappers:
      - `api/lesson/index.ts` (from `lessonService.js`)
      - `api/lesson/textLesson.ts` (from `textLessonService.js`)
      - `api/test/index.ts` (from `testService.js`)
   - Thêm HTTP client shared:
      - `lib/axios.ts` (shared axios instance)
   - Thêm TypeScript type stubs:
      - `types/api/lesson.ts`
      - `types/api/test.ts`
   - Tạo model stubs:
      - `types/models/lesson.ts`
      - `types/models/test.ts`
   - Migrate các service còn lại của Phase 1:
      - `api/lesson/tracker.ts` (from `lessonTrackerService.js`)
      - `api/test/parts.ts` (from `testPartService.js`)
      - `api/test/questions.ts` (from `testQuestionService.js`)
      - `api/test/results.ts` (from `testResultService.js`)
   - Migrate Phase 2 component nền tảng:
      - `components/Lesson/LessonHeader.tsx`
      - `components/Lesson/VideoLesson.tsx`
      - `components/Lesson/TextLesson.tsx`
      - `components/Lesson/AudioLesson.tsx`
      - `components/Lesson/LessonSidebar.tsx`
      - `components/Lesson/LessonViewer.tsx`
      - `components/Test/QuestionDisplay.tsx`
      - `components/Test/AnswerOptions.tsx`
      - `components/Test/TestPart.tsx`
      - `components/Test/TestPreview.tsx`
      - `components/Test/TestResult.tsx`
      - `components/Test/Result/TestResultTable.tsx`
      - `components/Test/TakeTest/TakeTestGroup.tsx`
      - `components/Test/TakeTest/TakeTestPart.tsx`
      - `components/Test/TakeTest/TakeTestHeader.tsx`
      - `components/Test/TakeTest/TakeTestFooter.tsx`

- **Chưa hoàn thành / Chưa migrate:**
   - Wiring các component vào pages Phase 3

> Todo list đã cập nhật tương ứng (Phase 1 items marked completed).


#### Files cần migrate từ easy-english-fe:
**Services:**
- `services/lessonService.js` - Gọi API lấy danh sách bài, chi tiết bài
- `services/textLessonService.js` - Bài học dạng văn bản
- `services/lessonTrackerService.js` - Theo dõi tiến độ học
- `services/testService.js` - Gọi API bài kiểm tra
- `services/testPartService.js` - Các phần của bài kiểm tra
- `services/testQuestionService.js` - Câu hỏi trong bài kiểm tra
- `services/testResultService.js` - Kết quả kiểm tra

**Pages:**
- `pages/Student/LearnPage.jsx` - Trang học bài
- `pages/Student/TakeTestPage.jsx` - Trang làm bài kiểm tra
- `pages/Student/PreviewTestPage.jsx` - Xem trước bài
- `pages/Student/EntranceTestPage.jsx` - Bài kiểm tra đầu vào
- `pages/Common/TestResultPage.jsx` - Xem kết quả

**Components:**
- `components/Test/TakeTest/` - Component để làm bài kiểm tra
- `components/Test/Result/TestResultTable.jsx` - Bảng kết quả
- Lesson display components

---

## 📊 Workflow & Dependency Summary:

| Phase | Thời gian | Bước | Tên | Độc lập | Ghi chú |
|-------|----------|------|-----|---------|---------|
| **1** | 30 phút | 1 | Folder Structure | ✅ | Chạy đầu tiên |
| **1** | - | 2 | Lesson Services | ✅ | Parallel với Bước 3 |
| **1** | - | 3 | Test Services | ✅ | Parallel với Bước 2 |
| **1** | - | Types | Lesson & Test Types | ✅ | Parallel với Bước 2,3 |
| **2** | 40 phút | 4 | Lesson Components | ❌ Phụ PHASE 1 | Parallel với Bước 6, 9 |
| **2** | - | 6 | Test Components | ❌ Phụ PHASE 1 | Parallel với Bước 4, 9 |
| **2** | - | 9 | Lesson Tracker Hook | ❌ Phụ PHASE 1 | Parallel với Bước 4, 6 |
| **3** | 45 phút | 5 | Lesson Pages | ❌ Phụ PHASE 2 | Parallel với Bước 7 |
| **3** | - | 7 | Test Pages | ❌ Phụ PHASE 2 | Parallel với Bước 5 |
| **4** | 50 phút | 8 | Entrance Test | ❌ Phụ PHASE 3 | Parallel với Bước 10, 11 |
| **4** | - | 10 | Test Timer | ❌ Phụ PHASE 3 | Parallel với Bước 8, 11 |
| **4** | - | 11 | Styling & UX | ❌ Phụ PHASE 3 | Parallel với Bước 8, 10 |

---

## Phase 2 Progress Update (2026-05-12)

- **Đã hoàn thành:**
   - `components/Lesson/LessonHeader.tsx`
   - `components/Lesson/VideoLesson.tsx`
   - `components/Lesson/TextLesson.tsx`
   - `components/Lesson/AudioLesson.tsx`
   - `components/Lesson/LessonSidebar.tsx`
   - `components/Lesson/LessonViewer.tsx`
   - `components/Test/QuestionDisplay.tsx`
   - `components/Test/AnswerOptions.tsx`
   - `components/Test/TestPart.tsx`
   - `components/Test/TestPreview.tsx`
   - `components/Test/TestResult.tsx`
   - `components/Test/Result/TestResultTable.tsx`
   - `components/Test/TakeTest/TakeTestGroup.tsx`
   - `components/Test/TakeTest/TakeTestPart.tsx`
   - `components/Test/TakeTest/TakeTestHeader.tsx`
   - `components/Test/TakeTest/TakeTestFooter.tsx`

- **Còn lại trong Phase 2:**
   - Kiểm tra wiring vào pages ở Phase 3

## Cấu trúc thư mục cần tạo:

```
app/
├── (student)/
│   ├── learn/
│   │   ├── page.tsx                  # Danh sách khóa học để học
│   │   ├── [courseId]/
│   │   │   ├── page.tsx              # Chi tiết khóa học
│   │   │   └── [lessonId]/
│   │   │       └── page.tsx          # Học bài chi tiết
│   │   └── layout.tsx
│   ├── test/
│   │   ├── page.tsx                  # Danh sách bài kiểm tra
│   │   ├── [testId]/
│   │   │   ├── preview/
│   │   │   │   └── page.tsx          # Xem trước bài
│   │   │   ├── take/
│   │   │   │   └── page.tsx          # Làm bài kiểm tra
│   │   │   └── result/
│   │   │       └── page.tsx          # Xem kết quả
│   │   └── layout.tsx
│   └── entrance-test/
│       ├── page.tsx                  # Bài kiểm tra đầu vào
│       ├── result/
│       │   └── page.tsx
│       └── layout.tsx

components/
├── Lesson/
│   ├── LessonViewer.tsx              # Viewer chính
│   ├── VideoLesson.tsx               # Hiển thị video
│   ├── AudioLesson.tsx               # Hiển thị audio
│   ├── TextLesson.tsx                # Hiển thị text
│   ├── LessonSidebar.tsx             # Sidebar danh sách bài
│   └── LessonHeader.tsx
├── Test/
│   ├── TestPreview.tsx               # Xem trước bài
│   ├── TakeTest.tsx                  # Làm bài (wrapper)
│   ├── TestPart.tsx                  # Một phần của bài
│   ├── QuestionDisplay.tsx           # Hiển thị câu hỏi
│   ├── AnswerOptions.tsx             # Các lựa chọn trả lời
│   ├── TestTimer.tsx                 # Bộ đếm thời gian
│   ├── TestResult.tsx                # Kết quả bài kiểm tra
│   └── TestResultTable.tsx           # Bảng chi tiết kết quả

api/
├── lesson/
│   ├── index.ts                      # Main lesson API
│   ├── textLesson.ts
│   └── tracker.ts
└── test/
    ├── index.ts                      # Main test API
    ├── parts.ts
    ├── questions.ts
    └── results.ts

types/
├── api/
│   ├── lesson.ts                     # Lesson types
│   └── test.ts                       # Test types
└── models/
    ├── lesson.ts
    └── test.ts
```

---

## API Endpoints cần tích hợp:

### Lesson APIs:
```
GET    /api/lessons                            # Danh sách bài học
GET    /api/lessons/:id                        # Chi tiết bài học
GET    /api/lessons/:id/content                # Nội dung bài học
POST   /api/lesson-tracker                     # Lưu tiến độ học
GET    /api/lesson-tracker/:lessonId           # Lấy tiến độ học
PUT    /api/lesson-tracker/:id/mark-completed # Đánh dấu hoàn thành
```

### Test APIs:
```
GET    /api/tests                              # Danh sách bài kiểm tra
GET    /api/tests/:id                          # Chi tiết bài kiểm tra
GET    /api/tests/:id/parts                    # Các phần của bài
GET    /api/tests/:id/questions                # Câu hỏi của bài
POST   /api/test-results                       # Nộp bài kiểm tra
GET    /api/test-results/:id                   # Xem kết quả
GET    /api/test-results/test/:testId/my-result # Kết quả của user
```

---

## Công nghệ & thư viện sử dụng:

- **Chakra UI** - UI components
- **Next.js** - Framework
- **React Hook Form** - Form management
- **Yup** - Validation
- **Axios** - HTTP client
- **React Query** - Data fetching & caching (nếu sử dụng)
- **Framer Motion** - Animations (nếu cần)

---

## Challenges & Lưu ý:

1. **Timer for Tests** - Cần xử lý đếm ngược thời gian chính xác
2. **Auto-submit** - Khi hết giờ cần auto submit bài
3. **Question Randomization** - Nếu có tính năng random câu hỏi
4. **Partial Submit** - Xử lý khi user close browser giữa làm bài
5. **Media Streaming** - Video, audio cần stream từ server
6. **Real-time Progress** - Tracking tiến độ real-time
7. **Answer Validation** - Validate đáp án khi submit
8. **Result Calculation** - Tính điểm, grade dựa trên đáp án

---

## Kiểm thử theo Phase:

### ✅ PHASE 1 Kiểm thử:
- [ ] API methods có exported đúng không
- [ ] Types compile mà không có error
- [ ] Folder structure được tạo đúng

### ✅ PHASE 2 Kiểm thử:
- [ ] Components render mà không crash
- [ ] Import Lesson/Test Services đúng
- [ ] Lesson Tracker Hook hoạt động

### ✅ PHASE 3 Kiểm thử:
- [ ] Pages load đúng với dynamic routes
- [ ] Components integrate vào pages đúng
- [ ] Responsive design hoạt động

### ✅ PHASE 4 Kiểm thử:
- [ ] Test timer đếm ngược đúng
- [ ] Auto-submit hoạt động khi hết thời gian
- [ ] Responsive, loading states, error handling

### Full Integration Tests:
- [ ] Test danh sách bài học load đúng
- [ ] Test xem nội dung bài học (video, audio, text)
- [ ] Test làm bài kiểm tra (timer, submit, validation)
- [ ] Test xem kết quả kiểm tra
- [ ] Test tracking tiến độ học
- [ ] Test responsive trên mobile/tablet
- [ ] Test error handling, loading states
- [ ] Test multi-language support

---

*File này là plan cho việc migrate lesson & test modules từ 2026-05-12 trở đi*

## 🎯 Ghi chú quan trọng:

- **PHASE 1 độc lập**: Có thể chạy Bước 2, 3, Types song song không cần chờ đợi
- **Parallel execution**: Để tối ưu thời gian, nên chạy các bước in parallel khi có thể
- **Test incrementally**: Sau mỗi phase, nên test để đảm bảo không có error trước khi đi tiếp
- **Time estimate**: ~2h 45 phút nếu chạy song parallel, ~5h+ nếu chạy tuần tự
- **Team collaboration**: Nếu team nhiều người, có thể chia phase cho các developer khác nhau

---

*Last updated: 2026-05-12*
