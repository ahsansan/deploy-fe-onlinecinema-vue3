<template>
  <div class="container-auth" data-aos="fade-left">
    <div class="container-form-auth">
      <div class="switch-button-container">
        <button
          :class="loginForm ? 'auth-button-active' : 'auth-button'"
          @click="switchLogin"
        >
          Login
        </button>
        <button
          :class="loginForm ? 'auth-button' : 'auth-button-active'"
          @click="switchRegister"
        >
          Register
        </button>
      </div>
      <div v-if="loginForm">
        <LoginComponent />
      </div>
      <div v-else>
        <RegisterComponent :toLogin="loginForm" @updateLogin="updateLogin" />
      </div>
    </div>
  </div>
</template>

<script>
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import AOS from "aos";

export default {
  name: "AuthView",
  components: {
    LoginComponent,
    RegisterComponent,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const loginForm = ref(true);

    onMounted(() => {
      if (store.state.isLogin === true) {
        router.push("/");
      }
      AOS.init();
    });

    const switchRegister = () => {
      loginForm.value = false;
    };

    const switchLogin = () => {
      loginForm.value = true;
    };

    const updateLogin = (val) => {
      loginForm.value = val;
    };

    return {
      loginForm,
      switchLogin,
      switchRegister,
      updateLogin,
    };
  },
};
</script>

<style>
.container-auth {
  min-height: 84vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.container-form-auth {
  padding: 20px;
  width: 70%;
  height: 450px;
}
.switch-button-container {
  margin-bottom: 2rem;
  width: 100%;
}
.switch-button-container button {
  margin-left: 10px;
  margin-right: 10px;
}
.auth-button {
  background-color: #fcafcf;
  border: 2px solid #cd2e71;
  padding: 10px;
  border-radius: 5px;
  font-weight: 500;
  font-size: 15px;
  color: black;
  width: 100px;
}
.auth-button-active {
  background-color: #cd2e71;
  border: 2px solid transparent;
  padding: 10px;
  border-radius: 5px;
  font-weight: 500;
  font-size: 15px;
  color: white;
  width: 100px;
}
.auth-button:hover {
  background-color: #cd2e71;
  border: 2px solid transparent;
  color: white;
}
.form-auth-input {
  margin-bottom: 20px;
  background-color: #d2d2d240;
  border: 2px solid #d2d2d2;
  border-radius: 5px;
  font-weight: 400;
  font-size: 15px;
  color: #b1b1b1;
  padding: 10px;
  width: 300px;
  box-sizing: border-box;
}
.form-auth-button {
  background-color: #cd2e71;
  padding: 10px;
  width: 300px;
  border: 0px solid black;
  border-radius: 5px;
  font-weight: 500;
  font-size: 15px;
  color: white;
  margin-bottom: 20px;
}
.form-auth-button:hover {
  background-color: #ac0c4e;
}

@media screen and (max-width: 600px) {
  .form-auth-input {
    font-size: 13px;
    padding: 5px;
    width: 90%;
  }
  .container-form-auth {
    width: 90%;
  }
  .form-auth-button {
    width: 90%;
  }
}
</style>
