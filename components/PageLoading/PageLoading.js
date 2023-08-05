import Image from "next/image";

export default function Loading() {
  return (
    <div>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          height: "100vh",
          display: "grid",
          alignContent: "center",
          position: "relative",
          top: "-75px",
        }}
      >
        <div>
          {/* <img src="/assets/icons/Spin-1s-200px.svg" alt="loading..." /> */}
          <Image src="https://d2bj1fdxpytfk0.cloudfront.net/logo/syodo-w-bg-_1_.gif" alt="loading..." width={400} height={225} />
        </div>
        <h4>Завантаження...</h4>
      </div>
    </div>
  );
}
