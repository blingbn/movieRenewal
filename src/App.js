import axios from "axios";
import React from "react";
import Movie from "./Movie"
import "./App.css"

class App extends React.Component{
  state = {
    isLoading: true,
    movies:[]
  }
  componentDidMount(){  
    this.getMovies();
  }
  getMovies = async() => {
    const {
      data: {
        data: {movies}
      }
    } = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=raiting");
    this.setState({movies, isLoading:false});
  }
  render(){
    const {isLoading, movies} = this.state;
    return (<section className="container">
      {isLoading ? (
        <div className="loader">
          <span className="loader__text">Loading...</span>
        </div>
      ) : <div className="movies">
            {movies.map((movie) => {
                return (<Movie key={movie.id} 
                  id={movie.id} 
                  year={movie.year} 
                  title={movie.title} 
                  summary={movie.summary} 
                  url={movie.medium_cover_image} 
                  rating={movie.rating}
                  genres={movie.genres}
                />)})
            }
          </div>
      }
    </section>)
  
  }
}


export default App;

