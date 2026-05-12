import { useCallback, useState } from 'react';
import lessonTrackerApi from '../api/lesson/tracker';

type CompleteLessonPayload = {
  username: string;
  lessonId: string | number;
  courseId?: string | number;
};

type UpdateProfilePayload = {
  username: string;
  courseId?: string | number;
  lessonId: string | number;
};

type UseLessonTrackerOptions = {
  onUpdateProfile?: (payload: UpdateProfilePayload) => Promise<unknown> | unknown;
};

const LAST_VIEWED_KEY = 'lastViewedLesson';

export default function useLessonTracker(options?: UseLessonTrackerOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setLastViewedLesson = useCallback(
    async (payload: UpdateProfilePayload) => {
      const value = {
        username: payload.username,
        courseId: payload.courseId,
        lessonId: payload.lessonId,
        updatedAt: new Date().toISOString(),
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem(LAST_VIEWED_KEY, JSON.stringify(value));
      }

      if (options?.onUpdateProfile) {
        await options.onUpdateProfile(payload);
      }

      return value;
    },
    [options],
  );

  const markLessonAsCompleted = useCallback(
    async (payload: CompleteLessonPayload) => {
      setLoading(true);
      setError(null);
      try {
        const result = await lessonTrackerApi.createCompleteLesson(payload);
        await setLastViewedLesson({
          username: payload.username,
          courseId: payload.courseId,
          lessonId: payload.lessonId,
        });
        return result;
      } catch (err: any) {
        const message = err?.message || 'Failed to mark lesson as completed';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setLastViewedLesson],
  );

  const getFirstUnlearnedLesson = useCallback(async (courseId: string) => {
    setLoading(true);
    setError(null);
    try {
      return await lessonTrackerApi.getFirstUnlearnedLesson(courseId);
    } catch (err: any) {
      setError(err?.message || 'Failed to load first unlearned lesson');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    markLessonAsCompleted,
    getFirstUnlearnedLesson,
    setLastViewedLesson,
  };
}
