import React, { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Tables } from "@/lib/supabase.types";
import { Spinner } from "@/components/ui/spinner"
import { ScrollView } from "@/components/ui/scroll-view";
import colors from "tailwindcss/colors"
import { fetchConversations } from "@/api/supabase/conversations";
import ConversationCard from "@/components/ConversationCard";

export default function IdeasScreen() {
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
    <Box className="max-h-screen flex-1 overflow-hidden pt-16 pb-[65px]">
      <ScrollView>
        <Box className="flex-1 pb-20 pt-5 px-6 gap-10 divided">
          {/* {conversations?.map((conversation, i) => (<ConversationCard key={i} conversation={conversation} />))} */}
          <ConversationCard conversation={conversations[0]} />
          <ConversationCard conversation={conversations[0]} />
          <ConversationCard conversation={conversations[0]} />
        </Box>
      </ScrollView>
    </Box>
  )
}