export const useConfirm = (
  message: string,
  onConfirm: () => void,
  onAbort: () => void
) => {
  const confirm = () => {
    if (window.confirm(message)) onConfirm();
    else onAbort();
  };
  return confirm;
};
