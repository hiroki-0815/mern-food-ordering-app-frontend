import { MenuItem as MenuItemType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: MenuItemType;
};

const MenuItem = ({ menuItem }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        ${(menuItem.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  );
};

export default MenuItem;
