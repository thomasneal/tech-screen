// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Idea = {
  title: string,
  description: string,
  lastUpdated: string
}

type Ideas = Idea[];

export default function getIdeas(
  req: NextApiRequest,
  res: NextApiResponse<Ideas>
) {
  res.status(200).json([
    { 
      title: 'Solve world hunger',
      description: 'Best way to world peace?',
      lastUpdated: "20.03.2023"
    },
    { 
      title: 'Hire a mentor to help me improve',
      description: 'Dan Page is going to love this!',
      lastUpdated: "23.03.2023"
    },
    { 
      title: 'Tiktok Playlist',
      description: 'Write an app or integration that will easily let you throw any TikToks you want into a playlist for sharing or watching again.',
      lastUpdated: "23.02.2023"
    },
    { 
      title: 'Hats for Squirrels',
      description: 'No one has does that one, right?',
      lastUpdated: "12.02.2023"
    },
    {
      title: 'Slash Server Reboot',
      description: 'A Cyperpunk graphic novel where coding is shown in a real way',
      lastUpdated: "07.11.2022"
    },
  ])
}
