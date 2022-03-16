import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/film/:id",
    name: "detail",
    component: () => import("../views/DetailView.vue"),
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("../views/AuthView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/edit-profile",
    name: "editprofile",
    component: () => import("../views/EditProfileView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/my-list",
    name: "mylist",
    component: () => import("../views/MyFilmView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/add-film",
    name: "addfilm",
    component: () => import("../views/AddFilmView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/transactions",
    name: "transactions",
    component: () => import("../views/TransactionsView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && store.state.isLogin === false) next("auth");
  else next();
});

export default router;
