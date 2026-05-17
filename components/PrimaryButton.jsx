const PrimaryButton = ({ buttonText, onClick }) => {
  return (
    <button onClick={onClick} className="p-2 bg-red-50">
      {buttonText}
    </button>
  );
};

export default PrimaryButton;