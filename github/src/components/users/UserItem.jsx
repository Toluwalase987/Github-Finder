import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserItem({ user: { login, avatar_url, html_url } }) {
  const navigate = useNavigate();

  const handleMoreButtonClick = () => {
    const userRoute = `/user/${login}`;
    navigate(userRoute);
  };

  return (
    <div className='card'>
      <img src={avatar_url} alt="" className='image'/> 
      <h3>{login}</h3>
      <div>
        <button onClick={handleMoreButtonClick} className='button'>
          More
        </button>
      </div>
    </div>
  );
}
