export default function HeroBanner() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#9e1b32",
        minHeight: "3rem",
        width: "100%",
        padding: "0.5rem 2rem",
      }}
    >
      <a href="https://www.ua.edu/">
        <img src="/UA_nameplate.png" alt="The University of Alabama" height="24" />
      </a>
    </div>
  );
}
