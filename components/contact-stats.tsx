import { getContactStats } from "@/actions";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default async function ContactStats() {
  const stats = await getContactStats();
  console.log(stats);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 text-center">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">New Count</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-700">
            {stats.newCount}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium ">Read Count</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-700">
            {stats.readCount}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Replied Count</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700">
            {stats.repliedCount}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
