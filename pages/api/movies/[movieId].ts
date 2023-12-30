import { NextApiRequest,NextApiResponse } from "next";
import axios from 'axios';
import prismadb from '@/lib/prismadb'
import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method !== 'GET')
    return res.status(405).end();
    try{
        await serverAuth(req,res);
        const {movieId} =req.query;

        if(typeof movieId !== 'string')
        throw new Error("invalid id");
        
        if(!movieId)
        throw new Error("invalid id");

        const movie=await prismadb.movie.findUnique({
            where:{
                id:movieId
            }
        })
        if(!movie)
        throw new Error("invalid id");
        
        return res.status(200).json(movie);
    }catch(err)
    {
        console.log("mid err",err);
        res.status(400).end();
    }
}