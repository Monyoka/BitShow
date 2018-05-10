const UIModule = (function () {

    const wrapperDiv = $('.js-wrapper');
    const searchInput = $('.js-search-bar');
    const searchUnorderedList = $('.search-list');
    const wrappShowInfo = $('.append-js');
    const wrappBrand = $('.navbar-brand');

    //this will displayed 51 shows in main page
    function ShowShows(tvshow) {
        for (let i = 0; i < tvshow.limit; i++) {
            const div = $(`<div data-id-show="${tvshow.shows[i].id}" class="box col-4 wrapp-all-main" onclick="mainModule.openDetails(${tvshow.shows[i].id})"><img class="js-img" src="${tvshow.shows[i].img}" /><p class="box-title">${tvshow.shows[i].name}</p></div>`);
            wrapperDiv.append(div);

        }


    }

    function reload(loadShow) {
        const linkForLogo = $(`<div onclick="mainModule.loadshows()">BitShow</dvi>`);
        wrappBrand.append(linkForLogo);
    }

    function showSearchList(data) {
        let searchList;
        let searchInputValue = searchInput.val();
        let filter = searchInputValue.toLowerCase();

        searchUnorderedList.html('');

        data.forEach(function (e, i) {

            if (e.name.toLowerCase().includes(filter) && searchUnorderedList.find("li").length < 10) {
                //kell ide egyaltalan a toLowerCase?
                searchList = searchUnorderedList.append($(`<li class="list-item" onclick="mainModule.openDetails(${data[i].id})">${e.name}</li>`));
            }
        })
        if (searchInputValue == '') {
            searchUnorderedList.html('');
        }

        return searchList;


    }

    function showSingleShow(show) {
        let castString = '';
        let seasonString = '';
        show.seasons.forEach(function (e, i) {
            seasonString += '<li>' + e.premiereDate + ' - ' + e.endDate + '</li>'
        });
        show.cast.forEach(function (e, i) {
            castString += '<li>' + e.name + '</li>'
        });

        const ShowInfoData = $(`
        <div data-id-singleshow="${show.id}">
            <h1>${show.name}</h1>
            <div class="wrapper-top-row">
                <img src="${show.img}" alt="${show.name}" class="main-img col-6">
                <div class="seasons-and-cast">
                    <div class="seasons">
                        <h4 class="title"> Seasons (${show.seasons.length})</h4>
                            <ul>
                            ${seasonString}
                            </ul>
                    </div>
                    <div class="cast">
                        <h4 class="title">Cast</h4>
                            <ul>
                                ${castString}
                            </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrapper-bottom">
            <h4 class="title">Show details</h4>
            <div class="js-info-data"><p>${show.details}</p></div>
        </div>
        `)
        wrappShowInfo.append(ShowInfoData);
        //data-id-singleshow

    }

    return {
        ShowShows,
        showSearchList,
        showSingleShow,
        reload
    }
})();