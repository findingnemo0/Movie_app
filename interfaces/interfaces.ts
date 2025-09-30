interface Movie {
 Title: string;    
  Year: string;        
  imdbID: string;      
  Type: "movie" | "series" | "episode"; 
  Poster: string;  
}


interface TrendingMovie {
  searchTerm: string;
  movie_id: string;
  Title: string;
  count: number;
  Poster: string;
}

interface OMDbMovieDetails  {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string; 
  imdbRating: string;
  imdbID: string;
  Type: string;
  [key: string]: any;
}


interface TrendingCardProps {
  movie: TrendingMovie;
  Title:string;
  index: number;
}


export {Movie,TrendingMovie, OMDbMovieDetails , TrendingCardProps}