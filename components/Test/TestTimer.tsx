'use client';

import { Box, Text, HStack } from '@chakra-ui/react';

interface TestTimerProps {
  timeRemaining: number;
  totalTime: number;
  isTimeUp?: boolean;
}

export default function TestTimer({
  timeRemaining,
  totalTime,
  isTimeUp = false,
}: TestTimerProps) {
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = (timeRemaining / totalTime) * 100;
  const isLowTime = timeRemaining < 5 * 60 * 1000; // 5 minutes

  return (
    <Box
      p={4}
      bg={isTimeUp ? 'red.50' : isLowTime ? 'yellow.50' : 'white'}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={isTimeUp ? 'red.500' : isLowTime ? 'yellow.500' : 'gray.200'}
      transition="all 0.3s"
    >
      <HStack justify="space-between" mb={2}>
        <Text fontSize="sm" fontWeight="500" color="gray.600">
          Time Remaining
        </Text>
        <Text
          fontSize="md"
          fontWeight="bold"
          color={isTimeUp ? 'red.600' : isLowTime ? 'orange.600' : 'gray.900'}
        >
          {formatTime(timeRemaining)}
        </Text>
      </HStack>

      <Box bg="gray.200" borderRadius="full" height="8px" overflow="hidden">
        <Box
          width={`${progressPercent}%`}
          height="100%"
          bg={isTimeUp ? 'red.500' : isLowTime ? 'orange.500' : 'blue.500'}
          transition="width 0.3s, background-color 0.3s"
        />
      </Box>

      {isLowTime && !isTimeUp && (
        <Text fontSize="xs" color="orange.600" mt={2} fontWeight="500">
          ⚠️ Less than 5 minutes remaining!
        </Text>
      )}

      {isTimeUp && (
        <Text fontSize="xs" color="red.600" mt={2} fontWeight="500">
          ⛔ Time is up! Your test has been submitted.
        </Text>
      )}
    </Box>
  );
}
