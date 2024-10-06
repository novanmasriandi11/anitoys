const Button = ({ type = "button", disabled, onClick, className, children }) => {
   return (
      <button type={type} onClick={onClick} disabled={disabled} className={`${className} bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md shadow-md`}>
         {children}
      </button>
   )
}

export default Button;