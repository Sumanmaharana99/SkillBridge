import { useState } from "react";
import API from "../api/axios";

function Reviews() {
  const [sessionId, setSessionId] =
    useState("");

  const [rating, setRating] =
    useState(5);

  const [review, setReview] =
    useState("");

  const submitReview = async () => {
    try {
      const res = await API.post(
        "/reviews",
        {
          sessionId,
          rating,
          review,
        }
      );

      alert("Review Added");

    } catch (error) {
      alert(
        error.response?.data?.message
      );
    }
  };

  return (
    <div>
      <h1>Review Mentor</h1>

      <input
        placeholder="Session ID"
        value={sessionId}
        onChange={(e) =>
          setSessionId(
            e.target.value
          )
        }
      />

      <br /><br />

      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) =>
          setRating(
            e.target.value
          )
        }
      />

      <br /><br />

      <textarea
        placeholder="Review"
        value={review}
        onChange={(e) =>
          setReview(
            e.target.value
          )
        }
      />

      <br /><br />

      <button
        onClick={submitReview}
      >
        Submit Review
      </button>
    </div>
  );
}

export default Reviews;