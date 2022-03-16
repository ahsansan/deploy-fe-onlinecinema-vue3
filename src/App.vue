<template>
  <div>
    <HeaderComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { API, setAuthToken } from "@/config/api";
import { useStore } from "vuex";
import { onMounted } from "vue";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default {
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  setup() {
    const store = useStore();

    onMounted(async () => {
      try {
        const response = await API.get("/check-auth");

        if (response.status === 404) {
          store.commit("LOGOUT_USER");
        }

        let payload = response.data.data.user;
        payload.token = localStorage.token;

        store.commit("LOGIN_USER", payload);
      } catch (error) {
        console.log(error);
      }
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: rgb(36, 35, 35);
  color: white;
}

nav {
  padding: 30px;
}
</style>
