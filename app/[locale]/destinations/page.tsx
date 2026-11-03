import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import DestinationExplorer from "@/components/home/DestinationExplorer";
import { createClient } from "@/lib/supabase/server";
import { fetchDestinations } from "@/lib/destinations";
import { UI_TEXT, type Locale3 } from "@/data/destinations";

export default async function DestinationsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: raw } = await params;
    const ui = UI_TEXT[raw as Locale3];
    const supabase = await createClient();
    const items = await fetchDestinations(supabase);

    return (
        <Container className="py-12">
            <SectionTitle title={ui.destinations} subtitle={ui.destinationsSub} />
            <DestinationExplorer items={items} />
        </Container>
    );
}