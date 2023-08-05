'use client'
export default function ErrorPage({ error, reset }) {
  console.error(error);

  return (
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
      <h2>Упс. Сталась помилка :(</h2>
      <h4>Невдалось завантажити сторінку.</h4>
    </div>
  );
}
