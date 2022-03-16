<template>
  <div class="mt-5" style="min-height: 77vh">
    <div class="profile-main-container">
      <div class="profile-container">
        <h1 class="mb-4 my-profile">My Profile</h1>
        <div class="d-flex justify-content-start align-item-center">
          <div class="d-flex flex-column justify-content-between">
            <img
              :src="profile.image"
              alt="profile-pic"
              class="image-profile"
              style="width: 180px; height: 221.79px"
            />
            <button
              class="tombol-edit-profile"
              @click="router.push('/edit-profile')"
            >
              Edit Profile
            </button>
          </div>
          <div class="d-flex flex-column ml-4 justify-content-between">
            <div>
              <h5 class="judul-title">Full Name</h5>
              <p class="isi-profile">{{ profile.fullName }}</p>
            </div>
            <div>
              <h5 class="judul-title">Email</h5>
              <p class="isi-profile">{{ profile.email }}</p>
            </div>
            <div>
              <h5 class="judul-title">Phone</h5>
              <p class="isi-profile">{{ profile.phone || "-" }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-container">
        <div v-if="trans.length">
          <h1 class="mb-4 my-profile">History Transaction</h1>
          <div
            v-for="film in trans"
            :key="film.idFilm"
            class="card"
            style="
              width: 350px;
              height: auto;
              margin-bottom: 1rem;
              background-color: #cd2e7170;
            "
          >
            <div class="card-body">
              <div class="d-flex flex-column justify-content-between">
                <b class="judul-film-order">{{ film.film.title }}</b>
                <i class="tanggal-order-film">
                  {{ getFullTime(film.createdAt) }}
                </i>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="profile-harga-film">
                    Total: {{ convertToRupiah(film.film.price) }}
                  </div>
                  <div class="alert-container">
                    <div
                      :class="
                        film.status === 'Approved'
                          ? 'profile-status-film'
                          : film.status === 'Pending'
                          ? 'profile-status-pending'
                          : 'profile-status-reject'
                      "
                    >
                      {{
                        film.status === "Approved"
                          ? "Finished"
                          : film.status === "Pending"
                          ? "Pending"
                          : "Rejected"
                      }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div>
            <h1 class="mb-4 my-profile">History Transaction</h1>
            <p>you don't have any transaction</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { API } from "@/config/api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "ProfileView",
  setup() {
    const profile = ref({});
    const trans = ref([]);
    const store = useStore();
    const router = useRouter();

    const idUser = store.state.user.id;

    const getUser = async () => {
      try {
        const resp = await API.get(`/user/${idUser}`);
        profile.value = resp.data.data.user;
      } catch (err) {
        console.log(err);
      }
    };

    const getTrans = async () => {
      try {
        const resp = await API.get(`/transaction-list`);
        trans.value = resp.data.data;
      } catch (err) {
        console.log(err);
      }
    };

    onMounted(() => {
      getUser();
      getTrans();
    });

    return {
      profile,
      trans,
      router,
    };
  },
  methods: {
    getFullTime(timeString) {
      const time = new Date(timeString);
      const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const date = time.getDate();
      const monthIndex = time.getMonth();
      const year = time.getFullYear();
      const dayIndex = time.getDay();

      const result = `${weekday[dayIndex]}, ${date} ${month[monthIndex]} ${year}`;

      return result;
    },

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
.profile-main-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  text-align: left;
  margin: 3rem;
}
.profile-container {
  margin-bottom: 3rem;
}
.my-profile {
  font-family: Avenir;
  font-size: 30px;
  font-weight: 700;
}
.image-profile {
  margin-right: 30px;
  border-radius: 5px;
}
.tombol-edit-profile {
  border-radius: 5px;
  border: none;
  background-color: #cd2e71;
  margin-top: 10px;
  width: 180px;
  padding: 10px 5px;
  color: white;
  font-family: Avenir;
  font-weight: 600;
}
.tombol-edit-profile:hover {
  background-color: #96013f;
}
.judul-title {
  color: #cd2e71;
  font-family: Avenir;
  font-size: 18px;
  font-weight: 700;
}
.isi-profile {
  color: #616161;
  font-family: Avenir;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 20px;
}
.judul-film-order {
  font-family: Avenir;
  font-weight: 900;
  font-size: 14px;
  margin-bottom: 10px;
}
.tanggal-order-film {
  font-family: Avenir;
  font-weight: 900;
  font-size: 9px;
  margin-bottom: 10px;
}
.profile-harga-film {
  font-family: Avenir;
  font-weight: 900;
  font-size: 10px;
  color: #fc589c;
}
.profile-status-film {
  font-size: 10px;
  font-weight: 500;
  background-color: #beffd0;
  padding: 3px 20px;
  border-radius: 5px;
  color: rgb(34, 121, 0);
}
.profile-status-pending {
  font-size: 10px;
  font-weight: 500;
  background-color: rgb(255, 254, 218);
  padding: 3px 20px;
  border-radius: 5px;
  color: rgb(109, 109, 0);
}
.profile-status-reject {
  font-size: 10px;
  font-weight: 500;
  background-color: rgb(255, 202, 202);
  padding: 3px 20px;
  border-radius: 5px;
  color: rgb(133, 0, 0);
}

@media screen and (max-width: 600px) {
  .profile-main-container {
    flex-direction: column;
    margin: 30px;
  }
  .my-profile {
    font-size: 25px;
  }
}
</style>
