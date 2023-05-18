import { useState } from "react";
import css from './Searchbar.module.css';
import { BsFillSearchHeartFill } from 'react-icons/bs';
import PropTypes from 'prop-types';

export const Searchbar = ({onSubmit}) => {
  const [imgName, setImgName] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(imgName);
  }

    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={handleSubmit}>
          <button type="submit" className={css.button}>
            <BsFillSearchHeartFill width="40" fill='black'>Search</BsFillSearchHeartFill>
          </button>
      
          <input
            className={css.input}
            onChange={(e) => setImgName(e.currentTarget.value)}
            name='imgName'
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
      )
  }
  

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
}