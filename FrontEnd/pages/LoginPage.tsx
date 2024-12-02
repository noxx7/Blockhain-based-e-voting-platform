import "../styles/LoginPage.css"
import { Link } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/DataContext";
import Loading from "../components/Loading";
import Star from "../3d-model/Star";

interface Account {
    nim: string;
    password: string;
}

function LoginPage() {
    const [account, setAccount] = useState<Account>({
        nim: "",
        password: "",
    });

    const [eye, setEye] = useState<string>("hidden");
    const { checkUserAuth } = useDataContext()
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const pwinput = document.getElementById("login-pw") as HTMLInputElement;

    const eyeHandler = (eye: string) => {
        event?.preventDefault();
        setEye(eye === "visible" ? "hidden" : "visible")
        pwinput.type = eye === "visible" ? "text" : "password";
    };

    document.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "enter") {
            loginUser()
        }
    })

    const loginUser = async (): Promise<void> => {
        setLoading(true)
        const { nim, password } = account;

        try {
            const { data } = await axios.post("/api/login", {
                nim,
                password
            });

            setLoading(false)
            if (data.error) {
                toast.error(data.error, {
                    style: {
                        fontFamily: "sans-serif",
                    },
                });
            } else {
                toast.success("login successfully", {
                    style: {
                        fontFamily: "sans-serif",
                    },
                });

                if (data.role === "user" || data.role === "admin") {
                    await checkUserAuth();
                    navigate("/");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="login-container">
            <Star />
            <div className="login-form-container">
                <h1 className="login-title">Log In</h1>

                <form id="login-form" onSubmit={loginUser}>
                    <input
                        type="text"
                        id="nim"
                        placeholder="nim"
                        value={account.nim}
                        required
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setAccount({ ...account, nim: e.target.value })
                        }
                    />
                    <div className="pw-wrapper">
                        <input
                            type="password"
                            id="login-pw"
                            value={account.password}
                            placeholder="Password"
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setAccount({ ...account, password: e.target.value })
                            }
                        />
                        <span
                            onClick={() =>
                                eyeHandler(`${eye === "visible" ? "hidden" : "visible"}`)
                            }
                            className="eye-btn"
                        >
                            {eye === "visible" ? <IoEyeSharp /> : <FaRegEyeSlash />}
                        </span>
                    </div>
                    <Link to="/forgot-password">Forgot password</Link>

                    <button type="submit" id="submit-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
