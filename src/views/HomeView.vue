<template>
  <div class="container-home" fluid>
    <div class="container-utama" v-if="films.length">
      <div>
        <div
          class="highlight-film"
          v-bind:style="{
            'background-image': 'url(' + films[randIndex].tumbnail + ')',
            'background-repeat': 'no-repeat',
            'background-size': 'cover',
          }"
        >
          <div class="detail-highlight">
            <h1 class="judul-film-highlight">{{ films[randIndex].title }}</h1>
            <div class="mt-3">
              <p class="kategori-film-highlight">
                {{ films[randIndex].category.name }}
              </p>
            </div>
            <div class="harga-film-highlight">
              {{ convertToRupiah(films[randIndex].price) }}
            </div>
            <p class="deskripsi-film-highlight">
              {{ films[randIndex].description }}
            </p>
            <button
              class="button-buy-highlight"
              @click="
                $router.push({
                  name: 'detail',
                  params: { id: films[randIndex].id },
                })
              "
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Film Kosong</p>
    </div>
    <div>
      <h2
        style="
          color: white;
          padding-left: 5%;
          margin-top: 50px;
          margin-bottom: 50px;
        "
      >
        List Film
      </h2>
      <div class="container-list-film row">
        <div
          class="list-films col-md-2 mb-2"
          v-for="film in films"
          :key="film.id"
        >
          <router-link :to="{ name: 'detail', params: { id: film.id } }">
            <img :src="film.tumbnail" :alt="film.title" class="img-film" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from "@/config/api";
import { onMounted, ref } from "vue";

export default {
  name: "HomeView",
  setup() {
    let films = ref([]);

    const getFilms = async () => {
      try {
        const resp = await API.get("/films");

        films.value = resp.data.data.film;
      } catch (err) {
        console.log(err.response);
      }
    };

    onMounted(() => {
      getFilms();
    });

    return {
      films,
    };
  },
  computed: {
    randIndex() {
      return Math.floor(Math.random() * this.films.length);
    },
  },
  methods: {
    convertToRupiah(angka) {
      let rupiah = "";
      if (angka) {
        const angkarev = angka.toString().split("").reverse().join("");
        for (var i = 0; i < angkarev.length; i++) {
          if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + ".";
        }
      }

      return (
        "Rp. " +
        rupiah
          .split("", rupiah.length - 1)
          .reverse()
          .join("")
      );
    },
  },
};
</script>

<style>
.container-home {
  padding-bottom: 50px;
  min-height: 88vh;
  text-align: left;
}
.container-list-film {
  max-width: 90%;
  margin-left: 50px !important;
  margin-top: 25px;
  display: flex;
  flex-direction: row;
}
.list-films {
  flex: 1;
}
.img-film {
  width: 180px;
  height: 250px;
  border-radius: 5px;
}
.container-utama {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
}
.detail-highlight {
  margin-top: 10px;
}
.highlight-film {
  width: 1081px;
  height: 437px;
  padding: 40px 80px;
  background: linear-gradient(90deg, #121212 0%, rgba(18, 18, 18, 0) 47.02%);
  border-radius: 5px;
}
.button-buy-highlight {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #cd2e71;
  border-radius: 5px;
  color: white;
  border: none;
}
.button-buy-highlight:hover {
  background-color: #be0552;
}
.judul-film-highlight {
  font-family: Avenir;
  font-size: 48px;
  font-weight: 900;
  color: #a52620;
  text-shadow: 1px 1px #fff;
}
.deskripsi-film-highlight {
  font-family: Avenir;
  font-size: 14px;
  font-weight: 400;
  text-shadow: 1px 1px #000;
}
.harga-film-highlight {
  color: #cd2e71;
  font-family: Avenir;
  font-size: 18px;
  font-weight: 800;
  text-shadow: 1px 1px #fff;
}
.kategori-film-highlight {
  color: black;
  font-family: Avenir;
  font-size: 18px;
  font-weight: 900;
  text-shadow: 1px 1px #fff;
}

@media screen and (max-width: 600px) {
  .container-list-film {
    width: 100%;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .list-films {
    flex: 1;
    width: 50%;
    padding-bottom: 10px;
  }
  .img-film {
    width: 80%;
    height: 100%;
  }
  .highlight-film {
    width: 400px;
    height: 300px;
    padding: 10px 20px;
    background: linear-gradient(90deg, #121212 0%, rgba(18, 18, 18, 0) 47.02%);
    border-radius: 5px;
  }
  .judul-film-highlight {
    font-family: Avenir;
    font-size: 28px;
    font-weight: 900;
    color: #a52620;
  }
  .deskripsi-film-highlight {
    display: none;
  }
}
</style>
