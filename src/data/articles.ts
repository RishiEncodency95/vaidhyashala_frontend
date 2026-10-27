export interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: "Ayurveda" | "Panchakarma" | "Yoga & Lifestyle" | "Clinic Guidance";
  imageLabel: string;
  imageAlt: string;
  imageSrc?: string;
}

export const featuredArticle: Article = {
  id: 0,
  title: "Your first Ayurvedic consultation: what to prepare",
  excerpt:
    "A helpful guide to making the most of your first visit, including what to bring, how to prepare your list of current medicines, relevant reports and the questions you may wish to discuss with your doctor.",
  category: "Clinic Guidance",
  imageLabel: "Featured Article Image: Doctor consultation with patient",
  imageAlt: "Ayurvedic doctor in consultation with a patient in a serene clinic room",
  imageSrc: "/h2.webp",
};

export const initialArticles: Article[] = [
  {
    id: 1,
    title: "Understanding Panchakarma",
    excerpt:
      "An introduction to Panchakarma therapies, what to expect and how they are planned to suit your individual needs.",
    category: "Panchakarma",
    imageLabel: "Article 1 Image: Traditional Shirodhara therapy",
    imageAlt: "Ayurvedic practitioner administering soothing Shirodhara oil therapy",
    imageSrc: "/a1.webp",
  },
  {
    id: 2,
    title: "What to ask before planning a therapy",
    excerpt:
      "Key questions to help you have a meaningful discussion with your doctor and make informed choices about your treatment plan.",
    category: "Clinic Guidance",
    imageLabel: "Article 2 Image: Discussion with Ayurvedic physician",
    imageAlt: "Patient having a detailed treatment planning discussion with the doctor",
    imageSrc: "/a2.webp",
  },
  {
    id: 3,
    title: "Yoga practices and individual suitability",
    excerpt:
      "An overview of common yoga practices and how to choose routines that align with your lifestyle, needs and comfort level.",
    category: "Yoga & Lifestyle",
    imageLabel: "Article 3 Image: Calm meditation and yoga asanas",
    imageAlt: "Woman practicing seated yoga and mindfulness meditation in a peaceful room",
    imageSrc: "/a3.webp",
  },
  {
    id: 4,
    title: "Building a thoughtful daily routine",
    excerpt:
      "Simple guidance on everyday routines, dietary awareness and lifestyle habits to support your overall well-being.",
    category: "Yoga & Lifestyle",
    imageLabel: "Article 4 Image: Wholesome Ayurvedic meal and herbal decoction",
    imageAlt: "Nutritious Ayurvedic herbal meal, traditional brass cup, and medicinal herbs",
    imageSrc: "/a4.webp",
  },
  {
    id: 5,
    title: "Reading Ayurvedic product labels",
    excerpt:
      "Understand how to read Ayurvedic formulations, common ingredients and what to look for when choosing products for your needs.",
    category: "Ayurveda",
    imageLabel: "Article 5 Image: Ayurvedic herbal oils and medicine packaging",
    imageAlt: "Bottles of Ayurvedic herbal oils and botanical formulations with labels",
    imageSrc: "/a5.webp",
  },
  {
    id: 6,
    title: "Preparing for your clinic visit",
    excerpt:
      "A simple checklist to help you feel prepared and comfortable for your upcoming consultation or therapy session.",
    category: "Clinic Guidance",
    imageLabel: "Article 6 Image: Ayurvedic treatment room and brass bowls",
    imageAlt: "Serene Ayurvedic clinic therapy bed prepared with traditional brass singing bowls",
    imageSrc: "/a6.webp",
  },
];

export const categories = [
  "All",
  "Ayurveda",
  "Panchakarma",
  "Yoga & Lifestyle",
  "Clinic Guidance",
] as const;

export type Category = (typeof categories)[number];
