<template>
  <div class="dropdown container-menu">
    <div v-if="store.state.user.role === 'admin'">
      <div>
        <button
          class="btn btn-dark dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            :src="store.state.user.image"
            alt="Profile"
            height="40"
            width="40"
            style="border-radius: 50%; border: 2px solid #cd2e71"
          />
        </button>
        <div class="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton">
          <button
            @click="router.push('/add-film')"
            class="dropdown-item bg-dark text-light"
          >
            <img src="@/assets/addfilm.png" className="icon-plus" />
            <strong>Add Film</strong>
          </button>
          <button
            @click="router.push('/transactions')"
            class="dropdown-item bg-dark text-light"
          >
            <img src="@/assets/transaction.svg" className="icon-plus" />
            <strong>Transactions</strong>
          </button>
          <div class="dropdown-divider" style="background-color: white"></div>
          <button
            @click="handleLogout"
            class="dropdown-item bg-dark text-light"
          >
            <img src="@/assets/logout.svg" className="icon-plus" />
            <strong>Logout</strong>
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <div>
        <button
          class="btn btn-dark dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            :src="store.state.user.image"
            alt="Profile"
            height="40"
            width="40"
            style="border-radius: 50%; border: 2px solid #cd2e71"
          />
        </button>
        <div class="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton">
          <button
            @click="router.push('/profile')"
            class="dropdown-item bg-dark text-light"
          >
            <img src="@/assets/user.svg" className="icon-plus" />
            <strong>Profile</strong>
          </button>
          <button
            @click="router.push('/my-list')"
            class="dropdown-item bg-dark text-light"
          >
            <img src="@/assets/clapperboard.svg" className="icon-plus" />
            <strong>My List Film</strong>
          </button>
          <div class="dropdown-divider" style="background-color: white"></div>
          <button
            @click="handleLogout"
            class="dropdown-item bg-dark text-light"
          >
            <img src="@/assets/logout.svg" className="icon-plus" />
            <strong>Logout</strong>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "MenuComponent",
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
      router,
    };
  },
};
</script>

<style>
.container-menu {
  margin-top: 15px;
  margin-right: 25px;
}
.icon-plus {
  height: 25px;
  margin-right: 10px;
}
</style>
