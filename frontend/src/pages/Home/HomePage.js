import React, { useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Tags from '../../components/Tags/Tags';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import {
  getAll,
  getAllByTag,
  getAllTags,
  search,
  toggleFavorite,
} from '../../services/foodService';
import NotFound from '../../components/NotFound/NotFound';
import classes from './homePage.module.css';

const initialState = { foods: [], tags: [] };

//action contains type and payload
//payload is data we get from server and is the actual data
const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload };
    case 'TAGS_LOADED':
      return { ...state, tags: action.payload };
    case 'FAVORITE_UPDATED':
      return {
        ...state,
        foods: state.foods.map(food =>
          food.id === action.payload.id ? action.payload : food
        ),
      };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;

  //get the params
  const { searchTerm, tag } = useParams();

  useEffect(() => {

    //load all tags
    getAllTags().then(tags => dispatch({ type: 'TAGS_LOADED', payload: tags }));

    //load foods based on searchTerm or tag
    const loadFoods = tag? getAllByTag(tag)
      : searchTerm? search(searchTerm)
      : getAll();
    
    //dispatch action when we get foods from server
    loadFoods.then(foods => dispatch({ type: 'FOODS_LOADED', payload: foods }));
  }, [searchTerm, tag]);

  const handleFavoriteToggle = async (foodId, nextFavorite) => {
    try {
      const updatedFood = await toggleFavorite(foodId, nextFavorite);
      dispatch({ type: 'FAVORITE_UPDATED', payload: updatedFood });
    } catch (error) {
      console.error('Failed to toggle favorite', error);
    }
  };

  return (
    <div className={classes.page}>
      <div className={classes.shell}>
        <section className={classes.hero}>
          <div className={classes.hero_content}>
            <p className={classes.eyebrow}>FoodoraX</p>
            <h1>Chef-crafted food, delivered fresh and fast.</h1>
            <p className={classes.subtitle}>
              Explore curated meals, rate your favorites, and get them to your
              door right on time.
            </p>
            <div className={classes.actions}>
              <a className={classes.primary_btn} href="#browse">
                Browse menu
              </a>
              <Link className={classes.secondary_btn} to="/login">
                Sign in
              </Link>
            </div>
          </div>
          <div className={classes.hero_badge}>
            <span>24/7 Delivery</span>
            <span>Top-rated chefs</span>
            <span>Secure checkout</span>
          </div>
        </section>

        <section id="browse" className={classes.panel}>
          <Search margin="0 auto 1rem auto" />
          <Tags tags={tags} />
        </section>

        <section className={classes.results}>
          {foods.length === 0 && <NotFound linkText="Reset Search" />}
          <Thumbnails foods={foods} onToggleFavorite={handleFavoriteToggle} />
        </section>
      </div>
    </div>
  );
}
