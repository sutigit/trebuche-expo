import React, { useState } from 'react'
import Screen from '@/components/ui/screen'
import { Text } from '@/components/Themed'
import { Box } from '@/components/ui/box'


export default function DashboardScreen() {

    return (
        <Screen>
            <Box className='px-1 py-5'>
                <Text>Dashbörd</Text>
            </Box>
        </Screen>
    )
}