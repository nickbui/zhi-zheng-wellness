/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SessionType, Product, ContentVideo, InstagramPost, EbookChapter } from "./types";

export const SESSION_TYPES: SessionType[] = [
  {
    id: "coaching-1on1",
    title: "1-on-1 Spiritual Guiding",
    duration: "60 Minutes",
    description: "Deep-dive session to debug your inner narratives, find clarity, and craft a mindful, purposeful plan for your path.",
    price: "$150",
    icon: "spa"
  },
  {
    id: "discovery-call",
    title: "Initial Discovery Call",
    duration: "30 Minutes",
    description: "Brief alignment conversation to assess your needs, understanding inner blocks, and exploring if coaching fits your journey.",
    price: "Free",
    icon: "contact_support"
  },
  {
    id: "collective",
    title: "Group Conscious Sanctuary",
    duration: "90 Minutes",
    description: "A community meditation circle with collective breathing, silent awareness, group therapy discussions, and radical empathy.",
    price: "$35",
    icon: "groups_3"
  },
  {
    id: "mentorship",
    title: "3-Month Inner Alignment",
    duration: "Ongoing Guidance",
    description: "Comprehensive alignment journey with biweekly 75m video sessions, message support, custom self-reflective software, and guidance.",
    price: "$999",
    icon: "temp_preferences_custom"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "inner-care-book",
    title: "Inner Care",
    subtitle: "A Simple Guide to Coming Alive",
    price: "$19.99",
    description: "An acclaimed handbook bridging modern engineering mindsets and ancient eastern spiritual wisdom. Zhi Zheng's core principles for debugging your inner narrative and rewriting it with profound self-compassion.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDw3mXjsJgtJV0lRabdvgGVtf-dAG-8zdMbYNiajv22HHlCRM4KlpbJfbASYMSOCwKSki3pJk57C4CtnGJyxPwVdrxhUTwTOR-OSgGAQ_3p_OdN7GsV-rwHUQjSyqKohcM4b0o4Q6xBEleuF1zbed6zDUTG1PVEGEQYv9xfRjl9thGnrGWrQ6HCnU717Hu0-cqVDHM13q-VbLn9OC7z2yZpf16WqID7jOjyWZWzKjFcnF9jrxu39aXhCjGkdFlsqiszJX_Rzx15Qww",
    category: "book",
    features: [
      "Hardcover beautiful textured cream paper edition",
      "Over 25 interactive mindfulness exercises and software-style flowcharts",
      "Personalized dedication signature from Zhi Zheng (pre-ordered only)",
      "Instant access to high-quality audio recordings for all chapters"
    ]
  },
  {
    id: "guided-breathing-audios",
    title: "Misty Valleys",
    subtitle: "The Signature Ambient Soundtracks Pack",
    price: "$14.99",
    description: "A digital audio sanctuary optimized to pace your breath, settle adrenaline, or help you focus. Recorded during Zhi's retreats in the isolated misty highlands of Southeast Asia with authentic singing bowls, forest streams, and woodwinds.",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLvHnmSG0VK1ADjUCZL2HHFwXSr5fU8dZrSLvK03PAogCgulEGoyvFzJIXqKg2cirksI2OA9NJJrgtrbLRx7EMnD7rybPYjIZZenff-TfUJqYQwUC6CnIduugiBrRQAimwrMN6EUbe8GGEq3nRrSGYe-aOt3I4DQ1JgQS0_q5pU0tVxMuortvU4KOWSY5nlvwrl5ZV4DRw7IHFRBRffcb-3NhvacBiv1ltl5BqUs4T7TbbigDSQ7TybpxIo",
    category: "audio",
    features: [
      "6 high-fidelity immersive tracks (WAV, FLAC, and MP3)",
      "Binaural beats engineered to support theta-wave deep sleep and focus",
      "Includes 5m, 15m, and 30m instrumental breath-guiding loops"
    ]
  },
  {
    id: "self-reflective-journal",
    title: "Inner Care Journal",
    subtitle: "A Structured Narrative Diary",
    price: "$24.99",
    description: "A beautifully crafted, physical, plant-based linen notebook optimized for self-therapy. Following the narrative-restructuring system, it acts like a debugger layout where you trace mental logs, variables, loops, and conditions.",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLvC8rGd07UjifJSIHcLQ4e8Z1THJBhm7o4q7hMKGjy7dVhAzSUX_QLk7QkGt3Ep_pmq_4jiEOaKb5dXCQ3gjR9dOEej_dIeA0b9dzC0RkTx_PDReyNgBUbRrdLXh7Q5QOgHJ2cP0Y4mi2wgqAOtgPcFRkudYwZJdhelWYhRYSWcD9E5vTsrEd_HHQxRHOzW1Rg5mhvgvL6b8JO76ALg6JMbsfTD2oR75vHUxkLA4hcbaAJjcuLKAcRIBSU",
    category: "resource",
    features: [
      "100% organic, locally sourced bamboo-pulp heavy sheets",
      "90 days of structured, daily morning and evening mindfulness templates",
      "Custom flat-lay binding with leaf patterns embossed on the linen spine"
    ]
  }
];

