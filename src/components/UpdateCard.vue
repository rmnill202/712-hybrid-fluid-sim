<template>
  <div>
    <router-link :to="`updates/${id}`" style="text-decoration: none;">
      <div class="clickable-card anim-border">
        <v-card :max-width="width" style="margin: 6px 5px" >
          <v-img :src="require(`../assets/${image}`)" :max-height="height" :max-width="width" :gradient="gradient">
            <v-card-title style="color: white">{{title}}</v-card-title>
            <div style="color: white; margin: 0 16px">{{subtitle}}</div>
            <div class="title" style="position: absolute; bottom: 0; right: 0; color: white; background-color: #0000006b; padding: 2px 5px; text-align: center">{{date}}</div>
          </v-img>

          <v-card-text> {{content}}</v-card-text>
        </v-card>
      </div>
    </router-link>

  </div>
</template>

<script>

export default {
  name: 'update-card',
  data() {
    return {
      
    };
  },
  props: ['id', 'title', 'subtitle', 'content', 'image', 'date', 'gradient', 'width', 'height']
};
</script>

<style>
.clickable-card {
  filter: none;
  transition: all 0.5s;
  display: inline-block;
  position: relative;
  margin: 15px;
}
.clickable-card:hover {
  filter: contrast(140%);
}

/* For this to work, the parent element must have "position: relative" */
.anim-border::before, .anim-border::after {
  content: "";
  position: absolute;
  display: block;
  /* Our "border" is actually the background color */
  /* background-color: #1976d2; */
  /* background-color: #b3d4fc; */
  background-color: #05386b;
}

.anim-border::before {
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;

  /* Bezier curves! */
  transform: scaleY(0.95);
  transition: transform 0.4s cubic-bezier(.48,.07,.02,.95);
  transform-origin: bottom;
}
.anim-border:hover::before {
  transform: scaleY(0.0);
}

.anim-border::after {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;

  /* Bezier curves! */
  transform: scaleX(0.25);
  transition: transform 0.4s cubic-bezier(.48,.07,.02,.95);
  transform-origin: left;
}
.anim-border:hover::after {
  transform: scaleX(1.0);
}
</style>
