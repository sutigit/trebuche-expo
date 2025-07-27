import React, { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading"
import { Session } from '@supabase/supabase-js'
import supabase from "../lib/supabase"
import { Image } from "@/components/ui/image"
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import Login from "@/components/Login";
import Logout from "@/components/Logout";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <Box className="flex-1 pt-36 items-center bg-zinc-950">
      <StatusBar style="light" />
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
  );
}
