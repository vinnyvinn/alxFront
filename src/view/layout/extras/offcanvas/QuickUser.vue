<template>
  <div class="topbar-item">
    <div
      class="btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
      id="kt_quick_user_toggle"
    >
      <span
        class="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1"
      >
        Hi,
      </span>
      <span
        class="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3"
      >
        {{ first_name }}
      </span>
      <span class="symbol symbol-35 symbol-light-success">
        <img v-if="false" alt="Pic" :src="picture" />
        <span v-if="true" class="symbol-label font-size-h5 font-weight-bold">
          {{initial}}
        </span>
      </span>
    </div>

    <div
      id="kt_quick_user"
      ref="kt_quick_user"
      class="offcanvas offcanvas-right p-10"
    >
      <!--begin::Header-->
      <div
        class="offcanvas-header d-flex align-items-center justify-content-between pb-5"
      >
        <h3 class="font-weight-bold m-0">
          User Profile
        </h3>
        <a
          href="#"
          class="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_user_close"
        >
          <i class="ki ki-close icon-xs text-muted"></i>
        </a>
      </div>
      <!--end::Header-->

      <!--begin::Content-->
      <perfect-scrollbar
        class="offcanvas-content pr-5 mr-n5 scroll"
        style="max-height: 90vh; position: relative;"
      >
        <!--begin::Header-->
        <div class="d-flex align-items-center mt-5">
          <div class="symbol symbol-100 mr-5">
            <img class="symbol-label" :src="picture" alt="" />
            <i class="symbol-badge bg-success"></i>
          </div>
          <div class="d-flex flex-column">
            <a
              href="#"
              class="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
            >
              {{user.name }}
            </a>
            <div class="text-muted mt-1">Application Developer</div>
            <div class="navi mt-2">
              <a href="#" class="navi-item">
                <span class="navi-link p-0 pb-2">
                  <span class="navi-icon mr-1">
                    <span class="svg-icon svg-icon-lg svg-icon-primary">
                      <!--begin::Svg Icon-->
                      <inline-svg
                        src="media/svg/icons/Communication/Mail-notification.svg"
                      />
                      <!--end::Svg Icon-->
                    </span>
                  </span>
                  <span class="navi-text text-muted text-hover-primary">
                    {{user.email}}
                  </span>
                </span>
              </a>
            </div>
            <button class="btn btn-light-primary btn-bold" @click="onLogout">
              Sign out
            </button>
          </div>
        </div>
        <!--end::Header-->
        <div class="separator separator-dashed mt-8 mb-5"></div>
        <div class="separator separator-dashed my-7"></div>
        <!--begin::Notifications-->
        <div>

        </div>
        <!--end::Notifications-->
      </perfect-scrollbar>
      <!--end::Content-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
#kt_quick_user {
  overflow: hidden;
}
</style>

<script>
import { LOGOUT } from "@/core/services/store/auth.module";
import KTLayoutQuickUser from "@/assets/js/layout/extended/quick-user.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";
import {mapGetters} from "vuex";

export default {
  name: "KTQuickUser",
  data() {
    return {
      initial:'',
      first_name:''
    };
  },
  mounted() {
    // Init Quick User Panel
    this.getInitial();
    KTLayoutQuickUser.init(this.$refs["kt_quick_user"]);
  },

  methods: {
    getInitial(){
      if (this.user.name !=undefined){
        this.initial = this.user.name.split("")[0]
        this.first_name = this.user.name.split(" ")[0];
      }
    },

    onLogout() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ name: "login" }));
    },
    closeOffcanvas() {
      new KTOffcanvas(KTLayoutQuickUser.getElement()).hide();
    }
  },
  watch:{
  user(){
    return this.getInitial();
  }
  },
  computed: {
    ...mapGetters({user:'currentUser'}),
    picture() {
      return process.env.BASE_URL + "media/users/100_9.jpg";
    }
  }
};
</script>
