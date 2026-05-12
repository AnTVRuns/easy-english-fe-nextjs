import { Stack } from '@chakra-ui/react';

type AnswerOptionsProps = {
  question: {
    id: string | number;
    options?: Array<{ id: string | number; text: string }>;
  };
  selectedAnswer?: any;
  onAnswerChange?: (questionId: string | number, value: any) => void;
};

export default function AnswerOptions({ question, selectedAnswer, onAnswerChange }: AnswerOptionsProps) {
  return <Stack>{/* Kept for backward-compatible composition; use QuestionDisplay directly. */}</Stack>;
}
