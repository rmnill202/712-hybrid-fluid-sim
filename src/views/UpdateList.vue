<template>
  <div>
    <div class="center-title display-2 font-weight-thin">Updates</div>
    <div v-for="u of updates">
      <update-card :id="u.id" :title="u.title" :subtitle="u.subtitle" :content="u.content" :image="u.image" :date="u.date"
        :gradient="`to top, rgba(100,115,201,.1), ${u.color}`" :height="250" :width="460"/>
    </div>
  </div>
</template>

<script>
import UpdateCard from '../components/UpdateCard.vue';

export default {
  name: 'updates',
  components: { UpdateCard },
  data() {
    return {
      updates: this.$store.state.updates_meta
    };
  }
};
</script>