function Card(props: {
  variant?: string;
  extra?: string;
  children?: JSX.Element | any[];
  [x: string]: any;
}) {
  const { variant, extra, children, ...rest } = props;
  return (
    <div
      className={`!z-5 relative flex flex-col rounded-[20px] bg-gray-100 bg-clip-border shadow-3xl shadow-shadow-500  ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
