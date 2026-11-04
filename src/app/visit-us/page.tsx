import Cafe from "@/components/cafe";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("visit", "/visit-us");

export default function Page() {
  return <Cafe page="visit" />;
}
