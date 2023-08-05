"use client";

export default function GlobalError({ error, reset }) {
  console.log(error);
  
  return (
    <html>
      <body>
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
          <h1>404</h1>
          <h2>Сторінку не знайдено :(</h2>
          <h4>Ууууупс! Здається ви загубились.</h4>
        </div>
      </body>
    </html>
  );
}
