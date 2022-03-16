<template>
  <div class="container-header" fluid>
    <div>
      <router-link to="/"
        ><img
          class="logo-class"
          src="@/assets/OnlineCinemaIcon.png"
          alt="Online Cinema"
      /></router-link>
    </div>
    <div>
      <div v-if="store.state.isLogin === true">
        <MenuComponent />
      </div>
      <div v-else>
        <nav>
          <router-link class="link-menu-class" to="/auth">Login</router-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import MenuComponent from "./MenuComponent.vue";

export default {
  name: "HeaderComponent",
  components: {
    MenuComponent,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const handleLogout = () => {
      store.commit("LOGOUT_USER");
      router.push("/");
    };

    return {
      store,
      handleLogout,
    };
  },
};
</script>

<style>
.container-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #000;
  height: 12vh;
}
.logo-class {
  padding: 20px;
}
.link-menu-class {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #cd2e71;
  border-radius: 5px;
  color: white;
  border: none;
  text-decoration: none;
}
.link-menu-class:hover {
  background-color: #be0552;
  color: white;
}
</style>
