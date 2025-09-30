import { Image, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { TrendingCardProps } from '@/interfaces/interfaces'
import MaskedView from '@react-native-masked-view/masked-view';
import { images } from '@/assets'

const TrendingCard = ({movie:{movie_id, Title , Poster},index }:TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
        <TouchableOpacity className='w-32 relative pl-5'>
                <Image
                    source={{uri:Poster}}
                    className='w-32 h-48 rounded-lg'
                    resizeMode='cover'
                />

                <View
                    className='absolute bottom-9 -left-3.5 px-2 py-1 rounded-full '
                >
                    <MaskedView 
                        maskElement={
                            <Text className='font-bold text-white text6xl'>
                                {index + 1}
                            </Text>
                        }>
                        <Image
                            source={images.rankingGradient}
                            className='size-14'
                            resizeMode='cover'
                        />
                    </MaskedView>
                </View>

                <Text className='text-sm font-bold mt-2 text-light-200' numberOfLines={2}>
                    {Title}
                </Text>
        </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard