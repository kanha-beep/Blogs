import { Blog } from "../models/BlogsSchema.js"
import Comment from "../models/CommentsSchema.js"
export const recentBlogs = async (req, res, next) => {
    const blog = await Blog.find({})
    // const sort = req.query.sort || "all"
    const limit = req.query.limit || 3
    const skip = blog.length - limit
    const page = req.query.page || 1
    // const sortOptions = {}
    // if (sort === "all") sortOptions.createdAt = 1
    // else if (sort === "design") sortOptions.category = "design"
    // else sortOptions.category = sort
    // console.log("sortOptions: ", sortOptions)
    const blogs = await Blog.find({}).skip(skip).limit(limit).populate("comments")
    // console.log("recent blogs: ", blogs)
    if (!blogs) return next(new AppError(404, "No blogs found"))
    res.json(blogs)
}
export const allBlogs = async (req, res, next) => {
    const limit = parseInt(req.query.limit) || 3
    const page = parseInt(req.query.page) || 1
    const sort = req.query.sort || "all"
    const skip = (page - 1) * limit
    console.log("page", page, "skip", skip, "limit", limit)
    const filter = {}
    if (sort !== "all") filter.category = sort
    const sortOptions = { createdAt: -1 }
    // if (sort !== "all") filter.category = sort
    // if (sort === "all") sortOptions.createdAt = -1
    // if (sort === "design") sortOptions.design = -1
    // if (sort === "software") sortOptions.software = 1
    // if (sort === "research") sortOptions.research = 1
    console.log("sortOptions: ", sortOptions)
    const blogs = await Blog.find(filter).sort(sortOptions).skip(skip).limit(limit).populate("comments")
    // console.log("all blogs: ", blogs)
    const totalBlogs = await Blog.countDocuments(filter)
    if (!blogs) return next(new AppError(404, "No blogs found"))
    res.json({ blogs, totalBlogs, page })
}
export const newBlogs = async (req, res, next) => {
    // console.log("image: ", req.file)
    const { title, content, author, category } = req.body
    if (!title || !content || !author) return next(new AppError(400, "All fields are required"))
    const newBlog = await Blog.create({ title, content, author, image: req.file.filename, category })
    console.log("new blog: ", newBlog)
    res.json({ message: "New Blog Created Successfully", newBlog })
}
export const singleBlogs = async (req, res, next) => {
    const { id } = req.params
    const blog = await Blog.findById(id).populate("comments").populate({ path: "user", select: "name" }).populate("user")
    const blogs = await Blog.findById(id)
        .populate({
            path: "comments",           // first populate comments array
            populate: {
                path: "user",             // then populate the user field inside each comment
                select: "name"            // only select the name field from User
            }
        })
        .populate("user", "name");
    // console.log("naye blog: ", blog);
    if (!blog) return next(new AppError(404, "No blog found"))
    res.json(blogs)
}
// export const getComments = async (req, res, next) => {
//     const { id, commentId } = req.params
//     const comments = await Comment.findById(commentId).populate("user")
//     if (!comments) return next(new AppError(404, "No comment found"))
//     // console.log("comment: ", comments)
//     res.json(comments)
// }
export const writeComments = async (req, res, next) => {
    const { id } = req.params
    console.log("blog id: ", id)
    console.log("user: ", req?.user?.id)
    const { content } = req.body;
    console.log("content: ", content)
    const comments = await Comment.create({ content, user: req?.user?.id , blog: id})
    console.log("new comment: ", comments)
    const blog = await Blog.findByIdAndUpdate(id, { $push: { comments: comments._id } }, { new: true }).populate("comments")
    if (!blog) return next(new AppError(404, "No blog found"))
    console.log("updated Blog", blog)
    res.json(blog)
}
export const editBlogs = async (req, res, next) => {
    const { id } = req.params
    const { title, content, author, category } = req.body
    const existingBlog = await Blog.findById(id).populate("comments")
    const image = req.file ? req.file.filename : existingBlog.image
    console.log("title", title, "content", content, "author", author, "category", category, "image", image)
    const blog = await Blog.findByIdAndUpdate(id, { title, content, author, category, image }, { new: true })
    if (!blog) return next(new AppError(404, "No blog found"))
    console.log("updated blog: ", blog)
    res.json({ message: "Updated Successfully", blog })
}
export const deleteBlogs = async (req, res, next) => {
    const { id } = req.params
    const blog = await Blog.findByIdAndDelete(id)
    if (!blog) return next(new AppError(404, "No blog found"))
    res.json({ message: "Deleted Successfully" })
}