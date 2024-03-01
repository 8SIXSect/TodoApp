export default {
    sendGetRequestAndUpdateTasks: async function() {
        return await fetch(this.API_URL).json().then(
            jsonData => jsonData
        );
    }
}
