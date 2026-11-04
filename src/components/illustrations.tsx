import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function Arrow({ className = "", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M4 12h15m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TeaCup({ className = "", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 36h37v9c0 12-7 20-18.5 20S19 57 19 45V36Zm37 3h5c12 0 10 17-6 17M12 69h51M33 28c-9-10 12-11 3-21m9 20c-7-8 9-10 3-18" />
        <path d="M16 36h43M23 43c0 9 3 14 7 17" />
      </g>
    </svg>
  );
}

export function BrandEmblem({ className = "", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 100 110"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M41 95C8 81 5 49 28 20M59 95c33-14 36-46 13-75M27 22c-9-1-16 7-14 16 8-1 14-8 14-16ZM17 43C5 43 3 52 9 59c7-4 9-9 8-16Zm0 21C7 67 10 78 18 80c4-6 3-12-1-16Zm12 18c-7 7-2 15 7 16 1-7-1-12-7-16M73 22c9-1 16 7 14 16-8-1-14-8-14-16ZM83 43c12 0 14 9 8 16-7-4-9-9-8-16Zm0 21c10 3 7 14-1 16-4-6-3-12 1-16ZM71 82c7 7 2 15-7 16-1-7 1-12 7-16" />
        <path d="M29 51h35v9c0 10-7 17-17.5 17S29 70 29 60v-9Zm35 3h5c10 0 8 14-6 14M25 82h43M41 42c-8-9 10-10 3-20m10 20c-7-8 8-9 2-16" />
      </g>
    </svg>
  );
}

export function Botanical({ className = "", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 220 320"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M60 314c40-54 60-115 66-177 4-42 9-82 31-123M107 212C63 202 25 165 27 125c41 3 80 38 80 87ZM123 162c40-9 68-37 78-77-42 5-74 33-78 77ZM128 118C95 102 83 68 88 33c31 20 46 48 40 85ZM143 52c-2-25 10-40 27-49 5 22-3 39-27 49ZM84 264C47 255 17 236 3 202c36-1 67 23 81 62ZM91 252c42-3 77-20 100-53-41-8-77 10-100 53Z" />
        <path d="m27 125 80 87M201 85l-78 77M88 33l40 85M3 202l81 62m7-12 100-53M62 163l-2-15m11 26-17-4m28 14-1-16m65-31 3-17m12 4 15-4M113 85l-13-3m37 10 2-10M38 228l4-12m8 22-13 1m95-5 8-16m2 13 20-4" />
      </g>
    </svg>
  );
}

export function ArchDrawing({ className = "", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 270 290"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <g stroke="currentColor" strokeWidth="1.1">
        <path d="M43 278V121a92 92 0 0 1 184 0v157M56 278V121a79 79 0 0 1 158 0v157M70 278V121a65 65 0 0 1 130 0v157M36 278h198M37 270h28m140 0h29M33 128h40m124 0h40M33 120h40m124 0h40M45 83l24 12m-4-40 17 17m12-36 10 24m21-31 1 26m29-24-7 26m33-11-15 22m35-1-22 16m40 9-25 9" />
        <path d="M86 279v-70m101 70v-70m-51 70v-41m-50-28h101m-36 30h-32m-32-5v-14m98 14v-14M104 210v-49h32v49m-21-51c-20-17-20-41-5-61 15 19 17 40 5 61Zm2 14c22-20 40-18 51-7-13 16-34 23-51 7Zm-2 15c-18-24-39-26-49-18 13 16 28 23 49 18Z" />
      </g>
    </svg>
  );
}
