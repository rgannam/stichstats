<template>
  <div class="font-pattern-generator">
    <StitchGrid :width="56" :height="43" />
  </div>
</template>

<script>
// @ is an alias to /src
import StitchGrid from "@/components/StitchGrid.vue";

export default {
  name: "font-pattern-generator",
  components: {
    StitchGrid
  }
};
</script>
