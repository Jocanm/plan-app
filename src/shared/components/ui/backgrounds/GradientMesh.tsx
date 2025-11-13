export const GradientMesh = () => {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      {/* Primary gradient orb - top right */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />

      {/* Secondary gradient orb - bottom left */}
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-success/5 blur-3xl" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.1,
          backgroundImage: `
            linear-gradient(
              var(--grid-color, hsl(221, 69%, 75%)) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              var(--grid-color, hsl(221, 69%, 75%)) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
};
