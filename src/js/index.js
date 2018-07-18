var jQuery =require("jquery");
import 'popper.js';
import 'bootstrap';
require("../scss/custom.scss");
import {getTopMovie} from "./getMovieService";


// step 3 create events for viewing more data
function eventListner(){
  jQuery(document).on("click",'#loadMovie',function(e){
    var pageNo = jQuery(this).attr("pageNumber");
    pageNo = parseInt(pageNo)+1;
    getTopMovie(pageNo,createMovieList);
    jQuery(this).attr("pageNumber",pageNo);
  })

  jQuery(document).on("click",'#searchMovies',function(e){
    e.preventDefault();
    var moviSear = jQuery('#searchText').val();
    movieSearch(moviSear,createMovieSearchPanel);
  })

  jQuery(document).on("click",".collectionButton",function(e){
    e.preventDefault();
    var movieId = jQuery(this).attr("id");
    getTopMovie(movieId, addCollection);
  })
}

function movieSearch(searchText,callback){
  jQuery.ajax({
    type: "GET",
    data: "jsonp" ,
    contentType : "application/json",
    url: 'https://api.themoviedb.org/3/search/movie?api_key=7520477c96fad381a44633a2b7596a01&language=en-US&query='+searchText+'&page=1&include_adult=false',
    success: function(resp){
      console.log(resp);
        callback(resp);
    },
});
}

function createMovieSearchPanel(resp){
  console.log(resp);
  var showMovieSearchPanelHtml;
  resp.results.map(searchRecd => {
    showMovieSearchPanelHtml += `
      <div class="col-2 movieContainer" id= ${searchRecd.id}>
        <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${ searchRecd.poster_path}" alt="${searchRecd.original_title}" class="img-thumbnail rounded">
        <button type="button" class="collectionButton btn btn-success" movieId="${searchRecd.id}">Add to Favs</button>
      </div>
  ` });
  jQuery("#" + "searchSection").append(`<h3>The Search List</h3>`+showMovieSearchPanelHtml);
}

jQuery(document).ready(function(){
  eventListner();
  getTopMovie(1,createMovieList);
})

// step 2 create movie list
function createMovieList(res){
  console.log(res);
  var showTopMoviesHtml = "";
  res.results.map(movieRecod => {
      showTopMoviesHtml += `
      <div class="col-2 movieContainer" id= ${movieRecod.id}>
          <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${ movieRecod.poster_path}" alt="${movieRecod.original_title}" class="img-thumbnail rounded">
          <div class="buttom-panel text-center mt-1">
            <button type="button" class="collectionButton btn btn-success" movieId="${movieRecod.id}" >Add this</button>
          </div>
      </div>
      `
  });

  jQuery("#" + "topMoviesContainer").append(showTopMoviesHtml);
}


//CRUD operations using basic ajax and jquery 
function ajaxAddToFav(resfav){
    jQuery.ajax({
      type: "GET",
      data: "json" ,
      contentType : "application/json",
      url: 'http://localhost:3000/results',
      success: function(resfav){
          callback(resfav);
      },
  });
}


function ajaxDeleteFromFav(){
    jQuery.ajax({
      type: "DELETE",
      data: "json" ,
      contentType : "application/json",
      url: 'http://localhost:3000/results',
      success: function(resfav){
          callback(resfav);
      },
  });
}

//Adding data to collection 
function addCollection(resul){
    var dataCollectionLst = {
        // vote_count: resul.vote_count,
        id: resul.id,
        // vote_average: resul.vote_average,
        // title: resul.title,
        poster_path: resul.poster_path,
        // original_language: resul.original_language,
        // overview: resul.overview,
    };

    jQuery.ajax({
      type: "POST",
      data: "json" ,
      contentType : "application/json",
      url: 'http://localhost:3000/results',
      success: function(resfav){
        results.append(dataCollectionLst,dataCollectionLst.poster_path)
      },
  });
}
//function for selecting the movie and getting the movie details
// function movieSelected(id){
//   sessionStorage.setItem('movieId',id);
//   window.location = 'movie.html';
//   return false;
// }

// function getMovieDetail(){
//   let movieId  = sessionStorage.getItem(movieId);
// }
