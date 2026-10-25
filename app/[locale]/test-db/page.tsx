export default async function TestDbPage() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/health`,
        {
            headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! },
            cache: "no-store",
        },
    );

    return (
        <div className="p-10 text-xl">
            {res.ok ? "✅ Supabase connected" : `❌ Failed (status ${res.status})`}
        </div>
    );
}