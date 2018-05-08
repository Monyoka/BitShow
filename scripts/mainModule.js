mainModule = (function (UIModule, dataModule) {
    const url = 'http://api.tvmaze.com/shows';
    let seasonsArray = [];
    let showArray = [];
    let castArray = [];

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

    function loadDetails() {
        let showId = localStorage.getItem('showId');
        loadSingleShow(showId);
    }

    function loadSingleShow(id) {
        const request = $.ajax({
            url: url + '/' + id,
            method: 'GET'
        });

        request.done(function (response) {
            let show = new dataModule.createSingleShow(
                response.name,
                response.image.medium,
                response.id,
                response.summary
            );
            getCastData(show);
        });
        request.fail(function (jqXHR, textStatus) {
            alert('Request failed: ' + textStatus);
        });
    };
    // data of cast
    function getCastData(show) {
        $(document).ready(() => {
            const request = $.ajax({
                url: `${url}/${show.id}/cast`,
                method: 'GET'
            });

            request.done(function (response) {
                response.forEach(e => {
                    const actor = dataModule.createCast(e.person.name);
                    show.addCast(actor);
                });
                //ezt azert meg nezd at kerlek
                getSeasonsData(show);
            })
            request.fail(function (jqXHR, textStatus) {
                alert('Request failed: ' + textStatus);
            });
        })
    }

    function getSeasonsData(show) {
        $(document).ready(() => {
            const request = $.ajax({
                url: `${url}/${show.id}/seasons`,
                method: 'GET'
            });

            request.done(function (response){
                response.forEach(e => {
                    const seasonDate = dataModule.cerateSeason(e.premiereDate, e.endDate);
                    show.addSeason(seasonDate);
                    seasonsArray.push(seasonDate);
                });
                UIModule.showSingleShow(show)
            });

                request.fail(function (jqXHR, textStatus){
                    alert('Request failed: ' + textStatus);
                });
        })
    }

    //data for show
    function getShowData() {
        let idShow = localStorage.getItem('showId');

        $(document).ready(() => {
            const request = $.ajax({
                url: `${url}/${idShow}`,
                method: 'GET'
            });

            request.done(function (response) {
                const show = dataModule.createSingleShow(
                    response.name,
                    // response.image.medium,
                    response.id,
                    response.summary
                );
                showArray.push(show);
                castArray.forEach(function (e, i) {
                    showArray[0].addCast(e.name);
                });
                seasonsArray.forEach(function (e, i) {
                    showArray[0].addSeason(e)
                })
            });
            request.fail(function (jqXHR, textStatus) {
                alert('Request failed: ' + textStatus);
            })
        })
    }



    return {
        init,
        loadshows,
        searchShows,
        openDetails,
        loadSingleShow,
        loadDetails,
        getShowData,
        getCastData,
        getSeasonsData
    }

})(UIModule, dataModule)