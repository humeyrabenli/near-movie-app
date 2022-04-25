import { PersistentUnorderedMap, math, context, u128, PersistentVector } from "near-sdk-as";
import { AccountId, Money } from "./utils";

export const movielist = new PersistentUnorderedMap<u32, Movie>("movies");
export const donations = new PersistentVector<Donation>("donations");



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



