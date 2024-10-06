function InputField({ label, type = "text", value, required, placeholder, onChange, className }) {
   return (
      <div className="mb-4 w-full">
         {label && <label className="w-1/6 p-2">{label}</label>}
         <input
            type={type}
            value={value}
            onChange={onChange}
            className={`w-full p-2 border border-gray-200 rounded ${className}`}
            placeholder={placeholder}
            required={required}
         />
      </div>
   )
}

export default InputField;