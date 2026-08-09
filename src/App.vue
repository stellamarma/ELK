<script setup>
import NavBar from './components/NavBar.vue'
import HeroBanner from './components/HeroBanner.vue'
import PhotoViewer from './components/PhotoViewer.vue'
import PhotoContact from './components/PhotoContact.vue'
import CommentSection from './components/CommentSection.vue';
import VideoSection from './components/VideoSection.vue';
</script>

<template>
  <NavBar />
  <div class="app-layout">
    <HeroBanner /> <!-- Το Banner μπαίνει πρώτο -->
    <PhotoViewer />
    <PhotoContact />
    <VideoSection />
    <CommentSection/>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
  scroll-padding-top: 70px;
}

html, body {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  overflow-x: hidden;
  background-color: #faf8f5; /* Απαλό φόντο περγαμηνής */
}

#app {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  display: block !important;
}

.app-layout {
  width: 100%;
}
</style>