import React from 'react';
import { ReactComponent as SearchIcon } from '../images/search.svg';

const UserInput = (props) => {
  const { API_KEY, setLoading, setMatches, setRecipes, search, setSearch } =
    props;

  const searchByRecipes = (e) => {
    e.preventDefault();
    if (!search) {
      alert('Search field cannot be empty.');
      return;
    }
    setLoading(true);
    getRecipes();
  };

  //  call api and handle results
  const getRecipes = async () => {
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${search}&apiKey=${API_KEY}&number=100&addRecipeNutrition=true`;

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      populateRecipes(data);
    } else {
      console.log(response.statusText);
    }
  };

  // populate data on screen
  const populateRecipes = (data) => {
    if (data.results.length > 0) {
      setRecipes(data.results);
      setMatches(true);
    } else {
      setRecipes([]);
      setMatches(false);
    }
    setLoading(false);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="user">
        <div className="user__form min-w-xs max-w-50 max-h-80 mx-auto p-4 mb-4">
          <p className="form-desc flex mb-2 min-w-xs mx-auto text-sm text-left">
            To explore multiple ingredients or recipes at a time, separate items
            with a comma (e.g. ham, eggs, etc.).
          </p>

          {/* collect user input */}
          <form
            onSubmit={searchByRecipes}
            className="form-form flex items-center mb-2"
          >
            <input
              type="text"
              id="input-text"
              className="form-input w-full py-1 px-2 mr-2 md:mr-4 border border-solid border-gray-300 rounded focus:outline-none placeholder-gray-300 text-base"
              name="ingredients"
              placeholder="search for recipes..."
              onChange={updateSearch}
              value={search}
            />

            <button className="form-button py-1 px-2 h-full bg-white rounded ease-out duration-300 border border-solid border-gray-300 hover:bg-gray-100 hover:text-green-400 flex items-center">
              <span className="mr-1 text-base">Search</span>
              <SearchIcon className="ml-1" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserInput;
