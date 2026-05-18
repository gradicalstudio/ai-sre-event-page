// components/Bounded.jsx

const Bounded = ({ children, className = "", innerClassName = "" }) => {
  return (
    <section className={className}>
      <div
        className={`
          mx-auto w-full
          max-w-[1000px]
          2xl:max-w-[1320px]
          px-3 md:px-6 lg:px-8
          py-10 md:py-14 lg:py-30
          ${innerClassName}
        `}
      >
        {children}
      </div>
    </section>
  );
};

export default Bounded;
