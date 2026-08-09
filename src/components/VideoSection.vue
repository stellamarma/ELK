<script setup>
import { ref } from 'vue'

// Σχετικό path για το αρχείο που βρίσκεται μέσα στο public/
const videoPath = ref('/TransferNow/0-02-05-7c0d9525497ec91324cee5db9c4dcf74a575e6dcd6d151aea1b5d4b34cf6a905_d29387594b596294.mp4')
</script>

<template>
  <section id="video" class="video-container">
    <h2 class="section-title">Παρουσίαση & Βίντεο</h2>
    <div class="decorative-divider">
      <span class="cross">​†</span>
    </div>

    <p class="video-description">
      Παρακολουθήστε το βίντεο για να γνωρίσετε τον χώρο, τις δράσεις και την ιστορία του Εκκλησιαστικού Λυκείου Καβάλας.
    </p>

    <!-- Πλαίσιο Προβολής Τοπικού Βίντεο -->
    <div class="video-wrapper">
      <video
        controls
        playsinline
        preload="metadata"
        class="video-player"
      >
        <source :src="videoPath" type="video/mp4" />
        Το πρόγραμμα περιήγησής σας δεν υποστηρίζει την αναπαραγωγή βίντεο.
      </video>
    </div>
  </section>
</template>

<style scoped>
.video-container {
  max-width: 900px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #fdfbf7;
  border: 1px solid #d4af37;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  font-family: 'Georgia', 'Garamond', 'Times New Roman', serif;
  box-sizing: border-box;
}

.section-title {
  text-align: center;
  color: #4a0e17;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.decorative-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.decorative-divider::before,
.decorative-divider::after {
  content: '';
  width: 60px;
  height: 1px;
  background: linear-gradient(to right, transparent, #d4af37, transparent);
}

.cross {
  color: #d4af37;
  font-size: 1.2rem;
  margin: 0 10px;
}

.video-description {
  text-align: center;
  color: #3b0a12;
  font-size: 1.05rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* Responsive Video Container */
.video-wrapper {
  position: relative;
  width: 100%;
  border-radius: 6px;
  border: 2px solid #d4af37;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  background-color: #000;
  overflow: hidden;
}

.video-player {
  display: block;
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .video-container {
    padding: 1.25rem;
    margin: 2rem 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>