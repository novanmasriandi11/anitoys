import { useState } from "react";
import Form from "../pages/AuthForm";

function FormContainer() {
   const [isSignUp, setIsSignUp] = useState(true);

   return (
      <div className="flex items-center justify-center h-screen">

         <div className="relative w-10/12 max-w-[768px] h-[480px] bg-white shadow-lg overflow-hidden rounded-lg flex flex-col md:flex-row">
            
            <div className={`flex-shrink-0 h-40 rounded-t-md md:w-1/2 md:h-full md:rounded-lg bg-blue-500 transition-transform duration-500 ease-in-out ${isSignUp ? 'md:translate-x-full z-10' : '-translate-y-full md:translate-y-0 md:z-10'}`}>
               <img src="https://via.placeholder.com/768x480" alt="welcome" className={`w-full h-full object-cover ${isSignUp ? 'md:rounded-r-md':'rounded-l-md'}`} />
            </div>

            <div className="flex flex-row w-full h-full">
               <div className={`md:flex-shrink-0 w-full h-80 md:h-full transition-transform duration-500 ease-in-out  ${isSignUp ? 'translate-x-0 md:-translate-x-full' : '-translate-x-full h-full md:-translate-x-full'}`}>
                  <Form isSignUp={false} toggleForm={() => setIsSignUp(false)} />
               </div>

               <div className={`md:flex-shrink-0 w-full transition-transform duration-500 ease-in-out ${isSignUp ? 'translate-x-full h-1/3 md:translate-x-full md:h-full' : '-translate-x-full -translate-y-0 h-1/3 md:-translate-x-full md:h-full'}`}>
                  <Form isSignUp={true} toggleForm={() => setIsSignUp(true)} />
               </div>
            </div>
         </div>
      </div>
   )
}

export default FormContainer;