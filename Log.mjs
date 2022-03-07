class Log {
    superId = 0;
    events = [];

    constructor(events) {
        this.events = events;
        this.superId = (events) ? events[events.length-1]._id+1 : 0;
    }

    addEvent(event) {
        this.events.push(event);
        this.superId++;
    }

    deleteEvent(id) {
        return this.events.splice(id);
    }
}

export default Log;