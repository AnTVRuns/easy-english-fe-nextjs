import Link from 'next/link';
import { Box } from '@chakra-ui/react';

export default function CourseDetailTabLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <Box
        px={4}
        py={2}
        borderBottomWidth="2px"
        borderColor={active ? 'blue.500' : 'transparent'}
        color={active ? 'blue.600' : 'gray.600'}
        fontWeight={active ? 'semibold' : 'medium'}
        _hover={{ color: 'blue.600' }}
      >
        {children}
      </Box>
    </Link>
  );
}
