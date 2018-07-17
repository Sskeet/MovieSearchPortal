
    $(document).ready(function(){
        $.ajax({
            type: "GET",
            data: json ,
            contentType : "application/json",
            url: 'https://api.themoviedb.org/3/movie/popular?api_key=7520477c96fad381a44633a2b7596a01&language=en-US&page=1',
            success: function(res){
                var resData = JSON.stringify(res);
                //var parseData = jQuery.parseJSON(res);
                //console.log(resData);
                //console.log(resData);
                return resData;
            },
        });
    })

    // var htmlText = '';

    // for ( var key in resData ) {
    //     htmlText += '<div class="div-conatiner">';
    //     htmlText += '<p class="p-name"> page: ' + resData[key].results.title + '</p>';
    //     htmlText += '<p class="p-loc"> Location: ' + resData[key].results.overview + '</p>';
    //     // htmlText += '<p class="p-desc"> Description: ' + resData[key].description + '</p>';
    //     // htmlText += '<p class="p-created"> Created by: ' + resData[key].created_by + '</p>';
    //     // htmlText += '<p class="p-uname"> Username: ' + resData[key].users_name + '</p>';
    //     htmlText += '</div>';
    // }
    // var htmlText = '';
    // $('body').append(htmlText);

    // results.title
    // results.poster_path - img src
    // results.overview
    // results.title


    // {
    //     "page": 1,
    //     "total_results": 19806,
    //     "total_pages": 991,
    //     "results": [
    //         {
    //             "vote_count": 1853,
    //             "id": 351286,
    //             "video": false,
    //             "vote_average": 6.6,
    //             "title": "Jurassic World: Fallen Kingdom",
    //             "popularity": 240.222,
    //             "poster_path": "/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg",
    //             "original_language": "en",
    //             "original_title": "Jurassic World: Fallen Kingdom",
    //             "genre_ids": [
    //                 28,
    //                 12,
    //                 878
    //             ],
    //             "backdrop_path": "/gBmrsugfWpiXRh13Vo3j0WW55qD.jpg",
    //             "adult": false,
    //             "overview": "Several years after the demise of Jurassic World, a volcanic eruption threatens the remaining dinosaurs on the island of Isla Nublar. Claire Dearing, the former park manager and founder of the Dinosaur Protection Group, recruits Owen Grady to help prevent the extinction of the dinosaurs once again.",
    //             "release_date": "2018-06-06"
    //         },