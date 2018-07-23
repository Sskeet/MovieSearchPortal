require("../scss/custom.scss");
import 'popper.js';
import 'bootstrap';
import {getTopMovie ,movieSearch ,getFavMovieCollectionData ,addCollection} from "./getMovieService";
import {eventListner ,addCollectionToFavs ,deleteFavMovieCollectionData} from "./eventListner";
import {createMovieSearchPanel , createMovieList ,createCollection ,createFavCollection} from "./createMovieList";
import {jQuery} from "./variables";

jQuery(document).ready(function(){
  eventListner();
  getTopMovie(1,createMovieList);
  getFavMovieCollectionData();
})
