// The entry file of your WebAssembly module.
import { Movie,movielist, Donation,donations } from "./model";
import { PersistentUnorderedMap, math, context,u128,ContractPromiseBatch, PersistentVector } from "near-sdk-as";


/**
 * @params - to add a movie to blockchain 
 */
export function addMovie(title:string,poster_path:string,overview:string):void {
  const movie=new Movie(title, poster_path, overview);
  const addedMovie=movielist.get(movie.id);
  assert(addedMovie === null, `This movie is already exists`);
  movielist.set(movie.id,movie);
  
}

/**
 * @returns - returns all movie that added to blockchain 
 */
export function getAllMovies(): Array<Movie>{
    return movielist.values();
}

/**
 * @returns - returns all donation that added to blockchain
 */
export function getAllDonations(): Donation[] {
  let array = new Array<Donation>()
  for (let i = 0; i < donations.length; i++) {
      array.push(donations[i])
  }
  return array
}

/**
 * @param id - returns added a movie via id parameter.
 * @returns - given id's movie
 */
export function getMovieById(id: u32): Movie | null {
  return movielist.get(id);
}

/**
 * It is used to donate by movie id  
 * (if the movie is available)
 * @param id - an identifier of a movie that is the subject of donate
 */
export function donateMovie(id:u32):void {
    
    const movie = movielist.get(id);
    const donatio = new Donation(id);
    
    if(movie == null) {
      throw new Error("Error");
    }
      
    ContractPromiseBatch.create(context.sender).transfer(context.attachedDeposit);

    donations.push(donatio);

}



