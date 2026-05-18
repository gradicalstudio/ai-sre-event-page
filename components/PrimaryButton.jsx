const PrimaryButton = ({ buttonText, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${className}
          rounded-full
          bg-white
          px-10
          py-3
          text-lg
          font-semibold
          text-black

          transition-all
          duration-250

          hover:bg-[#45C7F0]
          hover:text-white
          hover:cursor-pointer
    
        `}
    >
      {buttonText}
    </button>
  );
};

export default PrimaryButton;
