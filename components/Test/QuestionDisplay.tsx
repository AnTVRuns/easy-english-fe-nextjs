import { Box, Checkbox, CheckboxGroup, Heading, Radio, RadioGroup, Stack, Text, Textarea, VStack } from '@chakra-ui/react';

type QuestionDisplayProps = {
  question: {
    id: string | number;
    title?: string;
    text?: string;
    type?: string;
    options?: Array<{ id: string | number; text: string }>;
  };
  selectedAnswer?: any;
  onAnswerChange?: (questionId: string | number, value: any) => void;
};

export default function QuestionDisplay({ question, selectedAnswer, onAnswerChange }: QuestionDisplayProps) {
  const type = (question.type || '').toLowerCase();
  const options = question.options || [];

  return (
    <VStack align="stretch" spacing={3}>
      <Heading size="sm">{question.title || question.text || 'Question'}</Heading>
      {type.includes('multi') ? (
        <CheckboxGroup value={Array.isArray(selectedAnswer) ? selectedAnswer : []} onChange={(value) => onAnswerChange?.(question.id, value)}>
          <Stack spacing={2}>
            {options.map((option) => (
              <Checkbox key={option.id} value={String(option.id)}>{option.text}</Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      ) : type.includes('fill') ? (
        <Textarea value={selectedAnswer || ''} onChange={(e) => onAnswerChange?.(question.id, e.target.value)} placeholder="Type your answer" />
      ) : (
        <RadioGroup value={selectedAnswer ?? ''} onChange={(value) => onAnswerChange?.(question.id, value)}>
          <Stack spacing={2}>
            {options.map((option) => (
              <Radio key={option.id} value={String(option.id)}>{option.text}</Radio>
            ))}
          </Stack>
        </RadioGroup>
      )}
    </VStack>
  );
}
