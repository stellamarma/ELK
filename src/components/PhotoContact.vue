<template>
  <div class="gallery-container" id="contact">
    <h2>Στοιχεία Επικοινωνίας των Συμμετεχόντων</h2>

    <!-- Πλέγμα Φωτογραφιών -->
    <div class="photo-grid">
      <div 
        v-for="(photo, index) in photosList" 
        :key="photo.id || index" 
        class="photo-card"
        @click="openLightbox(index)"
      >
        <img :src="photo.src" :alt="photo.alt" loading="lazy" />
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <div 
        v-if="selectedIndex !== null" 
        class="lightbox-overlay"
        @click.self="closeLightbox"
      >
        <!-- Κουμπί Κλεισίματος -->
        <button class="close-btn" @click="closeLightbox" aria-label="Κλείσιμο">&times;</button>

        <!-- Κουμπί Προηγούμενο -->
        <button 
          class="nav-btn prev-btn" 
          @click.stop="prevPhoto" 
          aria-label="Προηγούμενη"
        >
          &#10094;
        </button>

        <!-- Κύρια Εικόνα Lightbox -->
        <div class="lightbox-content">
          <img 
            :src="photosList[selectedIndex].src" 
            :alt="photosList[selectedIndex].alt" 
          />
        </div>

        <!-- Κουμπί Επόμενο -->
        <button 
          class="nav-btn next-btn" 
          @click.stop="nextPhoto" 
          aria-label="Επόμενη"
        >
          &#10095;
        </button>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { photos_contact } from '@/data/photos.js'

const photosList = ref(photos_contact)
const selectedIndex = ref(null)

const openLightbox = (index) => {
  selectedIndex.value = index
}

const closeLightbox = () => {
  selectedIndex.value = null
}

const nextPhoto = () => {
  if (selectedIndex.value !== null) {
    selectedIndex.value = (selectedIndex.value + 1) % photosList.value.length
  }
}

const prevPhoto = () => {
  if (selectedIndex.value !== null) {
    selectedIndex.value = (selectedIndex.value - 1 + photosList.value.length) % photosList.value.length
  }
}

// Χειρισμός πλήκτρων (Esc, Αριστερό/Δεξί βέλος)
const handleKeydown = (event) => {
  if (selectedIndex.value === null) return
  
  if (event.key === 'Escape') closeLightbox()
  if (event.key === 'ArrowRight') nextPhoto()
  if (event.key === 'ArrowLeft') prevPhoto()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.gallery-container {
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}

/* Πλέγμα 4 αυστηρά ισόποσων στηλών */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 16px;
  width: 100%;
}

/* Μόνιμη προσαρμογή μόνο για πολύ μικρά κινητά */
@media (max-width: 600px) {
  .photo-grid {
    grid-template-columns: repeat(1, 1fr) !important;
  }
}

.photo-card {
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  aspect-ratio: 1 / 1;
  width: 100%;
}

.photo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
}

.photo-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Lightbox Modal Styles */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.lightbox-content {
  max-width: 90vw;
  max-height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 25px;
  background: none;
  border: none;
  color: #fff;
  font-size: 38px;
  cursor: pointer;
  z-index: 10000;
  line-height: 1;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  font-size: 28px;
  padding: 12px 18px;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.2s ease;
  user-select: none;
}

.nav-btn:hover,
.close-btn:hover {
  color: #ddd;
  background: rgba(255, 255, 255, 0.4);
}

.prev-btn {
  left: 20px;
}

.next-btn {
  right: 20px;
}
</style>