import PropTypes from "prop-types";

const Input = ({ id, type, value, onChange, placeholder, required }) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="border rounded-lg sm:w-96 w-auto p-2 focus:border-green-900"
    />
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
