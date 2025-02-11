import {
  Button,
  type ButtonProps,
} from '@repo/design-system/components/ui/button';
import { Loader2 } from 'lucide-react';

export const LoadingButton = (props: ButtonProps) => {
  return (
    <Button {...props}>
      {props.disabled ? (
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
          <div className="pointer-events-none opacity-0">{props.children}</div>
        </div>
      ) : (
        props.children
      )}
    </Button>
  );
};
