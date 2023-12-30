 import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import movieJson from "@/public/movies.json";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    for(const item of movieJson)
    {
        try {
            if (req.method !== 'POST') {
            return res.status(405).end();
            }
                const user= await prismadb.movie.create({data :{
                title : item.title,
                description :item.description,
                videoUrl :item.videoUrl,
                thumbnailUrl :item.thumbnailUrl,
                genre :item.genre,
                duration :item.duration,
                likes :0,
    }});

            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ error: `Something went wrong: ${error}` });
        }
}
  //   try{
//     await prismadb.movie.create({data :{
//       title : item.title,
//       description :item.description,
//       videoUrl :item.videoUrl,
//       thumbnailUrl :item.thumbnailUrl,
//       genre :item.genre,
//       duration :item.duration,
//       likes :0,
//     }});
//     console.log("suka",item.title);
//   }
//   catch(err){
//     console.log("fok",err);
//   }
}
