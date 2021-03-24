import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import axios from "axios";
import DeleteMovieModal from "./DeleteMovieModal";
import e from "cors";

const Movie = (props) => {
  const { addToFavorites, movies, setMovies } = props;

  const [movie, setMovie] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const deleteMovie = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res.data);
        let newMoviesLocal = movies.filter((movie) => {
          if (Number(movie.id) !== Number(id)) {
            return movie;
          }
        });
        setMovies(newMoviesLocal);
        setDeleteModal(false);
        push("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="modal-page col">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{movie.title} Details</h4>
          </div>
          <div className="modal-body">
            <div className="flexContainer">
              <section className="movie-details">
                <div>
                  <label>
                    Title: <strong>{movie.title}</strong>
                  </label>
                </div>
                <div>
                  <label>
                    Director: <strong>{movie.director}</strong>
                  </label>
                </div>
                <div>
                  <label>
                    Genre: <strong>{movie.genre}</strong>
                  </label>
                </div>
                <div>
                  <label>
                    Metascore: <strong>{movie.metascore}</strong>
                  </label>
                </div>
                <div>
                  <label>Description:</label>
                  <p>
                    <strong>{movie.description}</strong>
                  </p>
                </div>
              </section>

              <section>
                <span className="m-2 btn btn-dark">Favorite</span>
                <Link
                  to={`/movies/edit/${movie.id}`}
                  className="m-2 btn btn-success"
                >
                  Edit
                </Link>
                <span className="delete">
                  <input
                    type="button"
                    className="m-2 btn btn-danger"
                    value="Delete"
                    onClick={() => setDeleteModal(true)}
                  />
                </span>
              </section>
            </div>
          </div>
        </div>
      </div>
      {deleteModal && (
        <DeleteMovieModal
          deleteMovie={deleteMovie}
          setDeleteModal={setDeleteModal}
        />
      )}
    </div>
  );
};

export default Movie;
