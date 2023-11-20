import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer-container">
      <footer className="footer">
        <strong>
          <p>
            &copy;{currentYear}{" "}
            <a
              href="https://github.com/isaandrea12/ToDoList"
              className="containerLink"
              target="_blank"
              rel="noreferrer"
            >
              Isabel Muñiz
            </a>
          </p>
        </strong>
      </footer>
    </div>
  );
};

export default Footer;
