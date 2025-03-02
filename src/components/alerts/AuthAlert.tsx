import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type LoginAlert = {
  message: string;
}

const LoginAlert = ({ message }: LoginAlert) => {

  return (
    <Alert variant={"destructive"}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Oops</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
  </Alert>
  );

}

export default LoginAlert;