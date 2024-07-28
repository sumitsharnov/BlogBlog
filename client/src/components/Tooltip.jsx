// Tooltip.js
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';


const Tooltip = ({ message, children }) => {
  const tooltipRef = useRef(null);
  const [tooltipPosition, setTooltipPosition] = useState('top');

  useEffect(() => {
    const handlePosition = () => {
      if (tooltipRef.current) {
        const rect = tooltipRef.current.getBoundingClientRect();
        if (rect.top < 40) {
          setTooltipPosition('bottom');
        } else {
          setTooltipPosition('top');
        }
      }
    };

    handlePosition();
    window.addEventListener('resize', handlePosition);
    window.addEventListener('scroll', handlePosition);

    return () => {
      window.removeEventListener('resize', handlePosition);
      window.removeEventListener('scroll', handlePosition);
    };
  }, []);

  return (
    <div className="relative group">
      {children}
      <div
        ref={tooltipRef}
        className={`z-10 absolute ${tooltipPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} hidden w-auto p-2 text-xs text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-md group-hover:flex transition-opacity duration-300 ease-in-out`}
      >
        {message}
      </div>
      
    </div>
  );
};

export default Tooltip;


Tooltip.propTypes = {
    message: PropTypes.string.isRequired,
    children: PropTypes.node,
  };
