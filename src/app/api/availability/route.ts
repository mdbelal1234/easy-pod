import { prisma } from "@/lib/prisma";
import { addDays, scheduleByDay } from "@/lib/desk";
import { dayRange, holdingStatuses, isIsoDate, occupiedHours } from "@/lib/schedule";

const MAX_DAYS = 14;
const noStore = { headers: { "Cache-Control": "no-store" } };

/**
 * GET /api/availability?date=YYYY-MM-DD -> { occupied: number[] } (clock hours)
 * GET /api/availability?from=YYYY-MM-DD&days=N -> { days: { date, occupied }[] }, N from 1 to 14
 */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const from = params.get("from");

  if (from !== null) {
    const days = Number(params.get("days") ?? "7");
    if (!isIsoDate(from) || !Number.isInteger(days) || days < 1 || days > MAX_DAYS) {
      return Response.json(
        { error: `Expected ?from=YYYY-MM-DD&days=1..${MAX_DAYS}` },
        { status: 400 }
      );
    }

    const bookings = await prisma.booking.findMany({
      where: {
        deletedAt: null,
        status: { in: [...holdingStatuses] },
        preferredDate: { gte: dayRange(from).gte, lt: dayRange(addDays(from, days)).gte },
      },
      select: { preferredDate: true, preferredTime: true, durationHours: true },
    });

    return Response.json({ days: scheduleByDay(bookings, from, days) }, noStore);
  }

  const date = params.get("date") ?? "";
  if (!isIsoDate(date)) {
    return Response.json({ error: "Expected ?date=YYYY-MM-DD" }, { status: 400 });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      deletedAt: null,
      status: { in: [...holdingStatuses] },
      preferredDate: dayRange(date),
    },
    select: { preferredTime: true, durationHours: true },
  });

  return Response.json({ occupied: occupiedHours(bookings) }, noStore);
}
