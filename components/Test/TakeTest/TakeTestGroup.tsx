import { Box, Text, VStack } from '@chakra-ui/react';
import QuestionDisplay from '../QuestionDisplay';

type TakeTestGroupProps = {
  questionGroup: {
    from?: number;
    to?: number;
    requirement?: string;
    questions?: Array<any>;
  };
  scrollToQuestion?: string | number | null;
  onQuestionAnswered?: (questionId: string | number, value: any) => void;
};

export default function TakeTestGroup({ questionGroup, onQuestionAnswered }: TakeTestGroupProps) {
  return (
    <VStack align="stretch" spacing={4}>
      {questionGroup?.from !== questionGroup?.to ? <Text fontWeight="bold">Question {questionGroup?.from} - {questionGroup?.to}</Text> : null}
      {questionGroup?.requirement ? <Box borderWidth="1px" borderRadius="md" p={3} dangerouslySetInnerHTML={{ __html: questionGroup.requirement }} /> : null}
      {(questionGroup?.questions || []).map((question) => (
        <Box key={question.id} borderWidth="1px" borderRadius="lg" p={4}>
          <QuestionDisplay question={question} onAnswerChange={onQuestionAnswered} />
        </Box>
      ))}
    </VStack>
  );
}
