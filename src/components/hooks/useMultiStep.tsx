import { ReactElement, useState } from "react";


export default function useMultiStep() {
    const [CurrentStep, setCurrentStep] = useState(0);

    const nextStep = () => setCurrentStep((step) => {
        
        if
        step + 1});

    const prevStep = () => setCurrentStep((step) => step - 1);

    function goTo(step: number) {
        setCurrentStep(step);
    }

    return { CurrentStep, step:steps[CurrentStep], nextStep, prevStep, goTo  };
}