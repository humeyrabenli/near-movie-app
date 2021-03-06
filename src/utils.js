import * as nearAPI from 'near-api-js';
import getConfig from './config'


const nearConfig = getConfig(process.env.NODE_ENV || 'development')

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await nearAPI.connect(Object.assign({ deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new nearAPI.WalletConnection(near)

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId()

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new nearAPI.Contract(window.walletConnection.account(), nearConfig.contractName, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['getAllMovies', 'getAllDonations', 'getMovieById','getDonationsByMovieId'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['addMovie', 'donateMovie'],
  })
}

export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName)
}

//to get all movies that saved previously.
export function getAllMovies() {
  return window.contract.getAllMovies();
}

//to add movie
export function addMovie(title, poster_path, overview) {
  return window.contract.addMovie({title, poster_path, overview});
}

//to get all donations that saved previously 
export function getAllDonations() {
  return window.contract.getAllDonations();
}

//to get movie by id 
export function getMovieById(id){
  return window.contract.getMovieById({id});
}

//to get donate by id
export function getDonationsByMovieId(id) {
  return window.contract.getDonationsByMovieId({id});
}

//to donate to a movie 
export const donateMovie = async (id, donateAmount) => {
  const gas = 30_000_000_000_000;
  const depositInYoctoNEAR = nearAPI.utils.format.parseNearAmount(donateAmount);
  // @ts-ignore
  return window.contract.donateMovie({ id }, gas, depositInYoctoNEAR);
};
