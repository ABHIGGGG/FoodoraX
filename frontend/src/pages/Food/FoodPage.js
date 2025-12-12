import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Price from '../../components/Price/Price';
import StarRating from '../../components/StarRating/StarRating';
import Tags from '../../components/Tags/Tags';
import { useCart } from '../../hooks/useCart';
import { getById, toggleFavorite } from '../../services/foodService';
import classes from './foodPage.module.css';
import NotFound from '../../components/NotFound/NotFound';

//component to display food details
export default function FoodPage() {
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(food);
    navigate('/cart');
  };

  useEffect(() => {
    getById(id)
      .then(setFood)
      .finally(() => setLoading(false));
  }, [id]);

  const handleFavoriteToggle = async () => {
    if (!food?.id) return;
    try {
      const updated = await toggleFavorite(food.id, !food.favorite);
      setFood(updated);
    } catch (error) {
      console.error('Failed to toggle favorite', error);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <>
      {!food?.id && !loading ? (
        <NotFound message="Food Not Found!" linkText="Back To Homepage" />
      ) : (
        <div className={classes.container}>
          <img
            className={classes.image}
            src={`${food.imageUrl}`}
            alt={food.name}
          />

          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{food.name}</span>
              <button
                type="button"
                className={`${classes.favorite} ${
                  food.favorite ? '' : classes.not
                }`}
                aria-label={food.favorite ? 'Unlike' : 'Like'}
                onClick={handleFavoriteToggle}
              >
                {food.favorite ? '♥' : '♡'}
              </button>
            </div>
            <div className={classes.rating}>
              <StarRating stars={food.stars} size={25} />
            </div>

            <div className={classes.origins}>
              {food.origins?.map(origin => (
                <span key={origin}>{origin}</span>
              ))}
            </div>

            <div className={classes.tags}>
              {food.tags && (
                <Tags
                  tags={food.tags.map(tag => ({ name: tag }))}
                  forFoodPage={true}
                />
              )}
            </div>

            <div className={classes.cook_time}>
              <span>
                Time to cook about <strong>{food.cookTime}</strong> minutes
              </span>
            </div>

            <div className={classes.price}>
              <Price price={food.price} />
            </div>

            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      )}
    </>
  );
}
