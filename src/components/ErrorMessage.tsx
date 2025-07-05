
interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <p className="text-red-400 mb-2">Error loading content</p>
        <p className="text-white/60 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
