import { Text, Image, View, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserIcon, ChevronDownIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon, } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';
import category from '../sanity/schemas/category';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);
    // load as soon as screen mount
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])
    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "featured"]{
            ...,
            restaurants[]->{
                ...,
                dishes[]->
            }
        }
        `).then(data => {
            setFeaturedCategories(data);
        });
    }, []);
    // console.log("feature", featuredCategories[0]);
    return (
        <SafeAreaView className="bg-white pt-5">
            {/* Header */}
            <View className="flex-row pb-3 items-center mx-4 space-x-2">
                <Image 
                    source={{
                        uri: 'https://links.papareact.com/wru'
                    }}
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                />
                <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
                    <Text className="font-bold text-xl">
                        Current Location <ChevronDownIcon size={20} color="#00CCBB" />
                    </Text>
                </View>
                <View className="pl-20">
                    <UserIcon size={30} color="#00CCBB" className=""/>
                </View>
            </View>
            {/* Search */}
            <View className="flex-row items-center space-x-2 pb-2 mx-4">
                <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
                    <MagnifyingGlassIcon color="gray" size={20}/>
                    <TextInput placeholder="Restaurants and cuisines" keyboardType="default" />
                </View>
                <AdjustmentsHorizontalIcon color="#00CCBB"/>
            </View>
            {/* body */}
            <ScrollView className="bg-gray-100" contentContainerStyle={{
                paddingBottom: 100,
            }}>
                {/* categories */}
                <Categories />
                {/* featured */}
                {/* <FeaturedRow
                    id="123"
                    title="Featured"
                    description="Paid placements from our partners"
                /> */}
                {featuredCategories?.map(category=> (
                    <FeaturedRow
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.short_description}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
    
}

export default HomeScreen;
