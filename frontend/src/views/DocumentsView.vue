<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="12" sm="2"></v-col>

      <v-col cols="12" sm="8">
        <h2 class="headline font-weight-bold mb-3 text-center">
          Search by Title
        </h2>

        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="search"
              label="Titel"
              value="Personalbogen"
              @input="searchForDocument(search)"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-col></v-col>
        <v-col></v-col>
        <v-col></v-col>

        <v-row justify="center">
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="form.Dokart"
              :readonly="!editmode"
              label="Dokart"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="form.GültigFür"
              :readonly="!editmode"
              label="GültigFür"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="form.Titel"
              :readonly="!editmode"
              label="Titel"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="form.StandNeu"
              :readonly="!editmode"
              label="StandNeu"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="form.StandAlt"
              :readonly="!editmode"
              label="StandAlt"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="form.Freigabe"
              :readonly="!editmode"
              label="Freigabe"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="form.AblageOrdner"
              :readonly="!editmode"
              label="AblageOrdner"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="form.SpeicherortNeu"
              :readonly="!editmode"
              label="SpeicherortNeu"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="form.Dokumentenpfad"
              :readonly="!editmode"
              label="Dokumentenpfad"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="form.Bemerkung"
              :readonly="!editmode"
              label="Bemerkung"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="form.Ordner"
              :readonly="!editmode"
              label="Ordner"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="form.Internetlink"
              :readonly="!editmode"
              label="Internetlink"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="form.jnExtern"
              :readonly="!editmode"
              label="jnExtern"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn color="primary" @click="editmode = !editmode"
              >Edit mode is: {{ editmode ? "On" : "Off" }}</v-btn
            >
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-btn v-if="editmode" color="primary" @click="saveDocument"
              >Save document</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="2"></v-col>
    </v-row>
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      document: null,
      search: "Personalbogen",
      editmode: false,
      snackbar: false,
      snackbarText: "",
      form: {
        Dokart: "",
        GültigFür: "",
        Titel: "",
        StandNeu: "",
        StandAlt: "",
        Freigabe: "",
        AblageOrdner: "",
        SpeicherortNeu: "",
        Bemerkung: "",
        Dokumentenpfad: "",
        Ordner: "",
        Internetlink: "",
        jnExtern: "",
      },
    };
  },
  created() {
    this.searchForDocument("Personalbogen");
  },
  methods: {
    searchForDocument(param) {
      this.editmode = false;

      if (!param) param = "empty";

      this.$axios
        .get("/getDocumentByTitle/" + param)
        .then((response) => {
          if (!response.data.data.length) {
            this.document = "No document found with title: " + param;
            this.form = {};
            return;
          }

          let data = response.data.data[0];
          this.document = data;

          this.form = {
            Dokart: data.Dokart,
            GültigFür: data.GültigFür,
            Titel: data.Titel,
            StandNeu: new Date(data.StandNeu).toLocaleDateString(),
            StandAlt: new Date(data.StandAlt).toLocaleDateString(),
            Freigabe: data.Freigabe,
            AblageOrdner: data.AblageOrdner,
            SpeicherortNeu: data.SpeicherortNeu,
            Bemerkung: data.Bemerkung,
            Dokumentenpfad: data.Dokumentenpfad,
            Ordner: data.Ordner,
            Internetlink: data.Internetlink,
            jnExtern: data.jnExtern,
          };
        })
        .catch((error) => {
          this.document = error;
          console.log(error);
        });
    },
    saveDocument() {
      let dokumentenID = this.document.DokumentenID;

      this.$axios
        .post("/saveDocument/" + dokumentenID, this.form)
        .then((response) => {
          console.log(response.data);
          this.snackbarText = "Document saved";
        })
        .catch((error) => {
          if (error.response.data)
            this.snackbarText = error.response.data.error.process.message;
          else this.snackbarText = "Something went wrong!";

          console.log(error);
        })
        .finally(() => {
          this.editmode = false;
          this.snackbar = true;
        });
    },
  },
};
</script>

<style></style>
