var jQuery = require('jquery');


//fetching data from server 1st step 
function getTopMovie(pageNo,callback){
    jQuery.ajax({
        type: "GET",
        data: "json" ,
        contentType : "application/json",
        url: 'https://api.themoviedb.org/3/movie/popular?api_key=7520477c96fad381a44633a2b7596a01&language=en-US&page='+pageNo,
        success: function(res){
            callback(res);
        },
    });
}

export {getTopMovie};