import Cafe from "@/components/cafe";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("gatherings", "/gatherings");

export default function Page() {
  return <Cafe page="gatherings" />;
}
