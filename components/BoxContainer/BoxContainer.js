function BoxContainer({ children, className, ...rest }) {
  return (
    <div
      className={
        "p-4 w-full border-solid border border-[#aaaaaa] bg-[#f0f2f5] drop-shadow " +
        (className ?? "")
      }
      {...rest}
    >
      {children}
    </div>
  );
}

BoxContainer.propTypes = {};

export default BoxContainer;
