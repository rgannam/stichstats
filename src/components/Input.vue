<template>
  <div>
    Pattern Name: <input v-model="patternName" /> Pattern Designer:
    <input v-model="patternDesigner" />
    <button v-on:click="submitPattern">Submit to DB</button>
    {{ patternDocument }}

    {{ patterns }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import firebase, { firestore } from "firebase/app";
import { db } from "../firebase/setup";
import { firestorePlugin } from "vuefire/dist/packages/vuefire/src";

Component.registerHooks(["firestore"]);
@Component({
  components: {}
})
export default class Input extends Vue {
  @Prop({ default: "name" }) patternName!: string;
  @Prop({ default: "designer" }) patternDesigner!: string;
  @Prop() patterns!: firestore.CollectionReference<firestore.DocumentData>;

  firestore() {
    return {
      patterns: db.collection("patterns")
    };
  }

  get patternDocument() {
    return {
      name: this.patternName,
      designer: this.patternDesigner
    };
  }

  submitPattern() {
    db.collection("patterns").add(this.patternDocument);
  }
}
</script>
