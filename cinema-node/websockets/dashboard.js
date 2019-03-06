
let app;
app = require('../app');
let dashboardQueries = require('../routes/dashboard/queries');

const timeRangeInDays = 30;

const sendDataToDashboardNamespace = async () => {
    let dashboardData;
    let dashboardNamespace = app.dashboardNamespace;

    let dashboardDataArray = await Promise.all([
        dashboardQueries.queryTopMovies(timeRangeInDays, 10),
        dashboardQueries.querySoldRatio(timeRangeInDays),
        dashboardQueries.queryBusyTimes(timeRangeInDays),
    ]);

    dashboardData = new Object();
    dashboardData.topMovies = dashboardDataArray[0];
    dashboardData.soldRatio = dashboardDataArray[1];
    dashboardData.busyTimes = dashboardDataArray[2];

    dashboardNamespace.emit('dashboard', dashboardData);
};

module.exports.sendDataToDashboardNamespace = sendDataToDashboardNamespace;
