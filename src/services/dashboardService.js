import { getData } from "./api"; // Pastikan sudah ada helper getData yang menerima withToken

// 📊 Income Summary
export const apiGetIncomeSummary = async (type) => {
    try {
        const response = await getData(`/dashboard/income/summary/${type}`, true); // Menambahkan withToken = true
        return response;
    } catch (error) {
        console.log(error);
    }
};

// 📊 Income Count Summary
export const apiGetIncomeCountSummary = async (type) => {
    try {
        const response = await getData(`/dashboard/income/count-summary/${type}`, true); // Menambahkan withToken = true
        return response;
    } catch (error) {
        console.log(error);
    }
};

// 📊 Outcome Summary
export const apiGetOutcomeSummary = async (type) => {
    try {
        const response = await getData(`/dashboard/outcome/summary/${type}`, true); // Menambahkan withToken = true
        return response;
    } catch (error) {
        console.log(error);
    }
};

// 📊 Outcome Count Summary
export const apiGetOutcomeCountSummary = async (type) => {
    try {
        const response = await getData(`/dashboard/outcome/count-summary/${type}`, true); // Menambahkan withToken = true
        return response;
    } catch (error) {
        console.log(error);
    }
};

// 📈 Daily Summary Chart (income / outcome)
export const apiGetDailySummaryChart = async (type, params) => {
    try {
        const response = await getData(`/dashboard/daily/${type}`, true, { params }); // Menambahkan withToken = true
        return response;
    } catch (error) {
        console.log(error);
    }
};

// 🏆 Top Items Income Summary
export const apiGetTopItemsIncomeSummary = async (type) => {
    try {
        const response = await getData(`/dashboard/income/top-items/${type}`, true); // Menambahkan withToken = true
        return response;
    } catch (error) {
        console.log(error);
    }
};

// 🏆 Top Items Outcome Summary
export const apiGetTopItemsOutcomeSummary = async (type) => {
    try {
        const response = await getData(`/dashboard/outcome/top-items/${type}`, true); // Menambahkan withToken = true
        return response;
    } catch (error) {
        console.log(error);
    }
};

// 🆕 Latest Client Income
export const apiGetLatestClientIncome = async () => {
    try {
        const response = await getData(`/dashboard/income/latest-clients`, true); // Menambahkan withToken = true
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
