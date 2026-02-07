This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


To update your project on GitHub with the changes we just made (like the new docs folder), you can use the following standard Git commands in your terminal:

1. Stage the changes
This prepares all the new files for a commit:


git add .
2. Commit the changes
This saves the changes locally with a descriptive message:

powershell
git commit -m "added the style guide"
3. Push to GitHub
This sends your local commits to the remote repository on GitHub:

powershell
git push
Quick Tip: Check Status First
If you want to see exactly which files are about to be updated before you run the commands above, you can run:

powershell
git status
This will show you the new docs/ directory and any other files that have been modified.



2. If you already have the project on that device (Daily Sync)
If you already have the folder on your second device but want to get the latest changes you just pushed from your current device, you use the "pull" command:

powershell
git pull
This will download only the new changes (like the docs folder we just created) and merge them into your local files.

## E2E Testing

Run Playwright e2e tests locally:

```bash
npm run test:e2e
```

