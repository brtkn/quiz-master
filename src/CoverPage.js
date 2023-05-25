export default function CoverPage(props) {
  return (
    <div className="flex flex-col gap-20 justify-center items-center h-[800px] ">
      <h1 className="text-5xl font-bold">Quiz Master</h1>
      <p className="text-2xl ml-3">Answer the questions and see the result.</p>
      <button
        onClick={props.togglePageState}
        className="bg-slate-600 w-[150px] h-[70px] rounded-2xl text-white text-2xl focus:outline-none hover:shadow-xl active:bg-violet-700"
      >
        Start quiz
      </button>
    </div>
  );
}
