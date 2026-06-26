import type { Metadata } from "next";
import { RemoteImmobilisationPage } from "@/components/pages/RemoteImmobilisationPage";

export const metadata: Metadata = {
  title: "Remote Vehicle Immobilisation | Stop Your Vehicle Anywhere | Travio",
  description:
    "Remotely disable your engine via the Travio app. Police-coordinated immobilisation for supercars, luxury SUVs and motorcycles. Available on all Travio S5 plans.",
};

export default function RemotePage() {
  return <RemoteImmobilisationPage />;
}
