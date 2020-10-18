<template>
  <!-- begin:: Header Topbar -->
  <div class="topbar">
   <!--begin: User Bar -->
    <KTQuickUser></KTQuickUser>
    <!--end: User Bar -->
  </div>
  <!-- end:: Header Topbar -->
</template>

<script>

import KTQuickUser from "@/view/layout/extras/offcanvas/QuickUser.vue";

export default {
  components: {
      KTQuickUser,

  }
};
</script>
