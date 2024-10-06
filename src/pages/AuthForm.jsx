import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { fetchRegister } from "../utils/ApiUtils";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Form({ isSignUp, toggleForm }) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [username, setUsername] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [address, setAddress] = useState('');
   const [error, setError] = useState('');
   const [emailError, setEmailError] = useState('');
   const [passwordError, setPasswordError] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);
   const { signIn, userInfo, token } = useAuth();
   const navigate = useNavigate();
   
   useEffect(() => {
      if (token) {
         Swal.fire({
            icon: 'info',
            title: 'Already Signed In',
            text: 'You are already signed in.',
            confirmButtonText: 'Ok',
         }).then(() => {
            navigate('/home');
         });
      }
   }, [token, navigate]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setLoading(true);

      try {
         if (isSignUp) {
            await fetchRegister(email, password, username, phoneNumber, address);
            Swal.fire({
               icon: 'success',
               title: 'Registration Successfull',
               text: 'You have successfully registered! Please Sign In',
               confirmButtonText: 'Ok',
            }).then(() => {
               toggleForm();
            })
            
            setEmail('');
            setPassword('');
            setUsername('');
            setPhoneNumber('');
            setAddress('');
         } else {
            await signIn(email, password);
            Swal.fire({ icon: 'success', title: 'Welcome', text: `Welcome back, ${userInfo.username}`, confirmButtonText: 'Ok' });
         }
      } catch (error) {
         if (!error.message.includes('Password is required')) {
            setEmailError(error.message);
         } else {
            setPasswordError(error.message);
            setError(error.message);
         }
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex flex-col items-center justify-center w-full h-full p-8">
         <h2 className="text-2xl font-bold mb-6">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
         <form className="mb-2 flex flex-col items-center w-full" onSubmit={handleSubmit}>
            {isSignUp && (
               <>
                  <InputField
                     type="text"
                     placeholder="Username"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                  />
                  <InputField
                     type="text"
                     placeholder="Phone Number"
                     value={phoneNumber}
                     onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <InputField
                     type="text"
                     placeholder="Address"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                  />
               </>
            )}

            <InputField
               type="email"
               placeholder="Email"
               value={email}
               onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                  setEmailError('');
               }}
            />
            {error ? (<p className="text-red-500 -mt-3 mb-4 text-sm">{error}</p>) : emailError ? (<p className="text-red-500 -mt-3 mb-4 text-sm">{emailError}</p>) : null } 
            <div className="relative w-full">
               <InputField
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                     setPassword(e.target.value);
                     setError('');
                     setPasswordError('');
                  }}
               />
               <Button onClick={() => setShowPassword(!showPassword)} className={`absolute bg-transparent text-sm shadow-none right-1 top-1 text-gray-700 hover:text-blue-600 hover:bg-transparent`}>{showPassword ? 'Hide' : 'Show'}</Button>
            </div>
            {error ? (<p className="text-red-500 -mt-3 mb-4 text-sm">{error}</p>) : passwordError ? (<p className="text-red-500 -mt-3 mb-4 text-sm">{passwordError}</p>) : null}
            <Button type="submit" className={`text-white w-full`} disabled={loading}>{loading ? (isSignUp ? 'Signing Up... ' : 'Signing In... ') : (isSignUp ? 'Sign Up' : 'Sign In')}</Button>
         </form>
         <Button onClick={toggleForm} className={`bg-transparent hover:bg-transparent hover:text-blue-600 shadow-none text-nowrap md:text-wrap`}>{isSignUp ? `Already have an account? Sign In` : `Don't have an account? Sign Up`}</Button>
      </div>
   )
}

export default Form;