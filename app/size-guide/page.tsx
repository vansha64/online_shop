const rows = [
  ["S", "48", "68", "43", "20"],
  ["M", "51", "70", "45", "21"],
  ["L", "54", "73", "47", "22"],
  ["XL", "57", "76", "49", "23"],
  ["XXL", "60", "78", "51", "24"],
  ["3XL", "63", "80", "53", "25"],
  ["4XL", "66", "82", "55", "26"],
  ["5XL", "69", "84", "57", "27"],
];

export default function SizeGuidePage() {
  return (
    <main className="section-shell">
      <p className="text-sm font-black uppercase text-[#d6ad55]">Size guide</p>
      <h1 className="mb-8 text-5xl font-black sm:text-7xl">Find your best fit.</h1>
      <div className="overflow-hidden rounded-3xl border border-white/10">
        <table className="w-full min-w-[720px] text-left">
          <thead className="bg-white/10">
            <tr>{["Size", "Chest width", "Body length", "Shoulder", "Sleeve"].map((head) => <th className="p-4" key={head}>{head}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row) => <tr className="border-t border-white/10" key={row[0]}>{row.map((cell) => <td className="p-4" key={cell}>{cell}{cell !== row[0] ? " cm" : ""}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["Measure your favorite tee flat", "Compare chest width first", "Choose oversized one size up"].map((item) => <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 font-bold" key={item}>{item}</div>)}
      </div>
    </main>
  );
}
