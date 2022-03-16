<template>
  <div>
    <button
      type="button"
      class="button-buy-film"
      data-bs-toggle="modal"
      data-bs-target="#modalPurchase"
    >
      Buy Now
    </button>

    <div
      class="modal fade"
      id="modalPurchase"
      tabindex="-1"
      aria-labelledby="modalPurchaseLabel"
      aria-hidden="true"
    >
      <div v-if="successStatus">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <h3 style="text-align: center; margin-bottom: 50px">
                Cinema
                <span style="color: #cd2e71">Online</span> : 0981312323
              </h3>
              <hr />
              <h2>
                Thank you for buying
                <span style="color: #cd2e71">{{ title }}</span
                >.
              </h2>
              <p>
                You can check your order status in
                <router-link
                  style="text-decoration: none; color: #cd2e71"
                  to="/profile"
                  >profile page</router-link
                >.
              </p>
              <button
                data-bs-dismiss="modal"
                type="button"
                class="btn btn-danger"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <h3 style="text-align: center; margin-bottom: 50px">
                Cinema
                <span style="color: #cd2e71">Online</span> : 0981312323
              </h3>
              <h3 class="mb-3">{{ title }}</h3>
              <div v-if="status.message" class="mb-1">
                <div class="alert alert-danger" variant="danger">
                  {{ status.message }}
                </div>
              </div>
              <form @submit.prevent="handleOnSubmit">
                <div>
                  <input
                    type="text"
                    id="account"
                    name="account"
                    v-model="form.account"
                    placeholder="Input your account number"
                    class="input-account-number"
                    required
                  />
                </div>
                <div v-if="preview">
                  <img
                    :src="preview"
                    alt="Preview"
                    style="width: 50%"
                    class="img-fluid rounded preview-payment"
                  />
                </div>
                <div>
                  <label
                    for="input-photo"
                    class="d-flex flex-row tombol-upload-payment mt-2"
                  >
                    <p>Attach Payment</p>
                    <img
                      src="@/assets/attachment.svg"
                      width="25"
                      height="25"
                      style="margin-left: 10px"
                    />
                  </label>
                  <input
                    type="file"
                    id="input-photo"
                    @change="previewFile"
                    name="transferProof"
                    hidden
                  />
                </div>
                <button type="submit" className="tombol-add-payment">
                  Pay
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { API } from "@/config/api";
import Swal from "sweetalert2";

export default {
  name: "ModalPurchaseComponent",
  props: {
    title: {
      type: String,
    },
    filmId: {
      type: Number,
    },
  },
  setup(props) {
    const form = reactive({
      account: "",
      transferProof: [],
    });
    const preview = ref("");
    const status = ref({});
    const successStatus = ref(false);

    const previewFile = (e) => {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      form.transferProof = files;
      preview.value = URL.createObjectURL(e.target.files[0]);
    };

    const handleOnSubmit = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "multipart/form-data",
          },
        };

        const formData = new FormData();
        formData.set(
          "transferProof",
          form.transferProof[0],
          form.transferProof[0].name
        );
        formData.set("accountNumber", form.account);

        await API.post(`/transaction/${props.filmId}`, formData, config);

        Swal.fire(
          "Great",
          "Thank you for buying this film, please wait 1x24 hours because your transaction is in process",
          "success"
        );

        form.account = "";
        form.transferProof = [];
        preview.value = "";
        successStatus.value = true;
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
      status,
      preview,
      previewFile,
      successStatus,
      handleOnSubmit,
    };
  },
};
</script>

<style>
.modal-content {
  background-color: #1f1f1f !important;
  border: 0 solid black !important;
  border-radius: 15px !important;
  padding: 20px 15px !important;
  color: white;
}
.preview-payment {
  margin-top: 20px;
  margin-bottom: 20px;
}
.tombol-upload-payment {
  background-color: #cd2e71;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
}
.tombol-upload-payment:hover {
  background-color: #940e46;
}
.tombol-upload-payment p {
  margin-top: 15px;
  font-family: Avenir;
  font-weight: 700;
}
.input-account-number {
  background-color: #d2d2d240;
  border: 2px solid #d2d2d2;
  border-radius: 5px;
  font-weight: 400;
  font-size: 17px;
  color: #b1b1b1;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.tombol-add-payment {
  width: 100%;
  border: none;
  padding-top: 10px;
  padding-bottom: 13px;
  border-radius: 13px;
  background-color: #cd2e71;
  color: white;
  font-family: Avenir;
  font-weight: 900;
  font-size: 18px;
}
.tombol-add-payment:hover {
  background-color: #940e46;
}
@media screen and (max-width: 600px) {
  .modal-content {
    border-radius: 10px !important;
    padding: 15px 10px !important;
    margin-top: 2rem;
  }
  .preview-payment {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
