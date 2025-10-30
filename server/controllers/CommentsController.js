import Comment from "../models/CommentsSchema.js"
import {Blog} from "../models/BlogsSchema.js"
export const writeComments = async (req, res, next) => {
    const { id } = req.params
    // console.log("blog id: ", id)
    console.log("user: ", req?.user?._id)
    const { content } = req.body;
    console.log("content: ", content)
    const comments = await Comment.create({ content, user: req?.user?._id, blog: id })
    console.log("new comment: ", comments)
    const blog = await Blog.findByIdAndUpdate(id, { $push: { comments: comments._id } }, { new: true }).populate("comments")
    if (!blog) return next(new AppError(404, "No blog found"))
    console.log("updated Blog", blog)
    res.json(blog)
}
export const editComments = async (req, res, next) => {
    const { id, commentId } = req.params
    const { content } = req.body
    const comments = await Comment.findByIdAndUpdate(commentId, { content }, { new: true })
    if (!comments) return next(new AppError(404, "No comment found"))
    console.log("updated comment: ", comments)
    res.json(comments)
}
export const deleteComments = async (req, res, next) => {
    const { id, commentId } = req.params
    const comments = await Comment.findByIdAndDelete(commentId)
    if (!comments) return next(new AppError(404, "No comment found"))
    console.log("deleted comment: ", comments)
    res.json({ message: "Deleted Successfully" })
}