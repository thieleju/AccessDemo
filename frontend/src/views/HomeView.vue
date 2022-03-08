<template>
  <v-container>
    <v-row class="text-center">
      <v-col></v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">This is a demo</h2>

        <v-row justify="center">
          <v-col cols="12">
            <v-btn color="primary" @click="buttonClick"
              >Get All Documents</v-btn
            >
          </v-col>
          <v-col cols="12">
            <v-data-table
              :headers="datatable.headers"
              :items="datatable.items"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      datatable: {
        headers: [
          {
            text: "DokumentenID",
            value: "DokumentenID",
          },
          {
            text: "Titel",
            value: "Titel",
          },
          {
            text: "Dokart",
            value: "Dokart",
          },
          {
            text: "GültigFür",
            value: "GültigFür",
          },
          {
            text: "StandNeu",
            value: "StandNeu",
          },
          {
            text: "StandAlt",
            value: "StandAlt",
          },
          {
            text: "Freigabe",
            value: "Freigabe",
          },
          {
            text: "AblageOrdner",
            value: "AblageOrdner",
          },
          // {
          //   text: "SpeicherortNeu",
          //   value: "SpeicherortNeu",
          // },
          // {
          //   text: "Bemerkung",
          //   value: "Bemerkung",
          // },
          {
            text: "Dokumentenpfad",
            value: "Dokumentenpfad",
          },
          // {
          //   text: "Ordner",
          //   value: "Ordner",
          // },
          // {
          //   text: "Internetlink",
          //   value: "Internetlink",
          // },
          // {
          //   text: "jnExtern",
          //   value: "jnExtern",
          // },
        ],
        items: [],
      },
    };
  },
  methods: {
    buttonClick() {
      this.$axios
        .get("/getAllData")
        .then((response) => {
          this.datatable.items = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
