import React, { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Tables } from "@/lib/supabase.types";
import { Spinner } from "@/components/ui/spinner"
import colors from "tailwindcss/colors"
import { fetchPublishedConversations, PublishedConversations } from "@/api/supabase/conversations";
import ConversationCard from "@/components/ConversationCard";
import { View } from "react-native";
import Screen from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import AnimateAstronaut from "@/components/AnimateAstronaut";
import { Image } from "@/components/ui/image";

export default function ReelScreen() {
  const [publishedConversations, setPublishedConversations] = useState<PublishedConversations>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPublishedConversations()
      .then((publishedConversations) => {
        if (publishedConversations) {
          setPublishedConversations(publishedConversations)
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
        <Spinner size="large" color={colors.purple[300]} />
      </Box>
    )
  }

  return (
    <Screen>
      <Box>
        {publishedConversations.length ?
          <Box className="flex-1 pb-20">
            {publishedConversations?.map((data, i) => (<ConversationCard key={i} data={data} />))}
          </Box>
          :
          <Box className="h-[75vh] gap-5 justify-center items-center">
            <AnimateAstronaut>
              <Image
                source={require("@/assets/images/buchenaut2.png")}
                alt="profile-image"
                size="xl"
                style={{ transform: [{ scaleX: -1 }] }} // 👈 flips horizontally
              />
            </AnimateAstronaut>
            <Heading size="lg">Buche, tervetuloa</Heading>
            <Box className="max-w-90 px-20">
              <Text className="italic text-purple-300 mb-3">“The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.”</Text>
              <Text className="italic self-end font-bold text-purple-300">- Carl Sagan</Text>
            </Box>
          </Box>
        }
      </Box>
    </Screen>
  )
}