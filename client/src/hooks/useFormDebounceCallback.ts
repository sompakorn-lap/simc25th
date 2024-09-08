import { useEffect } from "react";
import { UseFormWatch } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";

function useFormDebounceCallback(
  callback: any,
  watch: UseFormWatch<any>,
  delay: number
) {
  const debounce = useDebounceCallback(callback, delay);

  useEffect(() => {
    const subscription = watch(debounce);
    return () => subscription.unsubscribe();
  }, [watch, callback]);
}

export default useFormDebounceCallback;
