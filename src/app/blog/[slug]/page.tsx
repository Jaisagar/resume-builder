import InnerBanner from "@/src/components/Innerbaner";
import BlogDetails from "../../../components/BlogDetails";
import { notFound } from "next/navigation";

async function getBlog(slug: string) {
    const res = await fetch(
        `http://localhost:8000/blogs?slug=${slug}`,
        {
            cache: "no-store",
        }
    );

    const data = await res.json();

    return data[0];
}

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

const BlogDetailsPage = async ({
    params,
}: Props) => {

    const { slug } = await params;

    const blog = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    return (
        <>
            <InnerBanner />
            <div className="container"><BlogDetails blog={blog} /></div>
        </>
    )
};

export default BlogDetailsPage;