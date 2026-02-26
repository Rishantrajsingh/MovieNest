const Buttons = () => {
  return (
    <div className="flex items-center justify-center h-20 w-full gap-15">
      <button className="text-white bg-yellow-500 font-semibold rounded h-fit w-fit px-7 py-3 active:scale-90">
        Prev
      </button>
      <button className="text-white bg-yellow-500 font-semibold rounded h-fit w-fit px-7 py-3 active:scale-90">
        Next
      </button>
    </div>
  );
};

export default Buttons;
