mainModule = (function (UIModule, dataModule) {
    const url = 'http://api.tvmaze.com/shows';
    let seasonsArray = [];
    let showArray = [];
    
    let tvShows;

    function init() {
        $(document).ready(() => {
            loadshows();

        });
    }
    // load 51 shows in main page 
    function loadshows() {
        const request = $.ajax({
            url: url,
            method: "GET"
        });
        request.done(function (response) {
            let shows = [];

            response.forEach((e, i) => {
                let singleShow = new dataModule.createSingleShow(
                    response[i].name,
                    response[i].image.medium,
                    response[i].id,
                    response[i].summary
                )
                shows.push(singleShow);
            });
            tvShows = dataModule.createAllTVShow(shows, 51);
            UIModule.ShowShows(tvShows)
        });
        request.fail(function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });
    }

    // search
    function searchShows() {
        $('.js-search-bar').on('keyup', function (event) {
            $(document).ready(function () {
                const request = $.ajax({
                    url: url,
                    method: 'GET',
                });

                request.done(function (response) {
                    UIModule.showSearchList(response)
                })

                request.fail(function (jqXHR, textStatus) {
                    alert("Request failed: " + textStatus);
                });
                UIModule.showSearchList(tvShows) 
            });
        });
    }
    //open details in showInfoPage
    function openDetails(id) {
        localStorage.setItem('showId', id);
        window.open('show-info-page.html');
    }

    function loadSingleShow(id) {
        const request = $.ajax({
            url: url + '/' + id,
            method: 'GET'
        });

    request.done(function (response){
        let show = new dataModule.createSingleShow(
            response.name,
            response.image.large,
            response.id,
            response.summary
        );
        //getCastData(show)
    });
    request.fail(function(jqXHR, textStatus) {
        alert('Request failed: ' + textStatus);
    });
    };

    //ezt tuzetesen atnezni!!!
    function getShowData() {
        let idShow = localStorage.getItem('id');

        $(document).ready(() => {
            const request = $.ajax({
                url: `${url}/${idShow}`,
                method: 'GET'
            });

            request.done(function (response) {
                console.log(response);
                const show = dataModule.createSingleShow(
                    response.name,
                    response.image.medium,
                    response.id,
                    response.summary
                );
                showArray.push(show);
                castArray.forEach(function (e, i){
                    showArray[0].addCast(e.name);
                });
                season.forEach(function (e, i){
                    showArray[0].addSeason(e)
                })
                console.log(showArray);
            });
            request.fail(function (jqXHR, textStatus){
                alert('Request failed: ' + textStatus);
            })
        })
    }

    function loadDetails() {
        let showId = localStorage.getItem('showId');
        loadSingleShow(showId);
    }


    return {
        init,
        loadshows,
        searchShows,
        openDetails,
        loadSingleShow,
        loadDetails,
        getShowData
    }

})(UIModule, dataModule)