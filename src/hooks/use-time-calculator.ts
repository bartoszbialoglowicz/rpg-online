export const useTimeCalculator= () => {

    const getTimeUnits = (serverTime: Date) => {
        const now = new Date().getTime();
        const endTime = serverTime.getTime();

        const remainingMs = Math.max(0, endTime - now);
        const totalSeconds = Math.floor(remainingMs / 1000);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (hours > 0) {
            return `${hours}h ${minutes}m ${seconds}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds}s`
        } else if (seconds > 0){
            return `${seconds}s`
        } else {
            return ""
        }
    }
    
    return {
        getTimeUnits
    }
};
