// components/Bounded.jsx

const Bounded = ({ children, className = "" }) => {
  return (
    <section className={className}>
      <div className="mx-auto w-full max-w-[1620px] px-3 md:px-6 lg:px-8 py-10 md:py-14 lg:py-30 ">
        {children}
      </div>
    </section>
  );
};

export default Bounded;
