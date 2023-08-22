import  {useState} from 'react'
import Home from './Home'
import './App.css'
import FetchData from './FetchData'

enum Step {
  Form = 1,
  FetchandRetriveData = 2,
}

function App() {
  const [currentStep, setCurrentStep] = useState<Step>(Step.Form);

  const handleStepChange = (step: Step) => {
    setCurrentStep(step);
  };

  return (
    <div>
      
      {currentStep === Step.Form && <Home onNext={() => handleStepChange(Step.FetchandRetriveData)} />}
      {currentStep === Step.FetchandRetriveData && <FetchData />}
    </div>
  );



}

export default App


