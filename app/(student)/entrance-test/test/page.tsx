'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Heading, Text, Button } from '@chakra-ui/react';
import { useTestTimer } from '@/hooks/useTestTimer';

export default function EntranceTestTakePage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Mock questions - memoized to prevent dependency array issues
  const questions = useMemo(
    () => [
      {
        id: '1',
        question: 'What is the capital of France?',
        options: ['London', 'Paris', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris',
      },
      {
        id: '2',
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '4',
      },
    ],
    []
  );

  const totalQuestions = questions.length || 50;
  const totalTimeMs = 60 * 60 * 1000; // 60 minutes
  const { timeRemaining, isTimeUp, startTimer, stopTimer } = useTestTimer(totalTimeMs);

  const handleSubmitTest = useCallback(async () => {
    try {
      // TODO: Submit answers to API
      // const result = await submitEntranceTest(answers);
      router.push('/entrance-test/result');
    } catch (err) {
      console.error('Failed to submit test:', err);
    }
  }, [router]);

  const handleSelectAnswer = useCallback((option: string) => {
    const question = questions[currentQuestion];
    if (question) {
      setAnswers((prev) => ({
        ...prev,
        [question.id]: option,
      }));
    }
  }, [currentQuestion, questions]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }, [currentQuestion, totalQuestions]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }, [currentQuestion]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / (totalQuestions || 1)) * 100;
  const timeWarning = timeRemaining < 5 * 60 * 1000; // Less than 5 minutes

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  useEffect(() => {
    if (isTimeUp) {
      handleSubmitTest();
    }
  }, [isTimeUp, handleSubmitTest]);

  const currentQuestionData = questions[currentQuestion];

  return (
    <Container maxW="container.2xl" py={8}>
      <Box gap={6} display="flex" flexDirection="column">
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom="1px"
          borderColor="gray.200"
          pb={4}
        >
          <Heading size="lg">Entrance Test</Heading>
          <Box
            p={4}
            bg={timeWarning ? 'red.50' : 'white'}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={timeWarning ? 'red.500' : 'gray.200'}
            textAlign="center"
          >
            <Text fontSize="sm" color="gray.600" mb={2}>
              Time Remaining
            </Text>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={timeWarning ? 'red.600' : 'gray.900'}
            >
              {formatTime(timeRemaining)}
            </Text>
          </Box>
        </Box>

        {/* Progress */}
        <Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Text fontSize="sm" fontWeight="500">
              Question {currentQuestion + 1} of {totalQuestions}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {Math.round(progress)}% complete
            </Text>
          </Box>
          <Box bg="gray.200" borderRadius="full" height="8px" overflow="hidden">
            <Box
              width={`${progress}%`}
              height="100%"
              bg="blue.500"
              transition="width 0.3s"
            />
          </Box>
        </Box>

        {/* Question */}
        {currentQuestionData && (
          <Box bg="white" p={8} borderRadius="lg" borderWidth="1px">
            <Box gap={6} display="flex" flexDirection="column">
              <Heading size="md">{currentQuestionData.question}</Heading>

              <Box gap={3} display="flex" flexDirection="column">
                {currentQuestionData.options.map((option, idx) => (
                  <Button
                    key={idx}
                    variant={answers[currentQuestionData.id] === option ? 'solid' : 'outline'}
                    colorScheme={
                      answers[currentQuestionData.id] === option ? 'blue' : 'gray'
                    }
                    justifyContent="flex-start"
                    h="auto"
                    py={4}
                    px={6}
                    textAlign="left"
                    onClick={() => handleSelectAnswer(option)}
                  >
                    {option}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>
        )}

        {/* Navigation */}
        <Box display="flex" gap={4} justifyContent="space-between">
          <Button
            disabled={currentQuestion === 0}
            variant="outline"
            onClick={handlePreviousQuestion}
          >
            Previous
          </Button>

          {currentQuestion === totalQuestions - 1 ? (
            <Button colorScheme="green" onClick={handleSubmitTest}>
              Submit Test
            </Button>
          ) : (
            <Button colorScheme="blue" onClick={handleNextQuestion}>
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}
