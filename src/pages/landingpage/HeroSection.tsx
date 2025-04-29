import heroImage from "../../assets/Group 289469.png";

const HeroSection = () => {
  return (
    <section className="max-w-[1512px] mx-auto w-full  py-8 md:px-12 lg:px-20 bg-red-500 h-[192px] md:h-96 overflow-hidden">
      <div className="flex flex-row md:gap-14 gap-4 items-center justify-center">
        {/* Text Content */}
        <div className="flex flex-col gap- md:gap-4">
          {/* Desktop Text */}
          <p className="hidden md:block text-white text-[60px] max-w-[700px] font-bold mt-10">
            Be The Fastest In Delivering Your Foods
          </p>
          <p className="hidden md:block font-crimson font-normal text-2xl text-white mt-10 pb-[78px]">
            We’re always available to serve you!
          </p>

          {/* Mobile Text */}
          <p className="block lghidden text-white text-[14px] font-bold mt-0 max-w-[300px] pl-4 justify-start">
            Hassle-free grocery delivery and fridge stocking for your vacation
            rental, so you can focus on making memories.
          </p>
        </div>

        {/* Hero Image */}
        <img
          src={heroImage}
          alt=""
          className="flex justify-center items-center h-52 w-60 -mr-10 md:pr0 px-0 md:size-96 -mt-9    md:overflow-hidden md:-mt-[160px]  xl:-mt-[150px] "
        />
      </div>
    </section>
  );
};

export default HeroSection;
