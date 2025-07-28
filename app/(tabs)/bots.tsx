import React, { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading"
import { StatusBar } from "expo-status-bar";

export default function BotsScreen() {
  return (
    <Box className="flex-1 pt-40 items-center bg-zinc-900">
      <StatusBar style="light" />

    </Box>
  )
}