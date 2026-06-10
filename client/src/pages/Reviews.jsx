import { useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import { useParams } from "react-router-dom";
function Reviews() {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
const { sessionId } = useParams();

  const submitReview = async () => {
    if (!review.trim()) {
      alert("Please write a review");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await API.post("/reviews", {
        sessionId,
        rating,
        review,
      });
      alert("Review Added");
      setRating(5);
      setReview("");
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Leave a Review</h1>
          <p className="text-gray-500 mt-1">Share your experience to help others</p>
        </div>

        {/* Review Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Rating */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none transform transition hover:scale-110"
                    aria-label={`Rate ${star} stars`}
                  >
                    <span className="text-3xl md:text-4xl">
                      {star <= rating ? "⭐" : "☆"}
                    </span>
                  </button>
                ))}
                <span className="ml-3 text-sm text-gray-500">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Average"}
                  {rating === 4 && "Good"}
                  {rating === 5 && "Excellent"}
                </span>
              </div>
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Review
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows="5"
                placeholder="Write your review here... What did you learn? How was the mentor?"
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
              />
              <p className="text-xs text-gray-400 mt-1 text-right">
                {review.length} characters
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={submitReview}
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </div>

        {/* Helpful Note */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Your review helps build a trusted learning community
        </div>
      </div>
    </MainLayout>
  );
}

export default Reviews;