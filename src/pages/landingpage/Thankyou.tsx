import hero from "../../assets/Superhero-pana 1.png";

const Thankyou = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-[1512px] mx-auto border-t-2">
      <img className="w-72 h-72 mt-10" src={hero} alt="hero" />
      <h1 className="text-[40px] font-bold text-red-500">Thank you </h1>
      <p className="text-[18px] font-semibold text-gray-500 mb-1">
        Confirmation number: GYK209021
      </p>
      <p className="flex justify-center items-center text-center text-[18px] font-semibold text-gray-500 px-3 md:px-80">
        Grocery superheroes to the rescue! Your Bellhopt is donning their capes
        and saving the day by delivering your grocery order to your rental. Stay
        tuned for a heroic email confirmation!
      </p>
    </div>
  );
};

export default Thankyou;
