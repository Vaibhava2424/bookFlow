import React, { useState } from 'react';
import './index.css';
import Header from '../Header';
import Footer from '../Footer';

type FeedbackSuccess = {
  message: string;
  feedback: {
    _id: string;
    username: string;
    email: string;
    message: string;
  };
};

type FeedbackError = {
  error: string;
};

type FeedbackResponse = FeedbackSuccess | FeedbackError;

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (feedback.trim() === '') return;

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const username = localStorage.getItem('loggedInUser') || 'Anonymous';
    const email = localStorage.getItem('loggedInUserEmail') || '';

    try {
      const response = await fetch('https://bookflow-apis.onrender.com/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, message: feedback }),
      });


      let data: FeedbackResponse;
      try {
        data = (await response.json()) as FeedbackResponse;
      } catch {
        throw new Error('Server did not return valid JSON. Please check backend.');
      }

      if (response.ok && 'message' in data) {
        setSuccessMsg('Thank you for your feedback!');
        setFeedback('');
        setTimeout(() => setSuccessMsg(''), 3000);
      } else if ('error' in data) {
        setErrorMsg(data.error || 'Failed to submit feedback.');
        console.error('Error:', data.error);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Network error';
      setErrorMsg(message);
      console.error('Network error:', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="feedback-container">
        {/* Left Side Image */}
        <div className="feedback-card">
          <img
            src="https://res.cloudinary.com/dodfv5sbg/image/upload/v1758100146/people-using-appointment-business-application_i47wai.png"
            alt="feedback illustration"
            className="feedback-profile-img"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Feedback Form */}
        <div className="feedback-form-container">
          <form className="feedback-form" onSubmit={handleSubmit}>
            <h2>Submit Your Feedback</h2>

            {successMsg && <p className="success-msg">{successMsg}</p>}
            {errorMsg && <p className="error-msg">{errorMsg}</p>}

            <label htmlFor="feedback">Your Feedback</label>
            <textarea
              id="feedback"
              aria-label="Feedback"
              placeholder="Write your feedback..."
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              rows={6}
              required
            />

            <button
              type="submit"
              className="feedback-submit-btn"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Feedback;
