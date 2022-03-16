<template>
  <div
    class="mt-5 mb-5 container d-flex justify-content-center align-items-center"
  >
    <div class="container-form-edit-profile">
      <h1 class="mb-4 judul-add-film">Edit Profile</h1>
      <div v-if="status.message">
        <div class="alert alert-danger" variant="danger">
          {{ status.message }}
        </div>
      </div>
      <form @submit.prevent="handleOnSubmit">
        <div v-if="preview">
          <img
            :src="preview"
            alt="Preview"
            class="img-fluid rounded"
            style="width: 30%"
          />
        </div>
        <div v-else>
          <img
            :src="prevImage"
            alt="PrevImage"
            class="img-fluid rounded"
            style="width: 30%"
          />
        </div>
        <div>
          <label for="input-photo" class="tombol-add-pp">
            <p>Upload Profile Pitcure</p>
          </label>
          <input
            type="file"
            id="input-photo"
            @change="previewFile"
            name="image"
            hidden
          />
        </div>
        <div>
          <input
            type="text"
            name="fullName"
            id="fullName"
            v-model="form.fullName"
            class="normal-input-profile"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            type="text"
            name="email"
            id="email"
            v-model="form.email"
            class="normal-input-profile"
            placeholder="email"
          />
        </div>
        <div>
          <input
            type="text"
            name="phone"
            id="phone"
            v-model="form.phone"
            placeholder="Phone"
            class="normal-input-profile"
          />
        </div>
        <div style="text-align: right">
          <button type="submit" class="btn-save-profile">Save Profile</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { reactive, ref, onMounted } from "vue";
import { API } from "@/config/api";
import Swal from "sweetalert2";

export default {
  name: "EditProfileView",
  setup() {
    const router = useRouter();
    const store = useStore();
    const form = reactive({
      image: [],
      fullName: "",
      phone: "",
      email: "",
    });
    const prevImage = ref("");
    const preview = ref("");
    const status = ref({});

    const previewFile = (e) => {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      form.image = files;
      preview.value = URL.createObjectURL(e.target.files[0]);
    };

    onMounted(async () => {
      try {
        const response = await API.get(`user/${store.state.user.id}`);
        const user = response.data.data.user;

        (form.fullName = user.fullName),
          (form.email = user.email),
          (form.phone = user.phone),
          (prevImage.value = user.image);
      } catch (error) {
        console.log(error);
      }
    });

    const handleOnSubmit = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "multipart/form-data",
          },
        };

        const formData = new FormData();
        formData.set("image", form.image[0], form.image[0].name);
        formData.set("fullName", form.fullName);
        formData.set("email", form.email);
        formData.set("phone", form.phone);

        await API.patch(`/user/${store.state.user.id}`, formData, config);

        const response = await API.get("/check-auth");

        Swal.fire("Good job!", "Update Success", "success");

        let payload = response.data.data.user;
        payload.token = localStorage.token;

        store.commit("LOGIN_USER", payload);

        router.push("/profile");
      } catch (error) {
        console.log(error);
        status.value = {
          message:
            "Something went wrong with the server, please try again later",
          error: true,
        };
      }
    };

    return {
      form,
      prevImage,
      preview,
      previewFile,
      status,
      handleOnSubmit,
    };
  },
};
</script>

<style>
.container-form-edit-profile {
  width: 500px;
  text-align: left;
}
.tombol-add-pp {
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: #cd2e71;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  width: 230px;
  font-family: Avenir;
  font-weight: 600;
  text-align: center;
  padding-top: 15px;
}
.tombol-add-pp:hover {
  background-color: #92043f;
}
.normal-input-profile {
  background-color: #d2d2d240;
  border: 2px solid #d2d2d2;
  border-radius: 5px;
  font-weight: 400;
  font-size: 17px;
  color: #b1b1b1;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.btn-save-profile {
  width: 230px;
  height: 55px;
  background-color: #cd2e71;
  color: white;
  border: none;
  border-radius: 5px;
  margin-bottom: 50px;
  font-family: Avenir;
  font-weight: 900;
}
.btn-save-profile:hover {
  background-color: #92043f;
}
@media screen and (max-width: 600px) {
  .container-form-edit-profile {
    width: 90%;
    text-align: left;
  }
  .tombol-add-pp {
    width: 200px;
    font-family: Avenir;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
  }
  .normal-input-profile {
    font-size: 15px;
    padding: 10px;
  }
  .btn-save-profile {
    width: 200px;
    font-family: Avenir;
    font-weight: 900;
    font-size: 15px;
  }
}
</style>
