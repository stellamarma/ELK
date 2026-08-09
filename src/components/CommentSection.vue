<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebase/config'
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore'

// Reactive state για τη φόρμα
const fullName = ref('')
const email = ref('')
const commentText = ref('')

// State για τη διαχείριση κατάστασης
const comments = ref([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const message = ref({ text: '', type: '' })

// Αναφορά στη συλλογή "comments" της Firestore
const commentsCollection = collection(db, 'comments')

// Συνάρτηση ελέγχου εγκυρότητας μορφής Email (Regex)
const isValidEmail = (emailStr) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(emailStr)
}

// 1. Ανάκτηση των σχολίων από τη Firestore
const fetchComments = async () => {
  isLoading.value = true
  try {
    const q = query(commentsCollection, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    comments.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Σφάλμα κατά την ανάκτηση σχολίων:', error)
  } finally {
    isLoading.value = false
  }
}

// 2. Υποβολή νέου σχολίου
const handleSubmit = async () => {
  const nameTrimmed = fullName.value.trim()
  const emailTrimmed = email.value.trim()
  const commentTrimmed = commentText.value.trim()

  // Έλεγχος αν λείπει κάποιο από τα 3 στοιχεία
  if (!nameTrimmed || !emailTrimmed || !commentTrimmed) {
    message.value = { 
      text: 'Όλα τα πεδία είναι υποχρεωτικά! Παρακαλώ συμπληρώστε τα όλα.', 
      type: 'error' 
    }
    return
  }

  // Έλεγχος εγκυρότητας μορφής Email
  if (!isValidEmail(emailTrimmed)) {
    message.value = { 
      text: 'Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email (π.χ. name@example.com).', 
      type: 'error' 
    }
    return
  }

  isSubmitting.value = true
  message.value = { text: '', type: '' }

  try {
    await addDoc(commentsCollection, {
      fullName: nameTrimmed,
      email: emailTrimmed, // Αποθηκεύεται και εμφανίζεται
      text: commentTrimmed,
      createdAt: serverTimestamp()
    })

    message.value = { text: 'Το σχόλιό σας υποβλήθηκε με επιτυχία!', type: 'success' }
    
    // Καθαρισμός πεδίων
    fullName.value = ''
    email.value = ''
    commentText.value = ''

    // Ανανέωση της λίστας σχολίων
    await fetchComments()
  } catch (error) {
    console.error('Σφάλμα κατά την αποθήκευση:', error)
    message.value = { text: 'Αποτυχία υποβολής. Δοκιμάστε ξανά.', type: 'error' }
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  fetchComments()
})
</script>

<template>
  <section id="comments" class="comments-container">
    <h2 class="section-title">Σχόλια & Εντυπώσεις</h2>
    <div class="decorative-divider">
      <span class="cross">☦</span>
    </div>

    <!-- Φόρμα Υποβολής -->
    <form @submit.prevent="handleSubmit" class="comment-form" novalidate>
      <div class="form-group">
        <label for="fullName">Ονοματεπώνυμο *</label>
        <input 
          id="fullName" 
          v-model="fullName" 
          type="text" 
          placeholder="π.χ. Ιωάννης Παπαδόπουλος" 
          required 
        />
      </div>

      <div class="form-group">
        <label for="email">Ηλεκτρονικό Ταχυδρομείο (Email) *</label>
        <input 
          id="email" 
          v-model="email" 
          type="email" 
          placeholder="name@example.com" 
          required 
        />
      </div>

      <div class="form-group">
        <label for="comment">Σχόλιο *</label>
        <textarea 
          id="comment" 
          v-model="commentText" 
          rows="4" 
          placeholder="Γράψτε το σχόλιό σας εδώ..." 
          required
        ></textarea>
      </div>

      <button type="submit" class="submit-btn" :disabled="isSubmitting">
        <span v-if="!isSubmitting">Υποβολή Σχολίου</span>
        <span v-else>Αποστολή...</span>
      </button>

      <!-- Μήνυμα Επιτυχίας / Σφάλματος -->
      <p v-if="message.text" :class="['message', message.type]">
        {{ message.text }}
      </p>
    </form>

    <!-- Λίστα Δημοσιευμένων Σχολίων -->
    <div class="comments-list">
      <h3>Δημοσιευμένα Σχόλια ({{ comments.length }})</h3>

      <div v-if="isLoading" class="loading">Φόρτωση σχολίων...</div>

      <div v-else-if="comments.length === 0" class="no-comments">
        Δεν υπάρχουν ακόμα σχόλια. Γίνετε ο πρώτος που θα σχολιάσει!
      </div>

      <div v-else class="comments-grid">
        <div v-for="c in comments" :key="c.id" class="comment-card">
          <div class="comment-header">
            <span class="author-name">{{ c.fullName }}</span>
            <!-- Εμφάνιση του Email του χρήστη -->
            <span class="author-email">({{ c.email }})</span>
          </div>
          <p class="comment-body">{{ c.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.comments-container {
  max-width: 800px;
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
  margin-bottom: 2rem;
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

/* Form Styles */
.comment-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 3rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  color: #3b0a12;
  font-weight: 600;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #c8b282;
  border-radius: 4px;
  background-color: #ffffff;
  font-family: inherit;
  font-size: 1rem;
  color: #2c2c2c;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4a0e17;
  box-shadow: 0 0 0 2px rgba(74, 14, 23, 0.15);
}

.submit-btn {
  background-color: #4a0e17;
  color: #fdfbf7;
  border: 1px solid #d4af37;
  padding: 0.85rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.submit-btn:hover:not(:disabled) {
  background-color: #63141f;
  color: #d4af37;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.message {
  padding: 0.75rem;
  border-radius: 4px;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 600;
}

.message.success {
  background-color: #e6f4ea;
  color: #137333;
  border: 1px solid #ceead6;
}

.message.error {
  background-color: #fce8e6;
  color: #c5221f;
  border: 1px solid #fad2cf;
}

/* Comments List Styles */
.comments-list h3 {
  color: #4a0e17;
  border-bottom: 2px solid #d4af37;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.comments-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comment-card {
  background-color: #ffffff;
  border: 1px solid #e2d8b8;
  border-left: 4px solid #4a0e17;
  padding: 1rem;
  border-radius: 4px;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.author-name {
  font-weight: 700;
  color: #4a0e17;
  font-size: 1.05rem;
}

.author-email {
  color: #777777;
  font-size: 0.9rem;
  font-style: italic;
}

.comment-body {
  margin: 0.5rem 0 0 0;
  color: #333333;
  line-height: 1.5;
  white-space: pre-line;
}

.loading, .no-comments {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 1rem;
}
</style>