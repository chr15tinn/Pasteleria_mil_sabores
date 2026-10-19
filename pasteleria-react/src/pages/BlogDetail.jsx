import { Link, useParams } from 'react-router-dom'
import { blogs } from '../data/blogs'

function BlogDetail() {

  const { id } = useParams()

  const blog =
    blogs.find(
      item => item.id === id
    )


  if (!blog) {

    return (
      <main className="container py-5">

        <div className="alert alert-danger text-center">
          No se encontró la publicación.
        </div>

        <div className="text-center">

          <Link
            to="/blog"
            className="btn btn-dark"
          >
            Volver al blog
          </Link>

        </div>

      </main>
    )
  }


  return (
    <main className="container py-5">

      <article
        className="card shadow-sm p-4 mx-auto"
        style={{
          maxWidth: '850px'
        }}
      >

        <small className="text-muted">
          {blog.date}
        </small>

        <h1
          className="my-3"
          style={{
            color: '#8B4513'
          }}
        >
          {blog.title}
        </h1>

        <p className="lead">
          {blog.summary}
        </p>

        <hr />

        <p>
          {blog.content}
        </p>

        <div className="mt-4">

          <Link
            to="/blog"
            className="btn btn-outline-dark"
          >
            Volver al blog
          </Link>

        </div>

      </article>

    </main>
  )
}

export default BlogDetail