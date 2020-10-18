<template>
  <div>
    <b-alert
        show
        variant="light"
        class="alert alert-custom alert-white alert-shadow fade show gutter-b"
    >
      <div class="alert-icon">
        <span class="svg-icon svg-icon-lg">
          <inline-svg src="media/svg/icons/Tools/Compass.svg" />
        </span>
      </div>
      <div class="alert-text">
        <h3 class="text-center">Anime Details</h3>
      </div>
    </b-alert>
    <div class="row">
      <div class="col-md-12 mb-card">
        <div class="card card-h">
          <div class="card-header bg-success">
            {{ anime.canonicalTitle }}
          </div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>{{ anime.description }}</p>
              <footer class="blockquote-footer">{{ anime.ageRatingGuide +" ( "+new Date(anime.createdAt).toLocaleString()+")"}} </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>

    <b-alert
        show
        variant="light"
        class="alert alert-custom alert-white alert-shadow fade show gutter-b"
    >
      <div class="alert-icon">
        <span class="svg-icon svg-icon-lg">
          <inline-svg src="media/svg/icons/Tools/Compass.svg" />
        </span>
      </div>
      <div class="alert-text">
        <h3 class="text-center">Anime Categories</h3>
      </div>
    </b-alert>
    <div class="row">
      <div class="col-md-6 mb-card" v-for="category in all_categories" :key="category.id">
        <div class="card card-h">
          <div class="card-header bg-success">
            {{ category.title }}
          </div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>{{ category.description}}</p>
              <footer class="blockquote-footer">{{new Date(category.createdAt).toLocaleString()}} </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
    <div class="row ml-btn">
      <v-btn class="mx-2" dark large color="warning"  @click="goBack()">
        <v-icon dark>
          mdi-chevron-double-left
        </v-icon>
        <span>Back</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {SHOW_STATE} from "@/core/services/store/sources.module";

export default {
  data(){
    return {
      all_categories:[]
    }
  },
  mounted() {
    this.allCategories();
    },
  computed:{
   ...mapGetters({anime:"getAnime",categories:"getCategories"})
 },
methods:{
  goBack(){
   this.$store.dispatch(SHOW_STATE,false);
  },
  allCategories(){
    this.categories.forEach(c => {
      for (let i=0;i<this.anime.category_id.length;i++){
        if (this.anime.category_id[i] == c.id){
          this.all_categories.push(c);
        }
      }
    })
  }
}
}
</script>

<style scoped>

</style>