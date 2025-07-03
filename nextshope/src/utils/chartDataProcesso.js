export function processPaymentsForSalesChart(payments, days = 30) {
  // Initialize sales for each day
  const salesByDay = {};

  // Set today's date to midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Populate salesByDay with 0 for the last 'days' number of days
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateKey = date.toISOString().split('T')[0];
    salesByDay[dateKey] = 0;
  }

  // Aggregate sales data from payments
  if (Array.isArray(payments)) {
    payments.forEach(payment => {
      // Ensure payment and its required properties exist
      if (payment && payment.createdAt && payment.cart && payment.cart.payDetail) {
        const paymentDate = new Date(payment.createdAt);
        const paymentDateKey = paymentDate.toISOString().split('T')[0];
        const totalPrice = payment.cart.payDetail.totalPrice;

        // Add totalPrice to the corresponding date if valid
        if (salesByDay.hasOwnProperty(paymentDateKey) && typeof totalPrice === 'number' && !isNaN(totalPrice)) {
          salesByDay[paymentDateKey] += totalPrice;
        }
      }
    });
  }

  // Sort dates chronologically
  const sortedDates = Object.keys(salesByDay).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  // Format dates for chart labels (e.g., "فروردین 15")
  const labels = sortedDates.map(dateKey => {
    const date = new Date(dateKey);
    return date.toLocaleDateString('fa-IR', { month: 'short', day: 'numeric' });
  });

  // Extract sales amounts in chronological order
  const salesAmounts = sortedDates.map(dateKey => salesByDay[dateKey]);

  // Return formatted labels and sales data
  return { labels, salesAmounts };
}