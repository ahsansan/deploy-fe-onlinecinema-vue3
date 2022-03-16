<template>
  <div class="an-container-detail" fluid>
    <div class="container-utama-detail">
      <div class="container-detail">
        <div class="isi-detail-tumbnail">
          <img
            :src="film.tumbnail"
            alt="{{film.title}}"
            class="tumbnail-film-detail"
          />
        </div>
        <div class="isi-detail">
          <div class="detail-judul-harga">
            <h1 class="mb-4 judul-film-detail">{{ film.title }}</h1>
            <div v-if="trans?.status === 'Approved'"></div>
            <div v-else>
              <div>
                <div v-if="store.state.isLogin === true">
                  <div v-if="store.state.user.role === 'admin'">
                    <button class="button-buy-film">Edit Film</button>
                  </div>
                  <div v-else>
                    <ModalPurchaseComponent
                      :title="film.title"
                      :filmId="film.id"
                    />
                  </div>
                </div>
                <div v-else>
                  <button class="button-buy-film" @click="beforeLogin">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="trans?.status === 'Approved'">
            <iframe
              id=""
              :src="film.filmUrl"
              :title="film.title"
              frameBorder="0"
              className="youtube-class"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div v-else>
            <div @click="beforeBuy" class="overlay" />
            <iframe
              id="overlay"
              :src="film.filmUrl"
              :title="film.title"
              frameBorder="0"
              className="youtube-class"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div class="genre-price-desk">
            <h4 class="detail-genre">{{ film.category?.name }}</h4>
            <div v-if="trans?.status === 'Approved'"></div>
            <div v-else>
              <p className="detail-harga">
                {{ convertToRupiah(film.price) }}
              </p>
            </div>
            <p className="detail-desk">{{ film.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from "@/config/api";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import ModalPurchaseComponent from "@/components/ModalPurchaseComponent.vue";

export default {
  name: "DetailView",
  setup() {
    const route = useRoute();
    let film = ref({});
    let trans = ref({});
    const store = useStore();
    const router = useRouter();

    const beforeLogin = () => {
      router.push("/auth");
    };

    const beforeBuy = () => {
      Swal.fire({
        icon: "warning",
        text: "Please buy this film if you want watch",
      });
    };

    const getFilm = async () => {
      try {
        const resp = await API.get(`/film/${route.params.id}`);

        film.value = resp.data.data.film;
      } catch (err) {
        console.log(err.response);
      }
    };

    const getTransaction = async () => {
      try {
        const resp = await API.get(`/transaction/${route.params.id}`);

        trans.value = resp.data.data;
      } catch (err) {
        trans.value = {
          status: "Pending",
        };
      }
    };

    onMounted(() => {
      getFilm();
      getTransaction();
    });

    return {
      film,
      trans,
      store,
      beforeLogin,
      beforeBuy,
    };
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
  components: {
    ModalPurchaseComponent,
  },
};
</script>

<style>
.an-container-detail {
  display: flex;
  align-items: center;
  justify-content: center;
}
.container-utama-detail {
  margin-top: 3rem;
  margin-bottom: 3rem;
  min-height: 70vh;
  width: 90%;
}
.container-detail {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
}
.isi-detail-tumbnail {
  flex: 40%;
}
.isi-detail {
  flex: 60%;
}
.tumbnail-film-detail {
  border-radius: 5px;
  height: 485px;
  width: 349px;
}
.detail-judul-harga {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}
.button-buy-film {
  padding: 10px 20px;
  background-color: hsl(335, 63%, 49%);
  margin-bottom: 30px;
  border: none;
  color: white;
  border-radius: 5px;
}
.button-buy-film:hover {
  background-color: hsl(335, 82%, 28%);
}
.judul-film-detail {
  font-family: Avenir;
  font-size: 40px;
  font-weight: 700;
  color: white;
}
.genre-price-desk {
  width: 640;
  margin-top: 2rem;
}
.detail-genre {
  font-family: Avenir;
  font-weight: 800;
  font-size: 24px;
  color: #7e7e7e;
}
.detail-harga {
  font-family: Avenir;
  font-weight: 900;
  font-size: 18px;
  color: hsl(335, 63%, 49%);
}
.detail-desk {
  font-family: Avenir;
  font-weight: 400;
  font-size: 18px;
  color: white;
}
.youtube-class {
  width: 640px;
  height: 360px;
}
#overlay {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  color: #fff;
}
.overlay {
  position: absolute;
  width: 640px;
  height: 360px;
  background: #000;
  opacity: 0;
}
@media screen and (max-width: 600px) {
  .container-detail {
    flex-direction: column;
  }
  .tumbnail-film-detail {
    margin-left: 20px;
  }
  .detail-judul-harga {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 2rem;
    padding-left: 20px;
  }
  .youtube-class {
    width: 90%;
    margin-left: 20px;
  }
  .overlay {
    width: 90%;
    margin-left: 20px;
  }
  .genre-price-desk {
    width: 90%;
    margin-top: 2rem;
    padding-left: 20px;
  }
  .judul-film-detail {
    font-size: 30px;
  }
  .detail-genre {
    font-size: 17px;
  }
  .detail-harga {
    font-size: 15px;
  }
  .detail-desk {
    font-size: 15px;
  }
}
</style>
