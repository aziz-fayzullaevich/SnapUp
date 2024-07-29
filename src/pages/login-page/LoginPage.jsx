import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/AuthSlice";
import { useLoginMutation } from "../../store/authApiSlice";
import LoginStyle from './LoginPage.module.css';

const LoginPage = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    useEffect(() => {
        if (errMsg) {
            const timer = setTimeout(() => {
                setErrMsg('');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [errMsg]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await login({ username: user, password: pwd }).unwrap();
            dispatch(setCredentials({ ...userData, user }));
            setUser('');
            setPwd('');
            navigate('/');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Нет ответа сервера');
            } else if (err.response?.status === 400) {
                setErrMsg('Отсутствует имя пользователя или пароль');
            } else if (err.response?.status === 401) {
                setErrMsg('Несанкционированный');
            } else {
                setErrMsg('Ошибка входа');
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUser(e.target.value);
    const handlePwdInput = (e) => setPwd(e.target.value);

    return (
        <section className={LoginStyle.mainBlock}>
            <div className="container">
                <p
                    ref={errRef}
                    aria-live="assertive"
                    className={errMsg ? LoginStyle.showBlock : LoginStyle.hideBlock}
                >
                    {errMsg}
                </p>
                <h1 className={LoginStyle.loginTitle}>Login</h1>
                <form onSubmit={handleSubmit} className={LoginStyle.formBlock}>
                    <input
                        placeholder="Login"
                        type="text"
                        ref={userRef}
                        value={user}
                        onChange={handleUserInput}
                        required
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        value={pwd}
                        onChange={handlePwdInput}
                        required
                    />
                    <button disabled={isLoading}>Авторизоваться</button>
                </form>
            </div>
        </section>
    );
}

export default LoginPage;