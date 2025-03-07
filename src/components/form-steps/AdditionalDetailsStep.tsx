import { Textarea } from "@/components/ui/textarea";
import type { FormStepProps } from "@/types";

type AdditionalDetailsStepProps = FormStepProps & {};

const AdditionalDetailsStep = ({ setFieldValue }: AdditionalDetailsStepProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

    setFieldValue ("details", e.target.value);

  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <span className="text-lg">Additional Details</span>
      <Textarea className="h-[150px]" onChange={handleChange} />
    </div>
  );

}




export default AdditionalDetailsStep;