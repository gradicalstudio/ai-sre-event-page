// components/Bounded.jsx

const Bounded = ({ children, className = "", innerClassName = "" }) => {
  return (
    <section className={className}>
      <div
        className={`
          mx-auto w-full
       max-w-[1000px]
xl:max-w-[1280px]
2xl:max-w-[1440px]
          
          px-6 md:px-6 lg:px-15
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
