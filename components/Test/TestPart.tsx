import { Box, Heading, VStack } from '@chakra-ui/react';
import QuestionDisplay from './QuestionDisplay';

type TestPartProps = {
  section: {
    id: string | number;
    title?: string;
    questions?: Array<any>;
  };
  answers?: Record<string | number, any>;
  onAnswerChange?: (questionId: string | number, value: any) => void;
};

export default function TestPart({ section, answers = {}, onAnswerChange }: TestPartProps) {
  return (
    <Box>
      <Heading size="md" mb={4}>{section.title || 'Part'}</Heading>
      <VStack spacing={4} align="stretch">
        {(section.questions || []).map((question) => (
          <Box key={question.id} borderWidth="1px" borderRadius="lg" p={4} bg="white">
            <QuestionDisplay
              question={question}
              selectedAnswer={answers[question.id]}
              onAnswerChange={onAnswerChange}
            />
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
