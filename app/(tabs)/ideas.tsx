import React, { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading"
import { StatusBar } from "expo-status-bar";
import { Session } from '@supabase/supabase-js'
import supabase from "../../lib/supabase"


export default function IdeasScreen() {
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
    <Box className="flex-1 pt-40 items-center bg-zinc-900">
      <StatusBar style="light" />
      {session && session.user && <Text>Hello {session.user.email}</Text>}
    </Box>
  )
}