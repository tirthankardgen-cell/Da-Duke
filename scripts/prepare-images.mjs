// Run manually after downloading the source photographs listed in docs/REFERENCES.md.
// JPEG originals live outside the deployed assets, in output/source-images/.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

await mkdir("public/images", { recursive: true });
const sources = [
  ["cafe-counter", "cafe-table"],
  ["cafe-exterior", "cafe-exterior"],
  ["cafe-interior", "cafe-interior"],
  ["tea", "tea"],
  ["croissant", "croissant"],
  ["cake", "cake"],
  ["rome", "rome"],
  ["himalayas", "mountains"],
];
for (const [source, destination] of sources) {
  await sharp(path.join("output/source-images", `${source}.jpg`))
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(path.join("public/images", `${destination}.webp`));
}

await sharp("old logo.jpeg")
  .resize(700)
  .webp({ quality: 86 })
  .toFile("public/images/original-emblem.webp");

const archMask = Buffer.from(
  '<svg width="440" height="550"><path d="M0 550V220a220 220 0 0 1 440 0v330Z" fill="white"/></svg>',
);
const photo = await sharp("output/source-images/cafe-counter.jpg")
  .resize(440, 550, { fit: "cover" })
  .composite([{ input: archMask, blend: "dest-in" }])
  .png()
  .toBuffer();
const overlay =
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <g fill="#283f32">
    <text x="72" y="105" font-family="Georgia" font-size="39" letter-spacing="2">DA DUKE</text>
    <text x="73" y="136" font-family="Georgia" font-size="22" font-style="italic" fill="#778265">and Chai</text>
    <text x="72" y="280" font-family="Georgia" font-size="62">A little Europe.</text>
    <text x="72" y="357" font-family="Georgia" font-size="62">A lot of <tspan font-style="italic" fill="#71805c">home.</tspan></text>
    <text x="74" y="425" font-family="Arial" font-size="17" letter-spacing="1" fill="#707b63">A CAFÉ FOR THE UNHURRIED</text>
    <path d="M74 492h52" stroke="#987a4c"/>
    <text x="74" y="541" font-family="Georgia" font-size="21" font-style="italic">European soul. Bengal at heart.</text>
  </g>
  <path d="M730 585V255a220 220 0 0 1 440 0v330" fill="none" stroke="#a4ab92"/>
</svg>`);
await sharp({
  create: { width: 1200, height: 630, channels: 3, background: "#f6f4ec" },
})
  .composite([{ input: photo, left: 714, top: 48 }, { input: overlay }])
  .jpeg({ quality: 88 })
  .toFile("public/images/social-card.jpg");
console.log(
  "Eight optimized photographs, the original emblem, and a social sharing card prepared.",
);
