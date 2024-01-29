import { forwardRef } from "react";
import Button from "@/components/block/button-block";

const SecondaryMenu = forwardRef<HTMLUListElement>((props, ref) => {
  return (
    <ul ref={ref} className="flex items-center justify-end">
      <li className="md:mr-6 xl:mr-12">
        <Button buttonType="secondary">Log in</Button>
      </li>
      <li>
        <Button buttonType="primary">Get started</Button>
      </li>
    </ul>
  );
});

SecondaryMenu.displayName = "SecondaryMenu";

export default SecondaryMenu;
