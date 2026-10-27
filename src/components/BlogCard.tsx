import Image from "next/image";
import Link from "next/link";
import { Blog } from "../../src/app/types/blog";

interface Props {
    blog: Blog;
}

const BlogCard = ({ blog }: Props) => {
    return (
        <section className="blog-details">

            <Image
                src={blog.image}
                alt={blog.title}
                width={1200}
                height={600}
            />

            <h4>{blog.title}</h4>

            <p>
                By {blog.author} | {blog.date}
            </p>

            <p>{blog.content.substring(0, 100)}...</p>
            <Link href={`/blog/${blog.slug}`} className="btn">
                Read More Details
            </Link>

        </section>
    );
};

export default BlogCard;