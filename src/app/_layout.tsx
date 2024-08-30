import { SafeAreaView } from 'react-native'
import { Loading } from '@/components/loading'
import { Slot } from 'expo-router'
import { StripeProvider } from '@stripe/stripe-react-native';

import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
} from '@expo-google-fonts/poppins'
import React from 'react';

export default function Layout(){
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold
    })

    if(!fontsLoaded){
        return <Loading />
    }

    return (
        <StripeProvider
            publishableKey={process.env.STRIPE_PUBLIC_KEY || ''}
        >
            <SafeAreaView className="flex-1 bg-slate-900">
                <Slot></Slot>
            </SafeAreaView>
        </StripeProvider>
    )

}