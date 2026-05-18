// components/Bounded.jsx

const Bounded = ({ children, className = "" }) => {
  return (
    <section className={className}>
      <div className="mx-auto w-full max-w-[1480px] px-4 md:px-6 lg:px-8 py-10 md:py-14 lg:py-20 ">
        {children}
      </div>
    </section>
  );
};

export default Bounded;
