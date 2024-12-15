import { Button, ButtonProps } from "#components/atoms";

export function LoaderButton({
  loading,
  ...props
}: ButtonProps & { loading?: boolean }): JSX.Element {
  return (
    <Button disabled={loading} {...props}>
      {loading ? "Loading..." : props.children}
    </Button>
  );
}
