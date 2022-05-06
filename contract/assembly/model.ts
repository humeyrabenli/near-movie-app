import { PersistentUnorderedMap, math, context, u128, PersistentVector } from "near-sdk-as";
import { AccountId, Money } from "./utils";



/**
 * movielist - it's a key-value datastructure that is used to store movies by users.
 * donations - it's a key-value datastructure that is used to store donations by donaters.
 * PersistentUnorderedMap - similar to PersistentMap but with useful additional functions 
 * that allow us to iterate over keys, values, entries.
 * The string movies in the PersistentUnorderedMap's constructor is the unique prefix to use for every key.
 * PersistentVector - data structure that wraps storage to appear like a Vector
 * The string donations in the PersistentVector's constructor is the unique prefix to use for every key.
 */
export const movielist = new PersistentUnorderedMap<u32, Movie>("movies");
export const donations = new PersistentVector<Donation>("donations");


/**
 * Movie class represents a movie that can be listed on a website.
 * It contains basic properties that are needed to define a movie.
 * {@link nearBindgen} - it's a decorator that makes this class serializable so it can be persisted on the blockchain level. 
 */
@nearBindgen
export class Movie {
  id: u32;
  title: string;
  poster_path: string;
  overview: string;
  owner: AccountId;

  constructor(title:string, poster_path:string, overview:string) {
    this.id = math.hash32<string>(title);
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
    this.owner = context.sender;
  }

  
}

/**
 * Donation class represents a donate that can be listed on a web page.
 * It contains basic properties that are needed to define a donate.
 * {@link nearBindgen} - it's a decorator that makes this class serializable so it can be persisted on the blockchain level. 
 */
@nearBindgen
export class Donation {
  donater: AccountId;
  id: u32;
  donateAmount:Money
  constructor(id:u32) {
     this.id = id; 
     this.donater = context.sender;
     this.donateAmount=context.attachedDeposit;
     
  }
}



