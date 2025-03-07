// import React, { useEffect, useState } from 'react';
// import './Tour.css'; // Import custom CSS for your styling
// import secureLocalStorage from 'react-secure-storage';

// const Tour = ({ steps, onTourComplete }) => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [tourStarted, setTourStarted] = useState(false);

//   // Show the tour only for first-time visitors
//   useEffect(() => {
//     if (!secureLocalStorage.getItem('tourCompleted')) {
//       setTourStarted(true); // Start the tour if it's the first visit
//     }
//   }, []);

//   const handleNext = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       setTourStarted(false); // End tour
//       secureLocalStorage.setItem('tourCompleted', 'true');
//       if (onTourComplete) onTourComplete(); // Optional callback
//     }
//   };

//   const handleBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   return (
//     <div>
//       {tourStarted && (
//         <div className="tour-overlay">
//           <div className="tour-tooltip" style={steps[currentStep].tooltipStyle}>
//             <p>{steps[currentStep].content}</p>
//           </div>

//           <div className="tour-highlight" style={steps[currentStep].highlightStyle}></div>

//           <div className="tour-controls">
//             {currentStep > 0 && <button className="tour-button" onClick={handleBack}>Back</button>}
//             <button className="tour-button" onClick={handleNext}>
//               {currentStep < steps.length - 1 ? 'Next' : 'Finish'}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Tour;
