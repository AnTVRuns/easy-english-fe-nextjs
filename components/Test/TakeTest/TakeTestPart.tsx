import { Box, Flex, Heading, VStack } from '@chakra-ui/react';
import TakeTestGroup from './TakeTestGroup';

type TakeTestPartProps = {
  part?: {
    id?: string | number;
    title?: string;
    questionGroups?: Array<any>;
  };
  onQuestionAnswered?: (questionId: string | number, value: any) => void;
};

export default function TakeTestPart({ part, onQuestionAnswered }: TakeTestPartProps) {
  return (
    <Box>
      <Heading size="md" mb={4}>{part?.title || 'Part'}</Heading>
      <VStack align="stretch" spacing={6}>
        {(part?.questionGroups || []).map((group) => (
          <TakeTestGroup key={group.id} questionGroup={group} onQuestionAnswered={onQuestionAnswered} />
        ))}
      </VStack>
    </Box>
  );
}
