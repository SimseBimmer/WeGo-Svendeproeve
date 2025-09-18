# WeGo – Svendeprøve  
**Navn:** Simon Emil Jensen  
**Hold:** H1WE080124  
**Repo:** [https://github.com/SimseBimmer/WeGo-Svendeproeve](https://github.com/SimseBimmer/WeGo-Svendeproeve)  
**Login:**  
- Email: info@webudvikler.dk  
- Adgangskode: password  

---

## Indholdsfortegnelse
1. Vurdering af min indsats og gennemførelse  
2. Argumentation for valg under løsningen af opgaven  
3. Redegørelse  
4. Fremhævelse af punkter til bedømmelse  
5. Konklusion  
6. Bilag – Projektlog (Arbejdsdag 1–4)  

---

## 1. Vurdering af min indsats og gennemførelse
Jeg startede projektet med min egen boilerplate, som jeg har brugt før. Det gav mig et hurtigt layout og struktur, og jeg kunne genbruge nogle komponenter for at holde en ens stil på siderne.  

Jeg fulgte prioriteringslisten fra opgaven og byggede delene i rækkefølge: API, login, forside, lifts, detaljer og booking. Alt blev sat op trin for trin med commits på GitHub. Jeg fik lavet alle de krævede funktioner, og projektet blev færdigt til tiden.  

---

## 2. Argumentation for valg under løsningen af opgaven
Jeg brugte **React + Vite** til frontend, fordi det giver et hurtigt flow og router er nemt at arbejde med. Til styling brugte jeg **SCSS** med variabler, så designet blev ensartet.  

API-kald er lavet med **fetch** via en proxy i Vite, fordi det er indbygget og fungerer fint til projektets størrelse. Jeg gemmer login-data i **localStorage** og laver en ProtectedRoute i `App.jsx`, så man skal være logget ind for at kunne booke.  

Jeg holdt mig tæt til designet i Figma og gjorde det responsivt. Formularer er valideret, og der er simple fejlbeskeder til brugeren.  

---

## 3. Redegørelse
Jeg startede med min egen boilerplate for hurtig struktur og layout. I frontend valgte jeg at simplificere Vite-konfigurationen i forhold til undervisningseksemplet: jeg fjernede Tailwind-plugin’et (fordi jeg bruger SCSS) og tilføjede build/dir-indstillinger, så output ender i en tydelig dist-mappe. Proxy bevares, så frontend kan ramme backend på http://localhost:4000 uden CORS.

- Proxy: 
  - /api → backend-API på http://localhost:4000 (fx Express-ruter)
  - /images → statiske filer fra backend på http://localhost:4000
- Styling: SCSS i stedet for Tailwind (ensartet styling via variabler/mixins)
- Build: root og outDir for klar outputstruktur i Frontend/

<details>
  <summary><strong>Vite-konfiguration: Heinz (undervisning) vs. min</strong></summary>

  Heinz’ eksempel (med Tailwind-plugin):
  
  ```javascript
  import { defineConfig } from 'vite'
  import tailwindcss from '@tailwindcss/vite'
  import react from '@vitejs/plugin-react'
  
  // https://vite.dev/config/
  export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api': 'http://localhost:4000',
        '/images': 'http://localhost:4000',
      },
    },
  })
  ```

  Min konfiguration (Frontend/vite.config.js):
  
  ```javascript
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  
  export default defineConfig({
    plugins: [react()],
    root: './',
    build: {
      outDir: 'dist',
    },
    server: {
      proxy: {
        '/api': 'http://localhost:4000',
        '/images': 'http://localhost:4000',
      },
    },
  });
  ```
</details>

---

## 4. Fremhævelse af punkter til bedømmelse
- Slideshow på forsiden henter dynamisk content fra API.  
- Filterfunktion til lifts virker på seats, baggage og user preferences.  
- Booking flow med pris, validation og data gemt i API.  
- Login med token handling og Protected Routes.  
- Trip-detaljer med seat status og dynamiske data giver et realistisk billede af en tur.  

---

## 5. Konklusion
Projektet viser, at jeg kan sætte en frontend op fra min egen boilerplate, koble den til et API og levere en løsning med de krævede features. Jeg nåede ikke at implementere reviews, men resten af funktionerne blev færdige og fungerer som de skal. Jeg er tilfreds med resultatet, og det lever op til kravene i opgaven.  

---

## 6. Bilag – Projektlog (Arbejdsdag 1–4)

**Arbejdsdag 1 – Opsætning og struktur**  
- Repo sat op med boilerplate  
- Struktur og første komponenter  
- Basis routing og layout  

**Arbejdsdag 2 – API og data**  
- Opsat fetch til endpoints  
- Datamodeller og service-lag  
- Første dataflows på lister  
- Simpel fejl- og loadinghåndtering  

**Arbejdsdag 3 – Features og UI**  
- Bygget kernefeatures (søgning, filtrering, booking)  
- Formularer og validering  
- Styling og responsivt design  
- Komponentopdeling  

**Arbejdsdag 4 – Optimering, test og dokumentation**  
- Refaktorering og bugfixes  
- Performance og edge cases  
- Opdateret README og scripts  
- Klargøring til aflevering  
