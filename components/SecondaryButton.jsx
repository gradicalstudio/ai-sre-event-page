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

        hover:border-[#00C8FF]
       
        hover:cursor-pointer
       hover:shadow-[0_0_20px_rgba(0,200,255,0.35)]
      `}
    >
      {buttonText}
    </button>
  );
};

export default SecondaryButton;
