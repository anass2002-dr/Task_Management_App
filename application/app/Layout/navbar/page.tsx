import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom border-solid bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse  justify-content-center "
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" href="/Utilisateur/ListUtilisateur">
              Home{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/Utilisateur/ListUtilisateur">
              Utilisateur
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/Tache/ListTache">
              Tache
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
