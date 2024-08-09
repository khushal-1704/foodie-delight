import { Oval } from "react-loader-spinner";

import "./../styles/button.css";

/* eslint-disable react/prop-types */
const Button = ({ type='button', children, isLoading, onClick, disabled, btnStyle }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${btnStyle} btn`}
    >
      {isLoading ? (
        <Oval
          visible={true}
          height="20"
          width="20"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <p>{children}</p>
      )}
    </button>
  );
};

export default Button;