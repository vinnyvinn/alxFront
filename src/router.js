import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/view/layout/Layout"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/view/pages/Dashboard.vue")
        },
        {
          path: "/fixed-source",
          name: "fixed-source",
          component: () => import("@/view/pages/sources/FixedSource")
        },

        {
          path: "/vuetify",
          name: "vuetify",
          component: () => import("@/view/pages/vuetify/Vuetify.vue"),
          children: [
            {
              path: "/category",
              name: "category",
              component: () => import("@/view/pages/sources/random/category/Index")
            },
            {
              path: "/anime",
              name: "anime",
              component: () => import("@/view/pages/sources/random/Anime")
            },
          ]
        },

      ]
    },
    {
      path: "/",
      component: () => import("@/view/pages/auth/Auth"),
      children: [
        {
          name: "login",
          path: "/login",
          component: () => import("@/view/pages/auth/Login")
        },
        {
          name: "register",
          path: "/register",
          component: () => import("@/view/pages/auth/Register")
        }
      ]
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/view/pages/error/Error-1.vue")
    }
  ]
});
