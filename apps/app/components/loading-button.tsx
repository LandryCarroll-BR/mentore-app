import {
  Button,
  type ButtonProps,
} from '@repo/design-system/components/ui/button';
import { Loader2 } from 'lucide-react';

export const LoadingButton = (props: ButtonProps) => {
  return (
    <Button {...props}>
      {props.disabled && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
      {props.children}
    </Button>
  );
};
