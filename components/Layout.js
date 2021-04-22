import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a>
            <h1>
              <span>Healthy Breakfast</span>
              <span>Recipes</span>
            </h1>
            <h2>Here are our most loved trending recipes!</h2>
          </a>
        </Link>
      </header>

      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Copyright 2021 Flor :)</p>
      </footer>
    </div>
  )
}