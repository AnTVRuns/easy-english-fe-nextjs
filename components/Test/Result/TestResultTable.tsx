import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

type TestResultTableProps = {
  rows: Array<{
    id?: string | number;
    question?: string;
    userAnswer?: string;
    correctAnswer?: string;
    isCorrect?: boolean;
  }>;
};

export default function TestResultTable({ rows }: TestResultTableProps) {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Question</Th>
          <Th>Your answer</Th>
          <Th>Correct answer</Th>
          <Th>Result</Th>
        </Tr>
      </Thead>
      <Tbody>
        {rows.map((row) => (
          <Tr key={row.id}>
            <Td>{row.question}</Td>
            <Td>{row.userAnswer}</Td>
            <Td>{row.correctAnswer}</Td>
            <Td>{row.isCorrect ? 'Correct' : 'Wrong'}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
