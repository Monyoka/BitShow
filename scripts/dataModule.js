const dataModule = (function () {

    //this is from API http://api.tvmaze.com/shows
    class AllTVShow {
        constructor(shows, limit) {
            this.shows = shows;
            this.limit = limit;
        }
    }

    class SingleShow {
        constructor(name, img, id, details) {
            this.name = name;
            this.img = img;
            this.id = id;
            this.details = details;
            this.seasons = [];
            this.cast = [];
        }

        //a kovetkezot ket funkciot majd probald meg atdobni a mainModule-ba
        addSeason(season) {
            this.seasons.push(season);
        }
        addCast(actor) {
            this.cast.push(actor);
        }
    }

    class Season {
        constructor(premiereDate, endDate) {
            this.premiereDate = premiereDate;
            this.endDate = endDate;
        }
    }

    class Cast {
        constructor(name) {
            this.name = name;
        }
    }

    return {
        createAllTVShow: function (allTVShows, limit) {
            return new AllTVShow(allTVShows, limit);
        },
        createSingleShow: function (name, img, id, details) {
            return new SingleShow(name, img, id, details);
        },
        cerateSeason: function (premiereDate, endDate) {
            return new Season(premiereDate, endDate);
        },
        createCast: function (name) {
            return new Cast(name)
        }
    }

})();