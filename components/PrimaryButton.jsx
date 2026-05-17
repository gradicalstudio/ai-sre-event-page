const PrimaryButton = ({ buttonText, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
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
    hover:shadow-[0_0_15px_rgba(69,199,240,0.45)]
      "
    >
      {buttonText}
    </button>
  );
};

export default PrimaryButton;
