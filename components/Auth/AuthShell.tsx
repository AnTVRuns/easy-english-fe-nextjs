import Image from 'next/image';
import Link from 'next/link';
import { Box, Center, Stack, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type AuthShellProps = {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  maxWidthClassName?: string;
};

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: AuthShellProps) {
  return (
    <Center minH="100vh" bg="white" px={4} py={10}>
      <Stack w="full" maxW="md" gap={4} align="center">
        <Link href="/" className="block">
          <Image
            src="/transient-app-logo.svg"
            alt="Logo"
            width={200}
            height={200}
            priority
          />
        </Link>

        <Stack gap={1} textAlign="center">
          <Text fontSize="md" fontWeight="medium" color="gray.800">
            {title}
          </Text>
          {subtitle ? <Box fontSize="sm" color="gray.600">{subtitle}</Box> : null}
        </Stack>

        <Box
          w="full"
          borderRadius="2xl"
          borderWidth="1px"
          borderColor="gray.200"
          bg="white"
          px={8}
          py={8}
          shadow="[0_10px_40px_rgba(15,23,42,0.08)]"
        >
          {children}
        </Box>

        {footer ? <Text textAlign="center" fontSize="sm" color="gray.600">{footer}</Text> : null}
      </Stack>
    </Center>
  );
}
