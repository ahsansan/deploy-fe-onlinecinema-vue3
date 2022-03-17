<template>
  <div class="mt-5 container" data-aos="fade-up">
    <h1 class="mb-4 judul-add-film">Add Film</h1>
    <div v-if="status.message">
      <div class="alert alert-danger" variant="danger">
        {{ status.message }}
      </div>
    </div>
    <form @submit.prevent="handleOnSubmit">
      <div class="d-flex align-items-center">
        <div class="d-flex flex-grow-1 mr-3 flex-column">
          <input
            type="text"
            name="title"
            id="title"
            v-model="form.title"
            class="title-input-addfilm"
            placeholder="Title"
          />
        </div>
        <div>
          <label htmlFor="tumbnail" class="d-flex flex-row tombol-tumbnail">
            <p style="margin-top: 15px">Attach Tumbnail</p>
            <img
              src="@/assets/Frame1.svg"
              style="margin-left: 5px; width: 25px; height: 25px"
            />
          </label>
          <input
            type="file"
            id="tumbnail"
            @change="previewFile"
            name="tumbnail"
            hidden
          />
        </div>
      </div>
      <div class="preview-film">
        <div v-if="preview">
          <img
            :src="preview"
            alt="Preview"
            class="img-fluid rounded"
            style="width: 20%"
          />
        </div>
        <div v-else>
          <img
            :src="defTumb"
            alt="defTumb"
            class="img-fluid rounded"
            style="width: 20%"
          />
        </div>
      </div>
      <div>
        <select
          id="select"
          as="select"
          name="idCategory"
          class="normal-input-addfilm"
          v-model="form.idCategory"
        >
          <option disabled>- Select Category</option>
          <option v-for="item in categories" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div>
        <input
          type="text"
          name="price"
          id="price"
          v-model="form.price"
          class="normal-input-addfilm"
          placeholder="Price"
        />
      </div>
      <div>
        <input
          type="text"
          name="filmUrl"
          id="filmUrl"
          v-model="form.filmUrl"
          class="normal-input-addfilm"
          placeholder="URL Film"
        />
      </div>
      <div>
        <textarea
          name="description"
          id="description"
          class="normal-textarea-addfilm"
          v-model="form.description"
          placeholder="Description"
        ></textarea>
      </div>
      <div class="d-flex flex-row-reverse">
        <button class="btn-add-film" type="submit">Add Film</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, reactive, onMounted } from "vue";
import { API } from "@/config/api";
import Swal from "sweetalert2";
import AOS from "aos";

export default {
  name: "AddFilmView",
  setup() {
    const router = useRouter();
    const form = reactive({
      title: "",
      tumbnail: [],
      price: "",
      description: "",
      filmUrl: "",
      idCategory: "- Select Category",
    });
    const categories = ref([]);
    const status = ref({});
    const preview = ref("");
    const defTumb =
      "https://res.cloudinary.com/kejepangan/image/upload/v1646118001/OnlineCinemaAhsan/prevtumb_n9aucl.png";

    parseInt(`${form.idCategory}`);

    const previewFile = (e) => {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      form.tumbnail = files;
      preview.value = URL.createObjectURL(e.target.files[0]);
    };

    const getCategories = async () => {
      try {
        const resp = await API.get(`/categories`);
        categories.value = resp.data.data;
      } catch (err) {
        console.log(err);
      }
    };

    onMounted(() => {
      getCategories();
      AOS.init();
    });

    const handleOnSubmit = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "multipart/form-data",
          },
        };

        const formData = new FormData();
        formData.set("title", form.title);
        formData.set("tumbnail", form.tumbnail[0], form.tumbnail[0].name);
        formData.set("price", form.price);
        formData.set("description", form.description);
        formData.set("filmUrl", form.filmUrl);
        formData.set("idCategory", form.idCategory);

        const resp = await API.post("/film", formData, config);

        Swal.fire("Good job!", "Add film success", "success");

        setTimeout(() => {
          router.push(`/film/${resp.data.data.id}`);
        }, 1500);
      } catch (err) {
        console.log(err);
        status.value = {
          message:
            "Something went wrong with the server, please try again later",
          error: true,
        };
      }
    };

    return {
      form,
      categories,
      status,
      preview,
      previewFile,
      defTumb,
      handleOnSubmit,
    };
  },
};
</script>

<style>
.judul-add-film {
  font-family: Avenir;
  font-size: 36px;
  font-weight: 800;
}
.title-input-addfilm {
  background-color: #d2d2d240;
  border: 2px solid #d2d2d2;
  border-radius: 5px;
  font-weight: 400;
  font-size: 17px;
  color: #b1b1b1;
  padding: 10px;
  width: 98%;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.preview-film {
  text-align: left;
  margin-top: 10px;
  margin-bottom: 20px;
}
.normal-input-addfilm {
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
.normal-textarea-addfilm {
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
  resize: none;
  height: 200px;
}
.btn-add-film {
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
.btn-add-film:hover {
  background-color: #92043f;
}
.tombol-tumbnail {
  background-color: #d2d2d240;
  border: 2px solid #d2d2d2;
  border-radius: 5px;
  font-weight: 400;
  font-size: 17px;
  color: #b1b1b1;
  padding: 1px 10px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}
</style>
