import ApiService from "@/core/services/api.service";


// action types
export const SET_JOKES = "setJokes";
export const SET_PREV_URL = "setPrevUrl";
export const SET_NEXT_URL = "setNextUrl";
export const SET_ANIMES = "setAnimes";
export const SHOW_ANIME = "showAnime";
export const SET_ANIMES_POST = "setAnimesPost";
export const SHOW_CATEGORY = "showCategory";
export const SHOW_STATE = "showState";

// mutation types
export const SET_JOKE = "setJoke";
export const SET_URL_PREV = "setUrlPrev";
export const SET_URL_NEXT = "setUrlNext";
export const SET_ANIME = "setAnime";
export const ANIME_SHOW = "AnimeShow";
export const SET_ANIMES_UPDATE = "setAnimeUpdate";
export const CATEGORY_SHOW = "categoryShow";
export const SET_ERROR = "setError";
export const STATE_SHOW = "stateShow";

const state = {
    errors: null,
    jokes: {},
    animes:{},
    anime:{},
    next_url:'',
    prev_url:'',
    last_url:'',
    total_count:0,
    categories:[],
    category:{},
    show:false
};

const getters = {
    getJokes(state) {
        return state.jokes;
    },
    getAnimes(state) {
        return state.animes;
    },
    getAnime(state) {
        return state.anime;
    },
    getCategories(state) {
        return state.categories;
    },
    getCategory(state) {
        return state.category;
    },
    showState(state) {
        return state.show;
    },
};

const actions = {
    [SET_JOKES](context) {
        return new Promise((resolve, reject) => {
            ApiService.get("jokes")
                .then(({ data }) => {
                    context.commit(SET_JOKE, data);
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.errors);
                    reject(response);
                });
        });
    },
    [SET_ANIMES](context) {
        return new Promise((resolve, reject) => {
            ApiService.get("anime")
                .then(({ data }) => {
                    context.commit(SET_ANIME, data);
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.errors);
                    reject(response);
                });
        });
    },
    [SET_ANIMES_POST](context,payload) {
        return new Promise((resolve, reject) => {
            ApiService.post("anime",{url:payload})
                .then(({ data }) => {
                    console.log(data.included)
                   context.commit(SET_ANIMES_UPDATE, data);
                    resolve(data.data);
                })
                .catch(({ response }) => {
                    console.log(response)
                    context.commit(SET_ERROR, response.data.errors);
                    reject(response);
                });
        });
    },
    [SET_NEXT_URL](context,payload) {
     context.commit(SET_URL_NEXT,payload);
    },
    [SET_PREV_URL](context,payload) {
      context.commit(SET_URL_PREV,payload);
    },
    [SHOW_ANIME](context,payload) {
      context.commit(ANIME_SHOW,payload);
    },
    [SHOW_CATEGORY](context,payload) {
      context.commit(CATEGORY_SHOW,payload);
    },
    [SHOW_STATE](context,payload) {
      context.commit(STATE_SHOW,payload);
    },

};

const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_JOKE](state, jokes) {
       state.jokes = jokes
    },
    [SET_URL_NEXT](state, url) {
       state.next_url = url
    },
    [SET_URL_PREV](state, url) {
       state.prev_url = url
    },
    [ANIME_SHOW](state, data) {
       state.anime = data
    },
    [CATEGORY_SHOW](state, data) {
       state.category = data
    },
    [STATE_SHOW](state, data) {
     state.show = data
    },
    [SET_ANIME](state, animes) {
        let anime_data = [];
        let anime_categories = [];
        state.next_url = animes.links.next;
        state.prev_url = animes.links.prev;
        state.last_url = animes.links.last;
        state.total_count = animes.meta.count;

        animes.data.forEach(a => {
            let category_id = [];
            a.relationships.categories.data.forEach(c =>{
                category_id.push(c.id);
            })

            a.attributes.id=a.id;
            a.attributes.category_id = category_id;
            anime_data.push(a.attributes)
           })

        animes.included.forEach(c => {
            c.attributes.id=c.id;
            anime_categories.push(c.attributes)
           })

        state.animes = anime_data;
        state.categories = anime_categories;
    },
    [SET_ANIMES_UPDATE](state, response) {
        response.data.forEach((k) => {
           if (state.animes.some(e => e.slug === k.attributes.slug)) return;

            let category_id = [];
            k.relationships.categories.data.forEach(c =>{
                category_id.push(c.id);
            })
            k.attributes.id=k.id;
            k.attributes.category_id = category_id;
            state.animes.push(k.attributes)
        })

        state.next_url = response.links.next;
        state.prev_url = response.links.prev;
        state.last_url = response.links.last;
        state.total_count = response.meta.count;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
