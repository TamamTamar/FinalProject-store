import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import FooterComponent from "../components/Footer/Footer";
/* import Header from "../routes/Header/Header"; */


const Root = () => {

    return (
        <div className="flex flex-col min-h-screen text-blue-500">
            <Header /> 
            <main className="flex-1">
                <Outlet />
            </main>
          
<FooterComponent />
        </div>
    );
};

export default Root;