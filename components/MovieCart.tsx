import { Image, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import {Movie} from '../interfaces/interfaces'

interface MovieCartProps{
  movie:Movie;
}

const MovieCart = ({movie}:MovieCartProps) => {
  if(!movie) return null;
  return (
    <Link href={`/movies/${movie.imdbID}`} asChild>
        <TouchableOpacity className='w-[30%]'>
            <Image 
                source={{
                   uri: movie.Poster !== "N/A" 
                   ? movie.Poster 
                   : "https://via.placeholder.com/300x450/1a1a1a/ffffff.png",
          }}
                className='w-full h-52 rounded-lg'
                resizeMode='cover'
                />
                <Text 
                    className='text-sm font-bold text-white mt-2' 
                    numberOfLines={1}>
                    {movie.Title}
                </Text>
                <View className='flex flex-row justify-between'>
                     <Text className="text-xs text-gray-400">{movie.Type}</Text>
                     <Text className="text-xs text-gray-400">{movie.Year}</Text>
                </View>

        </TouchableOpacity>
    </Link>
  )
}

export default MovieCart