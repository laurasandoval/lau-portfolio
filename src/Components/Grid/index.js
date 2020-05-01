import React from "react";
import "./index.scss";

function Grid(props) {
  return (
    <section className="grid">
      <article>
        <figure className="project-artwork">
          <img
            src="https://jose.work/selected-works-img/santiago-transit-map-s4.png?date=2609191050"
            alt="Dummy project image description"
          ></img>
        </figure>
        <div className="project-info">
          <h3>Dummy Project Title</h3>
          <p>Dummy Project Description</p>
        </div>
      </article>
    </section>
  );
}

export default Grid;
