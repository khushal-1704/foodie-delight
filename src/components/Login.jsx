import Button from "./Button";
import InputBox from "./InputBox";
import "./../styles/login.css";

function Login() {
  return (
    <section className="login">
      <div className="login-left">
        <div className="title">
          <h1 className="title-one">Foodie</h1>
          <h1 className="title-two">Delight</h1>
        </div>
      </div>
      <div className="login-right">
        <div className="login-form">
          <div className="form-1">
            <InputBox
              inputPlaceHolder={"Email"}
              label={"Email"}
              inputId={"email"}
              inputBoxStyle={"input-box"}
            />
            <InputBox
              inputPlaceHolder={"Password"}
              label={"Password"}
              inputId={"password"}
              inputBoxStyle={"input-box"}
            />
          </div>
          <div className="form-2">
            <Button
              onClick={() => console.log("button clicked")}
              isLoading={false}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
