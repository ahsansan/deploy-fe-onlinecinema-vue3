<template>
  <div>
    <div v-if="validation.message" class="text-danger mb-1">
      <div class="alert alert-danger" role="alert">
        {{ validation.message }}
      </div>
    </div>
    <h2>Login</h2>
    <form @submit.prevent="handleOnSubmit">
      <div>
        <input
          className="form-auth-input"
          type="email"
          name="email"
          v-model="form.email"
          id="email"
          placeholder="Email"
        />
      </div>
      <div>
        <input
          className="form-auth-input"
          type="password"
          name="password"
          v-model="form.password"
          id="password"
          placeholder="Password"
        />
      </div>
      <button type="submit" className="form-auth-button">Login</button>
    </form>
  </div>
</template>

<script>
import { API, setAuthToken } from "@/config/api";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "LoginComponent",
  setup() {
    const form = reactive({
      email: "",
      password: "",
    });

    const validation = ref([]);

    const router = useRouter();
    const store = useStore();

    const handleOnSubmit = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const body = JSON.stringify(form);

        const response = await API.post("/login", body, config);

        setAuthToken(response.data.data.user.token);

        setTimeout(() => {
          store.commit("LOGIN_USER", response.data.data.user);

          router.push("/");
        }, 1000);
      } catch (error) {
        validation.value = error.response.data;
        console.log(error);
      }
    };

    return {
      form,
      validation,
      router,
      handleOnSubmit,
    };
  },
};
</script>

<style></style>
