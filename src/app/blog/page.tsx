import InnerBanner from "@/src/components/Innerbaner";
import BlogCard from "../../components/BlogCard";

async function getBlogs() {
  const res = await fetch(
    "http://localhost:8000/blogs",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

const BlogPage = async () => {
  const blogs = await getBlogs();

  return (
    <>
      <InnerBanner />
      <section className="space">
        <div className="container">

          <div className="row">

            {blogs.map((blog: any) => (
              <div
                key={blog.id}
                className="col-lg-4 col-md-6 mb-4"
              >
                <BlogCard blog={blog} />
              </div>
            ))}

          </div>

        </div>
      </section>
    </>
  );
};

export default BlogPage;