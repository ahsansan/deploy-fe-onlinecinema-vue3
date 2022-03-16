<template>
  <div class="container mt-5 mb-5" style="min-height: 77vh">
    <h1 class="mb-4 ms-4 judul-my-film">My List Film</h1>
    <div v-if="myFilms.length">
      <div style="text-align: left" class="film-list-container">
        <div class="film-kolom">
          <img
            v-for="film in myFilms"
            :key="film.idFilm"
            class="my-film-list"
            @click="router.push(`/film/${film.idFilm}`)"
            :src="film.film.tumbnail"
            :alt="film.film.title"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div>
        <p class="ms-4">you don't have any collection</p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { API } from "@/config/api";

export default {
  name: "MyFilmView",
  setup() {
    const myFilms = ref([]);
    const router = useRouter();

    const getMyFilms = async () => {
      try {
        const resp = await API.get(`/my-list`);
        myFilms.value = resp.data.data;
      } catch (err) {
        console.log(err);
      }
    };

    onMounted(() => {
      getMyFilms();
    });

    return {
      myFilms,
      router,
    };
  },
};
</script>

<style>
.judul-my-film {
  font-family: Avenir;
  font-size: 30px;
  font-weight: 700;
  text-align: left;
}
.film-list-container {
  display: flex;
  flex-direction: row;
}
.film-kolom {
  flex: 1;
}
.my-film-list {
  cursor: pointer;
  margin: 10px;
  width: 200px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #fff;
}
@media screen and (max-width: 600px) {
  .film-list-container {
    flex-direction: column;
  }
  .my-film-list {
    width: 200px;
  }
}
</style>
