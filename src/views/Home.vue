<template>
  <div>
    <div class="center-title display-2 font-weight-light">Hybrid Fluids with Volumetric Lighting</div>
    <div class="headline center-title font-weight-light" style="margin: 0">Latest Update: {{latest.date}}</div>
    <div class="containing-block">
      <update-card :id="latest.id" :title="latest.title" :subtitle="latest.subtitle" :content="latest.content" :image="latest.image" :date="latest.date"
          :gradient="`to top, rgba(100,115,201,.1), ${latest.color}`" :height="250" :width="460" />
    </div>
  </div>
</template>

<script>
import UpdateCard from "../components/UpdateCard.vue";

export default {
  data() {
    return {
      updates: this.$store.state.updates_meta
    };
  },
  computed: {
    latest() {
      return this.updates[this.updates.length - 1];
    }
  },
  components: {
    UpdateCard
  },
};
</script>

<style>
.containing-block {
  display: flex;
  justify-content: center;
}
</style>
