// The entry file of your WebAssembly module.
import { Movie,movielist, Donation,donations } from "./model";
import { PersistentUnorderedMap, math, context,u128,ContractPromiseBatch, PersistentVector } from "near-sdk-as";


//TODO:addMovie,getAllMovies,donateMovie,
// 3 degisken pasla add movie

//get all movies parametre almıcak

//donatemovie movieId alcak,donation amount, 
export function addMovie(title:string,poster_path:string,overview:string):void {
  const movie=new Movie(title, poster_path, overview);
  const addedMovie=movielist.get(movie.id);
  //!!!!!
  assert(addedMovie === null, `This movie is already exists`);
  movielist.set(movie.id,movie);
  
}

export function getAllMovies(): Array<Movie>{
    return movielist.values();
}


export function getAllDonations(): Donation[] {
  let array = new Array<Donation>()
  for (let i = 0; i < donations.length; i++) {
      array.push(donations[i])
  }
  return array
}

export function getMovieById(id: u32): Movie | null {
  return movielist.get(id);
}



export function donateMovie(id:u32):void {
    
    const movie = movielist.get(id);
    const donatio = new Donation(id);
    
    if(movie == null) {
      throw new Error("Error");
    }
      
    ContractPromiseBatch.create(context.sender).transfer(context.attachedDeposit);

    donations.push(donatio);

}

export function assert_deposit(amount: string): void {
  assert( amount <= context.attachedDeposit.toString(), "Please send enough NEAR!")
}

