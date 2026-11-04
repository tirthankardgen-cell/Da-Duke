import Cafe from "@/components/cafe";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("private", "/private-affairs");

export default function Page() {
  return <Cafe page="private" />;
}
