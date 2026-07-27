import { useEffect, useRef } from "react";

const AuthBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let particles = [];
    let animationId;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.floor(
        (canvas.width * canvas.height) / 12000
      );

      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: Math.random() * 0.25 + 0.05,
          opacity: Math.random() * 0.35 + 0.15,
        });
      }
    };

    const drawParticles = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.y -= particle.speed;

        if (particle.y < 0) {
          particle.y = canvas.height;
          particle.x = Math.random() * canvas.width;
        }

        context.fillStyle = `rgba(250, 250, 250, ${particle.opacity})`;
        context.fillRect(particle.x, particle.y, 1, 2.5);
      });

      animationId = requestAnimationFrame(drawParticles);
    };

    const handleResize = () => {
      setCanvasSize();
      createParticles();
    };

    setCanvasSize();
    createParticles();
    drawParticles();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <div className="auth-vignette absolute inset-0" />
      <div className="auth-lines absolute inset-0">
        <span className="auth-horizontal top-[18%]" />
        <span className="auth-horizontal top-1/2" />
        <span className="auth-horizontal top-[82%]" />
        <span className="auth-vertical left-[22%]" />
        <span className="auth-vertical left-1/2" />
        <span className="auth-vertical left-[78%]" />
      </div>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 size-full opacity-50"
      />
    </>
  );
};

export default AuthBackground;
