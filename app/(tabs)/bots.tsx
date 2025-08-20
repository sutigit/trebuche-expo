import React, { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { fetchBots } from "@/api/supabase/bots";
import { Spinner } from "@/components/ui/spinner"
import colors from "tailwindcss/colors"
import { Tables } from "@/lib/supabase.types";
import BotCard from "@/components/BotCard";
import { Text } from "@/components/ui/text";
import { ScrollView } from "@/components/ui/scroll-view";
import { useSession } from "@/hooks/useSession";
import { View } from "react-native";
import Screen from "@/components/ui/screen";

export default function BotsScreen() {
  const session = useSession();
  const [bots, setBots] = useState<Tables<'bots'>[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetchBots()
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
        <Spinner size="large" color={colors.purple[300]} />
      </Box>
    )
  }

  return (
    <Screen>
      <Box className="flex-1 pb-20 pt-5 px-4 gap-7">
        {bots?.map((bot, i) =>
        (
          <BotCard key={i} bot={bot} session={session} />
        )
        )}
      </Box>
    </Screen>
  )
}