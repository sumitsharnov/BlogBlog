import React from 'react';

const Loader = ({ width = 4, height = 4 }) => {
  return (
    <div className="flex space-x-3">
      <div className={`w-${width} h-${height} bg-blue-500 rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
      <div className={`w-${width} h-${height} bg-red-500 rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
      <div className={`w-${width} h-${height} bg-yellow-500 rounded-full animate-bounce`} style={{ animationDelay: '0.3s' }}></div>
    </div>
  );
}

const styles = `
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .animate-bounce {
    animation: bounce 1s infinite alternate; /* Adjust the duration here (1s) */
  }
`;

// Create a style element and add the CSS styles to it
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default Loader;
