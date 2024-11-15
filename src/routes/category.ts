import express, { Request, Response } from "express";
import zod from "zod";
import { PrismaClient } from "@prisma/client";

export const router = express.Router();
const prisma = new PrismaClient();

const categorySchema = zod.object({
    name: zod.string(),
    description: zod.string().optional()
})

router.post("/", async (req: Request<{}, {}, { name: string; description?: string }>, res: any) => {
    try {
        const result = categorySchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid Inputs"
            })
        }
        const { name, description } = req.body;

        const existingCategory = await prisma.author.findFirst({
            where: {
                name,
            }
        })

        if (existingCategory) {
            return res.status(400).json({
                message: "Category already exists"
            })
        }


        const category = await prisma.category.create({
            data: {
                name,
                description
            }
        })

        res.status(200).json({
            id: category.id,
            name: category.name,
            description: category.description
        })

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" })
    }
})

router.delete("/", async (req: any, res: any) => {
    try {
        const result = categorySchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid Inputs"
            })
        }
        const { name, description } = req.body;
        const category = await prisma.category.findFirst({
            where: {
                name,
                description
            }
        })

        if (!category) {
            return res.status(400).json({
                message: "Category not found"
            })
        }

        await prisma.category.delete({
            where: {
                id: category.id
            }
        });

        res.status(200).json({
            message: "Category deleted successfully"
        })

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/", async (req: any, res: any) => {

    try {
        const categories = await prisma.category.findMany();

        if (!categories || categories.length == 0) {
            return res.status(400).json({
                message: "No categories found"
            })
        }

        res.status(200).json({
            category: categories.map(category => ({
                id: category.id,
                name: category.name,
                description: category.description
            }))
        })
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" })
    }
})
