import Cafe from "@/components/cafe";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("home", "/");

export default function Home() {
  return <Cafe />;
}
