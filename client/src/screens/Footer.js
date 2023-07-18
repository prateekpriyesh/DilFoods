import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="text-center text-lg-start bg-transparent text-muted fixed-bottom ">
        <section className="d-flex justify-content-center p-2 border-bottom">
          <div>
            <a
              href="www.linkedin.com/in/prateekpriyesh

"
              className="me-4 link-secondary"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://github.com/prateekpriyesh"
              className="me-4 link-secondary"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>

        <div className="text-center p-2">
          © 2022 {""}
          <a
            className="text-reset fw-bold"
            href="https://github.com/prateekpriyesh"
            style={{ textDecoration: "none" }}
          >
            Prateek
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
