import React, { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading"
import { StatusBar } from "expo-status-bar";
import { Session } from '@supabase/supabase-js'
import supabase from "../../lib/supabase"
import { fetchDefaultBots } from "@/api/bots";
import { Spinner } from "@/components/ui/spinner"
import colors from "tailwindcss/colors"
import { Tables } from "@/lib/supabase.types";
import BotCard from "@/components/BotCard";

export default function BotsScreen() {
  const [session, setSession] = useState<Session | null>(null)
  const [bots, setBots] = useState<Tables<'default_bots'>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    fetchDefaultBots()
      .then((bots) => {
        setBots(bots)
      })
      .catch((err) => {
        console.error("📌 error", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <Box className="flex-1 justify-center items-center">
        <Spinner size="large" color={colors.indigo[300]} />
      </Box>
    )
  }

  return (
    <Box className="flex-1 bg-transparent py-24 px-5 gap-12">
      {bots.map((bot, i) =>
        (<BotCard key={i} bot={bot} />)
      )}
    </Box>
  )
}