import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
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
    <>
      <Search />
      <Tags tags={tags} />
      {foods.length === 0 && <NotFound linkText="Reset Search" />}
      <Thumbnails foods={foods} onToggleFavorite={handleFavoriteToggle} />
    </>
  );
}
