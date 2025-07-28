import React, { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading"
import { StatusBar } from "expo-status-bar";
import { Session } from '@supabase/supabase-js'
import supabase from "../../lib/supabase"
import { Tables } from "@/lib/supabase.types";
import { Spinner } from "@/components/ui/spinner"
import colors from "tailwindcss/colors"

export default function IdeasScreen() {
  const [session, setSession] = useState<Session | null>(null)
  const [conversations, setConversations] = useState<Tables<'conversations'>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    // fetchDefaultBots()
    //   .then((bots) => {
    //     setBots(bots)
    //   })
    //   .catch((err) => {
    //     console.error("📌 error", err)
    //   })
    //   .finally(() => {
    //     setLoading(false)
    //   })
  }, [])

  if (loading) {
    return (
      <Box className="flex-1 justify-center items-center">
        <Spinner size="large" color={colors.indigo[300]} />
      </Box>
    )
  }

  return (
    <Box className="flex-1 pt-40 items-center">
      {session && session.user && <Text>Hello {session.user.email}</Text>}
    </Box>
  )
}