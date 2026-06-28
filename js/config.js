/* ============================================================
   GM Studio — config.js
   ▸ Set your Cloudflare R2 public bucket URL here ONCE.
   ▸ All images and videos across the site pull from this base.
   ============================================================ */

const GM = {

  // ── YOUR CLOUDFLARE R2 PUBLIC URL ──────────────────────────
  // After setting up R2 public access, paste your bucket URL here.
  // Example: "https://pub-abc123.r2.dev"  or  "https://media.gmstudio.in"
  // Trailing slash is optional — the code handles it either way.
  r2: "https://pub-09509937348545de9babd11eded9da23.r2.dev",

  // ── HELPER: build full R2 asset URL ────────────────────────
  asset(path) {
    const base = GM.r2.replace(/\/$/, "");
    return `${base}/${path.replace(/^\//, "")}`;
  },

  // ══════════════════════════════════════════════════════════
  // IMAGES
  // Upload your files to R2, then update the filenames below.
  // Keys are used throughout the site — change filename only.
  // ══════════════════════════════════════════════════════════
  images: {
    // Hero / homepage
    hero_bg:        "images/hero-bg.jpg",

    // Portfolio — Landscape
    landscape_1:    "images/landscape-1.jpg",
    landscape_2:    "images/landscape-2.jpg",
    landscape_3:    "images/landscape-3.jpg",

    // Portfolio — Street
    street_1:       "images/street-1.jpg",
    street_2:       "images/street-2.jpg",

    // Portfolio — Wedding
    wedding_1:      "images/wedding-1.jpg",
    wedding_2:      "images/wedding-2.jpg",

    // Portfolio — Product
    product_1:      "images/product-1.jpg",
    product_2:      "images/product-2.jpg",

    // About — photographer portrait
    portrait:       "images/portrait.jpg",
  },

  // ══════════════════════════════════════════════════════════
  // VIDEOS
  // Upload your videos to R2, then update filenames below.
  // For large videos, YouTube/Vimeo embed is also supported —
  // just paste the embed URL in the "embed" field instead.
  // ══════════════════════════════════════════════════════════
  videos: {
    featured: {
      type:     "r2",                          // "r2" | "youtube" | "vimeo"
      file:     "videos/mumbai-city.mp4",
      poster:   "images/video-thumb-featured.jpg",
      title:    "Mumbai — A City Breathes",
      desc:     "A 4-minute cinematic journey through the streets, coastlines, and rooftops of Mumbai.",
    },
    v1: {
      type:   "r2",
      file:   "videos/sahyadri-golden-hour.mp4",
      poster: "images/video-thumb-1.jpg",
      title:  "Sahyadri — Golden Hour",
      desc:   "A cinematic drive through the misty Western Ghats as the sun dips below the ridgeline.",
      tag:    "Landscape",
    },
    v2: {
      type:   "r2",
      file:   "videos/wedding-anjali-rohit.mp4",
      poster: "images/video-thumb-2.jpg",
      title:  "Anjali & Rohit — Wedding Film",
      desc:   "A beautifully intimate wedding short from a beachside ceremony in Alibaug.",
      tag:    "Wedding",
    },
    v3: {
      type:   "r2",
      file:   "videos/dharavi-60s.mp4",
      poster: "images/video-thumb-3.jpg",
      title:  "Dharavi in 60 Seconds",
      desc:   "A one-minute burst of colour, motion, and life from inside Asia's largest informal settlement.",
      tag:    "Street",
    },
    v4: {
      type:   "r2",
      file:   "videos/bts-watch.mp4",
      poster: "images/video-thumb-4.jpg",
      title:  "Studio BTS — Watch Campaign",
      desc:   "Behind the scenes of a luxury timepiece shoot.",
      tag:    "BTS",
    },
    v5: {
      type:   "r2",
      file:   "videos/monsoon-timelapse.mp4",
      poster: "images/video-thumb-5.jpg",
      title:  "Monsoon Timelapse — Marine Drive",
      desc:   "6 hours of Mumbai's rainy season compressed into 90 seconds.",
      tag:    "Timelapse",
    },
  },
};
