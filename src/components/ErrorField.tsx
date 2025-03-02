const ErrorField = ({ error }: { error: string | undefined }) => {

  return (
    error ? <div className="px-1 text-red-500">{error}</div> : null
  );

}

export default ErrorField;