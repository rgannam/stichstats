<template>
  <div>
    Grid Square Size:
    <input type="radio" v-model="gridSquareSize" value="10" />10px
    <input type="radio" v-model="gridSquareSize" value="15" />15px
    <input type="radio" v-model="gridSquareSize" value="20" />20px
    <div id="image"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { SVG } from "@svgdotjs/svg.js";

@Component({
  components: {}
})
export default class StitchGrid extends Vue {
  @Prop({ default: 15 }) gridSquareSize!: number;
  @Prop() width!: number;
  @Prop() height!: number;

  grid: any;
  pattern = [
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
  ];

  @Watch("gridSquareSize") onSizeChanged(size: number, oldSize: number) {
    this.generateGrid();
    this.fillGrid();
  }

  mounted() {
    this.generateGrid();
    this.fillGrid();
  }

  get svgDimensions() {
    return {
      width: this.width * this.gridSquareSize,
      height: this.height * this.gridSquareSize
    };
  }

  get padding() {
    return this.gridSquareSize / 5;
  }

  get symbolSize() {
    return this.gridSquareSize - this.padding * 2;
  }

  generateGrid() {
    if (this.grid) {
      this.grid.remove();
    }
    this.grid = SVG()
      .addTo("#image")
      .size(this.svgDimensions.width, this.svgDimensions.height);
    for (let i = 0; i < this.svgDimensions.width; i++) {
      let line = this.grid.line(
        i * this.gridSquareSize,
        0,
        i * this.gridSquareSize,
        this.height * this.gridSquareSize
      );
      let lineWidth = i % 10 === 0 ? this.padding : 1;
      line.stroke({ color: "#000000", width: lineWidth, linecap: "round" });
    }
    for (let i = 0; i < this.svgDimensions.height; i++) {
      let line = this.grid.line(
        0,
        i * this.gridSquareSize,
        this.width * this.gridSquareSize,
        i * this.gridSquareSize
      );
      let lineWidth = i % 10 === 0 ? this.padding : 1;
      line.stroke({ color: "#000000", width: lineWidth, linecap: "round" });
    }
  }

  fillGrid() {
    for (let i = 0; i < this.pattern.length; i++) {
      const row = this.pattern[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] > 0) {
          this.grid
            .circle(this.symbolSize)
            .fill("#000000")
            .move(
              j * this.gridSquareSize + this.padding,
              i * this.gridSquareSize + this.padding
            );
        }
      }
    }
  }
}
</script>
