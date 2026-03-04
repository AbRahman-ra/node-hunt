# Node Hunt

- An AI Job Hunting tool for companies in Bahrain, using [sijilat.bh](https://sijilat.bh)
- Made using Bun 🥟 and TypeScript 💙

## What does this application do?

- Fetch data, process it, reformat it
- Cold emailing companies with a preset batch size (default 1)
- Using a jitter of 1 minute between emails to prevent spam
- Creating personalized email template depending on the company name and industry
- Tracks the job applications by implementing simple observability mechanism through logging
    - Application status: `initiated` / `applied`
    - Last action: `logs`
    - Next not-yet-applied-to company: `offset`

## How to use it

- You have to figure it out 🤷‍♂️, but [`services/Job.ts`](./services/Job.ts) is a good starting point
