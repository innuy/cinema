let app;
app = require('../app');
let dashboardQueries = require('../routes/dashboard/queries');

const timeRangeInDays = 30;

const sendDataToDashboardNamespace = async () => {
    let dashboardData;
    let dashboardNamespace = app.dashboardNamespace;

    try {
        let dashboardDataArray = await Promise.all([
            dashboardQueries.queryTopMovies(timeRangeInDays, 10),
            dashboardQueries.querySoldRatio(timeRangeInDays),
            dashboardQueries.queryBusyTimes(timeRangeInDays),
        ]);

        dashboardData = {};
        dashboardData.topMovies = dashboardDataArray[0];
        dashboardData.soldRatio = dashboardDataArray[1];
        dashboardData.busyTimes = dashboardDataArray[2];

        dashboardNamespace.emit('dashboard', dashboardData);

    } catch (err) {
        dashboardNamespace.emit('dashboard', err);
    }
};

module.exports.sendDataToDashboardNamespace = sendDataToDashboardNamespace;