export const VIDEOS: ContentVideo[] = [
  {
    id: "video-peace-5m",
    title: "5 Minutes of Inner Peace — Daily Alignment Session",
    duration: "5:20",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // standard placeholder
    thumbnailUrl: "https://lh3.googleusercontent.com/aida/AP1WRLtKb_BTqsaB3h1T3GTD2MPxk8NmTN2AK6CWFYJV1FAFgk4jjpaqlpbYo6SRf8PCwOjFxPK4SgYS-czTlugslglfoHLEh7PpRoVoTbckgL1jKpAbuwIPEV39Ju6Xrs1dz8SDTnnvkBAe66feOywSscIudDw3ZndPp8vjWjlqoMd7fqqU8F-rhBePIuXmYdDk2OtMWfYRXSYA-dtNij1O4SO7ycJrw4Gwj806rkZE-YrjQ_JG1bkw8DbAvn0"
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "insta-1",
    imageUrl: "https://lh3.googleusercontent.com/aida/AP1WRLvC8rGd07UjifJSIHcLQ4e8Z1THJBhm7o4q7hMKGjy7dVhAzSUX_QLk7QkGt3Ep_pmq_4jiEOaKb5dXCQ3gjR9dOEej_dIeA0b9dzC0RkTx_PDReyNgBUbRrdLXh7Q5QOgHJ2cP0Y4mi2wgqAOtgPcFRkudYwZJdhelWYhRYSWcD9E5vTsrEd_HHQxRHOzW1Rg5mhvgvL6b8JO76ALg6JMbsfTD2oR75vHUxkLA4hcbaAJjcuLKAcRIBSU",
    caption: "Breathe in green fields. Breathe out stale algorithms. Connecting back with nature during this morning's outdoor sanctuary.",
    likes: "1,240",
    comments: "42"
  },
  {
    id: "insta-2",
    imageUrl: "https://lh3.googleusercontent.com/aida/AP1WRLvHnmSG0VK1ADjUCZL2HHFwXSr5fU8dZrSLvK03PAogCgulEGoyvFzJIXqKg2cirksI2OA9NJJrgtrbLRx7EMnD7rybPYjIZZenff-TfUJqYQwUC6CnIduugiBrRQAimwrMN6EUbe8GGEq3nRrSGYe-aOt3I4DQ1JgQS0_q5pU0tVxMuortvU4KOWSY5nlvwrl5ZV4DRw7IHFRBRffcb-3NhvacBiv1ltl5BqUs4T7TbbigDSQ7TybpxIo",
    caption: "Finding peace in physical rituals. Slow-brewed herbal tea on a rainy Tuesday can be as profound as an hour of quiet meditation.",
    likes: "890",
    comments: "31"
  },
  {
    id: "insta-3",
    imageUrl: "https://lh3.googleusercontent.com/aida/AP1WRLvHnmSG0VK1ADjUCZL2HHFwXSr5fU8dZrSLvK03PAogCgulEGoyvFzJIXqKg2cirksI2OA9NJJrgtrbLRx7EMnD7rybPYjIZZenff-TfUJqYQwUC6CnIduugiBrRQAimwrMN6EUbe8GGEq3nRrSGYe-aOt3I4DQ1JgQS0_q5pU0tVxMuortvU4KOWSY5nlvwrl5ZV4DRw7IHFRBRffcb-3NhvacBiv1ltl5BqUs4T7TbbigDSQ7TybpxIo", // re-using high quality image
    caption: "Letting go of the need for an optimal runtime. Sometimes standing completely empty is where the beauty actually writes itself.",
    likes: "1,105",
    comments: "28"
  },
  {
    id: "insta-4",
    imageUrl: "https://lh3.googleusercontent.com/aida/AP1WRLvC8rGd07UjifJSIHcLQ4e8Z1THJBhm7o4q7hMKGjy7dVhAzSUX_QLk7QkGt3Ep_pmq_4jiEOaKb5dXCQ3gjR9dOEej_dIeA0b9dzC0RkTx_PDReyNgBUbRrdLXh7Q5QOgHJ2cP0Y4mi2wgqAOtgPcFRkudYwZJdhelWYhRYSWcD9E5vTsrEd_HHQxRHOzW1Rg5mhvgvL6b8JO76ALg6JMbsfTD2oR75vHUxkLA4hcbaAJjcuLKAcRIBSU", // re-using high quality image
    caption: "The first chapter of 'Inner Care' is now available for download. It explores how we can restructure the compiler in our deep minds.",
    likes: "2,014",
    comments: "59"
  }
];

