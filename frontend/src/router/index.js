import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import DocumentsView from "../views/DocumentsView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/documents",
    name: "documents",
    component: DocumentsView,
  },
  {
    // fallback route
    path: "*",
    redirect: "/home",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
