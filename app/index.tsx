import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import LoginView from "@/components/LoginView";
import { Heading } from "@/components/ui/heading"

export default function Home() {
  return (
    <Box className="pt-36 items-center">
      <Heading size="xl" className="mb-10">Trebuche login</Heading>
      <LoginView />
    </Box>
  );
}
