"use client";
import Link from "next/link";
import "./globals.css";

import { useState, useEffect } from "react";

type Question = {
  question: string;
  options: string[];
  answer: number;
};

const questions: Question[] = [
  {
    question: "What is Next.js primarily used for?",
    options: [
      "Backend development",
      "Mobile app development",
      "Server-side rendering and static site generation",
      "Game development",
    ],
    answer: 2,
  },
  {
    question: "Which command is used to create a new Next.js application?",
    options: [
      "create-next-app my-app",
      "next init my-app",
      "npx create-next-app my-app",
      "next new my-app",
    ],
    answer: 2,
  },
  {
    question: "What is the default directory for Next.js pages?",
    options: ["/components", "/views", "/pages", "/src"],
    answer: 2,
  },
  {
    question: "Which of the following is a built-in feature of Next.js?",
    options: [
      "Database management",
      "Server-side rendering",
      "File upload",
      "Push notifications",
    ],
    answer: 1,
  },
  {
    question: "Which file does Next.js use for environment variables?",
    options: [".env", ".env.local", ".next", "config.json"],
    answer: 1,
  },
  {
    question: "What is the purpose of the `getStaticProps` function?",
    options: [
      "Fetch data at build time",
      "Fetch data on every request",
      "Render data on the client-side",
      "Pre-render pages at runtime",
    ],
    answer: 0,
  },
  {
    question: "Which of the following is used for routing in Next.js?",
    options: ["/router", "useHistory", "pages directory", "useLocation"],
    answer: 2,
  },
  {
    question: "Which hook is used to access route parameters in Next.js?",
    options: ["useParams", "useRoute", "useQuery", "useRouter"],
    answer: 3,
  },
  {
    question: "Which component is used to handle dynamic routes in Next.js?",
    options: ["/dynamic", "[param]", "pages/_app", "/param"],
    answer: 1,
  },
  {
    question: "How does Next.js handle images?",
    options: [
      "By using an external CDN",
      "By optimizing images automatically",
      "By compressing images manually",
      "It does not handle images",
    ],
    answer: 1,
  },
  {
    question: "What does `getServerSideProps` do?",
    options: [
      "Fetches data at build time",
      "Fetches data on the server at runtime",
      "Generates static files",
      "Handles form submissions",
    ],
    answer: 1,
  },
  {
    question: "Which method in Next.js is used for static page generation?",
    options: ["getServerSideProps", "getInitialProps", "getStaticProps", "getData"],
    answer: 2,
  },
  {
    question: "What is the purpose of `next/head` in Next.js?",
    options: [
      "It helps in adding meta tags, title, and other head elements",
      "It provides a routing mechanism",
      "It adds global CSS",
      "It fetches data from the server",
    ],
    answer: 0,
  },
  {
    question: "Which is the default rendering method for pages in Next.js?",
    options: [
      "Static rendering",
      "Server-side rendering",
      "Client-side rendering",
      "Incremental static regeneration",
    ],
    answer: 0,
  },
  {
    question: "What is the purpose of the `pages/_app.js` file?",
    options: [
      "To define global layout and state management",
      "To configure routing",
      "To set up API routes",
      "To define static props",
    ],
    answer: 0,
  },
  {
    question: "What is Incremental Static Regeneration (ISR) in Next.js?",
    options: [
      "It allows static pages to be updated after build",
      "It is used to generate dynamic routes",
      "It is a way of performing server-side rendering",
      "It speeds up image loading",
    ],
    answer: 0,
  },
  {
    question: "What is the purpose of `getInitialProps` in Next.js?",
    options: [
      "Fetch data at build time",
      "Fetch data on every request",
      "Fetch data on the client-side",
      "Pre-render pages at runtime",
    ],
    answer: 1,
  },
  {
    question: "How do you optimize a Next.js project for production?",
    options: [
      "By disabling SSR",
      "By running the `next build` command",
      "By adding a caching layer",
      "By using only client-side rendering",
    ],
    answer: 1,
  },
  {
    question: "Which of these is a Next.js feature for static file serving?",
    options: [
      "Public folder",
      "Static folder",
      "Static files in the `src` directory",
      "Pages folder",
    ],
    answer: 0,
  },
  {
    question: "Which command is used to start a Next.js development server?",
    options: [
      "next dev",
      "npm start",
      "next run",
      "npm run dev",
    ],
    answer: 3,
  },
  {
    question: "In Next.js, where do you define API routes?",
    options: [
      "In the `pages/api` folder",
      "In the `src/api` folder",
      "In the `components/api` folder",
      "In the `lib/api` folder",
    ],
    answer: 0,
  },
  {
    question: "How does Next.js handle code splitting?",
    options: [
      "It only splits code when a new page is requested",
      "It does not handle code splitting",
      "By splitting the main bundle into smaller chunks",
      "By using dynamic imports",
    ],
    answer: 3,
  },
  {
    question: "What is the main advantage of Next.js over React?",
    options: [
      "It allows server-side rendering and static site generation",
      "It is simpler to set up",
      "It has a larger community",
      "It supports TypeScript by default",
    ],
    answer: 0,
  },
  {
    question: "What is the correct way to create a dynamic route in Next.js?",
    options: [
      "Use the `[param]` folder structure",
      "Use `pages/dynamic/[param].js`",
      "Use `pages/[param].js`",
      "Use `pages/[dynamic].js`",
    ],
    answer: 1,
  },
  {
    question: "What feature does Next.js use to allow on-demand page generation?",
    options: [
      "Static Generation",
      "Server-side Rendering",
      "Incremental Static Regeneration",
      "Client-side Rendering",
    ],
    answer: 2,
  },
  {
    question: "Which command is used to build a Next.js application for production?",
    options: [
      "next build",
      "npm build",
      "next generate",
      "npm run build",
    ],
    answer: 0,
  },
  {
    question: "What type of component is used for pages in Next.js?",
    options: [
      "React components",
      "Functional components",
      "Class components",
      "HTML templates",
    ],
    answer: 0,
  },
  {
    question: "How do you add global CSS to a Next.js app?",
    options: [
      "Import it in the `_app.js` file",
      "Import it in `pages/index.js`",
      "Use inline styles in the components",
      "Import it in `components/Layout.js`",
    ],
    answer: 0,
  },
  {
    question: "Which Next.js feature allows for optimized image loading?",
    options: [
      "Image Component",
      "Dynamic Import",
      "Lazy Loading",
      "Preloading",
    ],
    answer: 0,
  },
  {
    question: "Which of these is a valid way to deploy a Next.js app?",
    options: [
      "Vercel",
      "Netlify",
      "Heroku",
      "All of the above",
    ],
    answer: 3,
  },
  {
    question: "How can you add metadata (like SEO) in a Next.js page?",
    options: [
      "Use the `meta` tag in `next/head`",
      "Modify the `public/index.html` file",
      "Add metadata in `pages/_app.js`",
      "Add metadata directly to components",
    ],
    answer: 0,
  },
  {
    question: "What is the `next/image` component used for?",
    options: [
      "To lazy load images",
      "To optimize and serve images in modern formats",
      "To generate static images",
      "To handle image uploads",
    ],
    answer: 1,
  },
  {
    question: "In which folder are static files placed in a Next.js project?",
    options: [
      "/public",
      "/static",
      "/assets",
      "/images",
    ],
    answer: 0,
  },
  {
    question: "What is a feature of `getStaticPaths`?",
    options: [
      "It generates static pages at runtime",
      "It defines paths for dynamic routes in Static Generation",
      "It handles server-side rendering",
      "It fetches data for a page",
    ],
    answer: 1,
  },
  {
    question: "What does the `next/link` component do in Next.js?",
    options: [
      "Creates links between pages without full page reload",
      "Handles routing in the client-side",
      "Serves static files",
      "Handles form submissions",
    ],
    answer: 0,
  },
  {
    question: "Which method allows for pre-rendering a page at build time?",
    options: [
      "getStaticProps",
      "getServerSideProps",
      "getInitialProps",
      "getDynamicProps",
    ],
    answer: 0,
  },
  {
    question: "What is a benefit of using Server-side rendering in Next.js?",
    options: [
      "Faster first page load",
      "More control over SEO",
      "No client-side JavaScript needed",
      "All of the above",
    ],
    answer: 3,
  },
  {
    question: "What is the function of `next export`?",
    options: [
      "It exports the app to static HTML",
      "It exports the app to a Docker container",
      "It exports only the assets",
      "It allows export to mobile",
    ],
    answer: 0,
  },
  {
    question: "Which of the following allows dynamic imports in Next.js?",
    options: [
      "React.lazy",
      "next/dynamic",
      "next/import",
      "React.createElement",
    ],
    answer: 1,
  },
  {
    question: "What is the recommended method for handling large files in Next.js?",
    options: [
      "Use `next/large-files`",
      "Use the `public` directory",
      "Serve from an external CDN",
      "Handle manually in the `pages` directory",
    ],
    answer: 2,
  },
  {
    question: "What does Next.js do automatically for you?",
    options: [
      "Builds the app for production",
      "Sets up routing",
      "Optimizes performance",
      "All of the above",
    ],
    answer: 3,
  },
  {
    question: "How does Next.js handle nested routes?",
    options: [
      "It uses dynamic routing",
      "It doesn't support nested routes",
      "It automatically generates routes",
      "It uses a custom API route",
    ],
    answer: 0,
  },
];

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(30);

  useEffect(() => {
    if (timer > 0 && !showAnswer) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      setShowAnswer(true);
      setTimeout(() => nextQuestion(), 3000);
    }
  }, [timer, showAnswer]);

  const handleAnswer = (index: number) => {
    setSelectedOption(index);
    setShowAnswer(true);
    setTimeout(() => nextQuestion(), 3000);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowAnswer(false);
      setTimer(30);
    } else {
      alert("Quiz Completed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold mb-6">{questions[currentQuestion].question}</h2>
        <p className="mb-4 text-gray-500 text-lg">Time left: <span className="font-semibold">{timer}s</span></p>
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-3 border rounded-lg text-left transition duration-300 text-black font-medium text-lg ${
                showAnswer
                  ? index === questions[currentQuestion].answer
                    ? "bg-green-500 text-white"
                    : index === selectedOption
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                  : "bg-white hover:bg-gray-300"
              }`}
              onClick={() => !showAnswer && handleAnswer(index)}
              disabled={showAnswer}
            >
              {option}
            </button>
          ))}
        </div>
        {showAnswer && (
          <p className="mt-6 text-lg font-semibold text-black">
            {selectedOption === questions[currentQuestion].answer ? "✅ Correct!" : "❌ Wrong!"}
          </p>
        )}
      </div>
      <footer className="w-full py-4 text-center mt-auto">
    <p className="text-gray-500 text-sm">
      Created with ❤ by <b> <Link href="https://www.youtube.com/@onestepsuccessofficial/videos" target="_blank"> OneStepSuccess </Link></b>
    </p>
  </footer>
    </div>
  );
}
