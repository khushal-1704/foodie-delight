/* eslint-disable react/prop-types */
import "./../styles/inputBox.css";

const InputBox = ({
  label,
  inputType = "text",
  inputPlaceHolder = "",
  onInputChange,
  inputStyle = "",
  inputBoxStyle = "",
  labelStyle = "",
  inputId,
  inputValue,
  isRequired,
  ...props
}) => {
  return (
    <div className={`${inputBoxStyle} input-box`}>
      <label className={`${labelStyle} input-label`} form="">
        {label && (
          <div>
            <span>{label}</span>
            {isRequired && (
              <span style={{ color: "red", marginLeft: "1px" }}>*</span>
            )}
          </div>
        )}
        <input
          id={inputId}
          type={inputType}
          placeholder={inputPlaceHolder}
          className={`${inputStyle} input-input`}
          onChange={onInputChange}
          value={inputValue}
          {...props}
        />
      </label>
    </div>
  );
};

export default InputBox;
