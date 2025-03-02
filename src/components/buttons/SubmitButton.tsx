import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button"

type SignupButtonProprs = {
  text: string;
  pendingText: string;
}

const SignupButton = ({ text, pendingText }: SignupButtonProprs) => {

  const { pending } = useFormStatus ();

  return (
    <Button type="submit" className="w-full cursor-pointer" disabled={pending}>
      {pending ? pendingText : text}
    </Button>
  );

}

export default SignupButton;