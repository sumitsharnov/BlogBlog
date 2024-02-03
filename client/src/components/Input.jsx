import PropTypes from "prop-types";
export default function Input({
  id,
  type,
  value,
  onChange,
  placeholder,
  required,
}) {
  return (
    <input
    id= {id}
      className="border rounded-lg sm:w-96 w-auto p-2 focus:border-green-900 "
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};
