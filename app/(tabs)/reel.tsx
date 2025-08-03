import React, { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Tables } from "@/lib/supabase.types";
import { Spinner } from "@/components/ui/spinner"
import colors from "tailwindcss/colors"
import { fetchConversations } from "@/api/supabase/conversations";
import ConversationCard from "@/components/ConversationCard";
import { View } from "react-native";
import Screen from "@/components/ui/screen";

export default function ReelScreen() {
  const [conversations, setConversations] = useState<Tables<'conversations'>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConversations()
      .then((conversations) => {
        if (conversations) {
          setConversations(conversations)
        }
      })
      .catch((err) => {
        console.log("📌 error", err)
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
    <Screen>
      <Box className="flex-1 pb-20 pt-5 px-1 gap-10">
        {/* {conversations?.map((conversation, i) => (<ConversationCard key={i} conversation={conversation} />))} */}
        <ConversationCard conversation={conversations[0]} />
        <View className="border-b border-white/15" />
        <ConversationCard conversation={conversations[0]} />
        <View className="border-b border-white/15" />
        <ConversationCard conversation={conversations[0]} />
        <View className="border-b border-white/15" />
        <ConversationCard conversation={conversations[0]} />
        <View className="border-b border-white/15" />
        <ConversationCard conversation={conversations[0]} />
      </Box>
    </Screen>
  )
}