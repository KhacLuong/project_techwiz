import './App.css'
import {BrowserRouter} from "react-router-dom";
import RenderRouter from "./routers/RenderRouter.jsx";
import {useContext, useEffect} from "react";
import {Context} from "./context/ContextProvider.jsx";


const App = () => {
    const {theme} = useContext(Context);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    return (
        <BrowserRouter>
            <RenderRouter/>
        </BrowserRouter>
    )
}

export default App
