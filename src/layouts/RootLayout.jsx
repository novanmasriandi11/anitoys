import Navbar from "../components/Navbar"
import { useAuth } from "../contexts/AuthContext"
import {   Outlet, useNavigate } from "react-router-dom";
import FormContainer from "./FormContainer";
import Swal from 'sweetalert2'

const RootLayout = () => {
    const { signOut, token } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be signed out!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText:'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                signOut();
                navigate('/');
            }
        })
    }

    if (!token) {
        Swal.fire({ icon: 'error', title: "Oops...", text: 'You need to be logged in to access this page!', confirmButtonText: "Ok" });
        return <FormContainer/>;
    }

    return (
        <div className="flex flex-col h-screen">
            <Navbar onLogout={handleSignOut} />
            <div className="flex-1 overflow-auto">
                <Outlet/>
            </div>
        </div>
    )
}

export default RootLayout;