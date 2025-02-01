export default async function DashboardPage() {
    // Simulate a delay (e.g., fetching data)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard!</p>
        </div>
    );
}