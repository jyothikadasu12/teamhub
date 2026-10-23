
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

function Card({ children, className = "", ...props }: CardProps) {
  return (
    <article
      className={`ui-card ${className}`}
      {...props}
    >
      {children}
    </article>
  );
}

export default Card;
