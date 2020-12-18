import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Device from "@/views/Device.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/device/:id",
    name: "device",
    component: Device,
    props: (route) => {
      const id = Number.parseInt(route.params.id, 10);
      if (Number.isNaN(id)) return { id: 0 };
      return { id };
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
