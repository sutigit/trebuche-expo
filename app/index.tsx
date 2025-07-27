import React, { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import Auth from "@/components/Auth";
import { Heading } from "@/components/ui/heading"
import { Session } from '@supabase/supabase-js'
import supabase from "../lib/supabase"

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
    <Box className="pt-36 items-center">
      <Heading size="xl" className="mb-10">Trebuche login</Heading>
      <Auth />
      {session && session.user && <Text>{session.user.id}</Text>}
    </Box>
  );
}
