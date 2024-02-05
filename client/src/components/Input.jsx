import PropTypes from "prop-types";
import { useState } from "react";

const Input = ({
  id,
  type,
  value,
  onChange,
  placeholder,
  required,
  isSubmitted = false,
}) => {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`border rounded-lg sm:w-96 w-auto p-2 focus:border-green-900 ${
          isSubmitted && !value ? "border-red-700" : ""
        }`}
      />
      {required && !value && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-red-500">
          *
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default Input;
