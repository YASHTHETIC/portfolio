import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "building-rag-system-production",
    title: "Building a RAG System for Production: Lessons from Deploying at Scale",
    description:
      "A practical guide to building retrieval-augmented generation systems that actually work in production, covering chunking strategies, embedding model selection, hybrid search, and monitoring.",
    content: `When I first started building RAG (Retrieval-Augmented Generation) systems, the tutorials made it look simple: embed your documents, store them in a vector database, retrieve the top-K results, and feed them to an LLM. But deploying a RAG system that handles real user queries reliably at scale is a completely different challenge.

## The Chunking Problem

The first lesson I learned the hard way is that chunking strategy matters more than most people realize. Naive fixed-size chunking (say, 512 tokens with 50-token overlap) breaks apart tables, code blocks, and multi-step explanations. I experimented with several approaches:

- **Fixed-size chunking** — Simple but loses structural context
- **Recursive character splitting** — Better preservation of paragraph boundaries
- **Document-aware chunking** — Respects headings, lists, and code blocks
- **Semantic chunking** — Uses embedding similarity to find natural breakpoints

The best approach for our use case turned out to be document-aware chunking with a fallback to recursive splitting. We parsed documents using Unstructured, which handles PDF, DOCX, and HTML formats while preserving structural elements.

## Embedding Model Selection

We benchmarked six embedding models on our internal dataset of 50K technical documents:

| Model | Recall@10 | Latency (ms) | Dimensions |
|-------|-----------|--------------|------------|
| text-embedding-3-small | 82.1% | 45 | 1536 |
| text-embedding-3-large | 86.7% | 62 | 3072 |
| bge-large-en-v1.5 | 84.3% | 38 | 1024 |
| e5-large-v2 | 83.9% | 36 | 1024 |
| cohere.embed-v3 | 85.2% | 55 | 1024 |
| jina-embeddings-v2 | 84.8% | 42 | 768 |

We ultimately chose BGE-large for its balance of quality, speed, and self-hostability (important for data-sensitive documents).

## Hybrid Search is Non-Negotiable

Pure vector search misses exact keyword matches. If a user searches for "ERROR_CODE_4219", semantic similarity won't help — you need lexical matching. We implemented hybrid search combining:

1. **Dense retrieval** with BGE embeddings via ChromaDB
2. **Sparse retrieval** using BM25 via Elasticsearch
3. **Reciprocal Rank Fusion (RRF)** to combine results

This single change improved our answer accuracy by 6.3% in human evaluation.

## Grounding and Attribution

LLMs hallucinate. The key to building trust is source attribution. Every answer our system generates includes inline citations with highlighted source passages. We implemented this by:

- Tracking chunk-level metadata (document, page, section)
- Mapping retrieved chunks back to source spans
- Using prompt engineering to instruct the LLM to cite sources

## Monitoring in Production

We track several metrics using Prometheus and Grafana:
- Retrieval precision (sampled human eval weekly)
- Answer accuracy (user feedback buttons)
- P50/P95/P99 latency for retrieval and generation
- Embedding drift detection via cosine similarity distributions

Building a production RAG system is an iterative process. The initial prototype took a weekend; getting it production-ready took three months.`,
    date: "2024-05-12",
    author: "Yash Raj Kumar",
    tags: [
      "RAG",
      "LLMs",
      "Vector Databases",
      "MLOps",
      "Production ML",
    ],
    category: "Engineering",
    readTime: "12 min read",
    featured: true,
    thumbnail: "/images/blog/rag-production.jpg",
    ogImage: "/images/blog/rag-production-og.jpg",
  },
  {
    slug: "fine-tuning-llms-with-lora",
    title: "Fine-Tuning LLMs with LoRA: A Practical Guide to Efficient Adaptation",
    description:
      "How to fine-tune large language models using LoRA and PEFT techniques, achieving 95% of full fine-tuning quality with 1% of the parameters and compute.",
    content: `Fine-tuning a 7B parameter large language model on a single GPU was impossible two years ago. Today, with LoRA (Low-Rank Adaptation) and PEFT (Parameter-Efficient Fine-Tuning) techniques, it's not only possible — it's practical and cost-effective. Here's everything I learned fine-tuning CodeLlama for our code review system.

## Why LoRA?

Full fine-tuning of a 7B model requires approximately 56GB of VRAM in FP32 (or 28GB in FP16). LoRA reduces trainable parameters by 10,000x while maintaining 95%+ of full fine-tuning quality. The core insight: most weight updates during fine-tuning live in a low-rank subspace.

LoRA decomposes the weight update matrix ΔW into two low-rank matrices:
ΔW = BA where B ∈ R^(d×r), A ∈ R^(r×k), and r << min(d,k)

With r=16, you're training 0.1% of the original parameters.

## Our Setup

For fine-tuning CodeLlama-7B for code review:

**Hardware:** 1x NVIDIA A100 40GB (cloud instance)

**Configuration:**
\`\`\`python
from peft import LoraConfig, get_peft_model

lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj",
                     "gate_proj", "up_proj", "down_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)
\`\`\`

**Training:**
- Dataset: 25K code review examples (diff, comment, severity)
- Epochs: 3
- Learning rate: 2e-4 with cosine scheduler
- Batch size: 4 with gradient accumulation (effective batch size 16)
- Mixed precision: BF16
- Training time: ~6 hours

## Results

| Metric | Base Model | LoRA Fine-tuned | Full Fine-tuned |
|--------|-----------|-----------------|-----------------|
| Review Accuracy | 61.2% | 87.8% | 89.1% |
| Bug Detection F1 | 0.54 | 0.83 | 0.85 |
| Inference Latency | 2.8s | 2.8s | 2.8s |
| GPU Memory | 14GB | 15.2GB | 28GB |

The LoRA model achieves 97.3% of full fine-tuning quality at 54% of the memory cost.

## Key Takeaways

1. **Target the right modules.** Targeting attention projections + MLP layers gave us 3.2% better results than attention only.
2. **Rank matters less than you think.** We tested r=4, 8, 16, 32, 64. r=16 was the sweet spot; r=4 lost 1.8% accuracy, r=64 gained only 0.3%.
3. **Alpha scaling is important.** lora_alpha = 2*r consistently outperformed other scaling factors.
4. **Save and merge properly.** Always merge LoRA weights back into the base model before deployment for zero inference overhead.`,
    date: "2024-03-28",
    author: "Yash Raj Kumar",
    tags: [
      "LoRA",
      "Fine-tuning",
      "LLMs",
      "PEFT",
      "Deep Learning",
    ],
    category: "Tutorial",
    readTime: "10 min read",
    featured: true,
    thumbnail: "/images/blog/lora-finetuning.jpg",
    ogImage: "/images/blog/lora-finetuning-og.jpg",
  },
  {
    slug: "real-time-object-detection-optimization",
    title: "Optimizing YOLOv8 for Real-Time Inference: From 200ms to 42ms",
    description:
      "A step-by-step walkthrough of optimizing a YOLOv8 object detection model for production inference, achieving 4.7x speedup through quantization, ONNX conversion, and TensorRT optimization.",
    content: `When our object detection system needed to process multiple camera streams in real-time, the raw PyTorch inference time of 200ms per frame was unacceptable. Here's how we achieved a 4.7x speeddown to 42ms per frame without sacrificing detection quality.

## Profiling First

Before optimizing anything, we profiled the baseline model:
- **Model:** YOLOv8m (medium) — 25.9M parameters
- **Input:** 640×640×3 RGB image
- **Hardware:** NVIDIA RTX 4090
- **Baseline latency:** 200ms (PyTorch FP32)

The profiler showed:
- 45% time in convolution layers
- 22% time in NMS (Non-Maximum Suppression)
- 18% time in preprocessing (resize, normalize)
- 15% time in postprocessing and data transfer

## Step 1: ONNX Export

The simplest win. ONNX Runtime optimizes the computation graph and uses a more efficient execution backend:

\`\`\`python
from ultralytics import YOLO

model = YOLO("yolov8m.pt")
model.export(format="onnx", imgsz=640, half=True)
\`\`\`

**Result:** 200ms → 142ms (29% reduction)

## Step 2: ONNX Runtime Optimization

Enable ONNX Runtime's graph optimizations and execution providers:

\`\`\`python
import onnxruntime as ort

session = ort.InferenceSession(
    "yolov8m.onnx",
    providers=["CUDAExecutionProvider", "CPUExecutionProvider"],
    sess_options=ort.SessionOptions()
)
session.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL
\`\`\`

**Result:** 142ms → 108ms (cumulative 46% reduction)

## Step 3: FP16 Quantization

Convert weights from FP32 to FP16. On modern GPUs with Tensor Cores, this effectively doubles throughput for matrix operations:

\`\`\`python
model.export(format="onnx", imgsz=640, half=True)
\`\`\`

**Result:** 108ms → 72ms (cumulative 64% reduction)

## Step 4: TensorRT Compilation

TensorRT performs layer fusion, kernel auto-tuning, and memory optimization specific to your GPU:

\`\`\`python
import tensorrt as trt

# Convert ONNX to TensorRT engine
logger = trt.Logger(trt.Logger.WARNING)
builder = trt.Builder(logger)
network = builder.create_network(...)
parser = trt.OnnxParser(network, logger)
# ... build engine with FP16 enabled
\`\`\`

**Result:** 72ms → 42ms (cumulative 79% reduction)

## Step 5: NMS Optimization

The built-in YOLO NMS uses a naive O(n²) algorithm. Replacing it with a CUDA-accelerated batched NMS gave an additional 8ms per frame.

## Final Pipeline

\`\`\`
Input → Letterbox Resize (2ms) → TensorRT Inference (30ms) → CUDA NMS (8ms) → Output
Total: 42ms → 23.8 FPS
\`\`\`

## Quality Impact

We validated that these optimizations had minimal impact on detection quality:

| Config | mAP@0.5 | Latency | Speedup |
|--------|---------|---------|---------|
| PyTorch FP32 | 94.2% | 200ms | 1.0x |
| ONNX FP32 | 94.2% | 142ms | 1.4x |
| ONNX FP16 | 94.1% | 72ms | 2.8x |
| TensorRT FP16 | 94.0% | 42ms | 4.7x |
| TensorRT INT8 | 93.2% | 31ms | 6.5x |

The FP16 TensorRT model loses only 0.2% mAP while being 4.7x faster. The INT8 model is even faster but the 1.0% mAP loss wasn't acceptable for our use case.`,
    date: "2024-02-15",
    author: "Yash Raj Kumar",
    tags: [
      "YOLO",
      "Object Detection",
      "TensorRT",
      "Optimization",
      "Computer Vision",
    ],
    category: "Engineering",
    readTime: "8 min read",
    featured: false,
    thumbnail: "/images/blog/yolo-optimization.jpg",
    ogImage: "/images/blog/yolo-optimization-og.jpg",
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((post) => post.slug === slug);

export const getFeaturedBlogPosts = (): BlogPost[] =>
  blogPosts.filter((post) => post.featured);
