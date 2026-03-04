const Buttons = (props) => {
  return (
    <div className="flex justify-around items-center h-20 w-full">
      <button
        className="text-white bg-yellow-500 font-semibold rounded h-fit w-fit px-7 py-3 active:scale-90"
        onClick={props.prevPage)
      >
        Prev
      </button>
      <button
        className="text-white bg-yellow-500 font-semibold rounded h-fit w-fit px-7 py-3 active:scale-90"
        onClick={props.nextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Buttons;
