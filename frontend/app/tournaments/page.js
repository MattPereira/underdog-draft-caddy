export const dynamic = "force-static"; // no necessary, just for demonstration

export const metadata = {
  title: "Tournaments Page",
  description: "See all the tournaments and how many drafts for each one",
};

async function getTournaments() {
  const res = await fetch("http://localhost:8000/analytics/tournaments");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

function TableHeader({ children }) {
  return (
    <th className="px-4 py-2 border border-gray-500 text-gray-100 text-start">
      {children}
    </th>
  );
}

function TableCell({ children }) {
  return (
    <td className="px-4 py-2 border border-gray-500 text-gray-300">
      {children}
    </td>
  );
}

export default async function Tournaments() {
  const tournaments = await getTournaments();
  console.log("tournaments", tournaments);
  return (
    <div className="py-10 text-white">
      <h1 className="font-cubano text-4xl mb-5">Tournaments</h1>

      <table>
        <thead>
          <tr>
            <TableHeader>Title</TableHeader>
            <TableHeader>Entry Fee</TableHeader>
            <TableHeader>Drafts</TableHeader>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((tournament) => (
            <tr key={tournament.id}>
              <TableCell>{tournament.title}</TableCell>
              <TableCell>{tournament.entry_fee}</TableCell>
              <TableCell>{tournament.num_drafts}</TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
