<template>
  <div class="mt-5 container" style="min-height: 71vh; text-align: left">
    <h1 class="mb-4 judul-transaksi">Incoming Transaction</h1>
    <div v-if="msg.text">
      <div class="alert alert-success" variant="success">
        {{ msg.text }}
      </div>
    </div>
    <div class="table table-striped table-dark table-hover">
      <thead>
        <tr style="color: red">
          <th>No</th>
          <th>User</th>
          <th>Transfer Proof</th>
          <th>Film</th>
          <th>Number Account</th>
          <th>Status Payment</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(trans, index) in transactions" :key="trans.id">
          <td>{{ index + 1 }}</td>
          <td>{{ trans.user.fullName }}</td>
          <td>
            <a
              :href="trans.transferProof"
              target="_blank"
              rel="noreferrer"
              style="text-decoration: none; color: white"
            >
              {{ trans.transferProof }}
            </a>
          </td>
          <td>{{ trans.film.title }}</td>
          <td>{{ trans.accountNumber }}</td>
          <td>
            <strong
              :class="
                trans.status === 'Approved'
                  ? 'status-green'
                  : trans.status === 'Pending'
                  ? 'status-orange'
                  : 'status-red'
              "
              >{{ trans.status }}</strong
            >
          </td>
          <td>
            <div v-if="trans.status === 'Approved'">
              <div>
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style="color: orange"
                ></button>
                <div
                  class="dropdown-menu bg-dark"
                  aria-labelledby="dropdownMenuButton"
                >
                  <button
                    @click="updateStatus(trans.id, 'Canceled')"
                    class="dropdown-item bg-dark text-light"
                  >
                    <strong style="color: red">Cancel</strong>
                  </button>
                </div>
              </div>
            </div>
            <div v-if="trans.status === 'Pending'">
              <div>
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style="color: orange"
                ></button>
                <div
                  class="dropdown-menu bg-dark"
                  aria-labelledby="dropdownMenuButton"
                >
                  <button
                    @click="updateStatus(trans.id, 'Approved')"
                    class="dropdown-item bg-dark text-light"
                  >
                    <strong style="color: green">Approve</strong>
                  </button>
                  <button
                    @click="updateStatus(trans.id, 'Canceled')"
                    class="dropdown-item bg-dark text-light"
                  >
                    <strong style="color: red">Cancel</strong>
                  </button>
                </div>
              </div>
            </div>
            <div v-if="trans.status === 'Canceled'">
              <div>
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style="color: orange"
                ></button>
                <div
                  class="dropdown-menu bg-dark"
                  aria-labelledby="dropdownMenuButton"
                >
                  <button
                    @click="updateStatus(trans.id, 'Approved')"
                    class="dropdown-item bg-dark text-light"
                  >
                    <strong style="color: green">Approve</strong>
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { API } from "@/config/api";

export default {
  name: "TransactionsView",
  setup() {
    const transactions = ref([]);
    const msg = ref({});

    const getTransactions = async () => {
      try {
        const resp = await API.get(`/transactions`);
        transactions.value = resp.data.data;
      } catch (err) {
        console.log(err);
      }
    };

    onMounted(() => {
      getTransactions();
    });

    const updateStatus = async (id, val) => {
      try {
        await API.patch(`/transaction/${id}`, { status: val });
        msg.value = {
          error: false,
          text: "Transaction status update successfully",
        };
        getTransactions();
      } catch (err) {
        msg.value = {
          error: true,
          text: "Something wrong with the server, please try again",
        };
      }

      setTimeout(() => {
        msg.value = { error: false, text: "" };
      }, 1500);
    };

    return {
      transactions,
      msg,
      updateStatus,
    };
  },
};
</script>

<style>
.status-green {
  color: green;
}
.status-orange {
  color: orange;
}
.status-red {
  color: red;
}
</style>
