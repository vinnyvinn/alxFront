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
    <div class="alert-text text-center">
      <h3>Jokes</h3> <span>A list of ten jokes that gets generated every second.</span>
    </div>
  </b-alert>
  <div class="row">
    <div class="col-md-4 mb-card" v-for="joke in jokes" :key="joke.id">
      <div class="card card-h">
        <div class="card-header bg-success">
          {{ joke.type }}
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>{{ joke.setup }}</p>
            <footer class="blockquote-footer">{{joke.punchline}}</footer>
          </blockquote>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import {mapGetters} from "vuex";
import {SET_JOKES} from "@/core/services/store/sources.module";
export default {
created() {
this.$store.dispatch(SET_JOKES);
  },
  computed:{
    ...mapGetters({jokes:"getJokes"})
  },
methods:{
getJokes(){

}
}

}
</script>

<style scoped>

</style>