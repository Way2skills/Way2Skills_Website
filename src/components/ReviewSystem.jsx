import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import './review.css'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCw96aRPnwP0H9FGyAqOvI4rwkSxouiUU",
  authDomain: "reviews-24384.firebaseapp.com",
  projectId: "reviews-24384",
  storageBucket: "reviews-24384.firebasestorage.app",
  messagingSenderId: "532577046914",
  appId: "1:532577046914:web:4dbf025c5c37d289cd3f9b",
  measurementId: "G-Y0CW1QTHZY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ReviewSystem = () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reviewsData = [];
      querySnapshot.forEach((doc) => {
        reviewsData.push({ id: doc.id, ...doc.data() });
      });
      setReviews(reviewsData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !comment || rating === 0) {
      setError('Please fill all fields and select a rating');
      return;
    }

    try {
      await addDoc(collection(db, 'reviews'), {
        name,
        comment,
        rating,
        createdAt: serverTimestamp()
      });
      setName('');
      setComment('');
      setRating(0);
    } catch (err) {
      setError('Error submitting review');
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} style={{ color: index < rating ? '#ffd700' : '#ccc' }}>
        ★
      </span>
    ));
  };

  return (
    <div className="review-system w-full">
      <div className="reviews-list  p-5">
        <h3 className='text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20'>
          What People are Saying
        </h3>
        <div className="overflow-x-auto flex gap-6 p-5 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 hover:scrollbar-thumb-blue-700">

  {reviews.map((review) => (
    <div key={review.id} className="review max-w-xs border border-red-200 backdrop-blur-lg p-6 rounded-xl shadow-lg flex-none transition-all transform hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center space-x-3 mb-4">
        <div className="text-xl font-bold text-orange-600">{review.name}</div>
        <div className="stars text-yellow-400">{renderStars(review.rating)}</div>
      </div>
   
      <p className=" text-white text-base  mt-4">{review.comment}</p>
      <div className="border-t pt-4 mt-4 border-gray-200">
        <small className="text-gray-500">{new Date(review.createdAt?.toDate()).toLocaleString()}</small>
      </div>
    </div>
  ))}
</div>


      </div>

      <form onSubmit={handleSubmit} className='p-10 w-auto border border-neutral-700 rounded-xl backdrop-blur-lg flex flex-col bg-transparent'>
        <h2 className='mb-5 text-xl'>Leave a Review</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            value={name}
            className='p-2 border border-neutral-300 rounded mb-4'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block mb-2">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='p-2 border border-neutral-300 rounded mb-4'
          />
        </div>
        
        <div className="star-rating mb-4">
          <label className="block mb-2">Rating:</label>
          {[...Array(5)].map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setRating(index + 1)}
              style={{ color: index < rating ? '#ffd700' : '#ccc' }}
              className="text-2xl"
            >
              ★
            </button>
          ))}
        </div>
        
        <button type="submit" className="px-6 py-3 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewSystem;
