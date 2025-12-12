import React from 'react';
import { Link } from 'react-router-dom';
import Price from '../Price/Price';
import StarRating from '../StarRating/StarRating';
import classes from './thumbnails.module.css';



export default function Thumbnails({ foods, onToggleFavorite = () => {} }) {
  return (
    <ul className={classes.list}>
      {foods.map(food => (

        <li key={food.id} className={classes.card}>
          <Link to={`/food/${food.id}`} className={classes.link}>

            <img
              className={classes.image}
              src={`${food.imageUrl}`}
              alt={food.name}
            />

            <div className={classes.content}>

              <div className={classes.name}>{food.name}</div>
              <button
                type="button"
                className={`${classes.favorite} ${
                  food.favorite ? '' : classes.not
                }`}
                aria-label={food.favorite ? 'Unlike' : 'Like'}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleFavorite(food.id, !food.favorite);
                }}
              >
                {food.favorite ? '♥' : '♡'}
              </button>
              <div className={classes.stars}>
                <StarRating stars={food.stars} />
              </div>
              <div className={classes.product_item_footer}>
                <div className={classes.origins}>
                  {food.origins.map(origin => (
                    <span key={origin}>{origin}</span>
                  ))}
                </div>
                <div className={classes.cook_time}>
                  <span>🕒</span>
                  {food.cookTime}
                </div>
              </div>
              <div className={classes.price}>
                <Price price={food.price} />
              </div>
              
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

