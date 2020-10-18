<template>
  <div>
    <template  v-if="show">
      <show-category></show-category>
    </template>

    <template v-else>
      <v-card>
      <v-card-title>
        Categories
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
          :headers="headers"
          :items="categories"
          sort-by="id"
          :loading="loading"
          :search="search"
          class="elevation-1"
           >
        <template v-slot:item.createdAt="{ item }">
          <span>{{new Date(item.createdAt).toLocaleString()}}</span>
        </template>
        <template v-slot:item.description="{ item }">
          <span>{{ formatCategory(item.description)}}</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn class="mx-1 my-1"  dark color="cyan" small @click="showItem(item.createdAt)">
            <v-icon small>mdi-eye</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    </template>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {SET_ANIMES, SHOW_CATEGORY, SHOW_STATE} from "@/core/services/store/sources.module";

import ShowCategory from "@/view/pages/sources/random/category/ShowCategory";
import FieldDefs from "@/view/pages/sources/random/category/FieldDefs";

export default {
  data () {
    return {
      search: '',
      loading:false,
      headers:FieldDefs
    }
  },
  mounted() {
    this.$store.dispatch(SET_ANIMES);
  },
  watch:{
    categories(){
      this.loading = false;
      return this.categories;
    }
  },
  computed:{
    ...mapGetters({categories:"getCategories",show:"showState"})
  },
  methods:{
    showItem(createdAt){
      this.$store.dispatch(SHOW_STATE,true);
      this.$store.dispatch(SHOW_CATEGORY,this.categories.find(a => a.createdAt == createdAt));
    },
    formatCategory(desc){
      if (desc){
        return desc.substring(0,35)+"..";
      }
    }

  },
  components:{
    ShowCategory
  }
}
</script>

