import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const Error = () => {
  const error = useRouteError() as Error;
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = (error as Error).message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured😢</p>
      <p>{errorMessage}</p>
    </div>
  );
};

export default Error;
