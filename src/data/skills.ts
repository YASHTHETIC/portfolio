import { Skill } from "@/types";

export const skills: Skill[] = [
  // Programming Languages
  { name: "Python", category: "programming", proficiency: 95, icon: "Code2" },
  { name: "TypeScript", category: "programming", proficiency: 88, icon: "Code2" },
  { name: "JavaScript", category: "programming", proficiency: 90, icon: "Code2" },
  { name: "C++", category: "programming", proficiency: 75, icon: "Code2" },
  { name: "SQL", category: "programming", proficiency: 82, icon: "Database" },
  { name: "Bash", category: "programming", proficiency: 78, icon: "Terminal" },
  { name: "R", category: "programming", proficiency: 65, icon: "BarChart3" },

  // Frameworks
  { name: "React", category: "frameworks", proficiency: 92, icon: "Component" },
  { name: "Next.js", category: "frameworks", proficiency: 90, icon: "Layout" },
  { name: "Node.js", category: "frameworks", proficiency: 85, icon: "Server" },
  { name: "Flask", category: "frameworks", proficiency: 80, icon: "FlaskConical" },
  { name: "FastAPI", category: "frameworks", proficiency: 88, icon: "Zap" },
  { name: "Django", category: "frameworks", proficiency: 72, icon: "Globe" },
  { name: "Streamlit", category: "frameworks", proficiency: 85, icon: "LayoutDashboard" },
  { name: "Gradio", category: "frameworks", proficiency: 82, icon: "Monitor" },

  // ML Frameworks & Concepts
  { name: "PyTorch", category: "ml-frameworks", proficiency: 93, icon: "Flame" },
  { name: "TensorFlow", category: "ml-frameworks", proficiency: 87, icon: "Brain" },
  { name: "Keras", category: "ml-frameworks", proficiency: 84, icon: "Layers" },
  { name: "scikit-learn", category: "ml-frameworks", proficiency: 88, icon: "GitBranch" },
  { name: "Hugging Face Transformers", category: "ml-frameworks", proficiency: 90, icon: "Bot" },
  { name: "OpenCV", category: "ml-frameworks", proficiency: 86, icon: "Eye" },
  { name: "YOLO", category: "ml-frameworks", proficiency: 88, icon: "Crosshair" },
  { name: "MLflow", category: "ml-frameworks", proficiency: 80, icon: "GitMerge" },
  { name: "Weights & Biases", category: "ml-frameworks", proficiency: 82, icon: "BarChart" },
  { name: "DVC", category: "ml-frameworks", proficiency: 75, icon: "FolderSync" },
  { name: "Computer Vision", category: "ml-frameworks", proficiency: 90, icon: "ScanEye" },
  { name: "NLP", category: "ml-frameworks", proficiency: 88, icon: "MessageSquareText" },
  { name: "Deep Learning", category: "ml-frameworks", proficiency: 92, icon: "BrainCircuit" },
  { name: "Reinforcement Learning", category: "ml-frameworks", proficiency: 76, icon: "Gamepad2" },
  { name: "GANs", category: "ml-frameworks", proficiency: 82, icon: "Sparkles" },
  { name: "Diffusion Models", category: "ml-frameworks", proficiency: 80, icon: "Wand2" },
  { name: "LLMs", category: "ml-frameworks", proficiency: 91, icon: "MessageCircle" },
  { name: "RAG", category: "ml-frameworks", proficiency: 89, icon: "FileSearch" },
  { name: "Fine-tuning", category: "ml-frameworks", proficiency: 87, icon: "Settings2" },
  { name: "LoRA", category: "ml-frameworks", proficiency: 85, icon: "SlidersHorizontal" },
  { name: "PEFT", category: "ml-frameworks", proficiency: 83, icon: "Tune" },
  { name: "ONNX", category: "ml-frameworks", proficiency: 78, icon: "Move" },
  { name: "TensorRT", category: "ml-frameworks", proficiency: 76, icon: "Gauge" },

  // Cloud
  { name: "AWS SageMaker", category: "cloud", proficiency: 84, icon: "Cloud" },
  { name: "AWS EC2", category: "cloud", proficiency: 80, icon: "Server" },
  { name: "AWS S3", category: "cloud", proficiency: 85, icon: "HardDrive" },
  { name: "AWS Lambda", category: "cloud", proficiency: 82, icon: "Zap" },
  { name: "AWS ECS", category: "cloud", proficiency: 78, icon: "Boxes" },
  { name: "GCP Vertex AI", category: "cloud", proficiency: 80, icon: "Cloud" },
  { name: "GCP Cloud Functions", category: "cloud", proficiency: 76, icon: "FunctionSquare" },
  { name: "GCP BigQuery", category: "cloud", proficiency: 74, icon: "Table" },
  { name: "Azure ML", category: "cloud", proficiency: 72, icon: "Cloud" },
  { name: "Azure Cognitive Services", category: "cloud", proficiency: 70, icon: "Brain" },

  // DevOps
  { name: "Docker", category: "devops", proficiency: 88, icon: "Container" },
  { name: "Kubernetes", category: "devops", proficiency: 78, icon: "Network" },
  { name: "GitHub Actions", category: "devops", proficiency: 85, icon: "Github" },
  { name: "CI/CD", category: "devops", proficiency: 84, icon: "ArrowRightLeft" },
  { name: "Terraform", category: "devops", proficiency: 72, icon: "Layers" },
  { name: "Prometheus", category: "devops", proficiency: 75, icon: "Activity" },
  { name: "Grafana", category: "devops", proficiency: 78, icon: "Monitor" },

  // Databases
  { name: "PostgreSQL", category: "databases", proficiency: 85, icon: "Database" },
  { name: "MongoDB", category: "databases", proficiency: 82, icon: "Database" },
  { name: "Redis", category: "databases", proficiency: 78, icon: "Database" },
  { name: "Pinecone", category: "databases", proficiency: 84, icon: "Database" },
  { name: "Weaviate", category: "databases", proficiency: 80, icon: "Database" },
  { name: "ChromaDB", category: "databases", proficiency: 82, icon: "Database" },
  { name: "FAISS", category: "databases", proficiency: 86, icon: "Database" },

  // Tools
  { name: "Git", category: "tools", proficiency: 92, icon: "GitBranch" },
  { name: "VS Code", category: "tools", proficiency: 94, icon: "Code2" },
  { name: "Linux", category: "tools", proficiency: 86, icon: "Terminal" },
  { name: "Figma", category: "tools", proficiency: 70, icon: "Figma" },
  { name: "Jupyter", category: "tools", proficiency: 90, icon: "Notebook" },
  { name: "LaTeX", category: "tools", proficiency: 78, icon: "FileText" },
  { name: "Blender", category: "tools", proficiency: 60, icon: "Box" },
];

export const skillCategories = [
  { id: "programming", label: "Programming Languages", icon: "Code2" },
  { id: "frameworks", label: "Frameworks", icon: "Layout" },
  { id: "ml-frameworks", label: "ML/AI & Tools", icon: "Brain" },
  { id: "cloud", label: "Cloud Platforms", icon: "Cloud" },
  { id: "devops", label: "DevOps & MLOps", icon: "GitBranch" },
  { id: "databases", label: "Databases & Vector Stores", icon: "Database" },
  { id: "tools", label: "Developer Tools", icon: "Wrench" },
] as const;

export const getSkillsByCategory = (category: Skill["category"]): Skill[] =>
  skills.filter((skill) => skill.category === category);

export const getFeaturedSkills = (count: number = 10): Skill[] =>
  [...skills].sort((a, b) => b.proficiency - a.proficiency).slice(0, count);
