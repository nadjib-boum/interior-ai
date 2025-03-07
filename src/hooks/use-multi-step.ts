import { useCallback, useState } from "react"

type UseMultiplStepFormProps = {
  max_steps: number;
  default_step?: number;
}

export const useMultiStepForm = ({ default_step = 1, max_steps }: UseMultiplStepFormProps) => {

  const [ step, setStep ] = useState<number>(default_step);

  const goNext = useCallback(() => {
    setStep ((prev) => Math.min(prev + 1, max_steps));
  }, [step])
  
  const goPrev = useCallback(() => {
    setStep ((prev) => Math.max(prev - 1, 1));
  }, [step]);

  return {
    step,
    goNext,
    goPrev,
  };

}