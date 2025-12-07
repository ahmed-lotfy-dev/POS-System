import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats(period: string = 'all') {
    // Calculate date range based on period
    const now = new Date();
    let startDate: Date | undefined;

    switch (period) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = undefined; // 'all' - no filter
    }

    // Build where clause for date filtering
    const whereClause = startDate
      ? {
          createdAt: {
            gte: startDate,
          },
        }
      : {};

    const [totalProducts, totalCategories, totalOrders, totalUnits] =
      await Promise.all([
        this.prisma.product.count(),
        this.prisma.category.count(),
        this.prisma.order.count({ where: whereClause }),
        this.prisma.unit.count(),
      ]);

    // Get orders for the selected period
    const orders = await this.prisma.order.findMany({
      where: whereClause,
      select: {
        createdAt: true,
        totalAmount: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Calculate total revenue
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );

    // Group by date for chart
    const salesByDate = orders.reduce(
      (acc, order) => {
        const date = order.createdAt.toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = { orders: 0, revenue: 0 };
        }
        acc[date].orders += 1;
        acc[date].revenue += order.totalAmount;
        return acc;
      },
      {} as Record<string, { orders: number; revenue: number }>,
    );

    const chartData = Object.keys(salesByDate).map((date) => ({
      date,
      orders: salesByDate[date].orders,
      revenue: salesByDate[date].revenue,
    }));

    return {
      totalProducts,
      totalCategories,
      totalOrders,
      totalUnits,
      totalRevenue,
      chartData,
    };
  }
}
