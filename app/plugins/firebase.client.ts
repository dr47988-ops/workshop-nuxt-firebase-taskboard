import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDQQkVsFmpYXbn_lvvdx6K4JWw3UOBPrcQ",
  authDomain: "workshopweek2-62120.firebaseapp.com",
  projectId: "workshopweek2-62120",
  storageBucket: "workshopweek2-62120.firebasestorage.app",
  messagingSenderId: "296254443147",
  appId: "1:296254443147:web:50681c54b521ef56e18e8e"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

console.log('Firebase conectado', firebaseConfig.projectId)

export default defineNuxtPlugin({
  name: 'firebase',
  enforce: 'pre',
  setup() {
    return {
      provide: {
        firebaseApp: app,
        firestore: db,
      },
    }
  },
})