import express, { Request, Response } from "express";
import zod from "zod";
import { PrismaClient } from "@prisma/client";

export const router = express.Router();
const prisma = new PrismaClient();

const bookSchema = zod.object({
    title: zod.string(),
    description: zod.string().optional(),
    published_date: zod.string().refine((val) => !isNaN(Date.parse(val))),
    isbn: zod.string().optional(),
    authorId: zod.string().uuid(),
    categoryId: zod.string().uuid(),
})

router.post("/", async (req: any, res: any) => {
    try {
        const result = bookSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid Inputs"
            })
        }
        const { title, description, published_date, isbn, authorId, categoryId } = req.body;

        const existingBook = await prisma.book.findFirst({
            where: {
                title,
            }
        })

        if (existingBook) {
            return res.status(400).json({
                message: "Book already exists"
            })
        }

        const book = await prisma.book.create({
            data: {
                title,
                description,
                published_date,
                isbn,
                authorId,
                categoryId
            }
        })

        res.status(200).json({
            id: book.id,
            title: book.title,
            description: book.description,
            published_date: book.published_date,
            isbn: book.isbn,
            authorId: book.authorId,
            categoryId: book.categoryId
        })

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" })
    }
})

router.delete("/:id", async (req: any, res: any) => {
    try {
        const id = req.params.id;

        const book = await prisma.book.findFirst({
            where: {
                id
            }
        })

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            })
        }

        await prisma.book.delete({
            where: {
                id: book.id
            }
        });

        res.status(200).json({
            message: "Book deleted successfully"
        })

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" })
    }
})

router.put("/:id", async (req: any, res: any) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const book = await prisma.book.findFirst({
            where: {
                id
            }
        })

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            })
        }

        await prisma.book.update({
            where: {
                id: book.id
            },
            data: {
                title: body.title || book.title,
                description: body.description || book.description,
                published_date: body.published_date || book.published_date,
                isbn: body.isbn || book.isbn,
                authorId: body.authorId || book.authorId,
                categoryId: body.categoryId || book.categoryId
            }
        });

        res.status(200).json({
            message: "Book updated successfully"
        })

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/category/:id", async (req: any, res: any) => {

    try {
        const id = req.params.id;

        const books = await prisma.book.findMany({
            where: {
                categoryId: id
            }
        })

        if (!books || books.length == 0) {
            return res.status(404).json({
                message: "No Books from this category found"
            })
        }

        res.status(200).json({
            book: books.map(book => ({
                id: book.id,
                title: book.title,
                description: book.description,
                published_date: book.published_date,
                isbn: book.isbn,
                authorId: book.authorId,
                categoryId: book.categoryId
            }))
        })

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/author/:id", async (req: any, res: any) => {

    try {
        const id = req.params.id;

        const books = await prisma.book.findMany({
            where: {
                authorId: id
            }
        })

        if (!books || books.length == 0) {
            return res.status(404).json({
                message: "No Books from this author found"
            })
        }

        res.status(200).json({
            book: books.map(book => ({
                id: book.id,
                title: book.title,
                description: book.description,
                published_date: book.published_date,
                isbn: book.isbn,
                authorId: book.authorId,
                categoryId: book.categoryId
            }))
        })

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/:id", async (req: any, res: any) => {

    try {
        const id = req.params.id;

        const book = await prisma.book.findFirst({
            where: {
                id
            }
        })

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            })
        }

        res.status(200).json({
            id: book.id,
            title: book.title,
            description: book.description,
            published_date: book.published_date,
            isbn: book.isbn,
            authorId: book.authorId,
            categoryId: book.categoryId
        })

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" })
    }
})


router.get("/", async (req: any, res: any) => {

    try {
        const books = await prisma.book.findMany()

        if (!books || books.length == 0) {
            return res.status(400).json({
                message: "No Book found"
            })
        }

        res.status(200).json({
            book: books.map(book => ({
                id: book.id,
                title: book.title,
                description: book.description,
                published_date: book.published_date,
                isbn: book.isbn,
                authorId: book.authorId,
                categoryId: book.categoryId
            }))
        })

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" })
    }
})

