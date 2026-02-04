# NameGen - AI-Powered Business Name Generator

Live Demo: https://namegen-ten.vercel.app/

An intelligent web application that helps entrepreneurs and businesses generate creative, available names using AI. This freelance project provides a streamlined interface to craft the perfect brand identity by combining industry-specific keywords, style preferences, and real-time domain availability checks.
*This application was developed as a freelance tool for real-world business naming and branding exercises. The core naming logic and domain/trademark checks are functional, but integrated API services or design details may evolve based on client needs.*

## ✨ Features

*   **AI-Powered Name Generation:** Leverages a large language model (like Groq's LLaMA) to produce creative, relevant, and catchy business name suggestions.
*   **Multi-Parameter Input:** Fine-tune results based on **industry**, descriptive **keywords**, and preferred naming **styles** (e.g., Modern, Classic, Tech).
*   **Real-Time Domain & Trademark Checks:** Instantly verifies the availability of generated names across multiple domain extensions (`.com`, `.net`, `.org`, etc.) and provides a basic trademark search.
*   **Save & Compare Names:** Allows users to save their favorite generated names to a local list for easy comparison and review.
*   **Centralized Configuration:** All text strings, UI labels, and constant values (like industry and style options) are abstracted into separate data files, ensuring easy maintenance and future localization.

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18.17 or later recommended)
*   npm, yarn, pnpm, or bun

### Installation & Running

1.  **Clone the repository**
    ```bash
    git clone https://github.com/pranansh-s/namegen.git
    cd namegen
    ```
2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory and add your API keys:
    ```bash
    NEXT_PUBLIC_OPENAI_SECRET=your_groq_api_key_here
    NEXT_PUBLIC_RAPID=your_rapidapi_key_here
    ```
4.  **Run the development server**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
5.  **Open your browser** and navigate to `http://localhost:3000`.

*This project was created as part of a freelance engagement.*

---

*This project was created as part of a freelance engagement.*
