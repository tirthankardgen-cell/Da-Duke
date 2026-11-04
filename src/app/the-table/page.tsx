import Cafe from "@/components/cafe";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("table", "/the-table");

export default function Page() {
  return <Cafe page="table" />;
}
