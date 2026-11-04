import Cafe from "@/components/cafe";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("house", "/the-house");

export default function Page() {
  return <Cafe page="house" />;
}
