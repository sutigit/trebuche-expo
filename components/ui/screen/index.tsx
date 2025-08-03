import React, { ReactNode } from 'react'
import { Box } from '../box'
import { ScrollView } from "@/components/ui/scroll-view";

export default function Screen({ children, background = false }: { children: ReactNode, background?: boolean }) {
    return (
        <Box className={`h-screen flex-1 overflow-hidden pt-16 pb-[65px] ${background ? 'bg-zinc-900' : 'bg-transparent'}`}>
            <ScrollView>
                {children}
            </ScrollView>
        </Box>
    )
}