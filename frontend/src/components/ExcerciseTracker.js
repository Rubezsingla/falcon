const ExerciseTracker = () => {
    const openExerciseApp = () => {
      window.open("http://localhost:3001", "_blank"); // Replace with actual deployed URL
    };
  
    return (
      <div>
        <h1>React Exercise Tracker</h1>
        <button onClick={openExerciseApp}>Start Exercise</button>
      </div>
    );
  };
  
  export default ExerciseTracker;
  