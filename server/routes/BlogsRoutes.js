import express from "express"
// /api/blogs
import uploads from "../middlewares/Multer.js"
const router = express.Router()
import { VerifyAuth } from "../middlewares/VerifyAuth.js"
import { WrapAsync } from "../middlewares/WrapAsync.js"
import { newBlogs, allBlogs, recentBlogs, singleBlogs, editBlogs, deleteBlogs, writeComments } from "../controllers/BlogsController.js"
router.get("/all", VerifyAuth, WrapAsync(allBlogs))
router.get("/recent", VerifyAuth, WrapAsync(recentBlogs))
router.get("/:id/comments", VerifyAuth, WrapAsync(singleBlogs))
// router.get("/:id/comments", VerifyAuth, WrapAsync(getComments))
router.post("/:id/comments", VerifyAuth, WrapAsync(writeComments))
router.patch("/:id/comments/", VerifyAuth, WrapAsync(writeComments))
router.delete("/:id/comments/:commentId", VerifyAuth, WrapAsync(writeComments))
router.post("/new", VerifyAuth, uploads.single("image"), WrapAsync(newBlogs))
router.patch("/:id/edit", VerifyAuth, uploads.single("image"), WrapAsync(editBlogs))
router.delete("/:id/delete", VerifyAuth, WrapAsync(deleteBlogs))
export default router;