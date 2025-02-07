import React, { useEffect } from "react"; // Importez useEffect
import CurrencyConverter from "./CurrencyConverter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faGitlab, faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./App.css";

function App() {
  // Utilisez useEffect pour changer le titre de la page
  useEffect(() => {
    document.title = "Conv Devises 💱"; 
      

  }, []); // Le tableau vide signifie que cela ne s'exécute qu'une fois au montage

  return (
    <div className="App">
      
      <CurrencyConverter />
      
      <footer>
        <div className="footer-content">
          <p>Développé par Yassine El Miloudi</p>
          <div className="social-links">
            <a href="https://sites.google.com/view/yassinelmiloudi/accueil" target="_blank" rel="noopener noreferrer" aria-label="Portfolio">
              <FontAwesomeIcon icon={faGlobe} />
            </a>
            <a href="https://gitlab.com/yassinelmiloudi31" target="_blank" rel="noopener noreferrer" aria-label="GitLab">
              <FontAwesomeIcon icon={faGitlab} />
            </a>
            <a href="mailto:yassinelmiloudi31@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Gmail">
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a href="https://www.linkedin.com/in/yassine-el-miloudi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;