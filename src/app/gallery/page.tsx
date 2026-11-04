import Cafe from "@/components/cafe";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("gallery", "/gallery");

export default function Page() {
  return <Cafe page="gallery" />;
}
