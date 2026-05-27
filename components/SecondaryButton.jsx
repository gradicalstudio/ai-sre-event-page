const SecondaryButton = ({ buttonText, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${className}
        rounded-full
         border-2
        border-white
        bg-transparent
        px-10
        py-3
         text-[12px]
          md:text-xs
          lg:text-sm
          xl:text-base
        font-semibold
        text-white
        transition-all
        duration-250

        hover:border-[#FF6A50]
       
        hover:cursor-pointer
      hover:shadow-[0_0_25px_rgba(255,106,80,0.35)]
      `}
    >
      {buttonText}
    </button>
  );
};

export default SecondaryButton;