export const EBOOK_CHAPTER_ONE: EbookChapter = {
  title: "Chapter 1: The Spiritual Bug",
  subtitle: "Understanding the Compiler of the Mind",
  introduction: "In software engineering, we spend our lives chasing exceptions. We step through trace logs, set breakpoints, and analyze memory heap allocations to explain why an application behaves erratically. When I was running teams in Silicon Valley, I lived by the mantra that there was a logical, elegant explanation for every glitch. But when my own soul glitched—dropping connections with my family, scaling up my panic attacks, and running a permanent loop of quiet exhaustion—I couldn't locate the source file. It was only when I shut down the monitors and sat in complete forest silence, that I discovered the truth: we are compiling our life experience through faulty scripts.",
  sections: [
    {
      heading: "I. The Infinite Narrative Loop",
      content: "A mental self-criticism loop acts exactly like an infinite loop in a background thread. It consumes 100% of our CPU processing power, draining our physical batteries while producing absolutely useful output. The core bug lies in the narrator inside our heads. We let automated old scripts, mostly inherited from our youth, run on start-up. They classify every minor failure as a fatal error, forcing us into a cycle of mental recovery that never quite terminates."
    },
    {
      heading: "II. Self-Compassion as the Exception Handler",
      content: "When a compiler encounters an unexpected input, it doesn't try to shame the source file. It gracefully catches the issue, logs it, and continues executing. Self-compassion is your mind's exception handler. Instead of crashing into self-judgment when things go wrong, we can learn to say: 'Ah, this is a painful moment. Let me catch it, breathe, and resolve it gently.'"
    },
    {
      heading: "III. Refactoring your Inner Core",
      content: "To rewrite your narrative, you first need to stop the server. You need complete, silent presence. In silence, you realize that you are not the program running on screen; you are the developer watching it compile. This simple shift in identity from code to coder is where true peace begins."
    }
  ],
  exercises: [
    {
      title: "The Inner-Narrator Code Review",
      description: "A simple 10-minute mental review session whenever you feel high stress, exhaustion, or severe self-criticism.",
      steps: [
        "Stop what you are doing. Sit upright, close your eyes, and take three deep breaths.",
        "Locate the emotional block in your body (tight chest, throat tension, knot in stomach). Just observe it without trying to fix it.",
        "Ask yourself: 'What script is currently running layout inside my head?' Write down the exact phrase (e.g., 'You aren't productive enough' or 'You are failing').",
        "Perform a gentle code review: Is this script true? Is it helpful? Re-write that variable with a statement of compassion (e.g., 'I am doing the best I can right now. I deserve rest.')"
      ]
    }
  ]
};
