import React, { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading"
import { Image } from "@/components/ui/image"
import Login from "@/components/Login";
import Logout from "@/components/Logout";
import { useSession } from "@/hooks/useSession";
import Screen from "@/components/ui/screen";

export default function ProfileScreen() {
  const session = useSession();

  return (
    <Screen>
      <Box className="flex-1 pt-40 items-center bg-transparent">
        <Image
          source={{ uri: "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg" }}
          alt="profile-image"
          size="xl"
          className="rounded-2xl"
        />
        <Heading size="lg" className="my-8">Teretuloa, Buche!</Heading>
        {session && session.user ?
          <Logout user={session.user} /> :
          <Login />
        }
      </Box>
    </Screen>
  );
}
