"use client";
import "./globals.css";
import { useState, useEffect } from "react";

type Question = {
  question: string;
  options: string[];
  answer: number;
};

const questions: Question[] = [
  { question: "What is the recommended way to handle routing in Next.js?", options: ["React Router", "pages directory", "Vue Router", "Angular Router"], answer: 1 },
  { question: "How do you create an API route in Next.js?", options: ["Create a file in the /api directory", "Use Express.js", "Modify next.config.js", "Add a script in package.json"], answer: 0 },
  { question: "What does 'next export' do?", options: ["Generates a fully static site", "Deletes the .next folder", "Runs the Next.js server", "Creates a new Next.js app"], answer: 0 },
  { question: "Which method is used to fetch data at build time in Next.js?", options: ["getServerSideProps", "useEffect", "getStaticProps", "fetch"], answer: 2 },
  { question: "What is the primary advantage of using 'next/link'?", options: ["Prefetching pages for faster navigation", "Better UI styling", "Automatic API handling", "None of the above"], answer: 0 },
  { question: "Which command is used to start the Next.js development server?", options: ["next run", "npm start", "next dev", "yarn start"], answer: 2 },
  { question: "What does 'next/image' optimize?", options: ["Font loading", "SEO metadata", "Image performance", "JavaScript bundle size"], answer: 2 },
  { question: "How do you define a dynamic route in Next.js?", options: ["[id].js", "{id}.jsx", "{id}.ts", "[param]/index.js"], answer: 0 },
  { question: "What is the role of middleware in Next.js?", options: ["Handle routing", "Modify requests and responses", "Optimize SEO", "Manage database operations"], answer: 1 },
  { question: "How can you customize the global styles in a Next.js app?", options: ["Modify _app.js", "Edit styles/global.css", "Use styled-components", "All of the above"], answer: 3 },
  { question: "What is the purpose of `getStaticPaths` in Next.js?", options: ["To fetch data at build time for static pages", "To define dynamic routes for static generation", "To handle API requests", "To configure middleware"], answer: 1 },
  { question: "Which hook is used for programmatic navigation in Next.js?", options: ["useHistory", "useNavigate", "useRouter", "useLocation"], answer: 2 },
  { question: "What is the purpose of `getServerSideProps`?", options: ["To fetch data at build time", "To fetch data at request time", "To define dynamic routes", "To handle API routes"], answer: 1 },
  { question: "How do you create a nested route in Next.js?", options: ["Create a folder inside the `pages` directory", "Use `next/router`", "Modify `next.config.js`", "Use `next/link`"], answer: 0 },
  { question: "What is the purpose of `next/head`?", options: ["To manage API routes", "To add metadata to the HTML `<head>`", "To handle server-side rendering", "To manage state"], answer: 1 },
  { question: "Which file is used to customize the default App component in Next.js?", options: ["_app.js", "_document.js", "index.js", "next.config.js"], answer: 0 },
  { question: "What is the purpose of `next/dynamic`?", options: ["To lazy load components", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you access query parameters in a Next.js page?", options: ["props.query", "props.params", "props.router.query", "useRouter().query"], answer: 3 },
  { question: "What is the purpose of `next/script`?", options: ["To optimize images", "To load third-party scripts", "To handle API routes", "To manage state"], answer: 1 },
  { question: "How do you enable TypeScript in a Next.js project?", options: ["Create a `tsconfig.json` file", "Install `typescript` and `@types/react`", "Rename files to `.tsx`", "All of the above"], answer: 3 },
  { question: "What is the purpose of `next/config`?", options: ["To manage environment variables", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you handle 404 errors in Next.js?", options: ["Create a `404.js` file in the `pages` directory", "Use `next/error`", "Modify `next.config.js`", "Use `next/link`"], answer: 0 },
  { question: "What is the purpose of `next/amp`?", options: ["To create AMP pages", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you deploy a Next.js app to Vercel?", options: ["Push the code to GitHub and connect to Vercel", "Use the Vercel CLI", "Both A and B", "None of the above"], answer: 2 },
  { question: "What is the purpose of `next/error`?", options: ["To handle API routes", "To customize error pages", "To optimize images", "To manage state"], answer: 1 },
  { question: "How do you enable ESLint in a Next.js project?", options: ["Install `eslint` and create an `.eslintrc` file", "Use `next/lint`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/analytics`?", options: ["To track page views", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable internationalization (i18n) in Next.js?", options: ["Modify `next.config.js`", "Use `next-i18next`", "Both A and B", "None of the above"], answer: 2 },
  { question: "What is the purpose of `next/legacy/image`?", options: ["To provide backward compatibility for the old Image component", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable SWR (stale-while-revalidate) in Next.js?", options: ["Install `swr` and use it in your components", "Modify `next.config.js`", "Use `next/swr`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/constants`?", options: ["To define global constants", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable PWA (Progressive Web App) in Next.js?", options: ["Use `next-pwa`", "Modify `next.config.js`", "Both A and B", "None of the above"], answer: 2 },
  { question: "What is the purpose of `next/plugins`?", options: ["To add custom plugins", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Sentry for error tracking in Next.js?", options: ["Use `@sentry/nextjs`", "Modify `next.config.js`", "Both A and B", "None of the above"], answer: 2 },
  { question: "What is the purpose of `next/optimized-images`?", options: ["To optimize images", "To handle API routes", "To manage state", "None of the above"], answer: 0 },
  { question: "How do you enable GraphQL in a Next.js project?", options: ["Use `apollo-server-micro`", "Use `next-apollo`", "Both A and B", "None of the above"], answer: 2 },
  { question: "What is the purpose of `next/with-css`?", options: ["To enable CSS support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Redux in a Next.js project?", options: ["Use `next-redux-wrapper`", "Modify `next.config.js`", "Both A and B", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-redux`?", options: ["To enable Redux support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Tailwind CSS in a Next.js project?", options: ["Install `tailwindcss` and configure it", "Use `next/tailwind`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-tailwind`?", options: ["To enable Tailwind CSS support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Sass in a Next.js project?", options: ["Install `sass` and use `.scss` files", "Use `next/sass`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-sass`?", options: ["To enable Sass support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable LESS in a Next.js project?", options: ["Install `less` and use `.less` files", "Use `next/less`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-less`?", options: ["To enable LESS support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Styled Components in a Next.js project?", options: ["Install `styled-components` and `babel-plugin-styled-components`", "Use `next/styled-components`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-styled-components`?", options: ["To enable Styled Components support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Emotion in a Next.js project?", options: ["Install `@emotion/react` and `@emotion/styled`", "Use `next/emotion`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-emotion`?", options: ["To enable Emotion support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable CSS Modules in a Next.js project?", options: ["Use `.module.css` files", "Use `next/css-modules`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-css-modules`?", options: ["To enable CSS Modules support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable PostCSS in a Next.js project?", options: ["Install `postcss` and configure it", "Use `next/postcss`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-postcss`?", options: ["To enable PostCSS support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable PurgeCSS in a Next.js project?", options: ["Install `purgecss` and configure it", "Use `next/purgecss`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-purgecss`?", options: ["To enable PurgeCSS support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Google Fonts in a Next.js project?", options: ["Use `next/font`", "Add a `<link>` tag in `_document.js`", "Both A and B", "None of the above"], answer: 2 },
  { question: "What is the purpose of `next/with-google-fonts`?", options: ["To enable Google Fonts support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Font Awesome in a Next.js project?", options: ["Install `@fortawesome/react-fontawesome`", "Use `next/fontawesome`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-fontawesome`?", options: ["To enable Font Awesome support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Material-UI in a Next.js project?", options: ["Install `@material-ui/core` and `@material-ui/icons`", "Use `next/material-ui`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-material-ui`?", options: ["To enable Material-UI support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Bootstrap in a Next.js project?", options: ["Install `bootstrap` and import it in `_app.js`", "Use `next/bootstrap`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-bootstrap`?", options: ["To enable Bootstrap support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Ant Design in a Next.js project?", options: ["Install `antd` and import it in `_app.js`", "Use `next/antd`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-antd`?", options: ["To enable Ant Design support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Chakra UI in a Next.js project?", options: ["Install `@chakra-ui/react` and `@emotion/react`", "Use `next/chakra-ui`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-chakra-ui`?", options: ["To enable Chakra UI support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Storybook in a Next.js project?", options: ["Install `@storybook/react` and configure it", "Use `next/storybook`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-storybook`?", options: ["To enable Storybook support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Jest in a Next.js project?", options: ["Install `jest` and configure it", "Use `next/jest`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-jest`?", options: ["To enable Jest support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Cypress in a Next.js project?", options: ["Install `cypress` and configure it", "Use `next/cypress`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-cypress`?", options: ["To enable Cypress support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable ESLint in a Next.js project?", options: ["Install `eslint` and configure it", "Use `next/eslint`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-eslint`?", options: ["To enable ESLint support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Prettier in a Next.js project?", options: ["Install `prettier` and configure it", "Use `next/prettier`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-prettier`?", options: ["To enable Prettier support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Husky in a Next.js project?", options: ["Install `husky` and configure it", "Use `next/husky`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-husky`?", options: ["To enable Husky support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Lint-Staged in a Next.js project?", options: ["Install `lint-staged` and configure it", "Use `next/lint-staged`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-lint-staged`?", options: ["To enable Lint-Staged support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Commitizen in a Next.js project?", options: ["Install `commitizen` and configure it", "Use `next/commitizen`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-commitizen`?", options: ["To enable Commitizen support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Semantic Release in a Next.js project?", options: ["Install `semantic-release` and configure it", "Use `next/semantic-release`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-semantic-release`?", options: ["To enable Semantic Release support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Docker in a Next.js project?", options: ["Create a `Dockerfile` and configure it", "Use `next/docker`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-docker`?", options: ["To enable Docker support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Kubernetes in a Next.js project?", options: ["Create a `k8s` directory and configure it", "Use `next/kubernetes`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-kubernetes`?", options: ["To enable Kubernetes support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Terraform in a Next.js project?", options: ["Create a `terraform` directory and configure it", "Use `next/terraform`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-terraform`?", options: ["To enable Terraform support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Serverless in a Next.js project?", options: ["Install `serverless` and configure it", "Use `next/serverless`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-serverless`?", options: ["To enable Serverless support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable GraphQL Code Generator in a Next.js project?", options: ["Install `graphql-codegen` and configure it", "Use `next/graphql-codegen`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-graphql-codegen`?", options: ["To enable GraphQL Code Generator support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Apollo Client in a Next.js project?", options: ["Install `@apollo/client` and configure it", "Use `next/apollo-client`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-apollo-client`?", options: ["To enable Apollo Client support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Relay in a Next.js project?", options: ["Install `relay` and configure it", "Use `next/relay`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-relay`?", options: ["To enable Relay support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Prisma in a Next.js project?", options: ["Install `prisma` and configure it", "Use `next/prisma`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-prisma`?", options: ["To enable Prisma support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable TypeORM in a Next.js project?", options: ["Install `typeorm` and configure it", "Use `next/typeorm`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-typeorm`?", options: ["To enable TypeORM support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Sequelize in a Next.js project?", options: ["Install `sequelize` and configure it", "Use `next/sequelize`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-sequelize`?", options: ["To enable Sequelize support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Mongoose in a Next.js project?", options: ["Install `mongoose` and configure it", "Use `next/mongoose`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-mongoose`?", options: ["To enable Mongoose support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Firebase in a Next.js project?", options: ["Install `firebase` and configure it", "Use `next/firebase`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-firebase`?", options: ["To enable Firebase support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable AWS Amplify in a Next.js project?", options: ["Install `aws-amplify` and configure it", "Use `next/aws-amplify`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-aws-amplify`?", options: ["To enable AWS Amplify support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Google Cloud in a Next.js project?", options: ["Install `google-cloud` and configure it", "Use `next/google-cloud`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-google-cloud`?", options: ["To enable Google Cloud support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Azure in a Next.js project?", options: ["Install `azure` and configure it", "Use `next/azure`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-azure`?", options: ["To enable Azure support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable DigitalOcean in a Next.js project?", options: ["Install `digitalocean` and configure it", "Use `next/digitalocean`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-digitalocean`?", options: ["To enable DigitalOcean support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Heroku in a Next.js project?", options: ["Install `heroku` and configure it", "Use `next/heroku`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-heroku`?", options: ["To enable Heroku support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Netlify in a Next.js project?", options: ["Install `netlify` and configure it", "Use `next/netlify`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-netlify`?", options: ["To enable Netlify support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Vercel in a Next.js project?", options: ["Install `vercel` and configure it", "Use `next/vercel`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-vercel`?", options: ["To enable Vercel support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable GitHub Actions in a Next.js project?", options: ["Create a `.github/workflows` directory and configure it", "Use `next/github-actions`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-github-actions`?", options: ["To enable GitHub Actions support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable CircleCI in a Next.js project?", options: ["Create a `.circleci` directory and configure it", "Use `next/circleci`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-circleci`?", options: ["To enable CircleCI support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Travis CI in a Next.js project?", options: ["Create a `.travis.yml` file and configure it", "Use `next/travis-ci`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-travis-ci`?", options: ["To enable Travis CI support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable GitLab CI in a Next.js project?", options: ["Create a `.gitlab-ci.yml` file and configure it", "Use `next/gitlab-ci`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-gitlab-ci`?", options: ["To enable GitLab CI support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Jenkins in a Next.js project?", options: ["Create a `Jenkinsfile` and configure it", "Use `next/jenkins`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-jenkins`?", options: ["To enable Jenkins support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Drone in a Next.js project?", options: ["Create a `.drone.yml` file and configure it", "Use `next/drone`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-drone`?", options: ["To enable Drone support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Buddy in a Next.js project?", options: ["Create a `buddy.yml` file and configure it", "Use `next/buddy`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-buddy`?", options: ["To enable Buddy support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Bitbucket Pipelines in a Next.js project?", options: ["Create a `bitbucket-pipelines.yml` file and configure it", "Use `next/bitbucket-pipelines`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-bitbucket-pipelines`?", options: ["To enable Bitbucket Pipelines support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Azure Pipelines in a Next.js project?", options: ["Create a `azure-pipelines.yml` file and configure it", "Use `next/azure-pipelines`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-azure-pipelines`?", options: ["To enable Azure Pipelines support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Google Cloud Build in a Next.js project?", options: ["Create a `cloudbuild.yaml` file and configure it", "Use `next/google-cloud-build`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-google-cloud-build`?", options: ["To enable Google Cloud Build support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable AWS CodeBuild in a Next.js project?", options: ["Create a `buildspec.yml` file and configure it", "Use `next/aws-codebuild`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-aws-codebuild`?", options: ["To enable AWS CodeBuild support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Docker Compose in a Next.js project?", options: ["Create a `docker-compose.yml` file and configure it", "Use `next/docker-compose`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-docker-compose`?", options: ["To enable Docker Compose support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Kubernetes Helm in a Next.js project?", options: ["Create a `helm` directory and configure it", "Use `next/kubernetes-helm`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-kubernetes-helm`?", options: ["To enable Kubernetes Helm support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Terraform Cloud in a Next.js project?", options: ["Create a `terraform` directory and configure it", "Use `next/terraform-cloud`", "Modify `next.config.js`", "None of the above"], answer: 0 },
  { question: "What is the purpose of `next/with-terraform-cloud`?", options: ["To enable Terraform Cloud support", "To handle API routes", "To optimize images", "To manage state"], answer: 0 },
  { question: "How do you enable Serverless Framework in a Next.js project?", options: ["Install `serverless` and configure it", "Use `next/serverless-framework`", "Modify `next.config.js`", "None of the above"], answer: 0 },
]

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
      <footer className="mt-6 text-gray-500 text-sm font-normal"> <a href="https://www.youtube.com/@onestepsuccessofficial/videos"> <b> Created with ❤ by OneStepSuccess</b></a></footer>
    </div>
  );
}
