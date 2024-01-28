// background.js
chrome.runtime.onInstalled.addListener(async ({ reason }) => {
    if (reason === 'install') {
        await fetchData()
    }
});

const fetchData = async () => {
    console.log('fetching data')
    try {
        const response = await fetch('https://odc24.rbc-group.uz/api/hosts/?format=json');
        const hosts = await response.json();

        chrome.storage.local.set({hosts});
    } catch (e) {
        console.log('Cant fetch hosts')
    }
};

const ALARM_NAME = 'hostFetcher';

// Check if alarm exists to avoid resetting the timer.
// The alarm might be removed when the browser session restarts.
async function createAlarm() {
    const alarm = await chrome.alarms.get(ALARM_NAME);
    if (typeof alarm === 'undefined') {
        chrome.alarms.create(ALARM_NAME, {
            delayInMinutes: 1,
            periodInMinutes: 1
        });
        fetchData();
    }
}

createAlarm();

chrome.alarms.onAlarm.addListener(fetchData);

