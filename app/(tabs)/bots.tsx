import React, { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { fetchUsersBots } from "@/api/supabase/bots";
import { Spinner } from "@/components/ui/spinner"
import colors from "tailwindcss/colors"
import { Tables } from "@/lib/supabase.types";
import BotCard from "@/components/BotCard";
import { Text } from "@/components/ui/text";
import { ScrollView } from "@/components/ui/scroll-view";
import { useSession } from "@/hooks/useSession";

export default function BotsScreen() {
  const session = useSession();
  const [bots, setBots] = useState<Tables<'bots'>[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session || !session.user) return

    fetchUsersBots(session.user.id)
      .then((bots) => {
        setBots(bots)
      })
      .catch((err) => {
        console.error("📌 error", err)
      })
      .finally(() => {
        setLoading(false)
      })

  }, [session])

  if (!session || !session.user) {
    return (
      <Box className="flex-1 justify-center items-center">
        <Text>Kirjaudu</Text>
      </Box>
    )
  }

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
          {bots?.map((bot, i) =>
            (<BotCard key={i} bot={bot} session={session} />)
          )}
        </Box>
      </ScrollView>
    </Box>
  )
}