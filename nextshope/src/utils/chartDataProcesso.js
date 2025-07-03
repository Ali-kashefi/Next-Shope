export function processPaymentsForSalesChart(payments, days = 30) {

  const salesByDay = {};

  const today = new Date();
  today.setHours(0, 0, 0, 0);


  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateKey = date.toISOString().split('T')[0];
    salesByDay[dateKey] = 0;
  }


  if (Array.isArray(payments)) {
    payments.forEach(payment => {

      if (payment && payment.createdAt && payment.cart && payment.cart.payDetail) {
        const paymentDate = new Date(payment.createdAt);
        const paymentDateKey = paymentDate.toISOString().split('T')[0];

        const totalPrice = payment.cart.payDetail.totalPrice;


        if (salesByDay.hasOwnProperty(paymentDateKey) && typeof totalPrice === 'number' && !isNaN(totalPrice)) {
          salesByDay[paymentDateKey] += totalPrice;
        }
      }
    });
  }



  const sortedDates = Object.keys(salesByDay).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });


  const labels = sortedDates.map(dateKey => {

    const date = new Date(dateKey);

    return date.toLocaleDateString('fa-IR', { month: 'short', day: 'numeric' });
  });


  const salesAmounts = sortedDates.map(dateKey => salesByDay[dateKey]);

  return { labels, salesAmounts };
}