<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row">
      <div class="col-xxl-4">
        <MixedWidget1></MixedWidget1>
      </div>
      <div class="col-xxl-4">
        <ListWidget9></ListWidget9>
      </div>
      <div class="col-xxl-4">
        <StatsWidget7></StatsWidget7>
        <StatsWidget12></StatsWidget12>
      </div>
      </div>
    <!--end::Dashboard-->
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import MixedWidget1 from "@/view/content/widgets/mixed/Widget1.vue";
import ListWidget9 from "@/view/content/widgets/list/Widget9.vue";
import StatsWidget7 from "@/view/content/widgets/stats/Widget7.vue";
import StatsWidget12 from "@/view/content/widgets/stats/Widget12.vue";

export default {
  name: "dashboard",
  components: {
    MixedWidget1,
    ListWidget9,
    StatsWidget7,
    StatsWidget12
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dashboard" }]);
  },
  methods: {
    setActiveTab1(event) {
      this.tabIndex = this.setActiveTab(event);
    },
    setActiveTab2(event) {
      this.tabIndex2 = this.setActiveTab(event);
    },
    /**
     * Set current active on click
     * @param event
     */
    setActiveTab(event) {
      // get all tab links
      const tab = event.target.closest('[role="tablist"]');
      const links = tab.querySelectorAll(".nav-link");
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
      }

      // set current active tab
      event.target.classList.add("active");

      // set clicked tab index to bootstrap tab
      return parseInt(event.target.getAttribute("data-tab"));
    }
  }
};
</script>
