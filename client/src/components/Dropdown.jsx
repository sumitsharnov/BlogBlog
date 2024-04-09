import { useState } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ options, onSelect, defaultOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block overflow-hidden ${isOpen ? 'h-48' : 'h-10'} transition-all duration-300`}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[20rem] px-4 py-2 bg-gray-200 rounded shadow-sm focus:outline-none focus:bg-gray-300 flex flex-row justify-between items-center overflow-hidden "
      >
        <span className="mr-2">{selectedOption || defaultOption || 'Select an option'}</span>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 7l5 5 5-5" />
      </svg>
      </button>
      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded shadow-md border border-gray-200  overflow-scroll h-48">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  defaultOption: PropTypes.string
};

export default Dropdown;
