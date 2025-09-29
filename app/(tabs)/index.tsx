import SearchBar from "@/components/SearchBar";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "../../assets";
import MovieCart from "@/components/MovieCart";

export default function Index() {
  const router = useRouter();

  const {
    data:movies , 
    loading:moviesLoading , 
    error:moviesError
    } = useFetch(()=>fetchMovies({
    query:''
  }))


  return (
    <View  className="flex-1 bg-primary">
      <Image 
      source={images.bg} 
      className="absolute w-full z-0"
      />
      <ScrollView 
      className="flex-1 px-5"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
          minHeight:"100%",
          padding:10,
      }}
      >
          <Image 
              source={icons.logo}
              className="w-12 h-10 mt-20 mb-5 mx-auto"
          />
           

           {moviesLoading ?(
            <ActivityIndicator
             size="large"
             color="#0000ff"
             className="mt-10 self-center"
            />
           ):moviesError?(
            <Text>Error:{moviesError?.message}</Text>
           ):(
             <View className="flex-1 mt-5">
             <SearchBar
              onFocus={()=> router.push('/(tabs)/search')}
              placeholder="Search for a movie"
             />
             <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies
              </Text>
              
              <FlatList
                data={movies || []}
                renderItem={({item})=>(
                  <MovieCart
                      movie={item}
                  />
                )}  
                keyExtractor={(item) => item.imdbID}
                numColumns={3}
                columnWrapperStyle={{
                      justifyContent:'flex-start',
                      gap:20,
                      paddingRight:5,
                      marginBottom:10
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
              </>
          </View>
           )}
      </ScrollView>
    </View>
  );
}
