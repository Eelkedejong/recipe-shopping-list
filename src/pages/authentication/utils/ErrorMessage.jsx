import { useTranslation } from 'react-i18next';

const ErrorMessage = ({ errorMessage }) => {
  const { t } = useTranslation();

  // Temporary error messages until proper user error handling is implemented
  const errorMessages = [
    'The username, email or password did not match. Please try again.',
    'The email address is not formatted correctly.',
    'There is already a user with that username.',
    'The email address is already used by another account.',
    'Please enter an email and password',
    'No user with that email.',
    'Passwords do not match.',
  ];

  if (!errorMessages.includes(errorMessage)) {
    errorMessage = 'Something went wrong, please try again later';
  }

  return (
    <>
      {errorMessage ? (
        <div className="message error my-4">{t(errorMessage)}</div>
      ) : null}
    </>
  );
};

export default ErrorMessage;
