
let app;
app = require('../app');
let dashboardQueries = require('../routes/dashboard/queries');

const timeRangeInDays = 30;

const sendDataToDashboardNamespace = async () => {
    let dashboardData;
    let dashboardNamespace = app.dashboardNamespace;

    const topMovies = await dashboardQueries.queryTopMovies(timeRangeInDays, 10);
    const soldRatio = await dashboardQueries.querySoldRatio(timeRangeInDays);
    const busyTimes = await dashboardQueries.queryBusyTimes(timeRangeInDays);

    dashboardData = new Object();
    dashboardData.topMovies = topMovies;
    dashboardData.soldRatio = soldRatio;
    dashboardData.busyTimes = busyTimes;

    dashboardNamespace.emit('dashboard', dashboardData);
};

module.exports.sendDataToDashboardNamespace = sendDataToDashboardNamespace;
