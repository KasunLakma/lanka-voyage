import { useLocale } from "next-intl";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import DestinationExplorer from "@/components/home/DestinationExplorer";
import { UI_TEXT, type Locale3 } from "@/data/destinations";

export default function DestinationsPage() {
    const ui = UI_TEXT[useLocale() as Locale3];

    return (
        <Container className="py-12">
            <SectionTitle title={ui.destinations} subtitle={ui.destinationsSub} />
            <DestinationExplorer />
        </Container>
    );
}