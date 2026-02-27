const Buttons = (props) => {
  return (
    <div className="flex justify-around items-center h-20 w-full bg-">
      <button
        className="text-white bg-yellow-500 font-semibold rounded h-fit w-fit px-7 py-3 active:scale-90 disabled:opacity-50"
        onClick={(e) => {
          props.setPage(props.page - 1);
        }}
        disabled={props.page === 1}
      >
        Prev
      </button>
      <button
        className="text-white bg-yellow-500 font-semibold rounded h-fit w-fit px-7 py-3 active:scale-90"
        onClick={(e) => {
          props.setPage(props.page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Buttons;
