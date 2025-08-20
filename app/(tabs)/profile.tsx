import React, { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading"
import Logout from "@/components/Logout";
import { useSession } from "@/hooks/useSession";
import Screen from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import colors from "tailwindcss/colors";


export default function ProfileScreen() {
  const session = useSession();
  const [buchesOnline, setBuchesOnline] = useState(0)

  return (
    <Screen>
      <Box className="h-[80vh] items-center justify-between">
        <Box className="h-1/2 gap-6 justify-end items-center">
          <Heading className="italic">Tämä on sinun tilasi.</Heading>
          <Text className="mb-10">{buchesOnline} <MaterialCommunityIcons name="checkbox-multiple-blank-circle" size={12} color={colors.red[300]} />  buchea jakaa näkymäsi</Text>
        </Box>
        <Box>
          <Logout />
        </Box>
      </Box>
    </Screen>
  );
}
