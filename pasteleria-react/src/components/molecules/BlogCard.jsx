import { Link } from 'react-router-dom'

function BlogCard({ blog }) {
  return (
    <div className="card h-100 shadow-sm">

      <div className="card-body d-flex flex-column">

        <small className="text-muted mb-2">
          {blog.date}
        </small>

        <h5 className="card-title">
          {blog.title}
        </h5>

        <p className="card-text">
          {blog.summary}
        </p>

        <div className="mt-auto">

          <Link
            to={`/blog/${blog.id}`}
            className="btn btn-outline-dark"
          >
            Leer más
          </Link>

        </div>

      </div>

    </div>
  )
}

export default BlogCard