This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).





## Getting Started

NOTE: This project is under development. But you can see a simple working prototype.

First clone the repo using,
```bash
git clone https://github.com/silasrajtr/gen-ui-demo.git
```
Install the dependencies
```bash
npm install
```
## API Provider

This project currently uses the **Groq API** for running LLMs. 

To get a free Groq api key - [click here](https://groq.com/).

Refer to `.env.example` and create a `.env.local` file inside the root folder, paste the groq api key to the `GROQ_API_KEY` variable and you're good to go.

If you want to switch to any other [provider](https://ai-sdk.dev/docs/foundations/providers-and-models) instead, you can update the code for [streamText](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text#streamtext) in the below file.

```
gen-ui-demo/app/api/chat/route.ts
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## What this project is all about.
This repo shows a basic generative UI implementation using AI SDK. While in action, this chatbot looks out for unclear or low-context prompts and turns them into question-options that show up as clickable UI components.  


This is what I mean by *generating question-options as clickable UI components* 👇  


See this example of a question with poor context and how humans naturally respond when missing details:


`How can I get a job?`
```
  We'll think of questions like:

      - Job, in which domain?
      
      - Which type, Full-time, Part-time, or an Internship?
      
      - What are the skills you have?
      
      - Do you have a company in mind?

```


Now, here’s the funny part:  
Chatbots nowadays carry this **burden of giving the perfect response on the very first try.** So most of the time, they shoot back something like:


```
That’s awesome!! 🎉🔥, Here’s what you can do right now:

✅ Polish up your resume so it really shines.

✅ Get your LinkedIn and other profiles active and engaging.

✅ Start applying consistently—momentum is key.
```



Sometimes chatbots do ask things back. But then we have to type the response again to guide them.  

> This is *token intensive* and *time consuming.*


My approach is a little different. 

Instead of wasting cycles, I make the agent check for ambiguity in user inputs and trigger an `interactiveQuestionTool`. This tool generates a question with multiple options and sends it to the front-end.  

The front-end then shows it as a quiz-like interactive UI component where the user just clicks instead of typing.  

This way, it’s faster, cheaper, and way more intuitive. That’s the whole idea of Generative UI powered by AI SDK.  

**TL;DR**  


Instead of forcing chatbots to guess or making users type long clarifications, this project makes the bot detect ambiguity and auto-generate multiple-choice style questions. The user just clicks → faster, cheaper, and more natural. That’s Generative UI with AI SDK.  

**NOTE:**

There's a room for improvement on my working demo and I'm working on it. like:
- Total UI. Everything!
- Multiple options selection.
- Include a free-text field below the choices in case none of them feel relatable to the user.




## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
