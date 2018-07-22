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
    var movieIdVar = jQuery(this).attr("movieId");
    console.log("movieID"+ movieIdVar);
    addCollection(movieIdVar,createCollection);
  })

  jQuery(document).on("click",".insideCollectionButton",function(e){
    e.preventDefault();
    var movieIdVar = jQuery(this).attr("movieId");
    addCollectionToFavs(movieIdVar,createFavCollection);
  })

  jQuery(document).on("click",".removeFavCollectionButton",function(e){
    e.preventDefault();
    var favMovieIdVar = jQuery(this).attr("movieId");
    var movieGenre = jQuery(this).attr("moviegenre");
    var favMovieCatergoyVar = jQuery(this).attr("value");
    deleteFavMovieCollectionData(favMovieIdVar,movieGenre);
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
        <button type="button" class="collectionButton btn btn-success" data-toggle="modal" data-target="#fullHeightModalRight" movieId="${searchRecd.id}">Add to Favs</button>
      </div>
  ` });
  jQuery("#" + "searchSection").html("");
  jQuery("#" + "searchSection").append(showMovieSearchPanelHtml);
}

jQuery(document).ready(function(){
  eventListner();
  getTopMovie(1,createMovieList);
  getFavMovieCollectionData();
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
            <button type="button" class="collectionButton btn btn-success" data-toggle="modal" data-target="#fullHeightModalRight" movieId="${movieRecod.id}" >Add this</button>
          </div>
      </div>
      `
  });

  jQuery("#" + "topMoviesContainer").append(showTopMoviesHtml);
}

//Adding data to collection 
function addCollection(movieIdVar,callback){
    console.log("this is data!!!!!", movieIdVar);
    // console.log("this is data!!!!!", JSON.stringify(res));
    jQuery.ajax({
            type: "GET",
            contentType : "application/json",
            url: `https://api.themoviedb.org/3/movie/${movieIdVar}?api_key=7520477c96fad381a44633a2b7596a01&language=en-US`,
            success: function(res){
              //console.log("collection" +JSON.stringify(res));
              callback(res);
            },
        });
}

function createCollection(res){
  console.log("inside funtion" );
  console.log(JSON.stringify(res.poster_path));
  var showCollectionMoviesHtml = "";
  showCollectionMoviesHtml += `
    <div class="col-12" id= ${res.id}>
        <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${res.poster_path}" alt="${res.original_title}">
        <div class="buttom-panel text-center mt-1">
            <form>
              <div class="form-group">
                <label for="exampleFormControlSelect1">Want to add in</label>
                <select class="form-control" id="exampleFormControlSelect1"  >
                  <option value="Action" id="Action">Action</option>
                  <option value="Favourates" id="Favourates">Favourates</option>
                  <option value="Adventure" id="Adventure">Adventure</option>
                  <option value="Fantasy" id="Fantasy">Fantasy</option>
                  <option value="Sci-Fi" id="Sci-Fi">Sci-Fi</option>
                  <option value="Thriller" id="Thriller">Thriller</option>
                </select>
              </div>
            <form>
            <button type="button" class="insideCollectionButton btn btn-success" movieId="${res.id}">Done</button>
        </div>
    </div>
    `
    //console.log("res 1" +showCollectionMoviesHtml);
    document.getElementById('insideModalClass').innerHTML= showCollectionMoviesHtml;
}

function addCollectionToFavs(movieIdVar,callback){
  console.log("this is collection" + movieIdVar);
  addCollection(movieIdVar,callback);
}

  function createFavCollection(data,callback){
      // console.log("this is createFavCollection" +JSON.stringify(data.value));
       var collectionName= jQuery("#exampleFormControlSelect1").val();
        
        jQuery.ajax({
                  type: "POST",
                  data: JSON.stringify(data),
                  dataType:"json",
                  contentType : "application/json",
                  url: `http://localhost:3001/${collectionName}`,
                  success: function(data){
                      console.log("Data Added Successfully");
                      getFavMovieCollectionData();
                  },
              });
  }

  function getFavMovieCollectionData(){
    jQuery.ajax({
      type: "GET",
      dataType: "json",
      contentType : "application/json",
      url: `http://localhost:3001/db`,
      success: function(data){
        var createFavCollectionHtml = "";

        Object.keys(data).map(function(objectKey, index) {
          var value = data[objectKey];
          jQuery.each( value, function( j , value1 ) {  
          console.log(value1);
          createFavCollectionHtml += `
          <div class="col-2" id= ${value1.id}>
              <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${value1.poster_path}" alt="${value1.original_title}" class="img-thumbnail rounded">
              <div class="buttom-panel text-center mt-1">
                  <button type="button" class="removeFavCollectionButton btn btn-success" movieGenre="${objectKey}" movieId="${value1.id}">Remove</button>
              </div>
          </div>`
      });
    });
    jQuery("#" + "favMovies").html(createFavCollectionHtml);
    }
  });
}

  function deleteFavMovieCollectionData(favMovieIdVar,movieGenre) {
    jQuery.ajax({
        url: `http://localhost:3001/${movieGenre}/${favMovieIdVar}`,
        type: 'DELETE',
        success: function(data) {
          getFavMovieCollectionData(data);
        }
    })   
}