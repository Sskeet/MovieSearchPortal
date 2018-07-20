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
    // var movieCount = movieId.length;
    //   for (var i = 0; i <= movieCount; i++) {
    //       buttons[i].onclick = function(e) {
    //           console.log(this.id);
    //       };
    //   }
    // getTopMovie(movieId, addCollection);
    addCollection(movieIdVar,createCollection);
  })

  jQuery(document).on("click",".insideCollectionButton",function(e){
    e.preventDefault();
    var movieIdVar = jQuery(this).attr("movieId");
    addCollectionToFavs(movieIdVar,createCollection);
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
  jQuery("#" + "searchSection").append(showMovieSearchPanelHtml);
}

jQuery(document).ready(function(){
  eventListner();
  getTopMovie(1,createMovieList);
  // getCollectionToFav();
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
                <select class="form-control" id="exampleFormControlSelect1" >
                  <option value="Favourates" id="Favourates">Favourates</option>
                  <option value="Adventure" id="Adventure">Adventure</option>
                  <option value="Fantasy" id="Fantasy">Fantasy</option>
                  <option value="Sci-Fi" id="Sci-Fi">Sci-Fi</option>
                  <option value="Action" id="Action">Action</option>
                  <option value="Thriller" id="Thriller">Thriller</option>
                </select>
              </div>
            <form>
            <button type="button" class="insideCollectionButton btn btn-success" movieId="${res.id}">Done</button>
        </div>
    </div>
    `
    console.log("res 1" +showCollectionMoviesHtml);
    document.getElementById('insideModalClass').innerHTML= showCollectionMoviesHtml;
}

// function addCollectionToFavs(movieIdVar){
//   
// }


// function getCollectionToFav(res){
//   var showFavMoviesHtml;    
//   jQuery.ajax({
//         type: "GET",
//         contentType : "application/json",
//         url: `http://localhost:3000/value`,
//         success: function(res){
//           callback(res);
//         },
//     });

//     res.map(favMovieRecod => {
//       showFavMoviesHtml += `
//       <div class="col-2 movieContainer" id= ${favMovieRecod.id}>
//           <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${ favMovieRecod.poster_path}" alt="${favMovieRecod.original_title}" class="img-thumbnail rounded">
//           <div class="buttom-panel text-center mt-1">
//             <button type="button" class="collectionButton btn btn-success" data-toggle="modal" data-target="#fullHeightModalRight" movieId="${favMovieRecod.id}" >Add this</button>
//           </div>
//       </div>
//       `
//     });

//     jQuery("#" + "favMovies").append(showFavMoviesHtml);
// }