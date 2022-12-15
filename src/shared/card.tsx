import { CSSProperties, FC, ReactNode } from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";

type AppCardProps = {
  title: string;
  subTitle?: string;
  children?: ReactNode;
  img?: string;
  style?: CSSProperties;
};

export const AppCard: FC<AppCardProps> = ({
  title,
  subTitle,
  children,
  img,
  style,
}) => {
  return (
    <Card style={style}>
      {img ? <img alt="Sample" src="https://picsum.photos/300/200" /> : null}
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        {subTitle ? (
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {subTitle}
          </CardSubtitle>
        ) : null}
        {children}
      </CardBody>
    </Card>
  );
};
