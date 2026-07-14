import { Education } from "@/types";

export const education: Education[] = [
  {
    id: "edu-1",
    institution: "Indian Institute of Technology Delhi",
    degree: "B.Tech",
    field: "Computer Science and Engineering (Artificial Intelligence & Machine Learning)",
    location: "New Delhi, India",
    startDate: "2020-08",
    endDate: "2024-05",
    gpa: "8.72 / 10",
    achievements: [
      "Graduated with Institute Merit Roll for academic excellence in 3 consecutive semesters",
      "Led the AI/ML cell of the university's tech club, organizing 8+ workshops and hackathons with 500+ total participants",
      "Completed a research thesis on 'Adaptive Neural Networks for Low-Light Object Detection' under Prof. Rajiv Gupta",
      "Recipient of the INSPIRE Scholarship awarded by the Department of Science and Technology, Government of India",
      "Ranked in the top 3% of a graduating class of 120 students in the CSE (AI & ML) specialization",
    ],
    relevantCoursework: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "Natural Language Processing",
      "Reinforcement Learning",
      "Statistical Learning Theory",
      "Optimization Methods",
      "Data Structures & Algorithms",
      "Database Systems",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
      "Data Mining & Warehousing",
      "Cloud Computing",
      "High-Performance Computing",
    ],
    logo: "/images/education/iitd-logo.svg",
    website: "https://home.iitd.ac.in",
  },
];

export const getEducationById = (id: string): Education | undefined =>
  education.find((edu) => edu.id === id);
