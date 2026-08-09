<template>
  <header id="hero" class="hero-banner">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">Καλώς ορίσατε στο Εκκλησιαστικό Λύκειο Καβάλας</h1>
      <div class="decorative-divider">
        <span class="cross">​†</span>
      </div>
      <p class="hero-subtitle">Παιδεία, Πίστη & Παράδοση</p>
    </div>
  </header>
</template>

<style scoped>
.hero-banner {
  position: relative;
  background-color: #3b0a12; /* Βαθύ βυσσινί */
  background-image: radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
  color: #fdfbf7;
  padding: 4rem 2rem;
  text-align: center;
  border-bottom: 2px solid #d4af37; /* Χρυσή γραμμή */
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
  font-family: 'Georgia', 'Garamond', 'Times New Roman', serif;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
}

.hero-title {
  font-size: 2.3rem;
  font-weight: 700;
  color: #f3e5ab; /* Απαλό Χρυσαφί */
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  letter-spacing: 0.5px;
  line-height: 1.3;
}

/* Διακοσμητικό στοιχείο με σταυρό */
.decorative-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
}

.decorative-divider::before,
.decorative-divider::after {
  content: '';
  width: 80px;
  height: 1px;
  background: linear-gradient(to right, transparent, #d4af37, transparent);
}

.cross {
  color: #d4af37;
  font-size: 1.5rem;
  margin: 0 15px;
  line-height: 1;
}

.hero-subtitle {
  font-size: 1.25rem;
  font-style: italic;
  color: #e2d8b8;
  margin: 0;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .hero-banner {
    padding: 2.5rem 1rem;
  }
  .hero-title {
    font-size: 1.6rem;
  }
  .hero-subtitle {
    font-size: 1rem;
  }
}
</style>