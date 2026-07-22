import { Card, CardBody } from "@shared/ui";
import { AdminPage } from "@admin/components/admin-page";

const metrics = [
  { label: "Revenue", value: "₹12.4L" },
  { label: "Orders", value: "1,284" },
  { label: "Users", value: "8,760" },
  { label: "Products", value: "248" }
];

export default function AdminDashboardPage() {
  return (
    <AdminPage
      eyebrow="Operations"
      title="Dashboard"
      description="Monitor revenue, order volume, users, and product count from one place."
    >
      <section className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="border-white/10 bg-white/5 text-white">
            <CardBody className="space-y-2 p-5">
              <p className="text-sm text-slate-300">{metric.label}</p>
              <p className="text-2xl font-semibold">{metric.value}</p>
            </CardBody>
          </Card>
        ))}
      </section>
    </AdminPage>
  );
}
