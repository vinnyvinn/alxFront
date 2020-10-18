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
        <h3 class="text-center">Category Details</h3>
      </div>
    </b-alert>
    <div class="row">
      <div class="col-md-12 mb-card">
        <div class="card card-h">
          <div class="card-header bg-success">
            {{ category.title }}
          </div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>{{ category.description }}</p>
              <footer class="blockquote-footer">{{ new Date(category.createdAt).toLocaleString()}} </footer>
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
  computed:{
    ...mapGetters({category:"getCategory"})
  },
  methods:{
    goBack(){
      this.$store.dispatch(SHOW_STATE,false);
    }
  }
}
</script>

<style scoped>

</style>