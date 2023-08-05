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
          <Image
            src="/assets/images/logos/SYODOlogo_black2.png"
            alt="loading..."
            width={210}
            height={148}
            className="pulse"
          />
        </div>
        <h4>Завантаження...</h4>
      </div>
    </div>
  );
}
