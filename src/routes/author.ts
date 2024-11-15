import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import zod from "zod";
export const router = express.Router();

const prisma = new PrismaClient;

const authorSchema = zod.object({
    name: zod.string(),
    bio: zod.string().optional()
})
router.post("/", async (req: Request<{}, {}, { name: string; bio?: string }>, res: any) => {
    try {
        const result = authorSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid Inputs"
            })
        }
        const { name, bio } = req.body;

        const existingUser = await prisma.author.findFirst({
            where: {
                name,
            }
        })

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const author = await prisma.author.create({
            data: {
                name,
                bio: bio || ""
            }
        })

        res.status(200).json({
            id: author.id,
            name: author.name,
            bio: author.bio
        })

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" })
    }
})

router.delete("/", async (req: any, res: any) => {
    try {
        const result = authorSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid Inputs"
            })
        }
        const { name, bio } = req.body;
        const author = await prisma.author.findFirst({
            where: {
                name,
                bio
            }
        })

        if (!author) {
            return res.status(400).json({
                message: "Author not found"
            })
        }

        await prisma.author.delete({
            where: {
                id: author.id
            }
        });

        res.status(200).json({
            message: "Author deleted successfully"
        })

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/", async (req: any, res: any) => {

    try {
        const authors = await prisma.author.findMany();

        if (!authors || authors.length == 0) {
            return res.status(400).json({
                message: "No authors found"
            })
        }

        res.status(200).json({
            author: authors.map(author => ({
                id: author.id,
                name: author.name,
                bio: author.bio
            }))
        })
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" })
    }
})

