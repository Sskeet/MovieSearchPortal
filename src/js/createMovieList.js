import {jQuery} from "./variables";
import {getTopMovie ,movieSearch ,getFavMovieCollectionData ,addCollection} from "./getMovieService";
import {eventListner ,addCollectionToFavs ,deleteFavMovieCollectionData} from "./eventListner";

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

  //step 2 create movie list
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

export {createMovieSearchPanel , createMovieList ,createCollection ,createFavCollection};