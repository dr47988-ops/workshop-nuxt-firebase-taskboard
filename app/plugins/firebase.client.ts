import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAxkIgv0_pZqrhK1ySZNK1aBQnn5sLa_z4',
  authDomain: 'workshop-nuxt-firebase-8cb0d.firebaseapp.com',
  projectId: 'workshop-nuxt-firebase-8cb0d',
  storageBucket: 'workshop-nuxt-firebase-8cb0d.firebasestorage.app',
  messagingSenderId: '1019923060516',
  appId: '1:1019923060516:web:e41cffc1e33b7d5a0485b1'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

console.log('Firebase conectado:', firebaseConfig.projectId)

export default defineNuxtPlugin({
  name: 'firebase',
  enforce: 'pre',

  setup() {
    return {
      provide: {
        firebaseApp: app,
        firestore: db
      }
    }
  }
})