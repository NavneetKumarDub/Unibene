export const softwareData = [
  /* ================= SOFTWARE TOOLS ================= */

  {
    _id: "s1",
    name: "GitHub Student Developer Pack",
    originalPrice: 9999,
    discountPrice: 0,
    discountPercent: 100,
    brand: "GitHub",
    category: "software",
    source: "GitHub Education",
    image: "data:image/png;base64,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",
    link: "https://education.github.com/pack"
  },
  {
    _id: "s2",
    name: "Adobe Creative Cloud (Student)",
    originalPrice: 59600,
    discountPrice: 19100,
    discountPercent: 68,
    brand: "Adobe",
    category: "software",
    source: "Adobe Student Store",
    image: "https://www.adobe.com/content/dam/shared/images/product-icons/svg/creative-cloud.svg",
    link: "https://www.adobe.com/in/creativecloud/buy/students.html"
  },
  {
    _id: "s3",
    name: "Notion Pro (Student)",
    originalPrice: 4800,
    discountPrice: 0,
    discountPercent: 100,
    brand: "Notion",
    category: "software",
    source: "Notion Education",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    link: "https://www.notion.so/students"
  },
  {
    _id: "s4",
    name: "Canva Pro (Student)",
    originalPrice: 4999,
    discountPrice: 0,
    discountPercent: 100,
    brand: "Canva",
    category: "software",
    source: "Canva Education",
    image: "https://saasyto.com/wp-content/uploads/2024/08/canva-edu-pro-subscription.png",
    link: "https://www.canva.com/education/"
  },
  {
    _id: "s5",
    name: "JetBrains All Products Pack",
    originalPrice: 11000,
    discountPrice: 0,
    discountPercent: 100,
    brand: "JetBrains",
    category: "software",
    source: "JetBrains Student Program",
    image: "https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.svg",
    link: "https://www.jetbrains.com/community/education/"
  },
  {
    _id: "s6",
    name: "Microsoft Office 365 (Student)",
    originalPrice: 6199,
    discountPrice: 0,
    discountPercent: 100,
    brand: "Microsoft",
    category: "software",
    source: "Microsoft Education",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    link: "https://www.microsoft.com/education"
  },
  {
    _id: "s7",
    name: "Autodesk AutoCAD (Student)",
    originalPrice: 98000,
    discountPrice: 0,
    discountPercent: 100,
    brand: "Autodesk",
    category: "software",
    source: "Autodesk Education",
    image: "https://saasyto.com/wp-content/uploads/2024/08/Autodesk-AutoCAD-subscription-1.jpg",
    link: "https://www.autodesk.com/education"
  },
  {
    _id: "s8",
    name: "Figma Professional (Student)",
    originalPrice: 9600,
    discountPrice: 0,
    discountPercent: 100,
    brand: "Figma",
    category: "software",
    source: "Figma Education",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    link: "https://www.figma.com/education/"
  },

  /* ================= SUBSCRIPTIONS ================= */

  {
    _id: "s9",
    name: "Spotify Premium (Student)",
    originalPrice: 1199,
    discountPrice: 749,
    discountPercent: 38,
    brand: "Spotify",
    category: "subscription",
    source: "Spotify Student",
    image: "https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png",
    link: "https://www.spotify.com/in/student/"
  },
  {
    _id: "s10",
    name: "Amazon Prime Student",
    originalPrice: 1499,
    discountPrice: 749,
    discountPercent: 50,
    brand: "Amazon",
    category: "subscription",
    source: "Amazon Prime",
    image: "https://m.media-amazon.com/images/I/31W9hs7w0JL.png",
    link: "https://www.amazon.in/amazonprime"
  },
  {
    _id: "s11",
    name: "YouTube Premium (Student)",
    originalPrice: 1399,
    discountPrice: 799,
    discountPercent: 43,
    brand: "YouTube",
    category: "subscription",
    source: "YouTube",
    image: "https://chromeunboxed.com/wp-content/uploads/2025/07/YouTubePremiumDeviceAuthorizationLimits.webp",
    link: "https://www.youtube.com/premium/student"
  },
  {
    _id: "s12",
    name: "Netflix Student Plan",
    originalPrice: 1999,
    discountPrice: 1499,
    discountPercent: 25,
    brand: "Netflix",
    category: "subscription",
    source: "Netflix",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    link: "https://www.netflix.com"
  },
  {
    _id: "s13",
    name: "Apple Music (Student)",
    originalPrice: 1199,
    discountPrice: 599,
    discountPercent: 50,
    brand: "Apple",
    category: "subscription",
    source: "Apple Student Plan",
    image: "https://routenote.com/blog/wp-content/uploads/2021/12/apple_music-update_hero_08242021.jpg",
    link: "https://www.apple.com/apple-music/"
  },
  {
    _id: "s14",
    name: "LinkedIn Premium (Student)",
    originalPrice: 2999,
    discountPrice: 1499,
    discountPercent: 50,
    brand: "LinkedIn",
    category: "subscription",
    source: "LinkedIn Learning",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    link: "https://www.linkedin.com/learning/"
  },
  {
    _id: "s15",
    name: "Coursera Plus (Student)",
    originalPrice: 4999,
    discountPrice: 2499,
    discountPercent: 50,
    brand: "Coursera",
    category: "subscription",
    source: "Coursera",
    image: "https://blog.coursera.org/wp-content/uploads/2021/06/Coursera-Plus-evergreen-animated.gif",
    link: "https://www.coursera.org"
  },
  {
    _id: "s16",
    name: "Udemy Business (Student)",
    originalPrice: 3999,
    discountPrice: 1999,
    discountPercent: 50,
    brand: "Udemy",
    category: "subscription",
    source: "Udemy",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
    link: "https://www.udemy.com"
  },
  {
    _id: "s17",
    name: "Google One (Student)",
    originalPrice: 1300,
    discountPrice: 650,
    discountPercent: 50,
    brand: "Google",
    category: "subscription",
    source: "Google",
    image: "https://play-lh.googleusercontent.com/B5AENJqFOd91t5cWZLTQbVUm7iDWzYVM1n0Pe2RI_46dhlWMtVAUBioUvy4YMXWdwA",
    link: "https://one.google.com"
  },
  {
    _id: "s18",
    name: "Dropbox Plus (Student)",
    originalPrice: 1199,
    discountPrice: 599,
    discountPercent: 50,
    brand: "Dropbox",
    category: "subscription",
    source: "Dropbox Education",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg",
    link: "https://www.dropbox.com/education"
  }
];
