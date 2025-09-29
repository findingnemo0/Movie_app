import { Image, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const MovieCart = ({imdbID,Poster, Title , Type, Year}:Movie) => {
    console.log(Poster);
  return (
    <Link href={`/movies/${imdbID}`} asChild>
        <TouchableOpacity className='w-[30%]'>
            <Image 
                source={{
                   uri: Poster !== "N/A" 
                   ? Poster 
                   : "https://via.placeholder.com/300x450/1a1a1a/ffffff.png",
          }}
                className='w-full h-52 rounded-lg'
                resizeMode='cover'
                />
                <Text 
                    className='text-sm font-bold text-white mt-2' 
                    numberOfLines={1}>
                    {Title}
                </Text>
                <View className='flex flex-row justify-between'>
                     <Text className="text-xs text-gray-400">{Type}</Text>
                     <Text className="text-xs text-gray-400">{Year}</Text>
                </View>

        </TouchableOpacity>
    </Link>
  )
}

export default MovieCart