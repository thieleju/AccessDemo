<template>
  <v-container>
    <v-row class="text-center">
      <v-col></v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">This is a demo</h2>

        <v-row justify="center">
          <v-col cols="12">
            <v-btn color="primary" @click="buttonClick"
              >Get Data from Access DB</v-btn
            >
          </v-col>
          <v-col cols="12">
            {{ data }}
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
      data: null,
    };
  },
  methods: {
    buttonClick() {
      this.$axios
        .get("/getData")
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          this.data = error;
          console.log(error);
        });
    },
  },
};
</script>
