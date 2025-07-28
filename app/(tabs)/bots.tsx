import React, { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Session } from '@supabase/supabase-js'
import supabase from "../../lib/supabase"
import { fetchDefaultBots } from "@/api/bots";
import { Spinner } from "@/components/ui/spinner"
import colors from "tailwindcss/colors"
import { Tables } from "@/lib/supabase.types";
import BotCard from "@/components/BotCard";
import { ScrollView } from "@/components/ui/scroll-view";

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
    <Box className="max-h-screen flex-1 overflow-hidden pt-16 pb-[65px]">
      <ScrollView>
        <Box className="flex-1 pb-20 pt-5 px-4 gap-10">
          {bots.map((bot, i) =>
            (<BotCard key={i} bot={bot} session={session} />)
          )}
        </Box>
      </ScrollView>
    </Box>
  )
}