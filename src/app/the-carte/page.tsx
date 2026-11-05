import Cafe from "@/components/cafe";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("carte", "/the-carte");
export default function Page() { return <Cafe page="carte" />; }
