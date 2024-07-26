import { useState, useRef } from "react";
import { View, Text, FlatList, SectionList } from "react-native";
import { Header } from "@/components/header";
import { CategoryButton } from "@/components/category-button";
import { CATEGORIES, MENU } from "@/utils/data/products";
import { Link } from "expo-router";
import { Product } from "@/components/product";
import React from "react";

export default function Home(){
    const [category, setCategory] = useState(CATEGORIES[0])

    const sectionListRef = useRef<SectionList>(null)

    function handleCategorySelect(selectedCategory: string){
        setCategory(selectedCategory)
        const sectionIndex = CATEGORIES.findIndex(category => category === selectedCategory)
        // console.log(sectionIndex)

        if (sectionListRef.current){
            sectionListRef.current.scrollToLocation({
                animated: true, //animação
                sectionIndex, //usar o index que selecionamos
                itemIndex:0 // e usar o 1 como ponto de partida (Promoções)
            })
        }

    }


    return(
        <View>
            <Header title="Faça seu Pedido" cartQuantityItems={0} />
            <FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item}
                renderItem={({item}) =>
                    <CategoryButton
                        title={item}
                        isSelected={item === category}
                        onPress={() =>handleCategorySelect(item)}
                    />    
                }
                horizontal
                className="max-h-15 mt-1"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{gap:12, paddingHorizontal:20}}
            />
            <SectionList
                ref={sectionListRef}
                sections={MENU}
                keyExtractor={(item) => item.id}
                // não fazer efeito de esticar
                stickySectionHeadersEnabled={false}
                renderItem={({item}) =>
                    <Link href={`/product/${item.id}`} asChild>
                        <Product data={item}/>                   
                    </Link>
                }
                renderSectionHeader={({section: {title}}) => (
                    <Text className="text-xl text-yellow-100 font-heading mt-9 mb-3">{title}</Text>
                )}
                
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 220}}
            />

        </View>
        )
}


{/* 
<View className="flex-row gap-8">
<CategoryButton title="Lanche do dia"  />
<CategoryButton title="Promoções" isSelected />
<CategoryButton title="Sobremesa" />
<CategoryButton title="Bebidas" />
</View> 
*/}