import React, { ReactNode } from 'react'
import { Box } from '../box'
import { ScrollView } from "@/components/ui/scroll-view";

export default function Screen({ children }: { children: ReactNode }) {
    return (
        <Box className="max-h-screen flex-1 overflow-hidden pt-16 pb-[65px]">
            <ScrollView>
                {children}
            </ScrollView>
        </Box>
    )
}