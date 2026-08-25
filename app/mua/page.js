import VerticalLanding from "@/components/VerticalLanding";
import { getVerticalConfig } from "@/data/verticals";

export const metadata = {
  title: "Website MUA + AI Assistant | Extreme Studios",
  description: "Website MUA profesional dengan AI Assistant, booking, dan kalender untuk bisnis makeup artist."
};

export default function MuaPage() {
  return <VerticalLanding config={getVerticalConfig("mua")} />;
}
