import Cafe from "@/components/cafe";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("gallery", "/the-journal");
export default function Page() { return <Cafe page="gallery" />; }
