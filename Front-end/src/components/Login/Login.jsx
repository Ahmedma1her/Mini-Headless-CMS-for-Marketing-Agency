import style from "./Login.module.css";
function Login() {
  return (
    <div className="container">
      <div className={`${style.header} my-5 g-1 p-2`}>
        <span>MARKETING AGENCY ADMIN</span>
        <h2>Welcome back</h2>
      </div>
      <form className={`${style.form} d-flex flex-column my-5`}>
        <div className="mb-3 d-flex flex-column ">
          <label htmlFor="exampleInputEmail1" className="form-label">
            EMAIL ADDRESS
          </label>
          <div className={`${style.input} d-flex align-items-center`}>
            <i className="fa-solid fa-envelope "></i>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="name@agency.com"
            />
          </div>
        </div>
        <div className="mb-3 d-flex flex-column">
          <label htmlFor="exampleInputPassword1" className="form-label">
            PASSWORD
          </label>
          <div className={`${style.input} d-flex align-items-center`}>
            <i className="fa-solid fa-lock "></i>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="******"
            />
          </div>
        </div>
        <div className="mb-3 form-check"></div>
        <button type="submit" className={` ${style.btn} btn btn-primary p-3 `}>
          Login to Dashboard
        </button>
      </form>

      <div className={`${style.access}`}>
       <span >Need access to the CMS?</span>    <p>Contact your system architect.</p>  
      </div>
    </div>
  );
}

export default Login;
