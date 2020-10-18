<template>
  <div>
   <show-anime v-if="show"></show-anime>
  <v-card v-if="!show">
    <v-card-title>
      Anime
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="items"
        :options.sync="options"
        :server-items-length="numberOfPages"
        @update:page="updatePagination"
        :loading="loading"
        class="elevation-1"
    >
      <template v-slot:item.createdAt="{ item }">
        <span>{{new Date(item.createdAt).toLocaleString()}}</span>
      </template>
      <template v-slot:item.description="{ item }">
        <span>{{item.description.substring(0,35)+".."}}</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn class="mx-1 my-1"  dark color="cyan" small @click="showItem(item.createdAt)">
          <v-icon small>mdi-eye</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import datatable from "@/mixins/datatable";
import {SET_ANIMES, SET_ANIMES_POST, SHOW_ANIME, SHOW_STATE} from "@/core/services/store/sources.module";
import FieldDefs from "@/view/pages/sources/random/FieldDefs";
import ShowAnime from "@/view/pages/sources/random/ShowAnime";


export default {
  mixins:[datatable],
  data () {
    return {
      tableData:[],
      search: '',
      options: {},
      numberOfPages: 0,
      headers:FieldDefs
    }
  },
  mounted() {
    this.$store.dispatch(SET_ANIMES);
    this.getItems();
    },
  watch:{
    options: {
      handler () {
        this.getItems();
       },
      deep: true,
    },
    animes(){
      this.tableData = this.animes;
      this.getItems();
    }
  },
  computed:{
    ...mapGetters({animes:"getAnimes",show:"showState"}),
    ...mapState({
      next_url:state => state.sources.next_url,
      prev_url:state => state.sources.prev_url,
      last_url:state => state.sources.last_url,
      total_count:state => state.sources.total_count
    })
  },
  methods:{
    showItem(createdAt){
      this.$store.dispatch(SHOW_STATE,true);
      this.$store.dispatch(SHOW_ANIME,this.animes.find(a => a.createdAt == createdAt));
    },
    updatePagination (pagination) {
      let url = '';
        if (pagination > this.next_count)
          url = this.next_url;
        else
          url = this.prev_url;
       this.next_count = pagination;
      this.$store.dispatch(SET_ANIMES_POST,url)
    },
  },
  components:{
    ShowAnime
  }
}
</script>

