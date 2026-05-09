import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server:{
    proxy:{
      "/api":{
        target:"http://localhost:3000",
        secure:false,
        changeOrigin:true
      }
    }
  }
})
// /api:target ye sab kya hai 

// dekho ye keh raha hai aap jo bhi request jo /api se start hoga usko mein iss port mein send kar dunga matlab lekin hum toh ab proxy ke throgh 5173 pe hi chala rahe hai 

// yaha pe browser ko bewkoof banaya ja raha hai buss ?kaise 

// humne browser ko host and url nahi bheja toh wo /5173/api/auth/login jo backend ka server hai usse response leke fronetdn par kaam karta hai

// lekin actually hum kya kar rahe using the prxoy ki browser croosorigin error n de isliye hum usko aisa mehssos karwate hai ki wo same url mein chal raha hai 
// lekin humne lagake rakha huwa hai ki aap jaise hi rqeuest karoge /api se toh mein aapko /localhsot:3000/api se replace kar dunga and aage ka /login ya register jo bhi hom


