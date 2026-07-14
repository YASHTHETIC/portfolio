import { ResearchPaper } from "@/types";

export const researchPapers: ResearchPaper[] = [
  {
    id: "paper-1",
    title:
      "Efficient Object Detection in Low-Light Conditions Using Adaptive Neural Networks",
    authors: [
      "Yash Raj Kumar",
      "Priya Sharma",
      "Rajiv Gupta",
    ],
    venue: "IEEE International Conference on Pattern Recognition (ICPR)",
    year: 2023,
    abstract:
      "Object detection in low-light environments remains a significant challenge for autonomous systems and surveillance applications. Existing methods suffer from substantial performance degradation when operating under degraded illumination, often requiring computationally expensive preprocessing or domain-specific augmentation. In this paper, we propose an adaptive neural network architecture that dynamically adjusts its feature extraction pipeline based on estimated illumination conditions. Our approach introduces a novel Illumination-Aware Attention Module (IAAM) that recalibrates channel-wise feature responses using global illumination statistics extracted from a lightweight estimation network. We further propose a multi-scale contrast enhancement block that operates in the latent feature space rather than on raw pixels, preserving semantic information while improving discriminative features in dark regions. We evaluate our method on the ExDark dataset and two custom low-light driving datasets, demonstrating an 8.3% improvement in mAP@0.5 over the previous state-of-the-art while maintaining real-time inference speeds of 45 FPS on consumer-grade GPUs. Ablation studies confirm the contribution of each proposed component, and we provide analysis of failure modes and computational complexity comparisons.",
    pdfUrl: "https://arxiv.org/pdf/2307.xxxxx.pdf",
    arxivUrl: "https://arxiv.org/abs/2307.xxxxx",
    githubUrl: "https://github.com/yashrajkumar/low-light-detection",
    tags: [
      "Computer Vision",
      "Object Detection",
      "Low-Light",
      "Attention Mechanisms",
      "Adaptive Networks",
    ],
    citations: 12,
    featured: true,
  },
  {
    id: "paper-2",
    title:
      "Domain Adaptation for Cross-Dataset Medical Image Segmentation",
    authors: [
      "Yash Raj Kumar",
      "Ananya Reddy",
      "Rajiv Gupta",
    ],
    venue: "MICCAI Workshop on Medical Image Computing (MICCAI-W)",
    year: 2023,
    abstract:
      "Medical image segmentation models trained on one dataset often generalize poorly to data from different institutions, scanners, or patient populations due to domain shift. Collecting large annotated datasets from every clinical site is impractical due to privacy regulations and annotation costs. We present a domain adaptation framework for cross-dataset medical image segmentation that combines adversarial feature alignment with self-supervised pretext tasks designed specifically for volumetric medical data. Our method introduces a Anatomy-Aware Contrastive Loss that leverages anatomical priors to learn domain-invariant representations while preserving organ-specific geometric constraints. The framework operates in a semi-supervised setting, requiring only a small number of labeled target samples (as few as 5 volumes) alongside abundant labeled source data. We evaluate across three public benchmarks — ACDC (cardiac), KiTS19 (kidney tumor), and BraTS (brain tumor) — demonstrating average Dice score improvements of 4.2% over unsupervised domain adaptation baselines and 1.8% over state-of-the-art methods such as DANN and AdvEnt. We further show that our approach maintains segmentation quality under extreme domain shifts, including cross-modality adaptation from MRI to CT.",
    pdfUrl: "https://arxiv.org/pdf/2309.xxxxx.pdf",
    arxivUrl: "https://arxiv.org/abs/2309.xxxxx",
    githubUrl: "https://github.com/yashrajkumar/medical-domain-adaptation",
    tags: [
      "Medical Imaging",
      "Domain Adaptation",
      "Segmentation",
      "Contrastive Learning",
      "Semi-Supervised Learning",
    ],
    citations: 8,
    featured: true,
  },
];

export const getResearchById = (id: string): ResearchPaper | undefined =>
  researchPapers.find((paper) => paper.id === id);

export const getFeaturedResearch = (): ResearchPaper[] =>
  researchPapers.filter((paper) => paper.featured);
