<script setup>
import { ref } from 'vue'

const isMobileOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileOpen.value = !isMobileOpen.value
}

// Συνάρτηση για Scroll σε συγκεκριμένο ID
const scrollToSection = (id) => {
  isMobileOpen.value = false // Κλείνει το mobile μενού
  
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <a href="#" class="brand-logo" @click.prevent="scrollToSection('hero')">
        Εκκλησιαστικό Λύκειο Καβάλας
      </a>

      <!-- Hamburger Button (Mobile) -->
      <button 
        class="hamburger" 
        :class="{ 'is-active': isMobileOpen }" 
        @click="toggleMobileMenu"
        aria-label="Μενού"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>

      <!-- Menu Items -->
      <ul class="nav-menu" :class="{ 'is-open': isMobileOpen }">
        <li class="nav-item">
          <a href="#viewer" class="nav-link" @click.prevent="scrollToSection('viewer')">
            Φωτογραφικό Υλικό
          </a>
        </li>
        <li class="nav-item">
          <a href="#contact" class="nav-link" @click.prevent="scrollToSection('contact')">
            Επικοινωνία
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

/* Εκκλησιαστικό / Βυζαντινό Styling */
.navbar {
  background-color: #4a0e17; /* Βαθύ Βυσσινί / Πορφυρό */
  color: #fdfbf7;
  padding: 0.75rem 1.5rem;
  border-bottom: 2px solid #d4af37; /* Χρυσό Περίγραμμα */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 1000;
  font-family: 'Georgia', 'Garamond', 'Times New Roman', serif;
  width: 100%;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
}

.brand-logo {
  font-size: 1.3rem;
  font-weight: 700;
  color: #f3e5ab; /* Απαλό Χρυσαφί */
  text-decoration: none;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
  white-space: nowrap; /* Αποτρέπει το απότομο σπάσιμο σε πολλές γραμμές */
}

.brand-logo:hover {
  color: #ffffff;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: #fdfbf7;
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  display: block;
}

.nav-link:hover {
  color: #d4af37; /* Χρυσό στο Hover */
  background-color: rgba(212, 175, 55, 0.1);
  border-color: rgba(212, 175, 55, 0.4);
}

/* Hamburger Icon (Mobile) */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  z-index: 1001;
}

.bar {
  width: 25px;
  height: 2px;
  background-color: #d4af37; /* Χρυσές γραμμές */
  border-radius: 1px;
  transition: all 0.3s ease;
}

/* Responsive / Mobile Styling */
@media (max-width: 768px) {
  .navbar {
    padding: 0.75rem 1rem;
  }

  .brand-logo {
    font-size: 1.05rem; /* Μικραίνει το κείμενο για να χωράει σε μία γραμμή */
    white-space: normal; /* Επιτρέπει ομαλή προσαρμογή αν η οθόνη είναι πολύ μικρή */
    line-height: 1.2;
    max-width: 80%;
  }

  .hamburger {
    display: flex;
  }

  .nav-menu {
    position: absolute;
    top: calc(100% + 0.75rem); /* Εμφανίζεται ακριβώς κάτω από το navbar */
    left: -1rem;
    right: -1rem;
    width: calc(100% + 2rem);
    background-color: #3b0a12;
    border-bottom: 2px solid #d4af37;
    flex-direction: column;
    align-items: center;
    padding: 0;
    gap: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out, padding 0.3s ease;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  }

  .nav-menu.is-open {
    max-height: 200px;
    padding: 1rem 0;
  }

  .nav-item {
    width: 100%;
    text-align: center;
  }

  .nav-link {
    padding: 0.75rem 1rem;
    width: 100%;
    border-radius: 0;
  }

  /* Hamburger Animation */
  .hamburger.is-active .bar:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .hamburger.is-active .bar:nth-child(2) {
    opacity: 0;
  }
  .hamburger.is-active .bar:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
}
</style>