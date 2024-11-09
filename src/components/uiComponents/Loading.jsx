const Loading = () => {
    return (
      <div className=" flex flex-col items-center justify-center min-h-screen bg-main-light ">
        <div className="w-16 h-16 border-t-4 border-r-4 border-b-4 dark:text-white border-main rounded-full animate-spin dark:border-white"></div>
        <span className="mt-4 text-xl font-bold text-main dark:text-white ">Please Wait ...</span>
        <div className="mt-2 w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-full h-full bg-main animate-pulse"></div>
        </div>
      </div>
    );
  };
  
  export default Loading;