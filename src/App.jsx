import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Bookings from "./pages/Bookings.jsx";
import Cabins from "./pages/Cabins.jsx";
import Users from "./pages/Users.jsx";
import Settings from "./pages/Settings.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles.js";
import {ToastContainer} from "react-toastify";
import AppLayout from "./ui/AppLayout.jsx";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000
        }
    }
})

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools setIsOpen={false}/>

            <GlobalStyles/>

            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route index element={<Navigate replace to="/dashboard"/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/bookings" element={<Bookings/>}/>
                        <Route path="/cabins" element={<Cabins/>}/>
                        <Route path="/users" element={<Users/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Route>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <ToastContainer/>
        </QueryClientProvider>
    )
}
