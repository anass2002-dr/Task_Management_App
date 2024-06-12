export default function Navbar(){
    return (
<nav className="navbar navbar-expand-lg navbar-light border-bottom border-solid bg-light">
  

  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse  justify-content-center " id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Utilisateur</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Tache</a>
      </li>
      
    </ul>
  </div>
</nav>
    )
}