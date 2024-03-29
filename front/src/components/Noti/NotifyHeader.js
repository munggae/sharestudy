import React from 'react';
import './styles.scss';

const NotifyHeader = () => {
  return (
    <div className="noti">
      <header>
        <svg
          width="1.5em"
          height="1.5em"
          viewBox="0 0 20 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.45 3.45L16.5 0.5L0 17L16.5 33.5L19.45 30.55L5.9 17L19.45 3.45Z"
            fill="black"
          />
        </svg>
        <h2 className="noti__title">알림</h2>
      </header>
    </div>
  );
};

export default NotifyHeader;
