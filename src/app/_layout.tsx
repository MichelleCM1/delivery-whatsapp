import { SafeAreaView } from "react-native"
import { Loading } from '@/components/loading'
import { Slot } from "expo-router"
import { useFonts, Poppins_600SemiBold,
    Poppins_500Medium, 
    Poppins_400Regular, 
    Poppins_700Bold } from "@expo-google-fonts/poppins"
import React from "react"


export default function Layout(){
    const [fontsLoaded]= useFonts({
        Poppins_600SemiBold, 
        Poppins_500Medium,
         Poppins_400Regular, 
         Poppins_700Bold
    })

    if(!fontsLoaded){
        return <Loading />
    }

    return (
        <SafeAreaView className="flex-1 bg-slate-900">
            <Slot> </Slot>
        </SafeAreaView>

    )
}