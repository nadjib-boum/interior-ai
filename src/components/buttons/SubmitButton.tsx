import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button"

type SubmitButtonProprs = {
  text: string;
  pendingText: string;
}

const SubmitButton = ({ text, pendingText, ...props }: SubmitButtonProprs) => {

  const { pending } = useFormStatus ();

  return (
    <Button type="submit" className="w-full cursor-pointer" disabled={pending} {...props}>
      {pending ? pendingText : text}
    </Button>
  );

}

export default SubmitButton;