import { blogs } from '../data/blogs'
import BlogCard from '../components/molecules/BlogCard'

function Blog() {
  return (
    <main className="container py-5">

      <div className="text-center mb-5">

        <h1
          style={{
            color: '#8B4513'
          }}
        >
          Blog
        </h1>

        <p>
          Consejos, novedades y contenido relacionado
          con el mundo de la repostería.
        </p>

      </div>


      <div className="row g-4">

        {blogs.map(blog => (

          <div
            key={blog.id}
            className="col-12 col-md-6 col-lg-4"
          >

            <BlogCard blog={blog} />

          </div>

        ))}

      </div>

    </main>
  )
}

export default Blog