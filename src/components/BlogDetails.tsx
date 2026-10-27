import Image from "next/image";
import { Blog } from "../../src/app/types/blog";

interface Props {
    blog: Blog;
}

const BlogDetails = ({ blog }: Props) => {
    return (
        <section className="blog-details">

            <Image
                src={blog.image}
                alt={blog.title}
                width={1200}
                height={600}
            />

            <h1>{blog.title}</h1>

            <p>
                By {blog.author} | {blog.date}
            </p>

            <p>{blog.content}</p>

        </section>
    );
};

export default BlogDetails;