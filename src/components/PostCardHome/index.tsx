interface IPropsPostCardHome {
  id: string | undefined;
  title?: string;
  content?: string;
  image?: string;
  interest: {
    id: string | undefined;
    name: string;
  }[];
}

function PostCardHome({
  id,
  title,
  content,
  image,
  interest,
}: IPropsPostCardHome) {
  return (
    <div className="card lg:w-80 md:w-72 max-md:w-72 bg-base-100 shadow-xl hover:cursor-pointer" id={id}>
      <figure>
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
          }
          alt="Shoes"
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title && title.trim().length > 20
            ? title.trim().substring(0, 20) + "..."
            : title
            ? title
            : "Sem título"}
          {/* <div className="badge badge-secondary">NEW</div> */}
        </h2>
        <p>
          {content && content.trim().length > 80
            ? content.trim().substring(0, 80) + "..."
            : content}
        </p>
        <div className="card-actions justify-end">
          {interest &&
            interest.map((item) => {
              return <div className="badge badge-outline">{item.name}</div>;
            })}
        </div>
      </div>
    </div>
  );
}

export default PostCardHome;
