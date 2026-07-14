import { Achievement } from "@/types";

export const achievements: Achievement[] = [
  {
    id: "ach-1",
    title: "1st Place — National AI Hackathon",
    description:
      "Won first place among 200+ teams at the Smart India Hackathon 2023 for building an AI-powered assistive navigation system for visually impaired users. Our solution combined real-time object detection, semantic SLAM, and haptic feedback integration to enable safe indoor navigation without GPS.",
    date: "2023-08",
    issuer: "Government of India — Ministry of Education",
    category: "hackathon",
    icon: "Trophy",
    url: "https://sih.gov.in",
    featured: true,
  },
  {
    id: "ach-2",
    title: "Best Paper Award — University Research Symposium",
    description:
      "Received the Best Paper Award at the IIT Delhi Annual Research Symposium 2023 for the paper 'Efficient Object Detection in Low-Light Conditions Using Adaptive Neural Networks'. Recognized for novelty, experimental rigor, and potential real-world impact in autonomous driving safety.",
    date: "2023-11",
    issuer: "Indian Institute of Technology Delhi",
    category: "award",
    icon: "Award",
    url: "https://home.iitd.ac.in",
    featured: true,
  },
  {
    id: "ach-3",
    title: "Google Cloud Professional ML Engineer Certification",
    description:
      "Earned the Google Cloud Professional Machine Learning Engineer certification, demonstrating expertise in designing, building, and productionizing ML models on Google Cloud Platform using Vertex AI, BigQuery ML, and Cloud Functions.",
    date: "2023-12",
    issuer: "Google Cloud",
    category: "recognition",
    icon: "BadgeCheck",
    url: "https://cloud.google.com/certification",
    featured: true,
  },
  {
    id: "ach-4",
    title: "Kaggle Competition — Top 5% Worldwide",
    description:
      "Achieved top 5% ranking (187th out of 4,120 teams) in the Kaggle 'AI4Code — Understanding Code' competition. Developed an ensemble of transformer-based models for predicting code-documentation pairs and execution ordering in Jupyter notebooks.",
    date: "2023-06",
    issuer: "Kaggle",
    category: "competition",
    icon: "Medal",
    url: "https://www.kaggle.com/competitions/ai4code",
    featured: true,
  },
  {
    id: "ach-5",
    title: "University Dean's List Scholarship",
    description:
      "Awarded the Dean's List Scholarship for academic excellence in three consecutive semesters (2021-2023) at IIT Delhi, recognizing CGPA above 8.5 among the top 10% of students in the CSE department.",
    date: "2022-12",
    issuer: "Indian Institute of Technology Delhi",
    category: "scholarship",
    icon: "GraduationCap",
    featured: false,
  },
  {
    id: "ach-6",
    title: "Open Source Contributor Award",
    description:
      "Recognized as a top contributor to the Hugging Face Transformers library with 15+ merged pull requests including model implementations, documentation improvements, and bug fixes. Contributions spanned tokenization, model evaluation utilities, and integration tests.",
    date: "2024-02",
    issuer: "Hugging Face",
    category: "recognition",
    icon: "GitPullRequestArrow",
    url: "https://huggingface.co",
    featured: false,
  },
];

export const getAchievementById = (id: string): Achievement | undefined =>
  achievements.find((ach) => ach.id === id);

export const getFeaturedAchievements = (): Achievement[] =>
  achievements.filter((ach) => ach.featured);
