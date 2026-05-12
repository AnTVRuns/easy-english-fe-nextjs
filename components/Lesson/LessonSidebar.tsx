import { Badge, Box, Button, HStack, Text, VStack } from '@chakra-ui/react';

export type LessonSidebarItem = {
  id: string | number;
  title: string;
  type?: string;
  completed?: boolean;
  locked?: boolean;
};

type LessonSidebarProps = {
  items: LessonSidebarItem[];
  activeId?: LessonSidebarItem['id'];
  onSelect?: (item: LessonSidebarItem) => void;
};

export default function LessonSidebar({ items, activeId, onSelect }: LessonSidebarProps) {
  return (
    <VStack align="stretch" spacing={2}>
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <Button
            key={item.id}
            variant={isActive ? 'solid' : 'outline'}
            colorScheme={isActive ? 'blue' : 'gray'}
            justifyContent="space-between"
            onClick={() => onSelect?.(item)}
            isDisabled={item.locked}
            h="auto"
            py={3}
            px={4}
          >
            <HStack w="100%" justify="space-between" align="start" spacing={3}>
              <Box textAlign="left">
                <Text fontWeight="semibold" noOfLines={1}>{item.title}</Text>
                {item.type ? <Text fontSize="sm" color={isActive ? 'whiteAlpha.800' : 'gray.500'}>{item.type}</Text> : null}
              </Box>
              <HStack>
                {item.completed ? <Badge colorScheme="green">Done</Badge> : null}
                {item.locked ? <Badge colorScheme="red">Locked</Badge> : null}
              </HStack>
            </HStack>
          </Button>
        );
      })}
    </VStack>
  );
}
